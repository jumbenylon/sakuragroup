import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto"; 

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    const rawKey = `sk_live_${randomBytes(24).toString("hex")}`;
    
    await prisma.apiKey.create({
      data: {
        key: rawKey,
        userId: userId,
      },
    });

    return NextResponse.json({ key: rawKey });
  } catch (error) {
    return NextResponse.json({ error: "Key Gen Failed" }, { status: 500 });
  }
}
