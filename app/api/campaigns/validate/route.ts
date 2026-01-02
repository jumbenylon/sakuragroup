import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, phoneList, message, senderIdName } = await req.json();

    // 1. Authorization: Verify Sender ID is approved and owned by this user
    const sender = await prisma.senderId.findFirst({
      where: { 
        name: senderIdName, 
        userId: userId, 
        status: "APPROVED" 
      }
    });

    if (!sender) {
      return NextResponse.json(
        { error: "SENDER_ID_NOT_AUTHORIZED_OR_PENDING" }, 
        { status: 403 }
      );
    }

    // 2. Intelligence: Normalize, Deduplicate, and Filter
    const rawPhones = Array.isArray(phoneList) ? phoneList : [];
    
    const normalized = rawPhones.map(p => String(p).trim().replace(/\D/g, ""));
    
    // REPLACEMENT: Array.from(new Set()) for maximum build compatibility
    const uniquePhones = Array.from(new Set(normalized));

    const validPhones = uniquePhones.filter(p => p.length >= 10 && p.length <= 15);
    
    const duplicateCount = rawPhones.length - uniquePhones.length;
    const invalidCount = uniquePhones.length - validPhones.length;

    // 3. Financial Computation
    const segments = Math.max(1, Math.ceil(message.length / 160));

    const user = await prisma.user.findUnique({ 
      where: { id: userId },
      select: { balance: true, smsRate: true } 
    });

    if (!user) {
      return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
    }

    const tenantRate = user.smsRate; 
    const adminRate = 19; 

    const totalTenantCost = validPhones.length * segments * tenantRate;
    const totalAdminCost = validPhones.length * segments * adminRate;
    const projectedProfit = totalTenantCost - totalAdminCost;

    return NextResponse.json({
      summary: {
        totalProcessed: rawPhones.length,
        validRecipients: validPhones.length,
        duplicatesRemoved: duplicateCount,
        invalidFormats: invalidCount,
        messageSegments: segments,
        totalCost: totalTenantCost, 
        projectedProfit: projectedProfit,
        currentBalance: user.balance,
        canAfford: user.balance >= totalTenantCost
      },
      cleanList: validPhones,
      senderId: sender.id 
    });

  } catch (error) {
    return NextResponse.json({ error: "INTERNAL_VALIDATION_FAILURE" }, { status: 500 });
  }
}
