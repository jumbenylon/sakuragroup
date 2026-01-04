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
  MessageSquare, 
  Smartphone, 
  Globe, 
  Code2, 
  CheckCircle2
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- DATA CONSTANTS ---
// Moved outside components to prevent parser nesting errors
const FEATURES_DATA = [
  { 
    title: "Bulk SMS", 
    icon: <Smartphone size={24} />, 
    desc: "Direct operator connections for OTPs & Alerts." 
  },
  { 
    title: "WhatsApp Business", 
    icon: <MessageSquare size={24} />, 
    desc: "Rich media messaging and automated bots." 
  },
  { 
    title: "Email API", 
    icon: <Globe size={24} />, 
    desc: "Transactional emails that actually hit the inbox." 
  }
];

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
              rgba(16, 185, 129, 0.15), 
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const AxisSubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Features", id: "features" },
    { label: "API", id: "api" },
    { label: "Pricing", id: "pricing" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#050a14]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic mr-4 hidden md:block">
            Axis Gateway
          </span>
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={`#${link.id}`} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.label === 'Overview' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
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
    <section id="hero" className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#050a14]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/30 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <MessageSquare size={14} className="text-emerald-500 animate-pulse" />
             <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Enterprise Communication API</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            CONNECT AT<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
                SCALE.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
             The unified messaging gateway for Tanzania. Reach customers instantly via SMS, WhatsApp, and Email through a single, reliable API.
             <span className="block mt-2 text-white font-medium">98% Delivery Rate. Sub-second Latency.</span>
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-emerald-600 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-emerald-500 transition-colors shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                Get API Keys
            </Link>
            <Link href="#features" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                View Documentation
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-[#050a14] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Unified Communication Channels</h2>
            <p className="text-slate-400 text-lg">One integration. Every customer.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES_DATA.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <SpotlightCard className="p-8 h-full text-center hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const APISection = () => {
  return (
    <section id="api" className="py-32 px-6 bg-[#020617]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
            <Code2 size={20} />
            <span className="font-mono text-xs uppercase tracking-widest">Developer Friendly</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Built for Developers</h2>
          <p className="text-slate-400 text-lg mb-8">
            Clean documentation, predictable REST endpoints, and SDKs for Node, Python, and PHP. 
            Start sending in minutes, not days.
          </p>
          <ul className="space-y-4 mb-8">
             <li className="flex gap-3 text-slate-300"><CheckCircle2 className="text-emerald-500" /> Real-time Delivery Reports (DLRs)</li>
             <li className="flex gap-3 text-slate-300"><CheckCircle2 className="text-emerald-500" /> Webhook Events</li>
             <li className="flex gap-3 text-slate-300"><CheckCircle2 className="text-emerald-500" /> Sandboxed Testing Mode</li>
          </ul>
          <Link href="/contact" className="text-emerald-400 font-bold flex items-center gap-2 hover:text-white transition-colors uppercase text-xs tracking-widest">
             Read The Docs <ArrowRight size={14} />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="rounded-lg overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl font-mono text-sm">
             <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
             </div>
             <div className="p-6 text-slate-300 space-y-4">
                <p><span className="text-purple-400">const</span> <span className="text-yellow-200">axis</span> = <span className="text-blue-400">require</span>('axis-sdk');</p>
                <p>
                   <span className="text-purple-400">await</span> axis.sms.send(&#123;<br/>
                   &nbsp;&nbsp;to: <span className="text-green-400">'+255753...'</span>,<br/>
                   &nbsp;&nbsp;message: <span className="text-green-400">'Your OTP is 4921'</span>,<br/>
                   &nbsp;&nbsp;sender_id: <span className="text-green-400">'SAKURA'</span><br/>
                   &#125;);
                </p>
                <p className="text-slate-500">// Response: { status: "queued", id: "msg_123" }</p>
             </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="py-24 px-6 bg-[#050a14] border-t border-white/5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
         <ScrollReveal>
            <div className="p-6">
               <div className="text-4xl font-black text-emerald-500 mb-2">50M+</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest">Messages Delivered</div>
            </div>
         </ScrollReveal>
         <ScrollReveal delay={0.1}>
            <div className="p-6 border-x border-white/5">
               <div className="text-4xl font-black text-white mb-2">99.9%</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest">Uptime SLA</div>
            </div>
         </ScrollReveal>
         <ScrollReveal delay={0.2}>
            <div className="p-6">
               <div className="text-4xl font-black text-emerald-500 mb-2">200+</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest">Enterprise Clients</div>
            </div>
         </ScrollReveal>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/20 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
            START SENDING<br/>TODAY.
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
            Reliable communication infrastructure for Tanzanian businesses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="px-12 py-5 bg-emerald-600 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-500 transition-all shadow-2xl">
              Get API Keys
            </Link>
            <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
              Contact Sales
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default function AxisPage() {
  return (
    <main className="min-h-screen bg-[#050a14] text-white selection:bg-emerald-500 selection:text-black font-sans cursor-none">
      <GlobalNavbar />
      <AxisSubNav />
      
      <Hero />
      <Features />
      <APISection />
      <Stats />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}