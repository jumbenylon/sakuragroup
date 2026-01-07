import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 🟢 SENIOR FIX: This resolves the Playwright warnings and SEO resolution errors
  metadataBase: new URL("https://sakuragroup.co.tz"),
  title: {
    default: "Sakura Group",
    template: "%s | Sakura Group"
  },
  description: "Technology & Infrastructure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
