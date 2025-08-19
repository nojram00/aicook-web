import { Firebase } from "@/lib/FirebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const db = Firebase.instance.firestore()

    const { name } = await req.json();

    const res = await db.create('test', {
        name
    })

    
    return NextResponse.json({
        success: true,
        id: res.id    
    })
}