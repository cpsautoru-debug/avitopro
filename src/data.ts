import { Message, Template, Contact, Campaign, Subscription, ApiSettings } from './types';

export const mockMessages: Message[] = [
  { id: '1', recipient: '+7 (903) 123-45-67', recipientName: 'Алексей К.', template: 'Здравствуйте! Интересует ваш товар...', status: 'read', sentAt: '2026-01-15 14:30', adTitle: 'iPhone 15 Pro Max 256GB', adId: 'AV-2847561' },
  { id: '2', recipient: '+7 (915) 987-65-43', recipientName: 'Мария С.', template: 'Добрый день! Ещё актуально?', status: 'delivered', sentAt: '2026-01-15 14:25', adTitle: 'Квартира 2-комн. 65м²', adId: 'AV-3928471' },
  { id: '3', recipient: '+7 (926) 555-12-34', recipientName: 'Дмитрий В.', template: 'Здравствуйте! Можно торг?', status: 'sent', sentAt: '2026-01-15 14:20', adTitle: 'BMW X5 2022', adId: 'AV-1847293' },
  { id: '4', recipient: '+7 (905) 777-88-99', recipientName: 'Елена П.', template: 'Подскажите, есть доставка?', status: 'failed', sentAt: '2026-01-15 14:15', adTitle: 'MacBook Pro 14"', adId: 'AV-4829173' },
  { id: '5', recipient: '+7 (916) 333-44-55', recipientName: 'Сергей Н.', template: 'Здравствуйте! Интересует ваш товар...', status: 'pending', sentAt: '2026-01-15 14:10', adTitle: 'PlayStation 5', adId: 'AV-5738291' },
  { id: '6', recipient: '+7 (903) 222-33-44', recipientName: 'Анна Л.', template: 'Добрый день! Ещё актуально?', status: 'read', sentAt: '2026-01-15 13:55', adTitle: 'Samsung Galaxy S24', adId: 'AV-6291847' },
  { id: '7', recipient: '+7 (925) 111-22-33', recipientName: 'Игорь М.', template: 'Здравствуйте! Можно посмотреть?', status: 'delivered', sentAt: '2026-01-15 13:40', adTitle: 'Велосипед горный', adId: 'AV-7382910' },
  { id: '8', recipient: '+7 (917) 444-55-66', recipientName: 'Ольга Т.', template: 'Подскажите, есть доставка?', status: 'sent', sentAt: '2026-01-15 13:25', adTitle: 'Диван угловой', adId: 'AV-8473920' },
];

export const mockTemplates: Template[] = [
  { id: '1', name: 'Приветствие', content: 'Здравствуйте, {name}! Интересует ваше объявление "{ad_title}". Подскажите, ещё актуально?', category: 'Общие', usageCount: 1247, createdAt: '2025-12-01', variables: ['{name}', '{ad_title}'] },
  { id: '2', name: 'Торг', content: 'Добрый день! Рассмотрите моё предложение — {offer_price}₽ за "{ad_title}". Готов обсудить условия.', category: 'Торговля', usageCount: 893, createdAt: '2025-12-05', variables: ['{offer_price}', '{ad_title}'] },
  { id: '3', name: 'Доставка', content: 'Здравствуйте! Подскажите, возможна ли доставка в {city}? И сколько это будет стоить?', category: 'Доставка', usageCount: 654, createdAt: '2025-12-10', variables: ['{city}'] },
  { id: '4', name: 'Просмотр', content: 'Добрый день! Когда можно посмотреть "{ad_title}"? Удобно в {time}?', category: 'Встречи', usageCount: 432, createdAt: '2025-12-15', variables: ['{ad_title}', '{time}'] },
  { id: '5', name: 'Напоминание', content: 'Здравствуйте, {name}! Напоминаю о своём предложении по "{ad_title}". Ещё актуально?', category: 'Повторные', usageCount: 321, createdAt: '2025-12-20', variables: ['{name}', '{ad_title}'] },
  { id: '6', name: 'Авто/Запчасти', content: 'Здравствуйте! Есть ли в наличии {part_name} для {car_model}? Какая цена?', category: 'Авто', usageCount: 567, createdAt: '2026-01-02', variables: ['{part_name}', '{car_model}'] },
];

