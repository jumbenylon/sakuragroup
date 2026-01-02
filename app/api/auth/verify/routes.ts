import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { code } = body;
  
  // Check against Environment Variable
  const correctCode = process.env.ADMIN_ACCESS_CODE || "sakura-2026-secure"; // Fallback if env missing

  if (code === correctCode) {
    // Set a cookie to remember the user is logged in
    cookies().set("axis_session", "verified", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 // 24 Hours
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
