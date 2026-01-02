"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, Truck, Lock, Globe, Zap, Navigation, 
  Clock, Users // Added Users to prevent import errors
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. KINETIC UTILITIES (FIXED TYPES) ---

// Corrected: Added className to the type definition and component props
const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: { 
  children: React.ReactNode, 
  delay?: number, 
  direction?: "up" | "left" | "right",
  className?: string 
}) => {
  const xOffset = direction === "left" ? -50 : direction === "right" ? 50 : 0;
  const yOffset = direction === "up" ? 50 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

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
      className={`relative border border-white/10 bg-[#0f172a] overflow-hidden group rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(234, 179, 8, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// --- 2. THE LOGISTICS ENGINE ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#050912]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1591768793355-74d7c869619a?q=80&w=2000"
            alt="African professional courier"
            fill
            className="object-cover opacity-40 grayscale contrast-125 brightness-75"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-r from-[#050912] via-[#050912]/80 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
                <span className="h-[1px] w-12 bg-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500/80">
                    Established Logistics Network
                </span>
            </div>
            
            <h1 className="text-7xl md:text-[9rem] font-black text-white tracking-tighter mb-10 leading-[0.85]">
                MOVEMENT.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    REDEFINED.
                </span>
            </h1>
            
            <div className="grid lg:grid-cols-2 gap-16 items-end">
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
                    From urban document flow to regional supply chains, we engineer the movement that powers East African commerce.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                    <Link href="/#contact" className="px-14 py-6 bg-yellow-500 text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl shadow-yellow-500/20">
                        Dispatch Now <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ServiceMosaic = () => {
    const caps = [
        { title: "Urban Dispatch", for: "Same-Day Courier", icon: Navigation, img: "https://images.unsplash.com/photo-1619451422372-95244213a0bb?q=80&w=800" },
        { title: "Vault Transfer", for: "Confidential Docs", icon: Lock, img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800" },
        { title: "Global Forwarding", for: "Import/Export", icon: Globe, img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800" }
    ];

    return (
        <section className="py-40 bg-[#050912] px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {caps.map((c, i) => (
                        <ScrollReveal key={i} delay={i * 0.15}>
                            <SpotlightCard className="h-full flex flex-col group">
                                <div className="relative aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <Image src={c.img} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                                </div>
                                <div className="p-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <c.icon className="text-yellow-500" size={20} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{c.for}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white tracking-tighter">{c.title}</h3>
                                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                                        Integrated tracking and verified chain-of-custody for every mile.
                                    </p>
                                </div>
                            </SpotlightCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const NetworkSection = () => (
    <section className="py-40 px-6 bg-[#0f172a] relative border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-20 items-center">
            <ScrollReveal direction="left" className="flex-1">
                <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-6">The Infrastructure</h2>
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10">
                    Built on Trust. <br/>
                    <span className="text-slate-600">Powered by Data.</span>
                </h3>
                <div className="grid grid-cols-2 gap-8">
                    {[
                        { l: "Trained Riders", i: Users },
                        { l: "GPS Integrated", i: Navigation },
                        { l: "Sealed Chain", i: Lock },
                        { l: "24/7 Dispatch", i: Clock }
                    ].map((feat, idx) => (
                        <div key={idx} className="space-y-3">
                            <feat.i className="text-yellow-500" size={24} />
                            <p className="text-xs font-black uppercase tracking-widest text-white">{feat.l}</p>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="flex-1 w-full">
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 group">
                    <Image 
                        src="https://images.unsplash.com/photo-1594833202970-d7907f59d288?q=80&w=1200"
                        alt="Supply chain dashboard"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                    />
                    <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="bg-black/80 backdrop-blur-xl p-8 rounded-full border border-yellow-500/30"
                        >
                            <Zap className="text-yellow-500" size={32} />
                        </motion.div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

export default function LogisticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#050912] text-white selection:bg-yellow-500 selection:text-black">
      <GlobalNavbar />
      <AnimatePresence>
        {loading && (
            <motion.div 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 z-[200] bg-[#050912] flex items-center justify-center"
            >
                <div className="text-center w-64">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 1.5 }}
                        className="h-[2px] bg-yellow-500 mb-6"
                    />
                    <p className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest">Optimizing Supply Route...</p>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Hero />
            <ServiceMosaic />
            <NetworkSection />
            
            <section className="py-40 bg-yellow-500 text-black text-center">
                <ScrollReveal>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10">MOVE WITHOUT DOUBT.</h2>
                    <Link href="/#contact" className="inline-flex items-center gap-6 px-16 py-8 bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:scale-110 transition-transform">
                        Request Pickup <ArrowRight size={20} />
                    </Link>
                </ScrollReveal>
            </section>
            
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
