import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import NewsletterManagement from './NewsletterManagement';

const prisma = new PrismaClient();

export default async function NewsletterPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  });

  if (user?.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Fetch newsletter data
  const [subscribers, campaigns] = await Promise.all([
    prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        subscribed: true,
        createdAt: true,
      }
    }),
    prisma.newsletterCampaign.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        sentAt: true,
        createdAt: true,
      }
    })
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مدیریت خبرنامه</h1>
          <p className="text-gray-600">مدیریت مشترکان و کمپین‌های خبرنامه</p>
        </div>
        
        <NewsletterManagement 
          subscribers={subscribers} 
          campaigns={campaigns} 
        />
      </div>
    </div>
  );
} 