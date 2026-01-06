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
  ShieldCheck, 
  Lock, 
  Eye, 
  Server, 
  FileWarning, 
  Activity, 
  HardDrive, 
  Fingerprint, 
  Users,
  AlertOctagon,
  CheckCircle2,
  Terminal
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
      className={`relative border border-white/10 bg-[#0B1120] overflow-hidden group ${className}`}
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

const SecurityNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Design", id: "design" },
    { label: "Stack", id: "stack" },
    { label: "Integrity", id: "integrity" },
    { label: "Policies", id: "policies" },
    { label: "Local Risks", id: "local" },
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
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.label === 'Overview' ? 'text-violet-500' : 'text-slate-400 hover:text-white'}`}
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
    <section id="hero" className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#030712]">
      {/* Defensive Grid Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
            alt="Cybersecurity Architecture"
            fill
            className="object-cover opacity-10 mix-blend-luminosity"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-[#030712]" />
         {/* Subtle Waveform Line */}
         <div className="absolute top-1/2 left-0 right-0 h-px bg-violet-500/20 shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-full mb-8 backdrop-blur-md mx-auto">
             <ShieldCheck size={14} className="text-violet-400" />
             <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Zero-Tolerance Failure Policy</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.95] tracking-tighter mb-8 max-w-5xl mx-auto">
            PROTECTION YOU<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-slate-500">
                CAN DEPEND ON.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             Every server, workload, and connection runs inside a hardened environment designed to protect uptime, data integrity, and operational continuity.
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#stack" className="group relative px-10 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-violet-200 transition-colors shadow-2xl">
                View Security Stack
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

const SecurityByDesign = () => (
  <section id="design" className="py-24 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">We don’t “add” security. We architect it.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
             Most hosting platforms treat security as an optional upgrade. We treat it as a foundational commitment.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { title: "Layered Defense", icon: <Lock />, desc: "Firewalls, isolation, intrusion prevention, controlled access." },
          { title: "Access Governance", icon: <Fingerprint />, desc: "Authentication discipline, activity logging, audit trail retention." },
          { title: "Threat Prevention", icon: <FileWarning />, desc: "Exploit hardening, signature monitoring, vulnerability lifecycle." },
          { title: "Human Oversight", icon: <Eye />, desc: "Incidents do not wait for tickets — they are escalated." },
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

const CoreStack = () => (
  <section id="stack" className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="mb-12">
           <h2 className="text-3xl font-bold text-white mb-4">Core Protection Matrix</h2>
           <p className="text-slate-400">Our goal is stability — not convenience that compromises risk posture.</p>
        </div>
        
        <div className="overflow-hidden rounded-sm border border-white/10 bg-[#030712]">
          <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white border-b border-white/10">
            <div className="col-span-3">Layer</div>
            <div className="col-span-9">Protection Standard</div>
          </div>
          {[
            { l: "Network Edge", p: "Rate-limiting, injection defense, suspicious request isolation" },
            { l: "Server Layer", p: "Kernel hardening, process isolation, exploit mitigation" },
            { l: "Application", p: "WAF policy controls, brute-force suppression" },
            { l: "Identity", p: "Privilege management & SSH governance" },
            { l: "Monitoring", p: "Real-time anomaly telemetry & escalation" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center group">
              <div className="col-span-3 text-violet-400 font-bold text-sm md:text-base font-mono">{row.l}</div>
              <div className="col-span-9 text-slate-400 text-sm md:text-base">{row.p}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const DataIntegrity = () => (
  <section id="integrity" className="py-24 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-8">
          If something fails,<br/>
          <span className="text-violet-500">it must recover.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          We don't hope for the best. We plan for the worst. Recovery is a process — not a hope.
        </p>
        
        <ul className="space-y-6">
           {[
             "Structured Backup Cadence",
             "Snapshot Rollbacks",
             "Recovery Drills",
             "Incident Report Culture"
           ].map((feat, i) => (
             <li key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-900/20 border border-violet-500/20 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-violet-500" />
                </div>
                <span className="text-slate-300 font-bold text-sm">{feat}</span>
             </li>
           ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative rounded-sm border border-white/10 bg-[#0a0a0a] p-8">
           <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
              <HardDrive size={24} className="text-violet-500" />
              <div className="text-sm font-mono text-white">SNAPSHOT_TIMELINE</div>
           </div>
           
           <div className="space-y-4">
              {[
                { time: "00:00", status: "COMPLETE", size: "4.2GB" },
                { time: "06:00", status: "COMPLETE", size: "4.2GB" },
                { time: "12:00", status: "COMPLETE", size: "4.3GB" },
                { time: "18:00", status: "COMPLETE", size: "4.3GB" },
              ].map((log, i) => (
                 <div key={i} className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500">{log.time} UTC</span>
                    <span className="text-green-500">{log.status}</span>
                    <span className="text-slate-400">{log.size}</span>
                 </div>
              ))}
              <div className="flex justify-between items-center text-xs font-mono animate-pulse">
                 <span className="text-slate-500">23:59 UTC</span>
                 <span className="text-violet-500">PENDING...</span>
                 <span className="text-slate-600">--</span>
              </div>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Policies = () => (
  <section id="policies" className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-5xl mx-auto">
       <ScrollReveal>
         <div className="border border-red-900/30 bg-red-950/10 rounded-sm p-10 text-center">
            <AlertOctagon className="text-red-500 mx-auto mb-6" size={48} />
            <h2 className="text-2xl font-bold text-white mb-6">What We Do Not Allow</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
               To protect our reputation and the IP score of our other clients, we maintain strict exclusion policies. We prefer fewer clients with stronger infrastructure outcomes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
               <div className="flex gap-3 text-sm text-red-200/70"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> High-risk anonymous hosting</div>
               <div className="flex gap-3 text-sm text-red-200/70"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Bulk scraping / Fraud traffic</div>
               <div className="flex gap-3 text-sm text-red-200/70"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Uncontrolled multi-tenant dev envs</div>
               <div className="flex gap-3 text-sm text-red-200/70"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Anything threatening fleet stability</div>
            </div>
         </div>
       </ScrollReveal>
    </div>
  </section>
);

const LocalContext = () => (
  <section id="local" className="py-24 px-6 bg-[#030712] border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12 text-center">Tanzania Risk Context</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Mobile-First Traffic", desc: "Optimized firewall rules for carrier-grade NAT IPs." },
          { label: "Unstable Routing", desc: "Resilient connection handling for fluctuating ISP routes." },
          { label: "Payment Regs", desc: "Compliance-ready logs for fintech integrations." },
          { label: "Email Fraud", desc: "Aggressive SPF/DKIM enforcement for corporate domains." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-6 border border-white/10 bg-[#0a0a0a] rounded-sm hover:border-violet-500/30 transition-all group">
              <h3 className="text-white font-bold uppercase text-xs mb-3 group-hover:text-violet-400 transition-colors">{item.label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <p className="text-center text-xs text-slate-600 mt-12 font-mono">
         Our security approach reflects how systems are actually used here — not how textbooks imagine them.
      </p>
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
          TRUST IS<br/>EARNED.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Infrastructure is only useful when it’s secure. Let’s review your posture.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-200 transition-all shadow-2xl">
            Speak to Security Engineer
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Request Risk Assessment
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-violet-500 selection:text-white font-sans cursor-none">
      
      <SecurityNav />
      
      <Hero />
      <SecurityByDesign />
      <CoreStack />
      <DataIntegrity />
      <Policies />
      <LocalContext />
      <CTA />
      
      
    </main>
  );
}