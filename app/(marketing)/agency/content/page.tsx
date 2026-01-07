"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import { 
  ArrowRight, 
  Video, 
  Mic, 
  Image as ImageIcon, 
  PenTool, 
  Layers, 
  CalendarDays,
  Zap,
  Heart,
  MousePointer2,
  Clapperboard,
  Aperture
} from "lucide-react";


// --- SHARED COMPONENTS ---

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
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(225, 29, 72, 0.15), 
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AgencySubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    "Overview", "Strategy", "Branding", "Design", 
    "Content", "Digital", "Advertising", "Tech", "Research"
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-black/80 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {links.map((link) => (
            <Link 
              key={link} 
              href={`/agency/${link.toLowerCase() === 'overview' ? '' : link.toLowerCase()}`} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link === 'Content' ? 'text-rose-500' : 'text-white/40 hover:text-white'}`}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#050505] overflow-hidden">
      {/* 1. Add Image Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop"
          alt="Cinematic Content Production"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-rose-900/20 blur-[150px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity, y }}>
          <span className="inline-block py-1 px-3 border border-rose-500/30 bg-rose-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-rose-400 mb-8">
            Production & Storytelling
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            STORYTELLING<br/>
            WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-600">PURPOSE.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              We create storytelling assets — video, photography, brand messaging, and campaign content — built to inspire and connect.
              <span className="block mt-4 text-white font-medium">Emotion + Clarity + Strategy.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all rounded-sm text-center">
                Start Content Project
              </Link>
              <Link href="#work" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <Clapperboard size={14} /> View Showreel
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Positioning = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-black relative overflow-hidden">
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <ScrollReveal>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
          Not noise. <span className="text-rose-500 italic">Narrative.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          We don’t produce random posts or generic visuals. We craft stories with meaning, identity, and strategic intention.
          Content that speaks like a human, feels like a story, and lives where people actually are.
        </p>
      </ScrollReveal>
    </div>
  </section>
);

const Capabilities = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-20">
          <h2 className="text-4xl font-black text-white mb-6">PRODUCTION SUITE</h2>
          <p className="text-slate-400">End-to-end creation for the digital age.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Video Production", desc: "Campaign films, explainers, reels, docs.", icon: Video },
          { title: "Photography", desc: "Brand shoots, lifestyle, product, portrait.", icon: Aperture },
          { title: "Copywriting", desc: "Scripts, taglines, messaging, articles.", icon: PenTool },
          { title: "Social Content", desc: "Short-form clips, UGC-style, motion graphics.", icon: Layers },
          { title: "Brand Voice", desc: "Tone guidelines & narrative frameworks.", icon: Mic },
          { title: "Content Systems", desc: "Calendars, publishing flows, asset management.", icon: CalendarDays },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-rose-500 group-hover:bg-rose-500/10 transition-colors">
                <cap.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">
                {cap.desc}
              </p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ImpactPillars = () => (
  <section className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { 
            title: "Awareness", 
            icon: <Zap className="text-yellow-500" size={32} />,
            desc: "Make people notice & remember you. Story-led campaigns and emotional visuals."
          },
          { 
            title: "Engagement", 
            icon: <Heart className="text-rose-500" size={32} />,
            desc: "Turn audiences into communities. Educational content and conversation starters."
          },
          { 
            title: "Conversion", 
            icon: <MousePointer2 className="text-emerald-500" size={32} />,
            desc: "Content that leads to action. Product explainers and value-prop storytelling."
          },
        ].map((pillar, i) => (
          <ScrollReveal key={i} delay={i * 0.2}>
            <div className="group">
              <div className="mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">{pillar.icon}</div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 group-hover:underline decoration-rose-500 underline-offset-8 transition-all">{pillar.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section id="work" className="py-32 px-0 bg-[#050505] overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Visual Atmosphere</h2>
      </ScrollReveal>
    </div>

    {/* Film Strip Effect */}
    <div className="flex gap-4 overflow-x-auto pb-12 px-6 snap-x scrollbar-hide">
      {[
        { label: "Campaign Visuals", color: "bg-neutral-800" },
        { label: "Lifestyle Photography", color: "bg-neutral-900" },
        { label: "Motion Reels", color: "bg-neutral-800" },
        { label: "Documentary Style", color: "bg-neutral-900" },
        { label: "Studio Portraits", color: "bg-neutral-800" },
      ].map((item, i) => (
        <motion.div 
          key={i} 
          className={`shrink-0 w-[300px] md:w-[400px] aspect-[4/5] ${item.color} border border-white/10 relative group overflow-hidden`}
          whileHover={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-6 left-6">
            <span className="text-[10px] font-mono text-rose-500 uppercase mb-2 block">Frame 0{i+1}</span>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">{item.label}</h3>
          </div>
          
          {/* Film Perforations (Visual Flair) */}
          <div className="absolute top-0 bottom-0 left-2 w-2 flex flex-col justify-between py-2 opacity-20">
             {[...Array(10)].map((_, j) => <div key={j} className="w-1.5 h-3 bg-white rounded-sm" />)}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-black border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Production Workflow</h2>
      </ScrollReveal>

      <div className="space-y-8 relative">
        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10 md:left-1/2" />
        
        {[
          { step: "01", title: "Discovery", desc: "Audience, purpose, cultural context." },
          { step: "02", title: "Concept", desc: "Themes, tone, message framework." },
          { step: "03", title: "Production", desc: "Shoot, script, edit, refine." },
          { step: "04", title: "Delivery", desc: "Platform formatting & rollout support." },
          { step: "05", title: "Iteration", desc: "Performance tracking & optimization." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="hidden md:block w-1/2" />
              
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-14 h-14 bg-black border border-white/20 rounded-full flex items-center justify-center z-10 text-slate-500 font-mono text-sm group-hover:border-rose-500 group-hover:text-rose-500 transition-colors">
                {s.step}
              </div>
              
              <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-12 py-4">
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0e0e0e] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          TELL STORIES<br/>THAT MATTER.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Let’s create meaningful content that builds connection — not noise.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-rose-600 hover:text-white transition-all shadow-2xl">
            Start Content Project
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Talk to Creative Team
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyContentPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-rose-500 selection:text-white font-sans">
      
      <AgencySubNav />
      
      <Hero />
      <Positioning />
      <Capabilities />
      <ImpactPillars />
      <Gallery />
      <Process />
      <CTA />
      
      
    </main>
  );
}
