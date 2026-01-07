import type { Metadata } from "next";

/**
 * Axis Root Layout (Production v5.5 - RECOVERY)
 * Fix: Removed AxisSidebar import/usage to stop 500 status ReferenceErrors.
 * Ethos: Radical Simplicity. Full-width for Auth & Pricing.
 */

export const metadata: Metadata = {
  title: "Bulk SMS Tanzania & WhatsApp API Gateway | Axis by Sakura",
  description: "The most reliable Bulk SMS and WhatsApp API provider in Tanzania. Direct connections to Vodacom, Tigo, Airtel & Halotel. Send marketing SMS, OTPs, and alerts with 98% delivery rates. Start for 21 TZS.",
  alternates: {
    canonical: "https://sakuragroup.co.tz/axis",
  },
  keywords: [
    "Bulk SMS Tanzania", "SMS API Dar es Salaam", "WhatsApp Business API Tanzania",
    "SMS Marketing Services", "OTP SMS Provider", "Shortcodes Tanzania",
    "USSD Gateway", "Axis Gateway", "Sakura Group"
  ],
  openGraph: {
    title: "Axis Gateway | Enterprise Bulk SMS & WhatsApp API",
    description: "Connect with millions of customers instantly. The tailored messaging infrastructure for Tanzanian businesses. 99.9% Uptime.",
    url: "https://sakuragroup.co.tz/axis",
    siteName: "Sakura Group",
    images: [{
      url: "https://storage.googleapis.com/sakura-web/axis-seo-card.jpg",
      width: 1200, height: 630, alt: "Axis Gateway - Bulk SMS Dashboard",
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk SMS & WhatsApp API for Tanzania | Axis",
    description: "Reach every phone in Tanzania. Direct carrier routes, developer-friendly APIs, and instant delivery reports.",
    images: ["https://storage.googleapis.com/sakura-web/axis-seo-card.jpg"],
  },
};

export default function AxisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-emerald-500/20">
      {/* 🟢 SENIOR LOGIC: 
          We removed the Sidebar from this root level because it crashes 
          public pages (Login/Signup/Pricing) when the user is unauthenticated.
          The Sidebar is now handled exclusively in app/axis/portal/layout.tsx
      */}
      {children}
    </div>
  );
}
