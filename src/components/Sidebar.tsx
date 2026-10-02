import React from 'react';
import { Page } from '../types';
import {
  LayoutDashboard,
  Send,
  MessageSquare,
  FileText,
  Users,
  CreditCard,
  Settings,
  Zap,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  messagesLeft: number;
}

const menuItems: { id: Page; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'dashboard', label: 'Дашборд', icon: <LayoutDashboard size={20} /> },
  { id: 'campaigns', label: 'Рассылки', icon: <Send size={20} /> },
  { id: 'messages', label: 'Сообщения', icon: <MessageSquare size={20} /> },
  { id: 'templates', label: 'Шаблоны', icon: <FileText size={20} /> },
  { id: 'contacts', label: 'Контакты', icon: <Users size={20} /> },
  { id: 'subscription', label: 'Подписка', icon: <CreditCard size={20} /> },
  { id: 'settings', label: 'Настройки API', icon: <Settings size={20} /> },
];

export default function Sidebar({ currentPage, onPageChange, messagesLeft }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen fixed left-0 top-0 bottom-0 z-50">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
            <Zap size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">AvitoSender</h1>
            <span className="text-xs text-gray-400">Pro Edition</span>
          </div>
        </div>
      </div>

      {/* Messages counter */}
      <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
        <div className="text-xs text-green-400 mb-1">Сообщений осталось</div>
        <div className="text-2xl font-bold text-white">{messagesLeft.toLocaleString()}</div>
        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: '77%' }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
              currentPage === item.id
                ? 'bg-green-500/15 text-green-400 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className={currentPage === item.id ? 'text-green-400' : 'text-gray-500 group-hover:text-gray-300'}>
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {currentPage === item.id && <ChevronRight size={14} className="text-green-400" />}
          </button>
        ))}
      </nav>

      {/* API Status */}
      <div className="mx-4 mb-3 p-3 bg-gray-800/50 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-400">API подключён</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Задержка: 42ms</div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
            ИП
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">ИП Иванов А.С.</div>
            <div className="text-xs text-gray-500">Pro план</div>
          </div>
          <button className="text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
