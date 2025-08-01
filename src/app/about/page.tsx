import React from 'react';
import ContactForm from './ContactForm';

export default function AboutPage() {
  return (
    <main className="container mx-auto p-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">درباره ما</h1>
          
          <div className="prose prose-lg max-w-none text-right">
            <p className="text-gray-700 leading-relaxed mb-6">
              به وبلاگ سید احمد خوش آمدید! این وبلاگ با هدف به اشتراک‌گذاری دانش، تجربیات و دیدگاه‌های شخصی در زمینه‌های مختلف ایجاد شده است.
            </p>
            
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">اهداف ما</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>به اشتراک‌گذاری دانش و تجربیات مفید</li>
              <li>ایجاد فضایی برای تعامل و گفتگو</li>
              <li>ارائه محتوای با کیفیت و کاربردی</li>
              <li>پشتیبانی از جامعه فارسی‌زبان</li>
            </ul>
            
            <div className="bg-blue-50 p-6 rounded-lg border-r-4 border-blue-500">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">نکات مهم</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• تمام محتوای این وبلاگ با دقت و وسواس تهیه می‌شود</li>
                <li>• نظرات و پیشنهادات شما برای بهبود محتوا بسیار ارزشمند است</li>
                <li>• سعی می‌کنیم در اسرع وقت به پیام‌های شما پاسخ دهیم</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">تماس با ما</h2>
          <p className="text-gray-700 mb-6 text-center">
            اگر سوال، پیشنهاد یا انتقادی دارید، خوشحال می‌شویم که با ما در میان بگذارید.
          </p>
          <ContactForm />
        </div>
      </div>
    </main>
  );
} 