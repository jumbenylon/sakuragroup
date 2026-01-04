"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone,
  Check, 
  ChevronRight,
  Building2, 
  GraduationCap 
} from "lucide-react";

// GLOBAL COMPONENT IMPORTS
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// ---------------- SUB NAV (Hardened for Global Integration) ----------------
const AxisSubNav = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setVisible(window.scrollY > 150);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="fixed top-16 w-full z-[140] bg-black/60 backdrop-blur-xl border-b border-white/5 h-12 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-pink-500 italic">
              Axis Platform Node
            </span>

            <div className="flex gap-8">
              {["Overview", "WhatsApp", "SMS"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
    <path d="M15 18H9"/>
    <path d="M19 18h2a1 1 0 0 0 1-1v-5h-7v6h2"/>
    <path d="M13 9h4"/>
    <circle cx="7" cy="18" r="2"/>
    <circle cx="17" cy="18" r="2"/>
  </svg>
);

export default function AxisPlatformPage() {
  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      {/* 1. UNIFIED SYSTEM NAVIGATION */}
      <GlobalNavbar />
      <AxisSubNav />

      {/* HERO SECTION */}
      <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20">
        <div className="max-w-6xl z-10">
          <p className="text-pink-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-10 italic">
            Sovereign Communication Infrastructure
          </p>

          <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
            Talk to your customers.
          </h1>
          
          {/* FIXED: Reduced scale for better typographic balance */}
          <p className="text-2xl md:text-3xl text-slate-300 font-light tracking-tight mb-10">
            The right way — with trust, clarity, and identity.
          </p>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Axis enables Tanzanian enterprises to engage via WhatsApp and SMS with 
            verified sender identity, industrial reliability, and absolute transparency.
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <Link href="/contact" className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
              Request Axis Access
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 opacity-30">
          <p className="text-[9px] tracking-[0.4em] uppercase text-slate-500">
            SMEs • SACCOS • Logistics • Schools • Public Infrastructure
          </p>
        </div>
      </section>

      {/* WHATSAPP SECTION */}
      <section id="whatsapp" className="py-40 px-8 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

          {/* FIXED: Image containment and aesthetic treatment */}
          <div className="relative bg-white/5 border border-white/10 aspect-video rounded-sm overflow-hidden group">
            <Image 
              src="https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1200"
              alt="Professional Business Engagement"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
              priority
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-10">
              WhatsApp — The standard for engagement.
            </h2>

            <p className="text-slate-400 text-lg font-light mb-10 leading-relaxed">
              Tanzania runs on WhatsApp. From retail logistics to community organizing, 
              Axis provides the API-grade tools to communicate with structure and respect.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Automated order confirmations and follow-ups",
                "Verified payment notifications for SACCOS groups",
                "Structured broadcast tools for school announcements",
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="text-pink-500 mt-0.5" size={14} /> {item}
                </div>
              ))}
            </div>

            <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest text-pink-500 border-b border-pink-500/40 pb-2 flex items-center gap-2 w-fit">
              Explore WhatsApp Business API <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SMS SECTION */}
      <section id="sms" className="py-40 px-8 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-6 text-white">
              Sovereign SMS Delivery.
            </h2>

            <p className="text-slate-400 text-lg font-light max-w-xl leading-relaxed">
              Dependable delivery with verified sender names and audit-ready reporting.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-12 text-center rounded-sm min-w-[320px]">
            <p className="text-5xl font-black italic text-white">
              21 TZS <span className="text-[10px] font-normal not-italic tracking-widest text-slate-600">/ SMS</span>
            </p>
            <p className="text-[9px] text-slate-500 mt-4 uppercase tracking-[0.3em]">
              Fixed Pricing • Zero Subscription Fees
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          <SectorCard icon={<Building2 size={24}/>} label="SACCOS & Finance" />
          <SectorCard icon={<TruckIcon />} label="Logistics & Supply" />
          <SectorCard icon={<GraduationCap size={24}/>} label="Education Systems" />
          <SectorCard icon={<Smartphone size={24}/>} label="Digital Commerce" />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-56 bg-pink-600 text-white text-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-tight mb-12 relative z-10">
          Ready for clarity<br/>and confidence?
        </h2>

        <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
          <Link href="/contact" className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl">
            Provision Axis Node
          </Link>
        </div>
      </section>

      {/* GLOBAL FOOTER INTEGRATION */}
      <GlobalFooter />
    </main>
  );
}

function SectorCard({ icon, label }: any) {
  return (
    <div className="p-8 border border-white/10 rounded-sm bg-white/[0.02] text-center hover:bg-white/[0.05] transition-all group">
      <div className="mb-4 text-slate-500 flex justify-center group-hover:text-pink-500 transition-colors">{icon}</div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white">
        {label}
      </p>
    </div>
  );
}