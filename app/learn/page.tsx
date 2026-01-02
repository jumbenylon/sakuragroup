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
  BookOpen, Users, Sparkles, GraduationCap, 
  Palette, TrendingUp, Code, Coffee, 
  ArrowRight, PlayCircle, MessageSquare, Lightbulb 
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED COMPONENTS ---

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

const CourseCard = ({ title, cat, icon: Icon, delay = 0 }: { title: string, cat: string, icon: any, delay?: number }) => (
    <ScrollReveal delay={delay}>
        <div className="group relative bg-[#1e293b] border border-white/5 p-8 rounded-3xl hover:border-citron-500/50 transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-citron-500/5 rounded-full blur-2xl group-hover:bg-citron-500/10 transition-colors" />
            <div className="w-12 h-12 bg-citron-500/10 rounded-2xl flex items-center justify-center text-citron-400 mb-6 group-hover:scale-110 transition-transform">
                <Icon size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block">{cat}</span>
            <h3 className="text-xl font-bold text-white leading-tight mb-6 group-hover:text-citron-400 transition-colors">{title}</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-white/40 group-hover:text-white transition-colors">
                Explore Path <ArrowRight size={14} />
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
             <span className="text-xs font-bold text-citron-400 uppercase tracking-widest">Learning for the Real World</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            Learn From The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-citron-300 to-citron-600">
                People Who Do.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-lg mb-12">
             Practical knowledge from Tanzania’s creatives, founders, and problem solvers — for people who want skills that actually work in real life.
          </p>
             
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-5 bg-citron-500 text-[#0f172a] font-black text-lg rounded-2xl hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(190,242,100,0.2)]">
                Explore Courses
            </button>
            <button className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-bold rounded-2xl transition-all">
                Become a Tutor
            </button>
          </div>
          
          <p className="mt-8 text-xs text-slate-500 font-mono italic">
            Learning shaped by experience — not just theory.
          </p>
        </ScrollReveal>

        <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden border border-white/10 rotate-3 shadow-2xl">
                <Image 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000" 
                    alt="Collaborative learning" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
            {/* Floating UI Elements */}
            <motion.div 
                animate={{ y: [0, -20, 0] }} 
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4"
            >
                <div className="w-12 h-12 bg-citron-100 rounded-full flex items-center justify-center text-citron-600">
                    <PlayCircle size={24} />
                </div>
                <div>
                    <div className="text-[10px] text-slate-400 font-black uppercase">Live Workshop</div>
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
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
                    Smartest lessons don't only <br />
                    <span className="text-citron-500 font-serif italic">come from classrooms.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-16">
                    Powerful knowledge lives in studios, construction sites, agencies, and street markets. 
                    Xhule brings that wisdom to you — directly from people who have built something real.
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                    {[
                        "Practical Skills",
                        "Local Context",
                        "Industry Voices",
                        "Shared Growth"
                    ].map((p, i) => (
                        <div key={i} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white uppercase tracking-widest">
                            {p}
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const CourseGrid = () => (
    <section className="py-32 px-6 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-20">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-6xl font-black text-white">Skills for <br/>Today's Economy.</h2>
                </ScrollReveal>
                <button className="hidden md:flex items-center gap-2 text-citron-500 font-black hover:text-white transition-colors">
                    View All Paths <ArrowRight size={20} />
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CourseCard title="Brand Identity & Content Creation" cat="Creative & Design" icon={Palette} delay={0.1} />
                <CourseCard title="SME Marketing & Digital Growth" cat="Marketing" icon={TrendingUp} delay={0.2} />
                <CourseCard title="No-Code Web & UX Workflows" cat="Digital" icon={Code} delay={0.3} />
                <CourseCard title="Professional Pitching & Pricing" cat="Freelance" icon={MessageSquare} delay={0.4} />
                <CourseCard title="Street Wisdom & Hustle Etiquette" cat="Entrepreneurship" icon={Coffee} delay={0.5} />
                <CourseCard title="Visual Aesthetics for Social" cat="Photography" icon={Sparkles} delay={0.6} />
            </div>
        </div>
    </section>
);

const Philosophy = () => (
    <section className="py-32 px-6 bg-[#bef264]">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <Lightbulb size={48} className="text-[#0f172a] mx-auto mb-8" />
                <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-8 leading-tight">
                    Learning that respects reality.
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                    {[
                        { t: "Context Matters", d: "We teach with Tanzanian realities in mind." },
                        { t: "Clarity Over Complexity", d: "Simple language, practical steps." },
                        { t: "Progress Over Perfection", d: "Growth happens gradually." },
                        { t: "Community First", d: "We learn better together." },
                    ].map((p, i) => (
                        <div key={i} className="p-8 bg-[#0f172a] rounded-[2rem]">
                            <h3 className="text-citron-500 font-black mb-2 uppercase tracking-widest text-sm">{p.t}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{p.d}</p>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const TutorCTA = () => (
    <section className="py-32 px-6 bg-[#0f172a] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                    If you’ve learned it the hard way — <span className="text-citron-500">share it.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-12">
                    We value lived experience as much as formal expertise. Reach engaged learners and share your journey.
                </p>
                <button className="px-10 py-5 bg-white text-black font-black text-lg rounded-2xl hover:scale-105 transition-transform">
                    Apply to Teach on Xhule
                </button>
            </ScrollReveal>
            
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Community Growth", icon: Users },
                    { label: "Earn Rewards", icon: TrendingUp },
                    { label: "Build Credibility", icon: ShieldCheck },
                    { label: "Global Reach", icon: BookOpen },
                ].map((f, i) => (
                    <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                        <f.icon className="text-citron-500 mb-4" size={24} />
                        <span className="text-white font-bold text-xs uppercase tracking-widest">{f.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-40 px-6 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Start moving forward.</h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                    Building a skill or growing a career? Xhule gives you learning that feels real, relevant, and alive.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="px-12 py-6 bg-citron-500 text-[#0f172a] font-black text-xl rounded-2xl hover:scale-110 transition-transform">
                        Explore Courses
                    </button>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

export default function XhulePage() {
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
            <CourseGrid />
            <Philosophy />
            <TutorCTA />
            <CTA />
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
                className="font-mono text-xs text-citron-500 uppercase tracking-widest"
             >
                Loading Practical Knowledge...
             </motion.p>
        </div>
    </motion.div>
);
