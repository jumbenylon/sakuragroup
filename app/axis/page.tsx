"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  LayoutGroup 
} from "framer-motion";
import { 
  ArrowRight, MessageCircle, Smartphone, 
  Check, ChevronRight, Building2, GraduationCap, Truck
} from "lucide-react";

const LOGO_URL = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";

const Nav = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isSticky ? 'bg-black/90 backdrop-blur-2xl border-b border-white/5 h-16' : 'h-24 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto w-full px-8 h-full flex justify-between items-center">
        <Image src={LOGO_URL} alt="Sakura Axis" width={80} height={30} className="brightness-200" />
        <div className="flex gap-6 items-center">
          <Link href="/axis/login" className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/axis/signup" className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-6 py-2.5 rounded-sm hover:bg-pink-500 hover:text-white transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default function AxisSovereignPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      <Nav />
      
      {/* 1. HERO - THE CONFIDENCE ZONE */}
      <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-8 text-center">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-5xl">
          <p className="text-pink-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-10">Unified Communications Infrastructure</p>
          <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
            Talk to your customers.<br/>
            <span className="text-slate-200 not-italic normal-case font-light tracking-tight">The right way.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Send announcements, updates, and reminders across SMS and WhatsApp with verified identity and operational certainty.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/axis/signup" className="px-14 py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all flex items-center gap-4">
              Create Account <ArrowRight size={14} />
            </Link>
            <Link href="/axis/login" className="px-14 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
              Login to Console
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. WHY AXIS */}
      <section className="py-40 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <Pillar title="Clarity" desc="No complex dashboards. Create, send, and track campaigns in minutes." />
          <Pillar title="Credibility" desc="Approved sender IDs, delivery transparency, and audit-ready records." />
          <Pillar title="Control" desc="Pay only for what you send — no platform fees, no hidden cost." />
        </div>
      </section>

      {/* 3. WHATSAPP */}
      <section id="whatsapp" className="py-40 px-8 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="aspect-square bg-white/[0.01] border border-white/5 rounded-sm flex items-center justify-center">
             <MessageCircle size={100} strokeWidth={1} className="text-pink-500/20" />
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-10 leading-none">Relational<br/>Messaging.</h2>
            <p className="text-slate-400 text-lg font-light mb-12">WhatsApp is how business runs in Tanzania. Axis provides the official API bridge for order receipts and contribution notices.</p>
            <Link href="/axis/signup" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-pink-500/50 pb-2 hover:border-pink-500 transition-all">
              Join WhatsApp Waitlist <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SMS */}
      <section id="sms" className="py-40 px-8 bg-[#020202]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">Built for<br/>Operational Trust.</h2>
            <div className="bg-white/[0.02] border border-white/10 p-12 text-center rounded-sm">
              <p className="text-5xl font-black text-white italic">21 TZS <span className="text-xs font-normal text-slate-600 not-italic tracking-widest">/ SMS</span></p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-40">
            <IconBox icon={<Building2 />} label="SACCOs" />
            <IconBox icon={<Truck />} label="Logistics" />
            <IconBox icon={<GraduationCap />} label="Schools" />
            <IconBox icon={<Smartphone />} label="Retailers" />
          </div>
        </div>
      </section>

      {/* 5. ENTERPRISE */}
      <section className="py-40 px-8 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase mb-16 leading-none">Designed for Responsibility.</h2>
          <div className="grid md:grid-cols-2 gap-px bg-black/5 border border-black/5">
            <div className="bg-white p-16">
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 text-slate-400">SME Operations</h3>
              <ul className="space-y-6 text-sm font-light opacity-80">
                <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Rapid onboarding via dashboard</li>
                <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Pre-calculated costs</li>
              </ul>
            </div>
            <div className="bg-white p-16 border-l border-black/5">
              <h3 className="text-xs font-black uppercase tracking-widest mb-10 text-slate-400">Corporate</h3>
              <ul className="space-y-6 text-sm font-light opacity-80">
                <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Immutable financial ledger</li>
                <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Audit-ready reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-64 flex flex-col items-center text-center px-8 bg-[#020202]">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 leading-none">Confidence<br/>In Communication.</h2>
        <Link href="/axis/signup" className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-pink-500 hover:text-white transition-all">
          Get Started Now
        </Link>
      </section>

      <footer className="p-20 border-t border-white/5 text-center bg-[#020202]">
        <p className="text-[8px] font-mono uppercase tracking-[0.6em] text-slate-700">© 2026 SAKURA GROUP • PRECISION INFRASTRUCTURE</p>
      </footer>
    </main>
  );
}

function Pillar({ title, desc }: any) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-black uppercase tracking-widest text-pink-500">{title}</h4>
      <p className="text-xl font-light">{desc}</p>
    </div>
  );
}

function IconBox({ icon, label }: any) {
  return (
    <div className="p-8 border border-white/5 bg-white/[0.01] text-center uppercase tracking-widest text-[9px] font-black">
      <div className="mx-auto mb-4">{icon}</div> {label}
    </div>
  );
}

const Truck = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5h-7v6h2"/><path d="M13 9h4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);
