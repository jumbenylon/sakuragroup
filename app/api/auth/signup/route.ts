export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

/**
 * Axis by Sakura - Sovereign Signup Engine (v3.0)
 * Logic: Handles Organisation vs Individual flows.
 * Status: Build-Safe (Matches Schema).
 */
export async function POST(req: Request) {
  // 1. Build-Time Guard (Prevents crashes during Docker build)
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Infrastructure Initializing" }, { status: 503 });
  }

  try {
    // 2. The New "No Secrets" Payload
    const body = await req.json();
    const { 
      type,           // "ORG" or "INDIVIDUAL"
      orgName,        // Required if type is ORG
      fullName,       // Required always
      email,          // Required always
      phone,          // Required always
      password        // Required always
    } = body;

    // 3. Logic Validation
    if (!email || !password || !fullName || !phone) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    
    // Strict Organization Check
    if (type === "ORG" && !orgName) {
      return NextResponse.json({ error: "Organization Name is required." }, { status: 400 });
    }

    // 4. Lazy Import (Prevents 'Missing Env' crash during build)
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    // 5. Duplicate Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 400 });
    }

    // 6. Security Hashing
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // 7. Sovereign Persistence
    // Logic: If Individual, we store the Org Name as "Individual Account" 
    // to keep the dashboard clean.
    const finalOrgName = type === "ORG" ? orgName : "Individual Account";

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: fullName,           // Maps directly to schema
        organization: finalOrgName, // Maps directly to schema
        phoneNumber: phone,       // Maps directly to schema
        role: "USER",
        status: "PENDING",
        balance: 0,
        smsRate: 28
      },
    });

    // 8. Welcome Notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: "Jumbenylon | Sakura <ceo@sakuragroup.co.tz>",
          to: email,
          subject: type === "ORG" ? `Welcome, ${orgName}` : "Welcome to Axis",
          html: getWelcomeEmailHtml(fullName, false),
        });
      } catch (e) { 
        console.error("Email dispatch warning:", e); 
        // We do not fail the request if email fails
      }
    }

    return NextResponse.json({ success: true, message: "Account Created." });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "System failure." }, { status: 500 });
  }
}
