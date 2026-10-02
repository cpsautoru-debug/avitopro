export interface Message {
  id: string;
  recipient: string;
  recipientName: string;
  template: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  sentAt: string;
  adTitle: string;
  adId: string;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
  usageCount: number;
  createdAt: string;
  variables: string[];
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  avitoId: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'blocked';
  tags: string[];
}

export interface Campaign {
  id: string;
  name: string;
  template: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  createdAt: string;
  scheduledAt?: string;
}

export interface Subscription {
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  messagesLeft: number;
  totalMessages: number;
  expiresAt: string;
  autoRenew: boolean;
}

export interface ApiSettings {
  apiKey: string;
  webhookUrl: string;
  rateLimit: number;
  delayBetween: number;
  autoRetry: boolean;
  maxRetries: number;
}

export type Page = 'dashboard' | 'campaigns' | 'messages' | 'templates' | 'contacts' | 'subscription' | 'settings';
