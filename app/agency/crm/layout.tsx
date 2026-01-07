import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sakura ERP | VFD, HR & Accounting Software Tanzania",
  description: "The complete Cloud ERP for Tanzanian business. Issue TRA VFD receipts without hardware. Manage Payroll, HR, and Finance in one dashboard. Starts at TZS 49,000/mo.",
  alternates: {
    canonical: "https://sakuragroup.co.tz/agency/crm",
  },
  keywords: [
    "ERP System Tanzania",
    "TRA VFD Integration",
    "Cloud VFD System",
    "HR Software Tanzania",
    "Payroll System Dar es Salaam",
    "Accounting Software Tanzania",
    "Business Management System",
    "Sakura ERP"
  ],
  openGraph: {
    title: "Sakura ERP | The Business OS (VFD Ready)",
    description: "Issue Fiscal Receipts, Automate Payroll, and Track Profit. No hardware needed. Starts at TZS 49k/mo.",
    url: "https://sakuragroup.co.tz/agency/crm",
    siteName: "Sakura Group",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
        width: 1200,
        height: 630,
        alt: "Sakura ERP & VFD Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* RICH SOFTWARE SCHEMA FOR GOOGLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Sakura ERP",
            "operatingSystem": "Cloud/Web",
            "applicationCategory": "BusinessApplication",
            "featureList": "TRA VFD Integration, Payroll Automation, HR Management, Accounting, CRM",
            "offers": {
              "@type": "Offer",
              "price": "49000",
              "priceCurrency": "TZS",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "49000",
                "priceCurrency": "TZS",
                "unitCode": "MO"
              },
              "availability": "https://schema.org/InStock"
            },
            "description": "Full Cloud ERP system for Tanzania with VFD integration."
          })
        }}
      />
      {children}
    </>
  );
}
