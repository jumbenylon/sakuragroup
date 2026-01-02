import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SenderStatus, CampaignStatus, MessageStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId, validList, message, senderIdName } = await req.json();

    // 1. Validation & Sanitization
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "EMPTY_MESSAGE_NOT_ALLOWED" }, { status: 400 });
    }

    const rawList: any[] = Array.isArray(validList) ? validList : [];
    const normalized: string[] = rawList
      .map(r => String(r).replace(/\D/g, "").trim())
      .filter(r => r.length >= 10 && r.length <= 15);

    if (normalized.length === 0) {
      return NextResponse.json({ error: "NO_VALID_RECIPIENTS" }, { status: 400 });
    }

    if (normalized.length > 50000) {
      return NextResponse.json({ error: "CAMPAIGN_LIMIT_EXCEEDED" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] ?? "127.0.0.1";
    const ua = req.headers.get("user-agent") ?? "unknown";

    // 2. Atomic Transaction
    const campaign = await prisma.$transaction(async (tx) => {
      const sender = await tx.senderId.findFirst({
        where: { name: senderIdName, userId, status: SenderStatus.APPROVED }
      });
      if (!sender) throw new Error("SENDER_ID_INVALID_OR_NOT_APPROVED");

      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      const segments = Math.max(1, Math.ceil(message.length / 160));
      const messageCost = segments * user.smsRate;
      const totalCost = normalized.length * messageCost;

      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

      return await tx.campaign.create({
        data: {
          userId,
          senderId: sender.id,
          senderName: sender.name,
          status: CampaignStatus.COMMITTED,
          totalRecipients: normalized.length,
          totalSegments: segments,
          totalCost,
          metaIp: ip,
          metaUa: ua,
          messages: {
            createMany: {
              data: normalized.map((recipient: string) => ({
                userId,
                recipient,
                message: message.trim(),
                segmentCount: segments,
                costToTenant: messageCost,
                costToAdmin: segments * 19,
                status: MessageStatus.PENDING,
                senderId: sender.id,
                senderName: sender.name 
              }))
            }
          }
        }
      });
    });

    return NextResponse.json({ 
      success: true, 
      campaignId: campaign.id,
      count: normalized.length 
    });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || "TRANSACTION_FAILED" }, { status: 400 });
  }
}
