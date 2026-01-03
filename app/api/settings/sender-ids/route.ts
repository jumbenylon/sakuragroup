export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Ensure you have this configured
import { authOptions } from "@/lib/auth"; // Ensure this path is correct
import { getPrisma } from "@/lib/prisma"; // [CRITICAL] Use Singleton

// 1. GET: Fetch MY sender IDs (For the Settings Page table)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prisma = getPrisma();
    const myIds = await prisma.senderId.findMany({
      where: { user: { email: session.user.email } },
      orderBy: { createdAt: "desc" },
      select: { 
        id: true, 
        senderId: true, 
        status: true,
        createdAt: true 
      }
    });

    return NextResponse.json({ senderIds: myIds });
  } catch (error) {
    console.error("USER_SENDER_FETCH_ERROR", error);
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}

// 2. POST: Request a NEW Sender ID
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { senderId } = await req.json();
    if (!senderId || senderId.length > 11) {
       return NextResponse.json({ error: "Invalid ID (Max 11 chars)" }, { status: 400 });
    }

    const prisma = getPrisma();
    
    // Connect to the user using their email
    await prisma.senderId.create({
      data: {
        senderId,
        status: "PENDING",
        user: { connect: { email: session.user.email } }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Request Failed" }, { status: 500 });
  }
}
