export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from "next/server";

const ALLOWED_STATUS = ["ACTIVE", "PENDING", "SUSPENDED"];
const ALLOWED_ROLES = ["USER", "ADMIN"];

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "SERVICE_OFFLINE_BUILD" }, { status: 503 });
  }

  try {
    const { userId, status, role, smsRate } = await req.json();

    // 1. Validation Guards
    if (!userId) return NextResponse.json({ error: "Node ID Required" }, { status: 400 });
    if (status && !ALLOWED_STATUS.includes(status)) return NextResponse.json({ error: "INVALID_STATUS" }, { status: 400 });
    if (role && !ALLOWED_ROLES.includes(role)) return NextResponse.json({ error: "INVALID_ROLE" }, { status: 400 });

    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    // 2. Atomic Update
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: status || undefined,
        role: role || undefined,
        smsRate: smsRate !== undefined ? Number(smsRate) : undefined,
      }
    });

    if (!updatedUser) return NextResponse.json({ error: "Node not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: `Node ${updatedUser.email} provisioned.` });

  } catch (error) {
    console.error("PROVISIONING_ERROR", error);
    return NextResponse.json({ error: "State transition failed" }, { status: 500 });
  }
}
