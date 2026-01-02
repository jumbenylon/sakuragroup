import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SenderStatus, CampaignStatus, MessageStatus } from "@prisma/client";

/**
 * PHASE 2: ATOMIC CAMPAIGN COMMIT
 * - Enforces Infrastructure Limits (50k)
 * - Sanitizes Recipients Before Charging
 * - Implements Immutable Ledger Snapshots
 */
export async function POST(req: Request) {
  try {
    const { userId, validList, message, senderIdName } = await req.json();

    // 1. Content Integrity Check
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "EMPTY_MESSAGE_NOT_ALLOWED" }, { status: 400 });
    }

    // 2. Normalization: Filter junk before charging
    const rawList: any[] = Array.isArray(validList) ? validList : [];
    const normalized = rawList
      .map(r => String(r).replace(/\D/g, "").trim())
      .filter(r => r.length >= 10 && r.length <= 15);

    if (normalized.length === 0) {
      return NextResponse.json({ error: "NO_VALID_RECIPIENTS" }, { status: 400 });
    }

    // Defensive infrastructure ceiling
    if (normalized.length > 50000) {
      return NextResponse.json({ error: "CAMPAIGN_SIZE_LIMIT_EXCEEDED" }, { status: 400 });
    }

    // 3. Security Context
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] ?? "127.0.0.1";
    const ua = req.headers.get("user-agent") ?? "unknown";

    const campaign = await prisma.$transaction(async (tx) => {
      // 4. Authorization with Enum Safety
      const sender = await tx.senderId.findFirst({
        where: { name: senderIdName, userId, status: SenderStatus.APPROVED }
      });
      if (!sender) throw new Error("SENDER_ID_INVALID_OR_NOT_APPROVED");

      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      // 5. Financial Computation on CLEAN data
      const segments = Math.max(1, Math.ceil(message.length / 160));
      const messageCost = segments * user.smsRate;
      const totalCost = normalized.length * messageCost;

      if (user.balance < totalCost) throw new Error("INSUFFICIENT_FUNDS");

      // 6. Execute Balance Deduction
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: totalCost } }
      });

      // 7. Create Immutable Campaign Ledger
      return await tx.campaign.create({
        data: {
          userId,
          senderId: sender.id,
          senderName: sender.name, // Immutable Snapshot
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
                costToAdmin: segments * 19, // Admin cost tracking
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
