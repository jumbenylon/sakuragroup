import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { Resend } from "resend";
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

// Initialize Resend with Infrastructure Secret
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Axis by Sakura - Profile Logic (v3.2)
 * Purpose: Transition a user to a "Strong Profile" and trigger Onboarding Mails.
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const prisma = getPrisma();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Authentication Required" }, { status: 401 });
    }

    const body = await req.json();
    const { name, organization, phoneNumber } = body;

    // 1. Database Update: Atomic transaction to set node as ACTIVE
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name || undefined,
        organization: organization || undefined,
        phoneNumber: phoneNumber || undefined,
        status: "ACTIVE",
      },
    });

    // 2. Transactional Email: Trigger the premium Welcome Flow
    // We only send this if the name was successfully captured
    if (updatedUser.email && updatedUser.name) {
      try {
        await resend.emails.send({
          from: "Jumbenylon | Sakura Group <system@sakuragroup.co.tz>",
          to: updatedUser.email,
          subject: "Infrastructure Active: Welcome to the Axis Ecosystem",
          html: getWelcomeEmailHtml(updatedUser.email, false), // false = not just a Google login, but a profile build
        });
      } catch (mailError) {
        // We log the error but don't crash the request; the DB update is more critical
        console.error("[MAIL_TRIGGER_FAILED]", mailError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Node identity updated and verified.",
      user: {
        name: updatedUser.name,
        status: updatedUser.status
      }
    });

  } catch (error: any) {
    console.error("[PROFILE_UPDATE_CRITICAL]", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Information already in use by another node." }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Infrastructure update failed." }, { status: 500 });
  }
}
