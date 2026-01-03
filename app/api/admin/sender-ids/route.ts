export const dynamic = "force-dynamic"; // Prevent static caching
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; // Secure Session Access
import { authOptions } from "@/lib/auth"; // Your auth config
import { getPrisma } from "@/lib/prisma"; // Singleton Pattern

/**
 * AXIS GATEWAY (BULK DISPATCH)
 * - Validates Tenant & Balance
 * - Calculates Bulk Cost
 * - Deducts Balance Atomically
 * - Dispatches via Beem Africa
 * - Logs History
 */
export async function POST(req: Request) {
  try {
    // 1. Secure Authentication
    const session = await getServerSession(authOptions);
    
    // [TYPE FIX] Ensure email is treated as string.
    // We strictly check for existence here.
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
    }
    
    // Store email in a const that is guaranteed to be string for the closure
    const userEmail = session.user.email; 

    // 2. Parse Payload from Compose Page
    const { recipients, message, senderId } = await req.json();

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0 || !message) {
      return NextResponse.json({ error: "Invalid Payload" }, { status: 400 });
    }

    // 3. Calculate Sovereign Costs
    // Logic: 160 chars = 1 unit. >160 chars = 153 chars per unit.
    const charCount = message.length;
    const segments = charCount <= 160 ? 1 : Math.ceil(charCount / 153);
    const costPerSms = 28; // Tenant Rate (TZS)
    const totalCost = segments * costPerSms * recipients.length;

    const prisma = getPrisma();

    // 4. Atomic Transaction: Check Balance & Deduct
    const result = await prisma.$transaction(async (tx) => {
      // Fetch User by Email (Secure)
      const user = await tx.user.findUnique({
        where: { email: userEmail }, // [FIX] Using the const we defined above
      });

      if (!user) throw new Error("USER_NOT_FOUND");
      if (user.status !== "ACTIVE" && user.role !== "ADMIN") throw new Error("ACCOUNT_SUSPENDED");
      
      // Check Funds
      if (user.balance < totalCost) {
        throw new Error(`INSUFFICIENT_FUNDS. Required: ${totalCost}, Available: ${user.balance}`);
      }

      // Deduct immediately
      await tx.user.update({
        where: { id: user.id },
        data: { balance: { decrement: totalCost } },
      });

      return { user };
    });

    // 5. Provider Dispatch (Beem Africa)
    // Beem requires Authorization header as Base64(API_KEY:SECRET_KEY)
    const beemAuth = Buffer.from(
      `${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`
    ).toString("base64");
    
    // Format recipients for Beem (Array of Objects)
    // Beem format: [{ recipient_id: 1, dest_addr: "2557..." }, ...]
    const beemRecipients = recipients.map((phone, index) => ({
      recipient_id: index + 1,
      dest_addr: phone
    }));

    const response = await fetch("https://apisms.beem.africa/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${beemAuth}`,
      },
      body: JSON.stringify({
        source_addr: senderId || "INFO", // Use selected ID or fallback
        message: message,
        encoding: 0, // 0 = Plain Text
        recipients: beemRecipients,
      }),
    });

    const providerData = await response.json();
    const isSent = response.ok; // Note: Beem might return 200 even if some fail, but we assume success for now.

    // 6. Async Logging (Fire & Forget for performance, or await for consistency)
    // We create a log entry for EACH recipient to keep history clean.
    const logPromises = recipients.map((phone) => 
      prisma.messageLog.create({
        data: {
          userId: result.user.id,
          recipient: phone,
          content: message, // Schema uses 'content', not 'message'
          status: isSent ? "SENT" : "FAILED",
          costToTenant: segments * costPerSms, // Cost for THIS single SMS
          costToAdmin: segments * 18, // Estimated admin cost
        }
      })
    );
    
    await Promise.all(logPromises);

    if (!isSent) {
      console.error("Beem Error:", providerData);
      // Optional: Refund user logic could go here if critical
      return NextResponse.json({ error: "Gateway Rejection" }, { status: 502 });
    }

    return NextResponse.json({ 
      success: true, 
      cost: totalCost, 
      balance: result.user.balance - totalCost 
    });

  } catch (error: any) {
    console.error("DISPATCH ERROR:", error.message);
    return NextResponse.json({ error: error.message || "System Error" }, { status: 500 });
  }
}
