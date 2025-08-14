import { NextRequest } from "next/server";

export async function verifyToken(token : string){
    const path = '/api/auth/verify';

    const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify({
            token
        })
    })

    return response.json()
}

export async function verifyTokenEdge(token: string, req : NextRequest){
    const response = await fetch(new URL('/api/auth/verify', req.url), {
        method: 'POST',
        body: JSON.stringify({
            token
        })
    })

    return response.json()
}