import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const { userId, tier, topUpAmount, adminId } = await req.json();

    // Atomic Update
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        smsRate: tier === "CORE" ? 28 : tier === "GROWTH" ? 24 : 20,
        balance: {
          increment: topUpAmount || 0
        }
      }
    });

    // LOG: Provisioning Audit Trail
    console.log(`[PROVISION] Admin ${adminId} updated User ${userId}: Tier ${tier}, +${topUpAmount} TZS`);

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: "UPDATE_FAILED" }, { status: 500 });
  }
}
