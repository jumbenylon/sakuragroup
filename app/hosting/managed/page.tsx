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
  Activity, 
  ShieldCheck, 
  GitBranch, 
  RefreshCw, 
  AlertOctagon, 
  CheckCircle2, 
  FileText, 
  Users, 
  Layers, 
  Code2, 
  Server
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
      className={`relative border border-white/10 bg-[#020617] overflow-hidden group ${className}`}
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

const ManagedNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Philosophy", id: "philosophy" },
    { label: "Responsibilities", id: "responsibilities" },
    { label: "Care Cycle", id: "cycle" },
    { label: "Tiers", id: "tiers" },
    { label: "Stack", id: "stack" },
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
                ${link.label === 'Overview' ? 'text-violet-400' : 'text-slate-400 hover:text-white'}`}
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
      {/* Background Image Overlay */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"
            alt="Platform Care"
            fill
            className="object-cover opacity-20 mix-blend-screen grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-[#020617]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c3aed05_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-950/30 border border-violet-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Activity size={14} className="text-violet-400 animate-pulse" />
             <span className="text-[10px] font-bold text-violet-300 uppercase tracking-widest">Platform Stewardship</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.95] tracking-tighter mb-8">
            YOUR PLATFORM,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-slate-400">
                ACTIVELY CARED FOR.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
             Continuous maintenance, stability monitoring, version governance, and structured improvements — not just reactive fixes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
             {["Human-Led", "Security & Reliability", "Tanzania-Ready"].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1 border border-white/5 bg-white/5 rounded-full">
                   <CheckCircle2 size={12} className="text-violet-500" />
                   <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">{badge}</span>
                </div>
             ))}
          </div>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-white text-[#020617] font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-violet-200 transition-colors shadow-2xl">
                Request Review
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Talk to Engineer
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section id="philosophy" className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
      <ScrollReveal>
        <div className="p-10 border border-red-900/20 bg-red-950/5 rounded-sm h-full">
           <div className="flex items-center gap-3 mb-6 text-red-400">
              <AlertOctagon />
              <h3 className="text-xl font-bold">The "Fix-It" Trap</h3>
           </div>
           <p className="text-slate-400 mb-8 leading-relaxed">
              Most businesses treat their platform like a static file. They only call for help when it breaks.
           </p>
           <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> No-plan developer changes</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Patch-only maintenance</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Unknown versions & plugin chaos</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> "Call us when it breaks"</li>
           </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="p-10 border border-violet-500/20 bg-violet-950/5 rounded-sm h-full">
           <div className="flex items-center gap-3 mb-6 text-violet-400">
              <ShieldCheck />
              <h3 className="text-xl font-bold">The Managed Approach</h3>
           </div>
           <p className="text-slate-400 mb-8 leading-relaxed">
              We reduce future risk, not just fix current problems. A platform is a living environment.
           </p>
           <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Controlled update cycles</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Observed performance behavior</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Documented change history</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-violet-500 shrink-0" size={16} /> Preventative stability planning</li>
           </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Responsibilities = () => (
  <section id="responsibilities" className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Core Responsibilities</h2>
          <p className="text-slate-400">What we actually do to keep you online.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { title: "Performance", icon: <Activity />, desc: "Uptime observation, resource strain detection, load monitoring." },
          { title: "Security", icon: <ShieldCheck />, desc: "Vulnerability scanning, credential hygiene, firewall discipline." },
          { title: "Governance", icon: <GitBranch />, desc: "CMS version control, dependency planning, safe updates." },
          { title: "Recovery", icon: <RefreshCw />, desc: "Tested backups, failure awareness, recovery workflows." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-8 h-full text-center hover:border-violet-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-violet-400 group-hover:bg-violet-400/10 transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-white font-bold uppercase text-sm tracking-widest mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CareCycle = () => (
  <section id="cycle" className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-white mb-4">The Care Cycle</h2>
           <p className="text-slate-400">We don’t push change randomly — we coordinate it.</p>
        </div>
      </ScrollReveal>

      <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-12">
         {[
           { title: "Observe", desc: "Monitor baseline performance and error logs." },
           { title: "Evaluate", desc: "Assess updates or changes for risk." },
           { title: "Adjust", desc: "Apply patches or config tweaks in staging." },
           { title: "Confirm", desc: "Verify stability post-change." },
           { title: "Improve", desc: "Recommend long-term optimizations." },
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

const ServiceTiers = () => (
  <section id="tiers" className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Service Levels</h2>
          <p className="text-slate-400">From essential maintenance to mission-critical stewardship.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Tier 1 */}
        <SpotlightCard className="p-8 h-full bg-[#020617]">
           <Layers className="text-slate-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Essential Care</h3>
           <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">SMEs & Startups</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Stability checks</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Light security observations</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-600" /> Guided best-practice advice</li>
           </ul>
        </SpotlightCard>

        {/* Tier 2 */}
        <SpotlightCard className="p-8 h-full bg-[#020617] border-violet-500/30">
           <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              Most Popular
           </div>
           <Activity className="text-violet-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Stewardship Care</h3>
           <p className="text-violet-400 text-xs uppercase tracking-widest mb-6">Growing Teams</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Coordinated update cycles</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Incident log + root cause</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Risk-aware improvements</li>
           </ul>
        </SpotlightCard>

        {/* Tier 3 */}
        <SpotlightCard className="p-8 h-full bg-[#020617]">
           <ShieldCheck className="text-slate-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Mission Critical</h3>
           <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">High Responsibility</p>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Deployment governance</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Failure rollback planning</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Executive reporting</li>
           </ul>
        </SpotlightCard>
      </div>
    </div>
  </section>
);

const TechStack = () => (
  <section id="stack" className="py-24 px-6 bg-[#020617] border-t border-white/5">
    <div className="max-w-5xl mx-auto text-center">
       <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-8">Environments We Steward</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 opacity-70">
             {["WordPress / Woo", "Laravel / PHP", "Node.js", "Custom APIs", "Multi-Vendor Stacks"].map((tool, i) => (
                <div key={i} className="px-6 py-3 border border-white/10 rounded-full text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Code2 size={14} /> {tool}
                </div>
             ))}
          </div>
          <p className="text-slate-600 text-xs mt-8">
             We support both agency-built and inherited legacy systems.
          </p>
       </ScrollReveal>
    </div>
  </section>
);

const HumanLed = () => (
  <section className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
       <ScrollReveal>
          <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10">
             <Image 
               src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1000&auto=format&fit=crop"
               alt="Human Support"
               fill
               className="object-cover opacity-50 grayscale"
             />
          </div>
       </ScrollReveal>
       
       <ScrollReveal delay={0.2}>
          <div>
             <div className="flex items-center gap-3 mb-6 text-violet-400">
                <Users size={24} />
                <h2 className="text-2xl font-bold text-white">Context & Continuity</h2>
             </div>
             <p className="text-slate-400 mb-6 leading-relaxed">
                Continuity is a performance advantage. You work with the same team who knows your history, your configurations, and your business quirks.
             </p>
             <p className="text-sm font-mono text-slate-500 border-l-2 border-violet-500/50 pl-4">
                "No re-explaining the problem every time you call."
             </p>
          </div>
       </ScrollReveal>
    </div>
  </section>
);

const Documentation = () => (
  <section className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-4xl mx-auto text-center">
       <ScrollReveal>
          <FileText size={48} className="text-slate-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Accountability Ledger</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
             Knowledge belongs to your organization, not vendors. We maintain platform summaries, version records, and incident learning notes so you always own your data.
          </p>
       </ScrollReveal>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-2xl font-bold text-white mb-8">Managed Core FAQ</h2>
        <div className="space-y-4">
           {[
             { q: "Do you replace our developers?", a: "No. We protect the environment they work in. We handle stability; they handle features." },
             { q: "Do you include redesigns?", a: "No. Feature building is a separate project. Managed Core is about stability and governance." },
             { q: "Can you manage multiple environments?", a: "Yes. We support staged deployments (Dev -> Staging -> Prod) for enterprise clients." },
             { q: "Is this only for Sakura-hosted sites?", a: "Primary focus is internal, but we can manage external AWS/DigitalOcean environments after review." },
           ].map((item, i) => (
             <div key={i} className="p-6 border border-white/5 bg-[#020617] rounded-sm">
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
          TREAT IT LIKE<br/>AN ASSET.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          If your platform matters, give it structured responsibility.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-[#020617] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-200 transition-all shadow-2xl">
            Begin Managed Care
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Speak With Steward
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function ManagedCorePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-violet-500 selection:text-white font-sans cursor-none">
      <GlobalNavbar />
      <ManagedNav />
      
      <Hero />
      <Philosophy />
      <Responsibilities />
      <CareCycle />
      <ServiceTiers />
      <TechStack />
      <HumanLed />
      <Documentation />
      <FAQ />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}