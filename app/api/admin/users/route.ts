export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth"; // Ensure this path matches where you keep NextAuth options
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  // 1. SECURITY GATE: Check if the requester is an Admin
  // const session = await getServerSession(authOptions);

 // if (!session || session.user.role !== "ADMIN") {
 //   console.warn(`[SECURITY] Unauthorized admin access attempt by ${session?.user?.email || 'Unknown'}`);
//    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }

  try {
    const prisma = getPrisma();
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      // 2. DATA PROTECTION: Only select what is necessary
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
        phoneNumber: true, // Added phone number for admin view
      }
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("ADMIN_FETCH_ERROR", error);
    return NextResponse.json({ error: "System failure" }, { status: 500 });
  }
}
