import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Loading a premium, clean font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ONE single metadata block (Merging your icons and description)
export const metadata: Metadata = {
  title: "Sakura Group | Industrial & Technology Conglomerate",
  description: "The digital headquarters of Sakura Group. Innovating in Logistics, Fintech, and Media.",
  icons: {
    icon: 'https://storage.googleapis.com/sakura-web/logo-icon.png', 
    apple: 'https://storage.googleapis.com/sakura-web/logo-icon.png',
  },
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
