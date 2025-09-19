"use client";

import { useState, useEffect } from 'react';
import WhatsAppService, { type WhatsAppMessage } from '@/lib/whatsapp-service';
import { MessageCircle, Search, Filter, User, Phone, Calendar, Star, MoreVertical, Send, CheckCheck, Clock, ThumbsUp, ThumbsDown, Minus, CalendarCheck, Users2, TrendingUp, MessageSquare } from 'lucide-react';


interface MessageEvaluation {
  customerPotential: 'high' | 'medium' | 'low';
  interestedProperty: string;
  budget: string;
  urgency: 'urgent' | 'normal' | 'low';
  notes: string;
}

export default function WhatsAppPage() {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<WhatsAppMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<WhatsAppMessage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPotential, setFilterPotential] = useState<string>('all');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [n8nStatus, setN8nStatus] = useState<'connected' | 'disconnected' | 'testing'>('testing');
  const [isLoading, setIsLoading] = useState(true);
  const [evaluation, setEvaluation] = useState<MessageEvaluation>({
    customerPotential: 'medium',
    interestedProperty: '',
    budget: '',
    urgency: 'normal',
    notes: ''
  });

  // Günlük istatistikler
  const todayStats = {
    totalConversations: 12,
    positiveResponses: 8,
    neutralResponses: 3,
    negativeResponses: 1,
    appointmentsScheduled: 5,
    meetingsArranged: 3,
    highPotentialLeads: 6,
    mediumPotentialLeads: 4,
    lowPotentialLeads: 2,
    respondedMessages: 10,
    pendingMessages: 2
  };

  // N8n bağlantısını test et ve mesajları yükle
  useEffect(() => {
    const initializeWhatsApp = async () => {
      setIsLoading(true);
      
      try {
        // N8n bağlantı testi
        const testResponse = await fetch('/api/whatsapp/test', {
          method: 'POST'
        });
        const testResult = await testResponse.json();
        
        setN8nStatus(testResult.success ? 'connected' : 'disconnected');
        
        // Mesajları yükle
        await loadMessages();
        
      } catch (error) {
        console.error('WhatsApp başlatma hatası:', error);
        setN8nStatus('disconnected');
      } finally {
        setIsLoading(false);
      }
    };

    initializeWhatsApp();
    
    // Her 30 saniyede bir mesajları yenile
    const interval = setInterval(() => {
      loadMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Mesajları API'den yükle
  const loadMessages = async () => {
    try {
      const response = await fetch('/api/whatsapp/status');
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Mesajları yükleme hatası:', error);
    }
  };

  // Filtreleme ve arama
  useEffect(() => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.senderPhone.includes(searchTerm)
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(msg => msg.status === filterStatus);
    }

    if (filterPotential !== 'all') {
      filtered = filtered.filter(msg => msg.potential === filterPotential);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterStatus, filterPotential]);

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Yeni';
      case 'responded': return 'Cevaplandı';
      case 'in_progress': return 'İşlemde';
      case 'converted': return 'Dönüştürüldü';
      case 'closed': return 'Kapandı';
      default: return status;
    }
  };

  const getPotentialText = (potential: string) => {
    switch (potential) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return potential;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleEvaluateMessage = (message: WhatsAppMessage) => {
    setSelectedMessage(message);
    setEvaluation({
      customerPotential: message.potential,
      interestedProperty: message.propertyType || '',
      budget: message.budget || '',
      urgency: 'normal',
      notes: ''
    });
    setShowEvaluationModal(true);
  };

  const saveEvaluation = async () => {
    if (selectedMessage) {
      try {
        // Mesaj durumunu API'de güncelle
        const response = await fetch('/api/whatsapp/status', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageId: selectedMessage.id,
            status: 'in_progress'
          })
        });

        if (response.ok) {
          // Başarılı ise local state'i güncelle
          const updatedMessages = messages.map(msg => 
            msg.id === selectedMessage.id 
              ? { ...msg, potential: evaluation.customerPotential, status: 'in_progress' as const }
              : msg
          );
          setMessages(updatedMessages);
          
          // Mesajları yeniden yükle
          await loadMessages();
        } else {
          console.error('Değerlendirme kaydedilemedi');
        }
      } catch (error) {
        console.error('Değerlendirme kaydetme hatası:', error);
      }
    }
    setShowEvaluationModal(false);
    setSelectedMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WhatsApp Mesajları</h1>
                <p className="text-sm text-gray-500">Müşteri mesajlarını yönet ve değerlendir</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* N8n Bağlantı Durumu */}
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${
                n8nStatus === 'connected' 
                  ? 'bg-green-100 text-green-800' 
                  : n8nStatus === 'disconnected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  n8nStatus === 'connected' 
                    ? 'bg-green-500' 
                    : n8nStatus === 'disconnected'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                }`}></div>
                <span>
                  N8n {n8nStatus === 'connected' ? 'Bağlı' : n8nStatus === 'disconnected' ? 'Bağlantısız' : 'Test Ediliyor'}
                </span>
              </div>
              
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredMessages.filter(msg => !msg.isRead).length} Okunmamış
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Günlük İstatistikler */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bugünkü Özet</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Toplam Konuşma */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Toplam Konuşma</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.totalConversations}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            {/* Olumlu Dönütler */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Olumlu Dönüt</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.positiveResponses}</p>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-500" />
              </div>
            </div>

            {/* Randevu Oluşturuldu */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Randevu Oluşturuldu</p>
                  <p className="text-2xl font-bold text-gray-900">{todayStats.appointmentsScheduled}</p>
                </div>
                <CalendarCheck className="h-8 w-8 text-purple-500" />
              </div>
            </div>

          </div>

          {/* Detaylı İstatistikler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Dönüt Analizi */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Dönüt Analizi
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Olumlu</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-900 mr-2">{todayStats.positiveResponses}</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {Math.round((todayStats.positiveResponses / todayStats.totalConversations) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Minus className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">Nötr</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-900 mr-2">{todayStats.neutralResponses}</span>
                    <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                      {Math.round((todayStats.neutralResponses / todayStats.totalConversations) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm text-gray-600">Negatif</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-900 mr-2">{todayStats.negativeResponses}</span>
                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      {Math.round((todayStats.negativeResponses / todayStats.totalConversations) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Potansiyel Analizi */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-600" />
                Potansiyel Analizi
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Yüksek Potansiyel</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{todayStats.highPotentialLeads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Orta Potansiyel</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{todayStats.mediumPotentialLeads}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Düşük Potansiyel</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{todayStats.lowPotentialLeads}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtreler ve Arama */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Arama */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="İsim, telefon veya mesaj içeriğinde ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Durum Filtresi */}
            <div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Durum filtresi"
                title="Mesaj durumuna göre filtrele"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="new">Yeni</option>
                <option value="responded">Cevaplandı</option>
                <option value="in_progress">İşlemde</option>
                <option value="converted">Dönüştürüldü</option>
                <option value="closed">Kapandı</option>
              </select>
            </div>

            {/* Potansiyel Filtresi */}
            <div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterPotential}
                onChange={(e) => setFilterPotential(e.target.value)}
                aria-label="Potansiyel filtresi"
                title="Müşteri potansiyelini göre filtrele"
              >
                <option value="all">Tüm Potansiyeller</option>
                <option value="high">Yüksek</option>
                <option value="medium">Orta</option>
                <option value="low">Düşük</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mesaj Listesi */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Mesajlar ({filteredMessages.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div key={message.id} className={`p-6 hover:bg-gray-50 transition-colors ${!message.isRead ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-green-100 rounded-full p-2">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{message.senderName}</h3>
                        {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{message.senderPhone}</span>
                        <Calendar className="h-4 w-4 text-gray-400 ml-4" />
                        <span className="text-sm text-gray-600">{formatTime(message.timestamp)}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{message.message}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                          {getStatusText(message.status)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPotentialColor(message.potential)}`}>
                          Potansiyel: {getPotentialText(message.potential)}
                        </span>
                        {message.propertyType && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {message.propertyType}
                          </span>
                        )}
                        {message.location && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            📍 {message.location}
                          </span>
                        )}
                        {message.budget && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            💰 {message.budget}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEvaluateMessage(message)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Değerlendir
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Daha fazla seçenek"
                      title="Mesaj için ek seçenekler"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mesaj bulunamadı</h3>
              <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
            </div>
          )}
        </div>
      </div>

      {/* Değerlendirme Modal */}
      {showEvaluationModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Müşteri Değerlendirmesi</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedMessage.senderName} - {selectedMessage.senderPhone}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Müşteri Mesajı</h4>
                <p className="text-gray-700">{selectedMessage.message}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Müşteri Potansiyeli
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={evaluation.customerPotential}
                    onChange={(e) => setEvaluation({...evaluation, customerPotential: e.target.value as 'high' | 'medium' | 'low'})}
                    aria-label="Müşteri potansiyeli"
                    title="Müşteri potansiyeli seviyesini seçin"
                  >
                    <option value="high">Yüksek Potansiyel</option>
                    <option value="medium">Orta Potansiyel</option>
                    <option value="low">Düşük Potansiyel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aciliyet Durumu
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={evaluation.urgency}
                    onChange={(e) => setEvaluation({...evaluation, urgency: e.target.value as 'urgent' | 'normal' | 'low'})}
                    aria-label="Aciliyet durumu"
                    title="Mesajın aciliyet seviyesini seçin"
                  >
                    <option value="urgent">Acil</option>
                    <option value="normal">Normal</option>
                    <option value="low">Düşük</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlgilendiği Mülk Tipi
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={evaluation.interestedProperty}
                  onChange={(e) => setEvaluation({...evaluation, interestedProperty: e.target.value})}
                  placeholder="Örn: 3+1 Daire, Villa, Ofis"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bütçe
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={evaluation.budget}
                  onChange={(e) => setEvaluation({...evaluation, budget: e.target.value})}
                  placeholder="Örn: 2.5M TL, 15-20K TL/ay"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notlar
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={evaluation.notes}
                  onChange={(e) => setEvaluation({...evaluation, notes: e.target.value})}
                  placeholder="Müşteri hakkında önemli notlar..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={saveEvaluation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
