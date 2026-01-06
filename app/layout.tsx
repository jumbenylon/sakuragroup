import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "@/app/globals.css";

// This line fixes the P1001 Database Error during build
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
