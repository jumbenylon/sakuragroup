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
  HardHat, 
  ShieldCheck, 
  Layers, 
  Droplets, 
  Hammer, 
  Leaf, 
  Wrench, 
  Building2, 
  Factory, 
  Home, 
  Activity,
  MapPin
} from "lucide-react";


// --- SHARED COMPONENTS ---

const SpotlightCard = ({ children, className = "", color = "rgba(255, 255, 255, 0.1)", href }: { children: React.ReactNode, className?: string, color?: string, href: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link 
      href={href}
      className={`relative border border-white/10 bg-[#0B1120] overflow-hidden group block ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${color}, 
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full flex flex-col">{children}</div>
    </Link>
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

const ConstructionSubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Logical Grouping: Protection -> Installation -> Maintenance
  const links = [
    { label: "Overview", href: "/rcs" },
    { label: "Restoration", href: "/rcs/restoration" },
    { label: "Waterproofing", href: "/rcs/waterproofing" },
    { label: "Installation", href: "/rcs/installation" },
    { label: "Construction", href: "/rcs/construction" },
    { label: "Cleaning", href: "/rcs/cleaning" },
    { label: "Repairs", href: "/rcs/repairs" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#0B1120]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.label === 'Overview' ? 'text-white' : 'text-slate-400 hover:text-white'}`}
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
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#0B1120]">
      {/* Industrial Video Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay grayscale"
         >
             <source src="https://storage.googleapis.com/sakura-web/roof%20cleaning/roof-cleaning.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md mx-auto">
             <ShieldCheck size={14} className="text-white" />
             <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">
               Serving Tanzania Since 2018
             </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            BUILT TO<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">
                LAST.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             We maintain the assets that power Tanzania. From industrial roofing and waterproofing to full-scale construction and facility management.
             <span className="block mt-2 text-white font-medium">Safety. Precision. Longevity.</span>
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-white text-[#0B1120] font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-slate-200 transition-colors shadow-2xl">
                Start Project
            </Link>
            <Link href="#services" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                View Specialized Units
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ServiceUnits = () => (
  <section id="services" className="py-32 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">SIX SPECIALIZED UNITS</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            One ecosystem covering the entire asset lifecycle.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. RESTORATION */}
        <ScrollReveal delay={0.05}>
          <SpotlightCard href="/rcs/restoration" color="rgba(249, 115, 22, 0.2)" className="p-10 h-full bg-[#0B1120]">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:bg-white/10 transition-colors">
                <Activity size={24} />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-white transition-colors">
              Roof Restoration
            </h3>
            <p className="text-sm text-slate-500 mb-8 group-hover:text-slate-300 transition-colors flex-grow">
              Industrial coating, rust prevention, and lifespan extension systems.
            </p>
            <div className="border-t border-white/5 pt-4 mt-auto">
               <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest">Industrial • Commercial</span>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* 2. WATERPROOFING */}
        <ScrollReveal delay={0.1}>
          <SpotlightCard href="/rcs/waterproofing" color="rgba(6, 182, 212, 0.2)" className="p-10 h-full bg-[#0B1120]">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-cyan-500 group-hover:bg-white/10 transition-colors">
                <Droplets size={24} />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-white transition-colors">
              Waterproofing
            </h3>
            <p className="text-sm text-slate-500 mb-8 group-hover:text-slate-300 transition-colors flex-grow">
              Leak prevention systems for slabs, tanks, balconies, and basements.
            </p>
            <div className="border-t border-white/5 pt-4 mt-auto">
               <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">Commercial • Residential</span>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* 3. INSTALLATION */}
        <ScrollReveal delay={0.15}>
          <SpotlightCard href="/rcs/installation" color="rgba(59, 130, 246, 0.2)" className="p-10 h-full bg-[#0B1120]">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-white/10 transition-colors">
                <Layers size={24} />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-white transition-colors">
              Roofing Installation
            </h3>
            <p className="text-sm text-slate-500 mb-8 group-hover:text-slate-300 transition-colors flex-grow">
              Structural metal and stone-coated tile roofing design and build.
            </p>
            <div className="border-t border-white/5 pt-4 mt-auto">
               <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Structural • Residential</span>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* 4. CONSTRUCTION */}
        <ScrollReveal delay={0.2}>
          <SpotlightCard href="/rcs/construction" color="rgba(234, 179, 8, 0.2)" className="p-10 h-full bg-[#0B1120]">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-yellow-500 group-hover:bg-white/10 transition-colors">
                <HardHat size={24} />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-white transition-colors">
              Construction Projects
            </h3>
            <p className="text-sm text-slate-500 mb-8 group-hover:text-slate-300 transition-colors flex-grow">
              End-to-end residential builds, extensions, and structural frameworks.
            </p>
            <div className="border-t border-white/5 pt-4 mt-auto">
               <span className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest">Turnkey • Capital Projects</span>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* 5. CLEANING */}
        <ScrollReveal delay={0.25}>
          <SpotlightCard href="/rcs/cleaning" color="rgba(52, 211, 153, 0.2)" className="p-10 h-full bg-[#0B1120]">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:bg-white/10 transition-colors">
                <Leaf size={24} />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-white transition-colors">
              Outdoor Cleaning
            </h3>
            <p className="text-sm text-slate-500 mb-8 group-hover:text-slate-300 transition-colors flex-grow">
              Eco-safe soft wash for facades, driveways, and exterior walls.
            </p>
            <div className="border-t border-white/5 pt-4 mt-auto">
               <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Maintenance • Aesthetics</span>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* 6. REPAIRS */}
        <ScrollReveal delay={0.3}>
          <SpotlightCard href="/rcs/repairs" color="rgba(139, 92, 246, 0.2)" className="p-10 h-full bg-[#0B1120]">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-purple-500 group-hover:bg-white/10 transition-colors">
                <Wrench size={24} />
              </div>
              <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-white transition-colors">
              Repairs & Maintenance
            </h3>
            <p className="text-sm text-slate-500 mb-8 group-hover:text-slate-300 transition-colors flex-grow">
              Diagnostic fixes, structural repairs, and annual health-check plans.
            </p>
            <div className="border-t border-white/5 pt-4 mt-auto">
               <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest">Asset Care • Preventive</span>
            </div>
          </SpotlightCard>
        </ScrollReveal>

      </div>
    </div>
  </section>
);

