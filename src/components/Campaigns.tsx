import React, { useState } from 'react';
import {
  Send,
  Pause,
  Play,
  Trash2,
  Plus,
  MoreVertical,
  Users,
  CheckCircle,
  Eye,
  XCircle,
  Clock,
} from 'lucide-react';
import { mockCampaigns } from '../data';
import { Campaign } from '../types';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [showCreate, setShowCreate] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: '', template: '', recipients: '' });

  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: 'Активна', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
    paused: { label: 'Пауза', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' },
    completed: { label: 'Завершена', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    draft: { label: 'Черновик', color: 'text-gray-700', bg: 'bg-gray-50 border-gray-200' },
  };

  const handleCreate = () => {
    if (newCampaign.name && newCampaign.template) {
      const campaign: Campaign = {
        id: String(Date.now()),
        name: newCampaign.name,
        template: newCampaign.template,
        status: 'draft',
        totalRecipients: parseInt(newCampaign.recipients) || 0,
        sentCount: 0,
        deliveredCount: 0,
        readCount: 0,
        failedCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCampaigns([campaign, ...campaigns]);
      setNewCampaign({ name: '', template: '', recipients: '' });
      setShowCreate(false);
    }
  };

  const toggleStatus = (id: string) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'active' ? 'paused' : 'active' };
      }
      return c;
    }));
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Рассылки</h1>
          <p className="text-gray-500 mt-1">Управление кампаниями по отправке сообщений</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-green-500/25 transition-all"
        >
          <Plus size={18} />
          Новая рассылка
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-in">
          <h3 className="font-semibold text-gray-900 mb-4">Создать рассылку</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
              <input
                type="text"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                placeholder="Например: Рассылка по iPhone"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Шаблон</label>
              <select
                value={newCampaign.template}
                onChange={(e) => setNewCampaign({ ...newCampaign, template: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Выберите шаблон</option>
                <option value="Приветствие">Приветствие</option>
                <option value="Торг">Торг</option>
                <option value="Доставка">Доставка</option>
                <option value="Просмотр">Просмотр</option>
                <option value="Авто/Запчасти">Авто/Запчасти</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Кол-во получателей</label>
              <input
                type="number"
                value={newCampaign.recipients}
                onChange={(e) => setNewCampaign({ ...newCampaign, recipients: e.target.value })}
                placeholder="100"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Создать
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Campaign List */}
      <div className="space-y-3">
        {campaigns.map((campaign) => {
          const config = statusConfig[campaign.status];
          const progress = campaign.totalRecipients > 0 ? (campaign.sentCount / campaign.totalRecipients) * 100 : 0;

          return (
            <div key={campaign.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>Шаблон: {campaign.template}</span>
                    <span>•</span>
                    <span>Создана: {campaign.createdAt}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users size={14} className="text-gray-400" />
                      <span className="text-gray-600">{campaign.totalRecipients} получателей</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Send size={14} className="text-blue-500" />
                      <span className="text-gray-600">{campaign.sentCount} отправлено</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="text-gray-600">{campaign.deliveredCount} доставлено</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Eye size={14} className="text-purple-500" />
                      <span className="text-gray-600">{campaign.readCount} прочитано</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>{Math.round(progress)}% завершено</span>
                    {campaign.failedCount > 0 && (
                      <span className="text-red-500 flex items-center gap-1">
                        <XCircle size={12} /> {campaign.failedCount} ошибок
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 ml-4">
                  {(campaign.status === 'active' || campaign.status === 'paused') && (
                    <button
                      onClick={() => toggleStatus(campaign.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        campaign.status === 'active'
                          ? 'text-yellow-600 hover:bg-yellow-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={campaign.status === 'active' ? 'Пауза' : 'Продолжить'}
                    >
                      {campaign.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                  )}
                  {campaign.status === 'draft' && (
                    <button
                      onClick={() => toggleStatus(campaign.id)}
                      className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                      title="Запустить"
                    >
                      <Play size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteCampaign(campaign.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    title="Удалить"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
