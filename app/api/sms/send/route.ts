export const dynamic = "force-dynamic"; 
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/auth"; 
import { getPrisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  try {
    // 1. Secure Authentication
    const session = await getServerSession(authOptions);
    
    // STRICT CHECK: If no email, kick them out immediately
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
    }
    
    // [THE FIX] Capture the email here as a string.
    // The transaction block below will use this variable, not session.user.email
    const userEmail = session.user.email; 

    // 2. Parse Payload
    const { recipients, message, senderId } = await req.json();

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0 || !message) {
      return NextResponse.json({ error: "Invalid Payload" }, { status: 400 });
    }

    // 3. Calculate Sovereign Costs
    const charCount = message.length;
    const segments = charCount <= 160 ? 1 : Math.ceil(charCount / 153);
    const costPerSms = 28; 
    const totalCost = segments * costPerSms * recipients.length;

    const prisma = getPrisma();

    // 4. Atomic Transaction
    const result = await prisma.$transaction(async (tx) => {
      // Fetch User by Email using the captured variable
      const user = await tx.user.findUnique({
        where: { email: userEmail }, // <--- NOW USING THE CONST
      });

      if (!user) throw new Error("USER_NOT_FOUND");
      if (user.status !== "ACTIVE" && user.role !== "ADMIN") throw new Error("ACCOUNT_SUSPENDED");
      
      if (user.balance < totalCost) {
        throw new Error(`INSUFFICIENT_FUNDS. Required: ${totalCost}, Available: ${user.balance}`);
      }

      await tx.user.update({
        where: { id: user.id },
        data: { balance: { decrement: totalCost } },
      });

      return { user };
    });

    // 5. Provider Dispatch (Beem Africa)
    const beemAuth = Buffer.from(
      `${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET}`
    ).toString("base64");
    
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
        source_addr: senderId || "INFO", 
        message: message,
        encoding: 0, 
        recipients: beemRecipients,
      }),
    });

    const providerData = await response.json();
    const isSent = response.ok; 

    // 6. Async Logging
    const logPromises = recipients.map((phone) => 
      prisma.messageLog.create({
        data: {
          userId: result.user.id,
          recipient: phone,
          content: message, 
          status: isSent ? "SENT" : "FAILED",
          costToTenant: segments * costPerSms,
          costToAdmin: segments * 18, 
        }
      })
    );
    
    await Promise.all(logPromises);

    if (!isSent) {
      console.error("Beem Error:", providerData);
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
