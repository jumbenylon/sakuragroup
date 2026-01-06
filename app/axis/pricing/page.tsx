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
  MessageCircle
} from "lucide-react";


// --- SUBNAV COMPONENT ---
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
      className="fixed top-16 w-full z-[90] bg-[#020617]/90 backdrop-blur-xl border-b border-emerald-500/10 h-12 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 italic flex items-center gap-2">
          <MessageCircle size={12} className="text-emerald-500" />
          Customers Like To Chat
        </span>
        <div className="flex gap-8">
          {[
            { n: "SMS Core", l: "/axis#sms" },
            { n: "WhatsApp", l: "/axis#whatsapp" },
            { n: "Pricing", l: "/axis/pricing" },
            { n: "Use Cases", l: "/axis/industries" },
            { n: "Developers", l: "/axis/developers" }
          ].map((item) => (
            <Link key={item.n} href={item.l} className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">
              {item.n}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// --- PRICING DATA ---
const SMS_FEATURES = [
  "Verified Sender ID (e.g. 'SAKURA')",
  "Real-time Delivery Reports (DLR)",
  "Network-agnostic (Voda, Tigo, Airtel, Halotel)",
  "99.9% API Uptime SLA",
  "No monthly subscription fees",
  "Credits never expire"
];

const WA_FEATURES = [
  "Green Tick Verification Assistance",
  "Unlimited Agents (via Axis Dashboard)",
  "Template Message Management",
  "Interactive Buttons & Lists",
  "24-Hour Conversation Windows",
  "Direct Meta Billing Transparency"
];

export default function AxisPricingPage() {
  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 font-sans min-h-screen">
      
      <AxisSubNav />

      {/* 1. HERO: THE LEDGER */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">Transparent Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Pricing without<br/>
            <span className="text-slate-500">Shadows.</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
            Industrial-grade messaging at utility rates. Pay only for what you transmit. 
            No hidden setups. No "maintenance" skimming.
          </p>
        </div>
      </section>

      {/* 2. THE DUAL CORE */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          
          {/* SMS NODE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0b1121] border border-white/10 rounded-xl p-10 relative overflow-hidden hover:border-emerald-500/30 transition-all duration-500 group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <Smartphone size={32} className="text-emerald-500" />
            </div>

            <h2 className="text-2xl font-black uppercase italic tracking-widest mb-2">Sovereign SMS</h2>
            <p className="text-sm text-slate-400 font-mono uppercase tracking-widest mb-10">Transactional & Marketing</p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-7xl font-black text-white tracking-tighter">21</span>
              <div className="text-left">
                <span className="block text-xl font-bold text-emerald-500">TZS</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Per Message</span>
              </div>
            </div>

            <div className="h-px w-full bg-white/10 mb-8" />

            <ul className="space-y-4 mb-12">
              {SMS_FEATURES.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link href="/contact" className="block w-full py-4 text-center bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-500 hover:text-white transition-all">
              Provision SMS Node
            </Link>
            <p className="text-center text-[9px] text-slate-600 mt-4 uppercase tracking-widest">
              *One-time Sender ID Registration Fee Applies (TCRA)
            </p>
          </motion.div>

          {/* WHATSAPP NODE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0b1121] border border-white/10 rounded-xl p-10 relative overflow-hidden hover:border-[#25D366]/30 transition-all duration-500 group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <MessageSquare size={32} className="text-[#25D366]" />
            </div>

            <h2 className="text-2xl font-black uppercase italic tracking-widest mb-2">WhatsApp API</h2>
            <p className="text-sm text-slate-400 font-mono uppercase tracking-widest mb-10">Engagement & Support</p>

            <div className="mb-8">
               <div className="text-4xl font-black text-white tracking-tighter mb-2">Passthrough</div>
               <p className="text-sm text-slate-400 leading-relaxed">
                 We charge exactly what Meta charges + a small infrastructure fee. You never pay a markup on the conversation itself.
               </p>
            </div>

            <div className="bg-[#0f172a] p-6 rounded-lg border border-white/5 mb-8">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-xs text-slate-300 font-bold uppercase">Meta Conversation Cost</span>
                 <span className="text-xs text-slate-500 font-mono">VARIES BY TYPE</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-xs text-emerald-400 font-bold uppercase">Axis Infrastructure Fee</span>
                 <span className="text-xs text-emerald-400 font-mono">LOW FLAT RATE</span>
               </div>
            </div>

            <ul className="space-y-4 mb-12">
              {WA_FEATURES.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check size={16} className="text-[#25D366] mt-0.5 shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <Link href="/contact" className="block w-full py-4 text-center border border-white/20 text-white font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-[#25D366] hover:text-black hover:border-[#25D366] transition-all">
              Request API Access
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 3. VOLUME & ENTERPRISE */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#0f172a] to-[#020617] border border-white/10 p-12 rounded-2xl flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
             <div className="flex items-center gap-4 mb-6">
                <Shield className="text-emerald-500" size={32} />
                <h3 className="text-3xl font-black uppercase italic">High Volume?</h3>
             </div>
             <p className="text-slate-400 leading-relaxed">
               For banks, SACCOs, and logistics firms transmitting over <strong>100,000 messages/month</strong>, 
               we offer dedicated throughput channels and volume-tiered discounting.
             </p>
           </div>
           <div>
             <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-900/20 text-emerald-400 border border-emerald-500/50 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
               Talk to Enterprise Sales <Zap size={16} />
             </Link>
           </div>
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-center">Operational Clarifications</h3>
          <div className="space-y-6">
            <div className="p-6 bg-white/5 border border-white/5 rounded-lg">
              <h4 className="flex items-center gap-3 text-sm font-bold uppercase text-white mb-2">
                <HelpCircle size={16} className="text-slate-500" />
                What is the "Sender ID" fee?
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed pl-7">
                This is a compliance fee charged by TCRA and mobile networks to register your brand name (e.g., "SAKURA"). 
                It is a one-time setup cost that we pass through directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}