"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import { 
  ArrowRight, 
  MessageSquare, 
  Smartphone, 
  Globe, 
  Code2, 
  CheckCircle2,
  Zap,
  BarChart3,
  Users,
  Lock,
  Send,
  Menu // Added for potential mobile menu toggle if needed
} from "lucide-react";

// --- SHARED COMPONENTS ---

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

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const AxisSubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500 ${
        isScrolled ? "bg-[#050a14] py-2 shadow-2xl" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic mr-4 hidden md:block">
            Axis Gateway
          </span>
          <Link href="#hero" className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Overview</Link>
          <Link href="#sms" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white">Bulk SMS</Link>
          <Link href="#whatsapp" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white">WhatsApp</Link>
          <Link href="/axis/developers" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white">Developers</Link>
          <Link href="/axis/industries" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white">Industries</Link>
        </div>
      </div>
    </motion.nav>
  );
};

// --- HERO SECTION WITH VIDEO ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#050a14]">
      {/* VIDEO BACKGROUND */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
         >
            {/* Tech Abstract Video */}
            <source src="https://storage.googleapis.com/sakura-web/axis-hero.mp4" type="video/mp4" />
         </video>
         
         {/* Fallback Image if video fails or loads slow */}
         <Image 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
            alt="Connectivity Background"
            fill
            className="object-cover opacity-20 -z-10"
         />

         <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/80 to-transparent" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/30 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live in Tanzania</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            REACH EVERY<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">PHONE INSTANTLY.</span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             The most reliable Bulk SMS and WhatsApp gateway in East Africa. 
             Powering marketing campaigns, OTPs, and transaction alerts with 98% delivery rates.
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/axis/portal" className="group relative px-10 py-5 bg-emerald-600 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-emerald-500 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                Start Sending SMS
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Get WhatsApp API
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ... [Keep BulkSMS, WhatsApp, Audience, APISection, CTA as they were in the previous verified response] ...
// Re-adding them here for completeness to ensure you have the full file.

const BulkSMS = () => {
  return (
    <section id="sms" className="py-32 px-6 bg-[#050a14] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
            <div className="relative aspect-square md:aspect-[4/3] bg-neutral-900 border border-white/10 rounded-xl overflow-hidden group">
                <Image 
                    src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2070&auto=format&fit=crop"
                    alt="Bulk SMS Campaign"
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />
                <div className="absolute bottom-8 left-8 right-8 space-y-3">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-black uppercase">SAKURA</span>
                            <span className="text-[10px] text-gray-500">now</span>
                        </div>
                        <p className="text-sm text-gray-800 font-medium">Flash Sale: Get 50% off your next order. Valid for 24hrs only!</p>
                    </div>
                </div>
            </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
            <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
                <Send size={20} />
                <span className="font-mono text-xs uppercase tracking-widest">Axis Broadcast</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Bulk SMS that actually delivers.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Reach thousands of customers in seconds. Our direct Tier-1 connections to Vodacom, Tigo, Airtel, and Halotel ensure your messages skip the queues.
            </p>
            <div className="space-y-6">
                <div className="flex items-start gap-4"><div className="p-2 bg-emerald-500/10 rounded text-emerald-500 mt-1"><Users size={20} /></div><div><h3 className="text-white font-bold text-sm uppercase tracking-wide">Marketing Campaigns</h3><p className="text-slate-500 text-sm">Excel/CSV uploads.</p></div></div>
                <div className="flex items-start gap-4"><div className="p-2 bg-emerald-500/10 rounded text-emerald-500 mt-1"><Lock size={20} /></div><div><h3 className="text-white font-bold text-sm uppercase tracking-wide">Secure OTPs</h3><p className="text-slate-500 text-sm">Priority routes.</p></div></div>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const WhatsApp = () => {
  return (
    <section id="whatsapp" className="py-32 px-6 bg-[#02040a]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
        <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-6 text-green-500">
                <MessageSquare size={20} />
                <span className="font-mono text-xs uppercase tracking-widest">Axis Conversational</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">WhatsApp Business API.</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Go beyond plain text. Send images, PDFs, locations, and interactive buttons directly to your customer&apos;s favorite app.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#0a0f1e] border border-white/5 rounded-lg"><h4 className="text-white font-bold mb-1">Rich Media</h4><p className="text-xs text-slate-500">Invoices & brochures.</p></div>
                <div className="p-4 bg-[#0a0f1e] border border-white/5 rounded-lg"><h4 className="text-white font-bold mb-1">Chatbots</h4><p className="text-xs text-slate-500">24/7 automated replies.</p></div>
            </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
            <div className="relative aspect-[4/5] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden group">
                <Image src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop" alt="WhatsApp Interaction" fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                    <div className="bg-[#1f2937] p-4 rounded-xl max-w-[80%] border border-white/5"><p className="text-xs text-green-400 font-bold mb-1">AXIS BOT</p><p className="text-sm text-slate-300">Your package #TZ-892 has arrived.</p></div>
                </div>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Audience = () => {
    return (
        <section className="py-32 px-6 bg-[#050a14] border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal><div className="text-center mb-16"><h2 className="text-3xl font-bold text-white mb-4">Who is Axis For?</h2></div></ScrollReveal>
                <div className="grid md:grid-cols-3 gap-8">
                    <ScrollReveal delay={0.1}><SpotlightCard className="p-8 h-full bg-[#0a0f1e]"><BarChart3 size={24} className="text-purple-500 mb-6" /><h3 className="text-xl font-bold text-white mb-2">Marketers</h3><p className="text-sm text-slate-400 mb-6">No coding required. Web portal access.</p><Link href="/axis/portal" className="text-purple-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">Try Portal <ArrowRight size={14} /></Link></SpotlightCard></ScrollReveal>
                    <ScrollReveal delay={0.2}><SpotlightCard className="p-8 h-full bg-[#0a0f1e]"><Code2 size={24} className="text-emerald-500 mb-6" /><h3 className="text-xl font-bold text-white mb-2">Developers</h3><p className="text-sm text-slate-400 mb-6">REST APIs, Webhooks, SDKs.</p><Link href="/axis/developers" className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">View Docs <ArrowRight size={14} /></Link></SpotlightCard></ScrollReveal>
                    <ScrollReveal delay={0.3}><SpotlightCard className="p-8 h-full bg-[#0a0f1e]"><Users size={24} className="text-blue-500 mb-6" /><h3 className="text-xl font-bold text-white mb-2">Business Owners</h3><p className="text-sm text-slate-400 mb-6">Automate support & sales.</p><Link href="/contact" className="text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">Contact Sales <ArrowRight size={14} /></Link></SpotlightCard></ScrollReveal>
                </div>
            </div>
        </section>
    )
}

const APISection = () => {
  return (
    <section id="api" className="py-32 px-6 bg-[#020617]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 mb-6 text-emerald-500"><Code2 size={20} /><span className="font-mono text-xs uppercase tracking-widest">Developer Friendly</span></div>
          <h2 className="text-4xl font-bold text-white mb-6">Integrate in Minutes.</h2>
          <p className="text-slate-400 text-lg mb-8">Clean documentation, predictable REST endpoints, and SDKs.</p>
          <Link href="/axis/developers" className="text-emerald-400 font-bold flex items-center gap-2 hover:text-white transition-colors uppercase text-xs tracking-widest">Read The Docs <ArrowRight size={14} /></Link>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="rounded-lg overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl font-mono text-sm relative group">
             <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5"><div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" /></div>
             <div className="p-6 text-slate-300 space-y-4"><p><span className="text-purple-400">const</span> axis = <span className="text-blue-400">require</span>(&apos;axis-sdk&apos;);</p><p><span className="text-purple-400">await</span> axis.sms.send(&#123; to: <span className="text-green-400">&apos;+255...&apos;</span>, message: <span className="text-green-400">&apos;OTP 4921&apos;</span> &#125;);</p></div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">START SENDING<br/>TODAY.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6"><Link href="/axis/login" className="px-12 py-5 bg-emerald-600 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-500 transition-all shadow-2xl">Create Account</Link></div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default function AxisPage() {
  return (
    <main className="min-h-screen bg-[#050a14] text-white selection:bg-emerald-500 selection:text-black font-sans">
      <AxisSubNav />
      <Hero />
      <Audience />
      <BulkSMS />
      <WhatsApp />
      <APISection />
      <CTA />
    </main>
  );
}
