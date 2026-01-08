import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

/**
 * SakuraPay Verification Handshake
 * Purpose: Submits a manual payment reference for Admin approval.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { amount, reference, provider, tierName, creditsAdded } = await req.json();

    // 1. Basic Validation
    if (!amount || !reference || !provider) {
      return NextResponse.json({ error: "Missing protocol data" }, { status: 400 });
    }

    // 2. Check for duplicate reference IDs to prevent fraud
    const existingTx = await prisma.transaction.findUnique({
      where: { reference }
    });

    if (existingTx) {
      return NextResponse.json({ error: "Reference ID already submitted" }, { status: 409 });
    }

    // 3. Find the user node
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) return NextResponse.json({ error: "User node not found" }, { status: 404 });

    // 4. Create the Transaction record
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: parseFloat(amount),
        creditsAdded: parseInt(creditsAdded) || 0,
        tierName: tierName || "Manual Topup",
        reference,
        provider,
        status: "PENDING",
      }
    });

    return NextResponse.json({ success: true, transactionId: transaction.id });
  } catch (error: any) {
    console.error("Billing Handshake Error:", error);
    return NextResponse.json({ error: "System failure during handshake" }, { status: 500 });
  }
}
