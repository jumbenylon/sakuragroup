"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Check, 
  ChevronRight, 
  Building2, 
  GraduationCap,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Terminal,
  Server
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- ASSETS & ICONS ---
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
    <path d="M15 18H9"/>
    <path d="M19 18h2a1 1 0 0 0 1-1v-5h-7v6h2"/>
    <path d="M13 9h4"/>
    <circle cx="7" cy="18" r="2"/>
    <circle cx="17" cy="18" r="2"/>
  </svg>
);

// --- ANIMATED CHAT COMPONENT ---
const AnimatedChat = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const messages = [
    { type: "in", text: "Habari! My delivery #TZ-892 hasn't arrived.", time: "10:23 AM" },
    { type: "out", text: "Hello! Tracking shows the driver is 5 mins away.", time: "10:23 AM", status: "read" },
    { type: "out", text: "Driver: Juma (Plate T 442 DFB).", time: "10:24 AM", status: "read" },
    { type: "in", text: "Asante! Verified.", time: "10:25 AM" }
  ];

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto bg-[#0a1014] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
      <div className="bg-[#202c33] p-4 flex items-center gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold text-white">
          SG
        </div>
        <div>
          <p className="text-xs font-bold text-white">Sakura Logistics</p>
          <p className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase">Verified Business</p>
        </div>
      </div>
      <div className="p-4 space-y-4 h-[300px] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5">
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
      className="fixed top-16 w-full z-[90] bg-black/80 backdrop-blur-xl border-b border-white/5 h-12 flex items-center pointer-events-none lg:pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 italic">
          Axis Infrastructure
        </span>
        <div className="flex gap-8">
          {["Why", "WhatsApp", "SMS", "Pricing"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors pointer-events-auto">
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default function AxisPage() {
  return (
    <main className="bg-[#020202] text-white selection:bg-emerald-500 font-sans">
      <GlobalNavbar />
      <AxisSubNav />

      {/* 1. HERO SECTION: OUTCOME FOCUSED */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <div className="max-w-5xl z-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">System Operational • Dar es Salaam</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tighter uppercase italic"
          >
            Talk to your<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">customers.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            The trusted way. Verified Sender ID SMS and structured WhatsApp engagement for Tanzanian businesses.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Link href="/contact" className="px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Request Access
            </Link>
            <Link href="#how-it-works" className="px-10 py-5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
              See How It Works
            </Link>
          </motion.div>
        </div>

        {/* TRUST SCROLL */}
        <div className="absolute bottom-12 w-full overflow-hidden">
          <p className="text-center text-[9px] font-mono uppercase tracking-widest text-slate-600 mb-6">Trusted Infrastructure For</p>
          <div className="flex justify-center gap-12 opacity-30 grayscale">
            {[Building2, GraduationCap, TruckIcon, ShieldCheck].map((Icon, i) => (
              <Icon key={i} size={32} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHY AXIS (CONTEXT) */}
      <section id="why" className="py-32 px-6 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-none">
              Why Axis Exists.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              In Tanzania, trust is currency. Customers ignore unknown numbers. 
              Fraud spoils brand reputation. Manual messaging wastes hours.
            </p>
            <ul className="space-y-6 pt-4">
              {[
                "Verified Identity: They know it's you instantly.",
                "Delivery Reliability: Audit-grade logs.",
                "Structured Data: No more copy-pasting spreadsheet rows."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                    <Check size={14} className="text-emerald-500" />
                  </div>
                  <span className="text-sm text-slate-300 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[500px] w-full bg-white/5 rounded-sm overflow-hidden border border-white/10">
             <Image 
               src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1200&auto=format&fit=crop"
               alt="Tanzania Logistics Chaos vs Order"
               fill
               className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100"
             />
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
               <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Live Operations • Kariakoo Market</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. WHATSAPP SECTION */}
      <section id="whatsapp" className="py-32 px-6 bg-[#020202] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <AnimatedChat />
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center border border-[#25D366]/20">
               <WhatsAppIcon />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-none">
              The Standard for<br/>Engagement.
            </h2>
            
            <p className="text-slate-400 text-lg font-light">
              Axis provides API-grade WhatsApp tooling designed for Tanzanian workflows. 
              Automate support, reminders, and notifications without losing the human touch.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                "Support & Follow-ups",
                "SACCO Loan Reminders",
                "Delivery Order Updates",
                "Student Notices"
              ].map((useCase, i) => (
                <div key={i} className="p-4 border border-white/10 bg-white/5 rounded-sm text-xs font-mono uppercase tracking-widest text-slate-300">
                  {useCase}
                </div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest border-b border-emerald-500/20 pb-1 hover:border-emerald-500 transition-colors mt-4">
              Explore WhatsApp API <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SMS SECTION */}
      <section id="sms" className="py-32 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-black uppercase italic leading-none">
                Sovereign SMS Delivery.
              </h2>
              <p className="text-slate-400 text-lg font-light max-w-xl">
                Every message carries your organization’s name. No shortcodes. No random numbers. 
                Full audit logs and delivery reporting.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-8 min-w-[300px] text-center">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Flat Rate Pricing</p>
              <div className="text-6xl font-black italic text-white flex items-start justify-center gap-2">
                21 <span className="text-lg not-italic font-normal text-slate-400 mt-2">TZS</span>
              </div>
              <p className="text-xs text-slate-400 mt-4">Per SMS • No Hidden Fees</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SectorCard 
              icon={<Building2 className="text-pink-500" />} 
              title="SACCOs & Finance" 
              desc="Loan reminders, contribution alerts, meeting notices." 
            />
            <SectorCard 
              icon={<TruckIcon />} 
              title="Logistics" 
              desc="Delivery confirmation, driver assignment, tracking." 
            />
            <SectorCard 
              icon={<GraduationCap className="text-emerald-500" />} 
              title="Education" 
              desc="Exam results, fee reminders, emergency alerts." 
            />
            <SectorCard 
              icon={<ShieldCheck className="text-blue-500" />} 
              title="Government" 
              desc="Public service announcements, utility updates." 
            />
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-32 px-6 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-20">
           <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-4">Integration Protocol</h2>
           <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Three steps to live transmission</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 relative">
          <div className="absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block" />
          
          {[
            { step: "01", title: "Request Access", desc: "Submit your organization details via our secure intake node." },
            { step: "02", title: "Sender ID Verify", desc: "We register your Brand Name with TCRA and all telecom networks." },
            { step: "03", title: "Start Sending", desc: "Access the dashboard or connect via API. Instant delivery." }
          ].map((item, i) => (
            <div key={i} className="relative bg-[#020202] p-6 text-center group">
              <div className="w-24 h-24 mx-auto bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:border-emerald-500 transition-colors">
                <span className="text-2xl font-black italic text-slate-700 group-hover:text-emerald-500 transition-colors">{item.step}</span>
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4">{item.title}</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONVERSION BLOCK */}
      <section className="py-40 bg-pink-600 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.85] mb-12">
            Ready to communicate<br/>with clarity?
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-4 px-16 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-sm hover:scale-105 transition-all shadow-2xl">
            Provision Your Axis Node <ArrowRight size={16} />
          </Link>
          <p className="mt-8 text-[10px] font-mono uppercase tracking-widest opacity-60">
            No credit card required for setup • 24/7 Local Support
          </p>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
}

// --- HELPER COMPONENTS ---
function SectorCard({ icon, title, desc }: any) {
  return (
    <div className="p-8 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
      <div className="mb-6 opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>
      <h3 className="text-sm font-black uppercase tracking-widest text-white mb-3">{title}</h3>
      <p className="text-xs text-slate-400 font-light leading-relaxed">{desc}</p>
    </div>
  );
}