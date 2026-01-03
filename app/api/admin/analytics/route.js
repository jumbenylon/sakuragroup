import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Aggregate Financial Data
    const stats = await prisma.messageLog.aggregate({
      _sum: {
        costToTenant: true, // Total Revenue (e.g., 28 TZS per msg)
        costToAdmin: true,  // Total Cost (e.g., 18 TZS per msg)
      },
      _count: {
        id: true // Total Volume
      }
    });

    const revenue = stats._sum.costToTenant || 0;
    const cost = stats._sum.costToAdmin || 0;
    const profit = revenue - cost;

    // 2. Queue Status
    const pendingSenderIds = await prisma.senderId.count({ where: { status: "PENDING" } });

    return NextResponse.json({
      success: true,
      metrics: {
        totalVolume: stats._count.id,
        revenue,
        cost,
        profit,
        margin: revenue > 0 ? ((profit / revenue) * 100).toFixed(2) + "%" : "0%"
      },
      alerts: {
        pendingSenderIds
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
