import React, { useState } from 'react';
import {
  Key,
  Globe,
  Gauge,
  Clock,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  CheckCircle,
  Copy,
  Code,
  Terminal,
} from 'lucide-react';
import { mockApiSettings } from '../data';

export default function Settings() {
  const [settings, setSettings] = useState(mockApiSettings);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTest = () => {
    setTestResult(null);
    setTimeout(() => setTestResult('success'), 1500);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText('avp_sk_real_key_here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки API</h1>
        <p className="text-gray-500 mt-1">Конфигурация подключения к Авито API</p>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Статус подключения</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-600 font-medium">Подключено</span>
                <span className="text-xs text-gray-400">• Задержка: 42ms • Uptime: 99.97%</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleTest}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <RefreshCw size={16} className={testResult === 'success' ? 'animate-spin' : ''} />
            Тест соединения
          </button>
        </div>
        {testResult === 'success' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm text-green-700">Соединение успешно! API отвечает корректно.</span>
          </div>
        )}
      </div>

      {/* API Key */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Key size={20} className="text-gray-400" />
          <h3 className="font-semibold text-gray-900">API Ключ</h3>
        </div>
        <div className="relative">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={settings.apiKey}
            onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
            className="w-full px-4 py-3 pr-24 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-200 transition-colors"
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button
              onClick={copyApiKey}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-200 transition-colors"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Храните ключ в безопасности. Не передавайте третьим лицам.</p>
      </div>

      {/* Webhook */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={20} className="text-gray-400" />
          <h3 className="font-semibold text-gray-900">Webhook URL</h3>
        </div>
        <input
          type="url"
          value={settings.webhookUrl}
          onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
          placeholder="https://your-domain.com/webhook/avito"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
        />
        <p className="text-xs text-gray-400 mt-2">URL для получения уведомлений о доставке и ответах</p>
      </div>

      {/* Rate Limits */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Gauge size={20} className="text-gray-400" />
          <h3 className="font-semibold text-gray-900">Лимиты и задержки</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                Задержка между сообщениями (сек)
              </span>
            </label>
            <input
              type="number"
              value={settings.delayBetween}
              onChange={(e) => setSettings({ ...settings, delayBetween: parseInt(e.target.value) || 0 })}
              min={1}
              max={60}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Рекомендуется: 5-15 секунд для избежания блокировок</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Gauge size={14} className="text-gray-400" />
                Макс. сообщений в минуту
              </span>
            </label>
            <input
              type="number"
              value={settings.rateLimit}
              onChange={(e) => setSettings({ ...settings, rateLimit: parseInt(e.target.value) || 0 })}
              min={1}
              max={60}
              className="w-full px-4 py-3 bg-gray-500 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-400 mt-1">Лимит вашего тарифа: 30 сообщений/мин</p>
          </div>
        </div>
      </div>

      {/* Retry Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <RefreshCw size={20} className="text-gray-400" />
          <h3 className="font-semibold text-gray-900">Повторные попытки</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.autoRetry}
                  onChange={(e) => setSettings({ ...settings, autoRetry: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${settings.autoRetry ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${settings.autoRetry ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">Автоматические повторные попытки</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Макс. кол-во попыток</label>
            <select
              value={settings.maxRetries}
              onChange={(e) => setSettings({ ...settings, maxRetries: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            >
              <option value={1}>1 попытка</option>
              <option value={2}>2 попытки</option>
              <option value={3}>3 попытки</option>
              <option value={5}>5 попыток</option>
            </select>
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Code size={20} className="text-gray-400" />
          <h3 className="font-semibold text-gray-900">Пример API запроса</h3>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
          <pre className="text-sm text-green-400 font-mono">
{`POST /api/v1/messages/send
Host: api.avitosender.pro
Authorization: Bearer ${settings.apiKey}
Content-Type: application/json

{
  "recipient_id": "AV-100234",
  "ad_id": "AV-2847561",
  "template": "Здравствуйте! Интересует ваш товар...",
  "delay_seconds": ${settings.delayBetween},
  "retry_on_failure": ${settings.autoRetry}
}`}
          </pre>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-amber-800">Важная информация</h4>
          <p className="text-sm text-amber-700 mt-1">
            Соблюдайте лимиты и задержки для избежания блокировки аккаунта. 
            Рекомендуемая задержка между сообщениями — не менее 5 секунд. 
            При превышении лимитов сообщения будут поставлены в очередь.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle size={16} /> Настройки сохранены
          </span>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-green-500/25 transition-all"
        >
          <Save size={18} />
          Сохранить настройки
        </button>
      </div>
    </div>
  );
}
