"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import { 
  ArrowRight, 
  MapPin, 
  Globe, 
  Zap, 
  Layout, 
  Cpu, 
  Search, 
  PenTool, 
  Megaphone,
  BarChart3,
  Users,
  Workflow
} from "lucide-react";


// --- SHARED COMPONENTS ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorX, translateY: cursorY }}
    />
  );
};

const SpotlightCard = ({ children, className = "", href }: { children: React.ReactNode, className?: string, href: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link 
      href={href}
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group block ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.15), 
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </Link>
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

  const navItems = [
    { label: "Overview", link: "/agency" },
    { label: "Strategy", link: "/agency/strategy" },
    { label: "Branding", link: "/agency/branding" },
    { label: "Design", link: "/agency/design" },
    { label: "Content", link: "/agency/content" },
    { label: "Digital", link: "/agency/digital" },
    { label: "Advertising", link: "/agency/advertising" },
    { label: "Tech", link: "/agency/tech" },
    { label: "CRM", link: "/agency/crm" },
    { label: "Research", link: "/agency/research" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#050505]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.link} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${item.label === 'Overview' ? 'text-orange-500' : 'text-white/40 hover:text-white'}`}
            >
              {item.label}
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
    <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden bg-[#050505]">
      {/* Cinematic Background */}
      <motion.div style={{ opacity, y }} className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#050505]" />
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-50 grayscale contrast-125 scale-105"
         >
             <source src="https://storage.googleapis.com/sakura-web/sakura-agency.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
             <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-bold text-white uppercase tracking-widest">Built in Tanzania • Made for the World</span>
          </div>
          
          <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter mb-8">
            BOLD<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                CREATIVITY.
            </span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
             <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed border-l-4 border-orange-500 pl-6">
               Strategy, design, technology, and storytelling — working together to transform brands, products, and digital experiences across Africa.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/contact" className="group relative px-10 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full overflow-hidden hover:bg-orange-500 hover:text-white transition-colors">
                   Start a Project
                </Link>
                <Link href="#services" className="group relative px-10 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full overflow-hidden hover:bg-white/10 transition-colors">
                   Explore Work
                </Link>
             </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Positioning = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-black">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <ScrollReveal>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">
          We’re a 360° creative and technology partner.
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["Strategy", "Branding", "Digital", "Content", "Campaigns", "Technology", "Research"].map((tag, i) => (
            <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-slate-400 hover:border-orange-500 hover:text-white transition-colors cursor-default">
              {tag}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </div>

    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
      {[
        { title: "Strategy First", desc: "Every project starts with research, insight and clarity." },
        { title: "Design with Purpose", desc: "Experiences that feel premium, intuitive, and meaningful." },
        { title: "Tech Driven", desc: "Modern engineering and automation powering outcomes." },
        { title: "Africa Rooted", desc: "Local insight. Regional perspective. Global standards." },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="p-8 border border-white/5 bg-[#0a0a0a] rounded-sm hover:border-orange-500/30 transition-colors h-full">
            <h3 className="text-white font-bold uppercase tracking-widest mb-3 text-sm">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const ServiceGateway = () => (
  <section id="services" className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-20">
          <h2 className="text-4xl font-black text-white mb-6">THE ECOSYSTEM</h2>
          <p className="text-slate-400">Integrated disciplines. Unified execution.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Strategy", link: "/agency/strategy", icon: Search, desc: "Market Positioning & Advisory" },
          { title: "Branding", link: "/agency/branding", icon: PenTool, desc: "Identity Systems & Visual Language" },
          { title: "Design", link: "/agency/design", icon: Layout, desc: "UI/UX, Print & Communication" },
          { title: "Content", link: "/agency/content", icon: Users, desc: "Video, Photo & Narrative" },
          { title: "Digital Marketing", link: "/agency/digital", icon: Globe, desc: "Growth, SEO & Paid Media" },
          { title: "Advertising & PR", link: "/agency/advertising", icon: Megaphone, desc: "Campaigns & Reputation" },
          { title: "Technology", link: "/agency/tech", icon: Cpu, desc: "Web, App Dev & Infrastructure" },
          { title: "CRM & Systems", link: "/agency/crm", icon: Workflow, desc: "Automation & Operations" },
          { title: "Research", link: "/agency/research", icon: BarChart3, desc: "Consumer Insight & Data" },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard href={s.link} className="p-10 h-full bg-[#0a0a0a]">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                  <s.icon size={24} />
                </div>
                <ArrowRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide group-hover:text-orange-500 transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">
                {s.desc}
              </p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const SelectedWork = () => (
  <section className="py-32 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-black text-white mb-12">TRANSFORMATION STORIES</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { 
            client: "CRDB Bank", 
            title: "Digital Experience Refresh", 
            desc: "Simplified UX, elevated design, clearer communication. Result: Stronger engagement & adoption.",
            tags: ["UI/UX", "Strategy"],
            color: "bg-green-900"
          },
          { 
            client: "Tigo Tanzania", 
            title: "4G Campaign Launch", 
            desc: "High-impact visual storytelling and vernacular messaging connecting lifestyle to speed.",
            tags: ["Advertising", "Content"],
            color: "bg-blue-900"
          },
          { 
            client: "Sunking", 
            title: "Market Penetration", 
            desc: "Data-driven field research translating into a localised go-to-market playbook.",
            tags: ["Research", "Marketing"],
            color: "bg-yellow-900"
          },
          { 
            client: "Zanzibar Tourism", 
            title: "Island Identity System", 
            desc: "A cohesive brand system unifying heritage with modern luxury travel.",
            tags: ["Branding", "Design"],
            color: "bg-teal-900"
          }
        ].map((w, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="group cursor-pointer">
              <div className={`aspect-video ${w.color} relative overflow-hidden mb-6 border border-white/10 rounded-sm`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent opacity-80" />
                <span className="absolute top-6 left-6 text-xs font-mono uppercase tracking-widest text-white/70 border border-white/20 px-2 py-1 rounded-sm bg-black/20 backdrop-blur-md">
                  {w.client}
                </span>
              </div>
              <div className="flex gap-2 mb-3">
                {w.tags.map(t => (
                  <span key={t} className="text-[9px] font-bold uppercase text-orange-500 tracking-widest">{t}</span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">{w.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">{w.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Culture = () => (
  <section className="py-32 px-6 bg-[#0c0a09] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none" />
    
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      <div className="flex-1">
        <ScrollReveal>
          <div className="inline-block p-3 border border-orange-500/20 bg-orange-900/10 rounded-full mb-6">
            <MapPin className="text-orange-500" size={20} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Africa is not<br/>one audience.
          </h2>
          <p className="text-lg text-stone-400 leading-relaxed mb-6">
            And Tanzania is not one story. We design for people, communities, language, culture, and context. 
            Our work respects how people live, communicate, and make decisions.
          </p>
          <p className="text-white font-medium">
            Global quality. Local soul.
          </p>
        </ScrollReveal>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="aspect-square bg-stone-900 border border-white/5 rounded-sm overflow-hidden relative group">
               <div className="absolute inset-0 bg-stone-800 animate-pulse opacity-10" />
               <div className="absolute inset-0 flex items-center justify-center text-stone-700 font-mono text-xs">
                 [Culture Frame 0{i}]
               </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Our Approach</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-5 gap-4">
        {[
          { step: "01", title: "Discover", desc: "Research & Clarity." },
          { step: "02", title: "Define", desc: "Strategy Foundations." },
          { step: "03", title: "Create", desc: "Concepts & Systems." },
          { step: "04", title: "Build", desc: "Execution & Code." },
          { step: "05", title: "Grow", desc: "Optimization & Scale." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-6 border-t-2 border-white/10 hover:border-orange-500 transition-colors group">
              <span className="text-xs font-mono text-slate-500 mb-4 block group-hover:text-orange-500">{s.step}</span>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{s.title}</h3>
              <p className="text-xs text-slate-500">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0e0e0e] text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          LET'S BUILD<br/>SOMETHING REAL.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Whether you’re launching a new brand, upgrading a platform, or scaling communications — we’d love to partner with you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-2xl">
            Start a Project
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-colors">
            Book Strategy Call
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyMasterPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white font-sans cursor-none">
      <CustomCursor />
      
      <AgencySubNav />
      
      <Hero />
      <Positioning />
      <ServiceGateway />
      <SelectedWork />
      <Process />
      <Culture />
      <CTA />
      
      
    </main>
  );
}