import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * PHASE 2: ATOMIC CAMPAIGN COMMIT
 * - Re-validates financials on-server
 * - Deducts balance in a transaction
 * - Creates Campaign master and MessageLog batch
 */
export async function POST(req: Request) {
  try {
    const { userId, validList, message, senderIdName } = await req.json();

    // 1. Explicitly Type the cleanList to satisfy Strict Mode
    const cleanList: string[] = Array.isArray(validList)
      ? validList.map((v: any) => String(v).trim())
      : [];

    if (cleanList.length === 0) {
      return NextResponse.json({ error: "EMPTY_RECIPIENT_LIST" }, { status: 400 });
    }

    const campaign = await prisma.$transaction(async (tx) => {
      // 2. Fetch User & Sender (Locking state)
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      const sender = await tx.senderId.findFirst({
        where: { name: senderIdName, userId, status: "APPROVED" }
      });
      if (!sender) throw new Error("SENDER_ID_REVOKED");

      // 3. Re-calculate Financials (Server-Side Authority)
      const segments = Math.max(1, Math.ceil(message.length / 160));
      const messageCost = segments * user.smsRate;
      const totalCost = cleanList.length * messageCost;

      // 4. Balance Guard
      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      // 5. Execute Balance Deduction
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

      // 6. Create Campaign and Batch Message Logs
      const newCampaign = await tx.campaign.create({
        data: {
          userId,
          senderId: sender.id,
          status: "QUEUED",
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
                costToTenant: messageCost,
                costToAdmin: segments * 19,
                status: "PENDING",
                senderId: sender.id
              }))
            }
          }
        }
      });

      return newCampaign;
    });

    return NextResponse.json({ 
      success: true, 
      campaignId: campaign.id,
      deducted: campaign.totalCost 
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "CONFIRMATION_ENGINE_FAILURE";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
