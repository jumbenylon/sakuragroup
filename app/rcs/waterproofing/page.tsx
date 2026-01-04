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
  Droplets, 
  ShieldCheck, 
  Layers, 
  ThermometerSun, 
  Maximize2, 
  Construction, 
  Anchor, 
  FileText,
  CheckCircle2,
  AlertTriangle
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
              rgba(6, 182, 212, 0.15), 
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

const ConstructionSubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
                ${link.label === 'Waterproofing' ? 'text-cyan-500' : 'text-slate-400 hover:text-white'}`}
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
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#0B1120] overflow-hidden">
      {/* Liquid Abstract Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-cyan-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d405_1px,transparent_1px),linear-gradient(to_bottom,#06b6d405_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/30 border border-cyan-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Droplets size={14} className="text-cyan-500 animate-pulse" />
             <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Structural Protection Systems</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            WE STOP WATER<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                BEFORE IT STARTS.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light border-l-4 border-cyan-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
             Structural-grade waterproofing for roofs, slabs, balconies, wet rooms, and foundations — engineered for Tanzanian climate and moisture conditions.
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-cyan-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-cyan-500 transition-colors shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                Book Leak Inspection
            </Link>
            <Link href="#systems" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                View Systems
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const WhereItApplies = () => (
  <section className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Where We Protect</h2>
          <p className="text-slate-400 text-lg">We match the system to the structure — not the other way around.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Flat Roofs", icon: <Layers />, desc: "Bitumen & Liquid Membrane" },
          { label: "Concrete Slabs", icon: <Construction />, desc: "Penetrating Sealers" },
          { label: "Wet Areas", icon: <Droplets />, desc: "Epoxy Barrier Layers" },
          { label: "Basements", icon: <Anchor />, desc: "Negative Side Sealing" },
          { label: "Ext. Walls", icon: <Maximize2 />, desc: "Hydrophobic Coatings" },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-6 h-full text-center hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-2">{item.label}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Education = () => (
  <section className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-8">
          Why Buildings in <br/>
          <span className="text-cyan-500">Tanzania Leak.</span>
        </h2>
        <div className="space-y-8">
          {[
            { 
              title: "Thermal Expansion", 
              desc: "Extreme heat causes concrete to expand and contract, creating micro-fractures.",
              icon: <ThermometerSun /> 
            },
            { 
              title: "Poor Drainage", 
              desc: "Standing water (ponding) accelerates breakdown of standard sealants.",
              icon: <Droplets /> 
            },
            { 
              title: "Installation Shortcuts", 
              desc: "Improper surface prep and lack of primer is the #1 cause of failure.",
              icon: <AlertTriangle /> 
            }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-1 p-2 bg-white/5 border border-white/10 rounded-lg h-fit">
                {React.cloneElement(item.icon as React.ReactElement, { size: 20, className: "text-orange-500" })}
              </div>
              <div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-sm">
          <p className="text-cyan-200 text-sm font-medium">
            "Leaks are rarely caused by water — they are caused by system failure."
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10 bg-[#050912]">
           {/* Abstract visualization of a leak/crack could go here, or a photo */}
           <div className="absolute inset-0 bg-[linear-gradient(45deg,#06b6d405_1px,transparent_1px)] bg-[size:16px_16px]" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-cyan-500/30 rounded-full animate-pulse flex items-center justify-center">
                 <div className="w-48 h-48 border border-cyan-500/50 rounded-full" />
              </div>
           </div>
           <div className="absolute bottom-8 left-8 right-8 text-center">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Structural Analysis Mode</p>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const SystemMatrix = () => (
  <section id="systems" className="py-32 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">System Technologies</h2>
          <p className="text-slate-500 text-sm mt-2">We use certified, globally recognized product ecosystems.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]">
          <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white border-b border-white/10">
            <div className="col-span-4">Service Type</div>
            <div className="col-span-4">System Spec</div>
            <div className="col-span-4">Primary Outcome</div>
          </div>
          {[
            { s: "Roof Deck", sys: "Polymer-Modified Bitumen", out: "Elastic crack control" },
            { s: "Balcony & Slab", sys: "Acrylic Hybrid Seal", out: "Moisture rejection" },
            { s: "Wet Areas", sys: "Epoxy Barrier Layer", out: "Chemical resistance" },
            { s: "External Walls", sys: "PU Seal Coat", out: "Weatherproof envelope" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center group">
              <div className="col-span-4 text-white font-bold text-sm md:text-base group-hover:text-cyan-400 transition-colors">{row.s}</div>
              <div className="col-span-4 text-slate-400 font-mono text-xs md:text-sm">{row.sys}</div>
              <div className="col-span-4 text-emerald-500 text-xs md:text-sm font-medium">{row.out}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Controlled Methodology</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-6 gap-4 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10" />

        {[
          { step: "01", title: "Audit", desc: "Leak source tracing." },
          { step: "02", title: "Assess", desc: "Structural check." },
          { step: "03", title: "Design", desc: "System matching." },
          { step: "04", title: "Prep", desc: "Surface cleaning." },
          { step: "05", title: "Apply", desc: "Layer installation." },
          { step: "06", title: "Verify", desc: "Flood testing." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative group p-4 pt-8 bg-[#0B1120] hover:bg-white/5 transition-all border-t-2 border-transparent hover:border-cyan-500">
              <div className="w-8 h-8 bg-[#0B1120] border border-white/20 rounded-full flex items-center justify-center text-slate-500 font-mono text-xs font-bold mb-4 relative z-10 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-colors">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-white uppercase mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      
      <div className="text-center mt-12">
         <p className="text-xs font-mono text-orange-500 uppercase tracking-widest">
            Manufacturer-aligned installation procedures only. No shortcuts.
         </p>
      </div>
    </div>
  </section>
);

const CaseStudies = () => (
  <section className="py-24 px-6 bg-[#080d1a] border-t border-white/5">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12">Field Reports</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal>
          <div className="p-8 border border-white/10 bg-[#0B1120] rounded-sm group hover:border-cyan-500/30 transition-all">
            <div className="mb-6">
              <span className="text-cyan-500 font-mono text-xs uppercase">Commercial Office • Slipway</span>
              <h3 className="text-2xl font-bold text-white mt-2">Concrete Slab Restoration</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400"><strong className="text-white">Issue:</strong> Capillary moisture seepage & micro-cracks.</p>
              <p className="text-slate-400"><strong className="text-white">System:</strong> Acrylic hybrid seal + crack reinforcement.</p>
              <p className="text-emerald-400"><strong className="text-white">Outcome:</strong> Thermal movement stabilized • Leak eliminated.</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="p-8 border border-white/10 bg-[#0B1120] rounded-sm group hover:border-cyan-500/30 transition-all">
            <div className="mb-6">
              <span className="text-cyan-500 font-mono text-xs uppercase">Residential Estate • Mikocheni</span>
              <h3 className="text-2xl font-bold text-white mt-2">Balcony & Wet Area Seal</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400"><strong className="text-white">Issue:</strong> Water damage to lower floor ceilings.</p>
              <p className="text-slate-400"><strong className="text-white">System:</strong> Epoxy barrier layer + PU topcoat.</p>
              <p className="text-emerald-400"><strong className="text-white">Outcome:</strong> 100% moisture rejection secured.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const EngagementModels = () => (
  <section className="py-24 px-6 bg-[#0B1120]">
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Leak Diagnostics", desc: "One-off inspection & report.", icon: <Search /> },
          { title: "Project Works", desc: "Full system installation.", icon: <Construction /> },
          { title: "Maintenance", desc: "Annual preventive care.", icon: <ShieldCheck /> },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="text-center p-8 bg-white/5 rounded-sm border border-white/5 hover:bg-white/10 transition-colors">
               <div className="mx-auto w-10 h-10 bg-black rounded-full flex items-center justify-center text-cyan-500 mb-4">
                 {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
               </div>
               <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-2">{item.title}</h3>
               <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <p className="text-center text-xs text-slate-500 mt-8">
        Every structure is unique — pricing is based on condition, area, and system design.
      </p>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#050912] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          PRESERVE YOUR<br/>ASSET.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Don't wait for the ceiling to drip. Secure your structure with engineered waterproofing today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-cyan-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-cyan-500 transition-all shadow-2xl">
            Book Leak Inspection
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Request Recommendation
          </Link>
        </div>
        <p className="mt-8 text-xs text-slate-600 font-mono uppercase tracking-widest">
          Response time: Within 24 Hours
        </p>
      </ScrollReveal>
    </div>
  </section>
);

// Helper Icon Import
import { Search } from "lucide-react";

export default function WaterproofingPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-cyan-500 selection:text-black font-sans cursor-none">
      <GlobalNavbar />
      <ConstructionSubNav />
      
      <Hero />
      <WhereItApplies />
      <Education />
      <SystemMatrix />
      <Process />
      <CaseStudies />
      <EngagementModels />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}