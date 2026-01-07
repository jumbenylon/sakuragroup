import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Your auth config
import { z } from "zod";
import { EmailService } from "@/lib/email";

// Schema for a "Strong Profile"
const profileSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  companyName: z.string().min(2, "Company name required"),
  role: z.string().optional(),
  bio: z.string().max(500).optional(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format"), // E.164 format
});

// Schema for Deletion Request
const deleteRequestSchema = z.object({
  reason: z.string().min(5, "Reason required"),
  confirmEmail: z.string().email(),
});

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = profileSchema.parse(body);

    // TODO: Call your database (Prisma/Drizzle) here
    // await db.user.update({ where: { email: session.user.email }, data: validatedData });

    console.log(`[AUDIT] Profile updated for user: ${session.user.email}`);

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully", 
      data: validatedData 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handling the Offloading Request (User asks to leave)
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { reason, confirmEmail } = deleteRequestSchema.parse(body);

    if (confirmEmail !== session.user.email) {
      return NextResponse.json({ error: "Email confirmation mismatch" }, { status: 400 });
    }

    // 1. Mark user status in DB
    // await db.user.update({ 
    //   where: { email: session.user.email }, 
    //   data: { status: 'PENDING_DELETION', deletionReason: reason } 
    // });

    // 2. Notify Admin via Email Service
    await EmailService.sendDeletionRequestNotification(
      process.env.ADMIN_EMAIL || "admin@example.com", 
      session.user.email, 
      reason
    );

    return NextResponse.json({ 
      success: true, 
      message: "Deletion request submitted for admin approval." 
    });

  } catch (error) {
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
