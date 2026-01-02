import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, cleanList, message, senderIdName } = await req.json();

    const campaign = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      const sender = await tx.senderId.findFirst({
        where: { name: senderIdName, userId, status: "APPROVED" }
      });
      if (!sender) throw new Error("SENDER_ID_REVOKED");

      const segments = Math.max(1, Math.ceil(message.length / 160));
      const messageCost = segments * user.smsRate;
      const totalCost = cleanList.length * messageCost;

      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

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
              data: cleanList.map((recipient) => ({
                userId,
                recipient: String(recipient),
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
      campaignId: campaign.id 
    });

  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "CONFIRMATION_FAILED" }, 
      { status: 400 }
    );
  }
}
