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
  Cpu, 
  Server, 
  Shield, 
  Activity, 
  Terminal, 
  Lock, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  Cloud,
  Box,
  Globe,
  CreditCard
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
              rgba(139, 92, 246, 0.15), 
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

const VPSNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Philosophy", id: "why" },
    { label: "Operating Modes", id: "modes" },
    { label: "Profiles", id: "profiles" },
    { label: "Security", id: "security" },
    { label: "Migration", id: "migration" },
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
      {/* Abstract Datacenter Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2000&auto=format&fit=crop"
            alt="Server Rack"
            fill
            className="object-cover opacity-20 mix-blend-screen grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-[#030712]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c3aed05_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-950/30 border border-violet-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Cpu size={14} className="text-violet-500 animate-pulse" />
             <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">High-Performance Compute</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            POWER, CONTROL &<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                PERFORMANCE.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             High-performance VPS and cloud environments engineered for workloads that demand reliability, security, and execution speed.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-xs font-mono text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-violet-500" /> NVMe Compute</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-violet-500" /> Resource Isolation</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-violet-500" /> Root Access</span>
          </div>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#profiles" className="group relative px-10 py-5 bg-violet-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-violet-500 transition-colors shadow-2xl">
                Deploy Environment
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
  <section id="why" className="py-24 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Production Environments. Not Experiments.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We design environments for Tanzanian businesses that need power and stability without chaos or configuration risk.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { title: "True Isolation", icon: <Box />, desc: "Your workloads don’t compete with noisy neighbors." },
          { title: "Latency Aware", icon: <Activity />, desc: "Optimized for regional routes & mobile-heavy traffic." },
          { title: "Operational Viz", icon: <Terminal />, desc: "Monitoring, logging, and stability tracking included." },
          { title: "Human Support", icon: <Server />, desc: "You speak to engineers — not ticket robots." },
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

const OperatingModes = () => (
  <section id="modes" className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="mb-16 text-center">
           <h2 className="text-3xl font-bold text-white mb-4">Two Operating Modes</h2>
           <p className="text-slate-400">Choose the level of control your team needs.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           {/* Managed */}
           <div className="p-10 border border-violet-500/30 bg-[#030712] rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                 Business Default
              </div>
              <Shield className="text-violet-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">Managed Cloud</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                For organizations that value stability, continuity, and accountability. We handle security hardening, patches, and recovery.
              </p>
              <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Security hardening & patch lifecycle</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Performance tuning & resource calibration</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-violet-500" /> Incident response & failure recovery</li>
              </ul>
           </div>

           {/* Hybrid */}
           <div className="p-10 border border-white/10 bg-[#030712] rounded-sm relative overflow-hidden group">
              <Terminal className="text-slate-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">Hybrid Cloud</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                Selective acceptance. Your team manages deployments and root access; we maintain platform integrity and physical security.
              </p>
              <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Root or elevated access</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Developer-friendly environments</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Optional escalation support</li>
              </ul>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Profiles = () => (
  <section id="profiles" className="py-32 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">Compute Profiles</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Engineered for capability, not just cheap specs.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Compute Essentials", use: "APIs & Corporate Systems", cpu: "2 vCPU", ram: "4GB RAM", price: "Custom" },
          { title: "Performance Tier", use: "SaaS & Data-Heavy Apps", cpu: "4 vCPU", ram: "8GB RAM", price: "Custom", popular: true },
          { title: "Mission Critical", use: "HA Core Platforms", cpu: "8+ vCPU", ram: "16GB+ RAM", price: "Custom" },
        ].map((plan, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className={`p-8 h-full bg-[#0a0a0a] flex flex-col ${plan.popular ? 'border-violet-500/50' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  Scale
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">{plan.use}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Cpu size={16} className="text-violet-500" /> {plan.cpu}
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Server size={16} className="text-violet-500" /> {plan.ram}
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Zap size={16} className="text-violet-500" /> NVMe Storage
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Activity size={16} className="text-violet-500" /> Tanzanian Latency Tuned
                </li>
              </ul>

              <Link href="/contact" className={`block text-center w-full py-3 text-xs font-bold uppercase tracking-widest rounded-sm border transition-all
                ${plan.popular 
                  ? 'bg-white text-black border-white hover:bg-violet-200' 
                  : 'border-white/20 text-white hover:bg-white/10'}`}>
                Request Quote
              </Link>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Security = () => (
  <section id="security" className="py-24 px-6 bg-[#030712]">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-8">
          Security is<br/>
          <span className="text-violet-500">Architecture.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Not an add-on. We build security into the routing, storage, and access layers. Designed to protect operations, not just servers.
        </p>
        
        <ul className="space-y-4">
           {[
             "Firewall & Intrusion Prevention",
             "Access Governance & Audit Tracing",
             "Anti-Exploit Configuration",
             "DDoS-Aware Routing"
           ].map((feat, i) => (
             <li key={i} className="flex items-center gap-3">
                <Lock size={18} className="text-violet-500" />
                <span className="text-slate-300 font-mono text-sm">{feat}</span>
             </li>
           ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="rounded-lg overflow-hidden bg-[#020617] border border-white/10 shadow-2xl font-mono text-sm relative">
           <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
           </div>
           <div className="p-6 space-y-4 text-slate-300">
              <p>root@sakura-vps:~# <span className="text-violet-400">./audit-security.sh</span></p>
              <div className="pl-4 border-l border-white/10">
                 <p>[OK] Firewall: Active (Strict)</p>
                 <p>[OK] SSH: Key-Only Auth</p>
                 <p>[OK] Updates: Patch Level Current</p>
                 <p>[OK] Backup: Snapshot Verified</p>
              </div>
              <p>root@sakura-vps:~# <span className="animate-pulse">_</span></p>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Migration = () => (
  <section id="migration" className="py-24 px-6 bg-[#050a16] border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <RefreshCw size={48} className="text-violet-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-6">Controlled Transition</h2>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
          We move platforms with care. Workload mapping, environment replication, and staged migration windows. No "lift and hope."
        </p>
        <Link href="/contact" className="inline-block px-8 py-3 bg-violet-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-500 transition-colors">
           Request Migration Review
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

const UseCases = () => (
  <section className="py-24 px-6 bg-[#030712]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12 text-center">Deployed For</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: "Logistics", icon: <Cloud />, text: "Routing & Telematics" },
          { label: "Fintech", icon: <CreditCard />, text: "Payment APIs & Ledgers" },
          { label: "Corporate", icon: <Globe />, text: "Internal Tools & ERPs" },
          { label: "Agencies", icon: <Box />, text: "Multi-Client Staging" },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-6 border border-white/10 bg-[#0a0a0a] rounded-sm hover:border-violet-500/30 transition-all group text-center">
              <div className="text-slate-500 mb-4 group-hover:text-violet-400 transition-colors mx-auto w-fit">
                {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-white font-bold uppercase text-xs mb-2">{item.label}</h3>
              <p className="text-xs text-slate-500">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-900/20 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          DEPLOY<br/>CONFIDENCE.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Deploy infrastructure you can trust — today and five years from now.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="#profiles" className="px-12 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-200 transition-all shadow-2xl">
            Deploy VPS
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Contact Engineering
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function VPSPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-violet-500 selection:text-white font-sans cursor-none">
      <GlobalNavbar />
      <VPSNav />
      
      <Hero />
      <Philosophy />
      <OperatingModes />
      <Profiles />
      <Security />
      <Migration />
      <UseCases />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}