'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto" dir="rtl">
        <div className="text-6xl font-bold text-red-600 mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">خطای غیرمنتظره</h1>
        <p className="text-gray-600 mb-4">
          متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-500 mb-4">
            کد خطا: {error.digest}
          </p>
        )}
        <div className="space-y-3">
          <button 
            onClick={reset}
            className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            تلاش مجدد
          </button>
          <Link 
            href="/" 
            className="block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link 
            href="/posts" 
            className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            مشاهده پست‌ها
          </Link>
        </div>
      </div>
    </main>
  );
} 