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
  PieChart,
  Workflow
} from "lucide-react";

// --- SHARED COMPONENTS (Reuse these to keep consistency) ---

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
          alt="Sakura CRM Dashboard"
          fill
          className="object-cover opacity-20 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full text-center md:text-left">
        <motion.div style={{ opacity, y }}>
          <span className="inline-block py-1 px-3 border border-emerald-500/30 bg-emerald-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-emerald-500 mb-8">
            Business OS v4.0
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            THE BRAIN OF<br/>
            YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">BUSINESS.</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-start">
             <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
               Stop juggling Excel, WhatsApp, and invoices. Manage your leads, projects, finances, and support tickets in 
               <span className="text-white font-medium"> one secure, localized dashboard.</span>
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
                    <h2 className="text-3xl font-bold text-white mb-4">Why Sakura CRM?</h2>
                    <p className="text-slate-400 max-w-2xl">
                        A fully white-labeled solution tailored for Tanzanian operations. 
                        Multi-currency support (TZS/USD), automated recurring invoices, and contract management.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Lead to Cash", icon: LayoutDashboard, desc: "Track a customer from first contact to final payment. Visualize your sales funnel." },
                    { title: "Smart Invoicing", icon: CreditCard, desc: "Send professional estimates and invoices. Auto-reminders for overdue payments." },
                    { title: "Project Command", icon: CheckSquare, desc: "Assign tasks, track billable hours, and share milestones with clients." },
                    { title: "Support Desk", icon: LifeBuoy, desc: "Built-in ticketing system. Never lose a customer complaint in email threads again." },
                    { title: "Customer Portal", icon: Users, desc: "Give clients a login to view their own invoices, contracts, and project status." },
                    { title: "Contract Signing", icon: Workflow, desc: "Digital e-signatures for contracts. Legally binding and paperless." },
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

const VisualShowcase = () => (
    <section className="py-24 px-6 bg-[#020202] overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <div className="relative aspect-[16/10] bg-[#111] rounded-lg border border-white/10 overflow-hidden shadow-2xl group">
                    <Image 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                        alt="CRM Interface"
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    {/* Floating Stats */}
                    <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md p-4 rounded border border-emerald-500/30">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Revenue This Month</p>
                        <p className="text-2xl font-mono font-bold text-emerald-400">TZS 14.5M</p>
                    </div>
                </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
                <h2 className="text-4xl font-bold text-white mb-6">Stop Chasing Payments.</h2>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center flex-shrink-0 text-emerald-500">
                            <PieChart size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Automated Dunning</h3>
                            <p className="text-slate-400 text-sm">The system automatically follows up on unpaid invoices via Email and SMS (Axis Integrated).</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-900/20 flex items-center justify-center flex-shrink-0 text-blue-500">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Staff Productivity</h3>
                            <p className="text-slate-400 text-sm">See exactly who is working on what. Track time on tasks and generate productivity reports.</p>
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
      <VisualShowcase />
      
      {/* CTA Section */}
      <section className="py-40 text-center px-6 border-t border-white/5 bg-[#050505]">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">ORGANIZE THE CHAOS.</h2>
              <p className="text-slate-400 mb-12 text-lg">
                  Join 50+ Tanzanian companies using Sakura CRM to streamline their operations.
              </p>
              <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all rounded-sm shadow-2xl">
                  Get Your License
              </Link>
          </div>
      </section>
    </main>
  );
}
