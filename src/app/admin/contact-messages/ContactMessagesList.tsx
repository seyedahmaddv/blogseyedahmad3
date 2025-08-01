'use client'

import { useState } from 'react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

interface ContactMessagesListProps {
  messages: ContactMessage[];
}

export default function ContactMessagesList({ messages }: ContactMessagesListProps) {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messagesList, setMessagesList] = useState(messages);

  const markAsRead = async (messageId: number) => {
    try {
      const response = await fetch(`/api/contact-messages/${messageId}/read`, {
        method: 'PUT',
      });

      if (response.ok) {
        setMessagesList(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, read: true } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">لیست پیام‌ها</h2>
            <p className="text-sm text-gray-500 mt-1">
              {messagesList.filter(m => !m.read).length} پیام خوانده نشده
            </p>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {messagesList.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                هیچ پیامی یافت نشد
              </div>
            ) : (
              messagesList.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                  } ${!message.read ? 'bg-yellow-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {message.subject}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        از: {message.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                    {!message.read && (
                      <div className="w-2 h-2 bg-red-500 rounded-full ml-2 flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        {selectedMessage ? (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedMessage.subject}
                </h2>
                {!selectedMessage.read && (
                  <button
                    onClick={() => markAsRead(selectedMessage.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    علامت‌گذاری به عنوان خوانده شده
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام فرستنده
                  </label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ایمیل
                  </label>
                  <p className="text-gray-900">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تاریخ ارسال
                  </label>
                  <p className="text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وضعیت
                  </label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedMessage.read 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedMessage.read ? 'خوانده شده' : 'خوانده نشده'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  پیام
                </label>
                <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-900">
                  {selectedMessage.message}
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=پاسخ به: ${selectedMessage.subject}`}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  پاسخ دادن
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">پیامی انتخاب نشده</h3>
            <p className="text-gray-500">برای مشاهده جزئیات پیام، روی آن کلیک کنید</p>
          </div>
        )}
      </div>
    </div>
  );
} 