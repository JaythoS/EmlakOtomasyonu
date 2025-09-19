-- EMLAK OTOMASYONu DATABASE ŞEMASI
-- Her emlak ofisi için ayrı database olacak

-- 1. MÜŞTERILER TABLOSU
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whatsapp_phone VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- 2. WHATSAPP MESAJLARI TABLOSU
CREATE TABLE whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    message_id VARCHAR(255) UNIQUE, -- WhatsApp API'den gelen message ID
    sender_phone VARCHAR(20) NOT NULL,
    sender_name VARCHAR(200),
    message_text TEXT,
    message_type VARCHAR(50) DEFAULT 'text', -- text, image, voice, document
    timestamp TIMESTAMP NOT NULL,
    is_read BOOLEAN DEFAULT false,
    potential VARCHAR(20) CHECK (potential IN ('high', 'medium', 'low')),
    property_type VARCHAR(100), -- AI'ın çıkardığı mülk tipi
    budget VARCHAR(100), -- AI'ın çıkardığı bütçe
    location VARCHAR(200), -- AI'ın çıkardığı lokasyon
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'responded', 'in_progress', 'converted', 'closed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. MÜŞTERİ KONUŞMA ÖZETLERİ (N8N AI Agent'ın ürettiği)
CREATE TABLE conversation_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    conversation_date DATE NOT NULL,
    customer_needs TEXT, -- Müşterinin ne istediği (AI özeti)
    feedback_analysis TEXT, -- Dönüt analizi
    potential_score VARCHAR(20) CHECK (potential_score IN ('high', 'medium', 'low')),
    appointment_created BOOLEAN DEFAULT false,
    appointment_details TEXT,
    ai_summary TEXT, -- AI'ın genel konuşma özeti
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. MÜLKLER TABLOSU
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('apartment', 'house', 'office', 'land', 'villa')),
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented', 'pending')),
    price DECIMAL(15,2) NOT NULL,
    location VARCHAR(500),
    district VARCHAR(200),
    city VARCHAR(100),
    area_sqm INTEGER, -- Metrekare
    rooms VARCHAR(20), -- 3+1, 2+1, vs.
    bathrooms INTEGER,
    has_parking BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- 5. MÜLK GÖRSELLERİ (Firebase Storage linkler)
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    firebase_url TEXT NOT NULL,
    file_name VARCHAR(500),
    is_primary BOOLEAN DEFAULT false, -- Ana görsel mi
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. PLATFORM ENTEGRASYONLARI (İlan durumları)
CREATE TABLE platform_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    platform_name VARCHAR(100) NOT NULL, -- 'sahibinden', 'hurriyetemlak', 'emlakjet', 'zingat', 'endeksa'
    external_listing_id VARCHAR(200), -- Platform'daki ilan ID'si
    listing_url TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'error')),
    last_sync_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. KULLANICI AYARLARI (Sistem ayarları)
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(200) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string', -- string, boolean, number, json
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. N8N AI AGENT HAFIZA (Conversation Memory)
CREATE TABLE ai_conversation_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    memory_type VARCHAR(100) DEFAULT 'conversation', -- conversation, customer_profile, preferences
    content TEXT NOT NULL, -- JSON veya text format
    embedding VECTOR(1536), -- OpenAI embedding (Supabase vector)
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP -- Hafızanın son kullanma tarihi
);

-- INDEX'LER
CREATE INDEX idx_customers_phone ON customers(whatsapp_phone);
CREATE INDEX idx_messages_customer ON whatsapp_messages(customer_id);
CREATE INDEX idx_messages_timestamp ON whatsapp_messages(timestamp DESC);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_platform_listings_property ON platform_listings(property_id);
CREATE INDEX idx_ai_memory_customer ON ai_conversation_memory(customer_id);
CREATE INDEX idx_ai_memory_session ON ai_conversation_memory(session_id);

-- ÖRNEK SYSTEM SETTINGS
INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
('company_name', 'Emlak Ofisi', 'string', 'Şirket adı'),
('whatsapp_phone', '', 'string', 'WhatsApp Business telefon numarası'),
('n8n_webhook_url', '', 'string', 'N8N Webhook URL'),
('ai_agent_prompt', '', 'text', 'AI Agent system prompt'),
('notification_email', '', 'boolean', 'E-posta bildirimleri aktif mi'),
('notification_whatsapp', '', 'boolean', 'WhatsApp bildirimleri aktif mi'),
('notification_sms', '', 'boolean', 'SMS bildirimleri aktif mi');
