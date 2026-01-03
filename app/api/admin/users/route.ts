import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch only clients (Users), not other Admins
    const users = await prisma.user.findMany({
      where: {
        role: "USER"
      },
      select: {
        id: true,
        email: true,
        balance: true,
        smsRate: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("FETCH_USERS_ERROR", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
