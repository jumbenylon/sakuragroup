import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk SMS Tanzania & WhatsApp API Gateway | Axis by Sakura",
  description: "The most reliable Bulk SMS and WhatsApp API provider in Tanzania. Direct connections to Vodacom, Tigo, Airtel & Halotel. Send marketing SMS, OTPs, and alerts with 98% delivery rates. Start for 21 TZS.",
  alternates: {
    canonical: "https://sakuragroup.co.tz/axis",
  },
  keywords: [
    "Bulk SMS Tanzania",
    "SMS API Dar es Salaam",
    "WhatsApp Business API Tanzania",
    "SMS Marketing Services",
    "OTP SMS Provider",
    "Shortcodes Tanzania",
    "USSD Gateway",
    "Axis Gateway",
    "Sakura Group"
  ],
  openGraph: {
    title: "Axis Gateway | Enterprise Bulk SMS & WhatsApp API",
    description: "Connect with millions of customers instantly. The tailored messaging infrastructure for Tanzanian businesses. 99.9% Uptime.",
    url: "https://sakuragroup.co.tz/axis",
    siteName: "Sakura Group",
    images: [
      {
        url: "https://storage.googleapis.com/sakura-web/axis-seo-card.jpg", // Ensure this image exists or use a generic one
        width: 1200,
        height: 630,
        alt: "Axis Gateway - Bulk SMS Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk SMS & WhatsApp API for Tanzania | Axis",
    description: "Reach every phone in Tanzania. Direct carrier routes, developer-friendly APIs, and instant delivery reports.",
    images: ["https://storage.googleapis.com/sakura-web/axis-seo-card.jpg"], // Same image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
  BarChart3
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
          
          {/* Signal Pulse Animation */}
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

      {/* Background Noise */}
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
      className="fixed top-16 w-full z-[90] bg-[#020617]/90 backdrop-blur-xl border-b border-emerald-500/10 h-12 flex items-center pointer-events-none lg:pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 italic flex items-center gap-2">
          <MessageCircle size={12} className="text-emerald-500" />
          Customers Like To Chat
        </span>
        
        <div className="flex gap-8">
          {[
            { n: "SMS Core", l: "#sms" },
            { n: "WhatsApp", l: "#whatsapp" },
            { n: "Pricing", l: "/axis/pricing" },
            { n: "Use Cases", l: "/axis/industries" },
            { n: "Developers", l: "/axis/developers" }
          ].map((item) => (
            <Link key={item.n} href={item.l} className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors pointer-events-auto">
              {item.n}
            </Link>
          ))}
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
    // Synthetic load time for "Tuchati!" experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 font-sans min-h-screen">
      
      {/* THE TUCHATI PRELOADER */}
      <AnimatePresence>
        {loading && <TuchatiPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AxisSubNav />

      {/* 1. HERO (FROM THE VERSION YOU LIKED) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/70 z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 max-w-5xl space-y-8 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6 }} // Delayed to start after preloader
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/50 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">Trusted Infrastructure • Dar es Salaam</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7 }}
            className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter uppercase italic text-white"
          >
            Talk to your<br/>
            <span className="text-emerald-500">Customers.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            The trusted way. Verified Sender ID SMS and structured WhatsApp engagement. 
            Stop being ignored by unknown numbers. Start owning the conversation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Link href="/axis/pricing" className="px-10 py-5 bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)] rounded-sm">
              View Rates (21 TZS)
            </Link>
            <Link href="/axis/industries" className="px-10 py-5 border border-white/20 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all rounded-sm">
              View Use Cases
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. SMS DEEP DIVE (Commercial Version Style) */}
      <section id="sms" className="py-32 px-6 bg-[#020617] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            
            {/* Visual Side: SMS Interface */}
            <ScrollReveal>
                <div className="relative aspect-square md:aspect-[4/3] bg-[#0f172a] border border-white/10 rounded-xl overflow-hidden group">
                    <Image 
                        src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop"
                        alt="Bulk SMS Campaign"
                        fill
                        className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"
                    />
                    
                    {/* Simulated Notification Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 space-y-3">
                        <div className="bg-[#1e293b]/90 backdrop-blur-md p-4 rounded-lg shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-white/10">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-bold text-emerald-400 uppercase">SAKURA</span>
                                <span className="text-[10px] text-slate-400">now</span>
                            </div>
                            <p className="text-sm text-slate-200 font-medium">Flash Sale: Get 50% off your next order. Valid for 24hrs only! Click to redeem.</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Text Side: Sales Copy */}
            <ScrollReveal delay={0.2}>
                <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
                    <Send size={20} />
                    <span className="font-mono text-xs uppercase tracking-widest">Axis Broadcast</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Bulk SMS that actually delivers.</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Identity is the only currency. In a sea of spam, an unknown number is invisible. 
                    Axis registers your <strong>Brand Name</strong> directly with TCRA so your customers know it's you—instantly.
                </p>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-emerald-500/10 rounded text-emerald-500 mt-1"><Users size={20} /></div>
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase tracking-wide">Marketing Campaigns</h3>
                            <p className="text-slate-500 text-sm">Upload contacts via Excel/CSV and blast promos instantly.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-emerald-500/10 rounded text-emerald-500 mt-1"><Lock size={20} /></div>
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase tracking-wide">Secure OTPs</h3>
                            <p className="text-slate-500 text-sm">Priority routes for authentication and banking alerts.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-emerald-500/10 rounded text-emerald-500 mt-1"><Zap size={20} /></div>
                        <div>
                            <h3 className="text-white font-bold text-sm uppercase tracking-wide">Sender IDs</h3>
                            <p className="text-slate-500 text-sm">Send with your Brand Name (e.g. "SAKURA") not random numbers.</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

        </div>
      </section>

      {/* 3. WHATSAPP (Commercial Version Style) */}
      <section id="whatsapp" className="py-32 px-6 bg-[#050b14] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#25D366]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
            {/* Text Side */}
            <ScrollReveal>
                <div className="inline-flex items-center gap-2 mb-6 text-green-500">
                    <MessageSquare size={20} />
                    <span className="font-mono text-xs uppercase tracking-widest">Axis Conversational</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">WhatsApp Business API.</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Tanzania runs on WhatsApp. Go beyond plain text. Send images, PDFs, locations, and interactive buttons directly to your customer's favorite app.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-[#0a0f1e] border border-white/5 rounded-lg">
                        <h4 className="text-white font-bold mb-1">Rich Media</h4>
                        <p className="text-xs text-slate-500">Send invoices & brochures.</p>
                    </div>
                    <div className="p-4 bg-[#0a0f1e] border border-white/5 rounded-lg">
                        <h4 className="text-white font-bold mb-1">Chatbots</h4>
                        <p className="text-xs text-slate-500">24/7 automated replies.</p>
                    </div>
                    <div className="p-4 bg-[#0a0f1e] border border-white/5 rounded-lg">
                        <h4 className="text-white font-bold mb-1">Green Tick</h4>
                        <p className="text-xs text-slate-500">Verified business badge.</p>
                    </div>
                    <div className="p-4 bg-[#0a0f1e] border border-white/5 rounded-lg">
                        <h4 className="text-white font-bold mb-1">Interactive</h4>
                        <p className="text-xs text-slate-500">Buttons & list menus.</p>
                    </div>
                </div>
                
                <Link href="/contact" className="inline-flex items-center gap-2 text-[#25D366] text-xs font-black uppercase tracking-widest border-b border-[#25D366]/20 pb-1 hover:border-[#25D366] transition-colors mt-4">
                  Get WhatsApp API Access <ChevronRight size={14} />
                </Link>
            </ScrollReveal>

            {/* Visual Side */}
            <ScrollReveal delay={0.2}>
                <div className="relative aspect-[4/5] bg-[#0b141a] border border-white/10 rounded-2xl overflow-hidden group shadow-2xl">
                    {/* Chat Background Pattern */}
                    <div className="absolute inset-0 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] opacity-10 pointer-events-none" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                        {/* Bot Message */}
                        <div className="bg-[#1f2937] p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl max-w-[85%] border border-white/5 shadow-lg">
                            <p className="text-xs text-green-400 font-bold mb-1">AXIS BOT</p>
                            <p className="text-sm text-slate-300">Habari! Your loan application #LN-992 is approved. TZS 5M has been disbursed to your account.</p>
                            <span className="text-[9px] text-slate-500 block mt-2 text-right">10:23 AM</span>
                        </div>
                        {/* User Reply */}
                        <div className="bg-[#005c4b] p-4 rounded-tl-xl rounded-tr-xl rounded-bl-xl max-w-[80%] ml-auto text-right shadow-lg">
                            <p className="text-sm text-white">Asante sana! Excellent service. 🙏</p>
                            <div className="flex justify-end items-center gap-1 mt-1 text-emerald-300">
                                <span className="text-[9px]">10:24 AM</span>
                                <Check size={12} className="stroke-[3]" />
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
      </section>

      {/* 4. ECOSYSTEM LINKS (Grid Style from "Liked" Version) */}
      <section className="py-32 px-6 bg-[#020617] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Explore the Grid</h2>
            <p className="text-emerald-500/60 font-mono text-xs uppercase tracking-widest">Select your protocol</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* AUDIENCE: MARKETERS (Use Cases) */}
            <Link href="/axis/industries" className="group relative bg-[#0f172a] border border-white/5 p-10 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                 <Globe size={40} className="text-blue-500" />
               </div>
               <h3 className="text-xl font-black uppercase italic mb-4 text-white">Sectors</h3>
               <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                 Tailored workflows for SACCOs, Logistics, Education, and Retail.
               </p>
               <span className="text-[10px] font-mono font-bold uppercase text-blue-500 flex items-center gap-2">
                 View Use Cases <ArrowRight size={12} />
               </span>
            </Link>

            {/* AUDIENCE: DEVELOPERS (Engine Room) */}
            <Link href="/axis/developers" className="group relative bg-[#0f172a] border border-white/5 p-10 hover:border-purple-500/50 transition-all duration-500 overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                 <Code2 size={40} className="text-purple-500" />
               </div>
               <h3 className="text-xl font-black uppercase italic mb-4 text-white">Engine Room</h3>
               <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                 API Documentation, Node.js/PHP snippets, and sandbox access.
               </p>
               <span className="text-[10px] font-mono font-bold uppercase text-purple-500 flex items-center gap-2">
                 Read Docs <ArrowRight size={12} />
               </span>
            </Link>

            {/* AUDIENCE: BUSINESS (Pricing) */}
            <Link href="/axis/pricing" className="group relative bg-[#0f172a] border border-white/5 p-10 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                 <ShieldCheck size={40} className="text-emerald-500" />
               </div>
               <h3 className="text-xl font-black uppercase italic mb-4 text-white">The Ledger</h3>
               <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                 Transparent breakdown of SMS rates (21 TZS) and WhatsApp costs.
               </p>
               <span className="text-[10px] font-mono font-bold uppercase text-emerald-500 flex items-center gap-2">
                 View Pricing <ArrowRight size={12} />
               </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FINAL CONVERSION */}
      <section className="py-40 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/90 via-[#064e3b]/80 to-[#020617]/90 z-10" />
            <Image 
              src={CTA_BG} 
              alt="Tanzania Business Communication" 
              fill
              className="object-cover"
            />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.85] mb-12">
            Ready to<br/>Broadcast?
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-4 px-16 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-500 hover:text-white transition-all shadow-2xl">
            Provision Axis Node <ArrowRight size={16} />
          </Link>
          <p className="mt-8 text-[10px] font-mono uppercase tracking-widest opacity-80">
            Instant Setup • Local Support • No Credit Card
          </p>
        </div>
      </section>

    </main>
  );
}
