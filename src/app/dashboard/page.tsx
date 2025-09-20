'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  Clock,
  Star,
  Share2,
  Target,
  BarChart3,
  Zap,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Mock data - Otomasyon odaklı
const automationStats = {
  // Son 24 saat otomasyon durumu
  last24Hours: {
    incomingMessages: 47,
    botReplied: 42,
    meetingRequests: 12,
    successfulAutomations: 38,
    failedAutomations: 4,
  },
  // Lead funnel aşamaları
  leadFunnel: {
    messages: 156,
    botReplied: 134,
    meetingRequested: 45,
    meetingCompleted: 28,
    positiveResult: 18,
    negativeResult: 10,
  },
  // Lead kalitesi
  leadQuality: {
    highPotential: 23,
    mediumPotential: 45,
    lowPotential: 88,
    hotLeads: 18,
    coldLeads: 67,
  },
  // İlan paylaşım durumu
  propertySharing: {
    totalShared: 89,
    activeOnPlatforms: 67,
    sharingFailures: 3,
    platforms: ['WhatsApp', 'Instagram', 'Facebook', 'Emlak Sitesi'],
  },
};

const automationActivity = [
  {
    id: 1,
    type: 'bot',
    title: 'Bot otomatik cevap verdi',
    description: 'Ahmet Yılmaz - "3+1 daire hakkında bilgi" sorusu',
    time: '5 dakika önce',
    icon: Bot,
    status: 'success',
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Toplantı isteği oluşturuldu',
    description: 'Ayşe Demir - Bot tarafından yönlendirildi',
    time: '15 dakika önce',
    icon: Calendar,
    status: 'success',
  },
  {
    id: 3,
    type: 'sharing',
    title: 'İlan otomatik paylaşıldı',
    description: 'Villa ilanı - 4 platformda aktif',
    time: '1 saat önce',
    icon: Share2,
    status: 'success',
  },
  {
    id: 4,
    type: 'error',
    title: 'Otomasyon hatası',
    description: 'Mehmet Kaya mesajı - Bot cevap veremedi',
    time: '2 saat önce',
    icon: AlertCircle,
    status: 'error',
  },
  {
    id: 5,
    type: 'meeting',
    title: 'Toplantı tamamlandı',
    description: 'Fatma Öz - Olumlu sonuç, takip gerekli',
    time: '3 saat önce',
    icon: CheckCircle,
    status: 'success',
  },
];

const upcomingMeetings = [
  {
    id: 1,
    title: 'Emlak Görüntüleme',
    customer: 'Mehmet Kaya',
    property: '3+1 Daire, Beşiktaş',
    time: '14:30',
    date: 'Bugün',
    source: 'Bot Yönlendirmesi',
    leadScore: 85,
  },
  {
    id: 2,
    title: 'Müşteri Görüşmesi',
    customer: 'Fatma Özkan',
    property: '2+1 Daire, Şişli',
    time: '16:00',
    date: 'Bugün',
    source: 'WhatsApp Otomasyonu',
    leadScore: 92,
  },
  {
    id: 3,
    title: 'Sözleşme İmza',
    customer: 'Ali Veli',
    property: '4+1 Villa, Bebek',
    time: '10:00',
    date: 'Yarın',
    source: 'Bot Takibi',
    leadScore: 95,
  },
];

const aiScoredLeads = [
  {
    id: 1,
    name: 'Zeynep Ak',
    score: 95,
    source: 'Bot Analizi',
    lastContact: '2 gün önce',
    aiInsight: 'Yüksek satın alma olasılığı',
    automationStatus: 'Bot takip ediyor',
  },
  {
    id: 2,
    name: 'Can Yılmaz',
    score: 88,
    source: 'WhatsApp Otomasyonu',
    lastContact: '1 gün önce',
    aiInsight: 'Orta-yüksek potansiyel',
    automationStatus: 'Toplantı planlandı',
  },
  {
    id: 3,
    name: 'Elif Demir',
    score: 82,
    source: 'Sosyal Medya Bot',
    lastContact: '3 gün önce',
    aiInsight: 'İlgi gösteriyor',
    automationStatus: 'Bot mesaj gönderiyor',
  },
];

