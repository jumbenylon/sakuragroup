import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Axis by Sakura - Unified Signup & Onboarding Engine
 * Author: Jumbenylon (CEO)
 */

export async function POST(req: Request) {
  try {
    const { email, password, org, isGoogle = false } = await req.json();

    // 1. Validation
    if (!email || (!password && !isGoogle)) {
      return NextResponse.json({ error: "Missing required credentials" }, { status: 400 });
    }

    // 2. Duplicate Prevention
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Identity already exists in ecosystem" }, { status: 400 });
    }

    // 3. Secure Credential Processing
    let hashedPassword = null;
    if (password) {
      hashedPassword = await hash(password, {
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      });
    }

    // 4. Database Persistence
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        organization: org || "Independent Node",
        status: "PENDING",
        role: "USER",
        balance: 0,
        smsRate: 28, // Default CORE Tier
      },
    });

    // 5. Admin Alert (Beem SMS)
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
        console.error("SMS Alert Failed", e);
      }
    }

    // 6. CEO Welcome Email (Resend)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Jumbenylon | Sakura <ceo@sakuragroup.co.tz>",
          to: email,
          subject: "Welcome to Axis by Sakura",
          html: getWelcomeEmailHtml(email, isGoogle),
        });
      } catch (emailError) {
        console.error("CEO Welcome Email Failed", emailError);
      }
    }

    return NextResponse.json({ success: true, message: "Onboarding initialized." });
  } catch (error) {
    console.error("Critical Signup Error:", error);
    return NextResponse.json({ error: "Internal System Error" }, { status: 500 });
  }
}
