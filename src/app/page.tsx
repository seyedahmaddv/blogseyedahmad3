import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <section className="max-w-2xl w-full text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">به وبلاگ من خوش آمدید!</h2>
          <p className="text-gray-600 mb-4">اینجا می‌توانید نوشته‌های من را بخوانید، نظر دهید و با من در ارتباط باشید.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/about" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">درباره ما</Link>
            <Link href="/posts" className="bg-gray-200 text-blue-700 px-4 py-2 rounded hover:bg-gray-300">نوشته‌ها</Link>
          </div>
        </section>
        <section className="w-full max-w-3xl">
          <h3 className="text-xl font-semibold mb-4 text-right">نمونه نوشته‌ها</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نمونه پست */}
            <div className="bg-white rounded shadow p-4 flex flex-col items-start">
              <h4 className="font-bold text-lg mb-2">اولین پست تستی</h4>
              <p className="text-gray-600 mb-2">این یک نمونه پست برای نمایش ظاهر بلاگ است.</p>
              <Link href="/posts/1" className="text-blue-600 hover:underline mt-auto">مشاهده</Link>
            </div>
            <div className="bg-white rounded shadow p-4 flex flex-col items-start">
              <h4 className="font-bold text-lg mb-2">دومین پست تستی</h4>
              <p className="text-gray-600 mb-2">شما می‌توانید پست‌های بیشتری اضافه کنید و این بخش را پویا کنید.</p>
              <Link href="/posts/2" className="text-blue-600 hover:underline mt-auto">مشاهده</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
