import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomBytes } from "crypto"; // Specific import for better tree-shaking

export async function POST(req: Request) {
  try {
    // Note: In a real multi-tenant app, you'd get this from your Auth session
    // For now, we are assuming the body contains the requester info or it's a placeholder
    const { userId } = await req.json(); 

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || user.status !== "ACTIVE") {
      return NextResponse.json({ 
        error: "Access Denied. Account must be ACTIVE to generate keys." 
      }, { status: 403 });
    }

    // Generate a secure, high-entropy key
    const rawKey = `sk_live_${randomBytes(24).toString("hex")}`;
    
    await prisma.apiKey.create({
      data: {
        key: rawKey, 
        userId: userId,
        name: "Default API Key",
      },
    });

    return NextResponse.json({ key: rawKey });
  } catch (error: any) {
    console.error("Key Generation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
