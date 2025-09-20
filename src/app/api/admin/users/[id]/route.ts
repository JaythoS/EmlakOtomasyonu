import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserById } from '@/lib/users-data';

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

// Kullanıcı durumunu güncelle (PATCH)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = verifyAdminToken(request);
  if (!admin) {
    return NextResponse.json(
      { message: 'Yetkisiz erişim' },
      { status: 401 }
    );
  }

  try {
    const userId = parseInt(params.id);
    const { isActive } = await request.json();

    const user = getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Kullanıcı durumunu güncelle
    user.isActive = isActive;

    return NextResponse.json({
      message: 'Kullanıcı durumu güncellendi',
      user: {
        id: user.id,
        email: user.email,
        companyName: user.companyName,
        fullName: user.fullName,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
