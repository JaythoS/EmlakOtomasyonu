"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Calendar, 
  BarChart3, 
  Smartphone, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Star,
  MessageCircle,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: Building2,
      title: "Emlak İlan Yönetimi",
      description: "Emlak ilanlarınızı kolayca yönetin, fotoğraf ve doküman ekleyin, durumlarını takip edin.",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Müşteri Yönetimi",
      description: "Müşteri bilgilerini takip edin, lead skorlaması yapın ve iletişim geçmişini kaydedin.",
      color: "bg-green-500"
    },
    {
      icon: Calendar,
      title: "Randevu Yönetimi",
      description: "Müşteri randevularını planlayın, takvim entegrasyonu ile organize olun.",
      color: "bg-purple-500"
    },
    {
      icon: BarChart3,
      title: "Raporlama & Analiz",
      description: "Detaylı raporlar ve analizler ile iş performansınızı takip edin.",
      color: "bg-orange-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Entegrasyonu",
      description: "Müşterilerinizle WhatsApp üzerinden kolayca iletişim kurun.",
      color: "bg-green-600"
    },
    {
      icon: Globe,
      title: "Çoklu Platform Paylaşımı",
      description: "İlanlarınızı birden fazla platformda otomatik olarak paylaşın.",
      color: "bg-indigo-500"
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Satışları Artırın",
      description: "Organize müşteri takibi ile daha fazla satış yapın"
    },
    {
      icon: Zap,
      title: "Zaman Tasarrufu",
      description: "Otomatik süreçler ile zamanınızı daha verimli kullanın"
    },
    {
      icon: Shield,
      title: "Güvenli Veri",
      description: "Müşteri verileriniz güvenli bulut altyapısında saklanır"
    },
    {
      icon: Smartphone,
      title: "Mobil Erişim",
      description: "Her yerden, her zaman işlerinizi takip edin"
    }
  ];

  const stats = [
    { number: "500+", label: "Aktif Emlakçı" },
    { number: "10K+", label: "Yönetilen İlan" },
    { number: "50K+", label: "Mutlu Müşteri" },
    { number: "99%", label: "Memnuniyet Oranı" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Emlak CRM</h1>
                <p className="text-sm text-gray-600">Profesyonel Emlak Yönetimi</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push('/auth/login')}>
                Giriş Yap
              </Button>
              <Button size="sm" onClick={() => router.push('/auth/register')}>
                Ücretsiz Başla
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            🚀 Emlakçılar için Yeni Nesil CRM
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Emlak İşlerinizi
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Kolaylaştırın</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Müşteri takibi, WhatsApp entegrasyonu, randevu yönetimi ve çoklu platform paylaşımı ile 
            emlak işlerinizi profesyonelce yönetin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => router.push('/auth/register')}
              className="text-lg px-8 py-4 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Ücretsiz Deneyin
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 h-auto border-2"
            >
              Demo İzleyin
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Güçlü Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Emlak işlerinizi kolaylaştıran kapsamlı araçlar ve özellikler
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden Emlak CRM?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşinizi büyütmek için ihtiyacınız olan her şey tek platformda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Emlak işlerinizi profesyonelce yönetmek için bugün ücretsiz hesabınızı oluşturun.
            Kredi kartı gerektirmez!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-4 h-auto bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => router.push('/auth/register')}
            >
              Ücretsiz Hesap Oluştur
              <Star className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white hover:text-blue-600"
            >
              Demo Talep Et
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Building2 className="h-8 w-8" />
              </div>
              <span className="text-2xl font-bold">Emlak CRM</span>
            </div>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Emlakçılar için geliştirilen profesyonel CRM sistemi. 
              Müşteri takibi, randevu yönetimi ve çoklu platform paylaşımı ile işinizi büyütün.
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500">
                © 2024 Emlak CRM. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
