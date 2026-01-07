import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Center | Sakura Group",
  description: "Privacy Policy, Terms of Service, and Acceptable Use Policy for Sakura Group services (Axis, Hosting, RCS).",
  robots: {
    index: false, // Don't let these clog up your SEO results
    follow: true,
  }
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[250px_1fr] gap-12">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="space-y-8">
            <div>
                <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Legal Center</h3>
                <nav className="flex flex-col space-y-2">
                    <Link href="/legal/privacy" className="text-sm text-slate-300 hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/legal/terms" className="text-sm text-slate-300 hover:text-white transition-colors">Terms of Service</Link>
                    <Link href="/legal/aup" className="text-sm text-slate-300 hover:text-white transition-colors">Acceptable Use (Axis)</Link>
                </nav>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded text-xs text-slate-400">
                <p><strong>Questions?</strong><br/>legal@sakuragroup.co.tz<br/>+255 753 930 000</p>
            </div>
        </aside>

        {/* DOCUMENT CONTENT */}
        <main className="prose prose-invert prose-emerald max-w-none">
            {children}
        </main>
      </div>
    </div>
  );
}
