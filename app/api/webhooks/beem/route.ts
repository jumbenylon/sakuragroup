import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { MessageStatus } from "@prisma/client";

// Your secret token from the URL you pasted (kept for continuity)
const SECURITY_TOKEN = "ZGJiOGNlNjNjYzdiZDNlZmI1ZDBiOWNjZDQyYTYyNDkxNWY3MWM2OGU2ODNhYTQ5MGQxYWI2ZDY2ODczYzRlYw==";

export async function POST(req: Request) {
  try {
    // 1. Security Check: Verify the Token in URL
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (token !== SECURITY_TOKEN) {
      return NextResponse.json({ error: "Unauthorized: Invalid Token" }, { status: 401 });
    }

    // 2. Parse Beem's Payload
    // Beem sends: { request_id: "...", status_id: 1, status_desc: "DELIVERED", ... }
    const body = await req.json();
    const { request_id, status_desc, dest_addr } = body;

    console.log("BEEM_WEBHOOK_RECEIVED:", { request_id, status_desc, dest_addr });

    if (!request_id) {
        return NextResponse.json({ error: "Invalid Payload" }, { status: 400 });
    }

    // 3. Map Beem Status to Our Enum
    let newStatus: MessageStatus = "PENDING";
    
    // Beem statuses: "DELIVERED", "DELIVERY FAILED", "SENT", "SUBMITTED"
    const statusUpper = status_desc?.toUpperCase() || "";

    if (statusUpper.includes("DELIVERED")) {
        newStatus = "DELIVERED";
    } else if (statusUpper.includes("FAILED") || statusUpper.includes("REJECTED")) {
        newStatus = "FAILED";
    } else if (statusUpper.includes("SENT") || statusUpper.includes("SUBMITTED")) {
        newStatus = "SENT";
    } else {
        // If unknown status, just return success so Beem stops retrying
        return NextResponse.json({ received: true });
    }

    // 4. Update Database
    const prisma = getPrisma();
    
    // We search by providerMessageId (which we saved during send)
    // Note: We updateMany just in case of duplicates, though ID should be unique
    const updated = await prisma.messageLog.updateMany({
        where: { 
            providerMessageId: String(request_id),
            // Optional: Match recipient too for extra safety
            // recipient: dest_addr 
        },
        data: {
            status: newStatus
        }
    });

    if (updated.count === 0) {
        console.warn("BEEM_WEBHOOK_MISMATCH: Log not found for ID", request_id);
    }

    return NextResponse.json({ success: true, updated: updated.count });

  } catch (error) {
    console.error("WEBHOOK_ERROR", error);
    // Always return 200 to Beem, otherwise they will keep retrying and spamming you
    return NextResponse.json({ received: true, error: "Internal Error" }, { status: 200 });
  }
}
