import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers, addUser, findUserByEmail } from '@/lib/users-data';

const JWT_SECRET = process.env.JWT_SECRET || 'admin-secret-key-here';

// Admin token'ını doğrula
function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded.type === 'admin' ? decoded : null;
  } catch {
    return null;
  }
}

// Kullanıcıları listele (GET)
export async function GET(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json(
      { message: 'Yetkisiz erişim' },
      { status: 401 }
    );
  }

  const users = getUsers();
  const safeUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    companyName: user.companyName,
    fullName: user.fullName,
    phone: user.phone,
    isActive: user.isActive,
    createdAt: user.createdAt.toISOString()
  }));

  return NextResponse.json({ users: safeUsers });
}

// Yeni kullanıcı ekle (POST)
export async function POST(request: NextRequest) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json(
      { message: 'Yetkisiz erişim' },
      { status: 401 }
    );
  }

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

    return NextResponse.json({
      message: 'Kullanıcı başarıyla eklendi',
      user: {
        id: newUser.id,
        email: newUser.email,
        companyName: newUser.companyName,
        fullName: newUser.fullName
      }
    });

  } catch (error) {
    console.error('Add user error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
