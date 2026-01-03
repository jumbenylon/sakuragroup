import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma"; // FIXED: Use Singleton
import { SenderStatus, CampaignStatus } from "@prisma/client"; // Enums now exist

export async function POST(req: Request) {
  try {
    // 1. Parse Payload & Validate
    const { name, message, senderIdName, recipients, totalCost, userId } = await req.json();

    if (!name || !message || !senderIdName || !recipients || !totalCost || !userId) {
       // Log what's missing for easier debugging in Cloud Run logs
       console.error("Missing fields:", { name, messageLen: message?.length, senderIdName, recipientsLen: recipients?.length, totalCost, userId });
       return NextResponse.json({ error: "MISSING_REQUIRED_FIELDS" }, { status: 400 });
    }

    const prisma = getPrisma();

    // 2. Atomic Transaction (Validate Sender -> Check Balance -> Deduct -> Create Campaign)
    const campaign = await prisma.$transaction(async (tx) => {
      // [CRITICAL FIX HERE] Changed 'name' to 'senderId' to match schema
      const sender = await tx.senderId.findFirst({
        where: { 
            senderId: senderIdName, // <--- THE FIX
            userId, 
            status: SenderStatus.APPROVED 
        }
      });
      if (!sender) throw new Error("SENDER_ID_INVALID_OR_NOT_APPROVED");

      // Check Balance
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user || user.status !== "ACTIVE") throw new Error("USER_INACTIVE");
      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      // Deduct Balance
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } },
      });

      // Create Campaign Log
      const newCampaign = await tx.campaign.create({
        data: {
          name,
          message,
          status: CampaignStatus.SCHEDULED, // Default to scheduled until dispatched
          userId,
          // In a real scenario, you'd save recipients to a separate related table
          // For now, we assume they are handled by the dispatch engine immediately after this.
        }
      });

      return newCampaign;
    });

    return NextResponse.json({ success: true, campaignId: campaign.id });

  } catch (error: any) {
    console.error("CAMPAIGN_CONFIRM_ERROR:", error.message);
    // Return specific error messages to the UI
    const errorMessage = ["INSUFFICIENT_FUNDS", "SENDER_ID_INVALID_OR_NOT_APPROVED", "USER_INACTIVE"].includes(error.message) 
        ? error.message 
        : "SYSTEM_ERROR";
        
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
