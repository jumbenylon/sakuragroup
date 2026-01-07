import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

/**
 * Axis by Sakura - Profile Logic
 * Purpose: Transition a user to a "Strong Profile" state.
 */
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const prisma = getPrisma();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Authentication Required" }, { status: 401 });
    }

    const body = await req.json();
    const { name, organization, phoneNumber } = body;

    // We use an atomic update to ensure data integrity
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name || undefined,
        organization: organization || undefined,
        phoneNumber: phoneNumber || undefined,
        // Logic: Once profile is updated, we verify the node as ACTIVE
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Node identity updated.",
      user: {
        name: updatedUser.name,
        status: updatedUser.status
      }
    });

  } catch (error: any) {
    console.error("[PROFILE_UPDATE_CRITICAL]", error);
    
    // Senior Error Handling: Provide context, not just 500
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Information already in use by another node." }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Infrastructure update failed." }, { status: 500 });
  }
}
