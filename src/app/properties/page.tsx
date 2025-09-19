"use client";

import { useState } from 'react';
import { Building, Search, Filter, MapPin, Eye, Edit, Trash2, Plus, Image, BedDouble, Bath, Square, Car } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'office' | 'land';
  status: 'available' | 'sold' | 'rented' | 'pending';
  price: number;
  location: string;
  area: number;
  rooms: string;
  bathrooms: number;
  parking: boolean;
  images: string[];
  description: string;
  createdAt: Date;
}

export default function PropertiesPage() {
  const [properties] = useState<Property[]>([
    {
      id: '1',
      title: 'Bahçelievler\'de Lüks 3+1 Daire',
      type: 'apartment',
      status: 'available',
      price: 2500000,
      location: 'Bahçelievler, İstanbul',
      area: 120,
      rooms: '3+1',
      bathrooms: 2,
      parking: true,
      images: ['/property1.jpg'],
      description: 'Merkezi konumda, yeni yapılmış lüks daire.',
      createdAt: new Date('2024-01-10')
    },
    {
      id: '2',
      title: 'Kadıköy\'de Kiralık 2+1 Daire',
      type: 'apartment',
      status: 'rented',
      price: 18000,
      location: 'Kadıköy, İstanbul',
      area: 85,
      rooms: '2+1',
      bathrooms: 1,
      parking: false,
      images: ['/property2.jpg'],
      description: 'Deniz manzaralı, ulaşım kolaylığı olan daire.',
      createdAt: new Date('2024-01-08')
    },
    {
      id: '3',
      title: 'Büyükçekmece\'de Villa',
      type: 'house',
      status: 'available',
      price: 8500000,
      location: 'Büyükçekmece, İstanbul',
      area: 350,
      rooms: '5+2',
      bathrooms: 3,
      parking: true,
      images: ['/property3.jpg'],
      description: 'Deniz manzaralı, bahçeli müstakil villa.',
      createdAt: new Date('2024-01-05')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getTypeText = (type: string) => {
    switch (type) {
      case 'apartment': return 'Daire';
      case 'house': return 'Ev/Villa';
      case 'office': return 'Ofis';
      case 'land': return 'Arsa';
      default: return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Müsait';
      case 'sold': return 'Satıldı';
      case 'rented': return 'Kiralandı';
      case 'pending': return 'Beklemede';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-red-100 text-red-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: properties.length,
    available: properties.filter(p => p.status === 'available').length,
    sold: properties.filter(p => p.status === 'sold').length,
    rented: properties.filter(p => p.status === 'rented').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mülk Yönetimi</h1>
                <p className="text-sm text-gray-500">Emlak portföyünüzü yönetin</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Yeni Mülk Ekle
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Mülk</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Müsait</p>
                <p className="text-3xl font-bold text-green-600">{stats.available}</p>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satılan</p>
                <p className="text-3xl font-bold text-red-600">{stats.sold}</p>
              </div>
              <div className="h-8 w-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kiralanan</p>
                <p className="text-3xl font-bold text-blue-600">{stats.rented}</p>
              </div>
              <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtreler */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Mülk başlığı veya konumda ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                aria-label="Mülk tipi filtresi"
                title="Mülk tipine göre filtrele"
              >
                <option value="all">Tüm Tipler</option>
                <option value="apartment">Daire</option>
                <option value="house">Ev/Villa</option>
                <option value="office">Ofis</option>
                <option value="land">Arsa</option>
              </select>
            </div>

            <div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Durum filtresi"
                title="Mülk durumuna göre filtrele"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="available">Müsait</option>
                <option value="sold">Satıldı</option>
                <option value="rented">Kiralandı</option>
                <option value="pending">Beklemede</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mülk Listesi */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Mülkler ({filteredProperties.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Görsel */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <Image className="h-12 w-12 text-gray-400" />
                </div>

                {/* İçerik */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">{property.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {getStatusText(property.status)}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="text-2xl font-bold text-blue-600 mb-3">
                    {formatPrice(property.price)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-2" />
                      <span>{property.area} m²</span>
                    </div>
                    <div className="flex items-center">
                      <BedDouble className="h-4 w-4 mr-2" />
                      <span>{property.rooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-2" />
                      <span>{property.bathrooms} banyo</span>
                    </div>
                    {property.parking && (
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2" />
                        <span>Otopark</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
                      <Eye className="h-4 w-4 mr-1" />
                      Detaylar
                    </button>
                    <button 
                      className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="Mülkü düzenle"
                      title="Mülk bilgilerini düzenle"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      aria-label="Mülkü sil"
                      title="Mülkü sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mülk bulunamadı</h3>
              <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
