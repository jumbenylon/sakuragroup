import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SakuraHost | Enterprise Cloud & .co.tz Domains Tanzania",
  description: "High-performance NVMe VPS, Cheap Affordable Web Hosting, and Domain Registration in Tanzania. Local support with global speeds. Secure your digital infrastructure today.",
  keywords: [
    "Web Hosting Tanzania",
    "VPS Hosting Dar es Salaam",
    "Register .co.tz Domain",
    "Cloud Server Tanzania",
    "Corporate Email Hosting",
    "Accredited Domain registrar Tanzania"
    "SSL Certificates Tanzania"
  ],
  openGraph: {
    title: "SakuraHost | The Sovereign Cloud",
    description: "Reliable, fast, and secure hosting infrastructure built for Tanzanian business.",
    images: ["https://storage.googleapis.com/sakura-web/sakura%20group%20website.png"],
  },
};

export default function HostingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
