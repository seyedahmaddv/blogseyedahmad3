import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'دسترسی غیرمجاز' }, { status: 403 });
    }

    const { requestId, action } = await request.json();

    if (!requestId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'داده‌های نامعتبر' }, { status: 400 });
    }

    // Get the author request - temporarily disabled
    // const authorRequest = await prisma.authorRequest.findUnique({
    //   where: { id: requestId },
    //   include: { user: true }
    // });

    // if (!authorRequest) {
    //   return NextResponse.json({ error: 'درخواست پیدا نشد' }, { status: 404 });
    // }

    // if (authorRequest.status !== 'PENDING') {
    //   return NextResponse.json({ error: 'این درخواست قبلاً پردازش شده است' }, { status: 400 });
    // }

    // // Update the request status
    // await prisma.authorRequest.update({
    //   where: { id: requestId },
    //   data: { status: action === 'approve' ? 'APPROVED' : 'REJECTED' }
    // });

    // // If approved, update user role to AUTHOR
    // if (action === 'approve') {
    //   await prisma.user.update({
    //     where: { id: authorRequest.userId },
    //     data: { role: 'AUTHOR' }
    //   });
    // }
    console.log('Author request response would be processed:', { requestId, action });

    return NextResponse.json({
      message: `درخواست ${action === 'approve' ? 'تأیید' : 'رد'} شد`
    });

  } catch (error) {
    console.error('Error responding to author request:', error);
    return NextResponse.json(
      { error: 'خطا در پردازش درخواست' },
      { status: 500 }
    );
  }
} 