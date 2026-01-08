import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust path to your prisma client
import { getServerSession } from "next-auth";

/**
 * SakuraPay Approval Logic
 * Purpose: Verifies manual payment and initializes node credits.
 */
export async function POST(req: Request) {
  const session = await getServerSession();

  // 1. AUTH GUARD: Only System Admins can credit nodes
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { transactionId } = await req.json();

  try {
    // 2. ATOMIC TRANSACTION: Approve payment + Increment Credits
    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction || transaction.status !== "PENDING") {
        throw new Error("Invalid or already processed transaction.");
      }

      // Update Transaction State
      const updatedTx = await tx.transaction.update({
        where: { id: transactionId },
        data: { 
          status: "APPROVED",
          approvedAt: new Date()
        },
      });

      // Credit the User Node
      const updatedUser = await tx.user.update({
        where: { id: transaction.userId },
        data: { 
          creditBalance: { increment: transaction.creditsAdded }
        },
      });

      return { updatedTx, updatedUser };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
