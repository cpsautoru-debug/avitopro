import React, { useState } from 'react';
import { Page } from './types';
import { mockSubscription } from './data';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Campaigns from './components/Campaigns';
import Messages from './components/Messages';
import Templates from './components/Templates';
import Contacts from './components/Contacts';
import Subscription from './components/Subscription';
import Settings from './components/Settings';
import { Menu, X, Bell, Search } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'Рассылка "iPhone" завершена на 95%', time: '5 мин назад', type: 'success' },
    { id: 2, text: 'Новый ответ от Алексей К.', time: '12 мин назад', type: 'info' },
    { id: 3, text: 'Превышен лимит задержки для 3 сообщений', time: '1 час назад', type: 'warning' },
    { id: 4, text: 'Подписка Pro продлена до 15.02.2026', time: '3 часа назад', type: 'success' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'campaigns': return <Campaigns />;
      case 'messages': return <Messages />;
      case 'templates': return <Templates />;
      case 'contacts': return <Contacts />;
      case 'subscription': return <Subscription />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            setSidebarOpen(false);
          }}
          messagesLeft={mockSubscription.messagesLeft}
        />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Быстрый поиск..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h4 className="font-semibold text-gray-900">Уведомления</h4>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              n.type === 'success' ? 'bg-green-500' :
                              n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                            }`} />
                            <div>
                              <p className="text-sm text-gray-700">{n.text}</p>
                              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-green-700">API Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="px-4 lg:px-8 py-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>© 2026 AvitoSender Pro. Все права защищены.</span>
            <div className="flex items-center gap-4">
              <span>Версия 2.4.1</span>
              <span>•</span>
              <span>Документация API</span>
              <span>•</span>
              <span>Поддержка</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
