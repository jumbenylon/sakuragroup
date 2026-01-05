import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/GoogleAnalytics"; 
import { GlobalPreloader } from "@/components/global-preloader";
import { InteractionEngine } from "@/components/interaction-engine";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sakura Group | Tanzanian Industrial & Technology Backbone",
  description: "The digital headquarters of Sakura Group. Orchestrating innovation across Cloud, Fintech, Logistics, and Construction.",
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
      <body className={`${inter.variable} bg-black text-white antialiased transition-colors duration-300`}>
        
        {/* Analytics Layer */}
        <GoogleAnalytics gaId="G-WYMNZF4RES" />

        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* 1. Preloader logic handles initial entry */}
            <GlobalPreloader />
            
            {/* 2. Interaction Engine handles premium cursor & haptics globally */}
            <InteractionEngine />

            {/* 3. Global Navbar is always visible to fix the 'hanging' UI issue */}
            <GlobalNavbar />

            {/* 4. The Master Container - automatically applies to all pages */}
            <main id="main-content" className="min-h-screen pt-20">
              {children}
            </main>

            {/* 5. Global Footer is always anchored at the bottom */}
            <GlobalFooter />
            
        </ThemeProvider>
      </body>
    </html>
  );
}