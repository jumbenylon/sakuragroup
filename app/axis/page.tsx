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

// --- CONFIG & ASSETS ---
const LOGO_URL = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070", // Team in a modern office
  whatsapp: "https://images.unsplash.com/photo-1573163281532-dd0f8114227c?auto=format&fit=crop&q=80&w=2070", // Close up of professional using phone
  enterprise: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070", // Architecture/Skyscraper
};

// --- COMPONENTS ---

const Nav = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
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
          className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-2xl border-b border-white/5 h-16 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <Image src={LOGO_URL} alt="Sakura Axis" width={80} height={30} className="brightness-200" />
            <div className="hidden lg:flex gap-12 relative">
              <LayoutGroup>
                {["Overview", "WhatsApp", "SMS", "Enterprise", "Developers"].map((item) => {
                  const id = item.toLowerCase();
                  return (
                    <a key={item} href={`#${id}`} className="relative text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors py-2">
                      {item}
                      {activeSection === id && (
                        <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-px bg-pink-500" />
                      )}
                    </a>
                  );
                })}
              </LayoutGroup>
            </div>
            <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all">
              Request Demo
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

// --- SECTIONS ---

const Hero = () => (
  <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-8 bg-[#020202]">
    <div className="max-w-5xl mx-auto text-center z-10">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pink-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-10">
        Unified Communications Infrastructure
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
          <Link href="/sales" className="px-14 py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
            Speak to Sales
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
      <div className="relative aspect-square overflow-hidden rounded-sm grayscale">
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
        <Link href="/whatsapp-waitlist" className="mt-16 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-pink-500/50 pb-2 hover:border-pink-500 transition-all">
          Join WhatsApp Rollout Waitlist <ChevronRight size={14} />
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
            <li className="flex gap-4"><Check size={16} className="text-pink-600"/> Rapid onboarding via product specialist</li>
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

// --- MAIN ---

export default function AxisSovereignFinal() {
  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      <Nav />
      <Hero />
      
      {/* Social Context Bar */}
      <section className="py-20 border-t border-white/5 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-8">
           <p className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-slate-600 mb-12">
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
          <Link href="/docs" className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/20 pb-2 hover:border-white">
            View API Overview
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-64 bg-[#050505] flex flex-col items-center text-center px-8 relative overflow-hidden">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 leading-none">Confidence<br/>In Communication.</h2>
        <div className="flex flex-col sm:flex-row gap-8">
          <Link href="/demo" className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">
            Book a Demo
          </Link>
          <Link href="/contact" className="px-16 py-6 border border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
            Contact Specialist
          </Link>
        </div>
      </section>

      <footer className="p-20 border-t border-white/5 text-center bg-[#020202]">
        <Image src={LOGO_URL} alt="Sakura" width={40} height={40} className="mx-auto mb-8 opacity-20" />
        <p className="text-[8px] font-mono uppercase tracking-[0.6em] text-slate-700">© 2026 SAKURA GROUP • DAR ES SALAAM • PRECISION INFRASTRUCTURE</p>
      </footer>
    </main>
  );
}
