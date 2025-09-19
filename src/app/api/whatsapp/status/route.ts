import { NextRequest, NextResponse } from 'next/server';
import WhatsAppService from '@/lib/whatsapp-service';

// Mesaj durumunu güncelle
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const whatsAppService = WhatsAppService.getInstance();

    // Gelen veriyi doğrula
    if (!body.messageId || !body.status) {
      return NextResponse.json(
        { error: 'Eksik zorunlu alanlar: messageId, status' },
        { status: 400 }
      );
    }

    // Geçerli durum kontrolü
    const validStatuses = ['new', 'responded', 'in_progress', 'converted', 'closed'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Geçersiz durum. Geçerli durumlar: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    // Mesaj durumunu güncelle
    await whatsAppService.updateMessageStatus(body.messageId, body.status);

    console.log('Mesaj durumu güncellendi:', {
      messageId: body.messageId,
      newStatus: body.status
    });

    return NextResponse.json({
      success: true,
      message: 'Mesaj durumu başarıyla güncellendi',
      data: {
        messageId: body.messageId,
        status: body.status,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Durum güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'Durum güncellenirken hata oluştu' },
      { status: 500 }
    );
  }
}

// Tüm mesajları getir
export async function GET(request: NextRequest) {
  try {
    const whatsAppService = WhatsAppService.getInstance();
    const url = new URL(request.url);
    
    // Query parametrelerini al
    const search = url.searchParams.get('search') || undefined;
    const status = url.searchParams.get('status') || undefined;
    const potential = url.searchParams.get('potential') || undefined;

    const messages = whatsAppService.getFilteredMessages({
      search,
      status,
      potential
    });

    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Mesajları getirme hatası:', error);
    return NextResponse.json(
      { error: 'Mesajlar alınırken hata oluştu' },
      { status: 500 }
    );
  }
}
