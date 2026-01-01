import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sakura Group | Industrial & Technology Conglomerate",
  description: "The digital headquarters of Sakura Group.",
  icons: {
    icon: 'https://storage.googleapis.com/sakura-web/logo-icon.png', // Pulls from your bucket
    apple: 'https://storage.googleapis.com/sakura-web/logo-icon.png',
  },
};
import { Inter } from "next/font/google";
import "./globals.css";

// Loading a premium, clean font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sakura Group | Industrial & Technology Conglomerate",
  description: "The digital headquarters of Sakura Group. Innovating in Energy, Logistics, Fintech, and Media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-neutral-950 text-neutral-100 antialiased selection:bg-rose-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
