import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Sakura Axis Gateway",
  description: "Secure access to your Sakura Axis SMS and WhatsApp Business API dashboard. Manage campaigns, view reports, and top up credits.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Axis Portal Login",
    description: "Secure. Fast. Reliable. Access your communication infrastructure.",
    images: ["https://storage.googleapis.com/sakura-web/axis-seo-card.jpg"],
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
