"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building2, 
  Truck, 
  GraduationCap, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Activity,
  CheckCircle2,
  Clock,
  Smartphone,
  Ticket,
  Lock,
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

// --- INDUSTRY DATA ---
const INDUSTRIES = [
  {
    id: "finance",
    title: "SACCOs & Microfinance",
    icon: <Building2 className="w-8 h-8 text-emerald-500" />,
    desc: "Automate trust. Ensure every deposit, withdrawal, and loan payment is instantly verified with a branded SMS receipt.",
    workflow: [
      { step: "Trigger", label: "Member Deposits Cash" },
      { step: "Axis Action", label: "Instant SMS Dispatch" },
      { step: "Outcome", label: "Member Trust Secured" }
    ],
    stats: "99.9% Delivery Rate for Financial Alerts"
  },
  {
    id: "education",
    title: "Education & Schools",
    icon: <GraduationCap className="w-8 h-8 text-pink-500" />,
    desc: "Maximize fee collection. Send automated term fee reminders, exam results, and emergency closure notices to parents instantly.",
    workflow: [
      { step: "Trigger", label: "Term Fees Due" },
      { step: "Axis Action", label: "Bulk SMS Reminder" },
      { step: "Outcome", label: "Faster Fee Collection" }
    ],
    stats: "Reach 5,000+ Parents in Seconds"
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    icon: <Truck className="w-8 h-8 text-blue-400" />,
    desc: "Close the coordination gap. Connect drivers, dispatchers, and customers with automated status updates on WhatsApp.",
    workflow: [
      { step: "Trigger", label: "Package Out for Delivery" },
      { step: "Axis Action", label: "WhatsApp Tracking Link Sent" },
      { step: "Outcome", label: "Zero 'Where are you?' Calls" }
    ],
    stats: "Reduce Call Center Volume by 40%"
  },
  {
    id: "events",
    title: "Events & Notifications",
    icon: <Ticket className="w-8 h-8 text-purple-500" />,
    desc: "Fill the seats. Send digital ticket confirmations, event schedules, and last-minute gate changes via WhatsApp.",
    workflow: [
      { step: "Trigger", label: "Ticket Purchased" },
      { step: "Axis Action", label: "WhatsApp QR Code Sent" },
      { step: "Outcome", label: "Frictionless Gate Entry" }
    ],
    stats: "100% Ticket Delivery Rate"
  },
  {
    id: "security",
    title: "Tech & Security (OTPs)",
    icon: <Lock className="w-8 h-8 text-red-500" />,
    desc: "Secure the login. Delivers 2FA codes, password resets, and verification tokens with high-priority routing.",
    workflow: [
      { step: "Trigger", label: "User Login Attempt" },
      { step: "Axis Action", label: "Priority SMS OTP" },
      { step: "Outcome", label: "Verified Account Access" }
    ],
    stats: "< 3 Second Latency on OTPs"
  },
  {
    id: "retail",
    title: "Retail & E-Commerce",
    icon: <ShoppingBag className="w-8 h-8 text-yellow-400" />,
    desc: "Recover revenue. Re-engage customers who abandoned carts or offer personalized flash sales via WhatsApp.",
    workflow: [
      { step: "Trigger", label: "Customer Abandons Cart" },
      { step: "Axis Action", label: "Automated WhatsApp Nudge" },
      { step: "Outcome", label: "15-20% Revenue Recovery" }
    ],
    stats: "Higher Open Rates than Email"
  }
];

export default function AxisIndustriesPage() {
  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 font-sans min-h-screen">
      
      <AxisSubNav />

      {/* 1. HERO: SECTOR INTELLIGENCE */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#020617]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">Vertical Solutions</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Built for Tanzania's<br/>
            <span className="text-slate-500">Backbone.</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
            Axis isn't just code; it's operational infrastructure tailored for the industries moving our economy forward.
          </p>
        </div>
      </section>

      {/* 2. INDUSTRY DEEP DIVES */}
      <section className="py-20 px-6 space-y-32">
        {INDUSTRIES.map((industry, index) => (
          <div key={industry.id} className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              
              {/* TEXT CONTENT */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    {industry.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-wide">
                    {industry.title}
                  </h2>
                </div>
                
                <p className="text-lg text-slate-400 font-light leading-relaxed">
                  {industry.desc}
                </p>

                <div className="p-6 bg-[#0f172a] border-l-4 border-emerald-500 rounded-r-lg">
                  <p className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-1">Impact Metric</p>
                  <p className="text-xl font-bold text-white">{industry.stats}</p>
                </div>

                <Link href="/contact" className="inline-flex items-center gap-3 text-emerald-400 font-black uppercase tracking-widest text-xs border-b border-emerald-500/30 pb-1 hover:border-emerald-500 transition-all group">
                  Deploy {industry.title.split(' ')[0]} Solution 
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* WORKFLOW VISUALIZER */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-3xl opacity-20" />
                
                <div className="relative bg-[#0b1121] border border-white/10 rounded-xl p-8 md:p-12 space-y-8">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <span className="text-[10px] font-mono uppercase text-slate-500">Workflow Logic</span>
                    <Activity size={16} className="text-emerald-500" />
                  </div>

                  {industry.workflow.map((item, i) => (
                    <div key={i} className="relative flex items-center gap-6 group">
                      {/* Connector Line */}
                      {i !== industry.workflow.length - 1 && (
                        <div className="absolute left-[19px] top-10 w-0.5 h-12 bg-white/10 group-hover:bg-emerald-500/50 transition-colors" />
                      )}
                      
                      <div className="w-10 h-10 rounded-full bg-[#1e293b] border border-white/10 flex items-center justify-center shrink-0 z-10 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all">
                        {i === 0 && <Clock size={18} className="text-slate-400 group-hover:text-emerald-400" />}
                        {i === 1 && <Smartphone size={18} className="text-slate-400 group-hover:text-emerald-400" />}
                        {i === 2 && <CheckCircle2 size={18} className="text-slate-400 group-hover:text-emerald-400" />}
                      </div>
                      
                      <div>
                        <p className="text-[10px] font-mono uppercase text-slate-500 mb-1">{item.step}</p>
                        <p className="text-sm font-bold text-white group-hover:text-emerald-100 transition-colors">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </section>

      {/* 3. GOVERNMENT / PUBLIC SECTOR */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <ShieldCheck size={200} className="text-slate-500" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-wide mb-6">
              Government & Public Infrastructure
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Axis is engineered for national scale. From utility outage alerts (Water/Power) to 
              public health announcements, we provide the secure, high-throughput pipes required for civic duty.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/contact" className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all rounded-sm">
                Discuss Public Sector
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 text-center">
        <h2 className="text-2xl font-black uppercase text-slate-500 tracking-widest mb-8">Ready to Optimize?</h2>
        <Link href="/contact" className="inline-block px-12 py-5 border border-emerald-500/50 text-emerald-400 font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all">
          Start Your Pilot Program
        </Link>
      </section>

      
    </main>
  );
}