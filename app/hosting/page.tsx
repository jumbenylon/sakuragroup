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
  Server, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Database, 
  Cpu,
  Clock,
  Activity,
  Users,
  Briefcase,
  CheckCircle2,
  XCircle,
  RefreshCw
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
      className={`relative border border-white/10 bg-[#030712] overflow-hidden group ${className}`}
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

const HostingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Performance", id: "performance" },
    { label: "Products", id: "products" },
    { label: "Why Us", id: "why" },
    { label: "Support", id: "support" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#030712]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 italic mr-4 hidden md:block">
            SakuraHost
          </span>
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={`#${link.id}`} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.label === 'Overview' ? 'text-violet-400' : 'text-slate-400 hover:text-white'}`}
            >
              {link.label}
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
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#030712]">
      {/* High-Tech Grid Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop"
            alt="Data Center"
            fill
            className="object-cover opacity-20 mix-blend-screen grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-[#030712]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#7c3aed05_1px,transparent_1px),linear-gradient(to_bottom,#7c3aed05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-950/30 border border-violet-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Server size={14} className="text-violet-500 animate-pulse" />
             <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Built for Performance • Backed by People</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            HOSTING THAT<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">
                WORKS HARD.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             NVMe cloud hosting, managed VPS, and mission-ready infrastructure — optimized for performance, reliability, and real-world business needs in Tanzania.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-xs font-mono text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-violet-500" /> 99.9% Uptime SLA</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-violet-500" /> LiteSpeed Stack</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-violet-500" /> Local Support</span>
          </div>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#products" className="group relative px-10 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-violet-100 transition-colors shadow-[0_0_40px_rgba(124,58,237,0.3)]">
                View Plans
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Talk to Engineer
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ValueContrast = () => (
  <section className="py-24 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <div className="relative aspect-video rounded-sm overflow-hidden border border-white/10">
           <Image 
             src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2000&auto=format&fit=crop"
             alt="Server Architecture"
             fill
             className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
           />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <h2 className="text-3xl font-bold text-white mb-8">Built for Business.<br/><span className="text-slate-500">Not Hobby Hosting.</span></h2>
        
        <div className="grid grid-cols-2 gap-8">
           <div className="space-y-4">
              <h3 className="text-red-400 font-bold text-xs uppercase tracking-widest border-b border-red-500/20 pb-2 mb-4">Typical Cheap Hosting</h3>
              <ul className="space-y-3">
                 <li className="flex gap-3 text-sm text-slate-500"><XCircle size={16} className="text-red-500 shrink-0" /> Oversold shared servers</li>
                 <li className="flex gap-3 text-sm text-slate-500"><XCircle size={16} className="text-red-500 shrink-0" /> No update discipline</li>
                 <li className="flex gap-3 text-sm text-slate-500"><XCircle size={16} className="text-red-500 shrink-0" /> Support with no context</li>
              </ul>
           </div>
           
           <div className="space-y-4">
              <h3 className="text-violet-400 font-bold text-xs uppercase tracking-widest border-b border-violet-500/20 pb-2 mb-4">SakuraHost Way</h3>
              <ul className="space-y-3">
                 <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-violet-500 shrink-0" /> Performance-led architecture</li>
                 <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-violet-500 shrink-0" /> Stability & security awareness</li>
                 <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 size={16} className="text-violet-500 shrink-0" /> Human-led continuity</li>
              </ul>
           </div>
        </div>
        <p className="text-slate-500 text-sm mt-8 italic">"Speed is a feature. Reliability is a strategy."</p>
      </ScrollReveal>
    </div>
  </section>
);

const PerformanceStack = () => (
  <section id="performance" className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Engineered for Speed</h2>
          <p className="text-slate-400">Our stack is optimized for maximum performance.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "NVMe Storage", icon: <Database />, desc: "Enterprise-grade SSDs for instant data retrieval." },
          { title: "LiteSpeed Web Server", icon: <Zap />, desc: "Up to 84x faster than Apache. Handles traffic spikes effortlessly." },
          { title: "Imunify360 Security", icon: <ShieldCheck />, desc: "AI-driven firewall and malware protection included." },
          { title: "Resource Isolation", icon: <Server />, desc: "CloudLinux ensures your neighbors don't slow you down." },
          { title: "Global Routing", icon: <Globe />, desc: "Optimized paths for Tanzanian and international traffic." },
          { title: "Auto Snapshots", icon: <Clock />, desc: "Daily backup retention with one-click restore." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-8 h-full bg-[#030712] border-violet-500/10">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-violet-400 group-hover:bg-violet-400/10 transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-white font-bold uppercase text-sm tracking-widest mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const ProductPillars = () => (
  <section id="products" className="py-32 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-20 text-center">Infrastructure Suite</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Web Hosting", desc: "Fast, reliable entry hosting.", link: "/hosting/web", icon: <Globe /> },
          { title: "Managed Core", desc: "Hands-on care & oversight.", link: "/hosting/managed", icon: <Activity /> },
          { title: "VPS & Cloud", desc: "Power for scaling apps.", link: "/hosting/vps", icon: <Cpu /> },
          { title: "Email & Domains", desc: "Professional identity.", link: "/hosting/domains", icon: <Briefcase /> },
        ].map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <Link href={p.link} className="block group">
              <div className="p-8 h-full bg-[#0a0a0a] border border-white/10 hover:border-violet-500/50 transition-all rounded-sm flex flex-col">
                 <div className="mb-6 text-slate-500 group-hover:text-violet-400 transition-colors">
                    {React.cloneElement(p.icon as React.ReactElement, { size: 32 })}
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                 <p className="text-sm text-slate-400 mb-8 flex-grow">{p.desc}</p>
                 <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-500 group-hover:translate-x-2 transition-transform">
                    Explore <ArrowRight size={12} />
                 </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const WhyBusinessesChoose = () => (
  <section id="why" className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10">
           <Image 
             src="https://images.unsplash.com/photo-1581091870627-3ebd9f6d5a71?q=80&w=2000&auto=format&fit=crop"
             alt="Business Growth"
             fill
             className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
           />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <h2 className="text-3xl font-bold text-white mb-8">Why Businesses Switch to SakuraHost</h2>
        <ul className="space-y-6">
           {[
             "Performance that doesn’t degrade over time",
             "No hidden vendor complexity",
             "Honest resource expectations",
             "Support that actually understands your environment"
           ].map((item, i) => (
             <li key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-900/20 border border-violet-500/20 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-violet-500" />
                </div>
                <span className="text-slate-300 font-medium">{item}</span>
             </li>
           ))}
        </ul>
      </ScrollReveal>
    </div>
  </section>
);

const TanzaniaContext = () => (
  <section className="py-24 px-6 bg-[#030712] border-t border-white/5">
    <div className="max-w-5xl mx-auto text-center">
       <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-8">Designed for Tanzanian Business Environments</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 opacity-80">
             {["Banks & Fintech", "Logistics", "Government", "Corporate Portals", "eCommerce"].map((tool, i) => (
                <div key={i} className="px-6 py-3 border border-white/10 rounded-full text-sm font-bold text-slate-400 uppercase tracking-widest">
                   {tool}
                </div>
             ))}
          </div>
          <p className="text-slate-600 text-xs mt-8 font-mono">
             We optimize for real-world connectivity, mobile usage, and operational realities.
          </p>
       </ScrollReveal>
    </div>
  </section>
);

const ServiceLifecycle = () => (
  <section className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <h2 className="text-3xl font-bold text-white mb-6">Lifecycle of Service Care</h2>
        <p className="text-slate-400 mb-16">We'd rather prevent problems than respond to emergencies.</p>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />
           
           {[
             { step: "Observe", icon: <Users /> },
             { step: "Maintain", icon: <Server /> },
             { step: "Stabilize", icon: <ShieldCheck /> },
             { step: "Improve", icon: <RefreshCw /> },
           ].map((s, i) => (
             <div key={i} className="bg-[#050a16] p-4">
                <div className="w-16 h-16 bg-[#0a0a0a] border border-violet-500/30 rounded-full flex items-center justify-center text-violet-400 mb-4 mx-auto shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                   {s.icon}
                </div>
                <span className="text-white font-bold text-sm uppercase tracking-wide">{s.step}</span>
             </div>
           ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const HumanSupport = () => (
  <section id="support" className="py-24 px-6 bg-[#030712] border-y border-white/5">
    <div className="max-w-4xl mx-auto bg-violet-900/10 border border-violet-500/20 p-10 rounded-sm flex flex-col md:flex-row gap-8 items-center">
       <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-violet-500/50 flex-shrink-0">
          <Image 
             src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1000&auto=format&fit=crop"
             alt="Support Engineer"
             fill
             className="object-cover grayscale"
          />
       </div>
       <div>
          <h3 className="text-xl font-bold text-white mb-2">Human-Led Support. Not Robots.</h3>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
             Get context retention and consistent communication. Our engineers offer decision support, not just "fix-only" tickets.
          </p>
          <Link href="/hosting/support" className="text-violet-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
             Meet the Operations Team →
          </Link>
       </div>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-2xl font-bold text-white mb-8">Hosting FAQ</h2>
        <div className="space-y-4">
           {[
             { q: "Do you migrate websites from other hosts?", a: "Yes. We have a structured migration process to ensure zero data loss." },
             { q: "Do you support agency-built sites?", a: "Yes. We offer a shared stewardship approach to work alongside your developers." },
             { q: "Can I scale later?", a: "All plans upgrade smoothly. You can move from Web Hosting to VPS without downtime." },
             { q: "Do you offer managed services?", a: "Yes. Our Managed Core and Stewardship tiers provide hands-on oversight." },
           ].map((item, i) => (
             <div key={i} className="p-6 border border-white/5 bg-[#030712] rounded-sm">
                <h4 className="text-white font-bold text-sm mb-2">{item.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
             </div>
           ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          MORE THAN STORAGE.<br/>
          IT'S INFRASTRUCTURE.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          We’ll help you choose the right path based on how your platform really operates.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="#products" className="px-12 py-5 bg-white text-[#030712] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-200 transition-all shadow-2xl">
            View Hosting Plans
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Request Migration
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function HostingPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white selection:bg-violet-500 selection:text-white font-sans cursor-none">
      
      <HostingNav />
      
      <Hero />
      <ValueContrast />
      <PerformanceStack />
      <ProductPillars />
      <WhyBusinessesChoose />
      <TanzaniaContext />
      <HumanSupport />
      <ServiceLifecycle />
      <FAQ />
      <CTA />
      
      
    </main>
  );
}