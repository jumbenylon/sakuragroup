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
  BarChart3, 
  Search, 
  Megaphone, 
  Mail, 
  ShoppingBag, 
  Share2, 
  LineChart, 
  Target, 
  Globe, 
  Users,
  Smartphone
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
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15), 
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
                ${link === 'Digital' ? 'text-indigo-500' : 'text-white/40 hover:text-white'}`}
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
      {/* Abstract Data Stream Background */}
      <div className="absolute inset-0 bg-black">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         {/* Grid Lines */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f110_1px,transparent_1px),linear-gradient(to_bottom,#6366f110_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity, y }}>
          <span className="inline-block py-1 px-3 border border-indigo-500/30 bg-indigo-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-indigo-400 mb-8">
            Growth & Performance
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            PERFORMANCE<br/>
            WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-orange-500">PURPOSE.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              We help brands grow awareness, engagement, and revenue through data-driven strategy and campaigns built for Tanzania’s digital landscape.
              <span className="block mt-4 text-white font-medium">Performance-focused. Platform-native.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all rounded-sm text-center">
                Start Campaign
              </Link>
              <Link href="#audit" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <BarChart3 size={14} /> Request Audit
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Positioning = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-black">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Not guesswork. Measured impact.</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Strategy + Content + Analytics working as one system. We don't believe in "posting and hoping." 
          We believe in business-aligned execution.
        </p>
      </ScrollReveal>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Business Aligned", desc: "KPIs that matter to the boardroom." },
        { title: "Platform Native", desc: "Content built for how people actually scroll." },
        { title: "Optimization Loop", desc: "Continuous testing and refinement." },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="text-center p-6 border border-white/5 bg-[#0a0a0a] rounded-sm hover:border-indigo-500/30 transition-colors">
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
          <h2 className="text-4xl font-black text-white mb-6">GROWTH SUITE</h2>
          <p className="text-slate-400">The engine room of digital dominance.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Search & Discovery", desc: "SEO Strategy, SEM, Keyword mapping.", icon: Search },
          { title: "Social Growth", desc: "Community management, content programming.", icon: Share2 },
          { title: "Paid Media", desc: "Meta/Google Ads, Audience targeting, Retargeting.", icon: Megaphone },
          { title: "Email & Retention", desc: "Automations, Customer journeys, Newsletters.", icon: Mail },
          { title: "Analytics", desc: "Tracking setup, Dashboards, ROI reporting.", icon: LineChart },
          { title: "E-Commerce", desc: "Conversion optimization, Funnel design.", icon: ShoppingBag },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-indigo-500 group-hover:bg-indigo-500/10 transition-colors">
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

const GrowthFramework = () => (
  <section className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">The Growth Framework</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-indigo-900 via-indigo-500 to-indigo-900 opacity-30" />

        {[
          { step: "01", title: "Awareness", desc: "Position your brand where people are. Cultural-fit campaigns & high-reach formats." },
          { step: "02", title: "Engagement", desc: "Turn interaction into connection. Conversation-based content & education." },
          { step: "03", title: "Conversion", desc: "Marketing aligned to outcomes. Landing flows, offers, and action-led creative." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.2}>
            <div className="relative group p-8 bg-[#0a0a0a] border border-white/5 hover:bg-white/5 transition-all">
              <div className="w-10 h-10 bg-black border border-indigo-500/50 rounded-full flex items-center justify-center text-indigo-400 font-mono text-sm font-bold mb-6 relative z-10 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                {s.step}
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 italic">{s.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const IndustryAdaptation = () => (
  <section className="py-24 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-black text-white mb-12">SECTOR INTELLIGENCE</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Banks & Finance", icon: <Target />, text: "Trust-first content & education funnels." },
          { label: "Telecom & Tech", icon: <Smartphone />, text: "Scale-tested digital reach campaigns." },
          { label: "Public Sector", icon: <Users />, text: "Behavior-change communication." },
          { label: "Consumer Brands", icon: <Globe />, text: "Lifestyle resonance & purchase paths." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-6 border border-white/10 bg-black/50 rounded-sm hover:border-indigo-500/50 transition-all group">
              <div className="text-slate-500 mb-4 group-hover:text-indigo-400 transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-white font-bold uppercase text-sm mb-2">{item.label}</h3>
              <p className="text-xs text-slate-500">{item.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-black border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Execution Cycle</h2>
      </ScrollReveal>

      <div className="space-y-4">
        {[
          { step: "01", title: "Discovery Audit", desc: "Current state, gaps, baseline metrics." },
          { step: "02", title: "Architecture", desc: "Goals → Channels → Content System." },
          { step: "03", title: "Campaign Rollout", desc: "Creative, ads setup, scheduling." },
          { step: "04", title: "Tracking Layer", desc: "Events, pixels, funnels, dashboards." },
          { step: "05", title: "Iteration", desc: "Insights → Refinement → Scale." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex items-center gap-6 p-6 border-l-2 border-white/10 hover:border-indigo-500 transition-colors bg-[#0a0a0a]/50 hover:bg-[#0a0a0a] group">
              <span className="text-xs font-mono text-indigo-500/50">{s.step}</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-indigo-400 transition-colors">{s.title}</h3>
              </div>
              <p className="text-xs text-slate-500 text-right hidden sm:block">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0e0e0e] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          GROWTH IS<br/>ENGINEERED.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Stop guessing. Start measuring. Let’s build a smarter digital growth engine for your brand.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-indigo-600 hover:text-white transition-all shadow-2xl">
            Start Campaign
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Request Strategy Call
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyDigitalPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500 selection:text-white font-sans">
      <GlobalNavbar />
      <AgencySubNav />
      
      <Hero />
      <Positioning />
      <Capabilities />
      <GrowthFramework />
      <IndustryAdaptation />
      <Process />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}