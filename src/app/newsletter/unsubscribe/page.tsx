 'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUnsubscribe = async () => {
    if (!email) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSuccess(true);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('خطا در لغو اشتراک');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      handleUnsubscribe();
    }
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">لغو اشتراک خبرنامه</h1>
          
          {email && (
            <p className="text-gray-600 mb-6">
              در حال لغو اشتراک برای: <strong>{email}</strong>
            </p>
          )}

          {loading && (
            <div className="text-blue-600 mb-4">
              در حال پردازش...
            </div>
          )}

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              success 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          {success && (
            <div className="space-y-4">
              <p className="text-gray-600">
                اشتراک شما با موفقیت لغو شد. دیگر ایمیل‌های خبرنامه دریافت نخواهید کرد.
              </p>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                بازگشت به صفحه اصلی
              </Link>
            </div>
          )}

          {!email && !loading && (
            <div className="text-red-600">
              لینک نامعتبر است. لطفاً از لینک موجود در ایمیل استفاده کنید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}