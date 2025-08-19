import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('token');

        if (!token) {
            return Response.json({ error: 'No token found' }, { status: 401 });
        }

        const { Firebase } = await import('@/lib/FirebaseAdmin');
        const firebase = Firebase.instance;
        const auth = firebase.fireauth();

        // Verify the token first to get the user ID
        const decodedToken = await auth.verifyToken(token.value);
        
        // Invalidate all refresh tokens for this user
        await auth.invalidateToken(decodedToken.uid);

        // Clear the cookie
        const response = Response.json({ message: 'Token invalidated successfully' });
        response.headers.set('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict');
        
        return response;
    } catch (error) {
        console.error('Token invalidation error:', error);
        return Response.json({ error: 'Failed to invalidate token' }, { status: 500 });
    }
}