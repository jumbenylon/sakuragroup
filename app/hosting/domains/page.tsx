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
  Globe, 
  ShieldCheck, 
  Lock, 
  FileKey, 
  Server, 
  Users, 
  Briefcase, 
  AlertOctagon, 
  CheckCircle2,
  RefreshCw,
  MailCheck,
  Building2
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
      className={`relative border border-white/10 bg-[#030712] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.10), 
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

const DomainsSubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Asset Value", id: "value" },
    { label: "TLD Coverage", id: "coverage" },
    { label: "Management Tiers", id: "tiers" },
    { label: "Integrity", id: "integrity" },
    { label: "Transfers", id: "transfers" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#030712]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          <Link href="/hosting" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors mr-4 hidden md:block">
            ← SakuraHost
          </Link>
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={`#${link.id}`} 
              className="text-[10px] font-bold uppercase tracking-widest transition-colors text-violet-400/70 hover:text-violet-400"
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
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#020617] overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Global Domains"
            fill
            className="object-cover opacity-30 mix-blend-screen"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent" />
      </motion.div>
      {/* ... keep content ... */}
    </section>
  );
};

const WhyDomainsMatter = () => (
  <section id="value" className="py-24 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10">
           <Image 
             src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2000&auto=format&fit=crop"
             alt="Digital Asset"
             fill
             className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#030712] to-transparent" />
           <div className="absolute bottom-8 left-8">
              <div className="inline-block px-3 py-1 bg-violet-600 text-white text-[10px] font-bold uppercase tracking-widest mb-2">Asset Class</div>
              <h3 className="text-2xl font-bold text-white">Digital Real Estate</h3>
           </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <h2 className="text-3xl font-bold text-white mb-6">Not a Commodity.<br/>An Asset of Record.</h2>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          A domain is not just a web address. It is the root of your organization’s identity, security, and credibility. When mismanaged, it exposes you to fraud and operational collapse.
        </p>
        
        <div className="space-y-6">
           {[
             { title: "Identity Anchor", desc: "It controls email trust and brand verification." },
             { title: "Digital Signature", desc: "It validates your SSL and encrypted communications." },
             { title: "Brand Defense", desc: "It prevents impersonation and phishing attacks." }
           ].map((item, i) => (
             <div key={i} className="flex gap-4">
                <div className="mt-1 w-1.5 h-1.5 bg-violet-500 rounded-full shrink-0" />
                <div>
                   <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                   <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const TLDCoverage = () => (
  <section id="coverage" className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="mb-12 text-center">
           <h2 className="text-3xl font-bold text-white mb-4">Coverage & Authority</h2>
           <p className="text-slate-400">We prioritize TLDs that matter to Tanzanian entities.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           <div className="p-8 border border-white/10 bg-[#030712] rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                 <Building2 className="text-violet-500" />
                 <h3 className="text-xl font-bold text-white">Local & Regional</h3>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.co.tz</li>
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.tz</li>
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.or.tz</li>
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.ac.tz</li>
                 <li className="text-violet-400 font-mono text-sm border-b border-violet-500/20 pb-2 flex items-center gap-2">.go.tz <Lock size={12} /></li>
              </ul>
           </div>

           <div className="p-8 border border-white/10 bg-[#030712] rounded-sm">
              <div className="flex items-center gap-3 mb-6">
                 <Globe className="text-indigo-500" />
                 <h3 className="text-xl font-bold text-white">Global & Corporate</h3>
              </div>
              <ul className="grid grid-cols-2 gap-4">
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.com</li>
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.org</li>
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.africa</li>
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.io</li>
                 <li className="text-slate-300 font-mono text-sm border-b border-white/5 pb-2">.cloud</li>
              </ul>
           </div>
        </div>
        
        <p className="text-center text-xs text-slate-600 mt-8 font-mono">
           Restricted TLDs (like .go.tz) follow strict eligibility validation. We do not bypass policy.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

const ManagementTiers = () => (
  <section id="tiers" className="py-32 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl font-bold text-white mb-16 text-center">Domain Management Models</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Standard */}
        <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
           <Users className="text-slate-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Standard Registration</h3>
           <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Individuals & SMEs</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Simple registration</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Basic DNS tools</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Auto-renewal reminders</li>
           </ul>
        </SpotlightCard>

        {/* Stewardship */}
        <SpotlightCard className="p-8 h-full bg-[#0a0a0a] border-violet-500/30">
           <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              Corporate Choice
           </div>
           <ShieldCheck className="text-violet-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Business Stewardship</h3>
           <p className="text-violet-400 text-xs uppercase tracking-widest mb-6">Mission Critical</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Registrar-level monitoring</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Change-control validation</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Safe-transfer protocol</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Admin access governance</li>
           </ul>
           <p className="text-xs text-slate-500 italic mt-auto border-t border-white/5 pt-4">
              "So executives never ask: Who owns our domain?"
           </p>
        </SpotlightCard>

        {/* Partner */}
        <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
           <Briefcase className="text-indigo-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Reseller Partner</h3>
           <p className="text-indigo-400 text-xs uppercase tracking-widest mb-6">Vetted Agencies Only</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Wholesale registrar access</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Tiered pricing</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Compliance onboarding</li>
           </ul>
        </SpotlightCard>
      </div>
    </div>
  </section>
);

const RiskPhilosophy = () => (
  <section id="integrity" className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
       <ScrollReveal>
          <div className="relative aspect-video w-full md:w-96 rounded-sm overflow-hidden border border-white/10">
             <Image 
               src="https://images.unsplash.com/photo-1581092919535-71285b2b7b3b?q=80&w=1000&auto=format&fit=crop"
               alt="Risk Management"
               fill
               className="object-cover opacity-50 grayscale"
             />
          </div>
       </ScrollReveal>
       
       <ScrollReveal delay={0.2}>
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-red-400">
                <AlertOctagon size={24} />
                <h2 className="text-2xl font-bold">Risk & Responsibility</h2>
             </div>
             <p className="text-slate-400 leading-relaxed">
                Our reputation depends on the integrity of the domains we manage. We are not an open marketplace for abuse.
             </p>
             <ul className="space-y-3">
                <li className="text-sm text-slate-300 flex gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> No anonymous bulk resellers</li>
                <li className="text-sm text-slate-300 flex gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> No high-risk mass-domain activity</li>
                <li className="text-sm text-slate-300 flex gap-3"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> No untraceable admin transfers</li>
             </ul>
          </div>
       </ScrollReveal>
    </div>
  </section>
);

const TransferWorkflow = () => (
  <section id="transfers" className="py-24 px-6 bg-[#030712] border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <RefreshCw size={48} className="text-violet-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-6">Safe Transfer Protocol</h2>
        <p className="text-slate-400 mb-12">
          Migrating a domain is high-risk if done poorly. We handle it safely.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-5 gap-4">
         {[
           { step: "01", label: "Verify", desc: "Proof of Ownership" },
           { step: "02", label: "Unlock", desc: "Registry Unlock" },
           { step: "03", label: "Window", desc: "Risk-Aware Timing" },
           { step: "04", label: "Sync", desc: "Nameserver Transition" },
           { step: "05", label: "Watch", desc: "Stability Monitor" },
         ].map((s, i) => (
           <ScrollReveal key={i} delay={i * 0.1}>
             <div className="bg-[#0a0a0a] p-4 border border-white/5 rounded-sm">
                <div className="text-violet-500 font-mono text-xs mb-2">{s.step}</div>
                <h3 className="text-white font-bold text-xs uppercase tracking-wide mb-1">{s.label}</h3>
                <p className="text-[10px] text-slate-500">{s.desc}</p>
             </div>
           </ScrollReveal>
         ))}
      </div>
      
      <div className="mt-12">
         <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
            No rushed transfers. No unplanned outages.
         </p>
      </div>
    </div>
  </section>
);

const DNSSafety = () => (
  <section className="py-24 px-6 bg-[#030712]">
    <div className="max-w-4xl mx-auto bg-violet-900/10 border border-violet-500/20 p-8 rounded-sm flex flex-col md:flex-row gap-8 items-center">
       <div className="p-4 bg-violet-500/20 rounded-full">
          <MailCheck size={32} className="text-violet-400" />
       </div>
       <div>
          <h3 className="text-xl font-bold text-white mb-2">Email Integrity Protection</h3>
          <p className="text-slate-400 text-sm mb-4">
             Domains break most businesses at the email layer. We proactively monitor MX records and support SPF/DKIM alignment to ensure your corporate comms land in the inbox.
          </p>
          <Link href="/contact" className="text-violet-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
             Learn about DNS Safety →
          </Link>
       </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-2xl font-bold text-white mb-8">Domain Operations FAQ</h2>
        <div className="space-y-4">
           {[
             { q: "Can you manage our domain without moving hosting?", a: "Yes. Many clients keep hosting elsewhere but move the domain to us for governance." },
             { q: "Do you help organizations regain domain access?", a: "Yes, we perform forensic domain recovery audits on a case-by-case basis." },
             { q: "Can we assign multiple administrators?", a: "Yes, our stewardship tier supports role-based access control (RBAC)." },
             { q: "Do you manage renewal on behalf of clients?", a: "For Stewardship clients, we assume renewal responsibility to prevent accidental expiration." },
           ].map((item, i) => (
             <div key={i} className="p-6 border border-white/5 bg-[#030712] rounded-sm">
                <h4 className="text-white font-bold text-sm mb-2">{item.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
             </div>
           ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          SAFE HANDS.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          If your domain matters, put it under proper stewardship.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-200 transition-all shadow-2xl">
            Register Domain
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Speak with Operations
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function DomainsPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-violet-500 selection:text-white font-sans cursor-none">
      
      <DomainsSubNav />
      
      <Hero />
      <WhyDomainsMatter />
      <TLDCoverage />
      <ManagementTiers />
      <RiskPhilosophy />
      <TransferWorkflow />
      <DNSSafety />
      <FAQ />
      <CTA />
      
      
    </main>
  );
}
