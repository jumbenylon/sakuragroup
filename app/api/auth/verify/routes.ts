import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;
    
    // HARDCODED OVERRIDE: We are forcing your password here
    const correctCode = "@Hkgg8886."; 

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
  } catch (error) {
    return NextResponse.json({ error: "Auth Error" }, { status: 500 });
  }
}
