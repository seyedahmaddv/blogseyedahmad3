"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      alert("ثبت‌نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.");
      router.push("/auth/signin?callbackUrl=/");
    } else {
      const data = await res.json();
      setError(data.message || "خطا در ثبت‌نام");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">ثبت‌نام</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input name="name" type="text" placeholder="نام" required className="border rounded px-3 py-2" />
        <input name="email" type="email" placeholder="ایمیل" required className="border rounded px-3 py-2" />
        <input name="password" type="password" placeholder="رمز عبور" required className="border rounded px-3 py-2" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">ثبت‌نام</button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
} 