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
  Search, 
  Users, 
  MapPin, 
  Brain, 
  LineChart, 
  Eye, 
  MessageCircle, 
  Microscope,
  Lightbulb,
  FileText
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

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
      className={`relative border border-white/10 bg-stone-900/50 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.10), 
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
    "Content", "Digital", "CRM & Systems", "Advertising", "Tech", "Research"
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#0c0a09]/80 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {links.map((link) => (
            <Link 
              key={link} 
              href={`/agency/${link.toLowerCase().includes('crm') ? 'crm' : link.toLowerCase()}`} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link === 'Research' ? 'text-orange-400' : 'text-stone-400 hover:text-white'}`}
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
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#0c0a09] overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 bg-[#0c0a09]">
         {/* Warm / Human Glow */}
         <div className="absolute top-[-20%] right-[10%] w-[800px] h-[800px] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-stone-800/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         {/* Dot Matrix Pattern */}
         <div className="absolute inset-0 bg-[radial-gradient(#a8a29e15_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity, y }}>
          <span className="inline-flex items-center gap-2 py-1 px-3 border border-orange-500/20 bg-orange-900/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-orange-400 mb-8">
            <Microscope size={12} />
            Consumer Intelligence
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            DATA WITH<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-stone-200">HUMANITY.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-stone-400 font-light leading-relaxed">
              Research that reveals how people think, feel, decide — and buy. 
              We uncover insights that shape brands, products, and communications that truly connect with Tanzanians.
              <span className="block mt-4 text-white font-medium">Grounded in culture. Powered by data.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-stone-100 text-stone-900 font-bold text-xs uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-white transition-all rounded-sm text-center">
                Start Discovery Call
              </Link>
              <Link href="#methods" className="px-8 py-4 border border-white/10 text-stone-300 font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <FileText size={14} /> Capability Profile
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Positioning = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-[#0c0a09]">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">We don’t just collect data. We translate behavior.</h2>
        <p className="text-stone-400 text-lg leading-relaxed">
          Surveys tell you "what." We tell you "why." 
          We believe research should guide strategic decisions, not just decorate PowerPoint slides.
        </p>
      </ScrollReveal>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Culture > Stats", desc: "Context defines adoption. We look beyond the spreadsheet." },
        { title: "Human Centered", desc: "Understanding the person behind the 'user' label." },
        { title: "Decision Ready", desc: "Insights framed for leadership action, not academic theory." },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="text-center p-6 border border-white/5 bg-[#1c1917] rounded-sm hover:border-orange-500/20 transition-colors">
            <h3 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">{item.title}</h3>
            <p className="text-stone-500 text-sm">{item.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const Capabilities = () => (
  <section className="py-32 px-6 bg-[#0c0a09]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-20">
          <h2 className="text-4xl font-black text-white mb-6">INTELLIGENCE SUITE</h2>
          <p className="text-stone-400">Understanding the market from every angle.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Market Research", desc: "Market Mapping, Segmentation, Usage & Attitude Studies.", icon: LineChart },
          { title: "Brand Health", desc: "Perception Tracking, Campaign Testing, Message Resonance.", icon: Eye },
          { title: "Behavioral Insight", desc: "User Testing, Funnel Drop-off, Sentiment Mapping.", icon: Brain },
          { title: "Field Research", desc: "Focus Groups, Ethnography, In-Store Observation.", icon: MapPin },
          { title: "Product Intel", desc: "Pricing Validation, Feature Prioritization, Adoption Barriers.", icon: Lightbulb },
          { title: "Community", desc: "Rural, Urban, Youth & Regional Consumer Panels.", icon: Users },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#1c1917]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-stone-400 mb-6 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-colors">
                <cap.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                {cap.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed group-hover:text-stone-300 transition-colors">
                {cap.desc}
              </p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const TanzaniaContext = () => (
  <section className="py-32 px-6 bg-[#171514] border-y border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
      <div className="flex-1 space-y-8">
        <ScrollReveal>
          <div className="inline-block p-3 border border-orange-500/20 bg-orange-900/10 rounded-full mb-4">
            <MapPin className="text-orange-500" size={20} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Dar is not <br/>
            <span className="text-stone-500">Tanzania.</span>
          </h2>
          <p className="text-lg text-stone-400 leading-relaxed">
            Tanzania is diverse — urban, rural, coastal, inland, Swahili culture, and blended influences. 
            What works in Dar may fail in Mwanza. What resonates with Gen-Z rarely resonates with corporate decision-makers.
          </p>
          <p className="text-white font-medium">
            Good research respects reality. We test outside the bubble.
          </p>
        </ScrollReveal>
      </div>
      
      <div className="flex-1 w-full">
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-[#0c0a09] border border-white/5 rounded-sm">
              <span className="text-2xl font-bold text-white block mb-1">20+</span>
              <span className="text-xs text-stone-500 uppercase tracking-widest">Regions Covered</span>
            </div>
            <div className="p-6 bg-[#0c0a09] border border-white/5 rounded-sm">
              <span className="text-2xl font-bold text-white block mb-1">Swahili</span>
              <span className="text-xs text-stone-500 uppercase tracking-widest">Native Research</span>
            </div>
            <div className="p-6 bg-[#0c0a09] border border-white/5 rounded-sm">
              <span className="text-2xl font-bold text-white block mb-1">Urban</span>
              <span className="text-xs text-stone-500 uppercase tracking-widest">& Rural Panels</span>
            </div>
            <div className="p-6 bg-[#0c0a09] border border-white/5 rounded-sm">
              <span className="text-2xl font-bold text-white block mb-1">Offline</span>
              <span className="text-xs text-stone-500 uppercase tracking-widest">Field Capability</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const MethodsMatrix = () => (
  <section id="methods" className="py-32 px-6 bg-[#0c0a09]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-12">Methodology Toolkit</h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {[
          "Online Panels", "Focus Groups", "Depth Interviews", "Journey Mapping",
          "UX Testing", "Mystery Shopping", "Field Observation", "Data Mining",
          "Social Listening", "Sentiment Analysis", "Concept Testing", "Brand Tracking"
        ].map((method, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="p-8 bg-[#1c1917] hover:bg-[#292524] transition-colors h-full flex items-center justify-center text-center group cursor-default">
              <span className="text-sm font-medium text-stone-400 group-hover:text-orange-400 transition-colors">
                {method}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ROI = () => (
  <section className="py-32 px-6 bg-[#171514] border-t border-white/5">
    <div className="max-w-7xl mx-auto text-center">
      <ScrollReveal>
        <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-widest">Insight to Action</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { label: "Lower Risk", text: "Validate products before expensive launches." },
          { label: "Smarter Spend", text: "Target audiences that actually convert." },
          { label: "Clearer Message", text: "Speak the language your customer speaks." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-8 border border-white/5 rounded-full bg-[#0c0a09] mx-auto w-full max-w-xs hover:border-orange-500/30 transition-colors">
              <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
              <p className="text-stone-500 text-sm">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CaseSnapshots = () => (
  <section className="py-32 px-6 bg-[#0c0a09]">
    <div className="max-w-5xl mx-auto space-y-16">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-8">Recent Findings</h2>
      </ScrollReveal>

      {[
        { 
          sector: "Banking", 
          title: "Youth Account Adoption", 
          problem: "Low uptake despite high marketing spend.",
          insight: "Mistrust in 'hidden fees' & onboarding friction.",
          outcome: "Simplified messaging + digital-first process = +40% Signups." 
        },
        { 
          sector: "Telecom", 
          title: "Bundle Communication", 
          problem: "Confusion across customer segments.",
          insight: "Value perception differs drastically by region.",
          outcome: "Regionalized campaigns + vernacular scaling." 
        },
        { 
          sector: "NGO", 
          title: "Rural Engagement", 
          problem: "Program misunderstanding in field.",
          insight: "Cultural framing gap in educational materials.",
          outcome: "Redesigned visual aids rooted in local context." 
        }
      ].map((c, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="group border-l-2 border-white/10 pl-8 hover:border-orange-500 transition-colors">
            <span className="text-xs font-mono text-orange-500 uppercase mb-2 block">{c.sector}</span>
            <h3 className="text-2xl font-bold text-white mb-4">{c.title}</h3>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <span className="text-stone-500 block mb-1">Problem</span>
                <p className="text-stone-300">{c.problem}</p>
              </div>
              <div>
                <span className="text-stone-500 block mb-1">Insight</span>
                <p className="text-white font-medium">{c.insight}</p>
              </div>
              <div>
                <span className="text-stone-500 block mb-1">Outcome</span>
                <p className="text-stone-300">{c.outcome}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-[#171514] border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-16 text-center">Research Cycle</h2>
      </ScrollReveal>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative">
        {/* Line */}
        <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-white/10" />
        
        {[
          { step: "01", title: "Define", desc: "Align goals & decisions." },
          { step: "02", title: "Design", desc: "Method & sample plan." },
          { step: "03", title: "Fieldwork", desc: "Data collection." },
          { step: "04", title: "Synthesis", desc: "Pattern mapping." },
          { step: "05", title: "Strategy", desc: "Actionable report." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative z-10 w-full md:w-auto">
              <div className="w-12 h-12 bg-[#171514] border border-white/20 rounded-full flex items-center justify-center text-stone-500 font-mono text-sm mb-4 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-stone-500">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0c0a09] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
    
    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          DECIDE WITH<br/>CONFIDENCE.
        </h2>
        <p className="text-xl text-stone-400 mb-12 max-w-2xl mx-auto font-light">
          Insight is only useful when it drives action. Let’s uncover the truth about your market.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-stone-100 text-stone-900 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-orange-500 hover:text-white transition-all shadow-2xl">
            Start Discovery Call
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/10 text-stone-300 font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Download Profile
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyResearchPage() {
  return (
    <main className="min-h-screen bg-[#0c0a09] text-white selection:bg-orange-500 selection:text-white font-sans">
      <GlobalNavbar />
      <AgencySubNav />
      
      <Hero />
      <Positioning />
      <Capabilities />
      <TanzaniaContext />
      <MethodsMatrix />
      <CaseSnapshots />
      <ROI />
      <Process />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}