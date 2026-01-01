"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, ShieldCheck, CheckCircle2, 
  Layers, ArrowLeftRight, Activity, Droplets, 
  Sun, TrendingUp, Anchor 
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
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
                className="h-1 bg-cyan-500 mb-4 mx-auto rounded-full"
            />
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-cyan-500 uppercase tracking-widest"
            >
                Calibrating Systems...
            </motion.p>
        </div>
    </motion.div>
);

const ScrollReveal = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// --- 2. CUSTOM PAGE COMPONENTS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]); 

  return (
    <section className="relative h-[90vh] flex items-center px-6 pt-20 overflow-hidden bg-[#0B1120]">
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-50">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale mix-blend-overlay"
         >
             <source src="https://storage.googleapis.com/sakura-web/roof%20cleaning/roof-cleaning.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8 backdrop-blur-md">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
               ISO-Compliant • Warranty-Ready
            </span>
          </div>
          
          <motion.h1 style={{ y: textY }} className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white leading-[0.85] mb-8">
            PERMANENCE.
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-xl text-slate-400 leading-relaxed font-light border-l border-cyan-500/50 pl-6">
                Industrial-grade roof cleaning, restoration, and protective coating — engineered to extend lifespan, prevent biological growth, and preserve structural integrity.
                <br/>
                <span className="text-sm font-mono text-cyan-500 mt-4 block uppercase tracking-widest">
                    Powered by Certified Material Systems
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/#contact" className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-[#0B1120] font-bold rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2">
                  Book a Roof Assessment
                  <ArrowRight size={20} />
                </Link>
                <button className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
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
    <section className="py-24 px-6 bg-[#080d1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    A clean roof isn't cosmetic — <span className="text-cyan-400">it's structural preservation.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Uncontrolled algae, oxidation, and moisture accelerate surface decay, leak risk, and thermal inefficiency. Our restoration systems remove biological growth at the pore level and seal surfaces to prevent recurrence.
                </p>
                <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs text-cyan-500 font-mono uppercase tracking-widest">
                    Designed for Industrial & Commercial Assets
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                    { title: "Extends Lifespan", desc: "Prevents premature deterioration.", icon: Activity },
                    { title: "Prevents Moisture", desc: "Reduces leak risk & breakdown.", icon: Droplets },
                    { title: "Improves Efficiency", desc: "Restores reflectivity.", icon: Sun },
                    { title: "Property Value", desc: "Preserves asset integrity.", icon: TrendingUp },
                ].map((item, i) => (
                    <ScrollReveal key={i}>
                        <div className="p-6 bg-[#0B1120] border border-white/5 rounded-xl hover:border-cyan-500/30 transition-colors">
                            <item.icon className="text-cyan-500 mb-4" size={24} />
                            <h3 className="font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const BeforeAfter = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="grid md:grid-cols-12 gap-16 items-center">
                    <div className="md:col-span-5">
                        <h2 className="text-4xl font-bold text-white mb-6">The Difference</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Biological growth doesn’t just stain — it weakens material surfaces. Our process restores structural integrity and seals the substrate for long-term protection.
                        </p>
                        <div className="p-4 bg-[#080d1a] border border-white/5 rounded-xl">
                            <p className="text-xs text-slate-500 leading-relaxed">
                                <strong className="text-white block mb-1">System Specs:</strong>
                                Restoration powered by Sika®, Synroof®, epoxy-grade resin systems, and polymer-modified Bitumen membranes.
                            </p>
                        </div>
                    </div>
                    
                    {/* Visual Slider Concept */}
                    <div className="md:col-span-7 relative aspect-video rounded-3xl overflow-hidden border border-white/10 group cursor-ew-resize">
                        {/* Background (After) */}
                        <div className="absolute inset-0">
                           <Image 
                                src="https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2000&auto=format&fit=crop" 
                                alt="Restored Roof"
                                fill
                                className="object-cover"
                           />
                           <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
                           <div className="absolute top-6 right-6 px-4 py-2 bg-cyan-500/90 backdrop-blur text-[#0B1120] text-xs font-bold uppercase tracking-widest rounded-full">
                               Status: Restored & Sealed
                           </div>
                        </div>

                        {/* Foreground (Before) - Clipped 50% */}
                        <div className="absolute inset-0 w-1/2 overflow-hidden border-r-2 border-cyan-500 bg-[#0B1120]">
                             <div className="relative w-[200vw] h-full md:w-[calc(100%*2)]"> {/* Counter-stretch to keep image static */}
                                <Image 
                                    src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2000&auto=format&fit=crop" 
                                    alt="Weathered Roof"
                                    fill
                                    className="object-cover grayscale contrast-125" // Grayscale for "Before" effect
                                />
                                <div className="absolute inset-0 bg-black/40" />
                             </div>
                             <div className="absolute top-6 left-6 px-4 py-2 bg-black/80 backdrop-blur text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/10">
                                 Status: Organic Growth
                             </div>
                        </div>

                        {/* Slider Handle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-[#0B1120] shadow-[0_0_30px_rgba(6,182,212,0.6)] z-20">
                            <ArrowLeftRight size={20} />
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

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
                    <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
                        Never One-Size-Fits-All.
                    </p>
                </ScrollReveal>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 gap-8">
                {/* PARTNER LOGOS - EXACTLY 4 AS REQUESTED */}
                {[
                    { name: "Synroof", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/synroof-logo.png" },
                    { name: "Sika", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/sika-logo.png" },
                    { name: "Nabaki", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/nabaki-logo.png" },
                    { name: "Dr. Fixit", url: "https://storage.googleapis.com/sakura-web/roof%20cleaning/dr.fixit-logo.png" },
                ].map((p, i) => (
                    <ScrollReveal key={i}>
                        <div className="h-32 bg-[#0B1120] border border-white/5 rounded-2xl flex items-center justify-center p-6 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-full h-full">
                                <Image 
                                    src={p.url} 
                                    alt={p.name} 
                                    fill 
                                    className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
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
                    { step: "01", title: "Condition Audit", desc: "Full-surface inspection for cracks & water ingress.", note: "Safety Planning" },
                    { step: "02", title: "Prep & Protect", desc: "Safety-zoning, anchor points & drainage mapping.", note: "Site Safety" },
                    { step: "03", title: "Bio-Treatment", desc: "Low-pressure soft wash removing pore-depth algae.", note: "Roof-Safe" },
                    { step: "04", title: "Rinse & Flush", desc: "Controlled rinse cycle & substrate stabilization.", note: "Debris Extraction" },
                    { step: "05", title: "Seal & Protect", desc: "Hydrophobic seal coats or epoxy protection.", note: "Optional Upgrade" },
                ].map((s, i) => (
                    <ScrollReveal key={i}>
                        <div className="relative p-6 bg-[#080d1a] border border-white/5 rounded-2xl h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-6xl font-black text-white/5 absolute top-2 right-4">{s.step}</div>
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-slate-400 text-xs mb-4 flex-grow leading-relaxed">{s.desc}</p>
                            <div className="pt-4 border-t border-white/5">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-500">
                                    {s.note}
                                </span>
                            </div>
                        </div>
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
                        <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center">
                            <div className="col-span-4 text-white font-bold text-sm md:text-base">{row.s}</div>
                            <div className="col-span-4 text-cyan-400 font-mono text-xs md:text-sm">{row.sys}</div>
                            <div className="col-span-4 text-slate-400 text-xs md:text-sm">{row.out}</div>
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
                ].map((tag) => (
                    <span key={tag} className="px-6 py-3 border border-white/10 rounded-full text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-default">
                        {tag}
                    </span>
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
                        <div className="group relative p-8 bg-[#0B1120] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all">
                             <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                 <Anchor className="text-cyan-500" />
                             </div>
                             <div className="mb-6">
                                 <h3 className="text-2xl font-bold text-white">{c.title}</h3>
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
        <div className="max-w-4xl mx-auto bg-cyan-900/10 border border-cyan-500/20 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Book a Roof Condition Assessment</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Share your roof details or request a site visit. Our engineers will recommend the right protection system and restoration plan.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/#contact" className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-cyan-500 text-[#0B1120] font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    Request Inspection <ArrowRight size={20} />
                </Link>
            </div>
            <p className="mt-6 text-xs text-cyan-500 font-mono uppercase tracking-widest">
                We respond within 24 hours.
            </p>
        </div>
    </section>
);

export default function IndustrialPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-cyan-500 selection:text-black cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <WhyItMatters />
            <BeforeAfter />
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