export default function DashboardPage() {
  const { t } = useLanguage();

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    description 
  }: {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<{ className?: string }>;
    description?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            {change}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );

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
            <h1 className="text-3xl font-bold tracking-tight">Otomasyon Dashboard</h1>
            <p className="text-muted-foreground">
              Bot performansı, lead yolculuğu ve otomasyon durumu
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Otomasyon Ayarları
            </Button>
          </div>
        </div>

        {/* Otomasyon Durumu Paneli */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Son 24 Saat Mesajlar"
            value={automationStats.last24Hours.incomingMessages}
            change={`${automationStats.last24Hours.botReplied} bot cevapladı`}
            icon={MessageSquare}
            description="Gelen mesajlar"
          />
          <StatCard
            title="Bot Başarı Oranı"
            value={`%${Math.round((automationStats.last24Hours.successfulAutomations / automationStats.last24Hours.incomingMessages) * 100)}`}
            change={`${automationStats.last24Hours.failedAutomations} başarısız`}
            icon={Bot}
            description="Otomatik cevaplama"
          />
          <StatCard
            title="Toplantı İstekleri"
            value={automationStats.last24Hours.meetingRequests}
            change="Bot yönlendirmesi"
            icon={Calendar}
            description="Otomatik yönlendirme"
          />
          <StatCard
            title="İlan Paylaşımları"
            value={automationStats.propertySharing.activeOnPlatforms}
            change={`${automationStats.propertySharing.sharingFailures} hata`}
            icon={Share2}
            description="Aktif platformlar"
          />
          <StatCard
            title="AI Skorlu Leadler"
            value={automationStats.leadQuality.highPotential}
            change={`${automationStats.leadQuality.mediumPotential} orta`}
            icon={Target}
            description="Yüksek potansiyel"
          />
        </div>

        {/* Lead Funnel Görselleştirme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Lead Funnel - Müşteri Yolculuğu
            </CardTitle>
            <CardDescription>
              Bot tarafından yönetilen lead sürecinin aşamaları
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{automationStats.leadFunnel.messages}</div>
                <div className="text-sm text-gray-600">Mesajlar</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Bot className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">{automationStats.leadFunnel.botReplied}</div>
                <div className="text-sm text-gray-600">Bot Cevapladı</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-yellow-600">{automationStats.leadFunnel.meetingRequested}</div>
                <div className="text-sm text-gray-600">Toplantı İsteği</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{automationStats.leadFunnel.meetingCompleted}</div>
                <div className="text-sm text-gray-600">Toplantı Yapıldı</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-600">{automationStats.leadFunnel.positiveResult}</div>
                <div className="text-sm text-gray-600">Olumlu Sonuç</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Otomasyon Aktiviteleri */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Otomasyon Aktiviteleri
              </CardTitle>
              <CardDescription>
                Bot ve otomasyon süreçlerinin gerçek zamanlı durumu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationActivity.map((activity) => {
                  const Icon = activity.icon;
                  const statusColor = activity.status === 'success' ? 'text-green-600' : 'text-red-600';
                  const bgColor = activity.status === 'success' ? 'bg-green-100' : 'bg-red-100';
                  
                  return (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${statusColor}`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bot Yönlendirmeli Toplantılar */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Bot Yönlendirmeli Toplantılar
              </CardTitle>
              <CardDescription>
                Otomasyon tarafından planlanan görüşmeler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center space-x-4">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{meeting.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {meeting.customer} - {meeting.property}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {meeting.source}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Skor: {meeting.leadScore}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {meeting.date} {meeting.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Skorlu Leadler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-500" />
              AI Skorlu Leadler
            </CardTitle>
            <CardDescription>
              Bot tarafından analiz edilen ve skorlanan müşteriler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiScoredLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.source} • {lead.aiInsight}
                      </p>
                      <p className="text-xs text-blue-600">
                        {lead.automationStatus}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{lead.score}</div>
                      <div className="text-xs text-muted-foreground">AI Skor</div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Bot className="h-4 w-4 mr-1" />
                      Bot Takibi
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
