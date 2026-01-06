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
  PenTool, 
  Grid, 
  Type, 
  BookOpen, 
  Layers, 
  Palette,
  CheckCircle2,
  XCircle,
  Hash,
  Monitor
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
              rgba(124, 58, 237, 0.15), 
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
                ${link === 'Branding' ? 'text-purple-500' : 'text-white/40 hover:text-white'}`}
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

  return (
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#050505] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-black" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity }}>
          <span className="inline-block py-1 px-3 border border-purple-500/30 bg-purple-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-purple-400 mb-8">
            Identity Systems & Architecture
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            IDENTITY AS<br/>
            COMPETITIVE <span className="text-slate-500">ADVANTAGE.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              We create identity systems that align leadership, inspire teams, and resonate with customers across every channel.
              <span className="block mt-4 text-white font-medium">Enterprise-grade identity for African organizations.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-purple-600 hover:text-white transition-all rounded-sm text-center">
                Start Branding Project
              </Link>
              <Link href="#work" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <Grid size={14} /> See Identity Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Education = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-black">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">More than a logo.</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Branding is how your organization is understood. We design systems that strengthen recognition, 
          meaning, and consistency across every communication touchpoint.
        </p>
      </ScrollReveal>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Positioning", desc: "Clear market stance and message coherence." },
        { title: "Consistency", desc: "Unified visuals across teams and channels." },
        { title: "Credibility", desc: "Professional perception that builds trust." },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="text-center p-6 border border-white/5 bg-[#0a0a0a] rounded-sm">
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
          <p className="text-slate-400">Building blocks of a dominant brand.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Logo & Marks", desc: "Timeless, scalable symbols for digital & print.", icon: PenTool },
          { title: "Identity Systems", desc: "Typography, color, layout & UI alignment.", icon: Grid },
          { title: "Naming", desc: "Name development & tone of voice systems.", icon: Type },
          { title: "Guidelines", desc: "Brand books, governance & asset libraries.", icon: BookOpen },
          { title: "Workshops", desc: "Vision, culture & values alignment.", icon: Layers },
          { title: "Sub-Brands", desc: "Product tiers & portfolio architecture.", icon: Palette },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-purple-500 group-hover:bg-purple-500/10 transition-colors">
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

const Transformation = () => (
  <section className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-3xl font-black text-white text-center mb-16 uppercase tracking-widest">
          The ROI of Clarity
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
        
        {/* BEFORE */}
        <div className="bg-[#0a0a0a] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <XCircle size={100} className="text-red-500" />
          </div>
          <h3 className="text-red-500 font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
            <XCircle size={18} /> Before
          </h3>
          <ul className="space-y-6">
            {["Inconsistent Visuals", "Mixed Messaging", "Fragmented Perception", "Opinion-based Decisions"].map((item, i) => (
              <li key={i} className="text-slate-500 text-lg font-light flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-red-900 rounded-full" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* AFTER */}
        <div className="bg-[#0f0f0f] p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 size={100} className="text-emerald-500" />
          </div>
          <h3 className="text-emerald-500 font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
            <CheckCircle2 size={18} /> After
          </h3>
          <ul className="space-y-6">
            {["Cohesive Language", "Clear Story & Meaning", "Strong Market Position", "Aligned Teams"].map((item, i) => (
              <li key={i} className="text-white text-lg font-medium flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12">The Method</h2>
      </ScrollReveal>

      <div className="space-y-4">
        {[
          { step: "01", title: "Discovery", desc: "Audit, interviews, culture mapping." },
          { step: "02", title: "Direction", desc: "Positioning options, mood worlds." },
          { step: "03", title: "Exploration", desc: "Concept platforms & identity routes." },
          { step: "04", title: "Refinement", desc: "Validation, iteration, stress-testing." },
          { step: "05", title: "Systemisation", desc: "Guidelines, asset library, rollout." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="group flex items-center justify-between p-8 border border-white/5 bg-[#0a0a0a] hover:bg-white/5 transition-all cursor-default">
              <div className="flex items-center gap-8">
                <span className="text-2xl font-black text-white/20 font-mono group-hover:text-purple-500 transition-colors">{s.step}</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">{s.title}</h3>
              </div>
              <p className="text-sm text-slate-500 text-right hidden md:block">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const WorkExcerpts = () => (
  <section id="work" className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-black text-white mb-12">RECENT IDENTITIES</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { client: "Fintech Startup", label: "Identity System", color: "bg-blue-900" },
          { client: "Education Platform", label: "Rebrand & Voice", color: "bg-orange-900" },
          { client: "Public Sector", label: "Visual Language", color: "bg-emerald-900" },
        ].map((work, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className={`aspect-square ${work.color} relative overflow-hidden mb-6 border border-white/10 rounded-sm`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                   <Hash size={48} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-500 transition-colors">{work.client}</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{work.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ImplementationBridge = () => (
  <section className="py-24 px-6 bg-[#0a0a0a] border-t border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <div className="inline-block p-4 border border-white/10 rounded-full mb-6">
          <Monitor className="text-slate-400" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Branding doesn’t end at design.</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          We help you activate your new system with social templates, UI alignment, and internal rollout playbooks.
        </p>
        <Link href="/agency/design" className="text-purple-500 font-bold uppercase text-xs tracking-widest border-b border-purple-500/30 pb-1 hover:text-white hover:border-white transition-colors">
          Move to Design & Execution →
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0e0e0e] text-center border-t border-white/10">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          FUTURE-PROOF<br/>YOUR IDENTITY.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Let’s create a brand system designed for growth, clarity, and long-term value.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-purple-600 hover:text-white transition-all shadow-2xl">
            Start Brand Project
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Talk to a Strategist
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyBrandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white font-sans">
      
      <AgencySubNav />
      
      <Hero />
      <Education />
      <Capabilities />
      <Transformation />
      <Process />
      <WorkExcerpts />
      <ImplementationBridge />
      <CTA />
      
      
    </main>
  );
}