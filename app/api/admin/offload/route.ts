import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const prisma = getPrisma();

  // Security: Ensure only ADMIN roles can access this
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 0 });
  }

  try {
    const { userId, action } = await req.json(); // action: 'APPROVE' | 'REJECT'

    if (action === "APPROVE") {
      // Radical Simplicity: Hard delete or archive? We'll update status to DELETED
      await prisma.user.update({
        where: { id: userId },
        data: { status: "DELETED" }, 
      });
      return NextResponse.json({ success: true, message: "User offloaded successfully." });
    }

    if (action === "REJECT") {
      await prisma.user.update({
        where: { id: userId },
        data: { status: "ACTIVE" },
      });
      return NextResponse.json({ success: true, message: "Deletion request rejected." });
    }

  } catch (error) {
    return NextResponse.json({ error: "Operation failed" }, { status: 500 });
  }
}
