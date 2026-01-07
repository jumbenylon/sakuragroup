"use client";

import React from "react";
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
  LayoutDashboard, 
  Users, 
  CreditCard, 
  CheckSquare, 
  LifeBuoy, 
  ArrowRight, 
  QrCode,
  Workflow,
  Briefcase,
  Calculator,
  Landmark,
  Cloud,
  ServerOff
} from "lucide-react";

// --- SHARED COMPONENTS ---

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
      onMouseMove={handleMouseMove}
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group ${className}`}
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

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 bg-[#050505] overflow-hidden">
      {/* VISUAL: Dashboard Abstract */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
          alt="Sakura ERP Dashboard"
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full text-center md:text-left">
        <motion.div style={{ opacity, y }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 rounded-full mb-8 backdrop-blur-md">
            <Cloud size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
              Cloud Hosted • No Device Needed
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            RUN YOUR BUSINESS<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">NOT YOUR SERVERS.</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-start">
             <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
               A complete ERP system for Tanzanian business. 
               Handle <strong>TRA VFD Receipts</strong>, Payroll, Finance, and HR in one secure cloud dashboard. 
               <span className="text-white font-medium block mt-2">Zero hardware cost. 99.9% Uptime.</span>
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="https://crm.sakuragroup.co.tz/admin/authentication" target="_blank" className="px-8 py-4 bg-emerald-600 text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.3)] text-center flex items-center justify-center gap-2">
                  Access Portal <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all rounded-sm text-center">
                  Book Demo
                </Link>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => (
    <section className="py-32 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white mb-4">The ERP Suite</h2>
                    <p className="text-slate-400 max-w-2xl">
                        Why pay for 5 different apps? Get one system that handles everything from hiring staff to filing tax returns.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "TRA VFD Ready", icon: QrCode, desc: "Issue fiscal receipts directly from your dashboard. No expensive EFD machine required. (Integration is an add-on)." },
                    { title: "HR & Payroll", icon: Users, desc: "Manage employee contracts, attendance, leave requests, and auto-generate monthly payslips." },
                    { title: "Finance & Accounting", icon: Calculator, desc: "Track expenses, profit/loss, and balance sheets. Tax-ready reports at the click of a button." },
                    { title: "Banking", icon: Landmark, desc: "Reconcile bank accounts and track cash flow in real-time. Multi-currency (TZS/USD)." },
                    { title: "Sales CRM", icon: LayoutDashboard, desc: "Visual pipeline for leads. Convert proposals to invoices instantly." },
                    { title: "Cloud Stability", icon: ServerOff, desc: "We host it. We secure it. You just log in. No servers to buy or maintain." },
                ].map((item, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
                            <item.icon className="text-emerald-500 mb-6" size={32} />
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Pricing = () => (
    <section className="py-24 px-6 bg-[#020202] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">Simple Pricing.</h2>
                    <p className="text-slate-400">Enterprise power at a startup price.</p>
                </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* One-Time Card */}
                <ScrollReveal>
                    <div className="h-full p-10 bg-[#0a0a0a] border border-white/10 rounded-2xl relative overflow-hidden flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2">System Installation</h3>
                        <p className="text-slate-400 text-sm mb-6">One-time setup fee.</p>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-sm text-slate-500">TZS</span>
                            <span className="text-5xl font-black text-white tracking-tighter">149,000</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-sm text-slate-300"><CheckSquare size={16} className="text-emerald-500" /> Database Configuration</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckSquare size={16} className="text-emerald-500" /> Brand Customization (White Label)</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckSquare size={16} className="text-emerald-500" /> Initial Staff Training</li>
                            <li className="flex gap-3 text-sm text-slate-300"><CheckSquare size={16} className="text-emerald-500" /> Secure Cloud Deployment</li>
                        </ul>
                    </div>
                </ScrollReveal>

                {/* Subscription Card */}
                <ScrollReveal delay={0.1}>
                    <div className="h-full p-10 bg-gradient-to-br from-[#0f1f18] to-[#0a0a0a] border border-emerald-500/30 rounded-2xl relative overflow-hidden flex flex-col relative group">
                        <div className="absolute top-0 right-0 p-3 bg-emerald-600 text-black font-bold text-[10px] uppercase tracking-widest">
                            Most Popular
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Monthly Subscription</h3>
                        <p className="text-slate-400 text-sm mb-6">Full ERP Access.</p>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-sm text-slate-500">TZS</span>
                            <span className="text-5xl font-black text-white tracking-tighter">49,000</span>
                            <span className="text-slate-500">/ mo</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex gap-3 text-sm text-white"><CheckSquare size={16} className="text-emerald-400" /> <strong>Unlimited</strong> Users & Leads</li>
                            <li className="flex gap-3 text-sm text-white"><CheckSquare size={16} className="text-emerald-400" /> HR, Payroll & Accounting Modules</li>
                            <li className="flex gap-3 text-sm text-white"><CheckSquare size={16} className="text-emerald-400" /> Automated Backups & Security</li>
                            <li className="flex gap-3 text-sm text-white"><CheckSquare size={16} className="text-emerald-400" /> 24/7 Local Support</li>
                        </ul>
                        <Link href="/contact" className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all rounded-sm text-center shadow-xl">
                            Start Subscription
                        </Link>
                    </div>
                </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2}>
                <div className="mt-12 p-6 bg-[#0a0a0a] border border-white/5 rounded-xl max-w-4xl mx-auto text-center">
                    <p className="text-sm text-slate-400">
                        <span className="text-emerald-500 font-bold uppercase tracking-widest mr-2">Premium Integrations:</span>
                        VFD/EFD Integration, Bulk SMS (Axis), and WhatsApp Bots are charged separately based on volume.
                    </p>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const VisualShowcase = () => (
    <section className="py-24 px-6 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <div className="relative aspect-[16/10] bg-[#111] rounded-lg border border-white/10 overflow-hidden shadow-2xl group">
                    <Image 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                        alt="ERP Interface"
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    {/* Floating Stats */}
                    <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded border border-emerald-500/30">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Receipts Issued</p>
                        <p className="text-2xl font-mono font-bold text-emerald-400">1,204 VFD</p>
                    </div>
                </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
                <h2 className="text-4xl font-bold text-white mb-6">Payroll & HR, Solved.</h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center flex-shrink-0 text-emerald-500">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Staff Management</h3>
                            <p className="text-slate-400 text-sm">Keep track of attendance, leave days, and employment contracts in one secure vault.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center flex-shrink-0 text-blue-500">
                            <Workflow size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Automated Payslips</h3>
                            <p className="text-slate-400 text-sm">Generate monthly payslips and tax reports automatically. Reduce manual HR work by 90%.</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

export default function CRMPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 font-sans">
      <Hero />
      <Features />
      <Pricing />
      <VisualShowcase />
    </main>
  );
}
