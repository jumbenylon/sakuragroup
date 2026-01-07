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
  Megaphone, 
  Newspaper, 
  Radio, 
  Users, 
  TrendingUp, 
  Mic2, 
  Globe, 
  Building2, 
  Target, 
  ShieldAlert,
  MessageSquare
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
              rgba(245, 158, 11, 0.15), 
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
                ${link === 'Advertising' ? 'text-amber-500' : 'text-white/40 hover:text-white'}`}
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
          src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop"
          alt="Advertising and Media"
          fill
          className="object-cover opacity-30 mix-blend-overlay grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="absolute top-[-20%] left-[20%] w-[1000px] h-[600px] bg-amber-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity, y }}>
          <span className="inline-block py-1 px-3 border border-amber-500/30 bg-amber-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-amber-500 mb-8">
            Reputation & Influence
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            INFLUENCE AT<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">SCALE.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              Advertising that moves people. PR that shapes perception. We design campaigns that inspire action and build trust.
              <span className="block mt-4 text-white font-medium">Culture-aware. Insight-driven. Reputation-focused.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all rounded-sm text-center">
                Plan a Campaign
              </Link>
              <Link href="#work" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <ShieldAlert size={14} /> Book PR Consultation
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">We don’t chase attention. We engineer relevance.</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Strategy first. Story second. Media that respects context. 
          In a noisy world, the quietest confidence speaks the loudest.
        </p>
      </ScrollReveal>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Cultural Insight", desc: "Understanding the pulse of the street and the boardroom." },
        { title: "Audience First", desc: "Creative decisions based on behavior, not trends." },
        { title: "Campaign Discipline", desc: "Rigorous execution. No random posting." },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="text-center p-6 border border-white/5 bg-[#0a0a0a] rounded-sm hover:border-amber-500/30 transition-colors">
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
          <h2 className="text-4xl font-black text-white mb-6">CAMPAIGN SUITE</h2>
          <p className="text-slate-400">Integrated communications for modern brands.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Brand Advertising", desc: "Creative concepts, copywriting, production.", icon: Megaphone },
          { title: "Public Relations", desc: "Media relations, crisis comms, thought leadership.", icon: Mic2 },
          { title: "Digital Campaigns", desc: "Social creatives, integrated media execution.", icon: Globe },
          { title: "Influencer Collabs", desc: "Creator partnerships & community advocacy.", icon: Users },
          { title: "Out-of-Home", desc: "Billboards, transit media, activation concepts.", icon: Radio },
          { title: "Measurement", desc: "Post-campaign analysis & outcome reports.", icon: TrendingUp },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-colors">
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

const Philosophy = () => (
  <section className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-white uppercase tracking-widest text-amber-500">Truth Before Creativity</h3>
            <p className="text-slate-400 leading-relaxed">
              We communicate what matters — not noise. If the core message isn&apos;t true, no amount of design will save it.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-black text-white uppercase tracking-widest text-amber-500">Audience Before Platform</h3>
            <p className="text-slate-400 leading-relaxed">
              People &gt; Channels. We define who we are talking to before we decide where to talk to them.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-black text-white uppercase tracking-widest text-amber-500">Impact Before Vanity</h3>
            <p className="text-slate-400 leading-relaxed">
              Perception shifts matter more than likes. We optimize for trust, reputation, and action.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CampaignFramework = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Campaign Architecture</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-8 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10" />

        {[
          { step: "Phase 1", title: "The Story", desc: "Purpose, audience insight, behavioral triggers." },
          { step: "Phase 2", title: "The Message", desc: "Clarity, resonance, cultural tone of voice." },
          { step: "Phase 3", title: "The Media", desc: "Right channel, right moment, right weight." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.2}>
            <div className="relative group p-8 bg-[#0a0a0a] border border-white/5 hover:border-amber-500/30 transition-all">
              <div className="w-10 h-10 bg-black border border-white/20 rounded-full flex items-center justify-center text-slate-500 font-mono text-xs font-bold mb-6 relative z-10 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500 transition-colors">
                {i + 1}
              </div>
              <span className="text-xs font-mono text-amber-500/70 mb-2 block">{s.step}</span>
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

const Sectors = () => (
  <section className="py-24 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-black text-white mb-12">SECTOR SOLUTIONS</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Government", icon: <Building2 />, text: "Behavior-change & awareness campaigns." },
          { label: "Telecoms", icon: <Globe />, text: "Scale-focused reach & engagement." },
          { label: "Financial Services", icon: <ShieldAlert />, text: "Trust-building & credibility messaging." },
          { label: "Consumer Brands", icon: <Target />, text: "Lifestyle influence & cultural relevance." },
          { label: "NGOs", icon: <Users />, text: "Purpose-led storytelling with outcomes." },
          { label: "Technology", icon: <TrendingUp />, text: "Product adoption & market education." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-6 border border-white/10 bg-white/[0.02] rounded-sm hover:bg-white/[0.05] transition-all group">
              <div className="text-slate-500 mb-4 group-hover:text-amber-500 transition-colors">
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
  <section className="py-32 px-6 bg-[#050505] border-t border-white/5">
    <div className="max-w-4xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Execution Cycle</h2>
      </ScrollReveal>

      <div className="space-y-4">
        {[
          { step: "01", title: "Discovery", desc: "Insight mapping & landscape audit." },
          { step: "02", title: "Strategy", desc: "Message definition & narrative arc." },
          { step: "03", title: "Concepting", desc: "Creative system & campaign big idea." },
          { step: "04", title: "Planning", desc: "Media strategy & channel alignment." },
          { step: "05", title: "Execution", desc: "Production, rollout & management." },
          { step: "06", title: "Reporting", desc: "Outcomes, reach & sentiment analysis." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex items-center gap-6 p-6 border-l-2 border-white/10 hover:border-amber-500 transition-colors bg-[#0a0a0a]/50 hover:bg-[#0a0a0a] group">
              <span className="text-xs font-mono text-amber-500/50">{s.step}</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-amber-400 transition-colors">{s.title}</h3>
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
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          SHAPE THE<br/>NARRATIVE.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Ready to shape how your brand is seen and understood? Let’s craft communication that informs, inspires, and influences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-amber-500 hover:text-black transition-all shadow-2xl">
            Start Campaign
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            PR Consultation
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyAdvertisingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-amber-500 selection:text-black font-sans">
      
      <AgencySubNav />
      
      <Hero />
      <Positioning />
      <Capabilities />
      <Philosophy />
      <CampaignFramework />
      <Sectors />
      <Process />
      <CTA />
      
      
    </main>
  );
}
