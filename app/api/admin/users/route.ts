import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// 1. GET: Fetch All Users (for the Admin Table)
export async function GET() {
  try {
    const prisma = getPrisma();
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        balance: true,
        organization: true
      }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// 2. POST: Top Up Wallet or Change Status
export async function POST(req: Request) {
  try {
    const { userId, action, amount, status } = await req.json();
    const prisma = getPrisma();

    if (action === "TOPUP") {
      // 🟢 Add funds to user wallet
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            balance: { increment: Number(amount) }
        }
      });
      return NextResponse.json({ success: true, newBalance: updatedUser.balance });
    }

    if (action === "STATUS") {
       // 🟢 Ban or Approve user
       await prisma.user.update({
         where: { id: userId },
         data: { status: status }
       });
       return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
