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
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap, 
  Layout, 
  FileText,
  Search,
  CheckCircle2,
  BarChart3,
  Lightbulb
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- SHARED COMPONENTS ---

// Spotlight Card for Capabilities
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
              rgba(255, 77, 0, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// Scroll Reveal Wrapper
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

// --- SUB NAVIGATION ---
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
                ${link === 'Strategy' ? 'text-orange-500' : 'text-white/40 hover:text-white'}`}
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
    <section className="relative min-h-[80vh] flex items-center px-6 pt-32 bg-[#050505] overflow-hidden">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity }}>
          <span className="inline-block py-1 px-3 border border-orange-500/30 bg-orange-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-orange-500 mb-8">
            Consulting & Advisory
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-4xl">
            DIRECTION <br/>
            BEFORE <span className="text-slate-500">EXECUTION.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              We help organizations define positioning, audience insight, messaging, and growth priorities so every campaign delivers measurable impact.
              <span className="block mt-4 text-white font-medium">Clarity first. Creativity second.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all rounded-sm text-center">
                Book Strategy Workshop
              </Link>
              <Link href="#" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <FileText size={14} /> Capability Deck
              </Link>
            </div>
          </div>
          
          <p className="mt-8 text-[10px] font-mono uppercase text-slate-600 tracking-widest">
            No obligation • Free discovery call
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const WhoIsThisFor = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-black">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12">Who This Is For</h2>
      </ScrollReveal>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: <Target />, label: "Banks & Finance" },
          { icon: <Users />, label: "NGOs & Dev" },
          { icon: <Zap />, label: "Tech Startups" },
          { icon: <Layout />, label: "Public Sector" },
          { icon: <Globe />, label: "Telecoms" },
          { icon: <TrendingUp />, label: "Growth Corps" },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-6 border border-white/5 bg-[#0a0a0a] rounded-sm hover:border-orange-500/30 hover:bg-white/5 transition-all group cursor-default text-center h-full flex flex-col items-center justify-center gap-4">
              <div className="text-slate-500 group-hover:text-orange-500 transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white">{item.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Capabilities = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">WHAT WE DELIVER</h2>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Tangible frameworks. We don't deliver "ideas"; we deliver roadmaps that engineering, marketing, and sales teams can execute on.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Brand Strategy",
            items: ["Positioning & Value Prop", "Audience Segmentation", "Brand Architecture", "Portfolio Alignment"]
          },
          {
            title: "Content Strategy",
            items: ["Messaging Frameworks", "Tone of Voice Guides", "Channel Ecosystem Design", "Narrative Blueprints"]
          },
          {
            title: "Marketing Strategy",
            items: ["Go-to-Market Playbooks", "Campaign Roadmaps", "Growth Modelling", "Retention Frameworks"]
          },
          {
            title: "Social & Media",
            items: ["Content Pillars", "Engagement Playbooks", "Multi-channel Mix", "Budget Allocation"]
          }
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-10 h-full bg-[#0a0a0a]">
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-wide border-b border-white/10 pb-4">
                {cap.title}
              </h3>
              <ul className="space-y-4">
                {cap.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-400 group-hover:text-slate-200 transition-colors">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ProcessTimeline = () => (
  <section className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-black text-white mb-16 text-center">THE PROCESS</h2>
      </ScrollReveal>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10" />
        
        <div className="grid md:grid-cols-4 gap-12 relative z-10">
          {[
            { step: "01", title: "Discovery", desc: "Brand audit, stakeholder interviews, competitor landscape." },
            { step: "02", title: "Direction", desc: "Positioning, messaging platform, opportunity mapping." },
            { step: "03", title: "Validation", desc: "Workshops, leadership alignment, implementation readiness." },
            { step: "04", title: "Roadmap", desc: "Campaign blueprint, milestones, rollout governance." },
          ].map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.2}>
              <div className="group">
                <div className="w-24 h-24 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center text-3xl font-black text-slate-700 group-hover:text-orange-500 group-hover:border-orange-500 transition-all mb-8 relative z-10">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 uppercase">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Outcomes = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        "Reduced marketing waste via clarity",
        "Unified voice across all departments",
        "Faster decision making at leadership level",
        "Campaigns that perform due to insight"
      ].map((outcome, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="p-8 border border-white/5 bg-white/[0.02] h-full flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
            <CheckCircle2 className="text-orange-500 mb-6" size={32} />
            <p className="text-lg font-medium text-slate-300 leading-snug">{outcome}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const CaseTeasers = () => (
  <section className="py-32 px-6 bg-black">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12">Recent Strategy Work</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal>
          <div className="group cursor-pointer">
            <div className="aspect-video bg-[#111] border border-white/10 relative overflow-hidden mb-6">
              {/* Placeholder for Case Study Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-black text-white uppercase mb-2">CRDB Bank</h3>
                <span className="text-xs font-mono text-orange-500 uppercase tracking-widest">Digital Experience Strategy</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md group-hover:text-white transition-colors">
              Defined customer journey frameworks that shaped the next generation of SimBanking communication.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="group cursor-pointer">
            <div className="aspect-video bg-[#111] border border-white/10 relative overflow-hidden mb-6">
              {/* Placeholder for Case Study Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-black text-white uppercase mb-2">Tigo Tanzania</h3>
                <span className="text-xs font-mono text-orange-500 uppercase tracking-widest">Market Positioning</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md group-hover:text-white transition-colors">
              Repositioned messaging pillars to align with youth digital economy behavior and 4G adoption.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-orange-600 text-black text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply" />
    
    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.85] tracking-tighter">
          STOP GUESSING.<br/>START LEADING.
        </h2>
        <p className="text-xl font-medium mb-12 max-w-2xl mx-auto opacity-80">
          We’ll review your goals, challenges, and market context — then recommend a roadmap tailored for your organization.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-black text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:scale-105 transition-transform shadow-2xl">
            Book Strategy Session
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-black/20 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-black/5 transition-colors">
            Talk to a Strategist
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyStrategyPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black font-sans">
      <GlobalNavbar />
      <AgencySubNav />
      
      <Hero />
      <WhoIsThisFor />
      <Capabilities />
      <ProcessTimeline />
      <Outcomes />
      <CaseTeasers />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}