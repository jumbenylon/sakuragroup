"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  GraduationCap
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- ASSETS ---
const HERO_VIDEO = "https://storage.googleapis.com/sakura-web/sms/7188903_Business_Businesswoman_1920x1080.mp4"; 
const CTA_BG = "https://storage.googleapis.com/sakura-web/sms/23230.jpg";


// --- CHAT COMPONENT ---
const AnimatedChat = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const messages = [
    { type: "in", text: "Habari! My loan application #LN-992 status?", time: "10:23 AM" },
    { type: "out", text: "Verified. Your funds (TZS 5M) are approved.", time: "10:23 AM", status: "read" },
    { type: "out", text: "Disbursement scheduled for 14:00 today.", time: "10:24 AM", status: "read" },
    { type: "in", text: "Asante! Excellent service.", time: "10:25 AM" }
  ];

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto bg-[#0b141a] border border-emerald-500/20 rounded-xl overflow-hidden shadow-2xl relative group">
      <div className="bg-[#111b21] p-4 flex items-center gap-3 border-b border-emerald-500/10">
        <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-xs font-bold text-[#0b141a]">
          SG
        </div>
        <div>
          <p className="text-xs font-bold text-white">Sakura Finance</p>
          <p className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase">Verified Business</p>
        </div>
      </div>
      <div className="p-4 space-y-4 h-[300px] relative bg-[#0b141a]">
        <div className="absolute inset-0 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] opacity-10 pointer-events-none" />
        
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.8, duration: 0.4 }}
            className={`flex ${msg.type === 'out' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
              msg.type === 'out' ? 'bg-[#005c4b] text-white rounded-tr-none' : 'bg-[#202c33] text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
              <div className={`flex justify-end items-center gap-1 mt-1 ${msg.type === 'out' ? 'text-emerald-400' : 'text-slate-500'}`}>
                <span className="text-[9px] opacity-70">{msg.time}</span>
                {msg.status === 'read' && <Check size={10} className="stroke-[3]" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
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

      <GlobalNavbar />
      <AxisSubNav />

      {/* 1. HERO */}
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

      {/* 2. SMS DEEP DIVE */}
      <section id="sms" className="py-32 px-6 bg-[#020617] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto space-y-24">
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none text-white">
                Identity is the only<br/><span className="text-emerald-500">Currency.</span>
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                In a sea of betting spam and scam calls, an unknown number is invisible. 
                Axis registers your <strong>Brand Name</strong> directly with TCRA. When you speak, 
                your customers know it's you—instantly.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-[#0f172a] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-colors">
                  <p className="text-4xl font-black text-white mb-2">21 <span className="text-sm font-normal text-slate-500">TZS</span></p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-500">No Hidden Fees</p>
                </div>
                <div className="p-6 bg-[#0f172a] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-colors">
                  <p className="text-4xl font-black text-white mb-2">100%</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-500">TCRA Compliant</p>
                </div>
              </div>

              <ul className="space-y-4 pt-4">
                {[
                  "Verified Sender ID (e.g. 'SAKURA')",
                  "Direct Routes (No cheap grey routes)",
                  "Audit-Ready Delivery Logs",
                  "Credits Never Expire"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <MessageSquare size={16} className="text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* VISUAL */}
            <div className="relative h-[500px] w-full bg-[#0f172a] rounded-2xl border border-white/10 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10" />
              <Image 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="SMS Infrastructure"
                fill
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-10 left-10 right-10 z-20">
                 <div className="bg-[#1e293b]/90 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-2xl transform translate-y-0 transition-transform hover:-translate-y-2">
                   <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-2">
                       <Radio size={12} className="text-emerald-500 animate-pulse" />
                       <span className="font-bold text-white text-sm">SAKURA GRP</span>
                     </div>
                     <span className="text-[10px] text-slate-400">Now</span>
                   </div>
                   <p className="text-xs text-slate-300 leading-relaxed">
                     Your verification code is <span className="text-emerald-400 font-mono font-bold">8492</span>. 
                     Do not share this with anyone.
                   </p>
                 </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: INDUSTRY INTEGRATION */}
          <div className="border-t border-white/5 pt-12">
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-2xl font-black uppercase italic text-white">Powering Critical Sectors</h3>
              <Link href="/axis/industries" className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 hover:text-white transition-colors flex items-center gap-2">
                See All Workflows <ArrowRight size={12} />
              </Link>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Finance & SACCOs", icon: <Building2 className="text-emerald-500" /> },
                { label: "Logistics", icon: <Truck className="text-blue-500" /> },
                { label: "Education", icon: <GraduationCap className="text-pink-500" /> },
                { label: "Government", icon: <ShieldCheck className="text-slate-300" /> },
              ].map((sector, i) => (
                <Link key={i} href="/axis/industries" className="group p-6 bg-[#0f172a] border border-white/5 rounded-lg hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                  <div className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity">{sector.icon}</div>
                  <p className="text-xs font-black uppercase tracking-widest text-white group-hover:text-emerald-400 transition-colors">{sector.label}</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase group-hover:text-white transition-colors">
                    View Logic <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHATSAPP */}
      <section id="whatsapp" className="py-32 px-6 bg-[#050b14] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#25D366]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <AnimatedChat />
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#25D366]/30 bg-[#25D366]/10">
               <MessageSquare size={12} className="text-[#25D366]" />
               <span className="text-[9px] font-mono uppercase tracking-widest text-[#25D366]">Rich Media Layer</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-none text-white">
              Turn 'Chatting' into<br/>Operating.
            </h2>
            
            <p className="text-slate-400 text-lg font-light">
              Tanzania runs on WhatsApp. Axis provides the API-grade tools to turn it into your operating system.
              Send PDFs, track locations, and recover loans without leaving the chat.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                "24h Support Window",
                "Rich Media (Images/PDF)",
                "Interactive Buttons",
                "Green Tick Verified"
              ].map((useCase, i) => (
                <div key={i} className="p-4 border border-white/10 bg-[#020617] rounded-sm text-xs font-mono uppercase tracking-widest text-emerald-400/80">
                  {useCase}
                </div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-2 text-[#25D366] text-xs font-black uppercase tracking-widest border-b border-[#25D366]/20 pb-1 hover:border-[#25D366] transition-colors mt-4">
              Get WhatsApp API Access <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM LINKS */}
      <section className="py-32 px-6 bg-[#020617] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Explore the Grid</h2>
            <p className="text-emerald-500/60 font-mono text-xs uppercase tracking-widest">Select your protocol</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/axis/pricing" className="group relative bg-[#0f172a] border border-white/5 p-10 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                 <ShieldCheck size={40} className="text-emerald-500" />
               </div>
               <h3 className="text-xl font-black uppercase italic mb-4 text-white">The Ledger</h3>
               <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                 Transparent breakdown of SMS rates (21 TZS) and WhatsApp conversation costs.
               </p>
               <span className="text-[10px] font-mono font-bold uppercase text-emerald-500 flex items-center gap-2">
                 View Pricing <ArrowRight size={12} />
               </span>
            </Link>

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

      <GlobalFooter />
    </main>
  );
}