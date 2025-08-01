import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import ContactMessagesList from './ContactMessagesList';

const prisma = new PrismaClient();

export default async function ContactMessagesPage() {
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

  // Fetch contact messages - temporarily disabled
  const messages: any[] = [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">پیام‌های تماس</h1>
          <p className="text-gray-600">مدیریت پیام‌های ارسالی از فرم تماس</p>
        </div>
        
        <ContactMessagesList messages={messages} />
      </div>
    </div>
  );
} 