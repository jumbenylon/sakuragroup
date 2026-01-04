"use client";

import React, { useState, useEffect } from "react";
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

// ---------------- SUB NAV (Fixed Z-Index & Position) ----------------
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
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          // Elevated Z-Index (140) but below Global Navbar (150)
          className="fixed top-16 w-full z-[140] bg-[#020202]/80 backdrop-blur-2xl border-b border-white/5 h-12 flex items-center"
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
    // Added 'relative' and ensured Z-Index context is clear
    <main className="relative bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      
      {/* 1. MASTER NAVIGATION (Fixed to Z-150) */}
      <GlobalNavbar />
      
      {/* 2. PRODUCT NAVIGATION (Fixed to Z-140) */}
      <AxisSubNav />

      {/* HERO SECTION - Added pt-32 to prevent Navbar overlap */}
      <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 pt-32 lg:pt-40">
        <div className="max-w-6xl z-10">
          <p className="text-pink-500 font-mono text-[10px] tracking-[0.6em] uppercase mb-12 italic animate-pulse">
            Unified Communication Node
          </p>

          <h1 className="text-6xl md:text-[110px] font-black leading-[0.82] tracking-tighter uppercase italic mb-10">
            Talk to your customers.
          </h1>
          
          {/* Typographic Fix: Reduced scale for functional purity */}
          <p className="text-xl md:text-3xl text-slate-300 font-light tracking-tight max-w-4xl mx-auto mb-12">
            The right way — with absolute trust, clarity, and verified identity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
            <Link href="/contact" className="px-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all duration-500">
              Request Demo
            </Link>
            <Link href="/signup" className="px-12 py-5 border border-white/20 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all duration-500">
              Create Account
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 opacity-30">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-slate-500">
            Infrastructure for SMEs • SACCOS • Logistics • Governance
          </p>
        </div>
      </section>

      {/* WHATSAPP SECTION */}
      <section id="whatsapp" className="py-40 px-8 bg-[#050505] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">

          {/* Fixed Image Container: High-end Grayscale treatment */}
          <div className="relative aspect-video rounded-sm overflow-hidden border border-white/10 bg-white/5 group">
            <Image 
              src="https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1200"
              alt="Professional Business Engagement"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-100 scale-110 group-hover:scale-100"
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none">
              WhatsApp — The business standard.
            </h2>

            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Tanzania runs on WhatsApp. Axis provides the API-grade tools to manage these conversations properly, respectfully, and at scale.
            </p>

            <div className="space-y-4">
              {[
                "Automated delivery updates & tracking numbers",
                "Verified payment notifications for cooperatives",
                "Scalable school & administrative announcements",
              ].map(item => (
                <div key={item} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" /> {item}
                </div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-pink-500 border-b border-pink-500/20 pb-2 hover:border-pink-500 transition-all">
              Join the API Rollout <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SMS SECTION */}
      <section id="sms" className="py-40 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-tight mb-8">
              Operational trust via SMS.
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Dependable delivery with verified sender names. When a message must be seen, SMS remains the bedrock of operational certainty.
            </p>
          </div>

          <div className="relative bg-white/[0.03] border border-white/5 p-16 text-center rounded-sm backdrop-blur-lg">
            <p className="text-6xl font-black italic text-white mb-2">
              21 TZS
            </p>
            <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              Per Message • No Hidden Fees
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mt-32">
          <SectorCard icon={<Building2 size={24}/>} label="Finance & SACCOS" />
          <SectorCard icon={<TruckIcon />} label="Logistics Nodes" />
          <SectorCard icon={<GraduationCap size={24}/>} label="Education Admin" />
          <SectorCard icon={<Smartphone size={24}/>} label="Retail Brands" />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-60 bg-pink-600 text-white text-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.