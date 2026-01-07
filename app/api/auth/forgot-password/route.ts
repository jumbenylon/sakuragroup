import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const prisma = getPrisma();

    // 1. Find user
    const user = await prisma.user.findUnique({ where: { email } });

    // If user doesn't exist, we still return success (Security: don't reveal who is a member)
    if (!user) return NextResponse.json({ success: true });

    // 2. Generate Reset Token
    const token = crypto.randomBytes(32).toString("hex");
    
    // 3. Save to DB (Ideally you'd have a 'resetToken' column, but for now we log it)
    // For a real app, you would save this token to a 'PasswordReset' table.
    
    // 4. "Send" Email (Print to Console)
    console.log("==================================================");
    console.log(`🔑 PASSWORD RESET REQUEST FOR: ${email}`);
    console.log(`🔗 LINK: https://axis.sakuragroup.co.tz/axis/reset?token=${token}`);
    console.log("==================================================");

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
