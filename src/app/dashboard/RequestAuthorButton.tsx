'use client'

import { useState } from 'react';

export default function RequestAuthorButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRequest = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/request-author', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('درخواست شما با موفقیت ثبت شد!');
      } else {
        setMessage(data.error || 'خطا در ثبت درخواست');
      }
    } catch (error) {
      setMessage('خطا در اتصال به سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-orange-100">
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div className="mr-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">درخواست نویسنده شدن</h3>
          <p className="text-gray-600">برای نوشتن پست درخواست دهید</p>
          {message && (
            <p className={`text-sm mt-2 ${message.includes('موفقیت') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
        <button
          onClick={handleRequest}
          disabled={loading}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? 'در حال ارسال...' : 'درخواست'}
        </button>
      </div>
    </div>
  );
} 