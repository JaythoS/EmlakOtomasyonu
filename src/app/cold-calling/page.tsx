"use client";

import { Phone, Construction, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// MVP İçin Gizlenmiş Sayfa - Özellik Geliştirme Aşamasında
// Bu sayfa MVP sürümünde mevcut değil, ileride aktifleştirilecek

export default function ColdCallingPage() {
  return (
    <div className="min-h-screen bg-main">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Phone className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Soğuk Arama</h1>
              <p className="text-sm text-gray-500">MVP sürümünde mevcut değil</p>
            </div>
          </div>
        </div>
      </div>

      {/* MVP Notice Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-2xl">
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
              MVP Sürümünde Mevcut Değil
            </h2>
            
            {/* Description */}
            <p className="text-xl text-gray-600 mb-8">
              Soğuk arama özelliği şu anda geliştirme aşamasında. MVP sürümünde bu özellik bulunmuyor, 
              ancak yakında eklenecek ve potansiyel müşterilerinize sistematik olarak ulaşabileceksiniz.
            </p>

            {/* Back Button */}
            <Link 
              href="/dashboard"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Dashboard&apos;a Dön
            </Link>

            {/* Info Box */}
            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Gelecek Sürümlerde</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                Bu özellik aktif olduğunda potansiyel müşteri listelerinizi yönetebilecek, 
                arama scriptleri oluşturabilecek ve arama sonuçlarını sistematik olarak takip edebileceksiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
