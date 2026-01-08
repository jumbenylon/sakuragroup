import { NextResponse } from "next/server";
import { prisma } from "@/pay/lib/prisma-client"; 
import crypto from "crypto";

/**
 * SakuraPay SMS-to-Webhook Bridge
 * Purpose: Independent Gateway Automation via SMS Scraping
 */
export async function POST(req: Request) {
  const { bridgeSecret, rawSms } = await req.json();

  // 1. Security Handshake (Check shared secret with Android device)
  if (bridgeSecret !== process.env.BRIDGE_SECURITY_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. REGEX PARSING (The "Scraper" Brain)
  // Pattern: [REF] Confirmed. [AMOUNT] received from [PHONE]
  const mpesaMatch = rawSms.match(/([A-Z0-9]{10,12})\sConfirmed\..*?Tsh([\d,]+).*?from\s(255\d{9})/i);
  
  if (!mpesaMatch) return NextResponse.json({ status: "IGNORED" });

  const reference = mpesaMatch[1].toUpperCase();
  const amount = parseFloat(mpesaMatch[2].replace(/,/g, ''));
  const sender = mpesaMatch[3];

  try {
    // 3. Atomically update or create the payment record
    const payment = await prisma.payment.upsert({
      where: { reference },
      update: { status: "VERIFIED", verifiedAt: new Date() },
      create: {
        reference,
        amount,
        sender,
        provider: "MPESA",
        status: "VERIFIED",
        merchantId: process.env.DEFAULT_MERCHANT_ID || ""
      },
      include: { merchant: true }
    });

    // 4. 🟢 THE BEEM MINDSET: AUTOMATE THE NEXT SESSION (WEBHOOK)
    if (payment.merchant.webhookUrl && !payment.webhookSent) {
      // Create HMAC signature to prevent tampering
      const signature = crypto
        .createHmac("sha256", payment.merchant.apiSecret)
        .update(reference)
        .digest("hex");

      await fetch(payment.merchant.webhookUrl, {
        method: "POST",
        headers: { 
          "X-Sakura-Signature": signature,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ reference, amount, event: "PAYMENT_VERIFIED" })
      });

      // Mark as notified
      await prisma.payment.update({
        where: { id: payment.id },
        data: { webhookSent: true }
      });
    }

    return NextResponse.json({ success: true, ref: reference });
  } catch (e) {
    console.error("SakuraPay Handshake Error:", e);
    return NextResponse.json({ error: "System Lock" }, { status: 500 });
  }
}
