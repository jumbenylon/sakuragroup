export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
// DIRECT RELATIVE PATH: Bypasses Alias resolution issues in Docker
import { getWelcomeEmailHtml } from "../../../lib/mail-templates";

/**
 * Axis by Sakura - Sovereign Signup Engine (v3.1)
 * Optimized for: Linux Docker Casing & Absolute Module Resolution.
 */
export async function POST(req: Request) {
  // 1. Build-Time Guard
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Infrastructure Initializing" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { 
      type,           // "ORG" or "INDIVIDUAL"
      orgName,        // Required if type is ORG
      fullName,       // User's name
      email,          
      phone,          
      password        
    } = body;

    // 2. Structural Validation
    if (!email || !password || !fullName || !phone) {
      return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
    }
    
    if (type === "ORG" && !orgName) {
      return NextResponse.json({ error: "Organization Name is mandatory for ORG accounts." }, { status: 400 });
    }

    // 3. Lazy Prisma Initialization (Ensures build-safety)
    const { getPrisma } = await import('../../../lib/prisma');
    const prisma = getPrisma();

    // 4. Identity Collision Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "This email node is already active." }, { status: 400 });
    }

    // 5. High-Entropy Security Hashing
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // 6. Organization Normalization
    const finalOrgName = type === "ORG" ? orgName : "Individual Account";

    // 7. Data Persistence
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: fullName,
        organization: finalOrgName,
        phoneNumber: phone,
        role: "USER",
        status: "PENDING",
        balance: 0,
        smsRate: 28
      },
    });

    // 8. CEO Welcome Protocol
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
        // Log warning but don't break the signup flow
        console.error("Non-critical notification failure:", emailError); 
      }
    }

    return NextResponse.json({ success: true, message: "Node Provisioned Successfully." });

  } catch (error: any) {
    console.error("Sovereign Signup Failure:", error);
    return NextResponse.json({ error: "System-level transmission failure." }, { status: 500 });
  }
}