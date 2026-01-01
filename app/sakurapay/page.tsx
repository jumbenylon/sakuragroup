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
  ArrowRight, CreditCard, Smartphone, ShieldCheck, 
  Globe, Zap, Code, Lock, Server, CheckCircle2 
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#050a14] flex items-center justify-center"
    >
        <div className="text-center">
            <div className="flex items-center gap-2 justify-center mb-4">
                <ShieldCheck className="text-emerald-500 animate-pulse" size={32} />
            </div>
            <div className="h-1 w-32 bg-emerald-900 mx-auto rounded-full overflow-hidden">
                 <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
             </div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-emerald-500 uppercase tracking-widest mt-4"
            >
                Establishing Secure Link...
            </motion.p>
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

// --- 2. SPECIAL EFFECTS ---

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
      className={`relative border border-white/10 bg-[#0B1120] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
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

// --- 3. PAGE SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-20 overflow-hidden bg-[#050a14]">
      {/* VIDEO BACKGROUND */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
         >
             <source src="https://storage.googleapis.com/sakura-web/sakurapay-video.mp4" type="video/mp4" />
         </video>
         {/* Digital Grid Overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/80 to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8 backdrop-blur-md">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">PCI-DSS Level 1 Certified</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
            Global Reach. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">
                Local Power.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-lg mb-10">
             The unified payment gateway for Africa. Accept M-Pesa, Card, and Bank transfers through a single, secure API.
          </p>
             
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/#contact" className="group relative px-8 py-4 bg-emerald-600 text-white font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <span className="relative flex items-center gap-2">Start Integration <Code size={20}/></span>
            </Link>
            <button className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
                View Documentation
            </button>
          </div>
        </ScrollReveal>

        {/* HERO IMAGE DISPLAY */}
        <motion.div 
            style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
            className="relative hidden lg:block perspective-1000"
        >
            <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-square max-w-lg mx-auto"
            >
                {/* Glow Effect Behind Image */}
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[100px]" />
                
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sakurapay-hero.png" 
                    alt="SakuraPay Dashboard"
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    priority
                />

                {/* Floating Elements */}
                <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur text-black p-4 rounded-xl shadow-xl flex items-center gap-3 border border-white/20"
                >
                    <div className="bg-emerald-100 p-2 rounded-full"><CheckCircle2 className="text-emerald-600" size={20} /></div>
                    <div>
                        <div className="text-xs font-bold uppercase text-neutral-500">Payment Success</div>
                        <div className="font-bold text-lg">TZS 1,500,000</div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const PaymentMethods = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Accept Everything</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Don't lose a sale because of payment friction. We integrate every major mobile money wallet and card network.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { name: "M-Pesa", color: "text-red-500", bg: "bg-red-500/10" },
                    { name: "Tigo Pesa", color: "text-blue-400", bg: "bg-blue-400/10" },
                    { name: "Airtel Money", color: "text-red-400", bg: "bg-red-400/10" },
                    { name: "HaloPesa", color: "text-orange-400", bg: "bg-orange-400/10" },
                    { name: "Visa / MC", color: "text-white", bg: "bg-white/10" },
                    { name: "USSD", color: "text-emerald-400", bg: "bg-emerald-400/10" },
                    { name: "Bank Transfer", color: "text-slate-300", bg: "bg-slate-800" },
                    { name: "QR Pay", color: "text-purple-400", bg: "bg-purple-400/10" },
                ].map((m, i) => (
                    <ScrollReveal key={i} delay={i * 0.05}>
                        <div className="group flex items-center justify-center gap-3 p-6 rounded-2xl bg-[#050a14] border border-white/5 hover:border-emerald-500/30 transition-all cursor-default">
                            <div className={`w-3 h-3 rounded-full ${m.bg}`} />
                            <span className={`font-bold ${m.color}`}>{m.name}</span>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const DeveloperExperience = () => (
    <section className="py-32 px-6 bg-[#050a14] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <div className="inline-flex items-center gap-2 mb-6 text-emerald-500">
                    <Code size={20} />
                    <span className="font-mono text-xs uppercase tracking-widest">Developer First</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Integration in <br/><span className="text-emerald-500">Minutes, Not Weeks.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Our API is built by developers, for developers. Clean documentation, sandboxed environments, and SDKs for PHP, Node, Python, and Java.
                </p>
                <ul className="space-y-4 mb-8">
                    {[
                        "99.99% Uptime SLA",
                        "Real-time Webhooks",
                        "Automated Reconciliation",
                        "Sandboxed Testing Environment"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                            {item}
                        </li>
                    ))}
                </ul>
                <button className="text-emerald-400 font-bold flex items-center gap-2 hover:text-emerald-300 transition-colors">
                    Read the Docs <ArrowRight size={18} />
                </button>
            </ScrollReveal>

            {/* FAKE TERMINAL */}
            <ScrollReveal delay={0.2}>
                <div className="rounded-xl overflow-hidden bg-[#0B1120] border border-white/10 shadow-2xl font-mono text-sm">
                    <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div className="ml-auto text-xs text-slate-500">bash — 80x24</div>
                    </div>
                    <div className="p-6 text-slate-300 space-y-4">
                        <div>
                            <span className="text-emerald-500">➜</span> <span className="text-blue-400">~</span> curl https://api.sakurapay.co.tz/v1/charges \
                        </div>
                        <div className="pl-4 text-slate-400">
                            -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \<br/>
                            -d amount=25000 \<br/>
                            -d currency=tzs \<br/>
                            -d source=mpesa
                        </div>
                        <div className="text-emerald-500">
                            &#123;<br/>
                            &nbsp;&nbsp;"id": "ch_1I5j3X2eZvKYlo2C",<br/>
                            &nbsp;&nbsp;"amount": 25000,<br/>
                            &nbsp;&nbsp;"currency": "tzs",<br/>
                            &nbsp;&nbsp;"status": "succeeded"<br/>
                            &#125;
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const Security = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <ShieldCheck size={48} className="text-emerald-500 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-6">Bank-Grade Security</h2>
                <p className="text-slate-400 text-lg mb-12">
                    We process billions. Security isn't a feature; it's our foundation.
                </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "PCI-DSS Level 1", desc: "Highest standard for payment data security." },
                    { title: "256-bit Encryption", desc: "Military-grade encryption for all transactions." },
                    { title: "Fraud Detection", desc: "AI-driven monitoring to prevent chargebacks." },
                ].map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="p-8 rounded-2xl h-full bg-[#050a14]">
                            <Lock className="text-emerald-500 mb-4" size={24} />
                            <h3 className="text-white font-bold mb-2">{s.title}</h3>
                            <p className="text-sm text-slate-500">{s.desc}</p>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-emerald-900/20 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-5xl font-bold text-white mb-8">Ready to Scale?</h2>
                <p className="text-xl text-emerald-100/60 mb-12 max-w-2xl mx-auto">
                    Join over 500+ businesses across Tanzania using SakuraPay to power their growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/#contact" className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-emerald-500 text-[#050a14] font-bold text-xl rounded-full hover:bg-emerald-400 transition-all hover:scale-105 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                        Create Free Account <ArrowRight size={24} />
                    </Link>
                    <button className="inline-flex items-center justify-center gap-3 px-12 py-6 border border-white/10 text-white font-bold text-xl rounded-full hover:bg-white/5 transition-all">
                        Contact Sales
                    </button>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

export default function SakuraPayPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#050a14] text-white selection:bg-emerald-500 selection:text-black cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <PaymentMethods />
            <DeveloperExperience />
            <Security />
            <CTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
