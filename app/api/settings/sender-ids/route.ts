export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

// 1. GET: Fetch Sender IDs (Bypassing Auth for Dev Mode)
export async function GET(req: Request) {
  try {
    const prisma = getPrisma();

    // 🟢 BACKEND BYPASS: 
    // Instead of checking session, we fetch the Master Admin's IDs directly.
    // Ensure "admin@sakuragroup.co.tz" matches the user in your database.
    const user = await prisma.user.findUnique({
      where: { email: "admin@sakuragroup.co.tz" },
      include: { 
        senderIds: {
          orderBy: { createdAt: "desc" }
        }
      }
    });

    let myIds = user?.senderIds || [];

    // 🟢 FALLBACK DATA (Critical for UI Testing):
    // If the database has no Sender IDs yet, return these defaults 
    // so your dropdown isn't empty.
    if (myIds.length === 0) {
      myIds = [
        { id: "default-1", senderId: "INFO", status: "ACTIVE", createdAt: new Date() },
        { id: "default-2", senderId: "SAKURA", status: "ACTIVE", createdAt: new Date() },
        { id: "default-3", senderId: "AXIS", status: "ACTIVE", createdAt: new Date() }
      ] as any;
    }

    return NextResponse.json({ senderIds: myIds });

  } catch (error) {
    console.error("USER_SENDER_FETCH_ERROR", error);
    // Return defaults even on crash to keep UI alive
    return NextResponse.json({ 
      senderIds: [{ id: "fallback", senderId: "INFO", status: "ACTIVE" }] 
    });
  }
}

// 2. POST: Request a NEW Sender ID (Bypassing Auth)
export async function POST(req: Request) {
  try {
    const { senderId } = await req.json();

    // Basic Validation
    if (!senderId || senderId.length > 11) {
       return NextResponse.json({ error: "Invalid ID (Max 11 chars)" }, { status: 400 });
    }

    const prisma = getPrisma();
    
    // 🟢 BACKEND BYPASS: Connect the new ID to the Master Admin
    // This allows you to test the "Request ID" feature without being logged in.
    await prisma.senderId.create({
      data: {
        senderId,
        status: "PENDING",
        user: { connect: { email: "admin@sakuragroup.co.tz" } }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SENDER_CREATE_ERROR", error);
    return NextResponse.json({ error: "Request Failed" }, { status: 500 });
  }
}
