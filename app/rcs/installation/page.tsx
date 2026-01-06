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
  Hammer, 
  Ruler, 
  Shield, 
  Wind, 
  Thermometer, 
  Warehouse, 
  Home, 
  Building, 
  CheckCircle2,
  Construction
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
      className={`relative border border-white/10 bg-[#0B1120] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
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
                ${link.label === 'Installation' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}
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
      {/* Blueprint Grid Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-950/30 border border-blue-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Hammer size={14} className="text-blue-500" />
             <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Engineered Roofing Systems</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            A STRONG ROOF TODAY<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-200">
                SAVES YOU TOMORROW.
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light border-l-4 border-blue-500 pl-6 text-left md:text-center md:border-l-0 md:pl-0">
             We design and install roofing systems with structural durability, climate-fit materials, and drainage accuracy. 
             <span className="block mt-2 text-white font-medium">Built to withstand Coastal Corrosion and Equatorial Heat.</span>
          </p>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="group relative px-10 py-5 bg-blue-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-blue-500 transition-colors shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                Book Consultation
            </Link>
            <Link href="#systems" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                View Systems
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const WhyMatters = () => (
  <section className="py-24 px-6 bg-[#0f172a] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Roofs Fail in Tanzania</h2>
          <p className="text-slate-400 text-lg">It’s rarely the rain. It’s usually the design shortcuts.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Poor Slope", icon: <Ruler />, desc: "Water pooling leads to rapid corrosion." },
          { label: "Wrong Material", icon: <Shield />, desc: "Non-coastal sheets rust in <3 years." },
          { label: "Heat Stress", icon: <Thermometer />, desc: "No ventilation cooks the structure." },
          { label: "Weak Fastening", icon: <Wind />, desc: "Sheets lift during seasonal storms." },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <SpotlightCard className="p-6 h-full text-center hover:border-blue-500/30 transition-colors">
              <div className="w-12 h-12 mx-auto bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-colors">
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

const SystemMatrix = () => (
  <section id="systems" className="py-32 px-6 bg-[#0B1120]">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">System Specifications</h2>
          <p className="text-slate-500 text-sm mt-2">Matched to building use-case and longevity requirements.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]">
          <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white border-b border-white/10">
            <div className="col-span-4">System Type</div>
            <div className="col-span-4">Best For</div>
            <div className="col-span-4">Key Advantage</div>
          </div>
          {[
            { s: "Corrugated Metal", use: "Residential & Light Comm.", adv: "Cost-effective strength" },
            { s: "Stone-Coated Tile", use: "Premium Housing", adv: "Thermal & acoustic dampening" },
            { s: "Industrial Box Profile", use: "Warehouses & Factories", adv: "Max structural span" },
            { s: "Insulated Sandwich", use: "Heat-Sensitive Assets", adv: "High energy efficiency" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-12 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center group">
              <div className="col-span-4 text-white font-bold text-sm md:text-base group-hover:text-blue-400 transition-colors">{row.s}</div>
              <div className="col-span-4 text-slate-400 font-mono text-xs md:text-sm">{row.use}</div>
              <div className="col-span-4 text-blue-400 text-xs md:text-sm font-medium">{row.adv}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Process = () => (
  <section className="py-32 px-6 bg-[#080d1a] border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-16 text-center">Installation Method</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-6 gap-4 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10" />

        {[
          { step: "01", title: "Measure", desc: "Slope & load calculation." },
          { step: "02", title: "Frame", desc: "Truss alignment check." },
          { step: "03", title: "Layer", desc: "Under-sheet insulation." },
          { step: "04", title: "Install", desc: "Sheet & tile fixing." },
          { step: "05", title: "Flash", desc: "Waterproofing joints." },
          { step: "06", title: "Finish", desc: "Guttering & cleanup." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="relative group p-4 pt-8 bg-[#0B1120] hover:bg-white/5 transition-all border-t-2 border-transparent hover:border-blue-500">
              <div className="w-8 h-8 bg-[#0B1120] border border-white/20 rounded-full flex items-center justify-center text-slate-500 font-mono text-xs font-bold mb-4 relative z-10 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
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
         <p className="text-xs font-mono text-blue-400 uppercase tracking-widest">
            No improvised shortcuts. Documented installation only.
         </p>
      </div>
    </div>
  </section>
);

const CaseStudies = () => (
  <section className="py-24 px-6 bg-[#0B1120]">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-12">Project Reports</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal>
          <div className="p-8 border border-white/10 bg-[#0f172a] rounded-sm group hover:border-blue-500/30 transition-all">
            <div className="mb-6 flex items-center gap-3">
              <Warehouse className="text-blue-500" />
              <span className="text-slate-400 font-mono text-xs uppercase">Warehouse • Kigamboni</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2 mb-4">Industrial Roof Upgrade</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400"><strong className="text-white">Issue:</strong> Coastal corrosion + heat retention.</p>
              <p className="text-blue-400"><strong className="text-white">Outcome:</strong> Airflow restored • 15yr Rust Warranty.</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="p-8 border border-white/10 bg-[#0f172a] rounded-sm group hover:border-blue-500/30 transition-all">
            <div className="mb-6 flex items-center gap-3">
              <Home className="text-blue-500" />
              <span className="text-slate-400 font-mono text-xs uppercase">Private Estate • Masaki</span>
            </div>
            <h3 className="text-2xl font-bold text-white mt-2 mb-4">Stone-Coated Install</h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400"><strong className="text-white">Scope:</strong> Full re-roofing with acoustic insulation.</p>
              <p className="text-blue-400"><strong className="text-white">Outcome:</strong> Zero leaks • Modern aesthetic update.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const EngagementModels = () => (
  <section className="py-24 px-6 bg-[#080d1a] border-t border-white/5">
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "New Installation", desc: "Full system design & build.", icon: Construction },
          { title: "Roof Replacement", desc: "Tear-down & upgrade.", icon: Home },
          { title: "Structural Consulting", desc: "Load & drainage assessment.", icon: Building },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="text-center p-8 bg-white/5 rounded-sm border border-white/5 hover:bg-white/10 transition-colors">
               <div className="mx-auto w-10 h-10 bg-black rounded-full flex items-center justify-center text-blue-500 mb-4">
                 <item.icon size={18} />
               </div>
               <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-2">{item.title}</h3>
               <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#050912] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          BUILD IT<br/>RIGHT.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Don't risk your property with poor materials or bad installation. Get a structural roofing solution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-blue-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-blue-500 transition-all shadow-2xl">
            Request Site Assessment
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            View Material Specs
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function RoofingInstallationPage() {
  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-blue-500 selection:text-black font-sans cursor-none">
      
      <ConstructionSubNav />
      
      <Hero />
      <WhyMatters />
      <SystemMatrix />
      <Process />
      <CaseStudies />
      <EngagementModels />
      <CTA />
      
      
    </main>
  );
}