import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    // 2. Argon2 Hashing
    const hashedPassword = await hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    // 3. Create Pending User
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        status: "PENDING",
      },
    });

    // 4. Admin Notifications
    // A. Send SMS to Admin via Beem
    await fetch("https://apisms.beem.africa/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`).toString("base64")}`,
      },
      body: JSON.stringify({
        source_addr: "SAKURA",
        message: `New Reseller Sign-up: ${email}. Please approve at admin portal.`,
        recipients: [{ recipient_id: "1", dest_addr: "255753930000" }],
      }),
    });

    // B. Send Email to Admin via Resend
    await resend.emails.send({
      from: "Sakura System <onboarding@sakuragroup.co.tz>",
      to: "admin@sakuragroup.co.tz",
      subject: "Action Required: New Reseller Pending Approval",
      html: `<p>A new user <strong>${email}</strong> has signed up and is waiting for approval.</p>`,
    });

    return NextResponse.json({ success: true, message: "Account created. Waiting for admin approval." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
