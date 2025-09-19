# N8n WhatsApp Workflows

Bu klasör WhatsApp entegrasyonu için N8n workflow'larını içerir.

## 📋 Workflow Listesi

### 1. `01-whatsapp-incoming-messages.json`
**WhatsApp Gelen Mesajlar**
- WhatsApp'tan gelen mesajları alır
- Mesajları analiz eder (potansiyel, mülk tipi, bütçe, lokasyon)
- Sisteme gönderir
- **Webhook URL**: `/whatsapp-incoming`

### 2. `02-whatsapp-send-messages.json`
**WhatsApp Mesaj Gönderme**
- Sistemden gelen mesaj gönderme isteklerini işler
- WhatsApp Business API üzerinden mesaj gönderir
- Gönderim durumunu sisteme bildirir
- **Webhook URL**: `/send-whatsapp`

### 3. `03-whatsapp-auto-reply.json`
**WhatsApp Otomatik Cevap**
- Gelen mesajların potansiyelini analiz eder
- Potansiyele göre farklı cevaplar hazırlar:
  - Yüksek potansiyel: Acil cevap (2 saat içinde)
  - Orta potansiyel: Standart cevap (4-6 saat içinde)
  - Düşük potansiyel: Genel cevap
- **Webhook URL**: `/auto-reply`

### 4. `04-whatsapp-analytics.json`
**WhatsApp Analitik ve İstatistikler**
- Her 30 dakikada bir çalışır
- Günlük istatistikleri hesaplar
- Veritabanına kaydet (isteğe bağlı)
- Akşam 18:00'da günlük rapor e-postası gönderir

## 🚀 Kurulum Adımları

### 1. N8n'de Workflow İmport Etme
1. N8n arayüzünde "Import from file" butonuna tıklayın
2. JSON dosyalarını tek tek import edin
3. Her workflow için gerekli credentials'ları ayarlayın

### 2. Gerekli Credentials

#### WhatsApp Business API
```
Credential Type: HTTP Header Auth
Name: whatsapp-business-credentials
Header Name: Authorization
Header Value: Bearer YOUR_ACCESS_TOKEN
```

#### MySQL Database (İsteğe bağlı - Analytics için)
```
Credential Type: MySQL
Host: localhost
Database: emlak_db
Username: your_username
Password: your_password
```

### 3. Environment Variables
```bash
# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token

# System URLs
SYSTEM_BASE_URL=http://localhost:3000
```

### 4. Webhook URLs Güncelleme
Her workflow'da şu URL'leri kendi domain'inizle değiştirin:
- `http://localhost:3000` → `https://your-domain.com`
- `YOUR_PHONE_NUMBER_ID` → Gerçek WhatsApp Business Phone Number ID

## 📊 Workflow Akışı

```
WhatsApp Mesaj → N8n Webhook → Analiz → Sistem → Otomatik Cevap
                                   ↓
                            Analytics → Rapor
```

## 🔧 Özelleştirme

### Otomatik Cevap Mesajları
`03-whatsapp-auto-reply.json` dosyasındaki function node'larda mesaj şablonlarını değiştirebilirsiniz.

### Analiz Kriterleri
`01-whatsapp-incoming-messages.json` dosyasındaki analiz function'ında:
- Potansiyel keywords
- Mülk tipi detection
- Lokasyon listesi
- Bütçe regex patterns

### Raporlama Sıklığı
`04-whatsapp-analytics.json` dosyasındaki cron expression'ı değiştirerek rapor sıklığını ayarlayabilirsiniz:
- `0 */30 * * * *` - Her 30 dakika
- `0 0 * * * *` - Her saat
- `0 0 18 * * *` - Her gün 18:00

## 🐛 Troubleshooting

### Webhook Çalışmıyor
1. N8n webhook URL'lerini kontrol edin
2. Firewall ayarlarını kontrol edin
3. HTTPS sertifikası aktif mi kontrol edin

### Mesaj Gönderilmiyor
1. WhatsApp Business API credentials'larını kontrol edin
2. Phone Number ID doğru mu kontrol edin
3. Rate limiting kontrol edin

### Analytics Çalışmıyor
1. System API endpoint'leri erişilebilir mi kontrol edin
2. Database bağlantısını kontrol edin
3. Cron job aktif mi kontrol edin

## 📞 Destek

Workflow'larla ilgili sorunlar için:
1. N8n loglarını kontrol edin
2. System API loglarını kontrol edin
3. WhatsApp Business API status'unu kontrol edin
