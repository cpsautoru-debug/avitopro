import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  Eye,
  XCircle,
  Send,
  RefreshCw,
  Mail,
} from 'lucide-react';
import { mockMessages } from '../data';
import { Message } from '../types';

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
    sent: { label: 'Отправлено', icon: <Send size={14} />, color: 'text-blue-700', bg: 'bg-blue-50' },
    delivered: { label: 'Доставлено', icon: <CheckCircle size={14} />, color: 'text-green-700', bg: 'bg-green-50' },
    read: { label: 'Прочитано', icon: <Eye size={14} />, color: 'text-purple-700', bg: 'bg-purple-50' },
    failed: { label: 'Ошибка', icon: <XCircle size={14} />, color: 'text-red-700', bg: 'bg-red-50' },
    pending: { label: 'В очереди', icon: <Clock size={14} />, color: 'text-yellow-700', bg: 'bg-yellow-50' },
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filter === 'all' || msg.status === filter;
    const matchesSearch = search === '' ||
      msg.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      msg.recipient.includes(search) ||
      msg.adTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const retryMessage = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, status: 'pending' as const } : m));
  };

  const counts = {
    all: messages.length,
    sent: messages.filter(m => m.status === 'sent').length,
    delivered: messages.filter(m => m.status === 'delivered').length,
    read: messages.filter(m => m.status === 'read').length,
    failed: messages.filter(m => m.status === 'failed').length,
    pending: messages.filter(m => m.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Сообщения</h1>
        <p className="text-gray-500 mt-1">История отправленных сообщений</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по имени, телефону или объявлению..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {Object.entries(counts).map(([key, count]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === key
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {key === 'all' ? 'Все' : statusConfig[key]?.label} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Получатель</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Объявление</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Сообщение</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Время</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMessages.map((msg) => {
                const config = statusConfig[msg.status];
                return (
                  <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                          {msg.recipientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{msg.recipientName}</div>
                          <div className="text-xs text-gray-500">{msg.recipient}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-gray-900 max-w-[200px] truncate">{msg.adTitle}</div>
                      <div className="text-xs text-gray-400">{msg.adId}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-gray-600 max-w-[250px] truncate">{msg.template}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        {config.icon}
                        {config.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-gray-600">{msg.sentAt}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        {msg.status === 'failed' && (
                          <button
                            onClick={() => retryMessage(msg.id)}
                            className="p-1.5 rounded-lg text-orange-500 hover:bg-orange-50 transition-colors"
                            title="Повторить"
                          >
                            <RefreshCw size={16} />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors" title="Подробнее">
                          <Mail size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">Сообщения не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
