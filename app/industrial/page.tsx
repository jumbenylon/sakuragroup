"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring 
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Droplets, Layers, Sparkles, 
  ArrowRight, CheckCircle2, Shield, Phone 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- DATA FROM FLYER ---
const services = [
  {
    title: "Water Proofing",
    items: ["Roof Sealing", "Concrete Protection", "Foundation Barriers"],
    description: "Stop leaks before they compromise structural integrity. We use industrial-grade bituminous and acrylic sealants.",
    icon: Droplets,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10 border-cyan-500/20"
  },
  {
    title: "Epoxy Flooring",
    items: ["Warehouses", "Factories & Showrooms", "Health Centers"],
    description: "High-gloss, chemical-resistant flooring solutions designed for heavy machinery and sterile environments.",
    icon: Layers,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20"
  },
  {
    title: "Roof Restoration",
    items: ["Algae Treatment", "Color Painting", "Stain Removal"],
    description: "Don't replace it, restore it. Our 3-stage cleaning process removes years of oxidation and biological growth.",
    icon: Sparkles,
    color: "text-rose-500",
    bg: "bg-rose-500/10 border-rose-500/20"
  }
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-neutral-200 dark:border-white/5 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl transition-all duration-300">
    <div className="flex items-center gap-4">
      <Link href="/" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
        <ArrowLeft className="w-5 h-5 text-neutral-900 dark:text-white group-hover:-translate-x-1 transition-transform" />
      </Link>
      <div className="flex items-center gap-3">
        <div className="relative w-6 h-6">
          <Image 
            src="https://storage.googleapis.com/sakura-web/logo-icon.png" 
            alt="Sakura Group" 
            fill
            className="object-contain"
          />
        </div>
        <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
          Sakura Industrial.
        </span>
      </div>
    </div>
    <ThemeToggle />
  </nav>
);

// THE "SEEING IS BELIEVING" SLIDER
const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const position = ((clientX - left) / width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-20 px-6">
       <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                Seeing is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Believing.</span>
            </h2>
            <p className="text-neutral-500">Drag the slider to see the restoration impact.</p>
       </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden cursor-col-resize shadow-2xl border border-neutral-200 dark:border-white/10 select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* IMAGE 1: AFTER (Clean/Restored) - Using Gradient as Placeholder */}
        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
             <Image 
               src="https://storage.googleapis.com/sakura-web/hero-gradient.jpg" 
               alt="After"
               fill
               className="object-cover"
             />
             <span className="absolute top-8 right-8 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest z-10">
                After Restoration
             </span>
        </div>

        {/* IMAGE 2: BEFORE (Dirty/Damaged) - Using Texture as Placeholder */}
        <div 
            className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
             <Image 
               src="https://storage.googleapis.com/sakura-web/ecosystem-lines.png" 
               alt="Before"
               fill
               className="object-cover opacity-50 grayscale contrast-125"
             />
             <div className="absolute inset-0 bg-neutral-900/40" /> {/* Grime Overlay */}
             <span className="absolute top-8 left-8 bg-rose-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest z-10">
                Before Damage
             </span>
        </div>

        {/* THE SLIDER HANDLE */}
        <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20"
            style={{ left: `${sliderPosition}%` }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                <div className="flex gap-1">
                    <ArrowLeft size={14} className="text-neutral-900" />
                    <ArrowRight size={14} className="text-neutral-900" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative pt-40 pb-20 px-6 min-h-[70vh] flex flex-col justify-center overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-neutral-950">
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" 
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, gray 1px, transparent 0)', backgroundSize: '40px 40px' }} 
            />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center md:text-left">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-neutral-900 dark:text-white leading-[0.9] mb-8">
                    WATERPROOF. <br />
                    SEAL. <span className="text-cyan-500">PROTECT.</span>
                </h1>
                
                <p className="max-w-xl text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed md:ml-2">
                    Stop leaks, stop cracks, start saving. Professional industrial waterproofing and surface restoration for Tanzania's toughest climates.
                </p>

                <div className="flex flex-wrap gap-4 mt-8 md:ml-2 justify-center md:justify-start">
                    <button className="bg-neutral-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity">
                        Get Inspection
                    </button>
                    <button className="border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white px-8 py-4 rounded-full font-bold hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
                        View Portfolio
                    </button>
                </div>
            </motion.div>
        </div>

        <motion.div style={{ y }} className="absolute -right-20 top-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

const ServiceGrid = () => (
    <section className="py-24 px-6 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
                <div key={idx} className={`p-8 rounded-3xl border ${service.bg} bg-white dark:bg-neutral-950 hover:shadow-xl transition-shadow duration-300`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-neutral-100 dark:bg-neutral-900 ${service.color}`}>
                        <service.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">{service.title}</h3>
                    <ul className="space-y-3 mb-8">
                        {service.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                <CheckCircle2 size={16} className={service.color.replace('text-', 'text-')} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 dark:border-neutral-800 pt-6">
                        {service.description}
                    </p>
                </div>
            ))}
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-neutral-900 dark:bg-white rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white dark:text-neutral-900 mb-8">
                    Start Saving Today.
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white dark:text-neutral-900">
                    <div className="flex items-center gap-3">
                        <Phone size={24} className="text-cyan-500" />
                        <span className="text-xl font-mono font-bold">+255 753 930 000</span>
                    </div>
                    <span className="hidden md:block opacity-30">|</span>
                    <div className="flex items-center gap-3">
                        <Phone size={24} className="text-cyan-500" />
                        <span className="text-xl font-mono font-bold">+255 782 020 840</span>
                    </div>
                </div>
                <p className="mt-8 text-neutral-400 dark:text-neutral-500">info@sakuragroup.co.tz</p>
            </div>
            
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                 <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[100px]" />
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="py-12 px-6 text-center border-t border-neutral-200 dark:border-neutral-800">
    <p className="text-sm text-neutral-500">
      &copy; {new Date().getFullYear()} Sakura Industrial. Built to Last.
    </p>
  </footer>
);

export default function IndustrialPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 selection:bg-cyan-500 selection:text-white">
      <Navbar />
      <Hero />
      <ComparisonSlider />
      <ServiceGrid />
      <CTA />
      <Footer />
    </main>
  );
}
