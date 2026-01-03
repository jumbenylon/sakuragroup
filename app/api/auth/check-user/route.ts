export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Or your session provider
import { authOptions } from "@/lib/auth"; // Adjust to your auth config path

export async function GET(req: Request) {
  if (!process.env.DATABASE_URL) {
     return NextResponse.json({ user: { name: "Guest", balance: 0, role: "USER" } });
  }

  try {
    // 1. Get Session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Lazy Load Prisma
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    // 3. Fetch User Node
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { 
        name: true, 
        organization: true, 
        email: true, 
        balance: true, 
        role: true 
      }
    });

    if (!user) return NextResponse.json({ error: "Node not found" }, { status: 404 });

    // 4. [CRITICAL] Admin vs User Balance Logic
    let finalBalance = user.balance;

    if (user.role === 'ADMIN') {
      // If Admin, fetch REAL balance from Beem
      if (process.env.BEEM_API_KEY && process.env.BEEM_SECRET) {
        try {
          const beemAuth = btoa(`${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`);
          const beemRes = await fetch("https://apisms.beem.africa/public/v1/vendors/balance", {
            headers: {
              "Authorization": `Basic ${beemAuth}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            next: { revalidate: 60 } // Cache for 60s to avoid rate limits
          });
          
          if (beemRes.ok) {
            const beemData = await beemRes.json();
            // Beem returns { data: { credit_balance: number } }
            finalBalance = beemData?.data?.credit_balance ?? user.balance;
          }
        } catch (e) {
          console.error("Beem Balance Sync Failed", e);
          // Fallback to DB balance if API fails
        }
      }
    }

    // 5. Return the contextual identity
    return NextResponse.json({
      user: {
        ...user,
        balance: finalBalance
      }
    });

  } catch (error) {
    console.error("Check-User Error", error);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
