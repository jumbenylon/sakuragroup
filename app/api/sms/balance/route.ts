import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/session"; // 🟢 The New Lock

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. 🟢 SECURITY CHECK
    // Verify the user is actually logged in
    const user = await getAuthSession();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. 🟢 CREDENTIAL LOGIC
    // If the user is an ADMIN, we allow using the System Env Keys.
    // (Later, we can make this check user.apiKey from the DB)
    let apiKey = user.apiKey; // Assuming you added this to schema, or null
    let secretKey = user.apiSecret;

    if (user.role === "ADMIN") {
        // Fallback to Master Keys for Admins
        apiKey = apiKey || process.env.BEEM_API_KEY;
        secretKey = secretKey || process.env.BEEM_SECRET_KEY;
    }

    if (!apiKey || !secretKey) {
       return NextResponse.json({ success: true, balance: 0, source: "NO_KEYS" });
    }

    // 3. 🟢 BEEM API CALL
    const response = await fetch("https://apisms.beem.africa/public/v1/vendors/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(`${apiKey}:${secretKey}`).toString("base64"),
      },
      signal: AbortSignal.timeout(5000) 
    });

    const data = await response.json();

    if (data?.data?.credit_balance !== undefined) {
      return NextResponse.json({ 
        success: true, 
        balance: data.data.credit_balance,
        source: "BEEM_LIVE" 
      });
    } else {
      return NextResponse.json({ success: false, balance: 0, error: "Beem API Error" });
    }

  } catch (error) {
    console.error("Balance API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
