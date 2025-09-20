import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, addUser } from '@/lib/users-data';

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
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 409 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = addUser({
      email,
      password: hashedPassword,
      companyName,
      fullName,
      phone,
      isActive: true,
      createdAt: new Date()
    });

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
