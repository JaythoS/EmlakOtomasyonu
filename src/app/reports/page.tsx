"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const reportCards = [
    {
      title: "Toplam Satış",
      value: "₺2,450,000",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Aktif Müşteriler",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Toplam İlan",
      value: "89",
      change: "+15.3%",
      trend: "up",
      icon: Building2,
      color: "text-purple-600"
    },
    {
      title: "Tamamlanan Randevular",
      value: "234",
      change: "+5.7%",
      trend: "up",
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "Satış",
      description: "Ahmet Yılmaz - 3+1 Daire Satıldı",
      amount: "₺850,000",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: 2,
      type: "Kiralama",
      description: "Ayşe Demir - 2+1 Daire Kiralandı",
      amount: "₺4,500/ay",
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: 3,
      type: "Randevu",
      description: "Mehmet Kaya - Villa Görüntüleme",
      amount: "-",
      date: "2024-01-13",
      status: "scheduled"
    },
    {
      id: 4,
      type: "Satış",
      description: "Fatma Öz - 4+1 Villa Satıldı",
      amount: "₺1,200,000",
      date: "2024-01-12",
      status: "completed"
    }
  ];

  const user = {
    name: "Ahmet Yılmaz",
    email: "ahmet@emlakcrm.com",
    role: "Satış Müdürü",
    avatar: "/avatars/admin.jpg"
  };

  return (
    <Layout user={user} notifications={3}>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Raporlar & Analiz</h1>
              <p className="text-gray-600">İş performansınızı takip edin ve analiz edin</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                İndir
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Yenile
              </Button>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {["7", "30", "90", "365"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period === "365" ? "1 Yıl" : `${period} Gün`}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {reportCards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {card.value}
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="text-green-600 bg-green-50">
                    {card.change}
                  </Badge>
                  <span className="text-xs text-gray-500 ml-2">geçen döneme göre</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Satış Trendi
              </CardTitle>
              <CardDescription>
                Son {selectedPeriod} günlük satış performansı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Grafik verisi yükleniyor...</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Son Aktiviteler
              </CardTitle>
              <CardDescription>
                En son tamamlanan işlemler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                        {activity.type}
                      </Badge>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {activity.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Detaylı Raporlar</CardTitle>
              <CardDescription>
                Kapsamlı analiz ve raporlar için aşağıdaki seçenekleri kullanın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Müşteri Raporu</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Building2 className="h-6 w-6 mb-2" />
                  <span>İlan Raporu</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Randevu Raporu</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
