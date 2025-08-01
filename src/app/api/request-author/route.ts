import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'لطفاً ابتدا وارد شوید' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (user?.role !== ('VIEWER' as any)) {
      return NextResponse.json({ error: 'فقط کاربران عمومی می‌توانند درخواست نویسنده شدن دهند' }, { status: 400 });
    }

    // Check if request already exists
    const existingRequest = await (prisma as any).authorRequest.findUnique({
      where: { userId }
    });

    if (existingRequest) {
      return NextResponse.json({ error: 'شما قبلاً درخواست داده‌اید' }, { status: 400 });
    }

    // Create author request
    await (prisma as any).authorRequest.create({
      data: {
        userId,
        status: 'PENDING',
        message: 'درخواست تبدیل به نویسنده'
      }
    });

    return NextResponse.json({
      message: 'درخواست شما با موفقیت ثبت شد. پس از بررسی توسط مدیر، نتیجه به شما اطلاع داده خواهد شد.'
    });

  } catch (error) {
    console.error('Error creating author request:', error);
    return NextResponse.json(
      { error: 'خطا در ثبت درخواست' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
    }

    const requests = await (prisma as any).authorRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ requests });

  } catch (error) {
    console.error('Error fetching author requests:', error);
    return NextResponse.json(
      { error: 'خطا در دریافت درخواست‌ها' },
      { status: 500 }
    );
  }
} 