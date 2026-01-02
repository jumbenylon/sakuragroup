import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * PHASE 1: PRE-FLIGHT VALIDATION
 * - Ensures Sender ID belongs to User
 * - Normalizes and dedupes phone numbers
 * - Calculates total cost (Tenant) and projected cost (Admin)
 */
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
    
    // Remove all non-numeric characters and trim
    const normalized = rawPhones.map(p => String(p).trim().replace(/\D/g, ""));
    
    // Deduplicate in-memory using a Set (High Performance)
    const uniquePhones = [...new Set(normalized)];

    // Basic length validation for Tanzania/International formats
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
    const adminRate = 19; // Your cost per segment from Beem

    const totalTenantCost = validPhones.length * segments * tenantRate;
    const totalAdminCost = validPhones.length * segments * adminRate;
    const projectedProfit = totalTenantCost - totalAdminCost;

    // 4. Return Data Package
    return NextResponse.json({
      summary: {
        totalProcessed: rawPhones.length,
        validRecipients: validPhones.length,
        duplicatesRemoved: duplicateCount,
        invalidFormats: invalidCount,
        messageSegments: segments,
        totalCost: totalTenantCost, // in minor units
        projectedProfit: projectedProfit,
        currentBalance: user.balance,
        canAfford: user.balance >= totalTenantCost
      },
      cleanList: validPhones,
      senderId: sender.id // Pass back the internal ID for the Confirm step
    });

  } catch (error) {
    console.error("VALIDATION_ENGINE_ERROR:", error);
    return NextResponse.json({ error: "INTERNAL_VALIDATION_FAILURE" }, { status: 500 });
  }
}
