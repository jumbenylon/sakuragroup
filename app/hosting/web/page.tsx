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
  Server, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Clock, 
  Users, 
  Database,
  Lock,
  RefreshCw,
  CheckCircle2,
  HardDrive
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

const WebHostingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Managed vs Hybrid", id: "types" },
    { label: "Plans", id: "plans" },
    { label: "Security", id: "security" },
    { label: "Migration", id: "migration" },
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
                ${link.label === 'Overview' ? 'text-emerald-500' : 'text-slate-400 hover:text-white'}`}
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
      {/* Emerald Business Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop"
            alt="Server Infrastructure"
            fill
            className="object-cover opacity-20 mix-blend-screen grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/30 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Business-Grade Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            FAST. SECURE.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                BUILT FOR BUSINESS.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             Managed web hosting engineered for uptime, speed, and operational continuity — with local support you can depend on.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-xs font-mono text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> NVMe Storage</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> LiteSpeed Stack</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> 99.9% Uptime</span>
          </div>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#plans" className="group relative px-10 py-5 bg-emerald-600 text-[#020617] font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-emerald-500 transition-colors shadow-2xl">
                View Plans
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Talk to Support
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Differentiation = () => (
  <section id="features" className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not hobby hosting. Business infrastructure.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Most hosting is sold as space and bandwidth. We treat hosting as an operational responsibility — where performance, reliability, and support define success.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { title: "Performance First", icon: <Zap />, desc: "Optimized for load speeds across Tanzanian networks and mobile connections." },
          { title: "Security Standard", icon: <ShieldCheck />, desc: "Malware defense, real-time monitoring, and SSL on every project." },
          { title: "Resource Stability", icon: <Server />, desc: "Isolation prevents “noisy neighbor” slow-downs on shared resources." },
          { title: "Human Support", icon: <Users />, desc: "Engineers who understand real-world business environments." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-8 h-full text-center hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-colors">
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

const ManagedVsHybrid = () => (
  <section id="types" className="py-32 px-6 bg-[#0f172a]">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="mb-16 text-center">
           <h2 className="text-3xl font-bold text-white mb-4">Choose Your Control Level</h2>
           <p className="text-slate-400">Tailored for companies, not just developers.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           {/* Managed */}
           <div className="p-10 border border-emerald-500/30 bg-[#020617] rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-emerald-600 text-[#020617] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                 Recommended
              </div>
              <ShieldCheck className="text-emerald-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">Managed Hosting</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                Best for companies that want stability without technical overhead. We handle the updates, security, and optimization.
              </p>
              <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Server maintenance & monitoring</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Malware & backup discipline</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-emerald-500" /> Priority incident response</li>
              </ul>
           </div>

           {/* Hybrid */}
           <div className="p-10 border border-white/10 bg-[#020617] rounded-sm relative overflow-hidden group">
              <Cpu className="text-slate-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">Hybrid Hosting</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                For technical teams. We provide the robust environment and isolation; your team manages deployment and code.
              </p>
              <ul className="space-y-3 mb-8 border-t border-white/5 pt-6">
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Root or panel-level control</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Developer-friendly config</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Resource isolation</li>
              </ul>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Plans = () => (
  <section id="plans" className="py-32 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">Engineered for Workloads</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real resources for real businesses. No hidden caps.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Starter Business", use: "Small company sites", storage: "10GB NVMe", price: "TZS 150,000/yr" },
          { title: "Growth", use: "Corporate portals", storage: "50GB NVMe", price: "TZS 350,000/yr", popular: true },
          { title: "Enterprise", use: "High-traffic apps", storage: "100GB NVMe", price: "Custom" },
        ].map((plan, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className={`p-8 h-full bg-[#0a0a0a] flex flex-col ${plan.popular ? 'border-emerald-500/50' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-[#020617] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  Best Value
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{plan.title}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">{plan.use}</p>
              
              <div className="text-2xl font-black text-white mb-8 tracking-tight">
                {plan.price}
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <HardDrive size={16} className="text-emerald-500" /> {plan.storage}
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Zap size={16} className="text-emerald-500" /> LiteSpeed Optimized
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Lock size={16} className="text-emerald-500" /> Free SSL & Backups
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Clock size={16} className="text-emerald-500" /> 99.9% Uptime Guarantee
                </li>
              </ul>

              <button className={`w-full py-3 text-xs font-bold uppercase tracking-widest rounded-sm border transition-all
                ${plan.popular 
                  ? 'bg-white text-black border-white hover:bg-emerald-200' 
                  : 'border-white/20 text-white hover:bg-white/10'}`}>
                Select Plan
              </button>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
      <p className="text-center text-xs text-slate-600 mt-8 font-mono uppercase tracking-widest">
         Tuned for Tanzanian latency & connectivity conditions.
      </p>
    </div>
  </section>
);

