import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Root Access | Sakura Core",
  robots: {
    index: false,
    follow: false, // 🚫 NO INDEXING
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
