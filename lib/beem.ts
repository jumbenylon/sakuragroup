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
  recipients: string[]; 
  message: string;
  sourceId?: string;
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
    console.error("CRITICAL: Beem API keys are missing from environment variables.");
    return { success: false, error: "Server Config Error: Missing API Keys" };
  }

  // Auth Header
  const auth = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

  // Format recipients
  const formattedRecipients = recipients.map((phone, index) => ({
    recipient_id: index + 1,
    dest_addr: phone.replace("+", ""),
  }));

  const payload = {
    source_addr: sourceId || defaultSource || "INFO", // Fallback if env missing
    schedule_time: "",
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
      // Keep SSL bypass for robustness on some servers
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    // --- THE FIX: INSPECT THE INTERNAL CODE ---
    // Beem Codes:
    // 100: Sent Successfully
    // 101: Scheduled Successfully
    // 102: Queued Successfully
    // Any other code (e.g., 105, 106) is a FAILURE, even if HTTP is 200.
    const validCodes = [100, 101, 102];

    if (!validCodes.includes(data.code)) {
      console.error("BEEM LOGICAL ERROR:", data);
      return {
        success: false,
        error: `Gateway Error (${data.code}): ${data.message}`,
        data: data // Pass data back so you can see details in debug console
      };
    }

    return {
      success: true,
      data: data,
    };

  } catch (error: any) {
    console.error("BEEM NETWORK ERROR:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || "Network Error connecting to Beem",
    };
  }
}
