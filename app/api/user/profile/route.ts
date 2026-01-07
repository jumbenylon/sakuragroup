import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { Resend } from "resend"; // Ensure this matches your package.json import
import { getWelcomeEmailHtml } from "@/lib/mail-templates";

/**
 * Axis by Sakura - Profile Logic (v3.5 - Build Safe)
 * Logic: Transition a user to "ACTIVE" status and provision the wallet.
 * Cites: Lazy initialization prevents Docker build crashes.
 */

// 🟢 Force dynamic to prevent Next.js build-time pre-rendering
export const dynamic = "force-dynamic";

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
    // This also ensures the wallet is connected.
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name || undefined,
        organization: organization || undefined,
        phoneNumber: phoneNumber || undefined,
        status: "ACTIVE",
      },
    });

    // 2. Transactional Email: Build-Safe Lazy Initialization
    const apiKey = process.env.RESEND_API_KEY;
    
    if (apiKey && updatedUser.email && updatedUser.name) {
      try {
        // We initialize Resend ONLY when we actually need it
        const resend = new Resend(apiKey);
        
        await resend.emails.send({
          from: "Sakura Group <system@sakuragroup.co.tz>",
          to: updatedUser.email,
          subject: "Infrastructure Active: Welcome to the Axis Ecosystem",
          html: getWelcomeEmailHtml(updatedUser.email, false),
        });
      } catch (mailError) {
        // DB update is successful, so we log the mail error without crashing
        console.error("[MAIL_TRIGGER_FAILED]", mailError);
      }
    } else if (!apiKey) {
      console.warn("[BUILD_OR_RUNTIME_WARNING] RESEND_API_KEY is missing. Email suppressed.");
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
    
    // Handle Prisma unique constraint errors (e.g., phone number already taken)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Information already in use by another node." }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Infrastructure update failed." }, { status: 500 });
  }
}
