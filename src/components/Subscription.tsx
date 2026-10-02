import React, { useState } from 'react';
import {
  Check,
  Zap,
  Crown,
  Rocket,
  Building,
  CreditCard,
  Calendar,
  RefreshCw,
  Star,
} from 'lucide-react';
import { mockSubscription } from '../data';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 990,
    period: 'мес',
    messages: 1000,
    icon: <Zap size={24} />,
    color: 'from-blue-500 to-blue-600',
    features: [
      '1 000 сообщений/мес',
      '5 шаблонов',
      'Базовая аналитика',
      'Задержка 10 сек',
      'Email поддержка',
    ],
    limitations: ['Без API', 'Без вебхуков'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2990,
    period: 'мес',
    messages: 5000,
    icon: <Crown size={24} />,
    color: 'from-green-500 to-emerald-600',
    popular: true,
    features: [
      '5 000 сообщений/мес',
      'Безлимит шаблонов',
      'Полная аналитика',
      'Задержка 5 сек',
      'API доступ',
      'Вебхуки',
      'Приоритетная поддержка',
    ],
    limitations: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 9990,
    period: 'мес',
    messages: 25000,
    icon: <Building size={24} />,
    color: 'from-purple-500 to-purple-600',
    features: [
      '25 000 сообщений/мес',
      'Безлимит шаблонов',
      'Расширенная аналитика',
      'Минимальная задержка 2 сек',
      'Полный API доступ',
      'Вебхуки + Callback',
      'Выделенный менеджер',
      'SLA 99.9%',
      'Кастомные интеграции',
    ],
    limitations: [],
  },
];

export default function Subscription() {
  const [subscription] = useState(mockSubscription);
  const [autoRenew, setAutoRenew] = useState(subscription.autoRenew);

  const currentPlan = plans.find(p => p.id === subscription.plan) || plans[1];
  const usagePercent = ((subscription.totalMessages - subscription.messagesLeft) / subscription.totalMessages) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Подписка</h1>
        <p className="text-gray-500 mt-1">Управление тарифом и лимитами</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-green-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Crown size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Тариф {currentPlan.name}</h3>
              <p className="text-green-100 text-sm">Активен до {subscription.expiresAt}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{currentPlan.price.toLocaleString()} ₽</div>
            <div className="text-green-100 text-sm">в месяц</div>
          </div>
        </div>

        {/* Usage */}
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-green-100">Использовано сообщений</span>
            <span className="text-sm font-medium">{(subscription.totalMessages - subscription.messagesLeft).toLocaleString()} / {subscription.totalMessages.toLocaleString()}</span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-green-200">Осталось: {subscription.messagesLeft.toLocaleString()} сообщений</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`relative w-10 h-5 rounded-full transition-colors ${autoRenew ? 'bg-white/30' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${autoRenew ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`}
                  style={{ left: autoRenew ? '22px' : '2px' }}
                />
              </button>
              <span className="text-xs text-green-100">Автопродление</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Доступные тарифы</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = plan.id === subscription.plan;
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-lg ${
                  isCurrent ? 'border-green-500 shadow-md' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <Star size={12} /> Популярный
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white mb-4`}>
                  {plan.icon}
                </div>

                <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500">₽/{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{plan.messages.toLocaleString()} сообщений/мес</p>

                <div className="mt-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="w-3.5 h-3.5 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      </span>
                      <span>{limit}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full mt-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isCurrent
                      ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                  disabled={isCurrent}
                >
                  {isCurrent ? '✓ Текущий тариф' : 'Переключить'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">История платежей</h3>
        <div className="space-y-3">
          {[
            { date: '2026-01-15', amount: '2 990 ₽', status: 'Оплачено', plan: 'Pro' },
            { date: '2025-12-15', amount: '2 990 ₽', status: 'Оплачено', plan: 'Pro' },
            { date: '2025-11-15', amount: '2 990 ₽', status: 'Оплачено', plan: 'Pro' },
            { date: '2025-10-15', amount: '990 ₽', status: 'Оплачено', plan: 'Basic' },
          ].map((payment, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <CreditCard size={16} className="text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{payment.plan} — {payment.amount}</div>
                  <div className="text-xs text-gray-500">{payment.date}</div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full font-medium">{payment.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
