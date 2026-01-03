export const dynamic = "force-dynamic"; // Ensure dynamic behavior
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { SenderStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { senderIdName, userId, cost } = await req.json();

    if (!senderIdName || !userId || !cost) {
      return NextResponse.json({ valid: false, error: "Missing parameters" }, { status: 400 });
    }

    const prisma = getPrisma();

    // 1. Check Sender ID Validity
    // [FIX] Changed 'name' to 'senderId' to match Schema
    const sender = await prisma.senderId.findFirst({
      where: { 
        senderId: senderIdName, // <--- THE FIX
        userId: userId,
        status: SenderStatus.APPROVED 
      }
    });

    if (!sender) {
      return NextResponse.json({ valid: false, error: "Sender ID not authorized" }, { status: 403 });
    }

    // 2. Check Balance
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || user.status !== "ACTIVE") {
      return NextResponse.json({ valid: false, error: "Account inactive" }, { status: 403 });
    }

    if (user.balance < cost) {
      return NextResponse.json({ valid: false, error: `Insufficient Funds. Balance: ${user.balance}` }, { status: 402 });
    }

    return NextResponse.json({ valid: true });

  } catch (error) {
    console.error("VALIDATION_ERROR", error);
    return NextResponse.json({ valid: false, error: "System Validation Error" }, { status: 500 });
  }
}
