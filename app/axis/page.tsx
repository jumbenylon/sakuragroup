"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring 
} from "framer-motion";
import { 
  ArrowRight, MessageCircle, Smartphone, 
  ShieldCheck, Landmark, Code, Check, 
  Lock, Globe, Zap, BarChart3, ChevronRight 
} from "lucide-react";

// --- CORE ASSETS ---
const LOGO_URL = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";

// --- SHARED COMPONENTS ---

const StickyNav = () => {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#020202]/80 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
        <Image src={LOGO_URL} alt="Sakura Axis" width={90} height={30} className="brightness-200" />
        <div className="hidden lg:flex gap-10">
          {["Overview", "WhatsApp", "SMS", "Enterprise", "Developers"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                activeSection === item.toLowerCase() ? "text-pink-500" : "text-white/40 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        <Link href="/contact" className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-6 py-2.5 rounded-sm hover:bg-pink-500 hover:text-white transition-all">
          Request a Demo
        </Link>
      </div>
    </nav>
  );
};

// --- SECTIONS ---

const Hero = () => (
  <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-8 overflow-hidden bg-[#020202]">
    <div className="max-w-5xl mx-auto text-center z-10">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-pink-500 font-mono text-[10px] tracking-[0.6em] uppercase mb-8"
      >
        Enterprise Communication Authority
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-6xl md:text-[100px] font-black leading-[0.9] tracking-tighter text-white uppercase italic mb-10"
      >
        Talk to your customers.<br/>
        <span className="text-white/20">The right way.</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-slate-400 max-w-2xl mx-auto mb-14 font-light leading-relaxed"
      >
        Send announcements, updates, and reminders across SMS and WhatsApp with verified identity and reliable delivery. Designed for SMEs, trusted by national institutions.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-6 justify-center"
      >
        <Link href="/sales" className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-pink-500 hover:text-white transition-all">
          Speak to Sales
        </Link>
        <Link href="/demo" className="px-12 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-all">
          Request a Demo
        </Link>
      </motion.div>
    </div>

    {/* Subtle Trust Bar */}
    <div className="absolute bottom-12 w-full text-center opacity-30">
      <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">
        Engineered for Retailers • SACCOs • Logistics • Education • Healthcare
      </p>
    </div>
  </section>
);

const WhatsAppSection = () => (
  <section id="whatsapp" className="py-40 px-8 bg-[#050505]">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
      <div>
        <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center rounded-sm mb-8">
          <MessageCircle className="text-green-500" size={24} />
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-8 leading-none">
          Business-Grade<br/>WhatsApp.
        </h2>
        <p className="text-slate-400 text-lg font-light mb-12 leading-relaxed">
          In Tanzania, business runs on WhatsApp. Axis provides the official API access to send order updates, SACCO notifications, and delivery coordination with zero-spam compliance.
        </p>
        <div className="space-y-4 mb-12">
          {["Automated order receipts", "SACCO contribution alerts", "Real-time delivery coordination"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
              <Check size={14} className="text-pink-500" /> {item}
            </div>
          ))}
        </div>
        <Link href="/whatsapp-waitlist" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white border-b border-pink-500/50 pb-2 hover:border-pink-500 transition-all">
          Join WhatsApp Rollout Waitlist <ChevronRight size={14} />
        </Link>
      </div>
      
      {/* Visual Placeholder for WhatsApp UI */}
      <div className="aspect-square bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-sm p-12 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="w-full h-full bg-black/40 border border-white/10 rounded-sm shadow-2xl relative z-10" />
      </div>
    </div>
  </section>
);

const SMSSecton = () => (
  <section id="sms" className="py-40 px-8 bg-[#020202] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-8">Scale &<br/>Reliability.</h2>
          <p className="text-slate-400 text-lg font-light">Built for teams that need messages to arrive—every time. From OTPs to national broadcasts, Axis ensures your brand name is trusted.</p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 p-10 text-center rounded-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Consumption-Based Billing</p>
          <p className="text-5xl font-black italic text-white">21 TZS <span className="text-xs font-normal text-slate-600">/ SMS</span></p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <UseCaseCard icon={<Lock />} title="Transactional" desc="OTPs and payment confirmations with sub-second latency." />
        <UseCaseCard icon={<Globe />} title="Broadcast" desc="National alerts and community notices delivered instantly." />
        <UseCaseCard icon={<BarChart3 />} title="Reporting" desc="Real-time delivery snapshots and audit-ready records." />
      </div>
    </div>
  </section>
);

function UseCaseCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 border border-white/5 bg-white/[0.01] rounded-sm group hover:border-pink-500/30 transition-all">
      <div className="mb-6 text-slate-500 group-hover:text-pink-500 transition-colors">{icon}</div>
      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-3">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed font-light">{desc}</p>
    </div>
  );
}

