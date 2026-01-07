import https from "https";
import axios from "axios";

/**
 * AXIS CORE: BEEM AFRICA ADAPTER (v6.0)
 * Purpose: Direct carrier connectivity for sakurahost.co.tz
 * Logic: Handles SMS transmission and Admin Balance Synchronization.
 */

// --- TYPES ---
interface BeemSMSResponse {
  successful: boolean;
  request_id: number;
  code: number;
  message: string;
  valid: number;
  invalid: number;
  duplicates: number;
}

interface BeemBalanceResponse {
  successful: boolean;
  data?: {
    credit_balance: string;
  };
}

interface SendParams {
  recipients: string[]; 
  message: string;
  sourceId?: string;
}

// --- CONFIG ---
const SMS_URL = "https://apisms.beem.africa/v1/send";
const BALANCE_URL = "https://api.beem.africa/public/v1/vendors/balance";

const getAuthHeader = () => {
  const apiKey = process.env.BEEM_API_KEY;
  const secretKey = process.env.BEEM_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error("CRITICAL: Beem API keys missing for sakurahost.co.tz");
  }

  return Buffer.from(`${apiKey}:${secretKey}`).toString("base64");
};

/**
 * 1. SEND SMS
 * Logic: Standardized transmission with logical code validation.
 */
export async function sendBeemSMS({ recipients, message, sourceId }: SendParams) {
  try {
    const auth = getAuthHeader();
    const defaultSource = process.env.BEEM_SOURCE_ID || "INFO";

    const payload = {
      source_addr: sourceId || defaultSource,
      schedule_time: "",
      encoding: 0,
      message: message,
      recipients: recipients.map((phone, index) => ({
        recipient_id: index + 1,
        dest_addr: phone.replace("+", ""),
      })),
    };

    const { data } = await axios.post<BeemSMSResponse>(SMS_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    // Valid Beem Codes: 100 (Sent), 101 (Scheduled), 102 (Queued)
    const successCodes = [100, 101, 102];
    if (!successCodes.includes(data.code)) {
      return { success: false, error: `Gateway Error: ${data.message}`, code: data.code };
    }

    return { success: true, data };
  } catch (error: any) {
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || "Network Error" 
    };
  }
}

/**
 * 2. GET INFRASTRUCTURE BALANCE
 * Purpose: Pulls the actual TZS wallet for admin@sakurahost.co.tz.
 * Logic: Direct hit to vendor balance endpoint.
 */
export async function getBeemBalance() {
  try {
    const auth = getAuthHeader();

    const { data } = await axios.get<BeemBalanceResponse>(BALANCE_URL, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    if (data.successful && data.data) {
      return { 
        success: true, 
        balance: parseFloat(data.data.credit_balance) 
      };
    }

    return { success: false, balance: 0 };
  } catch (error: any) {
    console.error("BALANCE_SYNC_FAILED:", error.message);
    return { success: false, balance: 0 };
  }
}