const Security = () => (
  <section id="security" className="py-24 px-6 bg-[#020617]">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-8">
          Stability by Design.<br/>
          <span className="text-emerald-500">Not by Chance.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Security is not an add-on — it is part of the system. We deploy Imunify-class threat protection and rigorous backup disciplines to keep your business online.
        </p>
        
        <ul className="space-y-4">
           {[
             "Imunify360 Threat Defense",
             "Daily Off-Site Backups",
             "Uptime Monitoring & Alerting",
             "Access Control Logs"
           ].map((feat, i) => (
             <li key={i} className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span className="text-slate-300 font-mono text-sm">{feat}</span>
             </li>
           ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative aspect-square rounded-sm border border-white/10 bg-[#0a0a0a] flex items-center justify-center p-8">
           {/* Abstract Security Viz */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent)]" />
           <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#020617] border border-emerald-500/30 p-4 rounded-sm">
                 <div className="text-xs text-emerald-500 font-mono mb-2">FIREWALL STATUS</div>
                 <div className="text-white font-bold">ACTIVE</div>
              </div>
              <div className="bg-[#020617] border border-white/10 p-4 rounded-sm">
                 <div className="text-xs text-slate-500 font-mono mb-2">LAST BACKUP</div>
                 <div className="text-white font-bold">02:00 AM</div>
              </div>
              <div className="bg-[#020617] border border-white/10 p-4 rounded-sm col-span-2">
                 <div className="text-xs text-slate-500 font-mono mb-2">THREATS BLOCKED (24H)</div>
                 <div className="text-white font-bold">142</div>
              </div>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Migration = () => (
  <section id="migration" className="py-24 px-6 bg-[#0f172a] border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <RefreshCw size={48} className="text-emerald-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-6">We Move You Safely</h2>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
          We handle the environment assessment, data copy, and DNS handover. No "flip-and-hope." We ensure zero disruption to your business email and website.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-4">
         {[
           { step: "01", label: "Audit", desc: "Assess current setup." },
           { step: "02", label: "Copy", desc: "Transfer data safely." },
           { step: "03", label: "Test", desc: "Verify on staging." },
           { step: "04", label: "Live", desc: "DNS switchover." },
         ].map((s, i) => (
           <ScrollReveal key={i} delay={i * 0.1}>
             <div className="bg-[#020617] p-6 border border-white/5 rounded-sm">
                <div className="text-emerald-500 font-mono text-xs mb-2">{s.step}</div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-1">{s.label}</h3>
                <p className="text-xs text-slate-500">{s.desc}</p>
             </div>
           </ScrollReveal>
         ))}
      </div>
      
      <div className="mt-12">
         <Link href="/contact" className="text-emerald-400 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors border-b border-emerald-500/30 pb-1">
            Request Free Migration
         </Link>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/20 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          BUILT FOR<br/>LONGEVITY.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Move your website to a platform that cares about your business as much as you do.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="#plans" className="px-12 py-5 bg-white text-[#020617] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-200 transition-all shadow-2xl">
            View Hosting Plans
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Request Migration
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function WebHostingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500 selection:text-white font-sans cursor-none">
      <GlobalNavbar />
      <WebHostingNav />
      
      <Hero />
      <Differentiation />
      <ManagedVsHybrid />
      <Plans />
      <Security />
      <Migration />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}