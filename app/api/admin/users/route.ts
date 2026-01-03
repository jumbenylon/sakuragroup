export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "SERVICE_OFFLINE_BUILD" }, { status: 503 });
  }

  try {
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        balance: true,
        smsRate: true,
        createdAt: true,
        // organization removed to prevent Prisma runtime error
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("ADMIN_FETCH_ERROR", error);
    return NextResponse.json({ error: "Identity sync failure" }, { status: 500 });
  }
}
