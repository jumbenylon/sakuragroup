"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  Leaf, 
  Droplets, 
  ShieldCheck, 
  Sparkles, 
  Home, 
  Building2, 
  Flower2,
  AlertTriangle,
  ArrowLeftRight
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
              rgba(52, 211, 153, 0.15), 
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
                ${link.label === 'Cleaning' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
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
      {/* Fresh Nature Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/30 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Leaf size={14} className="text-emerald-500" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Eco-Safe Soft Wash</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            RESTORE WITHOUT<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                DESTRUCTION.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light border-l-4 border-emerald-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
             Eco-safe surface cleaning for exterior walls, paved driveways, and building facades. 
             <span className="block mt-2 text-white font-medium">We remove organic growth without stripping paint or damaging cement.</span>
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-emerald-500 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                Get Cleaning Quote
            </Link>
            <Link href="#safety" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Safety Standards
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Methodology = () => (
  <section id="safety" className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Cleaning Should Restore, Not Erode.</h2>
          <p className="text-slate-400 text-lg">We use chemistry, not brute force.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Soft Wash", icon: <Droplets />, desc: "Low pressure protects paint & render." },
          { label: "Bio-Safe", icon: <Leaf />, desc: "Plants & landscaping protected." },
          { label: "Anti-Algae", icon: <ShieldCheck />, desc: "Inhibitor spray prevents regrowth." },
          { label: "No Abrasives", icon: <Sparkles />, desc: "Zero surface scarring or etching." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-6 h-full text-center hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-colors">
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

const ServiceMatrix = () => (
  <section className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">Surface Protocols</h2>
          <p className="text-slate-500 text-sm mt-2">Different surfaces require different chemical approaches.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]">
          <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white border-b border-white/10">
            <div className="col-span-4">Surface</div>
            <div className="col-span-4">Method</div>
            <div className="col-span-4">Outcome</div>
          </div>
          {[
            { s: "Exterior Walls", m: "Gentle Rinse + Soap", out: "Paint preserved, dust gone" },
            { s: "Paved Driveways", m: "Degreaser + Surface Clean", out: "Oil & algae removed" },
            { s: "Walkways", m: "Bio-Treatment", out: "Slip-hazard elimination" },
            { s: "Stone Facades", m: "Steam/Soft Wash", out: "Natural color restored" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center group">
              <div className="col-span-4 text-white font-bold text-sm md:text-base group-hover:text-emerald-400 transition-colors">{row.s}</div>
              <div className="col-span-4 text-slate-400 font-mono text-xs md:text-sm">{row.m}</div>
              <div className="col-span-4 text-teal-400 text-xs md:text-sm font-medium">{row.out}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const InteractiveComparison = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    const handleInteractionStart = () => { isDragging.current = true; };
    const handleInteractionEnd = () => { isDragging.current = false; };

    return (
        <section className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Paving Restoration</h2>
                        <p className="text-slate-400">Drag to see organic growth removal on driveway pavers.</p>
                    </div>
                    
                    <div 
                        ref={containerRef}
                        className="relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 group cursor-ew-resize select-none touch-none shadow-2xl"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleMouseMove}
                        onMouseDown={handleInteractionStart}
                        onTouchStart={handleInteractionStart}
                        onMouseUp={handleInteractionEnd}
                        onTouchEnd={handleInteractionEnd}
                        onMouseLeave={handleInteractionEnd}
                    >
                        {/* AFTER IMAGE (Background - Clean) */}
                        <div className="absolute inset-0">
                           <Image 
                             src="https://images.unsplash.com/photo-1590486803833-1c5dc8ce2ac6?q=80&w=2070&auto=format&fit=crop"
                             alt="Clean Paving"
                             fill
                             className="object-cover"
                           />
                           <div className="absolute top-6 right-6 px-4 py-2 bg-emerald-500/90 backdrop-blur text-[#0B1120] text-xs font-bold uppercase tracking-widest rounded-full shadow-xl z-10">
                               After
                           </div>
                        </div>

                        {/* BEFORE IMAGE (Foreground - Dirty) */}
                        <div 
                            className="absolute inset-0 overflow-hidden border-r-2 border-emerald-500"
                            style={{ width: `${sliderPosition}%` }}
                        >
                             <div className="relative w-full h-full">
                                <Image 
                                  src="https://images.unsplash.com/photo-1632759929288-026d303277cb?q=80&w=2070&auto=format&fit=crop"
                                  alt="Dirty Paving"
                                  fill
                                  className="object-cover object-left grayscale contrast-125"
                                />
                             </div>
                             <div className="absolute top-6 left-6 px-4 py-2 bg-black/80 backdrop-blur text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/10">
                                Before
                             </div>
                        </div>

                        {/* Slider Handle */}
                        <div 
                            className="absolute top-0 bottom-0 w-1 bg-emerald-500 z-20 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-[#0B1120] shadow-2xl">
                                <ArrowLeftRight size={20} />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

const DangerBlock = () => (
  <section className="py-24 px-6 bg-[#0B1120]">
    <div className="max-w-4xl mx-auto bg-red-900/10 border border-red-500/20 rounded-2xl p-8 md:p-12 text-center">
      <ScrollReveal>
        <div className="inline-block p-3 bg-red-500/20 rounded-full mb-6 text-red-500">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Why High Pressure is Dangerous</h2>
        <p className="text-slate-400 leading-relaxed mb-8">
          Blasting surfaces with 3,000+ PSI strips away paint protection, forces water into masonry cracks, and erodes the cement holding pavers together. 
          <span className="block mt-2 text-red-400 font-medium">It damages the asset while cleaning it.</span>
        </p>
        <p className="text-sm font-mono text-emerald-500 uppercase tracking-widest">
          We use &lt; 500 PSI + Bio-Chemistry instead.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

const WhoItIsFor = () => (
  <section className="py-24 px-6 bg-[#080d1a] border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12 text-center">Client Sectors</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Residential Estates", icon: <Home />, text: "Driveways, walls, and pool areas." },
          { label: "Commercial", icon: <Building2 />, text: "Entry facades and common walkways." },
          { label: "Hospitality", icon: <Flower2 />, text: "Garden paths and reception exteriors." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-8 border border-white/10 bg-[#0B1120] rounded-sm hover:border-emerald-500/30 transition-all group text-center">
              <div className="text-slate-500 mb-4 group-hover:text-emerald-400 transition-colors mx-auto w-fit">
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

const CTA = () => (
  <section className="py-40 px-6 bg-[#050912] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          CLEAN.<br/>SAFE.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Restore your property’s appearance without damaging the surface. Book an eco-safe assessment today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-500 transition-all shadow-2xl">
            Request Quote
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Site Visit
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function OutdoorCleaningPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-emerald-500 selection:text-black font-sans cursor-none">
      
      <ConstructionSubNav />
      
      <Hero />
      <Methodology />
      <ServiceMatrix />
      <InteractiveComparison />
      <DangerBlock />
      <WhoItIsFor />
      <CTA />
      
      
    </main>
  );
}
