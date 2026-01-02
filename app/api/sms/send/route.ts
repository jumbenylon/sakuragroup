import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { phone, message, userId } = await req.json();

    // 1. Validation & Pre-computation
    if (!phone || !message || !userId) {
      return NextResponse.json({ error: "MISSING_PAYLOAD" }, { status: 400 });
    }

    const segments = Math.ceil(message.length / 160);

    // 2. Atomic Transaction (Balance Check + Deduction)
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user || user.status !== "ACTIVE") throw new Error("UNAUTHORIZED");
      
      const totalCost = segments * user.smsRate;
      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      // Deduct balance immediately
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } },
      });

      return { userRate: user.smsRate, totalCost };
    });

    // 3. Provider Delivery (Beem)
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

    const providerData = await response.json();

    // 4. Log the result
    await prisma.messageLog.create({
      data: {
        userId,
        recipient: phone,
        message,
        status: response.ok ? "SENT" : "FAILED",
        costToAdmin: 19 * segments,
        costToTenant: result.totalCost,
        segmentCount: segments,
        providerMessageId: providerData.request_id
  ? String(providerData.request_id)
  : null,
      },
    });

    return NextResponse.json({ success: response.ok });

  } catch (error: any) {
    console.error("GATEWAY_ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
