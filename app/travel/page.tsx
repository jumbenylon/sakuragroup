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
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, Compass, Map, Sunset, 
  Palmtree, Mountain, Anchor, Heart, 
  Camera, Plane, Ship, Wind 
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center"
    >
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-amber-500 font-serif italic text-3xl mb-4"
            >
                Sakura Travels
            </motion.div>
            <motion.p 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="text-[10px] text-slate-500 uppercase tracking-[0.3em] overflow-hidden whitespace-nowrap border-b border-amber-500/30 pb-1"
            >
                Where journeys begin
            </motion.p>
        </div>
    </motion.div>
);

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// --- 2. PAGE SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden bg-black">
      {/* Background: Serengeti Sunrise (Parallax) */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000&auto=format&fit=crop"
            alt="Serengeti Sunrise"
            fill
            className="object-cover"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl">
        <ScrollReveal>
            <motion.h1 
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.2em", opacity: 1 }}
                transition={{ duration: 2 }}
                className="text-white text-sm md:text-base uppercase tracking-[0.5em] mb-6 font-light"
            >
                Sakura Travels
            </motion.h1>
            <h2 className="text-5xl md:text-8xl font-serif italic text-white mb-8 leading-tight">
                Where journeys begin.
            </h2>
            <p className="text-amber-200/80 font-light tracking-widest text-xs md:text-sm uppercase">
                Tanzania — told through travel, memory and adventure.
            </p>
        </ScrollReveal>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-12 bg-white/20" />
      </motion.div>
    </section>
  );
};

const DestinationMosaics = () => {
  const destinations = [
    { name: "The Serengeti", desc: "Where the Earth Still Roams Wild", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000" },
    { name: "Zanzibar", desc: "Salt Wind, Old Stone, Infinite Blue", img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1000" },
    { name: "Kilimanjaro", desc: "The Mountain That Waits For You", img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=1000" },
    { name: "Southern Circuit", desc: "Untouched, Uncrowded, Unrepeatable", img: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?q=80&w=1000" },
  ];

  return (
    <section className="py-32 px-6 bg-[#020617]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {destinations.map((d, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-none">
              <Image 
                src={d.img}
                alt={d.name}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h3 className="text-white text-3xl font-serif italic mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  {d.name}
                </h3>
                <p className="text-white/60 text-sm font-light max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {d.desc}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const ImmersiveScroll = () => {
    const { scrollYProgress } = useScroll();
    const bgOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
    
    return (
        <section className="relative h-[200vh] bg-[#020617] flex items-center justify-center">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
                    <Image 
                        src="https://images.unsplash.com/photo-1534190239940-9ba8944ea261?q=80&w=2000"
                        alt="Background Transition"
                        fill
                        className="object-cover grayscale opacity-20"
                    />
                </motion.div>
                
                <div className="relative z-10 text-center max-w-3xl px-6 space-y-12">
                    <ScrollReveal>
                        <p className="text-white text-2xl md:text-4xl font-serif italic leading-relaxed">
                            “Tanzania is not a place you visit. It is a place that meets you.”
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4}>
                        <p className="text-amber-500/60 uppercase tracking-[0.3em] text-[10px]">
                            We design moments you will return to in your mind for years.
                        </p>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

const ServiceUniverse = () => (
    <section className="py-32 px-6 bg-[#020617] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
            <ScrollReveal>
                <div className="space-y-16">
                    <div>
                        <h3 className="text-white text-2xl font-serif italic mb-4 flex items-center gap-4">
                            <Compass className="text-amber-500" size={20} /> Safari & Wildlife
                        </h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            Private safaris, guided journeys and small-group adventures across Tanzania’s legendary parks — designed for travelers who want to feel, not just see.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white text-2xl font-serif italic mb-4 flex items-center gap-4">
                            <Heart className="text-amber-500" size={20} /> Honeymoons & Romance
                        </h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            Intimate escapes, island sunsets, quiet villas, and ocean-light mornings shared between two people who will never forget this time.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
                 <div className="space-y-16">
                    <div>
                        <h3 className="text-white text-2xl font-serif italic mb-4 flex items-center gap-4">
                            <Sunset className="text-amber-500" size={20} /> Flights & Transfers
                        </h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            Local and international routes, Zanzibar ferry bookings, and inter-city transfers — handled through one reliable partner, end-to-end.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white text-2xl font-serif italic mb-4 flex items-center gap-4">
                            <Wind className="text-amber-500" size={20} /> Custom Planning
                        </h3>
                        <p className="text-slate-400 font-light leading-relaxed">
                            If the journey you’re dreaming of doesn’t exist yet — we will design it with you. Hand-crafted with intention.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const PlanWithUs = () => (
    <section className="py-32 px-6 bg-[#020617] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal>
                <h2 className="text-white text-4xl md:text-5xl font-serif italic mb-8">
                    Tell us the journey that’s been living in your mind.
                </h2>
                <p className="text-slate-500 mb-12 max-w-xl mx-auto font-light">
                    Share what you’re dreaming of — and we will shape it into something real.
                </p>
                
                <form className="space-y-8 text-left max-w-lg mx-auto">
                    <div className="border-b border-white/10 pb-4">
                        <label className="text-[10px] text-amber-500 uppercase tracking-widest block mb-2">Full Name</label>
                        <input type="text" className="bg-transparent w-full text-white outline-none font-light" placeholder="How shall we call you?" />
                    </div>
                    <div className="border-b border-white/10 pb-4">
                        <label className="text-[10px] text-amber-500 uppercase tracking-widest block mb-2">Your Destination</label>
                        <input type="text" className="bg-transparent w-full text-white outline-none font-light" placeholder="Where do you want to go?" />
                    </div>
                    <div className="border-b border-white/10 pb-4">
                        <label className="text-[10px] text-amber-500 uppercase tracking-widest block mb-2">The Dream</label>
                        <textarea rows={3} className="bg-transparent w-full text-white outline-none font-light resize-none" placeholder="What kind of experience are you imagining?" />
                    </div>
                    <button className="w-full py-6 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-colors">
                        Begin Planning
                    </button>
                </form>
            </ScrollReveal>
        </div>
    </section>
);

const FooterPoem = () => (
    <section className="py-40 px-6 bg-black text-center relative">
        <Image 
            src="https://images.unsplash.com/photo-1502920514313-525810023759?q=80&w=2000"
            alt="Dusk Horizon"
            fill
            className="object-cover opacity-20"
        />
        <div className="relative z-10">
            <ScrollReveal>
                <p className="text-white text-2xl font-serif italic mb-4">Tanzania is never finished.</p>
                <p className="text-amber-500/60 uppercase tracking-[0.3em] text-[10px]">Every time you return — it meets you differently.</p>
            </ScrollReveal>
        </div>
    </section>
);

export default function TravelPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-amber-500 selection:text-white cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <DestinationMosaics />
            <ImmersiveScroll />
            <ServiceUniverse />
            <PlanWithUs />
            <FooterPoem />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
