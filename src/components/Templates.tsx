import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Copy,
  FileText,
  Tag,
  Hash,
  X,
  Check,
} from 'lucide-react';
import { mockTemplates } from '../data';
import { Template } from '../types';

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '', category: 'Общие' });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Общие', 'Торговля', 'Доставка', 'Встречи', 'Повторные', 'Авто'];

  const handleCreate = () => {
    if (newTemplate.name && newTemplate.content) {
      const variables = newTemplate.content.match(/\{[^}]+\}/g) || [];
      const template: Template = {
        id: String(Date.now()),
        name: newTemplate.name,
        content: newTemplate.content,
        category: newTemplate.category,
        usageCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        variables: [...new Set(variables)],
      };
      setTemplates([template, ...templates]);
      setNewTemplate({ name: '', content: '', category: 'Общие' });
      setShowCreate(false);
    }
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const copyTemplate = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const grouped = templates.reduce((acc, t) => {
    if (!acc[t.category]) acc[t.category] = [];
    acc[t.category].push(t);
    return acc;
  }, {} as Record<string, Template[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Шаблоны сообщений</h1>
          <p className="text-gray-500 mt-1">Управление шаблонами для рассылок</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-green-500/25 transition-all"
        >
          <Plus size={18} />
          Новый шаблон
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Создать шаблон</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
              <input
                type="text"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                placeholder="Например: Приветствие"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
              <select
                value={newTemplate.category}
                onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Текст шаблона</label>
            <textarea
              value={newTemplate.content}
              onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
              placeholder="Используйте переменные: {name}, {ad_title}, {city}..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
            />
            <div className="mt-2 text-xs text-gray-400">
              Доступные переменные: {'{name}'}, {'{ad_title}'}, {'{city}'}, {'{offer_price}'}, {'{time}'}, {'{part_name}'}, {'{car_model}'}
            </div>
          </div>
          <div className="flex gap-3">
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

      {/* Templates by Category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{category}</h3>
            <span className="text-xs text-gray-400">({items.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                      <FileText size={16} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                      <span className="text-xs text-gray-400">Использован {template.usageCount} раз</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyTemplate(template.id, template.content)}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                      title="Копировать"
                    >
                      {copiedId === template.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                    <button
                      onClick={() => deleteTemplate(template.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="Удалить"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 font-mono text-xs leading-relaxed">
                  {template.content}
                </p>
                {template.variables.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {template.variables.map((v, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-mono">
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
