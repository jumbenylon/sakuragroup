import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/GoogleAnalytics"; // [NEW] Import the component

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased selection:bg-rose-500 selection:text-white transition-colors duration-300`}>
        
        {/* [NEW] Google Analytics Injection */}
        {/* We pass your specific ID: G-WYMNZF4RES */}
        <GoogleAnalytics gaId="G-WYMNZF4RES" />

        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
