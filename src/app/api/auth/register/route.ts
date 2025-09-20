import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Geçici olarak in-memory database kullanıyoruz
// Gerçek uygulamada burada veritabanı bağlantısı olacak
let users = [
  {
    id: 1,
    email: 'test@test.com',
    password: '$2a$10$vqNjHhIQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQ', // test123
    companyName: 'Test Şirketi',
    fullName: 'Test Kullanıcı',
    phone: '555-123-4567',
    isActive: true,
    createdAt: new Date()
  }
];

export async function POST(request: NextRequest) {
  try {
    const { companyName, email, fullName, phone, password } = await request.json();

    // Zorunlu alanları kontrol et
    if (!companyName || !email || !fullName || !phone || !password) {
      return NextResponse.json(
        { message: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // E-posta formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    // Şifre uzunluğunu kontrol et
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      );
    }

    // E-posta daha önce kullanılmış mı?
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 409 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      companyName,
      fullName,
      phone,
      isActive: true,
      createdAt: new Date()
    };

    users.push(newUser);

    // Burada normalde:
    // 1. Veritabanına kayıt
    // 2. Şirket için ayrı database oluşturma
    // 3. Domain/subdomain ayarlama işlemleri yapılacak

    return NextResponse.json({
      message: 'Kayıt başarılı',
      user: {
        id: newUser.id,
        email: newUser.email,
        companyName: newUser.companyName,
        fullName: newUser.fullName
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
