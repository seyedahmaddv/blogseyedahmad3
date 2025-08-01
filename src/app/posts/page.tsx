import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import SeedButton from './SeedButton';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: {
    name?: string;
    email?: string;
  };
  coverUrl?: string;
  createdAt: string;
}

async function getPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error('Failed to fetch posts:', res.status, res.statusText);
      throw new Error('Failed to fetch posts');
    }
    return res.json();
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
}



export default async function PostsPage() {
  try {
    const posts: Post[] = await getPosts();
    return (
      <main className="container mx-auto p-4 min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-right">لیست پست‌ها</h1>
          <div className="flex gap-2">
            <SeedButton />
            <Link href="/posts/new" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition">ایجاد پست جدید</Link>
          </div>
        </div>
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>هیچ پستی یافت نشد.</p>
            <p className="mt-2 text-sm">لطفاً دکمه پر کردن دیتابیس را بزنید.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post) => (
              <div key={post.id} className="bg-white border rounded-lg shadow hover:shadow-lg transition flex flex-col">
                {post.coverUrl && (
                  <Image 
                    src={post.coverUrl} 
                    alt={post.title} 
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-lg font-semibold mb-2 text-right">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-3 text-right overflow-hidden text-ellipsis">{post.excerpt}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>{post.author?.name || post.author?.email || 'ناشناس'}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link
                    href={`/posts/${post.id}`}
                    className="mt-auto text-blue-600 hover:text-blue-800 text-right font-medium"
                  >
                    مشاهده بیشتر →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Error loading posts page:', error);
    return (
      <main className="container mx-auto p-4 min-h-screen bg-gray-50">
        <div className="text-center py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-600 mb-4">خطا در بارگذاری پست‌ها</h2>
            <p className="text-gray-600 mb-4">متأسفانه در حال حاضر نمی‌توانیم پست‌ها را بارگذاری کنیم.</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• بررسی اتصال اینترنت</p>
              <p>• تلاش مجدد در چند دقیقه</p>
              <p>• تماس با پشتیبانی در صورت تداوم مشکل</p>
            </div>
            <Link 
              href="/posts"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
            >
              تلاش مجدد
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
