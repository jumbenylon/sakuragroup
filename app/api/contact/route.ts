export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
// Depth verified: route(0) -> contact(1) -> api(2) -> app(3) -> root(lib/4)
import { getContactIntakeEmailHtml } from "../../../lib/mail-templates";

/**
 * Sakura Unified Gateway v4.9
 * Resolved: SDK Version Alignment (reply_to)
 * Engineered for: Zero-Fail Builds & Functional Purity.
 */
export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Infrastructure initializing." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { 
      name, email, company, message, 
      service, honey, source 
    } = body;

    // 1. Enterprise Validation & Sanitation
    const requiredFields = [name, email, message].map(v => v?.trim());
    if (requiredFields.some(v => !v)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const emailSafe = email.trim().toLowerCase();
    const nameSafe = name.trim();
    const sourceSafe = (source || "general").toLowerCase();
    const messageSafe = message.trim();

    // 2. Format Guard
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailSafe)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    // 3. Traceability
    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;
    const isAxis = sourceSafe === "axis";
    
    // 4. Lazy-Load Resend (Ensures build-safety)
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    
    const serviceLabel = (service || "GENERAL").toUpperCase();
    const targetEmail = isAxis ? "support@sakuragroup.co.tz" : "hello@sakuragroup.co.tz";

    // 5. Secure Transmission (Using SDK-compliant snake_case)
    const { error } = await resend.emails.send({
      from: "Sakura Intake <system@sakuragroup.co.tz>",
      to: [targetEmail],
      reply_to: emailSafe, // VERIFIED: Matches your current SDK version types
      subject: `[${serviceLabel}] New Transmission from ${nameSafe}`,
      html: getContactIntakeEmailHtml({ 
        name: nameSafe, 
        email: emailSafe, 
        company: company?.trim() || "Individual", 
        message: messageSafe, 
        service: serviceLabel.toLowerCase(), 
        txId 
      }),
    });

    if (error) throw error;

    return NextResponse.json({ success: true, txId });

  } catch (error: any) {
    console.error("GATEWAY_CRITICAL_FAILURE:", error.message);
    return NextResponse.json({ error: "TRANSMISSION_FAILED" }, { status: 500 });
  }
}