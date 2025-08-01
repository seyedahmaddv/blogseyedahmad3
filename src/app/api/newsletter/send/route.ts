import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendNewsletterEmail } from '@/lib/email';

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

    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json(
        { error: 'شناسه کمپین الزامی است' },
        { status: 400 }
      );
    }

    // Get campaign
    const campaign = await prisma.newsletterCampaign.findUnique({
      where: { id: parseInt(campaignId) },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'کمپین یافت نشد' },
        { status: 404 }
      );
    }

    if (campaign.status === 'SENT') {
      return NextResponse.json(
        { error: 'این کمپین قبلاً ارسال شده است' },
        { status: 400 }
      );
    }

    // Get all active subscribers
    const subscribers = await prisma.newsletter.findMany({
      where: { subscribed: true },
      select: { email: true, name: true },
    });

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'هیچ مشترک فعالی یافت نشد' },
        { status: 400 }
      );
    }

    // Send emails
    let successCount = 0;
    let errorCount = 0;

    for (const subscriber of subscribers) {
      try {
        const emailSent = await sendNewsletterEmail(
          subscriber.email,
          subscriber.name,
          campaign.title,
          campaign.content
        );
        
        if (emailSent) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        console.error(`Error sending newsletter to ${subscriber.email}:`, error);
        errorCount++;
      }
    }

    // Update campaign status
    await prisma.newsletterCampaign.update({
      where: { id: parseInt(campaignId) },
      data: {
        status: 'SENT',
        sentAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: `خبرنامه با موفقیت ارسال شد`,
      stats: {
        total: subscribers.length,
        success: successCount,
        error: errorCount,
      }
    });

  } catch (error) {
    console.error('Error sending newsletter:', error);
    return NextResponse.json(
      { error: 'خطا در ارسال خبرنامه' },
      { status: 500 }
    );
  }
} 