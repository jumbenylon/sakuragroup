import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma"; // Optional: Only if you want to save logs

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recipients, message, senderId } = body;

    // 1. Validation
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: "No recipients provided" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Message is empty" }, { status: 400 });
    }

    // 2. Get Master Credentials
    const apiKey = process.env.BEEM_API_KEY;
    const secretKey = process.env.BEEM_SECRET_KEY;

    if (!apiKey || !secretKey) {
      return NextResponse.json({ error: "Server Configuration Error: Missing API Keys" }, { status: 500 });
    }

    console.log(`[AXIS] Sending SMS to ${recipients.length} contacts...`);

    // 3. Format Payload for Beem
    // Beem expects an array of objects: { recipient_id: number, dest_addr: string }
    const formattedRecipients = recipients.map((r: any, index: number) => ({
      recipient_id: index + 1, // Simple ID for tracking
      dest_addr: r.phone || r // Handle both object {phone: "..."} and string "..."
    }));

    // 4. Fire to Beem (Real API Call)
    const beemResponse = await fetch("https://apisms.beem.africa/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(`${apiKey}:${secretKey}`).toString("base64"),
      },
      body: JSON.stringify({
        source_addr: senderId || "INFO", // Default to INFO if no Sender ID provided
        schedule_time: "",
        encoding: 0,
        message: message,
        recipients: formattedRecipients
      }),
    });

    const beemData = await beemResponse.json();

    // 5. (Optional) Log to Database
    // We try to log, but don't crash if database fails
    try {
        const prisma = getPrisma();
        // We use a generic 'admin' user ID or just log without user relation if simpler
        // For now, we just skip complex logging to ensure sending works.
    } catch (dbError) {
        console.warn("Failed to save log to DB, but SMS was sent.");
    }

    return NextResponse.json({ 
        success: true, 
        data: beemData 
    });

  } catch (error) {
    console.error("SMS Send API Error:", error);
    return NextResponse.json({ error: "Failed to process SMS request" }, { status: 500 });
  }
}
