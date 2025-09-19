"use client";

import { Phone, Clock, Star, Construction } from 'lucide-react';

export default function ColdCallingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Phone className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Soğuk Arama</h1>
              <p className="text-sm text-gray-500">Potansiyel müşterilerinize ulaşın</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-16 h-16 text-blue-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Construction className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Soğuk arama özelliği yakında geliyor! Potansiyel müşterilerinizi sistematik olarak arayabilecek ve takip edebileceksiniz.
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Otomatik Arama</h3>
                <p className="text-gray-600 text-sm">Potansiyel müşteri listelerini otomatik olarak arayın</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Zaman Yönetimi</h3>
                <p className="text-gray-600 text-sm">Arama zamanlarını planlayın ve optimize edin</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuç Takibi</h3>
                <p className="text-gray-600 text-sm">Arama sonuçlarını kaydedin ve analiz edin</p>
              </div>
            </div>

            {/* Expected Features */}
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto border">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Gelecek Özellikler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Potansiyel müşteri veritabanı</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Arama script'leri</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Sonuç kategorilendirme</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Randevu planlama</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">İstatistik ve raporlama</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">CRM entegrasyonu</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
