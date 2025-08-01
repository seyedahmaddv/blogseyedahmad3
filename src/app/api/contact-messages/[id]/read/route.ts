import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const resolvedParams = await params;
    const messageId = parseInt(resolvedParams.id);
    
    if (isNaN(messageId)) {
      return NextResponse.json(
        { error: 'شناسه پیام نامعتبر است' },
        { status: 400 }
      );
    }

    // Update message as read
    const updatedMessage = await (prisma as any).contactMessage.update({
      where: { id: messageId },
      data: { read: true },
    });

    return NextResponse.json({
      message: 'پیام به عنوان خوانده شده علامت‌گذاری شد',
      data: updatedMessage
    });

  } catch (error) {
    console.error('Error marking message as read:', error);
    return NextResponse.json(
      { error: 'خطا در به‌روزرسانی پیام' },
      { status: 500 }
    );
  }
} 