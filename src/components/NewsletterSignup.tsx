'use client'

import { useState } from 'react';

export default function NewsletterSignup() {
  const [form, setForm] = useState({
    email: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setForm({ email: '', name: '' });
      } else {
        setMessage(data.error);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('خطا در اتصال به سرور');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">عضویت در خبرنامه</h3>
        <p className="text-blue-100">
          آخرین اخبار و مطالب را از طریق ایمیل دریافت کنید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="نام شما (اختیاری)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        
        <div>
          <input
            type="email"
            placeholder="ایمیل شما"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'در حال عضویت...' : 'عضویت در خبرنامه'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          messageType === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {message}
        </div>
      )}

      <p className="text-xs text-blue-100 mt-4 text-center">
        با عضویت، موافقت خود را با دریافت ایمیل‌های خبرنامه اعلام می‌کنید.
        <br />
        می‌توانید در هر زمان اشتراک خود را لغو کنید.
      </p>
    </div>
  );
} 