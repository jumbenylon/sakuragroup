import { NextResponse } from "next/server";
import { sendBeemSMS } from "@/lib/beem";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipients, message, senderId } = body;

    // 1. Validation Logic
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: "Validation Error: No recipients provided." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { error: "Validation Error: Message content is empty." },
        { status: 400 }
      );
    }

    // 2. Call The Engine
    const result = await sendBeemSMS({
      recipients,
      message,
      sourceId: senderId,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Gateway Error", details: result.error },
        { status: 502 }
      );
    }

    // 3. Success Response
    return NextResponse.json({
      success: true,
      gateway_response: result.data,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("API ROUTE ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
