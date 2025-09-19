import { NextRequest, NextResponse } from 'next/server';
import WhatsAppService, { type N8nWebhookData } from '@/lib/whatsapp-service';

// N8n'den gelen webhook'ları işle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const whatsAppService = WhatsAppService.getInstance();

    // Gelen veriyi doğrula
    if (!body.messageId || !body.from || !body.message) {
      return NextResponse.json(
        { error: 'Eksik zorunlu alanlar: messageId, from, message' },
        { status: 400 }
      );
    }

    const webhookData: N8nWebhookData = {
      messageId: body.messageId,
      from: body.from,
      name: body.name || 'Bilinmeyen',
      message: body.message,
      timestamp: body.timestamp || new Date().toISOString(),
      messageType: body.messageType || 'text'
    };

    // Mesajı işle ve kaydet
    const processedMessage = await whatsAppService.processIncomingMessage(webhookData);

    console.log('WhatsApp mesajı işlendi:', {
      id: processedMessage.id,
      from: processedMessage.senderPhone,
      potential: processedMessage.potential
    });

    return NextResponse.json({
      success: true,
      message: 'Mesaj başarıyla işlendi',
      data: {
        messageId: processedMessage.id,
        potential: processedMessage.potential,
        propertyType: processedMessage.propertyType,
        status: processedMessage.status
      }
    });

  } catch (error) {
    console.error('Webhook işleme hatası:', error);
    return NextResponse.json(
      { error: 'Mesaj işlenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// N8n bağlantı testi
export async function GET(request: NextRequest) {
  const whatsAppService = WhatsAppService.getInstance();
  
  return NextResponse.json({
    success: true,
    message: 'WhatsApp webhook endpoint aktif',
    timestamp: new Date().toISOString(),
    endpoint: '/api/whatsapp/webhook'
  });
}
