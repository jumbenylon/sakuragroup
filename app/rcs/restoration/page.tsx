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
  ShieldCheck, 
  Activity, 
  Sun, 
  Droplets, 
  ArrowLeftRight,
  TrendingUp,
  Factory,
  Warehouse,
  Construction
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
              rgba(249, 115, 22, 0.15), 
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
    { label: "Roof Restoration", href: "/rcs/restoration" },
    { label: "Waterproofing", href: "/rcs/waterproofing" },
    { label: "Installation", href: "/rcs/installation" },
    { label: "Outdoor Cleaning", href: "/rcs/cleaning" },
    { label: "Construction", href: "/rcs/construction" },
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
                ${link.label === 'Roof Restoration' ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
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
      {/* Industrial Orange Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9731605_1px,transparent_1px),linear-gradient(to_bottom,#f9731605_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-950/30 border border-orange-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Activity size={14} className="text-orange-500 animate-pulse" />
             <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Asset Lifecycle Extension</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            DON'T REPLACE.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                RESTORE.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light border-l-4 border-orange-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
             Industrial-grade roof coating and rust prevention. We extend the life of metal and concrete roofs by 10+ years for a fraction of replacement cost.
             <span className="block mt-2 text-white font-medium">Stop corrosion. Stop leaks. Reduce heat.</span>
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-orange-600 text-[#0B1120] font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-orange-500 transition-colors shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                Get Assessment
            </Link>
            <Link href="#process" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                How It Works
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Benefits = () => (
  <section className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Restoration vs. Replacement</h2>
          <p className="text-slate-400 text-lg">Why tear it down when you can reinforce it?</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Cost Savings", icon: <TrendingUp />, desc: "Restoration costs 30-50% of full replacement." },
          { label: "Stop Corrosion", icon: <ShieldCheck />, desc: "Encapsulate rust and prevent further oxidation." },
          { label: "Heat Reduction", icon: <Sun />, desc: "Reflective coatings lower internal temps by 5-8°C." },
          { label: "Leak Sealing", icon: <Droplets />, desc: "Seamless membrane covers micro-cracks." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-6 h-full text-center hover:border-orange-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-orange-400 group-hover:bg-orange-400/10 transition-colors">
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

const ComparisonSlider = () => {
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
        <section className="py-24 px-6 bg-[#0B1120]">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">The Transformation</h2>
                        <p className="text-slate-400">Drag to see the impact of industrial coating.</p>
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
                        {/* AFTER IMAGE (Background) */}
                        <div className="absolute inset-0 bg-[#1a1a1a]">
                           {/* Placeholder for Restored Roof */}
                           <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                              <span className="text-orange-500 font-bold text-2xl">COATED & PROTECTED</span>
                           </div>
                           <div className="absolute top-6 right-6 px-4 py-2 bg-orange-500/90 backdrop-blur text-[#0B1120] text-xs font-bold uppercase tracking-widest rounded-full shadow-xl">
                               After Restoration
                           </div>
                        </div>

                        {/* BEFORE IMAGE (Clipped Foreground) */}
                        <div 
                            className="absolute inset-0 overflow-hidden border-r-2 border-orange-500 bg-[#2a2a2a]"
                            style={{ width: `${sliderPosition}%` }}
                        >
                             <div className="relative w-full h-full bg-orange-950/20 flex items-center justify-center">  
                                <span className="text-orange-700/50 font-bold text-2xl">RUSTED & LEAKING</span>
                             </div>
                             <div className="absolute top-6 left-6 px-4 py-2 bg-black/80 backdrop-blur text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/10">
                                Before
                             </div>
                        </div>

                        {/* Slider Handle */}
                        <div 
                            className="absolute top-0 bottom-0 w-1 bg-orange-500 z-20 shadow-[0_0_20px_rgba(249,115,22,0.8)]"
                            style={{ left: `${sliderPosition}%` }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-[#0B1120] shadow-2xl">
                                <ArrowLeftRight size={20} />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

const SystemMatrix = () => (
  <section className="py-32 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">Coating Systems</h2>
          <p className="text-slate-500 text-sm mt-2">Engineered for Tanzania's specific climate challenges.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]">
          <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white border-b border-white/10">
            <div className="col-span-4">System</div>
            <div className="col-span-4">Target</div>
            <div className="col-span-4">Benefit</div>
          </div>
          {[
            { s: "Anti-Corrosion Primer", t: "Rusted Metal Sheets", b: "Stops oxidation instantly" },
            { s: "Thermal Reflector", t: "Warehouses / Factories", b: "Reduces heat by 40%" },
            { s: "Bitumen Membrane", t: "Concrete Slabs", b: "100% Waterproof Seal" },
            { s: "Encapsulation Coat", t: "Asbestos Roofs", b: "Safely seals fibers" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center group">
              <div className="col-span-4 text-white font-bold text-sm md:text-base group-hover:text-orange-400 transition-colors">{row.s}</div>
              <div className="col-span-4 text-slate-400 font-mono text-xs md:text-sm">{row.t}</div>
              <div className="col-span-4 text-orange-500 text-xs md:text-sm font-medium">{row.b}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Process = () => (
  <section id="process" className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Restoration Protocol</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-5 gap-4 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10" />

        {[
          { step: "01", title: "Clean", desc: "High-pressure wash & degrease." },
          { step: "02", title: "Repair", desc: "Fix fasteners & replace loose sheets." },
          { step: "03", title: "Prime", desc: "Apply rust-inhibiting primer." },
          { step: "04", title: "Seal", desc: "Waterproof joints & flashing." },
          { step: "05", title: "Coat", desc: "Final thermal/protective layer." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative group p-4 pt-8 bg-[#0B1120] hover:bg-white/5 transition-all border-t-2 border-transparent hover:border-orange-500">
              <div className="w-8 h-8 bg-[#0B1120] border border-white/20 rounded-full flex items-center justify-center text-slate-500 font-mono text-xs font-bold mb-4 relative z-10 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
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
    </div>
  </section>
);

const Sectors = () => (
  <section className="py-24 px-6 bg-[#080d1a] border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Industrial", icon: <Factory />, text: "Factories, Processing Plants, Warehouses." },
          { label: "Logistics", icon: <Warehouse />, text: "Distribution Centers & Storage." },
          { label: "Commercial", icon: <Construction />, text: "Shopping Malls & Office Complexes." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-8 border border-white/10 bg-[#0B1120] rounded-sm hover:border-orange-500/30 transition-all group text-center">
              <div className="text-slate-500 mb-4 group-hover:text-orange-400 transition-colors mx-auto w-fit">
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
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          EXTEND YOUR<br/>LIFESPAN.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Get a free roof condition report. We’ll show you how to add 10 years to your asset without replacing it.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-orange-600 text-[#0B1120] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-orange-500 transition-all shadow-2xl">
            Book Assessment
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Download Specs
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function RestorationPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-orange-500 selection:text-black font-sans cursor-none">
      
      <ConstructionSubNav />
      
      <Hero />
      <Benefits />
      <ComparisonSlider />
      <SystemMatrix />
      <Process />
      <Sectors />
      <CTA />
      
      
    </main>
  );
}