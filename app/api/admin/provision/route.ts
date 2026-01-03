import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: Number(amount)
        }
      }
    });

    return NextResponse.json({
      success: true,
      newBalance: updatedUser.balance
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "PROVISION_FAILED" },
      { status: 400 }
    );
  }
}
