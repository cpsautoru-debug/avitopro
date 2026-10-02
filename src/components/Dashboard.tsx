import React from 'react';
import {
  Send,
  CheckCircle,
  Eye,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { chartData, hourlyData, mockCampaigns } from '../data';

const stats = [
  { label: 'Отправлено сегодня', value: '876', change: '+12%', up: true, icon: <Send size={20} />, color: 'from-blue-500 to-blue-600' },
  { label: 'Доставлено', value: '834', change: '+8%', up: true, icon: <CheckCircle size={20} />, color: 'from-green-500 to-green-600' },
  { label: 'Прочитано', value: '567', change: '+15%', up: true, icon: <Eye size={20} />, color: 'from-purple-500 to-purple-600' },
  { label: 'Ошибки', value: '12', change: '-3%', up: false, icon: <AlertTriangle size={20} />, color: 'from-red-500 to-red-600' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-500 mt-1">Обзор активности рассылок</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>Обновлено: только что</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.up ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
              }`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Активность за неделю</h3>
              <p className="text-sm text-gray-500">Отправленные, доставленные и прочитанные</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" />Отправлено</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500" />Доставлено</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-purple-500" />Прочитано</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRead" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} fill="url(#colorSent)" />
              <Area type="monotone" dataKey="delivered" stroke="#22c55e" strokeWidth={2} fill="url(#colorDelivered)" />
              <Area type="monotone" dataKey="read" stroke="#a855f7" strokeWidth={2} fill="url(#colorRead)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-1">Активность по часам</h3>
          <p className="text-sm text-gray-500 mb-4">Сегодня</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Campaigns & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campaigns */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Активные рассылки</h3>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
              {mockCampaigns.filter(c => c.status === 'active').length} активных
            </span>
          </div>
          <div className="space-y-3">
            {mockCampaigns.filter(c => c.status === 'active' || c.status === 'paused').map((campaign) => (
              <div key={campaign.id} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">{campaign.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {campaign.status === 'active' ? 'Активна' : 'Пауза'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{campaign.sentCount}/{campaign.totalRecipients} отправлено</span>
                  <span>•</span>
                  <span>{campaign.readCount} прочитано</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${(campaign.sentCount / campaign.totalRecipients) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Конверсия</h3>
            <TrendingUp size={18} className="text-green-500" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div>
                <div className="text-sm font-medium text-blue-900">Доставляемость</div>
                <div className="text-xs text-blue-600">Успешно доставленных</div>
              </div>
              <div className="text-2xl font-bold text-blue-700">95.2%</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div>
                <div className="text-sm font-medium text-purple-900">Читаемость</div>
                <div className="text-xs text-purple-600">Прочитанных от доставленных</div>
              </div>
              <div className="text-2xl font-bold text-purple-700">67.9%</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div>
                <div className="text-sm font-medium text-green-900">Ответы</div>
                <div className="text-xs text-green-600">Получивших ответ</div>
              </div>
              <div className="text-2xl font-bold text-green-700">34.5%</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
              <div>
                <div className="text-sm font-medium text-orange-900">Среднее время ответа</div>
                <div className="text-xs text-orange-600">От получателя</div>
              </div>
              <div className="text-2xl font-bold text-orange-700">12м</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
