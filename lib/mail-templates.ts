/**
 * Sakura Group - Unified Email Infrastructure
 * Contains: 
 * 1. CEO Welcome (User-facing)
 * 2. Contact Intake (Internal-facing)
 */

// --- 1. CEO WELCOME TEMPLATE (YOUR EXISTING LOGIC) ---
export const getWelcomeEmailHtml = (clientEmail: string, isGoogleLogin: boolean) => {
  const loginMethod = isGoogleLogin ? "Google SSO" : "Secure Access Key";
  const logoUrl = "https://storage.googleapis.com/sakura-web/logo-full.png";
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 60px 24px; }
          .logo { width: 140px; margin-bottom: 48px; }
          .hero-text { font-size: 28px; font-weight: 800; color: #000000; margin-bottom: 24px; letter-spacing: -0.5px; }
          .body-text { font-size: 15px; line-height: 1.7; color: #374151; margin-bottom: 32px; }
          .highlight-box { border-left: 2px solid #000000; padding: 20px 24px; background-color: #f9fafb; margin-bottom: 32px; }
          .section-label { font-size: 10px; font-weight: 900; color: #9ca3af; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; display: block; }
          .step { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 8px; display: block; }
          .step-desc { font-size: 13px; color: #6b7280; margin-bottom: 20px; display: block; }
          .signature { margin-top: 48px; border-top: 1px solid #f3f4f6; padding-top: 32px; }
          .sig-name { font-size: 15px; font-weight: 800; color: #000000; margin: 0; }
          .sig-title { font-size: 12px; font-weight: 600; color: #db2777; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px; }
          .footer { font-size: 10px; color: #9ca3af; margin-top: 40px; text-transform: uppercase; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${logoUrl}" alt="Axis by Sakura" class="logo">
          <div class="hero-text">Welcome to Axis by Sakura.</div>
          <p class="body-text">
            Hello,<br><br>
            I personally wanted to welcome you to the ecosystem. By choosing <strong>Axis by Sakura</strong>, you’ve gained access to the most robust communication infrastructure in the region.
            <br><br>
            Your node is currently being provisioned via <strong>${loginMethod}</strong>. To maintain the integrity of our network, we are performing a standard verification of your organization details.
          </p>
          <div class="highlight-box">
             <span class="section-label">Your Integration Path</span>
             <span class="step">1. Gateway Verification</span>
             <span class="step-desc">Our systems are currently validating your business profile for security compliance.</span>
             <span class="step">2. Regulatory Compliance</span>
             <span class="step-desc">Once active, you can submit your official Sender ID for approval within the portal.</span>
             <span class="step">3. Infrastructure Access</span>
             <span class="step-desc">Your wallet is ready for initial credit. We've assigned you to our CORE tier for immediate market entry.</span>
          </div>
          <p class="body-text">
            My team and I are here to ensure your communication scales without friction. If you have specific enterprise requirements, simply reply to this email.
          </p>
          <div class="signature">
            <p class="sig-name">Jumbenylon</p>
            <p class="sig-title">CEO & Founder, Sakura Group</p>
          </div>
          <div class="footer">Sakura Group Ltd &bull; Dar es Salaam, Tanzania &bull; axis.sakuragroup.co.tz</div>
        </div>
      </body>
    </html>
  `;
};

// --- 2. INTERNAL CONTACT INTAKE (NEW LOGIC) ---
export const getContactIntakeEmailHtml = (data: {
  name: string,
  email: string,
  company: string,
  message: string,
  service: string,
  txId: string
}) => {
  const colorMap: Record<string, string> = {
    logistics: "#EAB308",
    agency: "#F97316",
    roofcleaning: "#10B981",
    general: "#6B7280"
  };
  const accentColor = colorMap[data.service] || colorMap.general;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
          .header { background-color: #050912; padding: 32px; border-bottom: 4px solid ${accentColor}; }
          .badge { display: inline-block; padding: 4px 12px; background-color: ${accentColor}; color: #ffffff; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 4px; margin-bottom: 16px; }
          .content { padding: 40px; }
          .tx-id { font-family: monospace; font-size: 12px; color: #9ca3af; margin-bottom: 8px; }
          .title { font-size: 24px; font-weight: 800; color: #000000; margin-bottom: 32px; letter-spacing: -0.5px; }
          .field { margin-bottom: 24px; }
          .label { font-size: 10px; font-weight: 900; color: #9ca3af; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; display: block; }
          .value { font-size: 15px; color: #111827; font-weight: 500; }
          .message-box { background-color: #f9fafb; border-left: 2px solid #e5e7eb; padding: 20px; font-size: 14px; color: #374151; line-height: 1.6; font-style: italic; }
          .footer { padding: 32px; background-color: #fcfcfc; border-top: 1px solid #f3f4f6; text-align: center; }
          .btn { display: inline-block; background-color: #000000; color: #ffffff; padding: 16px 32px; text-decoration: none; font-size: 12px; font-weight: 800; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">${data.service} Division</div>
            <div style="color: white; font-weight: 900; font-size: 20px; letter-spacing: -1px;">SAKURA GROUP.</div>
          </div>
          <div class="content">
            <div class="tx-id">TXN: ${data.txId}</div>
            <div class="title">New Lead Captured</div>
            
            <div class="field">
              <span class="label">Primary Contact</span>
              <div class="value">${data.name}</div>
            </div>

            <div class="field">
              <span class="label">Organization</span>
              <div class="value">${data.company || "Direct Individual"}</div>
            </div>

            <div class="field">
              <span class="label">Email Address</span>
              <div class="value">${data.email}</div>
            </div>

            <div class="field">
              <span class="label">Project Details</span>
              <div class="message-box">${data.message}</div>
            </div>

            <div style="margin-top: 40px; text-align: center;">
              <a href="mailto:${data.email}" class="btn">Initiate Response</a>
            </div>
          </div>
          <div class="footer">
            <span class="label" style="margin-bottom: 0;">Sovereign Intake System • ${new Date().getFullYear()}</span>
          </div>
        </div>
      </body>
    </html>
  `;
};