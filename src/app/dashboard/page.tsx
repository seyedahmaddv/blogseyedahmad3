import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import RequestAuthorButton from "./RequestAuthorButton";

const prisma = new PrismaClient();

async function getStats() {
  const [users, posts, comments, likes] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count(),
    prisma.like.count(),
  ]);

  return { users, posts, comments, likes };
}

async function getUserStats(userId: string) {
  const [userPosts, userComments, userLikes] = await Promise.all([
    prisma.post.count({ where: { authorId: userId } }),
    prisma.comment.count({ where: { authorId: userId } }),
    prisma.like.count({ where: { userId } }),
  ]);

  return { userPosts, userComments, userLikes };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">دسترسی غیرمجاز</h1>
          <p className="text-gray-600">لطفاً ابتدا وارد شوید</p>
          <Link href="/auth/signin" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            ورود
          </Link>
        </div>
      </div>
    );
  }

  const userRole = (session.user as any).role;
  const userId = (session.user as any).id;
  
  let stats: any;
  if (userRole === 'ADMIN') {
    stats = await getStats();
  } else {
    stats = await getUserStats(userId);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {userRole === 'ADMIN' ? 'داشبورد مدیریت' : 
             userRole === 'AUTHOR' ? 'داشبورد نویسنده' : 'داشبورد کاربر'}
          </h1>
          <p className="text-gray-600">
            {userRole === 'ADMIN' ? 'نمای کلی از وضعیت وبلاگ' :
             userRole === 'AUTHOR' ? 'مدیریت نوشته‌ها و فعالیت‌های شما' :
             'فعالیت‌ها و پروفایل شما'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userRole === 'ADMIN' ? (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">کاربران</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.users}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">پست‌ها</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.posts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-yellow-100">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">کامنت‌ها</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.comments}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-100">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">لایک‌ها</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.likes}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">پست‌های شما</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.userPosts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-yellow-100">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">کامنت‌های شما</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.userComments}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-red-100">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">لایک‌های شما</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.userLikes}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userRole === 'ADMIN' && (
            <>
              <Link href="/posts/new" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-900">ایجاد پست جدید</h3>
                    <p className="text-gray-600">نوشته جدید اضافه کنید</p>
                  </div>
                </div>
              </Link>

              <Link href="/posts" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-900">مدیریت پست‌ها</h3>
                    <p className="text-gray-600">مشاهده و ویرایش پست‌ها</p>
                  </div>
                </div>
              </Link>

              <Link href="/users" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-100">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-900">مدیریت کاربران</h3>
                    <p className="text-gray-600">مشاهده کاربران ثبت‌نام شده</p>
                  </div>
                </div>
              </Link>
            </>
          )}

          {userRole === 'AUTHOR' && (
            <>
              <Link href="/posts/new" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-900">ایجاد پست جدید</h3>
                    <p className="text-gray-600">نوشته جدید اضافه کنید</p>
                  </div>
                </div>
              </Link>

              <Link href="/posts" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-900">پست‌های من</h3>
                    <p className="text-gray-600">مشاهده و ویرایش پست‌های خود</p>
                  </div>
                </div>
              </Link>
            </>
          )}

          {userRole === 'VIEWER' && (
            <>
              <Link href="/profile" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-900">پروفایل من</h3>
                    <p className="text-gray-600">مشاهده و ویرایش پروفایل</p>
                  </div>
                </div>
              </Link>

              <Link href="/posts" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-semibold text-gray-900">مشاهده پست‌ها</h3>
                    <p className="text-gray-600">مشاهده همه پست‌ها</p>
                  </div>
                </div>
              </Link>

              <RequestAuthorButton />
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">فعالیت‌های اخیر</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
              <span className="text-gray-700">سیستم آماده و فعال است</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-3"></div>
              <span className="text-gray-700">ادیتور متن پیشرفته اضافه شد</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-yellow-500 rounded-full ml-3"></div>
              <span className="text-gray-700">سیستم احراز هویت راه‌اندازی شد</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 