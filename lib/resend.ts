import { Resend } from 'resend';

// Senior Approach: Only instantiate if key exists to avoid build-time ReferenceErrors
const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

export async function sendOtpEmail(email: string, otp: string) {
  if (!resend) {
    console.error("CRITICAL: RESEND_API_KEY is missing in environment variables.");
    return { error: "Mailing system offline" };
  }
  // ... existing mail logic
}
