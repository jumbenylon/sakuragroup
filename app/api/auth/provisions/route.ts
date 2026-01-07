import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    const prisma = getPrisma();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Atomic Transaction: Create Wallet if it doesn't exist
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        wallet: {
          connectOrCreate: {
            where: { userEmail: session.user.email },
            create: { balance: 0 }
          }
        }
      }
    });

    return NextResponse.json({ success: true, message: "Infrastructure provisioned." });
  } catch (error) {
    return NextResponse.json({ error: "Provisioning failed" }, { status: 500 });
  }
}
