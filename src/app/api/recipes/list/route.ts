import { Firebase } from "@/lib/FirebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = Firebase.instance.firestore();
    const docs = await db.docs("recipes");

    const params = req.nextUrl.searchParams;

    if (params && params.has("filter")) {
      const value = params.get("filter");
      if (value) {
        const data = await db.eq("recipes", "category", value);

        return NextResponse.json({
          success: true,
          data,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: docs,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 500 }
    );
  }
}
