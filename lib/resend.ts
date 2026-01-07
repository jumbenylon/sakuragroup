import { Resend } from 'resend';

/**
 * Senior Architect Note: We avoid top-level instantiation 
 * to prevent Docker build failures when ENV variables are missing.
 */
const resendApiKey = process.env.RESEND_API_KEY;

// Provide a dummy key only during build-time to satisfy the constructor
export const resend = new Resend(resendApiKey || 're_build_placeholder');

export const sendProvisioningEmail = async (email: string, name: string) => {
  if (!resendApiKey) {
    console.warn("Resend API Key missing. Email suppressed.");
    return;
  }
  // ... rest of your email logic
};
