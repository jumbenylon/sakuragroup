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
  Calendar, Clock, User, Send 
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED UNBOUND COMPONENTS (Adapted for Media) ---

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
            {/* Audio Wave Animation */}
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
                Tuning Frequency...
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

// --- 2. CUSTOM PAGE COMPONENTS ---

const AudioVisualizer = () => (
    <div className="flex items-center gap-1 h-8">
        {[...Array(20)].map((_, i) => (
            <motion.div 
                key={i}
                className="w-1 bg-red-500/50 rounded-full"
                animate={{ height: ["20%", "80%", "20%"] }}
                transition={{ 
                    duration: 1 + Math.random(), 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: Math.random() * 0.5 
                }}
            />
        ))}
    </div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#0B1120]">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      {/* Ambient Red Glow */}
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
                    Think Loko is a conversation space for people whose lives shape the places we live in — makers, elders, farmers, artists, drivers, builders, traders, teachers, activists, dreamers.
                </p>
                <p>
                    We talk about community, culture, work, land, economy, and innovation — and why solutions copied from somewhere else don’t always work here.
                </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#1DB954] text-black font-bold rounded-full hover:scale-105 transition-transform">
                    <Headphones size={18} /> Spotify
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                    <Mic size={18} /> Apple Podcasts
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-full hover:scale-105 transition-transform">
                    <Youtube size={18} /> YouTube
                </button>
            </div>
        </ScrollReveal>

        {/* Hero Visual - Album Art Parallax */}
        <motion.div style={{ y }} className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/5 group">
             <Image 
                src="https://storage.googleapis.com/sakura-web/Think-Loko-Cover.jpg" 
                alt="Think Loko Cover" 
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-60" />
             
             {/* Floating Player UI */}
             <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
                 <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Now Playing</span>
                     <div className="flex gap-1">
                         {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: `${i*0.2}s`}} />)}
                     </div>
                 </div>
                 <p className="text-white font-bold truncate">Stories that belong here.</p>
                 <p className="text-slate-400 text-sm">Hosted by Jumbe & Omary</p>
             </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedEpisode = () => (
    <section className="py-24 px-6 bg-[#080d1a] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-red-500 uppercase tracking-widest">Featured Story</span>
                </div>
                
                <div className="grid md:grid-cols-12 gap-12 items-center bg-[#0B1120] p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="md:col-span-7 space-y-8 relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            “When Solutions Arrive Before Listening”
                        </h2>
                        <p className="text-xl text-slate-400 leading-relaxed font-light">
                            A conversation with <strong>Asha Mwinyi from Bagamoyo</strong> — on community learning spaces, why imported education frameworks miss the lived reality of children here, and what happens when local knowledge leads the design of change.
                        </p>
                        
                        <div className="flex flex-wrap gap-6 pt-4">
                            <button className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                                <Play size={20} fill="currentColor" /> Play Episode
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all">
                                <Youtube size={20} /> Watch Video
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-5 relative flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-neutral-800 bg-neutral-900 flex items-center justify-center animate-[spin_10s_linear_infinite] shadow-2xl">
                             <div className="absolute inset-0 rounded-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                             {/* Vinyl Label */}
                             <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
                                 <div className="w-2 h-2 bg-black rounded-full" />
                             </div>
                        </div>
                        {/* Static Tone Arm Graphic could go here */}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const EpisodeArchive = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">Every Story Comes From Somewhere</h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
                        Think Loko is a living archive of conversations from across Tanzania — Dar es Salaam, Mwanza, Iringa, Zanzibar, Arusha, and beyond.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Farming Wisdom That Can’t Be Imported", guest: "Mzee Khalifa", tags: ["Agriculture", "Heritage"], color: "bg-amber-600" },
                    { title: "The Rhythm of Kariakoo Market", guest: "Mama Zuu", tags: ["Economy", "City Life"], color: "bg-red-600" },
                    { title: "Building With Soil & Memory", guest: "John K.", tags: ["Architecture", "Innovation"], color: "bg-emerald-600" },
                ].map((ep, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="group h-full p-8 bg-[#080d1a] border border-white/5 rounded-3xl hover:border-red-500/30 transition-all duration-500 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${ep.color}`}>
                                    Ep. 0{i + 1}
                                </div>
                                <div className="text-slate-500 text-xs font-mono">45 MIN</div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors leading-tight">
                                {ep.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-8 flex-grow">
                                A deep dive with {ep.guest} about local realities and the quiet intelligence found in ordinary work.
                            </p>
                            
                            <div className="flex gap-2 mb-8">
                                {ep.tags.map(tag => (
                                    <span key={tag} className="text-[10px] border border-white/10 px-2 py-1 rounded text-slate-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-white/5">
                                <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-red-500 transition-colors">
                                    <Play size={16} /> Listen
                                </button>
                                <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
                                    <Youtube size={16} /> Watch
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Philosophy = () => (
    <section className="py-32 px-6 bg-[#080d1a] border-y border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
            <ScrollReveal>
                <div className="mb-12">
                     <span className="text-red-500 font-mono text-xs uppercase tracking-widest">Manifesto</span>
                     <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-8">Why Think Loko Exists</h2>
                </div>
                
                <div className="space-y-8 text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
                    <p>Because context matters.</p>
                    <p>Because development templates don’t understand culture.</p>
                    <p>Because spreadsheets can’t measure <span className="text-red-400">memory, language, rhythm, or struggle.</span></p>
                    <p>We don’t romanticise hardship. We don’t simplify complexity. We listen.</p>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const Hosts = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-6xl mx-auto">
             <ScrollReveal>
                <h2 className="text-3xl font-bold text-white mb-16 text-center">Your Hosts</h2>
             </ScrollReveal>
             
             <div className="grid md:grid-cols-2 gap-12">
                 {[
                     { 
                         name: "Jumbe", 
                         role: "Storyteller & Researcher", 
                         desc: "Exploring how people, cities, and informal economies shape daily life in Tanzania. Driven by grounded thinking and local imagination."
                     },
                     { 
                         name: "Omary", 
                         role: "Observer of Systems", 
                         desc: "Fascinated by community wisdom, shared experience, and the quiet intelligence found in ordinary work and everyday spaces."
                     }
                 ].map((host, i) => (
                     <ScrollReveal key={i}>
                         <div className="flex gap-6 items-start">
                             <div className="w-20 h-20 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0">
                                 <User className="text-slate-600" />
                             </div>
                             <div>
                                 <h3 className="text-2xl font-bold text-white">{host.name}</h3>
                                 <p className="text-red-500 text-xs uppercase tracking-widest mb-4">{host.role}</p>
                                 <p className="text-slate-400 leading-relaxed">{host.desc}</p>
                             </div>
                         </div>
                     </ScrollReveal>
                 ))}
             </div>
        </div>
    </section>
);

const Invitation = () => (
    <section className="py-24 px-6 bg-gradient-to-b from-[#0B1120] to-[#1c0808]">
        <div className="max-w-4xl mx-auto bg-[#080d1a] border border-red-500/20 p-12 md:p-16 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]" />
            
            <ScrollReveal>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Do You Carry a Story?</h2>
                    <p className="text-slate-400 text-lg">
                        If your story comes from lived reality, not from a template — we’d love to listen.
                    </p>
                </div>

                <form className="space-y-6 max-w-lg mx-auto">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-500">Name</label>
                        <input className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition-colors" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                         <label className="text-xs font-bold uppercase text-slate-500">Why This Story Matters</label>
                         <textarea rows={4} className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition-colors" placeholder="Tell us briefly..." />
                    </div>
                    <button className="w-full bg-red-600 text-white font-bold py-5 rounded-xl hover:bg-red-500 transition-all duration-300 text-lg flex items-center justify-center gap-2">
                        <Send size={18} /> Request Guest Session
                    </button>
                    <p className="text-center text-xs text-slate-600">Every story is handled with respect and care.</p>
                </form>
            </ScrollReveal>
        </div>
    </section>
);

const QuoteStrip = () => (
    <section className="py-24 px-6 bg-[#0B1120] text-center">
        <ScrollReveal>
            <div className="max-w-4xl mx-auto">
                <p className="text-2xl md:text-4xl text-white font-serif italic leading-relaxed">
                    “You can’t plan a community using a map made by someone who has never walked its streets.”
                </p>
            </div>
        </ScrollReveal>
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
            <GlobalNavbar />
            <Hero />
            <FeaturedEpisode />
            <EpisodeArchive />
            <Philosophy />
            <QuoteStrip />
            <Hosts />
            <Invitation />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
