import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

/**
 * Axis by Sakura - Secure Signup Engine (v2.8)
 * Optimized for Cloud Run Build & Runtime Decoupling
 */

export async function POST(req: Request) {
  try {
    const { email, password, org, isGoogle = false } = await req.json();

    // 1. Core Validation
    if (!email || (!password && !isGoogle)) {
      return NextResponse.json({ error: "Missing required credentials" }, { status: 400 });
    }

    // 2. Identity Collision Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Identity already exists" }, { status: 400 });
    }

    // 3. Password Logic (Satisfying Prisma String requirement)
    let hashedPassword = "GOOGLE_SSO_OAUTH_PROTECTED"; 
    if (password) {
      hashedPassword = await hash(password, {
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      });
    }

    // 4. Persistence
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

    // 5. DECOUPLED NOTIFICATIONS (Initialized only at Runtime)
    
    // Resend Initialization (CEO Welcome Email)
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
        console.error("Resend Runtime Error:", e);
      }
    }

    // Beem Initialization (Admin Alert)
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
            message: `New Axis Node (${email}) pending approval.`,
            recipients: [{ recipient_id: "1", dest_addr: "255753930000" }],
          }),
        });
      } catch (e) {
        console.error("Beem Runtime Error:", e);
      }
    }

    return NextResponse.json({ success: true, message: "Handshake Complete." });
  } catch (error) {
    console.error("Critical Signup Error:", error);
    return NextResponse.json({ error: "System synchronization failure" }, { status: 500 });
  }
}
