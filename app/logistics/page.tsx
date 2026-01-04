"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ArrowRight, Lock, Globe, Zap, Navigation, 
  Clock, Users, MapPin, FileText, Anchor
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. THE REFINED PRELOADER ---
const Preloader = ({ isVisible }: { isVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    className="fixed inset-0 z-[200] bg-[#050912] flex flex-col items-center justify-center pointer-events-none"
  >
    <div className="text-center overflow-hidden">
      <motion.div 
        className="text-6xl md:text-8xl font-black text-white mb-4 tracking-[0.2em]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
      >
        DELIVER<span className="text-yellow-500">.</span>
      </motion.div>
      <div className="h-[2px] w-32 bg-white/10 mx-auto rounded-full overflow-hidden relative">
        <motion.div 
          className="h-full bg-yellow-500"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  </motion.div>
);

// --- 2. INTERACTIVE TECH-HOVER SECTION ---
const TechMoveSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="py-40 bg-yellow-500 text-black text-center relative overflow-hidden group cursor-none"
    >
      {/* Computerized Tech Lines following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 0, 0, 0.08),
              transparent 80%
            ),
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.03) 40px, rgba(0,0,0,0.03) 41px)
          `,
        }}
      />

      <ScrollReveal className="relative z-10">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10">MOVE WITHOUT DOUBT.</h2>
        <Link 
          href="/contact?service=logistics" 
          className="inline-flex items-center gap-6 px-16 py-8 bg-black text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:scale-110 transition-transform shadow-2xl"
        >
          Start Your Shipment <ArrowRight size={20} />
        </Link>
      </ScrollReveal>
    </section>
  );
};

// --- 3. KINETIC UTILITIES ---
const ScrollReveal = ({ children, delay = 0, direction = "up", className = "" }: any) => {
  const xOffset = direction === "left" ? -50 : direction === "right" ? 50 : 0;
  const yOffset = direction === "up" ? 50 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
};

const SpotlightCard = ({ children, className = "" }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className={`relative border border-white/10 bg-[#0f172a] overflow-hidden group rounded-3xl ${className}`} onMouseMove={handleMouseMove}>
      <motion.div className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(234, 179, 8, 0.15), transparent 80%)` }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// --- 4. MAIN PAGE ---
export default function LogisticsPage() {
  const [loading, setLoading] = useState(true);

  // Robust loading sync
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const caps = [
    { 
      title: "Urban Dispatch", 
      for: "Same-Day Courier", 
      icon: Navigation, 
      img: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=2070", // Man on motorcycle
      desc: "Instant point-to-point delivery for a city that never stops."
    },
    { 
      title: "Vault Transfer", 
      for: "Document Delivery", 
      icon: FileText, 
      img: "https://images.unsplash.com/photo-1589828914331-73c390fa4540?q=80&w=2070", // Mail/Package focus
      desc: "Tamper-proof, verified chain-of-custody for your most sensitive documents."
    },
    { 
      title: "Global Forwarding", 
      for: "Clearing & Forwarding", 
      icon: Anchor, 
      img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070", 
      desc: "Navigating complex borders with expertise in clearing and forwarding."
    }
  ];

  return (
    <main className="min-h-screen bg-[#050912] text-white selection:bg-yellow-500 selection:text-black">
      <GlobalNavbar />
      
      <AnimatePresence>
        {loading && <Preloader isVisible={loading} />}
      </AnimatePresence>
      
      <motion.div 
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#050912]">
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale contrast-125 brightness-75">
              <source src="https://assets.mixkit.co/videos/preview/mixkit-shipping-containers-at-a-busy-port-40059-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050912] via-[#050912]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <span className="h-[1px] w-12 bg-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500/80">Established Logistics Network</span>
              </div>
              <h1 className="text-7xl md:text-[9rem] font-black text-white tracking-tighter mb-10 leading-[0.85]">
                MOVEMENT.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">REDEFINED.</span>
              </h1>
              <Link href="/contact?service=logistics" className="inline-flex items-center gap-4 px-10 py-5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
                Explore Services <ArrowRight size={18} />
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* CITY TICKER */}
        <div className="py-12 bg-white/5 border-y border-white/5 overflow-hidden whitespace-nowrap flex">
          <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-20 items-center">
            {["Dar es Salaam", "Arusha", "Mwanza", "Zanzibar", "Dodoma", "Nairobi", "Kampala"].map((city) => (
              <div key={city} className="flex items-center gap-4">
                <MapPin size={14} className="text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">{city}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* SERVICE MOSAIC */}
        <section className="py-40 bg-[#050912] px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {caps.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
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
                    <p className="text-slate-400 text-sm font-light leading-relaxed">{c.desc}</p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* INFRASTRUCTURE SECTION */}
        <section className="py-40 px-6 bg-[#0f172a] relative border-y border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-20 items-center">
            <ScrollReveal direction="left" className="flex-1 text-center lg:text-left">
              <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-6">The Infrastructure</h2>
              <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10">
                Built on Trust. <br/>
                <span className="text-slate-600">Powered by Data.</span>
              </h3>
            </ScrollReveal>
            <ScrollReveal direction="right" className="flex-1 w-full">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070" alt="Infrastructure" fill className="object-cover grayscale brightness-75 contrast-125" />
                <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="bg-black/80 backdrop-blur-2xl p-8 rounded-full border border-yellow-500/40">
                    <Zap className="text-yellow-500 fill-yellow-500" size={32} />
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* INTERACTIVE CTA SECTION */}
        <TechMoveSection />
        
        <GlobalFooter />
      </motion.div>
    </main>
  );
}