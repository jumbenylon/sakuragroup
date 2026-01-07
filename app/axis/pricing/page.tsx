"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  HelpCircle, 
  Smartphone,
  MessageSquare,
  Shield,
  Zap,
  MessageCircle,
  ArrowRight
} from "lucide-react";

/**
 * Axis Pricing Gateway - Simple English Implementation
 * Cites: Features the 21 TZS/SMS local rate and Meta Passthrough logic.
 */

const AxisSubNav = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      className="fixed top-0 w-full z-[100] bg-[#020617]/90 backdrop-blur-xl border-b border-emerald-500/10 h-16 flex items-center px-8"
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/axis" className="text-sm font-black uppercase tracking-widest text-white italic">
          Axis<span className="text-emerald-500">.</span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/axis#sms" className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">SMS</Link>
          <Link href="/axis#whatsapp" className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">WhatsApp</Link>
          <Link href="/axis/signup" className="px-5 py-2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm">Sign Up Today</Link>
        </div>
      </div>
    </motion.nav>
  );
};

const SMS_FEATURES = [
  "Verified Sender ID (e.g. 'SAKURA')",
  "Real-time Delivery Reports (DLR)",
  "Vodacom, Tigo, Airtel, Halotel Direct",
  "99.9% API Uptime SLA",
  "No monthly subscription fees",
  "Credits never expire"
];

const WA_FEATURES = [
  "Green Tick Verification Assistance",
  "Template Message Management",
  "Interactive Buttons & Lists",
  "24-Hour Conversation Windows",
  "Direct Meta Billing Transparency",
  "Official WhatsApp Business API"
];

export default function AxisPricingPage() {
  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 font-sans min-h-screen pb-20">
      <AxisSubNav />

      {/* 1. HERO SECTION */}
      <section className="pt-48 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-black">Pricing & Transparency</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]"
          >
            Simple English<br/>
            <span className="text-slate-500">Pricing.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Industrial messaging at utility rates. Pay only for what you transmit. 
            No hidden setups. No "maintenance" skimming.
          </motion.p>
        </div>
      </section>

      {/* 2. PRICING CARDS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          
          {/* SMS NODE */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0b1121] border border-white/10 rounded-3xl p-12 relative overflow-hidden hover:border-emerald-500/30 transition-all duration-500 group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">
              <Smartphone size={40} className="text-emerald-500" />
            </div>

            <h2 className="text-3xl font-black uppercase italic tracking-widest mb-2">Sovereign SMS</h2>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-12">Transactional & Marketing</p>

            <div className="flex items-baseline gap-3 mb-10">
              <span className="text-8xl font-black text-white tracking-tighter">21</span>
              <div className="text-left">
                <span className="block text-2xl font-bold text-emerald-500 italic">TZS</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">Per Message</span>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5 mb-10" />

            <ul className="space-y-5 mb-14">
              {SMS_FEATURES.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-slate-300 font-medium">
                  <Check size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link href="/axis/signup" className="block w-full py-6 text-center bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-sm hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-white/5">
              Sign Up Today
            </Link>
          </motion.div>

          {/* WHATSAPP NODE */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0b1121] border border-white/10 rounded-3xl p-12 relative overflow-hidden hover:border-[#25D366]/30 transition-all duration-500 group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">
              <MessageSquare size={40} className="text-[#25D366]" />
            </div>

            <h2 className="text-3xl font-black uppercase italic tracking-widest mb-2">WhatsApp API</h2>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-12">Conversational Node</p>

            <div className="mb-12">
               <h3 className="text-4xl font-black text-white tracking-tighter mb-4 italic leading-none">Meta Passthrough</h3>
               <p className="text-sm text-slate-400 leading-relaxed font-medium">
                 We charge exactly what Meta charges + a small flat infrastructure fee. 
                 Zero markups on conversational units.
               </p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-12 space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Meta Unit Cost</span>
                 <span className="text-[10px] text-slate-500 font-mono">ESTIMATED RATE</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Axis Gateway Fee</span>
                 <span className="text-[10px] text-emerald-400 font-mono font-black italic">LOW FLAT RATE</span>
               </div>
            </div>

            <ul className="space-y-5 mb-14">
              {WA_FEATURES.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-slate-300 font-medium">
                  <Check size={18} className="text-[#25D366] shrink-0 mt-0.5" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link href="/axis/signup" className="block w-full py-6 text-center border-2 border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-sm hover:bg-[#25D366] hover:text-black hover:border-[#25D366] transition-all">
              Sign Up Today
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 3. CLARIFICATIONS */}
      <section className="py-20 px-6 max-w-3xl mx-auto space-y-10">
        <h3 className="text-xl font-black uppercase tracking-[0.3em] text-center italic">Operational Logic</h3>
        <div className="p-8 bg-white/5 border border-white/5 rounded-2xl space-y-4">
           <h4 className="flex items-center gap-3 text-xs font-black uppercase text-emerald-500 tracking-widest">
             <HelpCircle size={16} /> What is the "Sender ID" fee?
           </h4>
           <p className="text-sm text-slate-400 leading-relaxed pl-7 font-medium">
             This is a one-time compliance fee charged by TCRA and the mobile network operators 
             to register and whitelist your brand name (e.g., "SAKURA"). 
             Axis passes this cost through directly without surcharges.
           </p>
        </div>
      </section>
    </main>
  );
}
