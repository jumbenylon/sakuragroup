import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { phone, message, userId } = await req.json();

    const segments = Math.ceil(message.length / 160);
    const user = await prisma.user.findUnique({ where: { id: userId || "" } });
    const rate = user?.smsRate || 25;

    const beemAuth = Buffer.from(`${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`).toString("base64");
    
    const response = await fetch("https://apisms.beem.africa/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${beemAuth}`,
      },
      body: JSON.stringify({
        source_addr: "SAKURA",
        message: message,
        recipients: [{ recipient_id: "1", dest_addr: phone }],
      }),
    });

    const result = await response.json();

    await prisma.messageLog.create({
      data: {
        userId: userId || null,
        recipient: phone,
        message: message,
        status: response.ok ? "SENT" : "FAILED",
        costToAdmin: 19 * segments,
        costToTenant: rate * segments,
        segmentCount: segments,
        providerId: result.request_id ? String(result.request_id) : null,
      },
    });

    return NextResponse.json({ success: response.ok });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
