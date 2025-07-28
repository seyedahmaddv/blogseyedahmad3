"use client";
import React, { useState, useEffect } from "react";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({ title: "", slug: "", content: "", excerpt: "", author: "", coverUrl: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${params.id}`);
      if (res.ok) {
        const post = await res.json();
        setForm(post);
      } else {
        setError("پست پیدا نشد");
      }
    }
    fetchPost();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("خطا در ویرایش پست");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("آیا مطمئن هستید که می‌خواهید این پست را حذف کنید؟")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("خطا در حذف پست");
      window.location.href = "/posts";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-right">ویرایش پست</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="عنوان" className="w-full border p-2 rounded text-right" required />
        <input name="slug" value={form.slug} onChange={handleChange} placeholder="اسلاگ (لاتین)" className="w-full border p-2 rounded text-right" required />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="متن کامل پست"
          className="w-full border p-2 rounded h-32 text-right"
          required
        />
        <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="خلاصه (اختیاری)" className="w-full border p-2 rounded text-right" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="نویسنده (اختیاری)" className="w-full border p-2 rounded text-right" />
        <input name="coverUrl" value={form.coverUrl} onChange={handleChange} placeholder="آدرس تصویر کاور (اختیاری)" className="w-full border p-2 rounded text-right" />
        <div className="flex gap-2 justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "در حال ارسال..." : "ذخیره تغییرات"}
          </button>
          <button type="button" className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete} disabled={loading}>
            حذف پست
          </button>
        </div>
        {success && <div className="text-green-600 text-right">پست با موفقیت ویرایش شد.</div>}
        {error && <div className="text-red-600 text-right">{error}</div>}
      </form>
    </div>
  );
}
