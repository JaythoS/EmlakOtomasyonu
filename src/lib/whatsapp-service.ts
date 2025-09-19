interface WhatsAppMessage {
  id: string;
  senderName: string;
  senderPhone: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  messageType: 'text' | 'image' | 'voice' | 'document';
  potential: 'high' | 'medium' | 'low';
  propertyType?: string;
  budget?: string;
  location?: string;
  status: 'new' | 'responded' | 'in_progress' | 'converted' | 'closed';
}

interface N8nWebhookData {
  messageId: string;
  from: string;
  name: string;
  message: string;
  timestamp: string;
  messageType: string;
}

class WhatsAppService {
  private static instance: WhatsAppService;
  private n8nWebhookUrl: string;
  private messages: WhatsAppMessage[] = [];

  private constructor() {
    this.n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/whatsapp';
  }

  public static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }

  // N8n'den gelen mesajları işle
  async processIncomingMessage(webhookData: N8nWebhookData): Promise<WhatsAppMessage> {
    const message: WhatsAppMessage = {
      id: webhookData.messageId,
      senderName: webhookData.name || 'Bilinmeyen',
      senderPhone: webhookData.from,
      message: webhookData.message,
      timestamp: new Date(webhookData.timestamp),
      isRead: false,
      messageType: this.determineMessageType(webhookData.messageType),
      potential: this.analyzePotential(webhookData.message),
      status: 'new',
      ...this.extractPropertyInfo(webhookData.message)
    };

    this.messages.unshift(message);
    return message;
  }

  // Mesaj potansiyelini analiz et
  private analyzePotential(message: string): 'high' | 'medium' | 'low' {
    const highPotentialKeywords = ['acil', 'yarın', 'bugün', 'hemen', 'kesin', 'karar verdim'];
    const mediumPotentialKeywords = ['arıyorum', 'istiyorum', 'bakıyorum', 'düşünüyorum'];
    
    const lowerMessage = message.toLowerCase();
    
    if (highPotentialKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'high';
    }
    
    if (mediumPotentialKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'medium';
    }
    
    return 'low';
  }

  // Emlak bilgilerini mesajdan çıkart
  private extractPropertyInfo(message: string) {
    const lowerMessage = message.toLowerCase();
    let propertyType = '';
    let budget = '';
    let location = '';

    // Mülk tipi analizi
    if (lowerMessage.includes('villa')) propertyType = 'Villa';
    else if (lowerMessage.includes('daire')) propertyType = 'Daire';
    else if (lowerMessage.includes('ev')) propertyType = 'Ev';
    else if (lowerMessage.includes('ofis')) propertyType = 'Ofis';
    else if (lowerMessage.includes('3+1')) propertyType = '3+1 Daire';
    else if (lowerMessage.includes('2+1')) propertyType = '2+1 Daire';
    else if (lowerMessage.includes('4+1')) propertyType = '4+1 Daire';

    // Bütçe analizi
    const budgetMatch = message.match(/(\d+(?:\.\d+)?)\s*(milyon|bin|k)\s*(tl|lira)/i);
    if (budgetMatch) {
      budget = budgetMatch[0];
    }

    // Lokasyon analizi
    const locations = ['bahçelievler', 'kadıköy', 'şişli', 'beylikdüzü', 'büyükçekmece', 'beşiktaş', 'üsküdar'];
    const foundLocation = locations.find(loc => lowerMessage.includes(loc));
    if (foundLocation) {
      location = foundLocation.charAt(0).toUpperCase() + foundLocation.slice(1);
    }

    return { propertyType, budget, location };
  }

  // Mesaj tipini belirle
  private determineMessageType(type: string): 'text' | 'image' | 'voice' | 'document' {
    switch (type?.toLowerCase()) {
      case 'image': return 'image';
      case 'voice': return 'voice';
      case 'document': return 'document';
      default: return 'text';
    }
  }

  // N8n'e mesaj gönder
  async sendMessageToN8n(phoneNumber: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_message',
          to: phoneNumber,
          message: message,
          timestamp: new Date().toISOString()
        })
      });

      return response.ok;
    } catch (error) {
      console.error('N8n mesaj gönderme hatası:', error);
      return false;
    }
  }

  // Mesaj durumunu güncelle
  async updateMessageStatus(messageId: string, status: WhatsAppMessage['status']): Promise<void> {
    const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex !== -1) {
      this.messages[messageIndex].status = status;
      
      // N8n'e durum güncellemesi gönder
      await this.sendStatusUpdateToN8n(messageId, status);
    }
  }

  // N8n'e durum güncellemesi gönder
  private async sendStatusUpdateToN8n(messageId: string, status: string): Promise<void> {
    try {
      await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_status',
          messageId: messageId,
          status: status,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('N8n durum güncelleme hatası:', error);
    }
  }

  // Tüm mesajları getir
  getAllMessages(): WhatsAppMessage[] {
    return this.messages;
  }

  // Mesajları filtrele
  getFilteredMessages(filters: {
    search?: string;
    status?: string;
    potential?: string;
  }): WhatsAppMessage[] {
    let filtered = this.messages;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(msg => 
        msg.senderName.toLowerCase().includes(searchTerm) ||
        msg.message.toLowerCase().includes(searchTerm) ||
        msg.senderPhone.includes(searchTerm)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(msg => msg.status === filters.status);
    }

    if (filters.potential && filters.potential !== 'all') {
      filtered = filtered.filter(msg => msg.potential === filters.potential);
    }

    return filtered;
  }

  // N8n bağlantısını test et
  async testN8nConnection(): Promise<boolean> {
    try {
      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'test_connection',
          timestamp: new Date().toISOString()
        })
      });

      return response.ok;
    } catch (error) {
      console.error('N8n bağlantı testi hatası:', error);
      return false;
    }
  }
}

export default WhatsAppService;
export type { WhatsAppMessage, N8nWebhookData };
