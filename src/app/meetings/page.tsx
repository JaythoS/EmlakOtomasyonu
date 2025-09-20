'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Calendar, 
  Clock, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Meeting } from '@/types';

// Mock data
const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Emlak Görüntüleme',
    description: '3+1 daire görüntüleme randevusu',
    type: 'viewing',
    status: 'scheduled',
    startTime: new Date('2024-01-25T14:30:00'),
    endTime: new Date('2024-01-25T15:30:00'),
    location: 'Moda Mahallesi, Kadıköy/İstanbul',
    customerId: '1',
    propertyId: '1',
    agentId: '1',
    notes: 'Müşteri çok ilgili, hızlı karar verebilir',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    title: 'Müşteri Görüşmesi',
    description: 'Bütçe ve ihtiyaçlar hakkında görüşme',
    type: 'consultation',
    status: 'completed',
    startTime: new Date('2024-01-24T10:00:00'),
    endTime: new Date('2024-01-24T11:00:00'),
    location: 'Ofis',
    customerId: '2',
    agentId: '1',
    notes: 'Müşteri 2+1 daire arıyor, bütçe 1.5M TL',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-24'),
  },
  {
    id: '3',
    title: 'Sözleşme İmza',
    description: 'Satış sözleşmesi imzalama',
    type: 'contract',
    status: 'scheduled',
    startTime: new Date('2024-01-26T16:00:00'),
    endTime: new Date('2024-01-26T17:00:00'),
    location: 'Noter',
    customerId: '4',
    propertyId: '2',
    agentId: '1',
    notes: 'Tüm belgeler hazır, sadece imza kaldı',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23'),
  },
  {
    id: '4',
    title: 'Fiyat Müzakere',
    description: 'Villa fiyatı hakkında müzakere',
    type: 'negotiation',
    status: 'cancelled',
    startTime: new Date('2024-01-23T15:00:00'),
    endTime: new Date('2024-01-23T16:00:00'),
    location: 'Bebek Mahallesi, Beşiktaş/İstanbul',
    customerId: '3',
    propertyId: '3',
    agentId: '2',
    notes: 'Müşteri fiyatı yüksek buldu, müzakere iptal',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-23'),
  },
  {
    id: '5',
    title: 'Emlak Görüntüleme',
    description: '2+1 daire görüntüleme',
    type: 'viewing',
    status: 'scheduled',
    startTime: new Date('2024-01-27T11:00:00'),
    endTime: new Date('2024-01-27T12:00:00'),
    location: 'Şişli Merkez, Şişli/İstanbul',
    customerId: '5',
    propertyId: '2',
    agentId: '2',
    notes: 'İlk görüntüleme, müşteri çok beğendi',
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24'),
  },
];

export default function MeetingsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || meeting.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeBadge = (type: Meeting['type']) => {
    switch (type) {
      case 'viewing':
        return <Badge variant="default">Görüntüleme</Badge>;
      case 'consultation':
        return <Badge variant="secondary">Danışmanlık</Badge>;
      case 'negotiation':
        return <Badge variant="outline">Müzakere</Badge>;
      case 'contract':
        return <Badge variant="destructive">Sözleşme</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: Meeting['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="default">Planlandı</Badge>;
      case 'completed':
        return <Badge variant="secondary">Tamamlandı</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">İptal Edildi</Badge>;
      case 'rescheduled':
        return <Badge variant="outline">Ertelendi</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: Meeting['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'rescheduled':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isUpcoming = (date: Date) => {
    return date > new Date();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
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
            <h1 className="text-3xl font-bold tracking-tight">Randevular</h1>
            <p className="text-muted-foreground">
              Randevularınızı yönetin ve takip edin
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Randevu
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Randevu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMeetings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planlanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockMeetings.filter(m => m.status === 'scheduled').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockMeetings.filter(m => m.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugün</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {mockMeetings.filter(m => isToday(m.startTime)).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Randevu Listesi</CardTitle>
            <CardDescription>
              Randevularınızı filtreleyin ve arayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Randevu ara..."
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
                  <DropdownMenuItem onClick={() => setTypeFilter('viewing')}>
                    Görüntüleme
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('consultation')}>
                    Danışmanlık
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('negotiation')}>
                    Müzakere
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter('contract')}>
                    Sözleşme
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
                  <DropdownMenuItem onClick={() => setStatusFilter('scheduled')}>
                    Planlandı
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                    Tamamlandı
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>
                    İptal Edildi
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('rescheduled')}>
                    Ertelendi
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Randevu</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Tarih & Saat</TableHead>
                    <TableHead>Konum</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead className="w-[70px]">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMeetings.map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{meeting.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {meeting.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(meeting.type)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(meeting.status)}
                          {getStatusBadge(meeting.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {meeting.startTime.toLocaleDateString('tr-TR')}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {meeting.startTime.toLocaleTimeString('tr-TR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {meeting.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {meeting.customerId}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            Müşteri {meeting.customerId}
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
                            {meeting.status === 'scheduled' && (
                              <>
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Tamamla
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <AlertCircle className="h-4 w-4 mr-2" />
                                  Ertelendi Olarak İşaretle
                                </DropdownMenuItem>
                              </>
                            )}
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
