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
  icons: { icon: 'https://storage.googleapis.com/sakura-web/logo-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      {/* Removing 'InteractionEngine' here restores the native OS cursor.
          'cursor-auto' is a safety fallback to ensure the mouse is visible.
      */}
      <body className={`${inter.variable} bg-black text-white antialiased cursor-auto`}>
        <GoogleAnalytics gaId="G-WYMNZF4RES" />
        <ThemeProvider attribute="class" defaultTheme="dark">
            <GlobalPreloader />
            <GlobalNavbar />
            <main id="main-content" className="relative z-10 min-h-screen pt-20">
              {children}
            </main>
            <GlobalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
