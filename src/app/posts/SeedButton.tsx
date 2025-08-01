"use client";

import React, { useState } from 'react';

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setMessage('دیتابیس با موفقیت پر شد!');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setMessage(data.error || 'خطا در پر کردن دیتابیس');
      }
    } catch (error) {
      setMessage('خطا در اتصال به سرور');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition text-sm disabled:opacity-50"
      >
        {loading ? 'در حال پر کردن...' : 'پر کردن دیتابیس'}
      </button>
      {message && (
        <span className={`text-sm ${message.includes('موفقیت') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </span>
      )}
    </div>
  );
} 