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
  Globe // Added this import
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED UNBOUND COMPONENTS ---

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

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#111827] flex items-center justify-center"
    >
        <div className="text-center w-64">
            <div className="flex justify-between text-xs font-mono text-yellow-500 uppercase tracking-widest mb-2">
                <span>Origin</span>
                <span>In Transit</span>
                <span>Dest</span>
            </div>
            <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-yellow-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </div>
            <motion.div 
                className="mt-4 font-mono text-xs text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Optimizing Routes...
            </motion.div>
        </div>
    </motion.div>
);

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
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
      {/* Background: City Skyline / Traffic */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1596728080277-c93d8437d04e?q=80&w=2000&auto=format&fit=crop"
            alt="Dar es Salaam Logistics"
            fill
            className="object-cover opacity-30 grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent" />
         
         {/* Animated Radar Sweep */}
         <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(234,179,8,0.05)_60deg,transparent_60deg)] animate-[spin_4s_linear_infinite] opacity-50 w-[200vw] h-[200vw] -left-[50vw] -top-[50vw]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
            {/* Location Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
                {["Dar es Salaam", "Arusha", "Mwanza", "Dodoma", "Mbeya", "Kilimanjaro"].map((city) => (
                    <span key={city} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {city}
                    </span>
                ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.1] max-w-4xl">
                Trusted City-Courier & <br/>
                <span className="text-yellow-500">Document Delivery.</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-12 border-l-4 border-yellow-500 pl-6">
                Same-day urban delivery, confidential document movement, and clearing & forwarding support — operated by a verified, professional logistics team.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Link href="/#contact" className="px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-[#111827] font-bold rounded-sm transition-all hover:scale-105 flex items-center gap-2 clip-path-slant">
                    Request a Pickup <Truck size={20} />
                </Link>
                <button className="px-10 py-5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-sm transition-all">
                    Talk to Operations
                </button>
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const TrustCards = () => (
    <section className="py-24 px-6 bg-[#111827] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: "Reliable by Design", desc: "Time-window delivery & dispatch control.", icon: Clock },
                { title: "Confidential", desc: "Sealed transfers & identity-verified staff.", icon: Lock },
                { title: "Enterprise Ready", desc: "Accounts, recurring routes & reporting.", icon: Building2 },
                { title: "Critical Movement", desc: "We move business material, not casual errands.", icon: ShieldCheck },
            ].map((c, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                    <SpotlightCard className="p-8 h-full bg-[#1f2937] border-l-2 border-l-yellow-500/0 hover:border-l-yellow-500 transition-all rounded-r-xl">
                        <c.icon className="text-yellow-500 mb-6" size={32} />
                        <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
                    </SpotlightCard>
                </ScrollReveal>
            ))}
        </div>
    </section>
);

const Services = () => (
    <section className="py-32 px-6 bg-[#18212f]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <h2 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-16 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"/>
                    Operational Capabilities
                </h2>
            </ScrollReveal>

            <div className="space-y-4">
                {[
                    { 
                        title: "Urban Courier Delivery", 
                        for: "Offices, Agencies, Banks",
                        desc: "Fast when needed. Precise always.",
                        action: "Book Delivery",
                        icon: Navigation
                    },
                    { 
                        title: "Confidential Documents", 
                        for: "Sensitive Transfers",
                        desc: "Sealed-package policy with chain-of-custody logs.",
                        action: "Request Secure Transfer",
                        icon: FileText
                    },
                    { 
                        title: "Clearing & Forwarding", 
                        for: "Import / Export Support",
                        desc: "Document coordination across terminals & offices.",
                        action: "Speak to Desk",
                        icon: Globe
                    }
                ].map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="group relative bg-[#111827] border border-white/5 p-8 md:p-12 hover:border-yellow-500/50 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 bg-[#1f2937] flex items-center justify-center text-slate-400 group-hover:text-yellow-500 transition-colors shrink-0">
                                        <s.icon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{s.title}</h3>
                                        <div className="flex items-center gap-2 text-yellow-500/80 font-mono text-xs uppercase tracking-widest mb-4">
                                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                                            {s.for}
                                        </div>
                                        <p className="text-slate-400 max-w-xl">{s.desc}</p>
                                    </div>
                                </div>
                                <button className="px-8 py-4 border border-white/10 text-white font-bold hover:bg-yellow-500 hover:text-[#111827] hover:border-yellow-500 transition-all whitespace-nowrap">
                                    {s.action}
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Process = () => (
    <section className="py-32 px-6 bg-[#111827]">
        <div className="max-w-5xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Simple Operational Flow</h2>
                    <p className="text-slate-400">Every movement is recorded. Every hand-off is confirmed.</p>
                </div>
            </ScrollReveal>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-white/10 md:left-1/2 md:-ml-px" />

                {[
                    "Submit pickup request",
                    "Courier assigned & verified",
                    "Secure pickup + Custody Seal",
                    "Routed delivery with logs",
                    "Proof-of-delivery issued"
                ].map((step, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                            {/* Dot */}
                            <div className="absolute left-0 md:left-1/2 -ml-[5px] w-[10px] h-[10px] bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)] z-10" />
                            
                            <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                <div className="inline-block px-4 py-2 bg-[#1f2937] border border-white/10 rounded text-slate-200 font-bold hover:border-yellow-500/50 transition-colors cursor-default">
                                    <span className="text-yellow-500 mr-3 font-mono">0{i + 1}</span>
                                    {step}
                                </div>
                            </div>
                            <div className="flex-1 hidden md:block" />
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Industries = () => (
    <section className="py-24 px-6 bg-[#18212f] border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-3xl font-bold text-white mb-12">Industries We Serve</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        "Finance & Banking", "Legal Offices", "Government Agencies",
                        "Healthcare & Labs", "Tech Startups", "Engineering", "Importers"
                    ].map((tag) => (
                        <span key={tag} className="px-6 py-3 bg-[#111827] border border-white/5 text-slate-300 hover:text-yellow-500 hover:border-yellow-500/50 transition-all cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="mt-10 text-slate-500 font-mono text-sm uppercase tracking-widest">
                    If your work depends on trust — your deliveries should too.
                </p>
            </ScrollReveal>
        </div>
    </section>
);

const TrustSignals = () => (
    <section className="py-20 px-6 bg-[#111827]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
                "Trained Riders", "Service Guarantees", "Insurance Aware", "Code of Conduct"
            ].map((sig, i) => (
                <ScrollReveal key={i}>
                    <div className="p-4 border border-white/5 bg-white/5">
                        <CheckCircle2 className="text-yellow-500 mx-auto mb-3" size={20} />
                        <span className="text-white font-bold text-sm uppercase tracking-wider">{sig}</span>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-yellow-500 text-[#111827]">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-4xl md:text-6xl font-black mb-8">
                    MOVE WITH CONFIDENCE.
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="px-12 py-5 bg-[#111827] text-white font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
                        Request Pickup
                    </button>
                    <button className="px-12 py-5 border-2 border-[#111827] text-[#111827] font-bold text-lg hover:bg-[#111827]/10 transition-colors">
                        Contact Operations
                    </button>
                </div>
                <p className="mt-8 text-[#111827]/60 font-mono uppercase tracking-widest text-sm font-bold">
                    Built for businesses that cannot afford uncertainty.
                </p>
            </ScrollReveal>
        </div>
    </section>
);

export default function LogisticsPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#111827] text-white selection:bg-yellow-500 selection:text-black cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <TrustCards />
            <Services />
            <Process />
            <Industries />
            <TrustSignals />
            <CTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
