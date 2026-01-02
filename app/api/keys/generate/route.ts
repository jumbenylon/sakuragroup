import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { crypto } from "crypto";

export async function POST(req: Request) {
  // Logic to get session/userId goes here (e.g., via NextAuth)
  const userId = "extract-from-session"; 

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.status !== "ACTIVE") {
    return NextResponse.json({ error: "Account not active" }, { status: 403 });
  }

  const rawKey = `sk_live_${crypto.randomBytes(24).toString("hex")}`;
  
  await prisma.apiKey.create({
    data: {
      key: rawKey, // In production, consider hashing this before storage
      userId: userId,
      name: "Default API Key",
    },
  });

  return NextResponse.json({ key: rawKey });
}
