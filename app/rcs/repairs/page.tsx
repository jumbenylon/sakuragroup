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
  Stethoscope, 
  Activity, 
  Search, 
  Wrench, 
  PaintBucket, 
  ShieldAlert, 
  BarChart3,
  ClipboardList,
  CheckCircle2,
  Home
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

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
      className={`relative border border-white/10 bg-[#0B1120] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15), 
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

const ConstructionSubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Roof Restoration", href: "/rcs" },
    { label: "Waterproofing", href: "/rcs/waterproofing" },
    { label: "Installation", href: "/rcs/installation" },
    { label: "Outdoor Cleaning", href: "/rcs/cleaning" },
    { label: "Construction", href: "/rcs/construction" },
    { label: "Repairs", href: "/rcs/repairs" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#0B1120]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.label === 'Repairs' ? 'text-purple-500' : 'text-slate-400 hover:text-white'}`}
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
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#0B1120] overflow-hidden">
      {/* Diagnostic Grid Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf605_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf605_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-950/30 border border-purple-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Stethoscope size={14} className="text-purple-500" />
             <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Asset Health & Diagnostics</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            PREVENT THE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                BREAKDOWN.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light border-l-4 border-purple-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
             Repairs shouldn’t be reactive. We provide structured maintenance and precision repairs that catch small issues before they become structural failures.
             <span className="block mt-2 text-white font-medium">Protect your property value.</span>
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-purple-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-purple-500 transition-colors shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                Request Inspection
            </Link>
            <Link href="#programs" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Maintenance Plans
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const CommonIssues = () => (
  <section className="py-24 px-6 bg-[#0f172a] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Common Pathologies</h2>
          <p className="text-slate-400 text-lg">We diagnose and treat the root cause, not just the symptom.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Cracks & Fissures", icon: <Activity />, desc: "Structural movement or plaster failure." },
          { label: "Damp Walls", icon: <ShieldAlert />, desc: "Rising damp or plumbing leaks." },
          { label: "Paint Failure", icon: <PaintBucket />, desc: "Peeling, bubbling due to moisture." },
          { label: "Roof Leaks", icon: <Wrench />, desc: "Loose fasteners or sheet decay." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-6 h-full text-center hover:border-purple-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-purple-400 group-hover:bg-purple-400/10 transition-colors">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-2">{item.label}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CostLogic = () => (
  <section className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-8">
          The Cost of <br/>
          <span className="text-purple-500">Neglect.</span>
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Maintenance is cheap. Replacement is expensive.
          <br/><br/>
          A small leak ($50 fix) ignored for 6 months becomes a structural rot issue ($5,000 fix). Our goal is to keep you on the left side of the cost curve.
        </p>
        
        <div className="flex gap-4">
           <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
              <span className="block text-2xl font-bold text-emerald-400 mb-1">10x</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Savings via Prevention</span>
           </div>
           <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
              <span className="block text-2xl font-bold text-purple-400 mb-1">100%</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Asset Visibility</span>
           </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="relative aspect-square md:aspect-video bg-[#080d1a] border border-white/10 rounded-sm p-8 flex items-end justify-between">
           {/* Abstract Bar Chart Visualization */}
           <div className="w-[30%] h-[20%] bg-emerald-500/20 border-t-2 border-emerald-500 relative group">
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">Maintenance</div>
           </div>
           <div className="w-[30%] h-[50%] bg-yellow-500/20 border-t-2 border-yellow-500 relative group">
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-mono text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">Repair</div>
           </div>
           <div className="w-[30%] h-[90%] bg-red-500/20 border-t-2 border-red-500 relative group">
              <div className="absolute -top-8 left-0 right-0 text-center text-xs font-mono text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Replacement</div>
           </div>
           
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
        </div>
        <p className="text-center text-xs text-slate-600 mt-4 font-mono uppercase">Relative Cost over 5 Years</p>
      </ScrollReveal>
    </div>
  </section>
);

