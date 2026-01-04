"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, ShieldCheck, CheckCircle2, 
  Layers, ArrowLeftRight, Activity, Droplets, 
  Sun, TrendingUp, Anchor, MousePointer2, AlertTriangle, Construction
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED UNBOUND COMPONENTS ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#0B1120] flex items-center justify-center"
    >
        <div className="text-center">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-cyan-500 to-orange-500 mb-4 mx-auto rounded-full"
            />
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-orange-500 uppercase tracking-widest"
            >
                Loading Schematics...
            </motion.p>
        </div>
    </motion.div>
);

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// --- 2. SPECIAL EFFECTS ---

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
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const ScrambleText = ({ text }: { text: string }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

// --- 3. PAGE SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]); 

  return (
    <section className="relative h-[90vh] flex items-center px-6 pt-20 overflow-hidden bg-[#0B1120]">
      {/* VIBRANT VIDEO BACKGROUND */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-70">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover" // Removed grayscale, let the color breathe
         >
             <source src="https://storage.googleapis.com/sakura-web/roof%20cleaning/roof-cleaning.mp4" type="video/mp4" />
         </video>
         {/* Cinematic Grading: Dark at bottom, clear at top */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/20 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            <ShieldCheck size={14} className="text-orange-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-orange-400 uppercase">
               ISO-Compliant • Warranty-Ready
            </span>
          </div>
          
          {/* MULTI-COLOR GRADIENT HEADLINE */}
          <motion.h1 style={{ y: textY }} className="text-6xl md:text-[9rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-orange-500 leading-[0.85] mb-8">
            <ScrambleText text="PERMANENCE." />
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-xl text-slate-300 leading-relaxed font-light border-l-2 border-orange-500 pl-6 drop-shadow-md">
                Industrial-grade roof cleaning, restoration, and protective coating — engineered to extend lifespan, prevent biological growth, and preserve structural integrity.
                <br/>
                <span className="text-sm font-mono text-cyan-400 mt-4 block uppercase tracking-widest">
                    Powered by Certified Material Systems
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/#contact" className="group relative px-8 py-4 bg-orange-500 text-[#0B1120] font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    Book a Roof Assessment <ArrowRight size={20} />
                  </span>
                </Link>
                <button className="px-10 py-4 border border-white/20 hover:bg-white/10 text-white font-medium rounded-full transition-all backdrop-blur-sm">
                  Learn How It Works
                </button>
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const WhyItMatters = () => (
    <section className="py-24 px-6 bg-[#080d1a] border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    A clean roof isn't cosmetic — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">it's structural preservation.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Uncontrolled algae, oxidation, and moisture accelerate surface decay, leak risk, and thermal inefficiency. Our restoration systems remove biological growth at the pore level and seal surfaces to prevent recurrence.
                </p>
                <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs text-orange-400 font-mono uppercase tracking-widest">
                    Designed for Industrial & Commercial Assets
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { title: "Extends Lifespan", desc: "Prevents premature deterioration.", icon: Activity, color: "text-orange-500" },
                    { title: "Prevents Moisture", desc: "Reduces leak risk & breakdown.", icon: Droplets, color: "text-cyan-500" },
                    { title: "Improves Efficiency", desc: "Restores reflectivity.", icon: Sun, color: "text-yellow-400" },
                    { title: "Property Value", desc: "Preserves asset integrity.", icon: TrendingUp, color: "text-green-500" },
                ].map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="p-6 rounded-2xl h-full">
                            <item.icon className={`${item.color} mb-4`} size={24} />
                            <h3 className="font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
            </div>
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
        <section className="py-24 px-6 bg-[#0B1120]">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <div className="grid md:grid-cols-12 gap-16 items-center mb-12">
                        <div className="md:col-span-5">
                            <h2 className="text-4xl font-bold text-white mb-6">The Difference</h2>
                            <p className="text-slate-400 text-lg mb-8">
                                Biological growth doesn’t just stain — it weakens material surfaces. Our process restores structural integrity and seals the substrate.
                            </p>
                            <div className="p-4 bg-[#080d1a] border border-white/5 rounded-xl border-l-4 border-l-cyan-500">
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    <strong className="text-white block mb-1">System Specs:</strong>
                                    Restoration powered by Sika®, Synroof®, epoxy-grade resin systems, and polymer-modified Bitumen membranes.
                                </p>
                            </div>
                        </div>
                        
                        {/* INTERACTIVE SLIDER */}
                        <div 
                            ref={containerRef}
                            className="md:col-span-7 relative aspect-video rounded-3xl overflow-hidden border border-white/10 group cursor-ew-resize select-none touch-none shadow-2xl"
                            onMouseMove={handleMouseMove}
                            onTouchMove={handleMouseMove}
                            onMouseDown={handleInteractionStart}
                            onTouchStart={handleInteractionStart}
                            onMouseUp={handleInteractionEnd}
                            onTouchEnd={handleInteractionEnd}
                            onMouseLeave={handleInteractionEnd}
                        >
                            {/* AFTER IMAGE (Background) */}
                            <div className="absolute inset-0">
                               <Image 
                                    src="https://storage.googleapis.com/sakura-web/roof%20cleaning/rcs-after.png" 
                                    alt="Restored Roof"
                                    fill
                                    className="object-cover"
                                    draggable={false}
                               />
                               <div className="absolute top-6 right-6 px-4 py-2 bg-cyan-500/90 backdrop-blur text-[#0B1120] text-xs font-bold uppercase tracking-widest rounded-full shadow-xl">
                                   Status: Restored & Sealed
                               </div>
                            </div>

                            {/* BEFORE IMAGE (Clipped Foreground) */}
                            <div 
                                className="absolute inset-0 overflow-hidden border-r-2 border-orange-500 bg-[#0B1120]"
                                style={{ width: `${sliderPosition}%` }}
                            >
                                 <div className="relative w-full h-full"> 
                                    <Image 
                                        src="https://storage.googleapis.com/sakura-web/roof%20cleaning/rcs-before.png" 
                                        alt="Weathered Roof"
                                        fill
                                        className="object-cover object-left" 
                                        draggable={false}
                                    />
                                    <div className="absolute inset-0 bg-black/10" />
                                 </div>
                                 <div className="absolute top-6 left-6 px-4 py-2 bg-black/80 backdrop-blur text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/10">
                                     Status: Organic Growth
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
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

const PartnerStrip = () => (
    <section className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
                <ScrollReveal>
                    <div className="inline-block px-3 py-1 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        Trusted Ecosystem
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">Built on Trusted Systems.</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        We work exclusively with certified, globally recognized product ecosystems — ensuring quality, traceability, and warranty-aligned application standards.
                    </p>
                    <p className="text-xs font-mono text-orange-500 uppercase tracking-widest">
                        Never One-Size-Fits-All.
                    </p>
                </ScrollReveal>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-8">
                {[
                    { name: "Synroof", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/synroof-logo.png" },
                    { name: "Sika", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/sika-logo.png" },
                    { name: "Nabaki", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/nabaki-logo.png" },
                    { name: "Dr. Fixit", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/dr.fixit-logo.png" },
                ].map((p, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="h-32 bg-[#0B1120] border border-white/5 rounded-2xl flex items-center justify-center p-6 hover:border-orange-500/30 transition-all group relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-full h-full">
                                <Image 
                                    src={p.url} 
                                    alt={p.name} 
                                    fill 
                                    className="object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const ProcessSteps = () => (
    <section className="py-32 px-6 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto">
             <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Engineered, Not Improvised</h2>
                    <p className="text-slate-400">Each project follows a controlled, documented service protocol.</p>
                </div>
             </ScrollReveal>
             
             <div className="grid md:grid-cols-5 gap-4">
                {[
                    { step: "01", title: "Condition Audit", desc: "Full-surface inspection for cracks & water ingress.", note: "Safety Planning", icon: Activity, color: "text-orange-500" },
                    { step: "02", title: "Prep & Protect", desc: "Safety-zoning, anchor points & drainage mapping.", note: "Site Safety", icon: Construction, color: "text-yellow-500" },
                    { step: "03", title: "Bio-Treatment", desc: "Low-pressure soft wash removing pore-depth algae.", note: "Roof-Safe", icon: Droplets, color: "text-cyan-500" },
                    { step: "04", title: "Rinse & Flush", desc: "Controlled rinse cycle & substrate stabilization.", note: "Debris Extraction", icon: Layers, color: "text-blue-500" },
                    { step: "05", title: "Seal & Protect", desc: "Hydrophobic seal coats or epoxy protection.", note: "Optional Upgrade", icon: ShieldCheck, color: "text-emerald-500" },
                ].map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="rounded-2xl h-full p-6 hover:-translate-y-2 transition-transform duration-500 border border-white/5">
                            <div className="text-6xl font-black text-white/5 absolute top-2 right-4">{s.step}</div>
                            <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center ${s.color} mb-6`}>
                                <s.icon size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-slate-400 text-xs mb-4 flex-grow leading-relaxed">{s.desc}</p>
                            <div className="pt-4 border-t border-white/5">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                                    {s.note}
                                </span>
                            </div>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
             </div>
        </div>
    </section>
);

const SolutionMatrix = () => (
    <section className="py-32 px-6 bg-[#080d1a]">
        <div className="max-w-5xl mx-auto">
            <ScrollReveal>
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white">Application-Driven Solutions</h2>
                    <p className="text-slate-500 text-sm mt-2">Engineered to match substrate, climate exposure, and architecture.</p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1120]">
                    <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white border-b border-white/10">
                        <div className="col-span-4">Service</div>
                        <div className="col-span-4">System Type</div>
                        <div className="col-span-4">Primary Outcome</div>
                    </div>
                    {[
                        { s: "Roof Cleaning", sys: "Synroof® / Biocidal", out: "Regrowth Prevention" },
                        { s: "Waterproofing", sys: "Polymer-Modified Bitumen", out: "Moisture Rejection" },
                        { s: "Epoxy Reinforcement", sys: "Sika® / Industrial Resin", out: "Chemical Resistance" },
                        { s: "Restoration", sys: "Hybrid Hydrophobic Seal", out: "Extended Lifespan" },
                    ].map((row, i) => (
                        <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center group">
                            <div className="col-span-4 text-white font-bold text-sm md:text-base group-hover:text-orange-400 transition-colors">{row.s}</div>
                            <div className="col-span-4 text-cyan-400 font-mono text-xs md:text-sm">{row.sys}</div>
                            <div className="col-span-4 text-slate-400 text-xs md:text-sm group-hover:text-white transition-colors">{row.out}</div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const WhoWeServe = () => (
    <section className="py-24 px-6 bg-[#0B1120] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Designed for Assets That Must Last</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {[
                    "Residential Estates", "Commercial Offices", "Hotels & Leisure", 
                    "Hospitals", "Industrial Logistics", "Developers"
                ].map((tag, i) => (
                    <motion.span 
                        key={tag} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-6 py-3 border border-white/10 rounded-full text-slate-300 hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all cursor-default"
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>
            <p className="mt-8 text-slate-500 text-sm max-w-lg mx-auto font-mono uppercase tracking-widest">
                We support lifecycle planning for long-term maintenance.
            </p>
        </div>
    </section>
);

const CaseStudies = () => (
    <section className="py-32 px-6 bg-[#080d1a]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-12">Proven in the Field</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
                {[
                    { 
                        title: "2,400m² Commercial Roof", 
                        issue: "Heavy algae, micro-fractures", 
                        sys: "Synroof® Soft-Cycle + Seal", 
                        res: "Regrowth eliminated" 
                    },
                    { 
                        title: "Residential Clay Tile", 
                        issue: "Oxidation + surface staining", 
                        sys: "3-Stage Bio-Treatment", 
                        res: "Structural protection restored" 
                    },
                ].map((c, i) => (
                    <ScrollReveal key={i}>
                        <div className="group relative p-8 bg-[#0B1120] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all hover:shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                             <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                 <Anchor className="text-cyan-500" />
                             </div>
                             <div className="mb-6">
                                 <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{c.title}</h3>
                                 <p className="text-slate-500 text-sm mt-2">Issue: {c.issue}</p>
                             </div>
                             <div className="space-y-3 border-t border-white/5 pt-6">
                                 <div className="flex justify-between text-sm">
                                     <span className="text-slate-500">System:</span>
                                     <span className="text-cyan-400 font-mono">{c.sys}</span>
                                 </div>
                                 <div className="flex justify-between text-sm">
                                     <span className="text-slate-500">Outcome:</span>
                                     <span className="text-white font-bold">{c.res}</span>
                                 </div>
                             </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-gradient-to-b from-[#0B1120] to-[#050912]">
        <div className="max-w-4xl mx-auto bg-orange-900/10 border border-orange-500/20 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Book a Roof Condition Assessment</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Share your roof details or request a site visit. Our engineers will recommend the right protection system and restoration plan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/#contact" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-orange-500 text-[#0B1120] font-bold rounded-full hover:bg-orange-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                    Request Inspection <ArrowRight size={20} />
                </Link>
            </div>
            <p className="mt-6 text-xs text-orange-500 font-mono uppercase tracking-widest">
                We respond within 24 hours.
            </p>
        </div>
    </section>
);

export default function IndustrialPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-orange-500 selection:text-black cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <WhyItMatters />
            <InteractiveComparison />
            <ProcessSteps />
            <PartnerStrip />
            <SolutionMatrix />
            <WhoWeServe />
            <CaseStudies />
            <CTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
