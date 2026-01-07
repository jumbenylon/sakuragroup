import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Sakura Group | The Operating System for Tanzanian Business",
    template: "%s | Sakura Group"
  },
  description: "We build the digital, logistical, and financial infrastructure powering Tanzania's next economy. Web, Cloud, Connectivity, Supply Chain, Marketing and Strategy.",
  metadataBase: new URL("https://sakuragroup.co.tz"),
  openGraph: {
    title: "Sakura Group | The Operating System for African Business",
    description: "Cloud, Logistics, and Digital Infrastructure for Tanzania.",
    url: "https://sakuragroup.co.tz",
    siteName: "Sakura Group",
    images: [
      {
        url: "https://storage.googleapis.com/sakura-web/sakuragroup-founders.jpg", // The Founders Image as requested
        width: 1200,
        height: 630,
        alt: "Sakura Group Founders - Jumbenylon & Omary Raymond",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "https://storage.googleapis.com/sakura-web/favicon.png",
    shortcut: "https://storage.googleapis.com/sakura-web/favicon.png",
    apple: "https://storage.googleapis.com/sakura-web/favicon.png",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
