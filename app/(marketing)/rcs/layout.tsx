import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RCS Construction | Roof Cleaning & Waterproofing Experts Tanzania",
  description: "Specialized industrial maintenance. Roof cleaning, waterproofing, rust encapsulation, and epoxy flooring services. Trusted by warehouses and factories across Tanzania.",
  keywords: [
    "Roof Cleaning Tanzania",
    "Waterproofing Services Dar es Salaam",
    "Industrial Painting",
    "Epoxy Flooring Tanzania",
    "Rust Removal Services",
    "Factory Maintenance East Africa"
  ],
  openGraph: {
    title: "RCS | Industrial Construction & Restoration",
    description: "Extend the lifespan of your assets. Professional roof restoration and waterproofing.",
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070"], 
  },
};

export default function RCSLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
