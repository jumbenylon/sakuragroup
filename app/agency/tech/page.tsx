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
  Code2, 
  Database, 
  Server, 
  Globe, 
  ShoppingCart, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Terminal,
  LayoutGrid,
  Workflow
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
              rgba(6, 182, 212, 0.15), 
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
                ${link === 'Tech' ? 'text-cyan-500' : 'text-white/40 hover:text-white'}`}
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
      {/* Technical Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity, y }}>
          <span className="inline-flex items-center gap-2 py-1 px-3 border border-cyan-500/30 bg-cyan-900/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-8">
            <Terminal size={12} />
            Digital Infrastructure
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            SYSTEMS WITH<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-orange-500">PURPOSE.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              We design fast, secure, scalable digital platforms — built for performance, reliability, and real business outcomes.
              <span className="block mt-4 text-white font-medium">Engineering meets design. Stability meets creativity.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all rounded-sm text-center">
                Start Web Project
              </Link>
              <Link href="#review" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <Cpu size={14} /> Request Tech Review
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
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">We don’t just build websites. We build systems.</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Technology exists to support the strategy, the brand, and the user experience. 
          If it's not scalable, secure, and fast, it's not finished.
        </p>
      </ScrollReveal>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Performance", desc: "Speed is a brand experience. We optimize for milliseconds." },
        { title: "Architecture", desc: "Clean code structure matters as much as the visuals." },
        { title: "Reliability", desc: "Uptime builds trust. We engineer for resilience." },
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
          <h2 className="text-4xl font-black text-white mb-6">ENGINEERING SUITE</h2>
          <p className="text-slate-400">Scalable solutions for the modern web.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Web Platforms", desc: "Corporate sites, Landing pages, SEO-Ready architecture.", icon: Globe },
          { title: "E-Commerce", desc: "WooCommerce, Shopify, Custom Checkout Flows.", icon: ShoppingCart },
          { title: "Business Tools", desc: "Internal dashboards, Client portals, Lightweight SaaS.", icon: LayoutGrid },
          { title: "Managed Hosting", desc: "Cloud deployment, Security hardening, Backups.", icon: Server },
          { title: "Performance", desc: "Page speed optimization, Accessibility audits.", icon: Zap },
          { title: "API Integration", desc: "CRM connections, Payment gateways, ERP sync.", icon: Workflow },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-cyan-500 group-hover:bg-cyan-500/10 transition-colors">
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

const ArchitectureProcess = () => (
  <section className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Development Lifecycle</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-5 gap-4 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10" />

        {[
          { step: "01", title: "Mapping", desc: "Infrastructure, constraints, integrations." },
          { step: "02", title: "Design", desc: "User journeys, system behaviors, flow." },
          { step: "03", title: "Build", desc: "Clean code, scalable structure, security." },
          { step: "04", title: "Harden", desc: "Load tests, browser validation, security checks." },
          { step: "05", title: "Deploy", desc: "CI/CD pipelines, analytics, uptime monitoring." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative group p-6 bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 transition-all">
              <div className="w-8 h-8 bg-black border border-white/20 rounded-full flex items-center justify-center text-slate-500 font-mono text-xs font-bold mb-6 relative z-10 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500 transition-colors">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-white uppercase mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {s.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const TechStack = () => (
  <section className="py-24 px-6 bg-[#050505]">
    <div className="max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="p-8 border border-white/10 bg-white/[0.02] rounded-lg">
          <div className="flex items-center gap-4 mb-8">
            <Code2 className="text-cyan-500" />
            <h2 className="text-xl font-black text-white uppercase tracking-widest">Our Preferred Stack</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xs font-mono text-slate-500 uppercase mb-4">Frontend & UI</h3>
              <ul className="space-y-2 text-sm text-slate-300 font-mono">
                <li>Next.js / React</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono text-slate-500 uppercase mb-4">Backend & Data</h3>
              <ul className="space-y-2 text-sm text-slate-300 font-mono">
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>Prisma ORM</li>
                <li>Redis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono text-slate-500 uppercase mb-4">Infrastructure</h3>
              <ul className="space-y-2 text-sm text-slate-300 font-mono">
                <li>Vercel / AWS</li>
                <li>Docker</li>
                <li>Cloudflare</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-8 pt-6 border-t border-white/5 font-mono">
            *Chosen for speed, security, and maintainability.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const UseCases = () => (
  <section className="py-24 px-6 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { label: "Banks & Fintech", text: "Secure portals, informational trust websites." },
          { label: "E-Commerce", text: "High-conversion storefronts, order workflows." },
          { label: "Telecoms", text: "Product microsites, customer self-service." },
          { label: "NGOs", text: "Resource hubs, program impact dashboards." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex items-start gap-4 p-6 border border-white/5 rounded-sm hover:bg-white/5 transition-colors">
              <div className="mt-1 w-2 h-2 bg-cyan-500 rounded-full" />
              <div>
                <h3 className="text-white font-bold uppercase text-sm mb-1">{item.label}</h3>
                <p className="text-sm text-slate-500">{item.text}</p>
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
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          ENGINEER THE<br/>FUTURE.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Ready to build a digital platform that works — beautifully and reliably? Let’s engineer something that lasts.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-cyan-500 hover:text-white transition-all shadow-2xl">
            Start Web Build
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Tech Review Call
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyTechPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black font-sans">
      
      <AgencySubNav />
      
      <Hero />
      <Philosophy />
      <Capabilities />
      <ArchitectureProcess />
      <TechStack />
      <UseCases />
      <CTA />
      
      
    </main>
  );
}