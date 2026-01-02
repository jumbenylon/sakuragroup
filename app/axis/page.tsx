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
  Check, ChevronRight, Building2, GraduationCap,
  Menu, X
} from "lucide-react";

// --- GLOBAL REFS ---
const LOGO_AXIS = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";
const LOGO_GROUP = "https://storage.googleapis.com/sakura-web/sakura-logo-v2.png";

// ACTION REQUIRED: Download high-quality unsplash images and save as:
// /public/images/axis-hero.jpg
// /public/images/axis-whatsapp.jpg
// /public/images/axis-enterprise.jpg

// --- 1. GLOBAL NAVBAR (PARENT BRAND) ---
const GlobalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[150] transition-all duration-700 ${isScrolled ? "h-16 bg-black/80 backdrop-blur-2xl border-b border-white/5" : "h-24 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto h-full px-8 flex justify-between items-center">
        <Link href="/">
          <Image src={LOGO_GROUP} alt="Sakura Group" width={100} height={32} className="brightness-200" />
        </Link>
        <div className="hidden lg:flex items-center gap-10">
          {["Axis", "Logistics", "Industrial", "Hosting"].map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors">
              {link}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Link href="/axis/signup" className="px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-pink-600 hover:text-white transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- 2. AXIS SUB-NAV (PRODUCT CONTEXT) ---
const AxisSubNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
          className="fixed top-16 w-full z-[140] bg-black/40 backdrop-blur-md border-b border-white/5 h-12 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-pink-500 italic">Axis Gateway</span>
            </div>
            <div className="flex gap-8">
              {["Overview", "WhatsApp", "SMS"].map((item) => (
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

// --- 3. CUSTOM ICONS (NAMESPACE FIXED) ---
const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5h-7v6h2"/><path d="M13 9h4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);

// --- MAIN ---
export default function AxisFinalBuild() {
  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      <GlobalNavbar />
      <AxisSubNav />
      
      {/* HERO */}
      <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center text-center px-8">
        <div className="max-w-5xl z-10">
          <p className="text-pink-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-10 italic">Infrastructure Platform</p>
          <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
            Talk to your customers.<br/>
            <span className="text-slate-400 not-italic normal-case font-light tracking-tight">The right way.</span>
          </h1>
          <div className="mt-12 flex justify-center gap-6">
            <Link href="/axis/signup" className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
              Launch Console
            </Link>
          </div>
        </div>
      </section>

      {/* WHATSAPP (Outcome based) */}
      <section id="whatsapp" className="py-40 px-8 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="bg-white/5 border border-white/10 aspect-video rounded-sm flex items-center justify-center grayscale opacity-30">
             {/* Using stable Unsplash ID for direct reliability */}
             <Image 
               src="https://images.unsplash.com/photo-1573163281532-dd0f8114227c?auto=format&fit=crop&q=80&w=800" 
               alt="Engagement" 
               width={800} height={450} 
               className="object-cover" 
             />
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none mb-10">Relational<br/>Messaging.</h2>
            <p className="text-slate-500 text-lg font-light mb-12">Automate receipts, contribution alerts, and delivery pins on the channel Tanzania uses most.</p>
            <Link href="/axis/signup" className="text-[10px] font-black uppercase tracking-widest text-pink-500 border-b border-pink-500/30 pb-2">Join WhatsApp Waitlist</Link>
          </div>
        </div>
      </section>

      {/* SMS (21 TZS) */}
      <section id="sms" className="py-40 px-8 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none">Operational<br/>Trust.</h2>
          <div className="bg-white/[0.02] border border-white/10 p-12 text-center rounded-sm">
            <p className="text-5xl font-black italic text-white">21 TZS <span className="text-[10px] font-normal not-italic tracking-widest text-slate-600">/ SMS</span></p>
            <p className="text-[9px] text-slate-500 mt-4 uppercase tracking-[0.3em]">No Platform Fees</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 opacity-30 grayscale">
            <div className="p-8 border border-white/5 text-center text-[10px] font-black uppercase tracking-widest"><Building2 className="mx-auto mb-4"/> SACCOs</div>
            <div className="p-8 border border-white/5 text-center text-[10px] font-black uppercase tracking-widest"><TruckIcon /> Logistics</div>
            <div className="p-8 border border-white/5 text-center text-[10px] font-black uppercase tracking-widest"><GraduationCap className="mx-auto mb-4"/> Schools</div>
            <div className="p-8 border border-white/5 text-center text-[10px] font-black uppercase tracking-widest"><Smartphone className="mx-auto mb-4"/> Retail</div>
        </div>
      </section>

      <footer className="p-20 border-t border-white/5 text-center bg-[#020202]">
        <p className="text-[8px] font-mono uppercase tracking-[0.6em] text-slate-700">© 2026 SAKURA GROUP • AXIS GATEWAY</p>
      </footer>
    </main>
  );
}

function Pillar({ title, desc }: any) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-pink-500">{title}</h4>
      <p className="text-xl font-light text-slate-200">{desc}</p>
    </div>
  );
}
