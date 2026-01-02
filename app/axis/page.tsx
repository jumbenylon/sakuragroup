"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, MessageCircle, Smartphone, Users, 
  Send, CheckCircle2, Shield, Heart, 
  Sparkles, Globe, Hash, Server, Zap, Lock
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED COMPONENTS ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-pink-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.0 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center"
    >
        <div className="text-center">
            <div className="flex gap-2 justify-center mb-6 bg-white/5 px-6 py-4 rounded-full">
                {[1,2,3].map((i) => (
                    <motion.div 
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 h-2 bg-pink-500 rounded-full"
                    />
                ))}
            </div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] text-pink-500 uppercase tracking-widest"
            >
                Initializing Axis Gateway...
            </motion.p>
        </div>
    </motion.div>
);

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
      className={`relative border border-white/10 bg-[#0a0a0a] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(236, 72, 153, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- 2. SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#020202]">
      {/* Background: Subtle Data Streams */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.08),transparent_60%)]" />
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    System Operational • TCRA Compliant
                </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                Talk to Everyone.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500">
                    Instantly.
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
                The enterprise gateway for mass communication. 
                Orchestrate SMS, WhatsApp, and USSD from a single, military-grade command center.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                    href="/axis/login" 
                    target="_blank"
                    className="px-10 py-5 bg-white text-black font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 group"
                >
                    Open Console <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-10 py-5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-full transition-all text-sm uppercase tracking-widest">
                    Documentation
                </button>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const TrustedInfrastructure = () => (
    <section className="py-12 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-10">
                Direct Interconnects Established With
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                {[
                    "https://storage.googleapis.com/sakura-web/partners/m-pesa-logo.png",
                    "https://storage.googleapis.com/sakura-web/partners/airtel-logo.png",
                    "https://storage.googleapis.com/sakura-web/partners/crdb-logo.png",
                    "https://storage.googleapis.com/sakura-web/partners/selcom-logo.png",
                    "https://storage.googleapis.com/sakura-web/partners/yas-logo.png"
                ].map((logo, i) => (
                    <div key={i} className="relative h-8 w-24 md:h-12 md:w-32 hover:scale-110 transition-transform cursor-help">
                        <Image 
                            src={logo} 
                            alt="Partner" 
                            fill 
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const WhyAxis = () => (
    <section className="py-32 px-6 bg-[#020202]">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                    Fragmentation is the enemy of <br/>
                    <span className="text-pink-500">Effective Communication.</span>
                </h2>
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light">
                    <p>
                        Your customers are scattered. Some live on WhatsApp. Others rely on SMS. 
                        Trying to manage these channels separately is operational suicide.
                    </p>
                    <p className="text-white font-medium">
                        Axis unifies the chaos.
                    </p>
                    <p>
                        One API to reach them all. One dashboard to visualize the data. 
                        Zero compromise on delivery speed or reliability.
                    </p>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const ChannelOrchestration = () => (
    <section className="py-32 px-6 bg-[#050505] overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <div className="inline-block px-3 py-1 border border-pink-500/30 rounded-full text-pink-400 text-[10px] font-bold uppercase tracking-widest mb-6 bg-pink-500/5">
                    Orchestration Engine
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                    Multi-Channel.<br/>Single Logic.
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Define your message once. Let Axis determine the optimal path to delivery based on user preference and network availability.
                </p>
                <ul className="space-y-4">
                    {[
                        "WhatsApp: For rich media, PDFs, and high engagement.",
                        "SMS: For critical alerts and universal reach (99% Open Rate).",
                        "USSD: For interactive menus and secure banking.",
                        "Failover Logic: Auto-retry via SMS if WhatsApp fails."
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                            <div className="mt-1 w-4 h-4 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
                                <CheckCircle2 size={10} />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>
            </ScrollReveal>

            {/* Visual: The Hub */}
            <ScrollReveal delay={0.2}>
                <div className="relative h-[450px] bg-[#020202] rounded-3xl border border-white/10 p-8 flex flex-col justify-center items-center shadow-2xl">
                    {/* Center Core */}
                    <div className="relative z-20 bg-white text-black w-24 h-24 rounded-2xl flex items-center justify-center font-black text-xl shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                        AXIS
                    </div>
                    
                    {/* Orbiting Satellites */}
                    <div className="absolute inset-0">
                         {/* Ring 1 */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full animate-[spin_10s_linear_infinite]">
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 bg-[#0a0a0a] border border-pink-500/50 p-2 rounded-lg text-pink-500"><MessageCircle size={16}/></div>
                         </div>

                         {/* Ring 2 */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-[spin_15s_linear_infinite_reverse]">
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 bg-[#0a0a0a] border border-blue-500/50 p-2 rounded-lg text-blue-500"><Smartphone size={16}/></div>
                         </div>
                    </div>

                    <div className="absolute bottom-8 text-[10px] text-slate-500 font-mono">
                        ROUTING_ALGORITHM :: ACTIVE
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const UseCases = () => (
    <section className="py-32 px-6 bg-[#020202]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Built for Scale</h2>
                        <p className="text-slate-500">From startups to SACCOs, Axis adapts.</p>
                    </div>
                    <Link href="/axis/login" className="text-pink-500 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                        Deploy Now <ArrowRight size={18} />
                    </Link>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { 
                        title: "Financial Institutions", 
                        desc: "Send OTPs, transaction alerts, and loan reminders with banking-grade security.",
                        icon: Lock 
                    },
                    { 
                        title: "Logistics & Delivery", 
                        desc: "Automated delivery updates via WhatsApp with location maps and driver details.",
                        icon: Globe 
                    },
                    { 
                        title: "Retail & Marketing", 
                        desc: "Mass broadcast promotional offers. Segment users by behavior and spend.",
                        icon: Sparkles 
                    },
                    { 
                        title: "Education", 
                        desc: "Exam results and fee balances sent directly to parent phones via SMS.",
                        icon: Users 
                    },
                    { 
                        title: "Community & Govt", 
                        desc: "Public service announcements and emergency alerts to millions in seconds.",
                        icon: Server 
                    },
                    { 
                        title: "Developers", 
                        desc: "Clean REST APIs. Webhooks for delivery reports. SDKs for Node and Python.",
                        icon: Hash 
                    }
                ].map((u, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="p-8 rounded-sm h-full hover:border-pink-500/30 transition-colors">
                            <u.icon className="text-white mb-6" size={24} />
                            <h3 className="text-lg font-bold text-white mb-3">{u.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{u.desc}</p>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const TechnicalSpecs = () => (
    <section className="py-24 px-6 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {[
                    { l: "Uptime SLA", v: "99.95%" },
                    { l: "Throughput", v: "500 SMS/s" },
                    { l: "Global Reach", v: "190+ Countries" },
                    { l: "Latency", v: "< 200ms" },
                ].map((s, i) => (
                    <div key={i} className="text-center py-8 md:py-0">
                        <div className="text-4xl font-black text-white mb-2 font-mono">{s.v}</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.l}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Pricing = () => (
    <section className="py-32 px-6 bg-[#020202]">
        <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-6">Transparent Utility Pricing</h2>
                <p className="text-slate-400 mb-16 max-w-2xl mx-auto">
                    No setup fees. No monthly contracts. You pay for what you consume.
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* STANDARD */}
                    <div className="p-10 rounded-sm bg-[#0a0a0a] border border-white/10 flex flex-col items-center hover:border-white/20 transition-colors">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Transactional SMS</div>
                        <div className="text-6xl font-black text-white mb-2 tracking-tighter">25 <span className="text-lg font-normal text-slate-500">TZS</span></div>
                        <div className="text-slate-500 text-sm mb-8">Per Message Segment</div>
                        <ul className="space-y-4 text-left w-full mb-10 border-t border-white/5 pt-8">
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-emerald-500"/> Instant Delivery</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-emerald-500"/> Sender ID Included</li>
                            <li className="flex items-center gap-3 text-slate-300 text-sm"><CheckCircle2 size={16} className="text-emerald-500"/> API Access</li>
                        </ul>
                        <Link href="/axis/login" className="w-full py-4 bg-white/5 text-white font-bold rounded-sm hover:bg-white/10 transition-colors text-sm uppercase tracking-widest">
                            Create Account
                        </Link>
                    </div>

                    {/* ENTERPRISE */}
                    <div className="p-10 rounded-sm bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-pink-500/30 flex flex-col items-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/20 blur-[50px] group-hover:bg-pink-500/30 transition-colors" />
                        
                        <div className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-4">Volume / Enterprise</div>
                        <div className="text-5xl font-black text-white mb-2 tracking-tighter">Custom</div>
                        <div className="text-slate-500 text-sm mb-8">Tailored Rate Cards</div>
                        <ul className="space-y-4 text-left w-full mb-10 border-t border-white/5 pt-8">
                            <li className="flex items-center gap-3 text-white text-sm"><CheckCircle2 size={16} className="text-pink-500"/> Dedicated Account Manager</li>
                            <li className="flex items-center gap-3 text-white text-sm"><CheckCircle2 size={16} className="text-pink-500"/> Post-paid Billing</li>
                            <li className="flex items-center gap-3 text-white text-sm"><CheckCircle2 size={16} className="text-pink-500"/> SLA Guarantees</li>
                        </ul>
                        <button className="w-full py-4 bg-pink-600 text-white font-bold rounded-sm hover:bg-pink-500 transition-colors text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-[#020202]">
        <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 p-12 md:p-24 rounded-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
            <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                    Ready to Broadcast?
                </h2>
                <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto">
                    Join the leading businesses in Tanzania using Axis to connect with their audience.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/axis/login" className="px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        Get Started <ArrowRight size={20} />
                    </Link>
                </div>
                <p className="mt-8 text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                    Secure • Scalable • Simple
                </p>
            </ScrollReveal>
        </div>
    </section>
);

export default function AxisPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-pink-500 selection:text-white cursor-default">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <TrustedInfrastructure />
            <WhyAxis />
            <ChannelOrchestration />
            <UseCases />
            <TechnicalSpecs />
            <Pricing />
            <CTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
