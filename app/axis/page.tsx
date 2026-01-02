"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  MessageCircle,
  Smartphone,
  Check, // Critical: Restored for build
  ChevronRight,
  Building2, // Critical: Restored for build
  GraduationCap // Critical: Restored for build
} from "lucide-react";

// BRAND ASSETS
const LOGO_AXIS = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";
const LOGO_GROUP = "https://storage.googleapis.com/sakura-web/sakura-logo-v2.png";

// ---------------- GLOBAL NAVBAR ----------------
const GlobalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[150] transition-all duration-700 
      ${isScrolled ? "h-16 bg-black/80 backdrop-blur-2xl border-b border-white/5" : "h-24 bg-transparent"}
    `}>
      <div className="max-w-7xl mx-auto h-full px-8 flex justify-between items-center">
        <Link href="/">
          <Image src={LOGO_GROUP} alt="Sakura Group" width={100} height={32} className="brightness-200" />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {["Axis", "Logistics", "Industrial", "Hosting"].map(link => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors">
              {link}
            </Link>
          ))}
        </div>

        <Link href="/contact" className="px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-pink-600 hover:text-white transition-all">
          Speak to Sales
        </Link>
      </div>
    </nav>
  );
};

// ---------------- SUB NAV ----------------
const AxisSubNav = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 150);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-16 w-full z-[140] bg-black/50 backdrop-blur-md border-b border-white/5 h-12 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <span className="text-[9px] font-black uppercase tracking-widest text-pink-500 italic">
              Axis by Sakura
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

// ---------------- CUSTOM ICON ----------------
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

// ---------------- MAIN PAGE ----------------
export default function AxisPlatformPage() {
  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      <GlobalNavbar />
      <AxisSubNav />

      {/* HERO */}
      <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center text-center px-8">
        <div className="max-w-5xl z-10">
          <p className="text-pink-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-10 italic">
            Unified Communication Platform
          </p>

          <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
            Talk to your customers.
            <br/>
            <span className="text-slate-300 not-italic normal-case font-light tracking-tight">
              The right way — with trust, clarity, and identity.
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Axis helps Tanzanian businesses communicate across WhatsApp and SMS —
            delivering updates, confirmations, reminders and broadcasts with verified sender
            identity, reliable delivery, and accountability your customers can trust.
          </p>

          <div className="mt-12 flex justify-center gap-6">
            <Link href="/contact" className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
              Request a Demo
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 opacity-40">
          <p className="text-[9px] tracking-[0.4em] uppercase text-slate-500">
            Built for SMEs • SACCOS • Logistics • Schools • Community Programs
          </p>
        </div>
      </section>

      {/* WHATSAPP */}
      <section id="whatsapp" className="py-40 px-8 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

          <div className="bg-white/5 border border-white/10 aspect-video rounded-sm overflow-hidden grayscale opacity-70">
            <Image 
              src="https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1200"
              alt="Professional Business Engagement"
              width={1200}
              height={600}
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-10">
              WhatsApp — where business happens.
            </h2>

            <p className="text-slate-400 text-lg font-light mb-10 leading-relaxed">
              From community groups to delivery updates, SACCOS reminders, wedding committees,
              retail orders and school announcements — Tanzanians run life on WhatsApp.
              Axis helps you communicate there properly, respectfully, and at scale.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Send order confirmations, receipts and follow-ups without manual copy-paste",
                "Notify members about meetings, payments and announcements with confidence",
                "Coordinate events, deliveries and field operations with structured messaging",
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="text-pink-500 mt-0.5" size={14} /> {item}
                </div>
              ))}
            </div>

            <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest text-pink-500 border-b border-pink-500/40 pb-2 flex items-center gap-2 w-fit">
              Join WhatsApp Rollout Waitlist <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SMS */}
      <section id="sms" className="py-40 px-8 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">

          <div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-6 text-white">
              SMS for operational trust.
            </h2>

            <p className="text-slate-400 text-lg font-light max-w-xl leading-relaxed">
              When a message must be seen — alerts, confirmations, notices, critical updates —
              SMS remains the most dependable channel. Axis delivers with verified sender names,
              predictable billing, and audit-ready transparency.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-12 text-center rounded-sm min-w-[320px]">
            <p className="text-5xl font-black italic text-white">
              21 TZS <span className="text-[10px] font-normal not-italic tracking-widest text-slate-600">/ SMS</span>
            </p>
            <p className="text-[9px] text-slate-500 mt-4 uppercase tracking-[0.3em]">
              Transparent • No Platform Fees • Pay Only for Use
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          <SectorCard icon={<Building2 />} label="SACCOS & Cooperatives" />
          <SectorCard icon={<TruckIcon />} label="Logistics & Delivery Ops" />
          <SectorCard icon={<GraduationCap />} label="Schools & Training" />
          <SectorCard icon={<Smartphone />} label="Retail & Service Brands" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-56 bg-pink-600 text-white text-center px-8 relative overflow-hidden">
        {/* Subtle background pattern for premium feel */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-tight mb-12 relative z-10">
          Ready to communicate with clarity<br/>and confidence?
        </h2>

        <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
          <Link href="/contact" className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl">
            Book a Demo
          </Link>
          <Link href="/contact" className="px-16 py-6 border border-white/30 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all">
            Speak to a Specialist
          </Link>
        </div>
      </section>

      <footer className="p-16 border-t border-white/5 text-center bg-[#020202]">
        <Image src={LOGO_AXIS} alt="Axis" width={40} height={40} className="mx-auto mb-6 opacity-30" />
        <p className="text-[9px] tracking-[0.5em] uppercase text-slate-700 font-mono">
          Axis by Sakura • Precision Communication Infrastructure • 2026
        </p>
      </footer>
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
