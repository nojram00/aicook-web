import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("image");

    if (filename && request.body) {
      const blob = await put(filename, request.body, {
        access: "public",
      });

      return NextResponse.json({
        ...blob,
        success: true,
      });
    }

    return NextResponse.json(
      { message: "file upload failed", success: false },
      {
        status: 401,
      }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
}
