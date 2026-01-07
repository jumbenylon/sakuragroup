import { NextResponse } from "next/server";
import { hash } from "@node-rs/argon2";
import { getPrisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prisma = getPrisma();
    
    // 1. Create a fresh hash with known parameters
    const password = await hash("Sakura2026!", {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // 2. Force update the Admin User
    await prisma.user.upsert({
      where: { email: "admin@sakuragroup.co.tz" },
      update: { 
        password, 
        status: "ACTIVE", 
        role: "ADMIN" 
      },
      create: {
        email: "admin@sakuragroup.co.tz",
        password,
        name: "Sakura Admin",
        organization: "Sakura HQ",
        phoneNumber: "+255753930000",
        role: "ADMIN",
        status: "ACTIVE",
        balance: 100000,
        smsRate: 28
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Password reset to: Sakura2026!",
      note: "DELETE THIS FILE IMMEDIATELY AFTER USE" 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
