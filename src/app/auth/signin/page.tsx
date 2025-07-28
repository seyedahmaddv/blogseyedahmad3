import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">ورود به حساب کاربری</h1>
      <form method="post" action="/api/auth/callback/credentials" className="flex flex-col gap-4 w-80">
        <input name="csrfToken" type="hidden" defaultValue={""} />
        <input
          name="email"
          type="email"
          placeholder="ایمیل"
          required
          className="border rounded px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          required
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">ورود</button>
      </form>
      <p className="mt-4">
        حساب کاربری ندارید؟{' '}
        <Link href="/auth/register" className="text-blue-600 underline">ثبت‌نام</Link>
      </p>
    </div>
  );
} 