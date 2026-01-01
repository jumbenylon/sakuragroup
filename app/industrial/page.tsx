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
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Droplets, Layers, 
  Hexagon, CheckCircle2, Factory, Hammer, ArrowLeftRight 
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
      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-40">
         {/* Abstract Industrial Texture */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8 backdrop-blur-md">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              Powered by Proven Materials
            </span>
          </div>
          
          <motion.h1 style={{ y: textY }} className="text-7xl md:text-[10rem] font-bold tracking-tighter text-white leading-[0.85] mb-8">
            PERMANENCE.
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
              <p className="text-xl text-slate-400 leading-relaxed font-light border-l border-cyan-500/50 pl-6">
                Industrial roof restoration and protective coating engineered with certified systems from leading global manufacturers.
                <br/>
                <span className="text-sm font-mono text-cyan-500 mt-2 block uppercase tracking-widest">
                    Applied by Certified Technicians
                </span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/#contact" className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-[#0B1120] font-bold rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2">
                  Book an Inspection
                  <ArrowRight size={20} />
                </Link>
                <button className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
                  How It Works
                </button>
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const BeforeAfter = () => (
    <section className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">The Difference</h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Restoration powered by <span className="text-cyan-400 font-bold">Sika®</span>, <span className="text-cyan-400 font-bold">Synroof®</span>, Bitumen-grade membranes, and industrial epoxy systems where required.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Eliminates biological growth & rust",
                                "Restores structural water-tightness",
                                "Extends roof lifespan by 10+ years"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-cyan-500" size={20} />
                                    <span className="text-white">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Simulated Slider Component */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group cursor-ew-resize">
                        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                            <span className="text-neutral-500 font-bold text-2xl">AFTER (Restored)</span>
                        </div>
                        <div className="absolute inset-0 w-1/2 bg-neutral-900 border-r-2 border-cyan-500 overflow-hidden">
                             <div className="absolute inset-0 w-[200%] flex items-center justify-center">
                                <span className="text-neutral-600 font-bold text-2xl">BEFORE (Weathered)</span>
                             </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                            <ArrowLeftRight size={20} />
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const PartnerStrip = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
                <ScrollReveal>
                    <div className="inline-block px-3 py-1 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        Material Science
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">Built on Trusted Systems.</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        Sakura Group works exclusively with certified, globally-recognized roofing and coating manufacturers. Every solution we deliver is backed by proven material science, warranty-ready application standards, and verified supply chains.
                    </p>
                    <p className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
                        Selected based on Engineering Requirements.
                    </p>
                </ScrollReveal>
            </div>
            <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                {/* Simulated Partner Logos */}
                {[
                    { name: "Sika", sub: "Industrial Resins" },
                    { name: "Synroof", sub: "Waterproofing" },
                    { name: "Nabaki Africa", sub: "Supply Partner" },
                    { name: "Dr. Fixit", sub: "Coatings" },
                    { name: "Bitumen", sub: "Membranes" },
                    { name: "Epoxy", sub: "Heavy Duty" }
                ].map((p, i) => (
                    <ScrollReveal key={i}>
                        <div className="h-24 bg-[#080d1a] border border-white/5 rounded-xl flex flex-col items-center justify-center p-4 hover:border-cyan-500/30 transition-colors group">
                            <span className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors">{p.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">{p.sub}</span>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const ProcessSteps = () => (
    <section className="py-32 px-6 bg-[#080d1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
             <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-16 text-center">5-Step Restoration Protocol</h2>
             </ScrollReveal>
             
             <div className="grid md:grid-cols-5 gap-6">
                {[
                    { step: "01", title: "Technical Audit", desc: "Drone survey & moisture mapping.", note: "Verified Audit" },
                    { step: "02", title: "Soft Wash", desc: "Biocidal treatment to kill organic growth.", note: "Sika® Compatible" },
                    { step: "03", title: "Surface Prep", desc: "High-pressure rinsing & crack routing.", note: "ISO Standard" },
                    { step: "04", title: "Seal & Bond", desc: "Application of primer & base coats.", note: "Bitumen/Epoxy" },
                    { step: "05", title: "Armor Coat", desc: "Final hydrophobic protective layer.", note: "Synroof Finish" },
                ].map((s, i) => (
                    <ScrollReveal key={i}>
                        <div className="relative p-6 bg-[#0B1120] border border-white/5 rounded-2xl h-full flex flex-col">
                            <div className="text-6xl font-black text-white/5 absolute top-2 right-4">{s.step}</div>
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-slate-400 text-sm mb-4 flex-grow">{s.desc}</p>
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
    <section className="py-32 px-6 bg-[#0B1120]">
        <div className="max-w-5xl mx-auto">
            <ScrollReveal>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080d1a]">
                    <div className="grid grid-cols-12 bg-white/5 p-4 text-xs font-bold uppercase tracking-widest text-white border-b border-white/10">
                        <div className="col-span-4">Service</div>
                        <div className="col-span-4">System Type</div>
                        <div className="col-span-4">Outcome</div>
                    </div>
                    {[
                        { s: "Roof Cleaning", sys: "Synroof / Biocidal", out: "Regrowth Prevention" },
                        { s: "Waterproofing", sys: "Bitumen / Polymer", out: "Moisture Rejection" },
                        { s: "Surface Sealing", sys: "Sika / Industrial Resin", out: "Chemical Resistance" },
                        { s: "Restoration", sys: "Hybrid Polymer Coat", out: "Lifespan Extension" },
                    ].map((row, i) => (
                        <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="col-span-4 text-white font-bold">{row.s}</div>
                            <div className="col-span-4 text-cyan-400 font-mono text-sm">{row.sys}</div>
                            <div className="col-span-4 text-slate-400 text-sm">{row.out}</div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const CaseStudies = () => (
    <section className="py-32 px-6 bg-[#080d1a] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-12">Field Results</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
                {[
                    { title: "2,400m² Office Roof", type: "Concrete Slab", sys: "Bitumen + Synroof", res: "Leak failure eliminated" },
                    { title: "Industrial Warehouse", type: "Corrugated Metal", sys: "Sika Rust Inhibitor", res: "Corrosion halted" },
                ].map((c, i) => (
                    <ScrollReveal key={i}>
                        <div className="group relative p-8 bg-[#0B1120] border border-white/5 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all">
                             <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                 <ArrowRight className="text-cyan-500 -rotate-45" />
                             </div>
                             <div className="mb-6">
                                 <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                     {c.type}
                                 </span>
                                 <h3 className="text-2xl font-bold text-white">{c.title}</h3>
                             </div>
                             <div className="space-y-2 border-t border-white/5 pt-6">
                                 <div className="flex justify-between text-sm">
                                     <span className="text-slate-500">System:</span>
                                     <span className="text-cyan-400 font-mono">{c.sys}</span>
                                 </div>
                                 <div className="flex justify-between text-sm">
                                     <span className="text-slate-500">Outcome:</span>
                                     <span className="text-white">{c.res}</span>
                                 </div>
                             </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const WhoWeServe = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Engineered For</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {[
                    "Commercial Developers", "Facility Managers", "Industrial Plants", 
                    "Warehousing Logistics", "Institutional Buildings"
                ].map((tag) => (
                    <span key={tag} className="px-6 py-3 border border-white/10 rounded-full text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-default">
                        {tag}
                    </span>
                ))}
            </div>
            <p className="mt-8 text-slate-500 text-sm max-w-lg mx-auto">
                Specifically for clients who require certified material partners and documented installation processes.
            </p>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-gradient-to-b from-[#080d1a] to-[#0B1120]">
        <div className="max-w-4xl mx-auto bg-cyan-900/10 border border-cyan-500/20 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Request a Roof Assessment</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Our engineers will evaluate your roof and recommend the right system — not just a cleaning treatment.
            </p>
            
            <Link href="/#contact" className="inline-flex items-center gap-2 px-10 py-5 bg-cyan-500 text-[#0B1120] font-bold rounded-full hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                Book an Inspection <ArrowRight size={20} />
            </Link>
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
            <BeforeAfter />
            <PartnerStrip />
            <ProcessSteps />
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
