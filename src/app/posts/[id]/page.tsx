import React from "react";

async function getPost(id: string) {
  let apiUrl = `/api/posts/${id}`;
  if (typeof window === "undefined") {
    apiUrl = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`
      : `http://localhost:3000/api/posts/${id}`;
  }
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("پست پیدا نشد");
  return res.json();
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 bg-white rounded-lg shadow mt-8" dir="rtl">
      {post.coverUrl && (
        <img src={post.coverUrl} alt="کاور پست" className="w-full rounded-lg mb-6 max-h-80 object-cover" />
      )}
      <h1 className="text-3xl font-bold mb-4 text-right text-blue-700">{post.title}</h1>
      <div className="flex flex-wrap gap-2 text-xs text-gray-400 mb-4 text-right">
        <span>{post.author || 'ناشناس'}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString('fa-IR')}</span>
      </div>
      {post.excerpt && <div className="mb-4 text-gray-600 text-right italic">{post.excerpt}</div>}
      <div className="prose prose-lg prose-slate rtl text-right max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