// --- MAIN PAGE ---

export default function AxisSovereignPage() {
  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth">
      <StickyNav />
      <Hero />

      {/* Why SMEs Section */}
      <section className="py-40 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <Pillar title="Clarity" desc="No complex dashboards. Create, send, and track messages in minutes." />
          <Pillar title="Credibility" desc="Approved sender IDs, delivery transparency, and audit-ready records." />
          <Pillar title="Control" desc="Pay only for what you send — no platform fees, no hidden cost." />
        </div>
      </section>

      <WhatsAppSection />
      <SMSSecton />

      {/* Enterprise vs SME Mode */}
      <section id="enterprise" className="py-40 px-8 bg-white text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-black/10 border border-black/10">
          <div className="bg-white p-20">
            <h3 className="text-2xl font-black uppercase italic mb-10">SME Mode</h3>
            <ul className="space-y-6 text-sm font-medium opacity-60">
              <li>• Instant onboarding via sales</li>
              <li>• Prepaid usage model</li>
              <li>• Simple sender ID approvals</li>
            </ul>
          </div>
          <div className="bg-white p-20 border-l border-black/10">
            <h3 className="text-2xl font-black uppercase italic mb-10 text-pink-600">Enterprise Mode</h3>
            <ul className="space-y-6 text-sm font-medium opacity-60">
              <li>• Multi-role admin controls</li>
              <li>• Immutable financial ledger</li>
              <li>• Compliance-first workflows</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section id="developers" className="py-40 px-8 bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center rounded-sm mb-12">
            <Code className="text-blue-500" size={24} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-8">Built for Builders.</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto mb-16 font-light">REST API. Webhooks. Delivery reporting. Integrate Axis into your existing systems in minutes.</p>
          <Link href="/api-docs" className="text-[10px] font-black uppercase tracking-widest text-white border-b border-white/20 pb-2 hover:border-white">
            View API Overview
          </Link>
        </div>
      </section>

      {/* High Intent Footer */}
      <section className="py-64 bg-pink-600 text-white flex flex-col items-center text-center px-8">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 leading-none">Upgrade Your<br/>Communication.</h2>
        <div className="flex flex-col sm:flex-row gap-8">
          <Link href="/demo" className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all">
            Book a Demo
          </Link>
          <Link href="/contact" className="px-16 py-6 border border-white/30 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/10 transition-all">
            Speak to a Specialist
          </Link>
        </div>
      </section>

      <footer className="p-16 border-t border-white/5 text-center opacity-20 grayscale">
        <Image src={LOGO_URL} alt="Sakura" width={40} height={40} className="mx-auto mb-8" />
        <p className="text-[9px] font-mono uppercase tracking-[0.5em]">Sakura Axis • Precision Infrastructure 2026</p>
      </footer>
    </main>
  );
}

function Pillar({ title, desc }: any) {
  return (
    <div className="space-y-6">
      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-pink-500">{title}</h4>
      <p className="text-xl text-white font-light leading-relaxed">{desc}</p>
    </div>
  );
}
