import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Think Loko | The Podcast for Tanzanian Narratives",
  description: "A media platform telling the real stories of Tanzania. Business, Culture, Tech, and Life through the eyes of locals. Hosted by Jumbenylon & Omary.",
  keywords: [
    "Tanzanian Podcasts",
    "Think Loko",
    "African Business Stories",
    "Tanzania Culture Media",
    "Swahili Podcast",
    "Jumbenylon"
  ],
  openGraph: {
    title: "Think Loko | Local Voices, Real Contexts",
    description: "Unfiltered conversations about building, living, and winning in Tanzania.",
    images: ["https://storage.googleapis.com/sakura-web/Think-Loko-Cover.jpg"],
  },
};

export default function ThinkLokoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
