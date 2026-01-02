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
  ShieldCheck, Landmark, Code, Check, 
  Lock, Globe, Zap, BarChart3, ChevronRight,
  Users, Building2, GraduationCap, Truck
} from "lucide-react";

// --- IMPORT GLOBAL WRAPPERS ---
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- CONFIG & ASSETS ---
const LOGO_AXIS = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
  whatsapp: "https://images.unsplash.com/photo-1573163281532-dd0f8114227c?auto=format&fit=crop&q=80&w=2070",
  enterprise: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
};

// --- SUPPORTING IN-PAGE NAVIGATION ---
const AxisSubNav = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // Stickiness starts after GlobalNavbar height (approx 80px)
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isSticky && (
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
          className="fixed top-16 w-full z-[90] bg-black/60 backdrop-blur-xl border-b border-white/5 h-12 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <Image src={LOGO_AXIS} alt="Axis" width={60} height={20} className="brightness-200" />
               <div className="w-px h-4 bg-white/10 mx-2" />
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-pink-500">Console</span>
            </div>
            <div className="hidden lg:flex gap-10 relative">
              <LayoutGroup>
                {["Overview", "WhatsApp", "SMS", "Enterprise", "Developers"].map((item) => {
                  const id = item.toLowerCase();
                  return (
                    <a key={item} href={`#${id}`} className="relative text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors py-1">
                      {item}
                      {activeSection === id && (
                        <motion.div layoutId="subnav-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500" />
                      )}
                    </a>
                  );
                })}
              </LayoutGroup>
            </div>
            <Link href="/axis/login" className="text-[9px] font-black uppercase tracking-widest text-pink-500 flex items-center gap-2">
              Login <ArrowRight size={12} />
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

// --- SECTIONS (RETAINED FROM SOVEREIGN BUILD) ---

const Hero = () => (
  <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-8 bg-[#020202]">
    <div className="max-w-5xl mx-auto text-center z-10">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-10">
        Precision Communication Engine
      </motion.p>
      <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter text-white uppercase italic mb-8">
        Talk to your customers.<br/>
        <span className="text-slate-200 not-italic normal-case font-light tracking-tight">The right way.</span>
      </h1>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
        Send announcements, updates, and reminders across SMS and WhatsApp with verified identity and operational certainty. Designed for SMEs, trusted by national institutions.
      </p>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/axis/signup" className="px-14 py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
            Get Started with Axis
          </Link>
          <Link href="/demo" className="px-14 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
            Request a Demo
          </Link>
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-medium border-t border-white/5 pt-6">
          Verified delivery • Trusted identity • Built for stability
        </p>
      </div>
    </div>
  </section>
);

const WhatsAppSection = () => (
  <section id="whatsapp" className="py-48 px-8 bg-[#050505] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
      <div className="relative aspect-square overflow-hidden rounded-sm grayscale shadow-2xl">
        <Image src={IMAGES.whatsapp} alt="WhatsApp Engagement" fill className="object-cover" />
        <div className="absolute inset-0 bg-pink-500/10 mix-blend-overlay" />
      </div>
      <div>
        <p className="text-pink-500 font-mono text-[9px] tracking-[0.5em] uppercase mb-6">WhatsApp Business API</p>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-10 leading-none">
          Relational<br/>Messaging.
        </h2>
        <div className="space-y-10">
          <WorkflowItem title="Automated Continuity" desc="Send order confirmations and receipts automatically, ensuring your customers never have to ask 'where is my order?'" />
          <WorkflowItem title="Community Governance" desc="Manage SACCO alerts and contribution payout notices with 100% read-receipt transparency." />
          <WorkflowItem title="Operational Coordination" desc="Direct location pins and delivery updates for logistics fleets—coordinated without manual intervention." />
        </div>
        <Link href="/axis/signup" className="mt-16 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-pink-500/50 pb-2 hover:border-pink-500 transition-all">
          Connect WhatsApp Channel <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  </section>
);

const SMSSecton = () => (
  <section id="sms" className="py-48 px-8 bg-[#020202]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
        <div className="max-w-2xl">
          <p className="text-pink-500 font-mono text-[9px] tracking-[0.5em] uppercase mb-6">Bulk SMS Gateway</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-8">Built for<br/>Operational Trust.</h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            Axis delivers SMS through direct carrier interconnects. No random numbers. No grey routes. Just high-priority delivery your customers recognize and trust.
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/10 p-12 text-center rounded-sm min-w-[300px]">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4">Transparent Consumption Billing</p>
          <p className="text-5xl font-black text-white italic">21 TZS <span className="text-[10px] font-normal text-slate-600 not-italic tracking-widest">/ SMS</span></p>
          <p className="text-[9px] text-slate-500 mt-6 uppercase tracking-widest">No platform fees • No credit loss</p>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        <UseCase icon={<Smartphone size={18}/>} title="OTPs & Alerts" />
        <UseCase icon={<Building2 size={18}/>} title="SACCO Reminders" />
        <UseCase icon={<GraduationCap size={18}/>} title="School Notices" />
        <UseCase icon={<Truck size={18}/>} title="Fleet Updates" />
      </div>
    </div>
  </section>
);

const EnterpriseSection = () => (
  <section id="enterprise" className="py-48 px-8 bg-white text-black">
    <div className="max-w-7xl mx-auto">
      <p className="text-pink-600 font-mono text-[9px] tracking-[0.5em] uppercase mb-6">Risk & Continuity</p>
      <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter italic uppercase mb-16">Designed for Responsibility.</h2>
      <div className="grid md:grid-cols-2 gap-px bg-black/5 border border-black/5">
        <div className="bg-white p-16">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-slate-400">SME Operations</h3>
          <ul className="space-y-6 text-base font-light opacity-80">
            <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Rapid onboarding via digital signup</li>
            <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Pre-calculated costs before sending</li>
            <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Simple brand-identity (Sender ID) setup</li>
          </ul>
        </div>
        <div className="bg-white p-16 border-l border-black/5">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-slate-400">Corporate Governance</h3>
          <ul className="space-y-6 text-base font-light opacity-80">
            <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Immutable, audit-ready financial ledger</li>
            <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Role-based access & approval workflows</li>
            <li className="flex gap-4"><Check size={16} className="text-pink-600"/> High-volume API orchestration (50k/burst)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// --- HELPERS ---

const WorkflowItem = ({ title, desc }: any) => (
  <div className="group">
    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-pink-500 transition-colors">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed font-light">{desc}</p>
  </div>
);

const UseCase = ({ icon, title }: any) => (
  <div className="flex flex-col items-center p-8 bg-white/[0.02] border border-white/5 rounded-sm grayscale opacity-50 hover:opacity-100 transition-all">
    <div className="mb-4 text-white">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest text-center">{title}</span>
  </div>
);

// --- MAIN WRAPPER ---

export default function AxisSovereignStacked() {
  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      {/* PRIMARY GLOBAL HEADER */}
      <GlobalNavbar />

      {/* SECONDARY AXIS SUB-NAV (Triggers on scroll) */}
      <AxisSubNav />

      <Hero />
      
      {/* Social Context Bar */}
      <section className="py-20 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-8 text-center">
           <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-600 mb-12">
             Providing essential infrastructure for
           </p>
           <div className="flex flex-wrap justify-center gap-16 opacity-30">
              {["Logistics", "Retail", "SACCOs", "Clinics", "Schools"].map(t => (
                <span key={t} className="text-xs font-black uppercase tracking-[0.3em] italic">{t}</span>
              ))}
           </div>
        </div>
      </section>

      <WhatsAppSection />
      <SMSSecton />
      <EnterpriseSection />

      {/* Developer Section */}
      <section id="developers" className="py-48 px-8 bg-[#020202]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Code className="text-blue-500 mb-10" size={32} />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-10">Architected for Stability.</h2>
          <p className="text-slate-500 text-lg mb-12 font-light">
            A clean, well-documented API designed for long-term operational reliability. REST triggers, webhooks, and exhaustive delivery audit logs.
          </p>
          <Link href="/axis/signup" className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/20 pb-2 hover:border-white">
            View API Overview
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-64 bg-[#050505] flex flex-col items-center text-center px-8 relative overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 leading-none">Confidence<br/>In Communication.</h2>
        <div className="flex flex-col sm:flex-row gap-8">
          <Link href="/axis/signup" className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-pink-500 hover:text-white transition-all">
            Get Started
          </Link>
          <Link href="/contact" className="px-16 py-6 border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-white/5 transition-all">
            Speak to a Specialist
          </Link>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
}
