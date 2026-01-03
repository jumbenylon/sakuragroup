import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

/**
 * Axis by Sakura - Sovereign Signup Engine (v2.9)
 * Hardened for Google Cloud Run & Neon Postgres
 */

export async function POST(req: Request) {
  // --- 1. SOVEREIGN SAFETY GUARD ---
  if (!process.env.DATABASE_URL) {
    console.warn("⚠️ Axis Build Guard: Skipping DB operation — DATABASE_URL is undefined.");
    return NextResponse.json(
      { error: "Infrastructure initializing. Please try again shortly." }, 
      { status: 503 }
    );
  }

  try {
    const { email, password, org, isGoogle = false } = await req.json();

    // --- 2. VALIDATION ---
    if (!email || (!password && !isGoogle)) {
      return NextResponse.json({ error: "Missing required credentials" }, { status: 400 });
    }

    // --- 3. IDENTITY COLLISION CHECK ---
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Identity already exists in network" }, { status: 400 });
    }

    // --- 4. SECURE CREDENTIAL MAPPING ---
    let hashedPassword = "GOOGLE_SSO_OAUTH_PROTECTED"; 
    if (password) {
      hashedPassword = await hash(password, {
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      });
    }

    // --- 5. PERSISTENCE ---
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER",
        status: "PENDING",
        balance: 0,
        smsRate: 28,
      },
    });

    // --- 6. RUNTIME NOTIFICATIONS (Lazy Initialized) ---
    
    // CEO Welcome Email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
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

    // Admin SMS Alert via Beem
    if (process.env.BEEM_API_KEY && process.env.BEEM_SECRET) {
      try {
        const beemAuth = Buffer.from(`${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`).toString("base64");
        await fetch("https://apisms.beem.africa/v1/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${beemAuth}`,
          },
          body: JSON.stringify({
            source_addr: "SAKURA",
            message: `Sakura Alert: New Axis Node (${email}) is pending approval.`,
            recipients: [{ recipient_id: "1", dest_addr: "255753930000" }],
          }),
        });
      } catch (e) {
        console.error("Beem Dispatch Error:", e);
      }
    }

    return NextResponse.json({ success: true, message: "Handshake Complete." });

  } catch (error) {
    console.error("Sovereign Engine Error:", error);
    return NextResponse.json({ error: "System synchronization failure" }, { status: 500 });
  }
}
