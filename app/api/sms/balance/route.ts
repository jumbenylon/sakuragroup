import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Prevent caching

export async function GET() {
  try {
    // 1. Get Master Credentials from Environment Variables
    // (Ensure BEEM_API_KEY and BEEM_SECRET_KEY are in your .env file)
    const apiKey = process.env.BEEM_API_KEY;
    const secretKey = process.env.BEEM_SECRET_KEY;

    if (!apiKey || !secretKey) {
      console.error("BEEM CREDENTIALS MISSING");
      // Fallback for UI testing if keys are missing
      return NextResponse.json({ success: true, balance: 0, source: "NO_KEYS_CONFIGURED" });
    }

    // 2. Connect to Beem (Real API Call)
    // We use Basic Auth (API Key + Secret Key)
    const response = await fetch("https://apisms.beem.africa/public/v1/vendors/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(`${apiKey}:${secretKey}`).toString("base64"),
      },
      // Short timeout to prevent hanging
      signal: AbortSignal.timeout(5000) 
    });

    const data = await response.json();

    // 3. Process Response
    if (data?.data?.credit_balance !== undefined) {
      return NextResponse.json({ 
        success: true, 
        balance: data.data.credit_balance,
        source: "BEEM_LIVE" 
      });
    } else {
      console.error("Beem Balance Error:", data);
      return NextResponse.json({ success: false, balance: 0, error: "Beem API Error" });
    }

  } catch (error) {
    console.error("Balance API Crash:", error);
    return NextResponse.json({ error: "System failure" }, { status: 500 });
  }
}
