'use client'
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4 text-red-600">خطا در ورود یا ثبت‌نام</h1>
      <p className="text-red-500">{error || "مشکلی پیش آمده است. لطفاً دوباره تلاش کنید."}</p>
      <a href="/auth/signin" className="mt-4 text-blue-600 underline">بازگشت به ورود</a>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-screen py-2">در حال بارگذاری...</div>}>
      <ErrorContent />
    </Suspense>
  );
} 