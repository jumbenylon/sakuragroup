import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * PHASE 2: ATOMIC CAMPAIGN COMMIT (Production Gold Standard)
 * - Sanitizes recipients & filters junk
 * - Prevents empty message billing
 * - Executes immutable ledger transaction
 */
export async function POST(req: Request) {
  try {
    const { userId, validList, message, senderIdName } = await req.json();

    // 1. Content Guard: Prevent empty billing
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "EMPTY_MESSAGE_NOT_ALLOWED" }, { status: 400 });
    }

    // 2. Recipient Normalization: Only pay for what can be sent
    const rawList: any[] = Array.isArray(validList) ? validList : [];
    const normalized = rawList
      .map(r => String(r).replace(/\D/g, "").trim())
      .filter(r => r.length >= 10 && r.length <= 15);

    if (normalized.length === 0) {
      return NextResponse.json({ error: "NO_VALID_RECIPIENTS_FOUND" }, { status: 400 });
    }

    // Defensive infrastructure ceiling
    if (normalized.length > 50000) {
      return NextResponse.json({ error: "LIMIT_EXCEEDED: MAX_50K" }, { status: 400 });
    }

    // 3. Metadata for Audit
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] ?? "127.0.0.1";
    const ua = req.headers.get("user-agent") ?? "unknown";

    const campaign = await prisma.$transaction(async (tx) => {
      // 4. Verification
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error("USER_NOT_FOUND");

      const sender = await tx.senderId.findFirst({
        where: { name: senderIdName, userId, status: "APPROVED" }
      });
      if (!sender) throw new Error("SENDER_ID_INVALID_OR_REVOKED");

      // 5. Financial Computation based on CLEAN data
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
      const newCampaign = await tx.campaign.create({
        data: {
          userId,
          senderId: sender.id,
          senderName: sender.name, 
          status: "COMMITTED",
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
                status: "PENDING",
                senderId: sender.id,
                senderName: sender.name 
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
      finalCost: campaign.totalCost,
      count: normalized.length
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : "TRANSACTION_FAILURE";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
