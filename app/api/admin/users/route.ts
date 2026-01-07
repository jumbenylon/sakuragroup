export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  // 🟢 OPEN GATES: No Session Check
  // We deleted the authentication block so this route is now public.

  try {
    const prisma = getPrisma();
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true, 
        organization: true,
        role: true,
        status: true,
        balance: true,
        smsRate: true,
        createdAt: true,
        phoneNumber: true,
      }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("ADMIN_FETCH_ERROR", error);
    return NextResponse.json({ error: "System failure" }, { status: 500 });
  }
}
