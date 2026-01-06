import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk SMS Tanzania & WhatsApp API Gateway | Axis by Sakura",
  description: "The most reliable Bulk SMS and WhatsApp API provider in Tanzania. Direct connections to Vodacom, Tigo, Airtel & Halotel. Send marketing SMS, OTPs, and alerts.",
  // ... copy the rest of the metadata object here
};

export default function AxisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
