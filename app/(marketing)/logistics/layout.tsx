import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sakura Logistics | Supply Chain & Freight Forwarding Tanzania",
  description: "End-to-end logistics solutions. Clearing and forwarding, inland haulage, and warehouse management connecting Dar es Salaam Port to the hinterland.",
  keywords: [
    "Logistics Companies in Tanzania",
    "Clearing and Forwarding Agents",
    "Transport Services Dar es Salaam",
    "Warehousing Tanzania",
    "Supply Chain Management East Africa",
    "Cargo Haulage"
  ],
  openGraph: {
    title: "Sakura Logistics | Move with Precision",
    description: "Seamless supply chain solutions from port to doorstep.",
    images: ["https://storage.googleapis.com/sakura-web/sakura%20group%20website.png"],
  },
};

export default function LogisticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
