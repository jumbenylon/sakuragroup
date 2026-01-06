"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  motion,
  useScroll, 
  useTransform 
} from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Lock, Route, Briefcase, 
  FileCheck2, MapPin, Clock, Building2, CheckCircle2,
  Plane, Truck, MailCheck
} from "lucide-react";


// --- SHARED COMPONENTS ---

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center px-6 pt-28 overflow-hidden bg-[#020617]">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 mix-blend-overlay">
          <source src="https://storage.googleapis.com/sakura-web/logistics-secure.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/70 to-[#020617]" />
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Confidential Corporate Dispatch • Tanzania & Intercity
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-6">
            SECURE CORPORATE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              DELIVERY.
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl border-l-4 border-emerald-500 pl-6 leading-relaxed mb-10">
            Confidential parcel, document, and luggage transportation for businesses — with selective handling, chain-of-custody integrity, and human-led status updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/contact" className="px-10 py-5 bg-emerald-500 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              Book Pickup
            </Link>
            <Link href="#services" className="px-10 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/10 transition-colors">
              Explore Services
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="services" className="py-28 px-6 bg-[#050a1f] border-t border-white/5">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-4">What We Deliver</h2>
        <p className="text-slate-400 text-lg mb-12">
          Purpose-built logistics for organizations that require confidentiality, accountability, and controlled delivery.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: FileCheck2, title: "Secure Dispatch", desc: "Legal, financial, and executive correspondence handled under strict custody protocol." },
          { icon: Briefcase, title: "Corporate Parcel", desc: "Office-to-office, inter-branch transfers, scheduled routes and internal logistics." },
          { icon: Plane, title: "Executive Luggage", desc: "Airport-to-office and intercity luggage dispatch for corporate travelers." },
          { icon: Truck, title: "Intercity Fleet", desc: "Dar es Salaam ⇄ major cities with vetted, controlled handling." },
          { icon: ShieldCheck, title: "Confidential Courier", desc: "Selective hybrid fleet with identity verification and sealed packaging." },
          { icon: MailCheck, title: "Clearing & Forwarding", desc: "Handover supervision, document relay, and secure customs routing support." },
        ].map((s, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="p-8 rounded-sm bg-[#020617] border border-white/10 hover:border-emerald-400/40 transition-all group hover:-translate-y-1">
              <s.icon className="text-slate-500 mb-4 group-hover:text-emerald-400 transition-colors" size={26} />
              <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wide">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const Integrity = () => (
  <section className="py-28 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-5xl mx-auto text-center">
      <ScrollReveal>
        <Lock className="text-emerald-400 mx-auto mb-4" size={42} />
        <h2 className="text-3xl font-bold text-white mb-4">Built Around Confidentiality</h2>
        <p className="text-slate-400 text-lg mb-10">
          Every delivery is handled under a **controlled process** — not a gig-courier workflow.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        {[
          "Background-checked dispatch riders",
          "Selective hybrid fleet allocation",
          "Sealed & tamper-evident packaging",
          "Identity & signature verification",
          "Human-led delivery confirmation",
          "Chain-of-custody proof on request",
        ].map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="flex items-start gap-3 p-4 bg-emerald-900/5 border border-emerald-500/10 rounded-sm">
              <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
              <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

const TanzaniaScope = () => (
  <section className="py-28 px-6 bg-[#050a1f]">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-white mb-6">
          Operating Across Tanzania<br/>
          <span className="text-emerald-500">With Local Precision.</span>
        </h2>
        <p className="text-slate-400 text-lg mb-6">
          Primary coverage includes Dar es Salaam, with secure intercity service across key commercial corridors.
        </p>
        <div className="space-y-2 text-sm text-slate-400 font-mono uppercase tracking-widest">
          <p>Dar es Salaam • Dodoma • Arusha</p>
          <p>Mwanza • Morogoro • Tanga • Zanzibar</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="relative aspect-video rounded-sm overflow-hidden border border-white/10 bg-[#020617] group">
           {/* Abstract Map Viz */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)]" />
           <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                 <Image 
                   src="https://storage.googleapis.com/sakura-web/tanzania-map-grid.png"
                   alt="Tanzania Logistics Map"
                   fill
                   className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                 />
                 {/* Map Markers Overlay - Simulated */}
                 <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                 <div className="absolute top-[40%] right-[10%] w-2 h-2 bg-emerald-500 rounded-full" />
              </div>
           </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-36 px-6 bg-[#020617] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 pointer-events-none" />

    <div className="max-w-3xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl font-black text-white mb-6 tracking-tight">READY TO MOVE?</h2>
        <p className="text-slate-400 text-lg mb-10 font-light">
          Open a corporate dispatch relationship or schedule your first delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/contact" className="px-10 py-5 bg-emerald-500 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-400 transition-all shadow-xl">
            Open Corporate Account
          </Link>
          <Link href="https://wa.me/255753930000" className="px-10 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Speak to Dispatch
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function LogisticsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500 selection:text-black font-sans">
      
      
      <Hero />
      <Services />
      <Integrity />
      <TanzaniaScope />
      <CTA />
      
      
    </main>
  );
}