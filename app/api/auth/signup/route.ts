export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

/**
 * Axis by Sakura - Sovereign Signup Engine (v2.11)
 * Fixed: Removed 'organization' to match production Prisma schema.
 */

export async function POST(req: Request) {
  // 1. Build-Time Circuit Breaker
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "SERVICE_OFFLINE_BUILD" }, { status: 503 });
  }

  try {
    const { email, password, org, isGoogle = false } = await req.json();

    // 2. Core Validation
    if (!email || (!password && !isGoogle)) {
      return NextResponse.json({ error: "Missing required credentials" }, { status: 400 });
    }

    // 3. Lazy Import Prisma (Prevents build-time init)
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    // 4. Identity Collision Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Identity already exists" }, { status: 400 });
    }

    // 5. Secure Credential Mapping
    const hashedPassword = isGoogle ? "GOOGLE_SSO_OAUTH_PROTECTED" : await hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    // 6. Persistence (Aligned with current Prisma Schema)
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER",
        status: "PENDING",
        balance: 0,
        smsRate: 28
        // 'organization' field removed to prevent build failure
      },
    });

    // 7. Lazy Notification Dispatch
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Jumbenylon | Sakura <ceo@sakuragroup.co.tz>",
          to: email,
          subject: "Welcome to Axis by Sakura",
          html: getWelcomeEmailHtml(email, isGoogle),
        });
      } catch (e) {
        console.error("Resend Dispatch Error:", e);
      }
    }

    return NextResponse.json({ success: true, message: "Handshake Complete." });

  } catch (error) {
    console.error("Sovereign Engine Error:", error);
    return NextResponse.json({ error: "System synchronization failure" }, { status: 500 });
  }
}
