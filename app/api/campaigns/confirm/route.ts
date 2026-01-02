import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, cleanList, message, senderIdName } = await req.json();

    const campaign = await prisma.$transaction(async (tx) => {
      // 1. Fetch User & Sender (Locking the state for the transaction)
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      const sender = await tx.senderId.findFirst({
        where: { name: senderIdName, userId, status: "APPROVED" }
      });
      if (!sender) throw new Error("SENDER_ID_REVOKED");

      // 2. Re-calculate Financials (Server-Side Authority)
      const segments = Math.max(1, Math.ceil(message.length / 160));
      const ratePerSegment = user.smsRate;
      const adminRatePerSegment = 19; // Your cost
      
      const messageCost = segments * ratePerSegment;
      const totalCost = cleanList.length * messageCost;

      // 3. Balance Check
      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      // 4. Execute Balance Deduction
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

      // 5. Create Campaign & Message Logs (The Atomic Commit)
      const newCampaign = await tx.campaign.create({
        data: {
          userId,
          senderId: sender.id,
          status: "QUEUED", // Initial state for worker pickup
          totalRecipients: cleanList.length,
          totalSegments: segments,
          totalCost,
          messages: {
            createMany: {
              data: cleanList.map((recipient: string) => ({
                userId,
                recipient,
                message,
                segmentCount: segments,
                costToTenant: messageCost, // Total for this message
                costToAdmin: segments * adminRatePerSegment, // Tracking your margin
                status: "PENDING",
                senderId: sender.id
              }))
            }
          }
        }
      });

      return newCampaign;
    });

    // Success Response
    return NextResponse.json({ 
      success: true, 
      campaignId: campaign.id,
      deducted: campaign.totalCost 
    });

  } catch (err: any) {
    console.error("TRANSACTION_FAILED:", err.message);
    return NextResponse.json(
      { error: err.message ?? "CONFIRMATION_ENGINE_FAILURE" }, 
      { status: 400 }
    );
  }
}
