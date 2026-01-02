import https from "https";
import axios from "axios";

// TYPES
interface BeemResponse {
  successful: boolean;
  request_id: number;
  code: number;
  message: string;
  valid: number;
  invalid: number;
  duplicates: number;
}

interface SendParams {
  recipients: string[]; // ["255753...", "255682..."]
  message: string;
  sourceId?: string;    // Defaults to env value
}

// CONFIG
const BEEM_URL = "https://apisms.beem.africa/v1/send";

/**
 * SAKURA CORE: BEEM SMS ADAPTER
 * Handles authorization headers and payload formatting for Beem Africa.
 */
export async function sendBeemSMS({ recipients, message, sourceId }: SendParams) {
  const apiKey = process.env.BEEM_API_KEY;
  const secretKey = process.env.BEEM_SECRET_KEY;
  const defaultSource = process.env.BEEM_SOURCE_ID;

  if (!apiKey || !secretKey) {
    throw new Error("CRITICAL: Beem API keys are missing from environment variables.");
  }

  // Beem requires Basic Auth with API Key + Secret
  // We use btoa (Base64) to encode them
  const auth = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

  // Format recipients for Beem (Array of objects)
  // { recipient_id: 1, dest_addr: "2557..." }
  const formattedRecipients = recipients.map((phone, index) => ({
    recipient_id: index + 1,
    dest_addr: phone.replace("+", ""), // Ensure no plus sign
  }));

  const payload = {
    source_addr: sourceId || defaultSource,
    schedule_time: "", // Empty = Send Immediately
    encoding: 0,
    message: message,
    recipients: formattedRecipients,
  };

  try {
    const { data } = await axios.post<BeemResponse>(BEEM_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      // SSL Agent bypass is sometimes needed for legacy servers, 
      // but usually not required on modern Cloud Run. kept for safety.
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    console.error("BEEM GATEWAY ERROR:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || "Network Error connecting to Beem",
    };
  }
}
