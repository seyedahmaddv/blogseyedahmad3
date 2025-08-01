'use client'

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("ایمیل یا رمز عبور اشتباه است");
      } else {
        // ورود موفق - به صفحه اصلی یا callbackUrl برو
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      setError("خطا در ورود");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">ورود به حساب کاربری</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <input
          name="email"
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded px-3 py-2"
        />
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
                   <p className="mt-4">
               حساب کاربری ندارید؟{' '}
               <Link href="/auth/register" className="text-blue-600 underline">ثبت‌نام</Link>
             </p>
             <p className="mt-2">
               <Link href="/auth/forgot-password" className="text-blue-600 underline">فراموشی رمز عبور</Link>
             </p>
    </div>
  );
} 