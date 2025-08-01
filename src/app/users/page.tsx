import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import UserManagement from './UserManagement';
import AuthorRequests from './AuthorRequests';

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  if ((session.user as any).role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مدیریت کاربران</h1>
          <p className="text-gray-600">مشاهده و مدیریت کاربران ثبت‌نام شده</p>
        </div>

        <div className="grid gap-8">
          {/* Author Requests */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">درخواست‌های نویسنده شدن</h2>
            <AuthorRequests />
          </div>

          {/* User Management */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">لیست کاربران</h2>
            <UserManagement />
          </div>
        </div>
      </div>
    </div>
  );
} 