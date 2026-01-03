export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma"; // [CRITICAL] Fixed Import

// 1. GET: Fetch ALL Pending Requests (For your Admin Dashboard)
export async function GET() {
  try {
    const prisma = getPrisma();
    const pendingIds = await prisma.senderId.findMany({
      where: { status: "PENDING" },
      include: {
        user: {
          select: { email: true, id: true, name: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, data: pendingIds });
  } catch (error) {
    console.error("ADMIN_SENDER_FETCH_ERROR", error);
    return NextResponse.json({ success: false, error: "FETCH_ERROR" }, { status: 500 });
  }
}

// 2. PATCH: Approve/Reject (The Gavel)
export async function PATCH(req: Request) {
  try {
    const { id, action } = await req.json(); // adminId removed (we can infer or skip for now)

    if (!["APPROVED", "REJECTED"].includes(action)) {
        return NextResponse.json({ error: "Invalid Action" }, { status: 400 });
    }

    const prisma = getPrisma();
    const updated = await prisma.senderId.update({
      where: { id },
      data: {
        status: action,
        // Optional: If your schema supports approvedAt, un-comment these:
        // approvedAt: action === "APPROVED" ? new Date() : null,
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("ADMIN_SENDER_UPDATE_ERROR", error);
    return NextResponse.json({ success: false, error: "UPDATE_ERROR" }, { status: 500 });
  }
}
