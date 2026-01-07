"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { 
  MessageSquare, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  ChevronRight,
  Server,
  Code2, 
  Globe, 
  MessageCircle,
  Radio, 
  Building2, 
  Truck, 
  GraduationCap,
  Users,
  Lock,
  Zap,
  Send,
  BarChart3,
  Phone
} from "lucide-react";

// --- ASSETS ---
const HERO_VIDEO = "https://storage.googleapis.com/sakura-web/sms/7188903_Business_Businesswoman_1920x1080.mp4"; 
const CTA_BG = "https://storage.googleapis.com/sakura-web/sms/23230.jpg";

// --- PRELOADER COMPONENT ---
const TuchatiPreloader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[200] bg-[#020617] flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="relative inline-block"
        >
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase">
            Tuchati<span className="text-emerald-500">!</span>
          </h1>
          
          <motion.div 
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            className="absolute -inset-8 bg-emerald-500/20 rounded-full blur-2xl -z-10"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2"
        >
          <div className="flex gap-1">
            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-500">Establishing Uplink</span>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
    </motion.div>
  );
};

// --- SUBNAV ---
const AxisSubNav = () => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const handler = () => setVisible(window.scrollY > 150);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
      className="fixed top-0 w-full z-[100] bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 h-16 flex items-center px-8"
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/axis" className="text-sm font-black tracking-tighter uppercase italic">
          Axis<span className="text-emerald-500">.</span>
        </Link>
        
        <div className="flex gap-8 items-center">
          <Link href="/axis/pricing" className="text-[9px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
            Tsh 21 / SMS
          </Link>
          <Link href="#sms" className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">
            SMS Core
          </Link>
          <Link href="#whatsapp" className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">
            WhatsApp
          </Link>
          <Link href="/axis/industries" className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors">
            Use Cases
          </Link>
          <Link href="/axis/signup" className="px-5 py-2 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-emerald-500 transition-all">
            Sign Up Today
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15), 
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default function AxisPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 font-sans min-h-screen">
      
      <AnimatePresence>
        {loading && <TuchatiPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AxisSubNav />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/75 z-10" />
          <video 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover grayscale opacity-40"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 max-w-5xl space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-black">Trusted Infrastructure • Dar es Salaam</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7 }}
            className="text-6xl md:text-8xl lg:text-[120px] font-black leading-[0.8] tracking-tighter uppercase italic text-white drop-shadow-2xl"
          >
            Talk to your<br/>
            <span className="text-emerald-500">Customers.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Identity is the only currency. Stop being ignored by unknown numbers. 
            Register your Brand Name and start owning the conversation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Link href="/axis/signup" className="px-12 py-6 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/40 rounded-sm">
              Sign Up Today
            </Link>
            <Link href="/axis/pricing" className="px-12 py-6 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all rounded-sm">
              Tsh 21 / SMS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. SMS DEEP DIVE */}
      <section id="sms" className="py-40 px-6 bg-[#020617] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            
            <ScrollReveal>
                <div className="relative aspect-square bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden group shadow-2xl">
                    <Image 
                        src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop"
                        alt="Bulk SMS Campaign"
                        fill
                        className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-luminosity"
                    />
                    <div className="absolute bottom-8 left-8 right-8 space-y-3">
                        <div className="bg-[#1e293b]/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-white/10">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">GATEWAY ACTIVE</span>
                                <span className="text-[9px] text-slate-500 font-mono">2m ago</span>
                            </div>
                            <p className="text-sm text-slate-200 font-bold leading-snug">Flash Sale: Your order from SAKURA is ready. Get 10% off using code AXIS10.</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
                    <Send size={18} />
                    <span className="font-black text-[10px] uppercase tracking-[0.2em]">Axis Broadcast Protocol</span>
                </div>
                <h2 className="text-5xl font-black text-white mb-8 leading-[0.9] uppercase italic">SMS that actually earns trust.</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                    In a sea of spam, an unknown number is invisible. Axis registers your <strong>Sovereign Sender ID</strong> directly with TCRA so your customers know it is you—instantly.
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                        <Users size={20} className="text-emerald-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Marketing Campaigns</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                        <Lock size={20} className="text-emerald-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Secure Auth OTPs</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                        <Zap size={20} className="text-emerald-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Custom Brand Sender IDs</span>
                    </div>
                </div>
            </ScrollReveal>
        </div>
      </section>

      {/* 3. WHATSAPP LIVE LOOP (REPLACED STATIC IMAGE) */}
      <section id="whatsapp" className="py-40 px-6 bg-[#050b14] relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <ScrollReveal>
                <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
                    <MessageSquare size={18} />
                    <span className="font-black text-[10px] uppercase tracking-[0.2em]">Axis Conversational API</span>
                </div>
                <h2 className="text-5xl font-black text-white mb-8 leading-[0.9] uppercase italic">WhatsApp Business.</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                    Tanzania runs on WhatsApp. Go beyond plain text. Send invoices, interactive menus, and rich media directly to your customer's favorite app.
                </p>
                
                <Link href="/axis/signup" className="inline-flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-widest border-b-2 border-emerald-500/20 pb-1 hover:border-emerald-500 transition-all">
                  Sign Up Today <ChevronRight size={14} />
                </Link>
            </ScrollReveal>

            {/* LIVE CSS PHONE UI */}
            <ScrollReveal delay={0.2}>
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-[320px] h-[640px] bg-zinc-950 rounded-[3rem] border-[10px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-white/10">
                  {/* Header */}
                  <div className="absolute top-0 w-full h-16 bg-[#075E54] flex items-center px-6 gap-3 pt-4 z-20 shadow-md">
                    <div className="w-8 h-8 rounded-full bg-white/20" />
                    <div className="flex-1">
                      <div className="h-2 w-24 bg-white/30 rounded" />
                      <div className="h-1.5 w-12 bg-white/10 rounded mt-1" />
                    </div>
                  </div>

                  {/* Infinite Chat Stream */}
                  <div className="p-4 space-y-6 pt-20 h-full bg-[#e5ddd5] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
                    <motion.div 
                      animate={{ y: [0, -800] }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="space-y-8"
                    >
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none text-[11px] font-bold text-zinc-800 shadow-sm max-w-[85%]">
                        Habari! Order #SAK-902 has been shipped.
                        <span className="text-[8px] opacity-40 block mt-1 text-right">10:01 AM</span>
                      </div>
                      <div className="bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-none text-[11px] font-bold text-zinc-800 shadow-sm max-w-[85%] ml-auto">
                        Asante! What is the ETA?
                        <span className="text-[8px] opacity-40 block mt-1 text-right">10:02 AM</span>
                      </div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none text-[11px] font-bold text-zinc-800 shadow-sm max-w-[85%]">
                        Expected today by 4:00 PM.
                        <span className="text-[8px] opacity-40 block mt-1 text-right">10:02 AM</span>
                      </div>
                      {/* Loop items */}
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none text-[11px] font-bold text-zinc-800 shadow-sm max-w-[85%]">
                        Habari! Order #SAK-902 has been shipped.
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
        </div>
      </section>

      {/* 4. ECOSYSTEM GRID (Simplified English) */}
      <section className="py-40 px-6 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black uppercase tracking-[0.2em] mb-4">Explore the Grid</h2>
            <p className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em]">Select your infrastructure protocol</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/axis/industries" className="group relative bg-white/5 border border-white/5 p-12 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden rounded-2xl">
               <Globe size={40} className="text-emerald-500 mb-8" />
               <h3 className="text-xl font-black uppercase italic mb-4">Sectors</h3>
               <p className="text-sm text-slate-400 mb-10 leading-relaxed font-medium">
                 Tailored SMS and WhatsApp workflows for SACCOs, Logistics, and Retail nodes.
               </p>
               <span className="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-2 tracking-[0.2em]">
                 View Use Cases <ArrowRight size={12} />
               </span>
            </Link>

            <Link href="/axis/developers" className="group relative bg-white/5 border border-white/5 p-12 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden rounded-2xl">
               <Code2 size={40} className="text-emerald-500 mb-8" />
               <h3 className="text-xl font-black uppercase italic mb-4">Easy Integrations</h3>
               <p className="text-sm text-slate-400 mb-10 leading-relaxed font-medium">
                 Robust API Documentation and sandbox access for immediate node deployment.
               </p>
               <span className="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-2 tracking-[0.2em]">
                 Read Docs <ArrowRight size={12} />
               </span>
            </Link>

            <Link href="/axis/pricing" className="group relative bg-white/5 border border-white/5 p-12 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden rounded-2xl">
               <ShieldCheck size={40} className="text-emerald-500 mb-8" />
               <h3 className="text-xl font-black uppercase italic mb-4">Pricing & Transparency</h3>
               <p className="text-sm text-slate-400 mb-10 leading-relaxed font-medium">
                 Transparent breakdown of SMS rates (Tsh 21) and WhatsApp conversational costs.
               </p>
               <span className="text-[9px] font-black uppercase text-emerald-500 flex items-center gap-2 tracking-[0.2em]">
                 Simple English Rates <ArrowRight size={12} />
               </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FINAL CONVERSION */}
      <section className="py-60 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#064e3b]/85 to-[#020617]/95 z-10" />
            <Image 
              src={CTA_BG} 
              alt="Tanzania Business Communication" 
              fill
              className="object-cover opacity-30"
            />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto space-y-12">
          <h2 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] drop-shadow-2xl">
            Sign Up<br/><span className="text-emerald-500">Today.</span>
          </h2>
          <Link href="/axis/signup" className="inline-flex items-center gap-6 px-20 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-sm hover:bg-emerald-500 hover:text-white transition-all shadow-2xl">
            Provision Axis Node <ArrowRight size={20} />
          </Link>
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-60">
            Instant Provisioning • Sub-Second Delivery • Local Support
          </p>
        </div>
      </section>

    </main>
  );
}
