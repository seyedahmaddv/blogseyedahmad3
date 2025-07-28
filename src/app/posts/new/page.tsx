"use client";
import React, { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewPostPage() {
  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", author: "", coverUrl: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content: string) => {
    setForm({ ...form, content });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      let apiUrl = "/api/posts";
      if (typeof window === "undefined") {
        apiUrl = process.env.NEXT_PUBLIC_BASE_URL
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
          : "http://localhost:3001/api/posts";
      }
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("خطا در ثبت پست");
      setSuccess(true);
      setForm({ title: "", slug: "", content: "", excerpt: "", author: "", coverUrl: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 bg-white rounded-lg shadow mt-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-right">ایجاد پست جدید</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="عنوان" className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-right" required />
        <input name="slug" value={form.slug} onChange={handleChange} placeholder="اسلاگ (لاتین)" className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-right" required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">متن کامل پست</label>
          <RichTextEditor value={form.content} onChange={handleContentChange} />
        </div>
        <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="خلاصه (اختیاری)" className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-right" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="نویسنده (اختیاری)" className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-right" />
        <input name="coverUrl" value={form.coverUrl} onChange={handleChange} placeholder="آدرس تصویر کاور (اختیاری)" className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-right" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition w-full" disabled={loading}>{loading ? "در حال ارسال..." : "ثبت پست"}</button>
        {success && <div className="text-green-600 text-right">پست با موفقیت ثبت شد.</div>}
        {error && <div className="text-red-600 text-right">{error}</div>}
      </form>
    </div>
  );
}
