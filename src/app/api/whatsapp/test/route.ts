import { NextRequest, NextResponse } from 'next/server';
import WhatsAppService from '@/lib/whatsapp-service';

// N8n bağlantısını test et
export async function POST(request: NextRequest) {
  try {
    const whatsAppService = WhatsAppService.getInstance();
    
    console.log('N8n bağlantı testi başlatılıyor...');
    
    const isConnected = await whatsAppService.testN8nConnection();

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'N8n bağlantısı başarılı',
        data: {
          status: 'connected',
          timestamp: new Date().toISOString(),
          webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'Yapılandırılmamış'
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'N8n bağlantısı başarısız',
        data: {
          status: 'disconnected',
          timestamp: new Date().toISOString(),
          webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'Yapılandırılmamış'
        }
      }, { status: 503 });
    }

  } catch (error) {
    console.error('N8n bağlantı testi hatası:', error);
    return NextResponse.json({
      success: false,
      message: 'Bağlantı testi sırasında hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 });
  }
}

// Mevcut bağlantı durumunu kontrol et
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'WhatsApp N8n test endpoint\'i aktif',
    endpoints: {
      webhook: '/api/whatsapp/webhook',
      send: '/api/whatsapp/send',
      status: '/api/whatsapp/status',
      test: '/api/whatsapp/test'
    },
    configuration: {
      webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'Yapılandırılmamış',
      nodeEnv: process.env.NODE_ENV
    },
    timestamp: new Date().toISOString()
  });
}
