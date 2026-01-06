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
  Globe, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  HardDrive,
  Cloud
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
      onMouseMove={handleMouseMove}
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15), 
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

const HostingSubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { name: "Overview", href: "/hosting" },
    { name: "VPS", href: "/hosting/vps" },
    { name: "Web", href: "/hosting/web" },
    { name: "Domains", href: "/hosting/domains" },
    { name: "Email", href: "/hosting/email" },
    { name: "Managed", href: "/hosting/managed" },
    { name: "Security", href: "/hosting/security" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500 ${
        isScrolled ? "bg-[#020617]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                link.name === 'Overview' ? 'text-sky-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
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
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#020617]">
      {/* 1. VISUAL: Data Center Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2072&auto=format&fit=crop"
            alt="Sakura Data Center"
            fill
            className="object-cover opacity-20 mix-blend-screen"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-950/30 border border-sky-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Global Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            THE SOVEREIGN<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">CLOUD.</span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             High-performance hosting infrastructure built for Tanzanian businesses. 
             Local support, global speeds, and enterprise-grade security.
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/hosting/vps" className="group relative px-10 py-5 bg-sky-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-sky-500 transition-colors shadow-[0_0_40px_rgba(56,189,248,0.3)]">
                Deploy VPS
            </Link>
            <Link href="/hosting/domains" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Search Domains
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Infrastructure = () => (
    <section className="py-32 px-6 bg-[#020617] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
                <ScrollReveal delay={0.1}>
                    <SpotlightCard className="p-8 h-full bg-[#0b1121]">
                        <Cpu className="text-sky-500 mb-6" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">NVMe Compute</h3>
                        <p className="text-slate-400 text-sm">
                            100% NVMe SSD storage and latest-gen Intel/AMD processors for raw speed.
                        </p>
                    </SpotlightCard>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                    <SpotlightCard className="p-8 h-full bg-[#0b1121]">
                        <Globe className="text-sky-500 mb-6" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">Local & Global</h3>
                        <p className="text-slate-400 text-sm">
                            Nodes in Dar es Salaam, Johannesburg, London, and Frankfurt. Low latency everywhere.
                        </p>
                    </SpotlightCard>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                    <SpotlightCard className="p-8 h-full bg-[#0b1121]">
                        <ShieldCheck className="text-sky-500 mb-6" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">DDoS Shield</h3>
                        <p className="text-slate-400 text-sm">
                            Always-on mitigation scrubbing bad traffic before it hits your server.
                        </p>
                    </SpotlightCard>
                </ScrollReveal>
            </div>
        </div>
    </section>
);

const Products = () => (
    <section className="py-32 px-6 bg-[#020617]">
        <div className="max-w-6xl mx-auto">
            <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-16 text-center">Core Services</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "VPS Hosting", desc: "Root access, dedicated resources.", href: "/hosting/vps", icon: Server },
                    { title: "Web Hosting", desc: "cPanel, one-click WordPress.", href: "/hosting/web", icon: Cloud },
                    { title: "Domains", desc: ".co.tz registration & management.", href: "/hosting/domains", icon: Globe },
                    { title: "Enterprise Email", desc: "Professional Outlook/Webmail.", href: "/hosting/email", icon: HardDrive },
                    { title: "Managed Server", desc: "We handle the sysadmin work.", href: "/hosting/managed", icon: Zap },
                    { title: "Security", desc: "SSL, Firewalls & Backups.", href: "/hosting/security", icon: ShieldCheck },
                ].map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.05}>
                        <Link href={item.href} className="block group">
                            <SpotlightCard className="p-8 h-full bg-[#0b1121] hover:border-sky-500/50 transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-sky-500/10 rounded-lg text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                        <item.icon size={24} />
                                    </div>
                                    <ArrowRight size={20} className="text-slate-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </SpotlightCard>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sky-900/20 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          SCALE WITHOUT<br/>LIMITS.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Join 500+ Tanzanian businesses running on Sakura Infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-sky-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-sky-500 transition-all shadow-2xl">
            Start Migration
          </Link>
          <Link href="/hosting/support" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Contact Support
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function HostingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-sky-500 selection:text-black font-sans">
      <HostingSubNav />
      <Hero />
      <Infrastructure />
      <Products />
      <CTA />
    </main>
  );
}
