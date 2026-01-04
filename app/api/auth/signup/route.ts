export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
// Level Check: signup(0) -> auth(1) -> api(2) -> app(3) -> root(lib/4)
import { getWelcomeEmailHtml } from "../../../../lib/mail-templates";

/**
 * Axis by Sakura - Sovereign Signup Engine (v3.3)
 * Optimized for: Variable Accuracy and Module Resolution.
 */
export async function POST(req: Request) {
  // Infrastructure Guard
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Infrastructure Initializing" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { 
      email, 
      password, 
      fullName, 
      phone,      // Captured correctly from body
      type, 
      orgName 
    } = body;

    // 1. Logic Validation
    if (!email || !password || !fullName || !phone) {
      return NextResponse.json({ error: "Required fields (Email, Password, Name, Phone) missing." }, { status: 400 });
    }

    // 2. Lazy Import Prisma (Up 4 levels)
    const { getPrisma } = await import('../../../../lib/prisma');
    const prisma = getPrisma();

    // 3. Identity Collision Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "This email node is already active." }, { status: 400 });
    }

    // 4. Security Hashing
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // 5. Organization Normalization
    const finalOrgName = type === "ORG" ? orgName : "Individual Account";

    // 6. Data Persistence (Sovereign Node Creation)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: fullName,
        organization: finalOrgName,
        phoneNumber: phone, // Now correctly mapped from captured 'phone' variable
        role: "USER",
        status: "PENDING",
        balance: 0,
        smsRate: 28
      },
    });

    // 7. CEO Welcome Protocol
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: "Jumbenylon | Sakura <ceo@sakuragroup.co.tz>",
          to: email,
          subject: type === "ORG" ? `Provisioning: ${orgName}` : "Axis Node Activation",
          html: getWelcomeEmailHtml(fullName, false),
        });
      } catch (emailError) { 
        console.error("Non-critical notification failure:", emailError); 
      }
    }

    return NextResponse.json({ success: true, message: "Node Provisioned." });
  } catch (e: any) {
    console.error("Signup System Error:", e.message);
    return NextResponse.json({ error: "System failure during node provisioning." }, { status: 500 });
  }
}