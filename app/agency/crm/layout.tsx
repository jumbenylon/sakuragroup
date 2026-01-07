import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sakura CRM | Business Management Software Tanzania",
  description: "The all-in-one operating system for Tanzanian businesses. Manage leads, invoices, projects, and support tickets. Automated, secure, and locally supported.",
  keywords: [
    "CRM Tanzania",
    "Business Management Software Dar es Salaam",
    "Invoicing Software Tanzania",
    "Project Management Tool",
    "Lead Management System",
    "Sakura CRM",
    "Perfex CRM Tanzania"
  ],
  openGraph: {
    title: "Sakura CRM | The Business OS",
    description: "Stop juggling apps. Manage your entire business from one dashboard.",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"],
  },
};

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
