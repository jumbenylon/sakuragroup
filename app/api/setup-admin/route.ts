import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    const email = "admin@sakuragroup.co.tz";
    const password = "Sakura2025!"; // This will be your password

    // 1. Generate the Hash using YOUR System's Exact Parameters
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // 2. Force Update the Admin User
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: "ADMIN",
        status: "ACTIVE", // Crucial: Your auth checks for this
        name: "Sakura Admin",
      },
      create: {
        email,
        password: hashedPassword,
        role: "ADMIN", // Crucial: Your auth checks for this
        status: "ACTIVE",
        name: "Sakura Admin",
        organization: "Sakura Group HQ",
        phoneNumber: "+255753930000",
        balance: 100000,
        smsRate: 28,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "ADMIN RESTORED (ARGON2 MODE)", 
      credentials: { email, password } 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
