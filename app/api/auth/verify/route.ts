import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;
    
    // 1. The Password (Hardcoded & Trimmed)
    // We trim() both sides to ensure no invisible spaces cause failure
    const submittedPass = (code || "").trim();
    const masterPass = "@Hkgg8886.";

    if (submittedPass === masterPass) {
      
      // 2. Create the Response
      const response = NextResponse.json({ success: true });

      // 3. Force the Cookie onto the Response
      response.cookies.set("axis_session", "verified", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // False on localhost, True on Cloud Run
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 Day
      });

      return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json({ error: "Auth Failed" }, { status: 500 });
  }
}
