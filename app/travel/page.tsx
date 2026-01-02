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
  ArrowRight, Compass, Sunset, 
  Palmtree, Mountain, Anchor, Heart, 
  Zap, TrendingUp, Award, Coffee, 
  MapPin, Globe, Wind
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
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
        <div className="text-center">
             <motion.div 
                 className="text-8xl font-black text-white mb-4 tracking-tighter"
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 0.5 }}
             >
                 DEPART.
             </motion.div>
             <div className="h-1 w-32 bg-amber-500 mx-auto rounded-full overflow-hidden">
                 <motion.div 
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
             </div>
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
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 158, 11, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const Counter = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => {
    return (
        <div className="text-center p-6 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
            <Icon className="mx-auto mb-4 text-amber-500 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" size={32} />
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{value}</div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">{label}</div>
        </div>
    );
};

// --- 2. PAGE SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen min-h-[900px] flex items-center px-6 pt-20 overflow-hidden bg-black">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 opacity-60">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale contrast-125"
         >
             <source src="https://storage.googleapis.com/sakura-web/sakura-travel-hero.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-8">
             <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
             <span className="text-xs font-bold text-white uppercase tracking-widest">Where Journeys Begin</span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter mb-8">
            TANZANIA.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                UNFOLDING.
            </span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
             <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed border-l-4 border-amber-500 pl-6">
                Safari itineraries, island escapes, and mountain horizons crafted with memory and wonder.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/#contact" className="group relative px-10 py-5 bg-amber-600 text-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2">Plan My Trip <ArrowRight size={20}/></span>
                </Link>
             </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ImpactStats = () => (
    <section className="py-20 px-6 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <Counter value="150+" label="Safaris Guided" icon={Compass} />
                <Counter value="12k+" label="Miles Traveled" icon={TrendingUp} />
                <Counter value="100%" label="Local Expertise" icon={Award} />
                <Counter value="∞" label="Memories Made" icon={Coffee} />
            </div>
        </div>
    </section>
);

const SelectedWorks = () => {
    const works = [
        { client: "Serengeti", project: "Great Migration", cat: "Wildlife Safari", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000" },
        { client: "Zanzibar", project: "Island of Stories", cat: "Beach Escape", img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1000" },
        { client: "Kilimanjaro", project: "Summit Pillar", cat: "Mountain Trek", img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=1000" },
        { client: "Ruaha", project: "Untouched Wilds", cat: "Southern Circuit", img: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?q=80&w=1000" },
    ];

    return (
        <section className="py-32 bg-[#050505] overflow-hidden">
            <div className="px-6 mb-12 flex justify-between items-end max-w-7xl mx-auto">
                 <div>
                    <h2 className="text-5xl font-black text-white mb-2">CHOOSE YOUR JOURNEY</h2>
                    <p className="text-slate-400">Hand-crafted destinations.</p>
                 </div>
                 <Link href="#" className="hidden md:flex items-center gap-2 text-amber-500 font-bold hover:text-white transition-colors">
                    View All Destinations <ArrowRight size={16} />
                 </Link>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-12 px-6 snap-x">
                {works.map((w, i) => (
                    <motion.div 
                        key={i}
                        className="snap-center shrink-0 w-[85vw] md:w-[600px] group cursor-pointer"
                        whileHover={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6 border border-white/5">
                            <Image src={w.img} alt={w.client} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-4xl font-black text-white uppercase tracking-tighter">{w.client}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">{w.project}</h3>
                                <p className="text-slate-500">{w.client}</p>
                            </div>
                            <span className="px-3 py-1 border border-white/10 rounded-full text-xs font-mono text-slate-400 uppercase">
                                {w.cat}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default function TravelPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <ImpactStats />
            <SelectedWorks />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
