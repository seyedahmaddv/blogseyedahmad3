import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-8 bg-white shadow flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700">وبلاگ سید احمد</h1>
      <nav className="flex gap-4">
        <Link href="/dashboard" className="text-blue-600 hover:underline">داشبورد</Link>
        <Link href="/auth/signin" className="text-blue-600 hover:underline">ورود</Link>
        <Link href="/auth/register" className="text-blue-600 hover:underline">ثبت‌نام</Link>
      </nav>
    </header>
  );
} 