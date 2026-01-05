import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/GoogleAnalytics"; 
import { GlobalPreloader } from "@/components/global-preloader";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sakura Group | Tanzanian Industrial & Technology Backbone",
  description: "Innovation across Cloud, Fintech, Logistics, and Construction.",
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} bg-black text-white antialiased`}>
        <GoogleAnalytics gaId="G-WYMNZF4RES" />

        <ThemeProvider attribute="class" defaultTheme="dark">
            {/* 1. Contextual Swahili Preloader */}
            <GlobalPreloader />
            
            {/* 2. Permanent Global Navbar */}
            <GlobalNavbar />

            {/* 3. Unified Container (pt-20 prevents content overlap) */}
            <main id="main-content" className="min-h-screen pt-20">
              {children}
            </main>

            {/* 4. Shared Footer (Rendered once per ecosystem) */}
            <GlobalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}