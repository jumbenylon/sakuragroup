import { NextResponse } from "next/server";
import { Resend } from "resend";
// Direct relative path for build stability
import { getContactIntakeEmailHtml } from "../../../lib/mail-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message, service, honey } = body;

    if (honey) return NextResponse.json({ success: true, txId: "BOT_TRAP" });

    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

    await resend.emails.send({
      from: "Sakura Intake <system@sakuragroup.co.tz>",
      to: ["hello@sakuragroup.co.tz"],
      subject: `[${service.toUpperCase()}] New Lead: ${name}`,
      html: getContactIntakeEmailHtml({ name, email, company, message, service, txId }),
    });

    return NextResponse.json({ success: true, txId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}