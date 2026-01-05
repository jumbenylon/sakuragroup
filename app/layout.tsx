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
      {/* HARDENING: 
          1. Removed InteractionEngine.
          2. Ensured native cursor returns by removing 'cursor-none'.
      */}
      <body className={`${inter.variable} bg-black text-white antialiased selection:bg-white selection:text-black`}>
        <GoogleAnalytics gaId="G-WYMNZF4RES" />

        <ThemeProvider attribute="class" defaultTheme="dark">
            {/* 1. Contextual Swahili Preloader - Only fires on hub entry */}
            <GlobalPreloader />
            
            {/* 2. Permanent Global Navbar - Anchored at Z-100 */}
            <GlobalNavbar />

            {/* 3. Unified Container 
                   pt-20: Matches navbar height for pixel-perfect spacing.
                   relative z-10: Ensures page content stacks correctly.
            */}
            <main id="main-content" className="relative z-10 min-h-screen pt-20">
              {children}
            </main>

            {/* 4. Shared Industrial Footer - Rendered once for the whole ecosystem */}
            <GlobalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
