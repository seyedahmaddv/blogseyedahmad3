'use client'
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <header className="w-full py-4 px-8 bg-white shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">وبلاگ سید احمد</h1>
        <nav className="flex gap-4">
          <Link href="/" className="text-blue-600 hover:underline">خانه</Link>
          <Link href="/posts" className="text-blue-600 hover:underline">پست‌ها</Link>
          <Link href="/about" className="text-blue-600 hover:underline">درباره ما</Link>
          <Link href="/dashboard" className="text-blue-600 hover:underline">داشبورد</Link>
          <Link href="/auth/signin" className="text-blue-600 hover:underline">ورود</Link>
          <Link href="/auth/register" className="text-blue-600 hover:underline">ثبت‌نام</Link>
          <button
            className="text-white bg-primary px-4 py-1 rounded hover:bg-blue-800 transition"
            onClick={() => setShowContact(true)}
          >
            تماس
          </button>
        </nav>
      </header>
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 left-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowContact(false)}
              aria-label="بستن"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-right">فرم تماس با ما</h2>
            <ContactForm onSent={() => setShowContact(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function ContactForm({ onSent }: { onSent: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("ارسال پیام با خطا مواجه شد");
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSuccess(false);
        onSent();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "خطای نامشخص");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-right">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="نام شما"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="ایمیل شما"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="متن پیام"
        className="w-full border p-2 rounded h-24"
        required
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "در حال ارسال..." : "ارسال پیام"}
      </button>
      {success && <div className="text-green-600">پیام شما با موفقیت ارسال شد.</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
} 