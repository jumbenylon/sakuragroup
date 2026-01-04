import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getContactIntakeEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message, service, honey } = body;

    // 1. Honeypot Validation (Bot Protection)
    if (honey) {
      return NextResponse.json({ success: true, txId: "SPAM_DETECTED" });
    }

    // 2. Generate Unique Transmission ID
    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

    // 3. Dispatch Email via Resend
    const { data, error } = await resend.emails.send({
      from: "Sakura Intake <system@sakuragroup.co.tz>",
      to: ["hello@sakuragroup.co.tz"],
      subject: `[${service.toUpperCase()}] New Transmission from ${name}`,
      html: getContactIntakeEmailHtml({ name, email, company, message, service, txId }),
    });

    if (error) throw error;

    return NextResponse.json({ success: true, txId });
  } catch (error: any) {
    console.error("API ERROR:", error.message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}