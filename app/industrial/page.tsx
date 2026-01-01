"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate 
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, ArrowUpRight, 
  Droplets, Layers, Sparkles, Phone, ShieldCheck 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- DATA ---
const specs = [
  {
    id: "01",
    label: "Waterproofing",
    desc: "Polymer-modified bituminous membranes for absolute moisture rejection.",
    tech: "ISO 9001 Compliant",
    icon: Droplets
  },
  {
    id: "02",
    label: "Epoxy Systems",
    desc: "Self-leveling industrial resin. Chemical resistant, seamless, and high-gloss.",
    tech: "Shore D Hardness: 80",
    icon: Layers
  },
  {
    id: "03",
    label: "Restoration",
    desc: "High-pressure biological treatment removing oxidation and algae at the pore level.",
    tech: "3-Stage Cycle",
    icon: Sparkles
  }
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
    <Link href="/" className="group flex items-center gap-2 text-xs font-mono tracking-widest hover:text-cyan-400 transition-colors">
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      SAKURA_IND
    </Link>
    <div className="flex items-center gap-4">
        <span className="hidden md:block text-xs font-mono opacity-50">EST. 2018</span>
        <ThemeToggle />
    </div>
  </nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col justify-end pb-20 px-6 overflow-hidden bg-neutral-950">
      {/* Dynamic Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
           src="https://storage.googleapis.com/sakura-web/rcs-hero.jpg"
           alt="RCS Standard"
           fill
           className="object-cover opacity-40 scale-110"
           priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full border-t border-white/20 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <h1 className="text-7xl md:text-[10rem] leading-[0.8] font-black tracking-tighter text-white uppercase">
                Perma<br />nence.
            </h1>
            <div className="flex flex-col gap-4 max-w-sm mb-4">
                <p className="text-neutral-400 text-lg leading-relaxed">
                    We don't just clean roofs. We engineer longevity. 
                    Advanced industrial coating and restoration systems.
                </p>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    RCS Protocol V.04
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

// The "Lens" Slider (Premium Interaction)
const ComparisonLens = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - left) / width) * 100;
    setPosition(Math.min(Math.max(pos, 0), 100));
  };

  return (
    <section className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto mb-16 flex items-end justify-between border-b border-white/10 pb-8">
            <h2 className="text-4xl font-light text-white">The Difference</h2>
            <span className="font-mono text-cyan-500 text-xs">// DRAG_TO_REVEAL</span>
        </div>

        <div 
            ref={containerRef}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            className="relative w-full aspect-[16/9] md:aspect-[2.35/1] overflow-hidden cursor-crosshair group border border-white/10"
        >
            {/* AFTER IMAGE (Bottom Layer) */}
            <div className="absolute inset-0">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/rcs-hero.jpg" 
                    alt="Restored"
                    fill
                    className="object-cover"
                />
                 <div className="absolute bottom-8 right-8 text-white font-mono text-xs bg-black/50 px-3 py-1 backdrop-blur-md">
                    STATUS: RESTORED
                </div>
            </div>

            {/* BEFORE IMAGE (Top Layer - Clipped) */}
            <div 
                className="absolute inset-0 bg-neutral-800"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
                <Image 
                    src="https://storage.googleapis.com/sakura-web/rcs-hero.jpg" 
                    alt="Original"
                    fill
                    className="object-cover grayscale contrast-125 sepia-[.5] brightness-50" 
                />
                <div className="absolute bottom-8 left-8 text-white font-mono text-xs bg-black/50 px-3 py-1 backdrop-blur-md">
                    STATUS: OXIDIZED
                </div>
            </div>

            {/* The Lens Line */}
            <div 
                className="absolute inset-y-0 w-px bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-20"
                style={{ left: `${position}%` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 border border-cyan-500 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm text-cyan-500">
                    <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                </div>
            </div>
        </div>
    </section>
  );
};

// "Specs" Style Services
const SpecsList = () => (
    <section className="py-20 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
            {specs.map((spec) => (
                <div key={spec.id} className="group border-t border-white/10 py-16 hover:bg-white/5 transition-colors duration-500 cursor-default">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8">
                        <div className="flex items-baseline gap-8 md:w-1/3">
                            <span className="font-mono text-xs text-neutral-500">0{spec.id}</span>
                            <h3 className="text-3xl md:text-5xl font-medium text-white group-hover:text-cyan-400 transition-colors">
                                {spec.label}
                            </h3>
                        </div>
                        <div className="md:w-1/3">
                            <p className="text-neutral-400 leading-relaxed text-lg">
                                {spec.desc}
                            </p>
                        </div>
                        <div className="md:w-1/6 text-right">
                             <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest block mb-2">Technical Spec</span>
                             <span className="text-white font-mono text-sm">{spec.tech}</span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="border-t border-white/10" />
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-neutral-950 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-white text-4xl md:text-6xl font-light mb-12">
                Ready to protect your asset?
            </h2>
            <button className="group relative px-12 py-6 bg-white text-black font-bold tracking-widest uppercase hover:bg-cyan-400 transition-colors duration-300">
                Initiate Inspection
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black" />
            </button>
            
            <div className="mt-24 flex gap-8 text-neutral-600 font-mono text-xs uppercase tracking-widest">
                <span>© 2026 SAKURA IND.</span>
                <span>DSM / NBO / LLW</span>
            </div>
        </div>
    </footer>
);

export default function IndustrialPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />
      <Hero />
      <ComparisonLens />
      <SpecsList />
      <Footer />
    </main>
  );
}
