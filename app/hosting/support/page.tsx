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
  LifeBuoy, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Users, 
  GitPullRequest, 
  AlertTriangle, 
  CheckCircle2, 
  History,
  Headphones,
  BookOpen
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
      className={`relative border border-white/10 bg-[#020617] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(124, 58, 237, 0.10), 
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

const SupportNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Philosophy", id: "philosophy" },
    { label: "Tiers", id: "tiers" },
    { label: "Incident Cycle", id: "incident" },
    { label: "Change Control", id: "change" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#020617]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
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
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.label === 'Overview' ? "text-violet-400" : "text-slate-400 hover:text-white"}`}
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
    <section id="hero" className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#020617]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=2000&auto=format&fit=crop"
            alt="Service Operations"
            fill
            className="object-cover opacity-20 mix-blend-screen grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-[#020617]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c3aed05_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-950/20 border border-violet-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <LifeBuoy size={14} className="text-violet-400" />
             <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest">Service Operations Framework</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.95] tracking-tighter mb-8">
            SUPPORT THAT<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-slate-400">
                STAYS WITH YOU.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
             A dedicated Service Operations framework — not ticket chaos. Built for organizations where uptime, continuity, and accountability matter.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
             {["Human-Led Teams", "Response Discipline", "Change-Controlled"].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1 border border-white/5 bg-white/5 rounded-full">
                   <CheckCircle2 size={12} className="text-violet-500" />
                   <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">{badge}</span>
                </div>
             ))}
          </div>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-violet-200 transition-colors shadow-2xl">
                Onboard Organization
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Speak to Ops Lead
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const WhatServiceOpsMeans = () => (
  <section id="philosophy" className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
      <ScrollReveal>
        <div className="p-10 border border-red-900/20 bg-red-950/5 rounded-sm h-full">
           <div className="flex items-center gap-3 mb-6 text-red-400">
              <AlertTriangle />
              <h3 className="text-xl font-bold">The Common Reality</h3>
           </div>
           <p className="text-slate-400 mb-8 leading-relaxed">
              Most support is reactive and chaotic. It relies on individual heroes, not systems.
           </p>
           <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> One-off fixes with no history</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> No structured escalation path</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> No accountability trail</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> &quot;Call the guy who knows&quot; mentality</li>
           </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="p-10 border border-violet-500/20 bg-violet-950/5 rounded-sm h-full">
           <div className="flex items-center gap-3 mb-6 text-violet-400">
              <Activity />
              <h3 className="text-xl font-bold">Our Operating Philosophy</h3>
           </div>
           <p className="text-slate-400 mb-8 leading-relaxed">
              We bring disciplined Service Operations to Tanzanian businesses.
           </p>
           <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Incidents are documented &amp; mapped</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Changes are controlled &amp; reviewed</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Response is coordinated — not improvised</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Knowledge stays with the organization</li>
           </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const SupportTiers = () => (
  <section id="tiers" className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Support Tiers</h2>
          <p className="text-slate-400">Structured levels of engagement for every stage of maturity.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        <SpotlightCard className="p-8 h-full bg-[#020617]">
           <Headphones className="text-slate-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Business Care</h3>
           <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">SMEs &amp; Teams</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Basic troubleshooting</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Account &amp; access support</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Guided recommendations</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Light advisory assistance</li>
           </ul>
        </SpotlightCard>

        <SpotlightCard className="p-8 h-full bg-[#020617] border-violet-500/30">
           <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              Standard
           </div>
           <Activity className="text-violet-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Managed Operations</h3>
           <p className="text-violet-400 text-xs uppercase tracking-widest mb-6">Growing Organizations</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Structured incident handling</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> SLA-guided response</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Root-cause documentation</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Environment hygiene audit</li>
           </ul>
        </SpotlightCard>

        <SpotlightCard className="p-8 h-full bg-[#020617]">
           <ShieldCheck className="text-slate-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Enterprise Stewardship</h3>
           <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Critical Environments</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Change-management workflow</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Risk-review before action</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Failure-rollback planning</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Leadership reporting</li>
           </ul>
        </SpotlightCard>
      </div>
    </div>
  </section>
);

const IncidentProcess = () => (
  <section id="incident" className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-white mb-4">How Incidents Are Handled</h2>
           <p className="text-slate-400">Our goal is not just to fix incidents — but to reduce their recurrence.</p>
        </div>
      </ScrollReveal>

      <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-12">
         {[
           { title: "Detection", desc: "Automated alert or client escalation received." },
           { title: "Qualification", desc: "Severity assessment and team assignment." },
           { title: "Response", desc: "Contained action to restore service." },
           { title: "Analysis", desc: "Root cause mapping (Why did this happen?)." },
           { title: "Stabilization", desc: "Confirmation of fix and monitoring." },
           { title: "Prevention", desc: "Recommendations to prevent recurrence." },
         ].map((step, i) => (
           <ScrollReveal key={i} delay={i * 0.1}>
             <div className="relative pl-8 md:pl-12">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#020617] border border-violet-500 rounded-full" />
                <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-3">
                   <span className="text-violet-500 font-mono text-xs opacity-70">0{i + 1}</span> {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                   {step.desc}
                </p>
             </div>
           </ScrollReveal>
         ))}
      </div>
    </div>
  </section>
);

const ChangeManagement = () => (
  <section id="change" className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
       <ScrollReveal>
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-violet-400">
                <GitPullRequest size={24} />
                <h2 className="text-2xl font-bold text-white">Change Discipline</h2>
             </div>
             <p className="text-slate-400 leading-relaxed">
                &quot;Responsible operations protect productivity.&quot; We don&apos;t just change settings on a whim. Every major action follows a protocol.
             </p>
             <ul className="space-y-4">
                <li className="text-sm text-slate-300 flex gap-3"><div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2" /> Nothing changes without review</li>
                <li className="text-sm text-slate-300 flex gap-3"><div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2" /> Operational impact is evaluated</li>
                <li className="text-sm text-slate-300 flex gap-3"><div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2" /> Rollback path is defined</li>
                <li className="text-sm text-slate-300 flex gap-3"><div className="w-1.5 h-1.5 bg-violet-500 rounded-full mt-2" /> Teams are notified in advance</li>
             </ul>
          </div>
       </ScrollReveal>
       
       <ScrollReveal delay={0.2}>
          <div className="p-8 border border-white/10 bg-[#020617] rounded-sm">
             <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-slate-500">TICKET #8921</span>
                <span className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">PENDING APPROVAL</span>
             </div>
             <div className="space-y-4 text-sm font-mono">
                <div>
                   <div className="text-slate-500 text-[10px] uppercase">Action</div>
                   <div className="text-white">Upgrade Database Node (v14 → v16)</div>
                </div>
                <div>
                   <div className="text-slate-500 text-[10px] uppercase">Risk</div>
                   <div className="text-white">Medium (10m Downtime)</div>
                </div>
                <div>
                   <div className="text-slate-500 text-[10px] uppercase">Rollback</div>
                   <div className="text-violet-400">Snapshot Restore (Auto)</div>
                </div>
             </div>
          </div>
       </ScrollReveal>
    </div>
  </section>
);

const HumanLed = () => (
  <section className="py-24 px-6 bg-[#020617] border-t border-white/5">
    <div className="max-w-5xl mx-auto text-center">
       <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-12">Human-Led. Not Call-Center.</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
             <div className="p-8 bg-red-950/5 border border-red-900/10 rounded-sm opacity-60">
                <h3 className="text-red-400 font-bold mb-4 uppercase text-xs tracking-widest">The Standard</h3>
                <ul className="text-slate-500 text-sm space-y-2">
                   <li>Chatbot replies</li>
                   <li>Random technicians</li>
                   <li>Conflicting instructions</li>
                </ul>
             </div>
             <div className="p-8 bg-violet-950/5 border border-violet-500/20 rounded-sm">
                <h3 className="text-violet-400 font-bold mb-4 uppercase text-xs tracking-widest">Sakura Ops</h3>
                <ul className="text-slate-300 text-sm space-y-2">
                   <li>Assigned operations team</li>
                   <li>Consistent environment context</li>
                   <li>Continuity — no re-explaining</li>
                </ul>
             </div>
          </div>
       </ScrollReveal>
    </div>
  </section>
);

const Knowledge = () => (
  <section className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-4xl mx-auto bg-[#020617] border border-white/10 p-10 rounded-sm text-center">
       <ScrollReveal>
          <BookOpen size={48} className="text-slate-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Knowledge Retention</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
             &quot;Knowledge belongs to your organization — not individuals.&quot; We maintain configuration references, ticket logs, and stability observations so your history is never lost.
          </p>
          <div className="flex justify-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
             <span>• Incident Logs</span>
             <span>• Config Maps</span>
             <span>• Stability Reports</span>
          </div>
       </ScrollReveal>
    </div>
  </section>
);

const FAQ = () => (
  <section id="faq" className="py-24 px-6 bg-[#020617] border-t border-white/5">
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-2xl font-bold text-white mb-8">Operations FAQ</h2>
        <div className="space-y-4">
           {[
             { q: "Do you support 24/7?", a: "Depends on your tier. Standard is Business Hours; Stewardship includes emergency off-hours intervention." },
             { q: "Do you replace our internal IT team?", a: "No. We collaborate with them. We handle the infrastructure; they handle the internal users." },
             { q: "Can you handle multi-vendor environments?", a: "Yes. We act as the technical point of contact to coordinate between your various software vendors." },
             { q: "Do you provide emergency intervention?", a: "Yes, for critical outages, we offer rapid response regardless of tier (subject to hourly rates)." },
           ].map((item, i) => (
             <div key={i} className="p-6 border border-white/5 bg-[#050a16] rounded-sm">
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
          RELIABILITY IS<br/>A DISCIPLINE.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          If your systems carry responsibility, your support should too.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-200 transition-all shadow-2xl">
            Begin Onboarding
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Speak With Ops Lead
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-violet-500 selection:text-white font-sans cursor-none">
      
      <SupportNav />
      
      <Hero />
      <WhatServiceOpsMeans />
      <SupportTiers />
      <IncidentProcess />
      <ChangeManagement />
      <HumanLed />
      <Knowledge />
      <FAQ />
      <CTA />
      
      
    </main>
  );
}