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
  BookOpen, Users, Sparkles, Palette, 
  TrendingUp, Code, Coffee, ArrowRight, 
  PlayCircle, MessageSquare, Lightbulb, 
  Layers, Globe, Star, ShieldCheck 
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED UNBOUND COMPONENTS ---

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const CourseCard = ({ title, desc, icon: Icon, delay = 0 }: { title: string, desc: string, icon: any, delay?: number }) => (
    <ScrollReveal delay={delay}>
        <div className="group relative bg-[#1e293b] border border-white/5 p-8 rounded-3xl hover:border-citron-500/50 transition-all duration-500 cursor-pointer h-full flex flex-col">
            <div className="w-12 h-12 bg-citron-500/10 rounded-2xl flex items-center justify-center text-citron-400 mb-6 group-hover:scale-110 transition-transform">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-citron-400 transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{desc}</p>
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                Explore Learning Path <ArrowRight size={14} />
            </div>
        </div>
    </ScrollReveal>
);

// --- 2. PAGE SECTIONS ---

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#0f172a]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-citron-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-citron-500/10 border border-citron-500/20 rounded-full mb-8">
             <Sparkles className="text-citron-500" size={14} />
             <span className="text-xs font-bold text-citron-400 uppercase tracking-widest">Learn From The Work</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            Skills For The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-citron-300 to-citron-600">
                Real World.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-lg mb-12 font-light">
             Practical knowledge from Tanzania’s creatives, founders, and problem solvers — for people who want skills that actually work in real life.
          </p>
             
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/learn/courses" className="px-10 py-5 bg-citron-500 text-[#0f172a] font-black text-lg rounded-2xl hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(190,242,100,0.2)] flex items-center gap-2">
                Explore Courses <ArrowRight size={20} />
            </Link>
            <Link href="/learn/become-a-tutor" className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-bold rounded-2xl transition-all">
                Become a Tutor
            </Link>
          </div>
        </ScrollReveal>

        <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden border border-white/10 rotate-3 shadow-2xl group">
                <Image 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" 
                    alt="Collaborative learning" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
            {/* Floating Interaction UI */}
            <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4"
            >
                <div className="w-12 h-12 bg-citron-100 rounded-full flex items-center justify-center text-citron-600">
                    <PlayCircle size={24} />
                </div>
                <div>
                    <div className="text-[10px] text-slate-400 font-black uppercase">Live Session</div>
                    <div className="text-sm font-bold text-slate-900">Brand Storytelling</div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhyXhule = () => (
    <section className="py-32 px-6 bg-[#0f172a] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                    Smartest lessons don't only <br />
                    <span className="text-citron-500 font-serif italic">come from classrooms.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                    Textbooks are theoretical. Xhule is lived. We bring wisdom from studios, construction sites, and street innovators into one place.
                </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Community Growth", icon: Users },
                    { label: "Earn Rewards", icon: TrendingUp },
                    { label: "Build Credibility", icon: ShieldCheck },
                    { label: "Global Reach", icon: BookOpen },
                ].map((f, i) => (
                    <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl group hover:border-citron-500/30 transition-colors">
                        <f.icon className="text-citron-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
                        <span className="text-white font-bold text-xs uppercase tracking-widest">{f.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Tracks = () => (
    <section className="py-32 px-6 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">LEARNING TRACKS.</h2>
                    <p className="text-xl text-slate-400 max-w-2xl font-light">
                        Skills for today’s economy, creativity, and the digital world.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
                <CourseCard 
                    title="Design & Branding" 
                    desc="Identity, product visuals, motion, typography, and creative workflows." 
                    icon={Layers} 
                    delay={0.1} 
                />
                <CourseCard 
                    title="Marketing & Growth" 
                    desc="Digital strategy, campaigns, content, analytics, and brand positioning." 
                    icon={Globe} 
                    delay={0.2} 
                />
                <CourseCard 
                    title="Web & Technology" 
                    desc="Web dev, tools, automation, CMS, product thinking and platforms." 
                    icon={Star} 
                    delay={0.3} 
                />
            </div>
        </div>
    </section>
);

const TutorOnboarding = () => (
    <section className="py-32 px-6 bg-[#bef264]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border-8 border-[#0f172a] shadow-2xl">
                    <Image 
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200" 
                        alt="Tutor session" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="text-[#0f172a]">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">SHARE WHAT <br/>YOU KNOW.</h2>
                    <p className="text-[#0f172a]/80 text-lg mb-8 font-medium">
                        If you’ve learned it the hard way — someone else deserves to learn it easier. Join Xhule as a contributor.
                    </p>
                    <ul className="space-y-4 mb-10">
                        {[
                            "Create short courses or micro-lessons",
                            "Reach learners across the ecosystem",
                            "Earn rewards and collaboration ops"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 font-bold text-sm uppercase tracking-wider">
                                <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-full" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Link href="/learn/become-a-tutor" className="inline-flex px-10 py-5 bg-[#0f172a] text-white font-black rounded-2xl hover:scale-105 transition-all">
                        Start Onboarding
                    </Link>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const FinalCTA = () => (
    <section className="py-40 px-6 bg-[#0f172a] text-center border-t border-white/5">
        <ScrollReveal>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter">
                START MOVING <br/>FORWARD.
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
                Learning shaped by experience, shared for everyone. Built for Tanzania. Ready for the world.
            </p>
            <Link href="/learn/courses" className="px-12 py-6 bg-citron-500 text-[#0f172a] font-black text-xl rounded-2xl hover:scale-110 transition-all shadow-2xl flex-inline items-center gap-3">
                Explore Courses <PlayCircle size={24} />
            </Link>
        </ScrollReveal>
    </section>
);

export default function LearnPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white selection:bg-citron-500 selection:text-[#0f172a]">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <WhyXhule />
            <Tracks />
            <TutorOnboarding />
            <FinalCTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#0f172a] flex items-center justify-center"
    >
        <div className="text-center">
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-citron-500/20 border-t-citron-500 rounded-full mx-auto mb-6"
             />
             <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] text-citron-500 uppercase tracking-widest"
             >
                Loading Practical Knowledge...
             </motion.p>
        </div>
    </motion.div>
);
