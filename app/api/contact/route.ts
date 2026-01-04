export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";

// Level Check: contact(1) -> api(2) -> app(3) -> root(4)
import { getContactIntakeEmailHtml } from "../../../../lib/mail-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * SAKURA UNIFIED GATEWAY v4.1
 * Replaces both /contact and /contacts logic.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      company, 
      message, 
      service, 
      honey,   // Honeypot field from frontend
      source   // "axis" or "general"
    } = body;

    // 1. SILENT SPAM FILTER (Honeypot)
    if (honey) {
      console.warn("Spam filtered via Honeypot Trap.");
      return NextResponse.json({ success: true, txId: "FILTERED" });
    }

    // 2. GENERATE TRACE ID
    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

    // 3. ROUTING LOGIC
    // If source is 'axis', send to support. Otherwise, send to hello.
    const isAxis = source === "axis";
    const targetEmail = isAxis ? "support@sakuragroup.co.tz" : "hello@sakuragroup.co.tz";
    const subjectLine = isAxis 
      ? `[AXIS SUPPORT] Node Ticket: ${name}` 
      : `[${(service || "GENERAL").toUpperCase()}] New Lead: ${name}`;

    // 4. DISPATCH
    const { data, error } = await resend.emails.send({
      from: "Sakura Systems <system@sakuragroup.co.tz>",
      to: [targetEmail],
      reply_to: email,
      subject: subjectLine,
      html: getContactIntakeEmailHtml({ 
        name, 
        email, 
        company: company || (isAxis ? "Axis Client" : "Individual"), 
        message, 
        service: service || source, 
        txId 
      }),
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw error;
    }

    return NextResponse.json({ success: true, txId });

  } catch (error: any) {
    console.error("GATEWAY ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Transmission Interrupted" }, 
      { status: 500 }
    );
  }
}