import { NextResponse } from "next/server";
import { Resend } from "resend";
// Using relative path for absolute build certainty
import { getContactIntakeEmailHtml } from "../../lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message, service, honey } = body;

    // Honeypot Bot Protection
    if (honey) {
      console.warn("Spam detected via honeypot.");
      return NextResponse.json({ success: true, txId: "0000-0000" });
    }

    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

    const { data, error } = await resend.emails.send({
      from: "Sakura Intake <system@sakuragroup.co.tz>",
      to: ["hello@sakuragroup.co.tz"],
      subject: `[${service.toUpperCase()}] New Transmission: ${name}`,
      html: getContactIntakeEmailHtml({ name, email, company, message, service, txId }),
    });

    if (error) {
      console.error("Resend Error:", error);
      throw error;
    }

    return NextResponse.json({ success: true, txId });
  } catch (error: any) {
    console.error("Build-Critical API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}