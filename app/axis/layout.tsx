import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 1. Metadata: Preserving your Enterprise SEO Configuration
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

// 2. Functional Portal Shell
export default async function AxisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch session at the layout level to pass user data to the Sidebar
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar: Locked to the left, hidden on small screens for mobile-first purity */}
      <div className="hidden md:block">
        <AxisSidebar user={session?.user || null} />
      </div>

      {/* Main Content: Scrollable area with soft background for premium focus */}
      <main className="flex-1 bg-slate-50/40 overflow-y-auto">
        <div className="p-4 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
