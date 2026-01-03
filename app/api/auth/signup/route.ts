export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "SERVICE_OFFLINE_BUILD" }, { status: 503 });
  }

  try {
    const { email, password, org, isGoogle = false } = await req.json();

    // Lazy Import Prisma
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ error: "Identity exists" }, { status: 400 });

    const hashedPassword = isGoogle ? "GOOGLE_SSO_OAUTH_PROTECTED" : await hash(password);

    await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        organization: org || "Independent Node",
        status: "PENDING", 
        role: "USER",
        smsRate: 28 
      }
    });

    // Lazy Resend Dispatch
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
      } catch (e) { console.error("Resend Error", e); }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Sync Failure" }, { status: 500 });
  }
}
