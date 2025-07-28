import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وبلاگ سید احمد",
  description: "طراحی سایت و برنامه نویسی",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://cdn.fontcdn.ir/Fonts/Vazirmatn/Vazirmatn-font-face.css" />
      </head>
      <body className="font-vazir bg-background text-gray-900">
        {children}
      </body>
    </html>
  );
}
