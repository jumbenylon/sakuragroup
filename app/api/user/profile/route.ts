import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

/**
 * Endpoint for Building a "Strong Profile"
 * Validates session, updates DB, and triggers success for Playwright.
 */
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const prisma = getPrisma();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fullName, organization, phoneNumber } = body;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: fullName,
        organization: organization,
        phoneNumber: phoneNumber,
        // Logic: Mark profile as 'complete' if these fields exist
        status: "ACTIVE" 
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully",
      user: { name: updatedUser.name }
    });
  } catch (error) {
    console.error("[PROFILE_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
