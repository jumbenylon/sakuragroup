export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
// Depth verified: route(0) -> contact(1) -> api(2) -> app(3) -> root(lib/4)
import { getContactIntakeEmailHtml } from "../../../lib/mail-templates";

/**
 * Sakura Unified Gateway v4.8
 * Engineered for: Enterprise-Clean Validation, Observability, and Zero-Fail Builds.
 */
export async function POST(req: Request) {
  // 1. Build-Time Safety Gate
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[RUNTIME] RESEND_API_KEY missing. Mail suppressed.");
    return NextResponse.json(
      { error: "Infrastructure initializing. Please try again." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { 
      name, email, company, message, 
      service, honey, source 
    } = body;

    // 2. Whitespace Sanitation & Initial Validation
    const requiredFields = [name, email, message].map(v => v?.trim());
    if (requiredFields.some(v => !v)) {
      return NextResponse.json(
        { error: "Required fields (Name, Email, Message) are missing or whitespace-only." },
        { status: 400 }
      );
    }

    // 3. Enterprise Hardening: Data Normalization
    const emailSafe = email.trim().toLowerCase();
    const nameSafe = name.trim();
    const sourceSafe = (source || "general").toLowerCase(); // Case-insensitive
    const messageSafe = message.trim();

    // 4. Input Guards: Format & Length
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailSafe)) {
      return NextResponse.json({ error: "Syntactically invalid email format." }, { status: 400 });
    }

    if (messageSafe.length > 5000) {
      return NextResponse.json({ error: "Message exceeds allowed capacity (5000 chars)." }, { status: 400 });
    }

    // 5. Traceability & Observability
    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;
    const isAxis = sourceSafe === "axis";
    
    console.log("GATEWAY_INTAKE", { txId, source: sourceSafe, service: service || "direct" });

    // 6. Bot-Trap (Honeypot)
    if (honey) {
      console.warn(`Spam signature detected in TX: ${txId}`);
      return NextResponse.json({ success: true, txId: `${txId}-V` });
    }

    // 7. Lazy-Load Resend SDK
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    
    // 8. Department Routing Normalization
    const serviceLabel = (service || "GENERAL").toUpperCase();
    const targetEmail = isAxis ? "support@sakuragroup.co.tz" : "hello@sakuragroup.co.tz";
    const subjectPrefix = isAxis ? "[AXIS]" : `[${serviceLabel}]`;

    // 9. Secure Transmission
    const { error } = await resend.emails.send({
      from: "Sakura Intake <system@sakuragroup.co.tz>",
      to: [targetEmail],
      replyTo: emailSafe, 
      subject: `${subjectPrefix} New Transmission from ${nameSafe}`,
      html: getContactIntakeEmailHtml({ 
        name: nameSafe, 
        email: emailSafe, 
        company: company?.trim() || "Individual", 
        message: messageSafe, 
        service: serviceLabel.toLowerCase(), 
        txId 
      }),
    });

    if (error) {
      console.error(`Resend SDK Dispatch Error [TX: ${txId}]:`, error);
      throw new Error("MAIL_DISPATCH_FAILED");
    }

    return NextResponse.json({ success: true, txId });

  } catch (error: any) {
    console.error("SOVEREIGN_GATEWAY_CRITICAL:", error.message);
    return NextResponse.json(
      { error: "TRANSMISSION_INTERRUPTED" },
      { status: 500 }
    );
  }
}