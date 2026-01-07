import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a fresh instance just for this debug to ensure connections work
const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log("----------------------------------------");
  console.log("🔎 DEBUG: API Route Hit!");

  try {
    // 1. Check Payload
    const body = await req.json();
    console.log("🔎 DEBUG: Payload Received:", body);
    
    const { email } = body;
    if (!email) {
       console.log("❌ DEBUG: Missing Email");
       return NextResponse.json({ error: "Email missing" }, { status: 400 });
    }

    // 2. Test Database Connection
    console.log("🔎 DEBUG: Connecting to Database...");
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
        console.log("❌ DEBUG: User NOT FOUND in DB:", email);
        // We return success to hide this from hackers, but logging it for YOU.
        return NextResponse.json({ success: true, message: "Debug: User not found" });
    }
    
    console.log("✅ DEBUG: User Found:", user.id);

    // 3. Update OTP
    console.log("🔎 DEBUG: Generating Code...");
    const otp = "123456"; // Hardcoded for testing
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    console.log("🔎 DEBUG: Saving to DB...");
    await prisma.user.update({
      where: { id: user.id },
      data: { otp, otpExpires: expires }
    });

    console.log("========================================");
    console.log(`🔐 DEBUG OTP FOR ${email}: ${otp}`);
    console.log("========================================");

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("🔥 FATAL ERROR:", error);
    return NextResponse.json({ 
        error: "Server Error", 
        details: error.message 
    }, { status: 500 });
  }
}
