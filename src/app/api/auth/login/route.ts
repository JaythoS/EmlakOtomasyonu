import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Geçici olarak in-memory database kullanıyoruz
// Gerçek uygulamada burada veritabanı bağlantısı olacak
const users = [
  {
    id: 1,
    email: 'test@test.com',
    password: '$2a$10$vqNjHhIQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQ', // test123
    companyName: 'Test Şirketi',
    fullName: 'Test Kullanıcı',
    phone: '555-123-4567',
    isActive: true
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-posta ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Kullanıcıyı bul
    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        { message: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Geçersiz e-posta veya şifre' },
        { status: 401 }
      );
    }

    // Kullanıcı aktif mi?
    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Hesabınız deaktif edilmiş' },
        { status: 401 }
      );
    }

    // JWT token oluştur
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        companyName: user.companyName
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user.id,
        email: user.email,
        companyName: user.companyName,
        fullName: user.fullName
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
