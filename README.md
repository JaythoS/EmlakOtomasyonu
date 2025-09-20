# 🏠 Emlak CRM Frontend

Bu proje, emlakçılar için geliştirilen **CRM + otomasyon + çoklu platform paylaşım** sisteminin **frontend (React + Next.js + TypeScript)** kısmıdır. Proje, kullanıcıların müşteri takibi, WhatsApp entegrasyonu, randevu yönetimi ve ilan paylaşımı gibi işlemleri kolayca yönetmesini sağlar.  

## 🚀 Kullanılan Teknolojiler
- **Next.js** → React tabanlı framework (SSR & SSG desteği)  
- **React** → Bileşen tabanlı frontend kütüphanesi  
- **TypeScript** → Tip güvenliği  
- **TailwindCSS** → Hızlı ve esnek UI tasarımı  
- **Shadcn/UI** → Modern UI bileşenleri  
- **Framer Motion** → Animasyon ve geçişler  
- **React Query / Tanstack Query** → API veri yönetimi  
- **React Hook Form + Zod** → Form yönetimi ve doğrulama  
- **i18next** → Çoklu dil desteği (TR & EN)  

## 📂 Proje Yapısı
```
/src
 ├── app/               # Next.js App Router yapısı
 │   ├── dashboard/     # CRM dashboard sayfaları
 │   ├── auth/          # Giriş / kayıt / şifre sıfırlama
 │   ├── properties/    # Emlak ilanları listesi & yönetimi
 │   ├── meetings/      # Randevu yönetimi
 │   ├── customers/     # Müşteri yönetimi
 │   └── settings/      # Profil & takım ayarları
 │
 ├── components/        # Ortak React bileşenleri
 │   ├── ui/            # Shadcn UI custom bileşenler
 │   ├── forms/         # Form bileşenleri
 │   └── charts/        # Grafik & rapor bileşenleri
 │
 ├── hooks/             # Custom React hook'ları
 ├── lib/               # Yardımcı fonksiyonlar, config dosyaları
 ├── context/           # Global context (auth, tema, dil)
 ├── styles/            # Global stiller
 └── types/             # TypeScript tip tanımları
```

## 🌟 Frontend Özellikleri
- 📊 **CRM Dashboard** → Müşteri takibi, filtreleme (sıcak/soğuk lead)  
- 📱 **WhatsApp mesaj entegrasyonu (UI tarafı)** → Mesaj geçmişi ve otomatik cevapların gösterimi  
- 📅 **Randevu Yönetimi** → Takvim entegrasyonu ve toplantı takibi  
- 📄 **Otomatik Doküman Görüntüleme** → PDF dosyalarının önizlenmesi  
- 🎯 **Lead Skorlama** → AI puanlamalarının görselleştirilmesi (progress bar, etiket)  
- 🏢 **Takım Yönetimi UI** → Kullanıcı rolleri, davet sistemi  
- 🌍 **Çoklu Dil Desteği** → TR/EN switch  
- 🎨 **Modern UI/UX** → Tailwind + Shadcn bileşenleri ile minimal ve profesyonel tasarım  

## 📦 Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Build al
npm run build

# Production çalıştır
npm start
```

## 🔮 Yol Haritası (Frontend)
- [ ] Dashboard prototipi oluşturma  
- [ ] Auth sayfaları (login/register)  
- [ ] Müşteri listesi & detay sayfası  
- [ ] Randevu takvimi (Google Calendar entegrasyonu için UI)  
- [ ] İlan paylaşım formu + preview ekranı  
- [ ] Çoklu dil (TR/EN) switch  
- [ ] Responsive tasarım (mobil/tablet/desktop)  