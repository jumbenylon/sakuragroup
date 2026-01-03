import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";

// This file forces the creation of the Admin User using the correct Encryption
export async function GET(req: Request) {
  try {
    // 1. Lazy load Prisma to avoid build errors
    const { getPrisma } = await import('@/lib/prisma');
    const prisma = getPrisma();

    const email = "admin@sakuragroup.co.tz";
    const password = "Sakura2025!"; // This is the password we are setting

    // 2. Generate the Hash using the App's EXACT configuration
    const hashedPassword = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });

    // 3. Upsert (Create or Update) the Admin
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: "ADMIN",
        status: "ACTIVE",
        name: "Sakura Admin",
        organization: "Sakura Group HQ",
        phoneNumber: "+255753930000",
        balance: 100000,
      },
      create: {
        email,
        password: hashedPassword,
        role: "ADMIN",
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
      message: "ADMIN RESTORED", 
      credentials: { email, password } 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
