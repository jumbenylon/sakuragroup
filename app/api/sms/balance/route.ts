import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function GET() {
  const apiKey = process.env.BEEM_API_KEY;
  const secretKey = process.env.BEEM_SECRET_KEY;

  if (!apiKey || !secretKey) {
    return NextResponse.json({ error: "API Configuration Missing" }, { status: 500 });
  }

  // 1. Authenticate with Beem
  const auth = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

  try {
    // 2. Request Balance
    // Beem Endpoint: https://apisms.beem.africa/public/v1/vendors/balance
    const response = await axios.get("https://apisms.beem.africa/public/v1/vendors/balance", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    const data = response.data;

    // Beem returns: { data: { credit_balance: "5000.00" }, ... }
    if (data && data.data) {
        return NextResponse.json({ 
            success: true, 
            balance: data.data.credit_balance,
            currency: "TZS"
        });
    }

    return NextResponse.json({ success: false, error: "Invalid Response from Gateway" });

  } catch (error: any) {
    console.error("BALANCE CHECK ERROR:", error.response?.data || error.message);
    return NextResponse.json({ 
        success: false, 
        error: "Failed to fetch balance", 
        details: error.message 
    }, { status: 502 });
  }
}
