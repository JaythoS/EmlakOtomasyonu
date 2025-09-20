export type Language = 'tr' | 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  phone?: string;
  location?: string;
  joinDate?: string;
  status: 'active' | 'inactive';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: 'hot' | 'warm' | 'cold';
  lastContact: Date;
  leadScore: number;
  notes?: string;
  source?: string;
  assignedAgentId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'villa' | 'office' | 'land';
  price: number;
  location: string;
  area: number;
  rooms: number;
  status: 'available' | 'sold' | 'rented';
  images: string[];
  description: string;
  features: string[];
}

export interface Meeting {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  propertyId?: string;
  propertyTitle?: string;
  date: string;
  time: string;
  type: 'viewing' | 'consultation' | 'negotiation' | 'signing';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}