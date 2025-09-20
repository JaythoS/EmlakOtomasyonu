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
  Phone, 
  Mail, 
  MessageSquare,
  Calendar,
  Star,
  Eye
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Customer } from '@/types';

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@email.com',
    phone: '0555 123 45 67',
    location: 'İstanbul, Kadıköy',
    leadScore: 95,
    status: 'hot',
    source: 'Website',
    notes: 'Çok ilgili, hızlı karar veriyor',
    assignedAgentId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    lastContact: new Date('2024-01-19'),
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    email: 'ayse@email.com',
    phone: '0555 234 56 78',
    location: 'İstanbul, Beşiktaş',
    leadScore: 78,
    status: 'warm',
    source: 'Referans',
    notes: 'Bütçe belirleme aşamasında',
    assignedAgentId: '1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    lastContact: new Date('2024-01-17'),
  },
  {
    id: '3',
    name: 'Mehmet Kaya',
    email: 'mehmet@email.com',
    phone: '0555 345 67 89',
    location: 'İstanbul, Şişli',
    leadScore: 45,
    status: 'cold',
    source: 'Sosyal Medya',
    notes: 'Uzun vadeli planlama yapıyor',
    assignedAgentId: '2',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    lastContact: new Date('2024-01-12'),
  },
  {
    id: '4',
    name: 'Fatma Özkan',
    email: 'fatma@email.com',
    phone: '0555 456 78 90',
    location: 'İstanbul, Üsküdar',
    leadScore: 88,
    status: 'hot',
    source: 'İlan Sitesi',
    notes: 'Acil satın alma ihtiyacı var',
    assignedAgentId: '1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-20'),
    lastContact: new Date('2024-01-20'),
  },
  {
    id: '5',
    name: 'Can Yılmaz',
    email: 'can@email.com',
    phone: '0555 567 89 01',
    location: 'İstanbul, Bakırköy',
    leadScore: 62,
    status: 'warm',
    source: 'Telefon',
    notes: 'Yatırım amaçlı alım düşünüyor',
    assignedAgentId: '2',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
    lastContact: new Date('2024-01-14'),
  },
];

export default function CustomersPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Customer['status']) => {
    switch (status) {
      case 'hot':
        return <Badge variant="destructive">Sıcak</Badge>;
      case 'warm':
        return <Badge variant="secondary">Ilık</Badge>;
      case 'cold':
        return <Badge variant="outline">Soğuk</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-blue-600';
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
            <h1 className="text-3xl font-bold tracking-tight">Müşteriler</h1>
            <p className="text-muted-foreground">
              Müşteri bilgilerini yönetin ve takip edin
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Müşteri
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCustomers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sıcak Potansiyeller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {mockCustomers.filter(c => c.status === 'hot').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ilık Potansiyeller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {mockCustomers.filter(c => c.status === 'warm').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soğuk Potansiyeller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockCustomers.filter(c => c.status === 'cold').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Müşteri Listesi</CardTitle>
            <CardDescription>
              Müşterilerinizi filtreleyin ve arayın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Müşteri ara..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                  <DropdownMenuItem onClick={() => setStatusFilter('hot')}>
                    Sıcak
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('warm')}>
                    Ilık
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('cold')}>
                    Soğuk
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>İletişim</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Skor</TableHead>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Son İletişim</TableHead>
                    <TableHead className="w-[70px]">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ID: {customer.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(customer.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className={`h-4 w-4 mr-1 ${getScoreColor(customer.leadScore)}`} />
                          <span className={`font-semibold ${getScoreColor(customer.leadScore)}`}>
                            {customer.leadScore}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{customer.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {customer.lastContact ? 
                            customer.lastContact.toLocaleDateString('tr-TR') : 
                            'Hiç'
                          }
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
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Mesaj Gönder
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Ara
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Randevu Planla
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Düzenle
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
