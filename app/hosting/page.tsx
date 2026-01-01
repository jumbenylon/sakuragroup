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
  ArrowRight, Server, ShieldCheck, Globe, 
  Mail, Database, Terminal, Cpu, Clock, 
  CheckCircle2, CloudLightning, LifeBuoy, MoveRight 
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center"
    >
        <div className="text-center">
            <div className="flex justify-center gap-2 mb-6">
                {[1,2,3].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-3 h-3 bg-blue-500 rounded-full"
                    />
                ))}
            </div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-blue-500 uppercase tracking-widest"
            >
                Allocating Resources...
            </motion.p>
        </div>
    </motion.div>
);

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
      className={`relative border border-white/10 bg-[#0B1120] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
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
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#020617]">
      {/* Background: Abstract Server Rack */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1558494949-efc535b5c4c1?q=80&w=2000&auto=format&fit=crop"
            alt="Server Infrastructure"
            fill
            className="object-cover opacity-20"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-blue-500/30 bg-blue-500/10 rounded-full mb-8 backdrop-blur-md">
                <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-75" />
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse delay-150" />
                </div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                    System Operational • TZ Node Active
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
                Enterprise-Grade Hosting.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                    Built for Tanzania.
                </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
                Domains, secure hosting, business email and managed website services — powered by 99.99% uptime infrastructure in Tanzania & Europe.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <a href="https://billing.sakurahost.co.tz" target="_blank" className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.3)] flex items-center gap-2">
                    Open Billing Portal <ArrowRight size={20} />
                </a>
                <button className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
                    View Services
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12 max-w-5xl mx-auto">
                {[
                    { label: "Businesses Hosted", val: "1,000+" },
                    { label: "Uptime SLA", val: "99.99%" },
                    { label: "Support", val: "24/7/365" },
                    { label: "Migration", val: "Free" },
                ].map((s, i) => (
                    <div key={i} className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{s.val}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest">{s.label}</div>
                    </div>
                ))}
            </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Positioning = () => (
    <section className="py-24 px-6 bg-[#020617] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    Confidence for businesses that <span className="text-blue-500">can’t afford downtime.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-12">
                    SakuraHost powers mission-critical websites, systems, and applications for organizations across Tanzania — from banks and logistics companies to agencies, startups and professional services.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                    {[
                        "99.99% Availability — Monitored Infrastructure",
                        "Enterprise-Ready — Mirrored TZ + EU Regions",
                        "Security-First — SSL, Backups, Isolation",
                        "Human Support — Engineers, Not Bots"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
                            <span className="text-slate-200 text-sm font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const ServicesSnapshot = () => (
    <section className="py-32 px-6 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">Everything your business needs.</h2>
                    <p className="text-slate-400">One hosting environment. Zero complexity.</p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Business Hosting", desc: "NVMe storage, isolation, and backups. Optimized for corporate portals.", icon: Server },
                    { title: "Domain Management", desc: "Secure registration & renewals for local (.co.tz) and global domains.", icon: Globe },
                    { title: "Business Email", desc: "Secure, spam-protected professional email with high deliverability.", icon: Mail },
                    { title: "Managed Services", desc: "From new builds to maintenance. We handle the technical load.", icon: Database },
                ].map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="p-8 rounded-2xl h-full flex flex-col hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                                <s.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed flex-grow">{s.desc}</p>
                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a href="https://billing.sakurahost.co.tz" className="text-xs font-bold text-blue-400 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                                    Configure <ArrowRight size={12} />
                                </a>
                            </div>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Infrastructure = () => (
    <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
        {/* World Map / Network Abstract Background */}
        <div className="absolute inset-0 z-0 opacity-10">
             <Image 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
                alt="Global Network"
                fill
                className="object-cover grayscale"
             />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10 items-center">
            <ScrollReveal>
                <div className="inline-block px-3 py-1 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 bg-[#020617]/80">
                    SLA Backed Guarantee
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Infrastructure you can trust.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    Our hosting environment is architected for resilience and continuity, with redundant infrastructure in Tanzania and Europe, continuous monitoring, and disciplined operational standards.
                </p>
                <ul className="space-y-4">
                    {[
                        "Dual-Region Deployment (TZ + EU)",
                        "Automated Daily Backups",
                        "DDoS Mitigation & Isolation",
                        "Hardened Security Policies"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                            <ShieldCheck className="text-blue-500" size={18} />
                            {item}
                        </li>
                    ))}
                </ul>
            </ScrollReveal>

            {/* Uptime Visualizer */}
            <ScrollReveal delay={0.2}>
                <div className="bg-[#0B1120]/90 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <div className="text-sm text-slate-400 uppercase tracking-widest">System Status</div>
                            <div className="text-3xl font-bold text-green-500">Operational</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-slate-400 uppercase tracking-widest">Uptime (30 Days)</div>
                            <div className="text-3xl font-bold text-white">100.00%</div>
                        </div>
                    </div>
                    {/* Fake Server Bars */}
                    <div className="space-y-4">
                        {[
                            { name: "Dar es Salaam (TZ-01)", ping: "2ms" },
                            { name: "Frankfurt (EU-01)", ping: "140ms" },
                            { name: "Database Cluster", ping: "Active" },
                            { name: "Email Relay", ping: "Active" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-white font-mono text-sm">{s.name}</span>
                                </div>
                                <span className="text-slate-500 font-mono text-xs">{s.ping}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const Migration = () => (
    <section className="py-24 px-6 bg-[#0B1120] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                    <MoveRight size={32} className="text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">Move to SakuraHost — Zero Downtime.</h2>
                <p className="text-slate-400 text-lg mb-10">
                    Whether your systems are hosted locally or abroad, our engineering team manages the entire migration process — securely, carefully, and at no additional cost.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs font-mono uppercase tracking-widest text-blue-400">
                    <span>1. Assessment</span>
                    <span className="text-slate-600">→</span>
                    <span>2. Planning</span>
                    <span className="text-slate-600">→</span>
                    <span>3. Transfer</span>
                    <span className="text-slate-600">→</span>
                    <span>4. Go-Live</span>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const DevSection = () => (
    <section className="py-32 px-6 bg-[#020617]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <div className="rounded-xl overflow-hidden bg-[#0B1120] border border-white/10 shadow-2xl font-mono text-sm">
                    <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div className="ml-auto text-xs text-slate-500">admin@sakurahost: ~</div>
                    </div>
                    <div className="p-6 text-slate-300 space-y-2">
                        <div><span className="text-green-500">➜</span> ssh admin@s1.sakurahost.co.tz</div>
                        <div className="text-slate-500">Authenticating public key "id_rsa"...</div>
                        <div className="text-white">Welcome to SakuraHost Enterprise Linux 8.</div>
                        <br/>
                        <div><span className="text-green-500">➜</span> uptime</div>
                        <div className="text-white"> 14:32:01 up 412 days, 4:12,  1 user,  load average: 0.01, 0.04, 0.05</div>
                        <br/>
                        <div><span className="text-green-500">➜</span> git pull origin production</div>
                        <div className="text-slate-500">remote: Enumerating objects: 15, done.</div>
                        <div className="text-white">Updating 4a1b2c..8d9e0f</div>
                        <div className="text-green-500">Fast-forward</div>
                        <div className="animate-pulse">_</div>
                    </div>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="inline-flex items-center gap-2 mb-6 text-blue-500">
                    <Terminal size={20} />
                    <span className="font-mono text-xs uppercase tracking-widest">Engineering Grade</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                    Built for developers.<br/>Approved by IT.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                    We don't lock you out. Get full control with SSH, SFTP, and staging environments. CI/CD friendly and API ready for modern workflows.
                </p>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        "SSH / SFTP Access", "Staging Workflows",
                        "Git Integration", "Performance Logs"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-white font-mono text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            {item}
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const Support = () => (
    <section className="py-24 px-6 bg-[#0B1120]">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                    <LifeBuoy size={32} />
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">A-Grade Support</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                    No ticket loops. No copy-paste replies. You speak to real engineers who understand your business and care about outcomes.
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-400 font-mono text-sm">
                    <Clock size={16} /> Average Response Time: &lt; 15 Mins
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-gradient-to-b from-[#020617] to-[#0B1120] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-5xl font-bold text-white mb-8">Ready for hosting without uncertainty?</h2>
                <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                    Start, migrate, or expand your hosting environment with confidence.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a href="https://billing.sakurahost.co.tz" target="_blank" className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-blue-600 text-white font-bold text-xl rounded-full hover:bg-blue-500 transition-all hover:scale-105 shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                        Open Billing Portal <ArrowRight size={24} />
                    </a>
                    <button className="inline-flex items-center justify-center gap-3 px-12 py-6 border border-white/10 text-white font-bold text-xl rounded-full hover:bg-white/5 transition-all">
                        Contact Support
                    </button>
                </div>
                <p className="mt-8 text-xs text-slate-600 font-mono uppercase tracking-widest">
                    Hosting engineered for reliability.
                </p>
            </ScrollReveal>
        </div>
    </section>
);

export default function SakuraHostPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500 selection:text-white cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <Positioning />
            <ServicesSnapshot />
            <Infrastructure />
            <Migration />
            <DevSection />
            <Support />
            <CTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
