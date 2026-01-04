import { NextResponse } from "next/server";
// In production, use: import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, email, company, message, service } = await req.json();
    const txId = `SAK-${Math.random().toString(36).toUpperCase().substring(2, 10)}`;

    // Define colors based on service for the template
    const colorMap: Record<string, string> = {
      logistics: "#EAB308", // Yellow
      agency: "#F97316",    // Orange
      roofcleaning: "#10B981", // Emerald
      general: "#64748B"    // Slate
    };

    const serviceColor = colorMap[service] || colorMap.general;

    // TODO: Integration with Resend or Nodemailer
    // const res = await resend.emails.send({
    //   from: 'Sakura Systems <system@sakuragroup.co.tz>',
    //   to: 'hello@sakuragroup.co.tz',
    //   subject: `[${service.toUpperCase()}] New Lead: ${name}`,
    //   html: template.replace('{{NAME}}', name)...
    // });

    return NextResponse.json({ success: true, txId });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}