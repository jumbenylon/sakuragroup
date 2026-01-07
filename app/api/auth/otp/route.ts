import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const prisma = getPrisma();
    
    // 1. Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // SECURITY: Don't reveal user existence. Fake success.
      return NextResponse.json({ success: true });
    }

    // 2. Generate 6-Digit Code
    const otp = crypto.randomInt(100000, 999999).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 Minutes

    // 3. Save to DB
    await prisma.user.update({
      where: { email },
      data: { 
        otp,
        otpExpires: expires
      }
    });

    // 4. SEND THE CODE
    // 🟡 TODO: Integrate Postmark/Resend here for real email.
    // 🟢 FOR NOW: Log to console so you can copy-paste it.
    console.log("==================================================");
    console.log(`🔐 LOGIN OTP FOR ${email}: ${otp}`);
    console.log("==================================================");

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
