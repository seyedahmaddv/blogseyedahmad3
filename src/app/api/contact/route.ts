import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendContactNotification } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'تمام فیلدها الزامی هستند' },
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

    // Save to database
    const contactMessage = await (prisma as any).contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    // Send email notifications
    const emailSent = await sendContactNotification({
      name,
      email,
      subject,
      message,
    });

    if (!emailSent) {
      console.warn('Failed to send email notification for contact message:', contactMessage.id);
    }

    return NextResponse.json({
      message: 'پیام شما با موفقیت ارسال شد. در اسرع وقت با شما تماس خواهیم گرفت.'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'خطا در پردازش پیام' },
      { status: 500 }
    );
  }
} 