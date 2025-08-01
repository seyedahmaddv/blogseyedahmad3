import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: 'اگر ایمیل در سیستم ثبت شده باشد، لینک بازنشانی رمز عبور ارسال خواهد شد.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save or update reset token
    await prisma.passwordReset.upsert({
      where: { email },
      update: {
        token: resetToken,
        expiresAt,
        used: false,
      },
      create: {
        email,
        token: resetToken,
        expiresAt,
      },
    });

    // Send email
    const emailSent = await sendPasswordResetEmail(email, resetToken);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'خطا در ارسال ایمیل' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'لینک بازنشانی رمز عبور به ایمیل شما ارسال شد.'
    });

  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json(
      { error: 'خطا در پردازش درخواست' },
      { status: 500 }
    );
  }
}