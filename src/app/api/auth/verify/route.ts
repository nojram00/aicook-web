import { NextRequest, NextResponse } from 'next/server';
import { Firebase } from '@/lib/FirebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    const params = request.nextUrl.searchParams;

    if (!token) {
      return NextResponse.json({ error: 'Token is required', valid: false }, { status: 400 });
    }

    const decodedToken = await Firebase.instance.fireauth().verifyToken(token);

    const userInfo = params.has('show-user') ? {
      username: decodedToken.name,
      profile_photo: decodedToken.picture,
    } : null;
    
    return NextResponse.json({ 
      valid: true, 
      uid: decodedToken.uid,
      email: decodedToken.email,
      ...userInfo
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Invalid token', valid: false }, { status: 401 });
  }
}