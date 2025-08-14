import { NextRequest, NextResponse } from 'next/server';
import { Firebase } from '@/hooks/useFirebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required', valid: false }, { status: 400 });
    }

    const decodedToken = await Firebase.instance.fireauth().verifyToken(token);
    
    return NextResponse.json({ 
      valid: true, 
      uid: decodedToken.uid,
      email: decodedToken.email 
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Invalid token', valid: false }, { status: 401 });
  }
}