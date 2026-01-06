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
  Play, Mic, Headphones, Youtube, 
  ArrowRight, Heart, Share2, Info, 
  Calendar, Clock, User, Send, Pause, 
  Radio, Signal, Hash 
} from "lucide-react";

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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-red-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-sm" />
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
            <div className="flex gap-1 justify-center mb-6 h-12 items-end">
                {[1,2,3,4,5].map((i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: [10, 40, 10] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-red-500 rounded-full"
                    />
                ))}
            </div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-red-500 uppercase tracking-widest"
            >
                Establishing Uplink...
            </motion.p>
        </div>
    </motion.div>
);

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// --- 2. DYNAMIC CONTENT ENGINE ---

const Marquee = () => (
    <div className="bg-red-600 text-[#0B1120] py-2 overflow-hidden border-y border-red-500/50">
        <motion.div 
            className="flex whitespace-nowrap gap-12 font-mono text-xs font-bold uppercase tracking-widest"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
            {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#0B1120] rounded-full animate-pulse" />
                    LIVE FROM TANZANIA • THINK LOKO • LOCAL VOICES • REAL CONTEXTS
                </span>
            ))}
        </motion.div>
    </div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 90]);
  
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#0B1120]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
            <div className="mb-8 relative w-48 h-16">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/think-logo-logo.png" 
                    alt="Think Loko" 
                    fill
                    className="object-contain object-left"
                />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                Local Voices. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-600">
                    Real Contexts.
                </span>
            </h1>
            
            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                <p>
                    A conversation space for makers, elders, farmers, and dreamers. We tell stories from Tanzania outward — grounded, nuanced, and human.
                </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
                <a href="https://podcasts.apple.com/tz/podcast/think-loko/id1741229116" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                    <Mic size={18} /> Apple Podcasts
                </a>
                <a href="https://www.youtube.com/@thinkloko" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-full hover:scale-105 transition-transform">
                    <Youtube size={18} /> YouTube
                </a>
                <button className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-transform">
                    <Signal size={18} /> RSS Feed
                </button>
            </div>
        </ScrollReveal>

        {/* ROTATING VINYL HERO */}
        <motion.div style={{ y }} className="relative flex justify-center">
             <motion.div 
                style={{ rotate }}
                className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-4 border-neutral-800 bg-neutral-900 shadow-2xl flex items-center justify-center overflow-hidden"
             >
                 {/* Album Art as Vinyl Sticker */}
                 <div className="absolute inset-0 opacity-80">
                    <Image 
                        src="https://storage.googleapis.com/sakura-web/Think-Loko-Cover.jpg" 
                        alt="Think Loko Cover" 
                        fill
                        className="object-cover"
                    />
                 </div>
                 {/* Vinyl Grooves & Hole */}
                 <div className="absolute inset-0 bg-[radial-gradient(transparent_40%,#000_100%)] opacity-50" />
                 <div className="absolute inset-0 rounded-full border-[50px] border-black/20" />
                 <div className="absolute w-20 h-20 bg-[#0B1120] rounded-full border-4 border-red-500 z-10 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full" />
                 </div>
             </motion.div>
             
             {/* Floating Badge */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-4 md:right-10 bg-red-600/90 backdrop-blur px-6 py-3 rounded-xl border border-red-400/30 text-white shadow-xl z-20"
             >
                 <div className="text-xs font-bold uppercase tracking-widest mb-1">Latest Drop</div>
                 <div className="font-bold text-lg">“When Solutions Arrive Before Listening”</div>
                 <div className="text-xs text-red-200">ft. Asha Mwinyi</div>
             </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutContext = () => (
    <section className="py-24 px-6 bg-[#0B1120] relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: TEXT CONTEXT */}
            <ScrollReveal>
                <div className="inline-flex items-center gap-2 mb-6 text-red-500">
                    <Radio size={16} className="animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest">The Signal</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    How Tanzania thinks, builds, works, and innovates.
                </h2>
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                    <p>
                        Think Loko is a storytelling and insight-driven podcast by Sakura Group. 
                        We dive into the real stories behind marketing, business, clean energy, 
                        technology, money, and everyday Tanzanian life — <span className="text-white font-medium">without the clichés or imported playbooks.</span>
                    </p>
                    <p>
                        Hosted by <span className="text-red-400 font-mono">@Jumbenylon</span> and <span className="text-red-400 font-mono">@omaryraymond</span>.
                    </p>
                </div>
            </ScrollReveal>

            {/* RIGHT: TOPICS LIST */}
            <div className="space-y-4">
                {[
                    "How consumers behave in our markets",
                    "What drives adoption of new technologies",
                    "The shift from charcoal to clean energy",
                    "Lessons from the field, campaigns, and activations",
                    "How Tanzanians build businesses"
                ].map((topic, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="group flex items-center gap-4 p-4 rounded-xl bg-[#080d1a] border border-white/5 hover:border-red-500/30 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                <Hash size={18} />
                            </div>
                            <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{topic}</span>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const LatestDrops = () => {
    // This replicates fetching from an API. 
    const videos = [
        { 
            id: 1, 
            title: "Farming Wisdom That Can’t Be Imported", 
            guest: "Mzee Khalifa", 
            views: "12K", 
            date: "2 Days Ago",
            thumb: "bg-amber-900" 
        },
        { 
            id: 2, 
            title: "The Rhythm of Kariakoo Market", 
            guest: "Mama Zuu", 
            views: "8.5K", 
            date: "1 Week Ago",
            thumb: "bg-red-900" 
        },
        { 
            id: 3, 
            title: "Building With Soil & Memory", 
            guest: "John K.", 
            views: "5K", 
            date: "2 Weeks Ago",
            thumb: "bg-emerald-900" 
        }
    ];

    return (
        <section className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <ScrollReveal>
                        <h2 className="text-4xl font-bold text-white">Latest Drops</h2>
                        <p className="text-slate-400">Fresh from the studio.</p>
                    </ScrollReveal>
                    <a href="https://www.youtube.com/@thinkloko" target="_blank" className="hidden md:flex items-center gap-2 text-red-500 font-bold hover:text-white transition-colors">
                        View Channel <ArrowRight size={16} />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {videos.map((v, i) => (
                        <ScrollReveal key={v.id} delay={i * 0.1}>
                            <a href="https://www.youtube.com/@thinkloko" target="_blank" className="group block">
                                <div className={`relative aspect-video rounded-2xl overflow-hidden ${v.thumb} mb-6 border border-white/5 group-hover:border-red-500/50 transition-all`}>
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl scale-0 group-hover:scale-100 transition-transform duration-300">
                                            <Play fill="currentColor" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">
                                        45:00
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors line-clamp-2 leading-tight">
                                    {v.title}
                                </h3>
                                <div className="flex gap-3 text-sm text-slate-500 mt-2">
                                    <span className="text-white">{v.guest}</span>
                                    <span>•</span>
                                    <span>{v.views} Views</span>
                                    <span>•</span>
                                    <span>{v.date}</span>
                                </div>
                            </a>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PlayerDock = () => (
    <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 3, type: "spring" }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:w-[400px] bg-[#1a1f2e]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-4"
    >
        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center shrink-0 animate-pulse">
            <Radio size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Now Streaming</div>
            <div className="text-white font-medium truncate text-sm">When Solutions Arrive Before Listening</div>
        </div>
        <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-white"><Play size={20} fill="currentColor" /></button>
        </div>
    </motion.div>
);

const Invitation = () => (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0B1120] to-[#1c0808]">
        <div className="max-w-4xl mx-auto bg-[#080d1a] border border-red-500/20 p-12 md:p-16 rounded-[3rem] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]" />
            
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Do You Carry a Story?</h2>
                <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                    If your story comes from lived reality, not from a template — we’d love to listen.
                </p>

                <form className="space-y-6 max-w-lg mx-auto text-left">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">Name</label>
                        <input className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition-colors" placeholder="Your Name" />
                    </div>
                    <button className="w-full bg-red-600 text-white font-bold py-5 rounded-xl hover:bg-red-500 transition-all duration-300 text-lg flex items-center justify-center gap-2">
                        <Send size={18} /> Request Guest Session
                    </button>
                </form>
            </ScrollReveal>
        </div>
    </section>
);

export default function MediaPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-red-500 selection:text-white cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            
            <Marquee />
            <Hero />
            <AboutContext />
            <LatestDrops />
            <Invitation />
            
            <PlayerDock />
        </motion.div>
      )}
    </main>
  );
}
