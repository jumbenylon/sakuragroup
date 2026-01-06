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
  Workflow, 
  Users, 
  Database, 
  MessageSquare, 
  BarChart3, 
  GitMerge, 
  Zap, 
  CheckCircle2,
  Share2,
  LayoutDashboard,
  Bot
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
      className={`relative border border-white/10 bg-neutral-900/50 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(20, 184, 166, 0.15), 
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

const AgencySubNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    "Overview", "Strategy", "Branding", "Design", 
    "Content", "Digital", "CRM & Systems", "Advertising", "Tech"
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-black/80 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          {links.map((link) => (
            <Link 
              key={link} 
              href={`/agency/${link.toLowerCase().includes('crm') ? 'crm' : link.toLowerCase()}`} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.includes('CRM') ? 'text-teal-500' : 'text-white/40 hover:text-white'}`}
            >
              {link}
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
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 50]);

  return (
    <section className="relative min-h-[85vh] flex items-center px-6 pt-32 bg-[#050505] overflow-hidden">
      {/* Node Network Background */}
      <div className="absolute inset-0 bg-black">
         <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-teal-900/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
         {/* Animated Grid Lines */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#14b8a605_1px,transparent_1px),linear-gradient(to_bottom,#14b8a605_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div style={{ opacity, y }}>
          <span className="inline-flex items-center gap-2 py-1 px-3 border border-teal-500/30 bg-teal-500/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-teal-400 mb-8">
            <Workflow size={12} />
            Operational Intelligence
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 max-w-5xl">
            BUILD SMARTER<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-600">WORKFLOWS.</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
              We design CRM ecosystems, workflows, and digital processes that help teams sell better, support faster, and scale with confidence.
              <span className="block mt-4 text-white font-medium">From leads → onboarding → retention.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-teal-500 hover:text-black transition-all rounded-sm text-center">
                Discuss Workflows
              </Link>
              <Link href="#audit" className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all rounded-sm text-center flex items-center justify-center gap-2">
                <LayoutDashboard size={14} /> Process Audit
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Positioning = () => (
  <section className="py-24 px-6 border-y border-white/5 bg-black">
    <div className="max-w-4xl mx-auto text-center mb-16">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">CRM is not a tool. It’s an OS.</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          We design processes first — then technology follows. Bad processes automated 
          are just bad processes running faster. We fix the flow, then we build the system.
        </p>
      </ScrollReveal>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { title: "Process First", desc: "Software solves nothing if the logic is broken." },
        { title: "Invisible Automation", desc: "Technology should empower, not intrude." },
        { title: "Friction Reduction", desc: "Removing steps to increase speed." },
      ].map((item, i) => (
        <ScrollReveal key={i} delay={i * 0.1}>
          <div className="text-center p-6 border border-white/5 bg-[#0a0a0a] rounded-sm hover:border-teal-500/30 transition-colors">
            <h3 className="text-white font-bold uppercase tracking-widest mb-2 text-sm">{item.title}</h3>
            <p className="text-slate-500 text-sm">{item.desc}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </section>
);

const Capabilities = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="mb-20">
          <h2 className="text-4xl font-black text-white mb-6">SYSTEM ARCHITECTURE</h2>
          <p className="text-slate-400">Services to streamline your operations.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "CRM Strategy", desc: "Process Mapping, Data Architecture, User Journeys.", icon: GitMerge },
          { title: "Implementation", desc: "HubSpot, Zoho, Bitrix24, Odoo setups.", icon: Database },
          { title: "Automation", desc: "Lead Routing, Alerts, Follow-ups, Triggers.", icon: Zap },
          { title: "Support Systems", desc: "Ticketing, Knowledge Base, SLAs.", icon: MessageSquare },
          { title: "Performance", desc: "KPI Dashboards, Pipeline Health, Retention.", icon: BarChart3 },
          { title: "Training", desc: "Team onboarding, adoption playbooks.", icon: Users },
        ].map((cap, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <SpotlightCard className="p-8 h-full bg-[#0a0a0a]">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:text-teal-500 group-hover:bg-teal-500/10 transition-colors">
                <cap.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">
                {cap.desc}
              </p>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const UseCases = () => (
  <section className="py-32 px-6 bg-black border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-16 text-center">Operational Contexts</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { 
            role: "Sales Teams", 
            flow: "Lead capture → Qualification → Pipeline → Closing",
            icon: <Users className="text-teal-500" />
          },
          { 
            role: "Customer Support", 
            flow: "Ticket Log → Routing → Resolution → Feedback",
            icon: <MessageSquare className="text-blue-500" />
          },
          { 
            role: "Field Operations", 
            flow: "Task Assign → Mobile Update → Verification → Report",
            icon: <Zap className="text-yellow-500" />
          },
          { 
            role: "NGO Projects", 
            flow: "Beneficiary Reg → Intervention → M&E Reporting",
            icon: <Share2 className="text-rose-500" />
          },
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="p-8 bg-[#0a0a0a] border border-white/5 hover:bg-white/5 transition-all group flex items-start gap-6">
              <div className="mt-1 p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{item.role}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
                  {item.flow}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const PipelineProcess = () => (
  <section className="py-32 px-6 bg-[#050505]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-black text-white mb-16">TRANSFORMATION PIPELINE</h2>
      </ScrollReveal>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:border-l-0 md:border-t-2 md:grid md:grid-cols-5 gap-8 pt-8">
        {[
          { step: "01", title: "Map", desc: "Audit workflows & pain points." },
          { step: "02", title: "Blueprint", desc: "Design pipelines & data structure." },
          { step: "03", title: "Build", desc: "Implement automations & rules." },
          { step: "04", title: "Train", desc: "Playbooks & team onboarding." },
          { step: "05", title: "Scale", desc: "Analytics & continuous tuning." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="pl-8 md:pl-0 md:pt-8 relative">
              <div className="absolute left-[-9px] top-0 md:top-[-9px] md:left-0 w-4 h-4 bg-black border-2 border-teal-500 rounded-full z-10" />
              <span className="text-xs font-mono text-teal-500/50 mb-2 block">{s.step}</span>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Integrations = () => (
  <section className="py-24 px-6 bg-teal-900/10 border-y border-teal-500/10">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 p-2 border border-teal-500/30 bg-teal-500/10 rounded-full mb-6 px-4">
          <Bot className="text-teal-400" size={16} />
          <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Ecosystem Ready</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-8">
          We integrate technology around your business — not the other way around.
        </h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-teal-200/60">
          <span className="px-4 py-2 bg-black/50 rounded-sm border border-white/10">WhatsApp</span>
          <span className="px-4 py-2 bg-black/50 rounded-sm border border-white/10">HubSpot</span>
          <span className="px-4 py-2 bg-black/50 rounded-sm border border-white/10">Salesforce</span>
          <span className="px-4 py-2 bg-black/50 rounded-sm border border-white/10">QuickBooks</span>
          <span className="px-4 py-2 bg-black/50 rounded-sm border border-white/10">Axis SMS</span>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#0e0e0e] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          AUTOMATE THE<br/>BORING STUFF.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Let’s design a CRM system your team actually loves using. Focus on what matters — we'll handle the flow.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-teal-500 hover:text-black transition-all shadow-2xl">
            Request CRM Review
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Book Workshop
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function AgencyCRMPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-teal-500 selection:text-black font-sans">
      
      <AgencySubNav />
      
      <Hero />
      <Positioning />
      <Capabilities />
      <UseCases />
      <PipelineProcess />
      <Integrations />
      <CTA />
      
      
    </main>
  );
}