const Sectors = () => (
  <section className="py-24 px-6 bg-[#0B1120]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12 text-center">Engineered For</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Industrial", icon: <Factory />, text: "Warehouses, Factories, Logistics Centers." },
          { label: "Commercial", icon: <Building2 />, text: "Office Towers, Hotels, Shopping Malls." },
          { label: "Residential", icon: <Home />, text: "Private Estates, Villas, Gated Communities." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-8 border border-white/10 bg-[#0f172a] rounded-sm hover:border-white/20 transition-all group text-center">
              <div className="text-slate-500 mb-4 group-hover:text-white transition-colors mx-auto w-fit">
                {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-white font-bold uppercase text-sm mb-2">{item.label}</h3>
              <p className="text-xs text-slate-500">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Safety = () => (
  <section className="py-24 px-6 bg-[#080d1a] border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <ShieldCheck size={48} className="text-white mx-auto mb-6 opacity-50" />
        <h2 className="text-3xl font-bold text-white mb-6">Safety is not optional.</h2>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          We operate under strict HSE (Health, Safety & Environment) protocols. Every site is assessed for risk, 
          every technician is certified, and every project is insured.
        </p>
        <div className="flex justify-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
           <span>• Height Safety</span>
           <span>• Chemical Handling</span>
           <span>• Structural Integrity</span>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#050912] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    
    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          ENGINEERED<br/>CONFIDENCE.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Stop patching problems. Start solving them. Partner with a construction team that plans for the next decade, not just next week.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-[#0B1120] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-slate-200 transition-all shadow-2xl">
            Request Site Visit
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Contact Engineers
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function RCSMasterPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-slate-500 selection:text-white font-sans cursor-none">
      
      <ConstructionSubNav />
      
      <Hero />
      <ServiceUnits />
      <Sectors />
      <Safety />
      <CTA />
      
      
    </main>
  );
}