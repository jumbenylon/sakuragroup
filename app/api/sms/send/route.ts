import { NextResponse } from "next/server";
import { sendBeemSMS } from "@/lib/beem";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contacts, message, senderId } = body;

    // 1. Validation
    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json({ error: "No recipients provided." }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Message content is empty." }, { status: 400 });
    }

    // 2. Personalization Detection
    const hasVariables = message.includes("{firstName}") || message.includes("{lastName}");

    // --- STRATEGY A: BULK BROADCAST (No Variables) ---
    // If no variables, we send ONE request with ALL numbers. Fast & Cheap.
    if (!hasVariables) {
        const recipients = contacts.map((c: any) => c.phone);
        const result = await sendBeemSMS({
            recipients,
            message,
            sourceId: senderId,
        });

        if (!result.success) {
            return NextResponse.json({ error: "Gateway Error", details: result.error }, { status: 502 });
        }

        return NextResponse.json({
            success: true,
            info: `Bulk sent to ${recipients.length} contacts`,
            gateway_response: result.data
        });
    }

    // --- STRATEGY B: PERSONALIZED BLAST (Variables Detected) ---
    // We must loop and send unique messages.
    // Note: For production with >10k contacts, this should be a background job.
    // For now (MVP), we use Promise.all with a simple map.
    
    let successCount = 0;
    let failCount = 0;

    // We process in chunks of 50 to avoid overwhelming the Vercel function
    const CHUNK_SIZE = 50;
    
    for (let i = 0; i < contacts.length; i += CHUNK_SIZE) {
        const chunk = contacts.slice(i, i + CHUNK_SIZE);
        
        await Promise.all(chunk.map(async (contact: any) => {
            // Replace variables
            let personalizedMsg = message;
            personalizedMsg = personalizedMsg.replace(/{firstName}/g, contact.firstName || "");
            personalizedMsg = personalizedMsg.replace(/{lastName}/g, contact.lastName || "");
            
            // Clean up double spaces if name was missing
            personalizedMsg = personalizedMsg.replace(/\s+/g, " ").trim();

            const result = await sendBeemSMS({
                recipients: [contact.phone],
                message: personalizedMsg,
                sourceId: senderId,
            });

            if (result.success) successCount++;
            else failCount++;
        }));
    }

    return NextResponse.json({
        success: true,
        info: `Personalized Blast: ${successCount} Sent, ${failCount} Failed`,
        gateway_response: { request_id: `BATCH-${Date.now()}`, message: "Processed" }
    });

  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
