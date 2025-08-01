import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendNewsletterConfirmation } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'ایمیل الزامی است' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'ایمیل نامعتبر است' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { error: 'این ایمیل قبلاً در خبرنامه ثبت شده است' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        await prisma.newsletter.update({
          where: { email },
          data: { 
            subscribed: true,
            name: name || existingSubscriber.name,
            updatedAt: new Date(),
          },
        });
      }
    } else {
      // Create new subscription
      await prisma.newsletter.create({
        data: {
          email,
          name,
          subscribed: true,
        },
      });
    }

    // Send confirmation email
    const emailSent = await sendNewsletterConfirmation(email, name);

    if (!emailSent) {
      console.warn('Failed to send newsletter confirmation email to:', email);
    }

    return NextResponse.json({
      message: 'عضویت شما در خبرنامه با موفقیت انجام شد'
    });

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'خطا در عضویت در خبرنامه' },
      { status: 500 }
    );
  }
} 