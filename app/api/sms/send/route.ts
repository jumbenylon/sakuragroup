import { NextResponse } from "next/server";
import { sendBeemSMS } from "@/lib/beem";
import { prisma } from "@/lib/prisma"; // IMPORT THE DB

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contacts, message, senderId } = body;

    if (!contacts || !contacts.length || !message) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    // 1. CALCULATE COST (Estimated)
    const segments = message.length <= 160 ? 1 : Math.ceil(message.length / 153);
    const costPerSms = 25; 

    // 2. PROCESSING LOOP
    // We process sequentially for safety in this MVP
    let successCount = 0;
    let failCount = 0;

    for (const contact of contacts) {
      // A. Personalize
      let finalText = message;
      if (contact.firstName) finalText = finalText.replace(/{firstName}/g, contact.firstName);
      if (contact.lastName) finalText = finalText.replace(/{lastName}/g, contact.lastName);
      finalText = finalText.replace(/\s+/g, " ").trim();

      // B. Send via Beem
      const result = await sendBeemSMS({
        recipients: [contact.phone],
        message: finalText,
        sourceId: senderId,
      });

      // C. LOG TO DATABASE (The "Flight Recorder")
      await prisma.messageLog.create({
        data: {
          recipient: contact.phone,
          message: finalText,
          status: result.success ? "DELIVERED" : "FAILED",
          cost: result.success ? (segments * costPerSms) : 0,
          segmentCount: segments,
          providerId: (result.success && result.data?.request_id) ? String(result.data.request_id) : null,
          errorCode: result.success ? null : (result.data?.code || 999),
          errorReason: result.success ? null : (result.error || "Unknown Error"),
        }
      });

      if (result.success) successCount++;
      else failCount++;
    }

    return NextResponse.json({
      success: true,
      info: `Processed: ${successCount} Sent, ${failCount} Failed`,
    });

  } catch (error) {
    console.error("API FATAL:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
