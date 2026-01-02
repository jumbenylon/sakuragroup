import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApprovalStatus, CampaignStatus, MessageStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId, validList, message, senderIdName } = await req.json();

    // 1. Content & Type Guard
    const cleanList: string[] = Array.isArray(validList)
      ? validList.map((v: any) => String(v).trim())
      : [];

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "EMPTY_MESSAGE_NOT_ALLOWED" }, { status: 400 });
    }

    const campaign = await prisma.$transaction(async (tx) => {
      // 2. Authorization with STRICT Enum Check
      const sender = await tx.senderId.findFirst({
        where: { 
          name: senderIdName, 
          userId, 
          status: ApprovalStatus.APPROVED // Replaces raw string "APPROVED"
        }
      });

      if (!sender) throw new Error("SENDER_ID_INVALID_OR_NOT_APPROVED");

      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      // 3. Financials
      const segments = Math.max(1, Math.ceil(message.length / 160));
      const messageCost = segments * user.smsRate;
      const totalCost = cleanList.length * messageCost;

      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      // 4. Atomic Commit
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

      return await tx.campaign.create({
        data: {
          userId,
          senderId: sender.id,
          senderName: sender.name,
          status: CampaignStatus.COMMITTED, // Use Enum
          totalRecipients: cleanList.length,
          totalSegments: segments,
          totalCost,
          messages: {
            createMany: {
              data: cleanList.map((recipient: string) => ({
                userId,
                recipient,
                message: message.trim(),
                segmentCount: segments,
                costToTenant: messageCost,
                costToAdmin: segments * 19,
                status: MessageStatus.PENDING, // Use Enum
                senderId: sender.id,
                senderName: sender.name 
              }))
            }
          }
        }
      });
    });

    return NextResponse.json({ success: true, campaignId: campaign.id });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || "CONFIRM_FAILED" }, { status: 400 });
  }
}
