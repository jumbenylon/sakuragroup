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

    const [totalUsers, activeSenderIds, stats] = await Promise.all([
      prisma.user.count(),
      prisma.senderId.count({ where: { status: 'APPROVED' } }),
      prisma.messageLog.aggregate({
        _sum: { costToTenant: true, costToAdmin: true }
      })
    ]);

    // Sovereign Math with explicit fallbacks
    const revenue = stats._sum.costToTenant ?? 0;
    const cost = stats._sum.costToAdmin ?? 0;
    const profit = revenue - cost;

    return NextResponse.json({
      totalUsers,
      activeSenderIds,
      financials: { revenue, cost, profit }
    });

  } catch (error) {
    console.error("ANALYTICS_SYNC_ERROR", error);
    return NextResponse.json({ error: "Financial sync failed" }, { status: 500 });
  }
}
