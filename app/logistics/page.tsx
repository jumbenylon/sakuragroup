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
  ArrowRight, Truck, Package, ShieldCheck, 
  MapPin, Clock, FileCheck, Building2, 
  Navigation, Lock, FileText, CheckCircle2,
  Globe, Shield, BarChart3, Zap // Added Zap to imports
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-yellow-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
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
      className={`relative border border-white/10 bg-[#1f2937] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(234, 179, 8, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- 2. PAGE SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#111827]">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1591768793355-74d7c869619a?q=80&w=2000&auto=format&fit=crop"
            alt="African professional courier in Dar es Salaam"
            fill
            className="object-cover opacity-30 grayscale contrast-125"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/90 to-transparent" />
         <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(234,179,8,0.05)_60deg,transparent_60deg)] animate-[spin_8s_linear_infinite] opacity-50 w-[200vw] h-[200vw] -left-[50vw] -top-[50vw]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-8">
                {["Dar es Salaam", "Arusha", "Mwanza", "Dodoma", "Mbeya", "Kilimanjaro"].map((city) => (
                    <span key={city} className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {city}
                    </span>
                ))}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] max-w-5xl">
                Trusted City-Courier & <br/>
                <span className="text-yellow-500">Document Delivery.</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-12 border-l-4 border-yellow-500 pl-6 font-light">
                Same-day urban delivery, confidential document movement, and clearing & forwarding support — operated by a verified, professional logistics team across Tanzania.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Link href="/#contact" className="px-12 py-6 bg-yellow-500 hover:bg-yellow-400 text-[#111827] font-black rounded-sm transition-all hover:scale-105 flex items-center gap-2">
                    Request a Pickup <Truck size={20} />
                </Link>
                <button className="px-12 py-6 border border-white/20 hover:bg-white/5 text-white font-bold rounded-sm transition-all">
                    Talk to Operations
                </button>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const TrustCards = () => (
    <section className="py-32 px-6 bg-[#111827] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
                { title: "Reliable by Design", desc: "Time-window delivery & dispatch control.", icon: Clock },
                { title: "Confidential", desc: "Sealed transfers & identity-verified staff.", icon: Lock },
                { title: "Enterprise Ready", desc: "Accounts, recurring routes & reporting.", icon: Building2 },
                { title: "Critical Movement", desc: "We move business material, not casual errands.", icon: ShieldCheck },
            ].map((c, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                    <SpotlightCard className="p-10 h-full bg-[#0f172a] border-t-2 border-t-yellow-500/10 hover:border-t-yellow-500 transition-all">
                        <c.icon className="text-yellow-500 mb-8" size={32} />
                        <h3 className="text-2xl font-bold text-white mb-4">{c.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
                    </SpotlightCard>
                </ScrollReveal>
            ))}
        </div>
    </section>
);

const Capabilities = () => (
    <section className="py-32 px-6 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="mb-20">
                    <h2 className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                        Operational Scope
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white">Advanced Supply Logistics.</h3>
                </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 relative min-h-[500px] rounded-3xl overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
                    <Image 
                        src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad21?q=80&w=1000&auto=format&fit=crop"
                        alt="African logistics hub operations"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <p className="text-white font-bold text-lg mb-2">Verified Chain of Custody</p>
                        <p className="text-slate-400 text-sm">Real-time status tracking for every document and parcel in transit.</p>
                    </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                    {[
                        { 
                            title: "Urban Courier Delivery", 
                            for: "Corporate & Private Sectors",
                            desc: "Same-day movements across city centers with time-stamped delivery logs.",
                            icon: Navigation
                        },
                        { 
                            title: "Confidential Movements", 
                            for: "Legal & Banking Institutions",
                            desc: "Strict sealed-package policies and identity-verified courier assignment.",
                            icon: FileText
                        },
                        { 
                            title: "Clearing & Forwarding", 
                            for: "Import / Export Support",
                            desc: "Document coordination and logistical support at East African ports and terminals.",
                            icon: Globe
                        }
                    ].map((s, i) => (
                        <ScrollReveal key={i} delay={i * 0.1}>
                            <div className="group bg-[#111827] border border-white/5 p-10 hover:border-yellow-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="flex items-start gap-8">
                                    <div className="w-12 h-12 bg-yellow-500/5 border border-yellow-500/20 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                                        <s.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-2">{s.title}</h4>
                                        <p className="text-yellow-500/60 font-mono text-[10px] uppercase tracking-widest mb-4">{s.for}</p>
                                        <p className="text-slate-500 text-sm leading-relaxed max-w-md">{s.desc}</p>
                                    </div>
                                </div>
                                <ArrowRight className="text-white/20 group-hover:text-yellow-500 group-hover:translate-x-2 transition-all" />
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const Industries = () => (
    <section className="py-32 px-6 bg-[#111827]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Industries We Serve</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto italic font-light">"If your work depends on trust — your deliveries should too."</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        { n: "Finance & Banking", i: BarChart3 },
                        { n: "Legal & Corporate", i: FileCheck },
                        { n: "Government Agencies", i: Building2 },
                        { n: "Healthcare & Labs", i: Shield },
                        { n: "Tech & Startups", i: Zap }, // Uses the Zap import
                        { n: "Engineering", i: Package },
                        { n: "Importers & Exporters", i: Globe }
                    ].map((tag) => (
                        <div key={tag.n} className="px-8 py-5 bg-[#0f172a] border border-white/5 text-slate-300 hover:text-yellow-500 hover:border-yellow-500/30 transition-all flex items-center gap-4 cursor-default group">
                            <tag.i size={16} className="text-slate-600 group-hover:text-yellow-500" />
                            <span className="text-sm font-bold uppercase tracking-widest">{tag.n}</span>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const FinalCTA = () => (
    <section className="py-40 px-6 bg-yellow-500 text-[#111827] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black opacity-5 pointer-events-none select-none tracking-tighter">
            LOGISTICS
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal>
                <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter">
                    MOVE WITH <br/>CONFIDENCE.
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="px-14 py-6 bg-[#111827] text-white font-black text-xl hover:scale-110 transition-transform shadow-2xl">
                        Request Pickup
                    </button>
                    <button className="px-14 py-6 border-2 border-[#111827] text-[#111827] font-black text-xl hover:bg-[#111827]/10 transition-colors">
                        Speak to Dispatch
                    </button>
                </div>
                <p className="mt-12 text-[#111827]/60 font-mono uppercase tracking-[0.4em] text-xs font-black">
                    Built for Tanzanian businesses that cannot afford uncertainty.
                </p>
            </ScrollReveal>
        </div>
    </section>
);

export default function LogisticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#111827] text-white selection:bg-yellow-500 selection:text-black">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <TrustCards />
            <Capabilities />
            <Industries />
            <FinalCTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#111827] flex items-center justify-center"
    >
        <div className="text-center w-64">
            <div className="flex justify-between text-[10px] font-mono text-yellow-500 uppercase tracking-[0.3em] mb-4">
                <span>Origin</span>
                <span className="animate-pulse text-white">Transit</span>
                <span>Dest</span>
            </div>
            <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-yellow-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </div>
            <motion.p 
                className="mt-6 font-mono text-[10px] text-slate-600 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Optimizing Route Matrix...
            </motion.p>
        </div>
    </motion.div>
);
