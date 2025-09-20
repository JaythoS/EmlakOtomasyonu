'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Eye,
  Edit,
  Share,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Property } from '@/types';

// Mock data
const mockProperties: Property[] = [
  {
    id: '1',
    title: '3+1 Lüks Daire, Kadıköy',
    description: 'Deniz manzaralı, merkezi konumda, yeni yapı',
    type: 'apartment',
    status: 'for-sale',
    price: 2500000,
    currency: 'TRY',
    location: {
      address: 'Moda Mahallesi, Kadıköy/İstanbul',
      city: 'İstanbul',
      district: 'Kadıköy',
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      floor: 5,
      totalFloors: 8,
      age: 2,
      heating: 'Doğalgaz',
      parking: true,
      balcony: true,
      elevator: true,
    },
    images: ['/property1.jpg'],
    documents: ['/deed1.pdf'],
    ownerId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    title: '2+1 Şehir Merkezi Daire',
    description: 'Metro yakını, alışveriş merkezi yanında',
    type: 'apartment',
    status: 'for-rent',
    price: 8500,
    currency: 'TRY',
    location: {
      address: 'Şişli Merkez, Şişli/İstanbul',
      city: 'İstanbul',
      district: 'Şişli',
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      floor: 3,
      totalFloors: 6,
      age: 5,
      heating: 'Kombi',
      parking: false,
      balcony: true,
      elevator: true,
    },
    images: ['/property2.jpg'],
    documents: ['/deed2.pdf'],
    ownerId: '2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '3',
    title: 'Villa, Bebek',
    description: 'Bahçeli, deniz manzaralı, lüks villa',
    type: 'house',
    status: 'for-sale',
    price: 8500000,
    currency: 'TRY',
    location: {
      address: 'Bebek Mahallesi, Beşiktaş/İstanbul',
      city: 'İstanbul',
      district: 'Beşiktaş',
    },
    features: {
      bedrooms: 5,
      bathrooms: 4,
      area: 250,
      floor: 3,
      age: 1,
      heating: 'Doğalgaz',
      parking: true,
      balcony: true,
      elevator: false,
    },
    images: ['/property3.jpg'],
    documents: ['/deed3.pdf'],
    ownerId: '3',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    title: 'Ticari Ofis, Maslak',
    description: 'Modern ofis binası, metro yakını',
    type: 'commercial',
    status: 'for-rent',
    price: 15000,
    currency: 'TRY',
    location: {
      address: 'Maslak Mahallesi, Sarıyer/İstanbul',
      city: 'İstanbul',
      district: 'Sarıyer',
    },
    features: {
      area: 200,
      floor: 2,
      totalFloors: 10,
      age: 3,
      heating: 'Merkezi',
      parking: true,
      elevator: true,
    },
    images: ['/property4.jpg'],
    documents: ['/deed4.pdf'],
    ownerId: '4',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-20'),
  },
];

export default function PropertiesPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeBadge = (type: Property['type']) => {
    switch (type) {
      case 'apartment':
        return <Badge variant="secondary">Daire</Badge>;
      case 'house':
        return <Badge variant="default">Ev</Badge>;
      case 'commercial':
        return <Badge variant="outline">Ticari</Badge>;
      case 'land':
        return <Badge variant="destructive">Arsa</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: Property['status']) => {
    switch (status) {
      case 'for-sale':
        return <Badge variant="destructive">Satılık</Badge>;
      case 'for-rent':
        return <Badge variant="default">Kiralık</Badge>;
      case 'sold':
        return <Badge variant="secondary">Satıldı</Badge>;
      case 'rented':
        return <Badge variant="outline">Kiralandı</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <Layout
      user={{
        name: 'Demo Kullanıcı',
        email: 'demo@emlakcrm.com',
        role: 'admin',
      }}
      notifications={3}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Emlak İlanları</h1>
            <p className="text-muted-foreground">
              Emlak ilanlarınızı yönetin ve takip edin
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni İlan
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam İlan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProperties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktif İlanlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockProperties.filter(p => p.status === 'for-sale' || p.status === 'for-rent').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satılan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockProperties.filter(p => p.status === 'sold').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kiralanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {mockProperties.filter(p => p.status === 'rented').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>İlan Listesi</CardTitle>
            <CardDescription>
              İlanlarınızı filtreleyin ve arayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="İlan ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Tip: {typeFilter === 'all' ? 'Tümü' : typeFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTypeFilter('all')}>
                    Tümü
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('apartment')}>
                    Daire
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('house')}>
                    Ev
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('commercial')}>
                    Ticari
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('land')}>
                    Arsa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Durum: {statusFilter === 'all' ? 'Tümü' : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    Tümü
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('for-sale')}>
                    Satılık
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('for-rent')}>
                    Kiralık
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('sold')}>
                    Satıldı
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('rented')}>
                    Kiralandı
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>İlan</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Fiyat</TableHead>
                    <TableHead>Konum</TableHead>
                    <TableHead>Özellikler</TableHead>
                    <TableHead className="w-[70px]">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{property.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {property.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(property.type)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(property.status)}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">
                          {formatPrice(property.price, property.currency)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location.district}, {property.location.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 text-sm">
                          {property.features.bedrooms && (
                            <div className="flex items-center">
                              <Bed className="h-3 w-3 mr-1" />
                              {property.features.bedrooms}
                            </div>
                          )}
                          {property.features.bathrooms && (
                            <div className="flex items-center">
                              <Bath className="h-3 w-3 mr-1" />
                              {property.features.bathrooms}
                            </div>
                          )}
                          <div className="flex items-center">
                            <Square className="h-3 w-3 mr-1" />
                            {property.features.area}m²
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Detayları Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="h-4 w-4 mr-2" />
                              Paylaş
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
