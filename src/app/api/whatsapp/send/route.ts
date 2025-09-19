import { NextRequest, NextResponse } from 'next/server';
import WhatsAppService from '@/lib/whatsapp-service';

// WhatsApp mesajı gönder
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const whatsAppService = WhatsAppService.getInstance();

    // Gelen veriyi doğrula
    if (!body.phoneNumber || !body.message) {
      return NextResponse.json(
        { error: 'Eksik zorunlu alanlar: phoneNumber, message' },
        { status: 400 }
      );
    }

    // Telefon numarasını temizle (+ işaretini kaldır)
    const cleanPhoneNumber = body.phoneNumber.replace(/^\+/, '');

    // N8n'e mesaj gönder
    const success = await whatsAppService.sendMessageToN8n(cleanPhoneNumber, body.message);

    if (success) {
      console.log('Mesaj gönderildi:', {
        to: cleanPhoneNumber,
        message: body.message.substring(0, 50) + '...'
      });

      return NextResponse.json({
        success: true,
        message: 'Mesaj başarıyla gönderildi',
        data: {
          to: cleanPhoneNumber,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Mesaj gönderilemedi' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Mesaj gönderme hatası:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilirken hata oluştu' },
      { status: 500 }
    );
  }
}
