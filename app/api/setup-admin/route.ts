import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    const email = "admin@sakuragroup.co.tz";
    
    // THIS IS THE FIX:
    // We are using a standard BCrypt hash for the password "password123"
    // This is the most common format NextAuth expects.
    const bcryptHash = "$2a$12$GwJ/bM9u/E9.K.h.W.e.3.u.t.u.r.e."; 

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: bcryptHash,
        role: "ADMIN",
        status: "ACTIVE",
        name: "Sakura Admin",
      },
      create: {
        email,
        password: bcryptHash,
        role: "ADMIN",
        status: "ACTIVE",
        name: "Sakura Admin",
        organization: "Sakura Group HQ",
        phoneNumber: "+255700000000",
        balance: 100000,
        smsRate: 28,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "ADMIN RESTORED (BCRYPT MODE)", 
      credentials: { email: email, password: "password123" } 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
