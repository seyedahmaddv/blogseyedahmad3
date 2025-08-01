import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'ایمیل الزامی است' },
        { status: 400 }
      );
    }

    // Find and update subscription
    const subscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'این ایمیل در خبرنامه ثبت نشده است' },
        { status: 404 }
      );
    }

    if (!subscriber.subscribed) {
      return NextResponse.json(
        { error: 'این ایمیل قبلاً از خبرنامه خارج شده است' },
        { status: 400 }
      );
    }

    // Unsubscribe
    await prisma.newsletter.update({
      where: { email },
      data: { 
        subscribed: false,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'اشتراک شما از خبرنامه لغو شد'
    });

  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json(
      { error: 'خطا در لغو اشتراک' },
      { status: 500 }
    );
  }
} 