"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, Compass, Sunset, 
  Heart, Wind, MapPin, Globe, 
  Mountain, Palmtree, Anchor
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED COMPONENTS ---

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
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
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000"
            alt="Serengeti Sunset"
            fill
            className="object-cover"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 text-center max-w-4xl">
        <ScrollReveal>
            <h1 className="text-white text-sm uppercase tracking-[0.5em] mb-8 font-light">
                Sakura Travels
            </h1>
            <h2 className="text-6xl md:text-9xl font-serif italic text-white mb-8 leading-tight">
                Where journeys begin.
            </h2>
            <p className="text-amber-200/60 uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Tanzania — told through travel, memory and adventure.
            </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

const DestinationMosaic = () => {
  const destinations = [
    { name: "The Serengeti", desc: "Where the Earth Still Roams Wild", icon: Compass, img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000" },
    { name: "Zanzibar", desc: "Salt Wind, Old Stone, Infinite Blue", icon: Anchor, img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1000" },
    { name: "Kilimanjaro", desc: "The Mountain That Waits For You", icon: Mountain, img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=1000" },
    { name: "Southern Circuit", desc: "Untouched, Uncrowded, Unrepeatable", icon: Wind, img: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?q=80&w=1000" },
  ];

  return (
    <section className="py-32 px-6 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-16">Choose Your Journey</h3>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12">
            {destinations.map((d, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="group relative aspect-[16/10] overflow-hidden rounded-sm cursor-pointer">
                        <Image src={d.img} alt={d.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <d.icon className="text-amber-500 mb-4 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                            <h4 className="text-3xl text-white font-serif italic mb-2">{d.name}</h4>
                            <p className="text-white/60 text-sm font-light leading-relaxed max-w-xs">{d.desc}</p>
                        </div>
                    </div>
                </ScrollReveal>
            ))}
        </div>
      </div>
    </section>
  );
};

const NarrativeScroll = () => (
    <section className="py-40 px-6 bg-black text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-16 relative z-10">
            {[
                "Tanzania is not a place you visit.",
                "It is a place that meets you.",
                "In the wind. In the stillness. In the light."
            ].map((text, i) => (
                <ScrollReveal key={i} delay={i * 0.2}>
                    <p className="text-2xl md:text-5xl font-serif italic text-white/90 leading-snug">
                        {text}
                    </p>
                </ScrollReveal>
            ))}
            <ScrollReveal delay={0.8}>
                <div className="pt-10">
                    <p className="text-amber-500/60 uppercase tracking-[0.3em] text-[10px] md:text-xs">
                        We design moments you will return to in your mind for years.
                    </p>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const ServiceUniverse = () => (
    <section className="py-32 px-6 bg-[#020617] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
            <ScrollReveal>
                <div className="space-y-6">
                    <Compass className="text-amber-500" size={32} />
                    <h4 className="text-xl text-white font-serif italic">Safari Expeditions</h4>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                        Hand-crafted journeys across national parks. Private safaris made for travelers who want more than sightseeing.
                    </p>
                </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
                <div className="space-y-6">
                    <Heart className="text-amber-500" size={32} />
                    <h4 className="text-xl text-white font-serif italic">Romantic Getaways</h4>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                        Intimate escapes, island sunsets, and quiet villas. Moments two people will carry forever.
                    </p>
                </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
                <div className="space-y-6">
                    <Sunset className="text-amber-500" size={32} />
                    <h4 className="text-xl text-white font-serif italic">Precision Logistics</h4>
                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                        Seamless flights, inter-city transfers, and ferry bookings. Corporate travel that still deserves comfort.
                    </p>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const TravelCTA = () => (
    <section className="py-40 px-6 bg-[#020617] text-center">
        <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-serif italic text-white mb-12">
                Plan the journey that’s been living in your mind.
            </h2>
            <Link href="/#contact" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-colors rounded-full">
                Begin Planning <ArrowRight size={18} />
            </Link>
        </ScrollReveal>
    </section>
);

export default function TravelPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black">
      <AnimatePresence>
        {loading && (
            <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
                <span className="text-amber-500 font-serif italic text-2xl animate-pulse">Sakura Travels...</span>
            </motion.div>
        )}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <DestinationMosaic />
            <NarrativeScroll />
            <ServiceUniverse />
            <TravelCTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
