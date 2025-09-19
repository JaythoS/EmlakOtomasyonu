"use client";

import { Building, MessageCircle, Users, BarChart3, TrendingUp, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const stats = [
    { name: 'Aktif İlanlar', value: '89', icon: Building, color: 'bg-blue-500' },
    { name: 'WhatsApp Mesajları', value: '47', icon: MessageCircle, color: 'bg-green-500' },
    { name: 'Soğuk Aramalar', value: '23', icon: HomeIcon, color: 'bg-yellow-500' },
  ];

  const quickActions = [
    { name: 'WhatsApp Mesajları', href: '/whatsapp', icon: MessageCircle, description: 'Müşteri mesajlarını incele ve değerlendir' },
    { name: 'Soğuk Arama', href: '/cold-calling', icon: TrendingUp, description: 'Potansiyel müşterilerinize ulaşın' },
    { name: 'İlan Yönetimi', href: '/properties', icon: Building, description: 'Emlak ilanlarını yönet' },
  ];

  const recentActivities = [
    { type: 'whatsapp', message: 'Ahmet Yılmaz yeni mesaj gönderdi', time: '10 dakika önce' },
    { type: 'customer', message: 'Yeni müşteri kaydı: Ayşe Kaya', time: '2 saat önce' },
    { type: 'property', message: 'Bahçelievler 3+1 daire güncellendi', time: '4 saat önce' },
    { type: 'sale', message: 'Kadıköy 2+1 daire satıldı', time: '1 gün önce' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <HomeIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Emlak Yönetim Sistemi</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Müşterilerinizi yönetin, WhatsApp mesajlarını değerlendirin ve satışlarınızı takip edin.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Hızlı İşlemler</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.name}
                      href={action.href}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-blue-100 rounded-lg p-2 mr-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{action.name}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-lg shadow mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sistem Özellikleri</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp Entegrasyonu</h3>
                <p className="text-sm text-gray-600">
                  Müşteri mesajlarını tek merkezden yönetin, potansiyel analizi yapın ve takip edin.
                </p>
              </div>
              <div className="text-center">
                <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Emlak Yönetimi</h3>
                <p className="text-sm text-gray-600">
                  Tüm emlak ilanlarınızı organize edin, fotoğraflar ekleyin ve durumlarını takip edin.
                </p>
              </div>
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Detaylı Raporlama</h3>
                <p className="text-sm text-gray-600">
                  Satış performansı, müşteri analizi ve gelir raporları ile işinizi büyütün.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}