export const mockContacts: Contact[] = [
  { id: '1', name: 'Алексей Козлов', phone: '+7 (903) 123-45-67', email: 'alex@mail.ru', avitoId: 'AV-100234', lastContact: '2026-01-15', status: 'active', tags: ['VIP', 'Покупатель'] },
  { id: '2', name: 'Мария Смирнова', phone: '+7 (915) 987-65-43', email: 'maria@gmail.com', avitoId: 'AV-100567', lastContact: '2026-01-14', status: 'active', tags: ['Продавец'] },
  { id: '3', name: 'Дмитрий Волков', phone: '+7 (926) 555-12-34', email: 'dmitry@yandex.ru', avitoId: 'AV-100890', lastContact: '2026-01-13', status: 'active', tags: ['Авто'] },
  { id: '4', name: 'Елена Петрова', phone: '+7 (905) 777-88-99', email: 'elena@mail.ru', avitoId: 'AV-101123', lastContact: '2026-01-12', status: 'inactive', tags: ['Не отвечает'] },
  { id: '5', name: 'Сергей Новиков', phone: '+7 (916) 333-44-55', email: 'sergey@gmail.com', avitoId: 'AV-101456', lastContact: '2026-01-11', status: 'active', tags: ['Электроника'] },
  { id: '6', name: 'Анна Лебедева', phone: '+7 (903) 222-33-44', email: 'anna@yandex.ru', avitoId: 'AV-101789', lastContact: '2026-01-10', status: 'active', tags: ['VIP', 'Повторный'] },
  { id: '7', name: 'Игорь Морозов', phone: '+7 (925) 111-22-33', email: 'igor@mail.ru', avitoId: 'AV-102012', lastContact: '2026-01-09', status: 'blocked', tags: ['Спам'] },
  { id: '8', name: 'Ольга Тихонова', phone: '+7 (917) 444-55-66', email: 'olga@gmail.com', avitoId: 'AV-102345', lastContact: '2026-01-08', status: 'active', tags: ['Мебель'] },
];

export const mockCampaigns: Campaign[] = [
  { id: '1', name: 'Рассылка по iPhone', template: 'Приветствие', status: 'active', totalRecipients: 150, sentCount: 142, deliveredCount: 138, readCount: 95, failedCount: 4, createdAt: '2026-01-15' },
  { id: '2', name: 'Квартиры Москва', template: 'Просмотр', status: 'completed', totalRecipients: 80, sentCount: 80, deliveredCount: 76, readCount: 62, failedCount: 4, createdAt: '2026-01-14' },
  { id: '3', name: 'Автозапчасти BMW', template: 'Авто/Запчасти', status: 'active', totalRecipients: 200, sentCount: 87, deliveredCount: 82, readCount: 45, failedCount: 5, createdAt: '2026-01-13' },
  { id: '4', name: 'Электроника б/у', template: 'Торг', status: 'paused', totalRecipients: 120, sentCount: 60, deliveredCount: 57, readCount: 38, failedCount: 3, createdAt: '2026-01-12' },
  { id: '5', name: 'Мебель для дома', template: 'Доставка', status: 'draft', totalRecipients: 95, sentCount: 0, deliveredCount: 0, readCount: 0, failedCount: 0, createdAt: '2026-01-11' },
];

export const mockSubscription: Subscription = {
  plan: 'pro',
  messagesLeft: 3847,
  totalMessages: 5000,
  expiresAt: '2026-02-15',
  autoRenew: true,
};

export const mockApiSettings: ApiSettings = {
  apiKey: 'avp_sk_••••••••••••••••••••••••',
  webhookUrl: 'https://mysite.com/webhook/avito',
  rateLimit: 30,
  delayBetween: 5,
  autoRetry: true,
  maxRetries: 3,
};

export const chartData = [
  { name: 'Пн', sent: 120, delivered: 115, read: 78 },
  { name: 'Вт', sent: 145, delivered: 138, read: 92 },
  { name: 'Ср', sent: 98, delivered: 94, read: 61 },
  { name: 'Чт', sent: 167, delivered: 159, read: 112 },
  { name: 'Пт', sent: 203, delivered: 195, read: 134 },
  { name: 'Сб', sent: 87, delivered: 83, read: 54 },
  { name: 'Вс', sent: 56, delivered: 52, read: 31 },
];

export const hourlyData = [
  { name: '00', value: 5 }, { name: '02', value: 3 }, { name: '04', value: 2 },
  { name: '06', value: 8 }, { name: '08', value: 34 }, { name: '10', value: 67 },
  { name: '12', value: 89 }, { name: '14', value: 95 }, { name: '16', value: 78 },
  { name: '18', value: 56 }, { name: '20', value: 42 }, { name: '22', value: 18 },
];
