import { parseCarrierSMS } from "../../lib/parser";
import { prisma } from "../../lib/prisma"; // Isolated client
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { secret, rawMessage } = await req.json();

  // 1. Security Guard
  if (secret !== process.env.BRIDGE_SECURITY_TOKEN) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Parse Text
  const data = parseCarrierSMS(rawMessage);
  if (!data) return NextResponse.json({ status: "IGNORED" });

  try {
    // 3. Save Payment & Notify Merchant
    const payment = await prisma.payment.upsert({
      where: { reference: data.reference },
      update: {},
      create: {
        amount: data.amount,
        reference: data.reference,
        senderPhone: data.phone,
        status: "VERIFIED",
        merchantId: process.env.AXIS_MERCHANT_ID || ""
      },
      include: { merchant: true }
    });

    // 4. 🟢 THE INDEPENDENT HANDSHAKE (WEBHOOK)
    if (payment.merchant.webhookUrl) {
      const hmac = crypto.createHmac("sha256", payment.merchant.apiSecret);
      const signature = hmac.update(data.reference).digest("hex");

      await fetch(payment.merchant.webhookUrl, {
        method: "POST",
        headers: { "X-Sakura-Signature": signature },
        body: JSON.stringify({ reference: data.reference, amount: data.amount })
      });
    }

    return NextResponse.json({ success: true, ref: data.reference });
  } catch (e) {
    return NextResponse.json({ error: "Database Lock" }, { status: 500 });
  }
}
