/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // آبی تیره
        accent: '#60a5fa',  // آبی روشن
        background: '#f3f4f6', // خاکستری خیلی روشن
        muted: '#6b7280', // خاکستری متوسط
        success: '#10b981', // سبز ملایم
        error: '#ef4444', // قرمز ملایم
      },
      fontFamily: {
        vazir: ["Vazirmatn", "Vazirmatn FD", "Tahoma", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 