/**
 * Axis by Sakura - CEO Welcome Template
 * Brand Strategy: Personal, Authoritative, Premium
 */

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

          <div class="footer">
            Sakura Group Ltd &bull; Dar es Salaam, Tanzania &bull; axis.sakuragroup.co.tz
          </div>
        </div>
      </body>
    </html>
  `;
};
