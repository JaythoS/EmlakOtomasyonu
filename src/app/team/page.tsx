"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  TrendingUp,
  Building2,
  UserPlus,
  Settings
} from "lucide-react";

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const teamMembers = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      role: "Satış Müdürü",
      email: "ahmet@emlakcrm.com",
      phone: "+90 532 123 45 67",
      location: "İstanbul, Kadıköy",
      avatar: "/avatars/ahmet.jpg",
      status: "active",
      joinDate: "2023-01-15",
      sales: 45,
      properties: 23,
      performance: "excellent"
    },
    {
      id: 2,
      name: "Ayşe Demir",
      role: "Emlak Danışmanı",
      email: "ayse@emlakcrm.com",
      phone: "+90 533 234 56 78",
      location: "İstanbul, Beşiktaş",
      avatar: "/avatars/ayse.jpg",
      status: "active",
      joinDate: "2023-03-20",
      sales: 32,
      properties: 18,
      performance: "good"
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      role: "Emlak Danışmanı",
      email: "mehmet@emlakcrm.com",
      phone: "+90 534 345 67 89",
      location: "İstanbul, Şişli",
      avatar: "/avatars/mehmet.jpg",
      status: "active",
      joinDate: "2023-06-10",
      sales: 28,
      properties: 15,
      performance: "good"
    },
    {
      id: 4,
      name: "Fatma Öz",
      role: "Emlak Danışmanı",
      email: "fatma@emlakcrm.com",
      phone: "+90 535 456 78 90",
      location: "İstanbul, Üsküdar",
      avatar: "/avatars/fatma.jpg",
      status: "inactive",
      joinDate: "2023-02-05",
      sales: 19,
      properties: 12,
      performance: "average"
    }
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent": return "bg-green-100 text-green-800";
      case "good": return "bg-blue-100 text-blue-800";
      case "average": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Takım Yönetimi</h1>
              <p className="text-gray-600">Takım üyelerinizi yönetin ve performanslarını takip edin</p>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Yeni Üye Ekle
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Toplam Üye</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4</div>
              <p className="text-xs text-gray-500">Aktif takım üyesi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Aktif Üyeler</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <p className="text-xs text-gray-500">Çalışır durumda</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Toplam Satış</CardTitle>
              <Building2 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">124</div>
              <p className="text-xs text-gray-500">Bu ay tamamlanan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ortalama Performans</CardTitle>
              <Calendar className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">%87</div>
              <p className="text-xs text-gray-500">Takım ortalaması</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Takım üyesi ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-base">{member.role}</CardDescription>
                <div className="flex justify-center space-x-2 mt-2">
                  <Badge className={getStatusColor(member.status)}>
                    {member.status === "active" ? "Aktif" : "Pasif"}
                  </Badge>
                  <Badge className={getPerformanceColor(member.performance)}>
                    {member.performance === "excellent" ? "Mükemmel" : 
                     member.performance === "good" ? "İyi" : "Orta"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {member.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {member.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Katılım: {new Date(member.joinDate).toLocaleDateString('tr-TR')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{member.sales}</div>
                    <div className="text-xs text-gray-500">Satış</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{member.properties}</div>
                    <div className="text-xs text-gray-500">İlan</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Mesaj
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add New Member Card */}
        <div className="mt-8">
          <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Yeni Takım Üyesi Ekle</h3>
              <p className="text-gray-600 text-center mb-4">
                Takımınıza yeni bir emlak danışmanı ekleyin ve performansını takip edin
              </p>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Üye Ekle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
