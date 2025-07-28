import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  // اینجا می‌توان پیام را به ایمیل ارسال کرد یا در دیتابیس ذخیره کرد
  // فعلاً فقط لاگ می‌کنیم
  console.log("تماس جدید:", { name, email, message });
  return NextResponse.json({ message: "پیام شما دریافت شد!" });
} 