const Programs = () => (
  <section id="programs" className="py-32 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">Engagement Models</h2>
          <p className="text-slate-500 text-sm mt-2">Flexible options for homeowners and estate managers.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* Reactive */}
           <div className="p-8 border border-white/10 bg-[#0B1120] rounded-sm group hover:border-white/30 transition-all">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-xl font-bold text-white">Repair & Restore</h3>
                    <p className="text-purple-400 text-xs uppercase tracking-widest mt-1">One-Off Project</p>
                 </div>
                 <Wrench className="text-slate-500" />
              </div>
              <ul className="space-y-4 mb-8">
                 <li className="text-slate-400 text-sm flex gap-3"><CheckCircle2 size={16} className="text-white" /> Fix structural issues</li>
                 <li className="text-slate-400 text-sm flex gap-3"><CheckCircle2 size={16} className="text-white" /> Leak & crack sealing</li>
                 <li className="text-slate-400 text-sm flex gap-3"><CheckCircle2 size={16} className="text-white" /> Repainting & finishing</li>
              </ul>
              <Link href="/contact" className="block w-full py-3 text-center border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                 Request Fix
              </Link>
           </div>

           {/* Preventive */}
           <div className="p-8 border border-purple-500/30 bg-[#0f172a] rounded-sm relative overflow-hidden group hover:border-purple-500 transition-all">
              <div className="absolute top-0 right-0 p-2 bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                 Best Value
              </div>
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-xl font-bold text-white">Annual Health Check</h3>
                    <p className="text-purple-400 text-xs uppercase tracking-widest mt-1">Preventive Retainer</p>
                 </div>
                 <ShieldAlert className="text-purple-500" />
              </div>
              <ul className="space-y-4 mb-8">
                 <li className="text-slate-400 text-sm flex gap-3"><CheckCircle2 size={16} className="text-purple-500" /> Annual structural audit</li>
                 <li className="text-slate-400 text-sm flex gap-3"><CheckCircle2 size={16} className="text-purple-500" /> Priority emergency response</li>
                 <li className="text-slate-400 text-sm flex gap-3"><CheckCircle2 size={16} className="text-purple-500" /> Detailed condition report</li>
              </ul>
              <Link href="/contact" className="block w-full py-3 text-center bg-purple-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20">
                 Start Plan
              </Link>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Diagnostic Workflow</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-4 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10" />

        {[
          { step: "01", title: "Assess", desc: "Site visit & pathology ID." },
          { step: "02", title: "Scope", desc: "Solution design & quote." },
          { step: "03", title: "Execute", desc: "Repair work with supervision." },
          { step: "04", title: "Report", desc: "Before/After logs & warranty." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative group p-4 pt-8 bg-[#0B1120] hover:bg-white/5 transition-all border-t-2 border-transparent hover:border-purple-500">
              <div className="w-8 h-8 bg-[#0B1120] border border-white/20 rounded-full flex items-center justify-center text-slate-500 font-mono text-xs font-bold mb-4 relative z-10 group-hover:border-purple-500 group-hover:text-purple-500 transition-colors">
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
      
      <div className="text-center mt-12">
         <p className="text-xs font-mono text-purple-500 uppercase tracking-widest flex items-center justify-center gap-2">
            <ClipboardList size={14} /> Full Transparency. Photo & Work Logs provided.
         </p>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#050912] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          PROTECT YOUR<br/>INVESTMENT.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Small issues become big invoices. Let’s catch them early.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-purple-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-purple-500 transition-all shadow-2xl">
            Book Inspection
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Maintenance Plan
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function RepairsPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-purple-500 selection:text-black font-sans cursor-none">
      <GlobalNavbar />
      <ConstructionSubNav />
      
      <Hero />
      <CommonIssues />
      <CostLogic />
      <Programs />
      <Process />
      <CTA />
      
      <GlobalFooter />
    </main>
  );
}