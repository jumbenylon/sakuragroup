import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, password, org, isGoogle = false } = await req.json();

    if (!email || (!password && !isGoogle)) {
      return NextResponse.json({ error: "Missing required credentials" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Identity already exists" }, { status: 400 });
    }

    // FIX: Default to a placeholder for SSO users to satisfy Prisma's String requirement
    let hashedPassword = "GOOGLE_SSO_OAUTH_PROTECTED"; 
    
    if (password) {
      hashedPassword = await hash(password, {
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // TypeScript now sees this as a guaranteed string
        role: "USER",
        status: "PENDING",
        balance: 0,
        smsRate: 28,
      },
    });

    // Notify Admin via Beem (if keys exist)
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
      } catch (e) { console.error("Beem Failed", e); }
    }

    // Welcome Email via Resend (if key exists)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Jumbenylon | Sakura <ceo@sakuragroup.co.tz>",
          to: email,
          subject: "Welcome to Axis by Sakura",
          html: getWelcomeEmailHtml(email, isGoogle),
        });
      } catch (e) { console.error("Resend Failed", e); }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
