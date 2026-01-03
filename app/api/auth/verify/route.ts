import { NextResponse } from "next/server";

/**
 * Axis Gatekeeper - Verifies SAKURA-MASTER access code
 * Logic: Stateless validation before NextAuth handshake
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    // 1. Validation Logic
    // We use SAKURA-MASTER as the high-level infrastructure key
    if (!code || code !== "SAKURA-MASTER") {
      console.warn(`[SECURITY] Unauthorized Gate Access Attempt with code: ${code}`);
      return NextResponse.json(
        { error: "INVALID_ACCESS_CODE" }, 
        { status: 401 }
      );
    }

    // 2. Success Response
    // Returning success allows the Frontend to trigger the NextAuth signIn
    return NextResponse.json({ 
      success: true, 
      message: "GATE_OPEN" 
    });

  } catch (error) {
    console.error("[VERIFY_ERROR]", error);
    return NextResponse.json(
      { error: "SYSTEM_HANDSHAKE_FAILED" }, 
      { status: 500 }
    );
  }
}
