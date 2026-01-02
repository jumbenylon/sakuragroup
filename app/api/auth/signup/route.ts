import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2"; 
import prisma from "@/lib/prisma"; 
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Initialize Resend inside the function (Lazy Loading)
    // The fallback 're_placeholder' prevents the build from crashing
    const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    // 2. Check if user exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });
    
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 3. Argon2 Hashing
    const hashedPassword = await hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });

    // 4. Create Pending User
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

    // 5. Admin Notifications (Silent failures to avoid blocking the response)
    
    // A. SMS Notification via Beem
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
            message: `Sakura Alert: New Reseller Sign-up (${email}). Action required in Admin Portal.`,
            recipients: [{ recipient_id: "1", dest_addr: "255753930000" }],
          }),
        });
      } catch (smsError) {
        console.error("Admin SMS failed during runtime", smsError);
      }
    }

    // B. Email Notification via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder") {
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
