'use client'

import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';

interface Subscriber {
  id: number;
  email: string;
  name: string | null;
  subscribed: boolean;
  createdAt: Date;
}

interface Campaign {
  id: number;
  title: string;
  status: string;
  sentAt: Date | null;
  createdAt: Date;
}

interface NewsletterManagementProps {
  subscribers: Subscriber[];
  campaigns: Campaign[];
}

export default function NewsletterManagement({ subscribers, campaigns }: NewsletterManagementProps) {
  const [activeTab, setActiveTab] = useState<'subscribers' | 'campaigns' | 'create'>('subscribers');
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCampaign),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('کمپین با موفقیت ایجاد شد');
        setNewCampaign({ title: '', content: '' });
        // Refresh the page to show new campaign
        window.location.reload();
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('خطا در ایجاد کمپین');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCampaign = async (campaignId: number) => {
    if (!confirm('آیا مطمئن هستید که می‌خواهید این خبرنامه را ارسال کنید؟')) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`خبرنامه با موفقیت ارسال شد. ${data.stats.success} ایمیل ارسال شد.`);
        window.location.reload();
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('خطا در ارسال خبرنامه');
    } finally {
      setLoading(false);
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

  const activeSubscribers = subscribers.filter(s => s.subscribed);
  const inactiveSubscribers = subscribers.filter(s => !s.subscribed);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'subscribers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            مشترکان ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'campaigns'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            کمپین‌ها ({campaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'create'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ایجاد کمپین جدید
          </button>
        </nav>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('موفقیت') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Subscribers */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                مشترکان فعال ({activeSubscribers.length})
              </h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {activeSubscribers.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  هیچ مشترک فعالی یافت نشد
                </div>
              ) : (
                activeSubscribers.map((subscriber) => (
                  <div key={subscriber.id} className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{subscriber.email}</p>
                        {subscriber.name && (
                          <p className="text-sm text-gray-500">{subscriber.name}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          عضویت: {formatDate(subscriber.createdAt)}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        فعال
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inactive Subscribers */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                مشترکان غیرفعال ({inactiveSubscribers.length})
              </h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {inactiveSubscribers.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  هیچ مشترک غیرفعالی یافت نشد
                </div>
              ) : (
                inactiveSubscribers.map((subscriber) => (
                  <div key={subscriber.id} className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{subscriber.email}</p>
                        {subscriber.name && (
                          <p className="text-sm text-gray-500">{subscriber.name}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          عضویت: {formatDate(subscriber.createdAt)}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        غیرفعال
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">کمپین‌های خبرنامه</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    وضعیت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاریخ ایجاد
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاریخ ارسال
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'SENT' 
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'SCHEDULED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status === 'SENT' ? 'ارسال شده' : 
                         campaign.status === 'SCHEDULED' ? 'زمان‌بندی شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(campaign.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.sentAt ? formatDate(campaign.sentAt) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {campaign.status === 'DRAFT' && (
                        <button
                          onClick={() => handleSendCampaign(campaign.id)}
                          disabled={loading}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                        >
                          ارسال
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Campaign Tab */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">ایجاد کمپین جدید</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleCreateCampaign} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  عنوان خبرنامه
                </label>
                <input
                  type="text"
                  id="title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="عنوان خبرنامه را وارد کنید"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  محتوای خبرنامه
                </label>
                <RichTextEditor
                  value={newCampaign.content}
                  onChange={(content) => setNewCampaign({ ...newCampaign, content })}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'در حال ایجاد...' : 'ایجاد کمپین'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 