"use client";

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette,
  Save,
  Upload,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Building2,
  Key,
  Smartphone,
  MessageCircle,
  Calendar
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "security", label: "Güvenlik", icon: Shield },
    { id: "appearance", label: "Görünüm", icon: Palette },
    { id: "integrations", label: "Entegrasyonlar", icon: Globe }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Photo */}
      <Card>
        <CardHeader>
          <CardTitle>Profil Fotoğrafı</CardTitle>
          <CardDescription>
            Profil fotoğrafınızı güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
              <AvatarFallback className="text-lg">AD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Fotoğraf Yükle
              </Button>
              <p className="text-sm text-gray-500">
                JPG, PNG veya GIF formatında, maksimum 2MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Kişisel Bilgiler</CardTitle>
          <CardDescription>
            Temel bilgilerinizi güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Ad</Label>
              <Input id="firstName" defaultValue="Ahmet" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Soyad</Label>
              <Input id="lastName" defaultValue="Yılmaz" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input id="email" type="email" defaultValue="ahmet@emlakcrm.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" defaultValue="+90 532 123 45 67" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Input id="address" defaultValue="Kadıköy, İstanbul" />
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Şirket Bilgileri</CardTitle>
          <CardDescription>
            Şirket bilgilerinizi güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Şirket Adı</Label>
            <Input id="companyName" defaultValue="Emlak CRM A.Ş." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Pozisyon</Label>
            <Input id="position" defaultValue="Satış Müdürü" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Departman</Label>
            <Input id="department" defaultValue="Satış" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bildirim Tercihleri</CardTitle>
          <CardDescription>
            Hangi bildirimleri almak istediğinizi seçin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>E-posta Bildirimleri</Label>
              <p className="text-sm text-gray-500">
                Yeni müşteri, randevu ve satış bildirimleri
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Bildirimleri</Label>
              <p className="text-sm text-gray-500">
                Acil durumlar için SMS bildirimleri
              </p>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Bildirimleri</Label>
              <p className="text-sm text-gray-500">
                Tarayıcı push bildirimleri
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Pazarlama Bildirimleri</Label>
              <p className="text-sm text-gray-500">
                Yeni özellikler ve kampanyalar hakkında bilgi
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Şifre Değiştir</CardTitle>
          <CardDescription>
            Hesap güvenliğiniz için şifrenizi güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mevcut Şifre</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Mevcut şifrenizi girin"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Yeni Şifre</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Yeni şifrenizi girin"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Şifre Onayı</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Yeni şifrenizi tekrar girin"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>İki Faktörlü Kimlik Doğrulama</CardTitle>
          <CardDescription>
            Hesabınızı daha güvenli hale getirin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>2FA Aktif</Label>
              <p className="text-sm text-gray-500">
                SMS veya uygulama ile ek güvenlik
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema Ayarları</CardTitle>
          <CardDescription>
            Uygulamanın görünümünü özelleştirin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col">
                <div className="w-8 h-8 bg-white border rounded mb-2"></div>
                <span className="text-xs">Açık</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <div className="w-8 h-8 bg-gray-900 rounded mb-2"></div>
                <span className="text-xs">Koyu</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-900 rounded mb-2"></div>
                <span className="text-xs">Sistem</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Entegrasyonlar</CardTitle>
          <CardDescription>
            Üçüncü parti servislerle bağlantılarınızı yönetin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">WhatsApp Business</h3>
                <p className="text-sm text-gray-500">Müşteri mesajlaşması</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Bağlı</Badge>
              <Button variant="outline" size="sm">Ayarlar</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">E-posta Servisi</h3>
                <p className="text-sm text-gray-500">Otomatik e-posta gönderimi</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Bağlı Değil</Badge>
              <Button variant="outline" size="sm">Bağla</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">Google Calendar</h3>
                <p className="text-sm text-gray-500">Randevu senkronizasyonu</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">Bağlı Değil</Badge>
              <Button variant="outline" size="sm">Bağla</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile": return renderProfileTab();
      case "notifications": return renderNotificationsTab();
      case "security": return renderSecurityTab();
      case "appearance": return renderAppearanceTab();
      case "integrations": return renderIntegrationsTab();
      default: return renderProfileTab();
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ayarlar</h1>
          <p className="text-gray-600">Hesap ve uygulama ayarlarınızı yönetin</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <Button size="lg">
                <Save className="h-4 w-4 mr-2" />
                Değişiklikleri Kaydet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
