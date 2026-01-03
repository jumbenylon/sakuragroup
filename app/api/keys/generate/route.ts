export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma"; // Use Singleton
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prisma = getPrisma();

    // 1. Generate a secure random key
    const rawKey = `sk_live_${randomBytes(24).toString("hex")}`;

    // 2. Save to Database
    const newKey = await prisma.apiKey.create({
      data: {
        key: rawKey,
        user: { connect: { email: session.user.email } },
        isActive: true
      }
    });

    return NextResponse.json({ success: true, key: newKey.key });

  } catch (error) {
    console.error("KEY_GEN_ERROR", error);
    return NextResponse.json({ error: "Failed to generate key" }, { status: 500 });
  }
}
