import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

/**
 * Signup API — creates a pending user and notifies admins.
 *
 * Design intent:
 * - Avoid build-time crashes by deferring any service initialization
 *   (Resend, Beem) until runtime inside the handler.
 * - Fail "softly" on outbound notifications so user signup is never blocked.
 * - Perform explicit validation + clear status responses.
 */

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // ---------- Input Validation ----------
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // ---------- User Existence Check ----------
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // ---------- Secure Password Hashing ----------
    const hashedPassword = await hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    // ---------- Create Pending User ----------
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        status: "PENDING",
        role: "USER",
        balance: 0,
        smsRate: 25,
      },
    });

    // ============================================================
    //  Admin Notifications — Runtime-Only, Non-Blocking
    // ============================================================

    // ---------- A) SMS Notification via Beem ----------
    if (process.env.BEEM_API_KEY && process.env.BEEM_SECRET) {
      try {
        const beemAuth = Buffer.from(
          `${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`
        ).toString("base64");

        await fetch("https://apisms.beem.africa/v1/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${beemAuth}`,
          },
          body: JSON.stringify({
            source_addr: "SAKURA",
            message: `Sakura Alert: New Reseller Sign-up (${email}). Action required in Admin Portal.`,
            recipients: [{ recipient_id: "1", dest_addr: "255753930000" }],
          }),
        });
      } catch (smsError) {
        // Intent: log diagnostics but never block user success path
        console.error("Admin SMS failed during runtime", smsError);
      }
    }

    // ---------- B) Email Notification via Resend ----------
    // Lazy initialization — only instantiate if a real key is present.
    const resend =
      process.env.RESEND_API_KEY
        ? new Resend(process.env.RESEND_API_KEY)
        : null;

    if (resend) {
      try {
        await resend.emails.send({
          from: "Sakura System <onboarding@sakuragroup.co.tz>",
          to: "admin@sakuragroup.co.tz",
          subject: "Action Required: New Reseller Pending Approval",
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #f9f9f9; border-radius: 8px;">
              <h2 style="color: #db2777;">New Sign-up Alert</h2>
              <p>A new reseller has registered on the Sakura platform:</p>
              <p style="background: #fff; padding: 10px; border: 1px solid #eee;"><strong>Email:</strong> ${email}</p>
              <p>Please log in to the admin panel to review and activate this account.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Admin Email failed during runtime", emailError);
      }
    }

    // ---------- Success Response ----------
    return NextResponse.json({
      success: true,
      message:
        "Account created successfully. Your access is pending admin approval.",
    });
  } catch (error) {
    // Intent: do not leak internals to clients, but log for ops visibility
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration." },
      { status: 500 }
    );
  }
}
