import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto" dir="rtl">
        <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">صفحه مورد نظر یافت نشد</h1>
        <p className="text-gray-600 mb-6">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
        </p>
        <div className="space-y-3">
          <Link 
            href="/" 
            className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link 
            href="/posts" 
            className="block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
          >
            مشاهده پست‌ها
          </Link>
          <Link 
            href="/about" 
            className="block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            درباره ما
          </Link>
        </div>
      </div>
    </main>
  );
} 