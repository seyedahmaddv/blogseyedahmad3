import React from "react";
import Image from "next/image";
import Link from "next/link";

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

async function getPost(id: string) {
  try {
    let apiUrl = `/api/posts/${id}`;
    if (typeof window === "undefined") {
      apiUrl = process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`
        : `http://localhost:3000/api/posts/${id}`;
    }
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error('Failed to fetch post:', res.status, res.statusText);
      throw new Error("پست پیدا نشد");
    }
    return res.json();
  } catch (error) {
    console.error('Error in getPost:', error);
    throw error;
  }
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post: Post = await getPost(id);
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 bg-white rounded-lg shadow mt-8" dir="rtl">
        {post.coverUrl && (
          <Image 
            src={post.coverUrl} 
            alt="کاور پست" 
            className="w-full rounded-lg mb-6 max-h-80 object-cover"
            width={800}
            height={400}
          />
        )}
        <h1 className="text-3xl font-bold mb-4 text-right text-blue-700">{post.title}</h1>
        <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-4 text-right">
          <span>{post.author?.name || post.author?.email || 'ناشناس'}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString('fa-IR')}</span>
        </div>
        {post.excerpt && <div className="mb-4 text-gray-600 text-right italic">{post.excerpt}</div>}
        <div className="prose prose-lg prose-slate rtl text-right max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link 
            href="/posts" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← بازگشت به لیست پست‌ها
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 bg-white rounded-lg shadow mt-8" dir="rtl">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">خطا در بارگذاری پست</h2>
            <p className="text-gray-600 mb-4">متأسفانه نمی‌توانیم این پست را بارگذاری کنیم.</p>
            <div className="space-y-2 text-sm text-gray-500 mb-4">
              <p>• ممکن است پست حذف شده باشد</p>
              <p>• یا مشکلی در اتصال به سرور وجود دارد</p>
            </div>
            <div className="space-x-4">
              <Link 
                href="/posts" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                بازگشت به لیست پست‌ها
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                تلاش مجدد
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
