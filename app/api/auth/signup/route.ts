import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma"; // Updated to use our Singleton
import { Resend } from "resend";

// Initialize Resend with error safety
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // 1. Check if user exists using the singleton instance
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 2. Argon2 Hashing - Premium security configuration
    const hashedPassword = await hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    // 3. Create Pending User
    // Default values from schema (Status: PENDING, Balance: 0) are handled by Neon
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        status: "PENDING",
        role: "USER", // Default role
      },
    });

    // 4. Admin Notifications
    
    // A. Send SMS to Admin via Beem
    // We wrap this in a try/catch or ensure it doesn't block the response
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
          message: `Sakura Alert: New Reseller Sign-up (${email}). Action required in Admin Portal.`,
          recipients: [{ recipient_id: "1", dest_addr: "255753930000" }],
        }),
      });
    } catch (smsError) {
      console.error("Critical: Admin SMS notification failed", smsError);
      // We don't fail the whole request if SMS fails, but we log it.
    }

    // B. Send Email to Admin via Resend
    try {
      await resend.emails.send({
        from: "Sakura System <onboarding@sakuragroup.co.tz>",
        to: "admin@sakuragroup.co.tz",
        subject: "Action Required: New Reseller Pending Approval",
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #db2777;">New Sign-up Alert</h2>
            <p>A new reseller has registered on the Sakura platform:</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>Please log in to the admin panel to review and activate this account.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Critical: Admin Email notification failed", emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Account created successfully. Your access is pending admin approval." 
    });

  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration." }, 
      { status: 500 }
    );
  }
}
