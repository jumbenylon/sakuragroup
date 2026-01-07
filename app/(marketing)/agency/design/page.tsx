"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  Layout, 
  Monitor, 
  BookOpen, 
  BarChart3, 
  Component, 
  PenTool, 
  Figma, 
  Layers, 
  Code,
  CheckCircle2,
  XCircle,
  Smartphone
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
              rgba(34, 211, 238, 0.15), 
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
                ${link === 'Design' ? 'text-cyan-400' : 'text-white/40 hover:text-white'}`}
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
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#050505] overflow-hidden">
      {/* 1. Add Image Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=2070&auto=format&fit=crop"
          alt="Geometric Design Structure"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-[#050505]/90" />
      </div>

      {/* Animated Blueprint Grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee10_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity, y }}>
          <span className="inline-block py-1 px-3 border border-cyan-500/30 bg-cyan-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-8">
            Visual Systems & UI/UX
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            DESIGN WITH<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">PURPOSE.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              We craft visual systems, interfaces, and communication assets that feel modern, usable, and aligned with your brand.
              <span className="block mt-4 text-white font-medium">Built for scale, accessibility, and real-world application.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 hover:text-black transition-all rounded-sm text-center">
                Start Design Project
              </Link>
              <Link href="#work" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <Layout size={14} /> See Design Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Philosophy = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-black">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Design isn’t decoration.</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          It’s how people understand, navigate, and trust your organization. Our approach combines visual clarity, 
          hierarchy, and consistency so every interaction feels intentional.
        </p>
      </ScrollReveal>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Clarity", desc: "Unmistakable visual hierarchy and flow." },
        { title: "Humanity", desc: "Content that is readable and empathetic." },
        { title: "Scalability", desc: "Systems built for internal teams to use." },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="text-center p-6 border border-white/5 bg-[#0a0a0a] rounded-sm hover:border-cyan-500/30 transition-colors">
            <h3 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">{item.title}</h3>
            <p className="text-slate-500 text-sm">{item.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const Capabilities = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-20">
          <h2 className="text-4xl font-black text-white mb-6">CAPABILITIES</h2>
          <p className="text-slate-400">From pixel-perfect UI to print systems.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Graphic Design", desc: "Reports, campaigns, product materials.", icon: PenTool },
          { title: "UI/UX Design", desc: "App UI, dashboards, portals, flows.", icon: Layout },
          { title: "Web Design", desc: "Responsive layouts, content structure.", icon: Monitor },
          { title: "Editorial", desc: "Annual reports, brochures, publications.", icon: BookOpen },
          { title: "Data Viz", desc: "Infographics & dashboard design.", icon: BarChart3 },
          { title: "Design Systems", desc: "Component libraries & UI kits.", icon: Component },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
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

const VisualGallery = () => (
  <section id="work" className="py-32 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12">Visual Systems in Action</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "UI System Layout", sub: "Grid & Spacing Structure", color: "bg-neutral-800" },
          { label: "Information Design", sub: "Service Diagrams", color: "bg-neutral-900" },
          { label: "Editorial & Print", sub: "Annual Reports", color: "bg-neutral-800" },
          { label: "Marketing Visuals", sub: "Campaign Assets", color: "bg-neutral-900" },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className={`aspect-[4/5] ${item.color} border border-white/5 p-6 flex flex-col justify-end group hover:border-cyan-500/50 transition-colors relative overflow-hidden`}>
              {/* Abstract Decorative Elements */}
              <div className="absolute top-6 left-6 right-6 bottom-32 opacity-20">
                 <div className="w-full h-full border border-dashed border-white/50 rounded-sm" />
                 <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full" />
                 <div className="absolute bottom-4 right-4 w-16 h-4 bg-white/20 rounded-sm" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-white font-bold mb-1 group-hover:text-cyan-400 transition-colors">{item.label}</h3>
                <p className="text-xs text-slate-500 font-mono uppercase">{item.sub}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Transformation = () => (
  <section className="py-32 px-6 bg-[#050505] border-y border-white/5">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl font-black text-white text-center mb-16 uppercase tracking-widest">
          The Clarity Shift
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
        
        {/* BEFORE (Chaos) */}
        <div className="bg-[#0a0a0a] p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
          {/* Abstract Chaos Visual */}
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-10 left-10 w-32 h-32 bg-white rotate-12" />
             <div className="absolute bottom-20 right-20 w-40 h-10 bg-white -rotate-6" />
             <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white rounded-full translate-x-10" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-red-500 font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
              <XCircle size={18} /> Before
            </h3>
            <ul className="space-y-4">
                <li className="text-slate-500 font-light">Unstructured & Dense</li>
                <li className="text-slate-500 font-light">Inconsistent Spacing</li>
                <li className="text-slate-500 font-light">Low Readability</li>
                <li className="text-slate-500 font-light">Decoration over Function</li>
            </ul>
          </div>
        </div>

        {/* AFTER (Order) */}
        <div className="bg-[#0f0f0f] p-12 relative overflow-hidden group flex flex-col justify-center min-h-[400px]">
          {/* Abstract Order Visual */}
          <div className="absolute inset-0 opacity-10">
             <div className="absolute top-12 left-12 right-12 h-px bg-cyan-400" />
             <div className="absolute top-24 left-12 right-12 h-px bg-cyan-400" />
             <div className="absolute top-36 left-12 right-12 h-px bg-cyan-400" />
             <div className="absolute top-12 bottom-12 left-1/2 w-px bg-cyan-400" />
          </div>

          <div className="relative z-10">
            <h3 className="text-cyan-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
              <CheckCircle2 size={18} /> After
            </h3>
            <ul className="space-y-4">
                <li className="text-white font-medium">Clean & Readable</li>
                <li className="text-white font-medium">Strict Grid Alignment</li>
                <li className="text-white font-medium">Clear Visual Hierarchy</li>
                <li className="text-white font-medium">Purpose-Driven Layout</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
);

const TechBridge = () => (
  <section className="py-24 px-6 bg-cyan-950/20 border-y border-cyan-500/20">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <div className="inline-block p-4 border border-cyan-500/30 bg-cyan-500/10 rounded-full mb-6">
          <Smartphone className="text-cyan-400" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Building a digital product?</h2>
        <p className="text-cyan-100/60 mb-8 max-w-xl mx-auto">
          We specialize in human-centered design for apps and platforms. Accessibility patterns, layout logic, and developer-friendly handoff.
        </p>
        <Link href="/agency/tech" className="text-cyan-400 font-bold uppercase text-xs tracking-widest border-b border-cyan-500/30 pb-1 hover:text-white hover:border-white transition-colors">
          Move to Technology & Web →
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Design Process</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-5 gap-4">
        {[
          { step: "01", title: "Audit", desc: "Content, users, constraints." },
          { step: "02", title: "Structure", desc: "Hierarchy, flow, wireframes." },
          { step: "03", title: "Explore", desc: "Visual direction, variants." },
          { step: "04", title: "Systemise", desc: "Components, grids, rules." },
          { step: "05", title: "Handoff", desc: "Assets, specs, dev-ready." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-6 border border-white/5 bg-[#0a0a0a] h-full hover:bg-white/5 transition-colors group border-t-2 border-t-transparent hover:border-t-cyan-400">
              <span className="text-xs font-mono text-cyan-500/50 mb-4 block">{s.step}</span>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0e0e0e] text-center">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          CLARITY IS<br/>POWER.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Let’s create interfaces and communication systems that feel modern, trustworthy, and meaningful.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-cyan-500 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-all shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]">
            Start Design Project
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Book Consultation
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyDesignPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      <AgencySubNav />
      
      <Hero />
      <Philosophy />
      <Capabilities />
      <VisualGallery />
      <Transformation />
      <TechBridge />
      <Process />
      <CTA />
      
      
    </main>
  );
}
