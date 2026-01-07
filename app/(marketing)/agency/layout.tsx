import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sakura Agency | Branding, Digital Strategy & Advertising in Tanzania",
  description: "The strategic growth partner for Tanzanian brands. We specialize in Market Research, Brand Identity, Digital Marketing, and Corporate Communication in Dar es Salaam.",
  keywords: [
    "Advertising Agency Tanzania",
    "Digital Marketing Dar es Salaam",
    "Branding Agency Tanzania",
    "Market Research Tanzania",
    "Corporate Communication Strategy",
    "Creative Agency Tanzania"
  ],
  openGraph: {
    title: "Sakura Agency | Strategy & Creative",
    description: "We build brands that dominate their market. Strategy, Design, and Digital Execution.",
    images: ["https://storage.googleapis.com/sakura-web/sakura%20group%20website.png"], // Replace with your image
  },
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
