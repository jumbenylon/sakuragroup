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
  Menu, X // Added for Mobile Global Nav support
} from "lucide-react";

// --- CONFIG & ASSETS ---
const LOGO_AXIS = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";
const LOGO_GROUP = "https://storage.googleapis.com/sakura-web/sakura-logo-v2.png";

// --- 1. GLOBAL NAVBAR (REFINED & CLEAN) ---
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

// --- 2. AXIS SUB-NAV (FUNCTIONAL & SMOOTH) ---
const AxisSubNav = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => { window.removeEventListener("scroll", handleScroll); observer.disconnect(); };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
          className="fixed top-16 w-full z-[140] bg-black/40 backdrop-blur-md border-b border-white/5 h-12 flex items-center"
        >
          <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
            <div className="flex items-center gap-4 text-pink-500 font-black text-[9px] uppercase tracking-widest italic">
              <Image src={LOGO_AXIS} alt="Axis" width={60} height={20} className="brightness-200" />
              <span>Gateway</span>
            </div>
            <div className="hidden lg:flex gap-10">
              {["Overview", "WhatsApp", "SMS", "Enterprise"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${activeSection === item.toLowerCase() ? "text-pink-500" : "text-white/40 hover:text-white"}`}>
                  {item}
                </a>
              ))}
            </div>
            <Link href="/axis/login" className="text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-white flex items-center gap-2">
              Login <ArrowRight size={12} />
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

// --- 3. CUSTOM SVG COMPONENTS (FIXED NAMESPACE) ---
const TruckIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5h-7v6h2"/><path d="M13 9h4"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);

// --- 4. MAIN PAGE CONTENT ---
export default function AxisSovereignPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 scroll-smooth antialiased">
      <GlobalNavbar />
      <AxisSubNav />
      
      {/* HERO */}
      <section id="overview" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-8 text-center">
        <motion.div style={{ opacity: heroOpacity }} className="max-w-5xl">
          <p className="text-pink-500 font-mono text-[9px] tracking-[0.6em] uppercase mb-10">Unified Communications Infrastructure</p>
          <h1 className="text-6xl md:text-[110px] font-black leading-[0.85] tracking-tighter uppercase italic mb-8 text-white">
            Talk to your customers.<br/>
            <span className="text-slate-400 not-italic normal-case font-light tracking-tight">The right way.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Send announcements, updates, and reminders across SMS and WhatsApp with verified identity and operational certainty.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/axis/signup" className="px-14 py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all flex items-center gap-4">
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* WHY AXIS */}
      <section className="py-40 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          <Pillar title="Clarity" desc="No complex dashboards. Create, send, and track campaigns in minutes." />
          <Pillar title="Credibility" desc="Approved sender IDs, delivery transparency, and audit-ready records." />
          <Pillar title="Control" desc="Pay only for what you send — no platform fees, no hidden cost." />
        </div>
      </section>

      {/* WHATSAPP */}
      <section id="whatsapp" className="py-40 px-8 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="aspect-square bg-white/[0.01] border border-white/5 rounded-sm flex items-center justify-center grayscale opacity-40">
             <MessageCircle size={100} strokeWidth={1} className="text-pink-500" />
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase mb-10 leading-none">Relational<br/>Messaging.</h2>
            <div className="space-y-10">
              <div className="group">
                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-pink-500 transition-colors">Automated Continuity</h4>
                <p className="text-slate-500 text-sm font-light">Send receipts automatically, ensuring your customers never have to ask 'where is my order?'</p>
              </div>
            </div>
            <Link href="/axis/signup" className="mt-16 inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-pink-500/50 pb-2 hover:border-pink-500 transition-all">
              Join WhatsApp Waitlist <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SMS */}
      <section id="sms" className="py-40 px-8 bg-[#020202]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase leading-none">Built for<br/>Operational Trust.</h2>
            <div className="bg-white/[0.02] border border-white/10 p-12 text-center rounded-sm min-w-[300px]">
              <p className="text-5xl font-black text-white italic">21 TZS <span className="text-xs font-normal text-slate-600 not-italic tracking-widest">/ SMS</span></p>
              <p className="text-[9px] text-slate-500 mt-6 uppercase tracking-widest">Pay only for what you send</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-40">
            <IconBox icon={<Building2 />} label="SACCOs" />
            <IconBox icon={<TruckIcon />} label="Logistics" />
            <IconBox icon={<GraduationCap />} label="Schools" />
            <IconBox icon={<Smartphone />} label="Retailers" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="py-64 flex flex-col items-center text-center px-8 bg-[#020202] border-t border-white/5">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-16 leading-none text-white">Confidence<br/>In Communication.</h2>
        <Link href="/axis/signup" className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-pink-500 hover:text-white transition-all">
          Get Started
        </Link>
        <p className="mt-20 text-[8px] font-mono uppercase tracking-[0.6em] text-slate-700">© 2026 SAKURA GROUP • PRECISION INFRASTRUCTURE</p>
      </section>
    </main>
  );
}

function Pillar({ title, desc }: any) {
  return (
    <div className="space-y-4 text-left">
      <h4 className="text-xs font-black uppercase tracking-widest text-pink-500">{title}</h4>
      <p className="text-xl font-light text-slate-200">{desc}</p>
    </div>
  );
}

function IconBox({ icon, label }: any) {
  return (
    <div className="p-8 border border-white/5 bg-white/[0.01] text-center uppercase tracking-widest text-[9px] font-black">
      <div className="mx-auto mb-4 text-white">{icon}</div> {label}
    </div>
  );
}
