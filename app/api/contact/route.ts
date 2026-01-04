export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { Resend } from "resend";
// CORRECTED DEPTH: Up 3 levels
import { getContactIntakeEmailHtml } from "../../../lib/mail-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, message, service, honey, source } = body;

    if (honey) return NextResponse.json({ success: true, txId: "FILTERED" });

    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;
    const isAxis = source === "axis";
    const targetEmail = isAxis ? "support@sakuragroup.co.tz" : "hello@sakuragroup.co.tz";

    const { error } = await resend.emails.send({
      from: "Sakura Systems <system@sakuragroup.co.tz>",
      to: [targetEmail],
      reply_to: email,
      subject: `[${(service || "GENERAL").toUpperCase()}] New Lead: ${name}`,
      html: getContactIntakeEmailHtml({ name, email, company, message, service, txId }),
    });

    if (error) throw error;
    return NextResponse.json({ success: true, txId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}