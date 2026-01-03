import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const pendingIds = await prisma.senderId.findMany({
      where: { status: "PENDING" },
      include: {
        user: {
          select: { email: true, id: true }
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

export async function PATCH(req: Request) {
  try {
    const { id, action, adminId } = await req.json();

    const updated = await prisma.senderId.update({
      where: { id },
      data: {
        status: action === "APPROVED" ? "APPROVED" : "REJECTED",
        approvedBy: action === "APPROVED" ? adminId : null,
        approvedAt: action === "APPROVED" ? new Date() : null,
        rejectedBy: action === "REJECTED" ? adminId : null,
        rejectedAt: action === "REJECTED" ? new Date() : null,
      }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("ADMIN_SENDER_UPDATE_ERROR", error);
    return NextResponse.json({ success: false, error: "UPDATE_ERROR" }, { status: 500 });
  }
}
