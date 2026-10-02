import React, { useState } from 'react';
import {
  Search,
  Plus,
  UserCheck,
  UserX,
  Ban,
  Tag,
  Phone,
  Mail,
  MoreVertical,
  Trash2,
  Edit3,
  X,
} from 'lucide-react';
import { mockContacts } from '../data';
import { Contact } from '../types';

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '', tags: '' });

  const statusConfig: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
    active: { label: 'Активен', icon: <UserCheck size={14} />, color: 'text-green-700', bg: 'bg-green-50' },
    inactive: { label: 'Неактивен', icon: <UserX size={14} />, color: 'text-gray-600', bg: 'bg-gray-100' },
    blocked: { label: 'Заблокирован', icon: <Ban size={14} />, color: 'text-red-700', bg: 'bg-red-50' },
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreate = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: String(Date.now()),
        name: newContact.name,
        phone: newContact.phone,
        email: newContact.email,
        avitoId: `AV-${Math.floor(100000 + Math.random() * 900000)}`,
        lastContact: new Date().toISOString().split('T')[0],
        status: 'active',
        tags: newContact.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      setContacts([contact, ...contacts]);
      setNewContact({ name: '', phone: '', email: '', tags: '' });
      setShowCreate(false);
    }
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const toggleStatus = (id: string) => {
    setContacts(contacts.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'active' ? 'inactive' : 'active';
        return { ...c, status: nextStatus as Contact['status'] };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Контакты</h1>
          <p className="text-gray-500 mt-1">База получателей сообщений ({contacts.length})</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-green-500/25 transition-all"
        >
          <Plus size={18} />
          Добавить контакт
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Новый контакт</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Иван Иванов"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input
                type="text"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                placeholder="+7 (900) 123-45-67"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Теги (через запятую)</label>
              <input
                type="text"
                value={newContact.tags}
                onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
                placeholder="VIP, Покупатель"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition-colors">Добавить</button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">Отмена</button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени, телефону, email или тегам..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((contact) => {
          const config = statusConfig[contact.status];
          return (
            <div key={contact.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-green-700">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{contact.name}</h4>
                    <span className={`inline-flex items-center gap-1 text-xs ${config.color}`}>
                      {config.icon} {config.label}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toggleStatus(contact.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors" title="Изменить статус">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => deleteContact(contact.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Удалить">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} className="text-gray-400" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <span>Avito ID: {contact.avitoId}</span>
                  <span>•</span>
                  <span>Последний: {contact.lastContact}</span>
                </div>
              </div>

              {contact.tags.length > 0 && (
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  {contact.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
          <UserX size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Контакты не найдены</p>
        </div>
      )}
    </div>
  );
}
