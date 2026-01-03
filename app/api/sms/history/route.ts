export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma"; // Use our Sovereign getter

export async function GET(req: Request) {
  // 1. Build Guard
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ logs: [] });
  }

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    const prisma = getPrisma();
    
    // 2. Fetch Logs (Sovereign Data)
    const logs = await prisma.messageLog.findMany({
      orderBy: { sentAt: 'desc' },
      take: limit,
      select: {
        id: true,
        recipient: true,
        content: true,
        status: true,
        costToTenant: true,
        sentAt: true
      }
    });

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("History API Error", error);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
