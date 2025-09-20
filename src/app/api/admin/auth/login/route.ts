import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Admin kullanıcıları (gerçek uygulamada ayrı veritabanında)
const adminUsers = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$vqNjHhIQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQ', // admin123
    role: 'super_admin',
    isActive: true
  },
  {
    id: 2,
    username: 'operator',
    password: '$2a$10$vqNjHhIQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQZ5YhQ', // operator123
    role: 'operator',
    isActive: true
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'admin-secret-key-here';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Admin kullanıcısını bul
    const admin = adminUsers.find(u => u.username === username);
    if (!admin) {
      return NextResponse.json(
        { message: 'Geçersiz kullanıcı adı veya şifre' },
        { status: 401 }
      );
    }

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Geçersiz kullanıcı adı veya şifre' },
        { status: 401 }
      );
    }

    // Admin aktif mi?
    if (!admin.isActive) {
      return NextResponse.json(
        { message: 'Admin hesabı deaktif edilmiş' },
        { status: 401 }
      );
    }

    // JWT token oluştur
    const token = jwt.sign(
      { 
        adminId: admin.id, 
        username: admin.username,
        role: admin.role,
        type: 'admin'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      message: 'Admin girişi başarılı',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
