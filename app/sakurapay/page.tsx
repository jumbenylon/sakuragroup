"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import { 
  ArrowRight, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Code, 
  Lock, 
  Server, 
  CheckCircle2, 
  FileText, 
  Layout, 
  Wallet,
  Activity,
  Terminal,
  Building2
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

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
      className={`relative border border-white/10 bg-[#0B1120] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
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

const SakuraPayNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Collections", id: "collections" },
    { label: "Disbursements", id: "disbursements" },
    { label: "Checkout", id: "checkout" },
    { label: "API", id: "api" },
    { label: "Security", id: "security" },
    { label: "Pricing", id: "pricing" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#050a14]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic mr-4 hidden md:block">
            SakuraPay Platform
          </span>
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={`#${link.id}`} 
              className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// --- SECTIONS ---

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
            className="w-full h-full object-cover opacity-30 mix-blend-overlay grayscale"
         >
             <source src="https://storage.googleapis.com/sakura-web/sakurapay-video.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/60 to-transparent" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live in Tanzania</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] mb-8">
            GLOBAL REACH. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
                LOCAL POWER.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             The unified payment gateway for African business. Accept M-Pesa, Card, and Bank transfers through a single, secure API. 
             <span className="block mt-2 text-white font-medium">Built for banks, logistics, and enterprise scale.</span>
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-emerald-500 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                Start Integration
            </Link>
            <Link href="#collections" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Explore Platform
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Collections = () => (
  <section id="collections" className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">COLLECTIONS</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Accept payments everywhere your customers are. Mobile money, cards, and bank transfers in one dashboard.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { name: "M-Pesa", color: "text-red-500", bg: "bg-red-500/10" },
          { name: "Tigo Pesa", color: "text-blue-400", bg: "bg-blue-400/10" },
          { name: "Airtel Money", color: "text-red-400", bg: "bg-red-400/10" },
          { name: "HaloPesa", color: "text-orange-400", bg: "bg-orange-400/10" },
          { name: "Visa / MC", color: "text-white", bg: "bg-white/10" },
          { name: "USSD Push", color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { name: "Bank Transfer", color: "text-slate-300", bg: "bg-slate-800" },
          { name: "QR Pay", color: "text-purple-400", bg: "bg-purple-400/10" },
        ].map((m, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="group flex items-center justify-center gap-3 p-6 rounded-sm bg-[#050a14] border border-white/5 hover:border-emerald-500/30 transition-all cursor-default">
              <div className={`w-3 h-3 rounded-full ${m.bg}`} />
              <span className={`font-bold text-sm ${m.color}`}>{m.name}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8 text-center border-t border-white/5 pt-16">
         <ScrollReveal delay={0.2}>
            <div className="space-y-2">
               <h3 className="text-white font-bold uppercase tracking-widest text-sm">Unified Ledger</h3>
               <p className="text-slate-500 text-sm">One view for all channels.</p>
            </div>
         </ScrollReveal>
         <ScrollReveal delay={0.3}>
            <div className="space-y-2">
               <h3 className="text-white font-bold uppercase tracking-widest text-sm">Instant Settlement</h3>
               <p className="text-slate-500 text-sm">Configurable payout cycles.</p>
            </div>
         </ScrollReveal>
         <ScrollReveal delay={0.4}>
            <div className="space-y-2">
               <h3 className="text-white font-bold uppercase tracking-widest text-sm">ERP Ready</h3>
               <p className="text-slate-500 text-sm">Auto-reconciliation exports.</p>
            </div>
         </ScrollReveal>
      </div>
    </div>
  </section>
);

const Disbursements = () => (
  <section id="disbursements" className="py-32 px-6 bg-[#050a14] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
          <Wallet size={20} />
          <span className="font-mono text-xs uppercase tracking-widest">Mass Payouts</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Pay Teams & Agents<br/>at Scale.
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Send payments to thousands of recipients in one click. Perfect for salary disbursement, field teams, and agent networks.
        </p>
        
        <ul className="space-y-6 mb-12">
          {[
            { label: "Bulk Payments", desc: "Upload CSV or API trigger for thousands of transfers." },
            { label: "Agent Settlements", desc: "Automate daily commissions and merchant payouts." },
            { label: "Refund Automation", desc: "Programmatic reversal without manual friction." }
          ].map((item, i) => (
            <li key={i} className="flex gap-4">
              <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase mb-1">{item.label}</h4>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="text-emerald-400 font-bold flex items-center gap-2 hover:text-white transition-colors uppercase text-xs tracking-widest">
           Enable Disbursements <ArrowRight size={14} />
        </Link>
      </ScrollReveal>

      {/* Abstract UI for Payouts */}
      <ScrollReveal delay={0.2}>
        <div className="relative bg-[#0B1120] border border-white/10 rounded-sm p-8 shadow-2xl">
           <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <span className="text-white font-mono text-xs uppercase">Payout Batch #8492</span>
              <span className="text-emerald-500 font-mono text-xs uppercase">Processing</span>
           </div>
           <div className="space-y-4">
              {[1,2,3,4].map((i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-[#050a14] rounded-sm border border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                          {i}
                       </div>
                       <div>
                          <div className="w-24 h-2 bg-slate-800 rounded-sm mb-2" />
                          <div className="w-16 h-2 bg-slate-800 rounded-sm" />
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-white font-mono text-sm">TZS 45,000</div>
                       <div className="text-emerald-500 text-[10px] uppercase">Sent</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Checkout = () => (
  <section id="checkout" className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-6">NO CODE? NO PROBLEM.</h2>
        <p className="text-slate-400 text-lg">Tools for SMEs and businesses to get paid instantly.</p>
      </ScrollReveal>
    </div>

    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Payment Links", desc: "Create a link. Send via WhatsApp. Get paid.", icon: Globe },
        { title: "Smart Invoices", desc: "Send professional invoices that track their own status.", icon: FileText },
        { title: "QR Pay", desc: "Print a code for your shop counter. Customer scans to pay.", icon: Layout },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <SpotlightCard className="p-10 text-center rounded-sm">
            <div className="w-14 h-14 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
              <item.icon size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {item.desc}
            </p>
          </SpotlightCard>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const Developers = () => (
  <section id="api" className="py-32 px-6 bg-[#050a14] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
          <Terminal size={20} />
          <span className="font-mono text-xs uppercase tracking-widest">Developer First</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Integration in <br/><span className="text-emerald-500">Minutes.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Predictable REST API, stable webhooks, and sandboxed environments. Built for banks, logistics platforms, and mission-critical ERPs.
        </p>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
           <div>
             <h4 className="text-white font-bold text-sm uppercase mb-2">Libraries</h4>
             <p className="text-slate-500 text-sm">Node.js, PHP, Python, Java SDKs.</p>
           </div>
           <div>
             <h4 className="text-white font-bold text-sm uppercase mb-2">Support</h4>
             <p className="text-slate-500 text-sm">Direct engineer-to-engineer Slack channel.</p>
           </div>
        </div>

        <Link href="https://docs.sakurapay.co.tz" className="text-emerald-400 font-bold flex items-center gap-2 hover:text-white transition-colors uppercase text-xs tracking-widest">
           Read Documentation <ArrowRight size={14} />
        </Link>
      </ScrollReveal>

      {/* CODE TERMINAL */}
      <ScrollReveal delay={0.2}>
        <div className="rounded-lg overflow-hidden bg-[#020617] border border-white/10 shadow-2xl font-mono text-sm">
          <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="ml-auto text-xs text-slate-500">bash</div>
          </div>
          <div className="p-6 text-slate-300 space-y-4">
            <div>
              <span className="text-emerald-500">➜</span> <span className="text-blue-400">~</span> curl https://api.sakurapay.co.tz/v1/charges \
            </div>
            <div className="pl-4 text-slate-400">
              -u sk_test_4eC39HqLyj...: \<br/>
              -d amount=25000 \<br/>
              -d currency=tzs \<br/>
              -d source=mpesa
            </div>
            <div className="text-emerald-500">
              &#123;<br/>
              &nbsp;&nbsp;"id": "ch_1I5j3X2eZv",<br/>
              &nbsp;&nbsp;"amount": 25000,<br/>
              &nbsp;&nbsp;"status": "succeeded"<br/>
              &#125;
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Security = () => (
  <section id="security" className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <ShieldCheck size={48} className="text-emerald-500 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-white mb-6">Security is the Foundation.</h2>
        <p className="text-slate-400 text-lg mb-12">
          We operate under strict security practices designed for mission-critical financial environments.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "PCI-DSS Aligned", desc: "Industry standard control measures." },
          { title: "Encrypted", desc: "Data encrypted at rest and in transit." },
          { title: "Fraud Guard", desc: "AI-driven monitoring for suspicious activity." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-8 rounded-sm bg-[#050a14] border border-white/5 hover:border-emerald-500/30 transition-colors">
              <Lock className="text-emerald-500 mb-4 mx-auto" size={24} />
              <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">{s.title}</h3>
              <p className="text-sm text-slate-500">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="py-32 px-6 bg-[#050a14] border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-6">Transparent Pricing</h2>
        <p className="text-slate-400 text-lg mb-12">
          Pricing structured around your transaction volume. No hidden setup fees.
        </p>
        
        <div className="inline-block p-8 border border-white/10 bg-[#0B1120] rounded-sm text-left max-w-lg w-full">
           <div className="flex items-center gap-4 mb-6">
              <Activity className="text-emerald-500" />
              <h3 className="text-white font-bold uppercase tracking-widest">Enterprise Volume</h3>
           </div>
           <ul className="space-y-4 mb-8">
              <li className="flex justify-between text-slate-400 text-sm border-b border-white/5 pb-2">
                 <span>Setup Fee</span>
                 <span className="text-white">Free</span>
              </li>
              <li className="flex justify-between text-slate-400 text-sm border-b border-white/5 pb-2">
                 <span>Monthly Fee</span>
                 <span className="text-white">Free</span>
              </li>
              <li className="flex justify-between text-slate-400 text-sm border-b border-white/5 pb-2">
                 <span>Transaction Fee</span>
                 <span className="text-emerald-400 font-bold">Custom %</span>
              </li>
           </ul>
           <Link href="/contact" className="block w-full py-4 bg-white text-black font-bold text-center text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all rounded-sm">
              Request Proposal
           </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0e0e0e] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          READY TO<br/>SCALE?
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Join over 500+ businesses across Tanzania using SakuraPay to power their growth.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-500 transition-all shadow-2xl">
            Create Account
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Contact Sales
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function SakuraPayPage() {
  return (
    <main className="min-h-screen bg-[#050a14] text-white selection:bg-emerald-500 selection:text-black font-sans cursor-none">
      <GlobalNavbar />
      <SakuraPayNav />
      
      <Hero />
      <Collections />
      <Disbursements />
      <Checkout />
      <Developers />
      <Security />
      <Pricing />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}