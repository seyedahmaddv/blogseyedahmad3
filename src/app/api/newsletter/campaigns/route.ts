import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'دسترسی غیرمجاز' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    });

    if (user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'دسترسی غیرمجاز' },
        { status: 403 }
      );
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'عنوان و محتوا الزامی هستند' },
        { status: 400 }
      );
    }

    // Create campaign
    const campaign = await (prisma as any).newsletterCampaign.create({
      data: {
        title,
        content,
        status: 'DRAFT',
      },
    });

    return NextResponse.json({
      message: 'کمپین با موفقیت ایجاد شد',
      campaign
    });

  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'خطا در ایجاد کمپین' },
      { status: 500 }
    );
  }
} 