"use client";

import React, { useState, useEffect } from "react";
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
  ArrowRight, 
  Mail, 
  Shield, 
  Users, 
  RefreshCw, 
  Lock, 
  Briefcase, 
  CheckCircle2, 
  Smartphone, 
  FileText, 
  AlertTriangle, 
  Building2, 
  Server
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
      className={`relative border border-white/10 bg-[#020617] overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(67, 56, 202, 0.15), 
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

const EmailNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Overview", id: "hero" },
    { label: "Why Upgrade", id: "why" },
    { label: "Plans", id: "plans" },
    { label: "Migration", id: "migration" },
    { label: "Security", id: "security" },
    { label: "Governance", id: "governance" },
  ];

  return (
    <motion.nav
      className={`sticky top-20 z-[90] w-full border-b border-white/5 transition-all duration-500
        ${isScrolled ? "bg-[#020617]/90 backdrop-blur-xl py-2" : "bg-transparent py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-8 min-w-max">
          <Link href="/hosting" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors mr-4 hidden md:block">
            ← SakuraHost
          </Link>
          {links.map((link) => (
            <Link 
              key={link.label} 
              href={`#${link.id}`} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors
                ${link.label === 'Overview' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
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
    <section id="hero" className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#020617]">
      {/* Executive Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000&auto=format&fit=crop"
            alt="Business Communication"
            fill
            className="object-cover opacity-20 mix-blend-screen grayscale"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-[#020617]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#4338ca05_1px,transparent_1px),linear-gradient(to_bottom,#4338ca05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-950/30 border border-indigo-500/20 rounded-full mb-8 backdrop-blur-md mx-auto">
             <Briefcase size={14} className="text-indigo-400" />
             <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Business Identity Management</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.95] tracking-tighter mb-8">
            COMMUNICATION THAT<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-400">
                CARRIES AUTHORITY.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12 font-light">
             Branded, reliable, and securely managed email for Tanzanian organizations where trust, uptime, and governance matter.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-xs font-mono text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-500" /> Outlook Compatible</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-500" /> Admin Controlled</span>
             <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-indigo-500" /> 99.9% Uptime SLA</span>
          </div>
              
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#plans" className="group relative px-10 py-5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-indigo-500 transition-colors shadow-2xl">
                Get Business Email
            </Link>
            <Link href="/contact" className="px-10 py-5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm transition-all backdrop-blur-sm">
                Migrate Organization
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const WhyEmailMatters = () => (
  <section id="why" className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
      <ScrollReveal>
        <div className="p-8 border border-red-900/20 bg-red-950/5 rounded-sm h-full">
           <div className="flex items-center gap-3 mb-6 text-red-400">
              <AlertTriangle />
              <h3 className="text-xl font-bold">The Risk of Informal Email</h3>
           </div>
           <p className="text-slate-400 mb-6 leading-relaxed">
              Using personal Gmail or basic webmail exposes your organization to operational chaos.
           </p>
           <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Staff leave with client contacts</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> No administrative oversight or reset capability</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Weak security against phishing</li>
              <li className="flex gap-3 text-sm text-slate-400"><div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2" /> Brand distrust (looks like a scam)</li>
           </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="p-8 border border-indigo-500/20 bg-indigo-950/5 rounded-sm h-full">
           <div className="flex items-center gap-3 mb-6 text-indigo-400">
              <Shield />
              <h3 className="text-xl font-bold">The Sakura Standard</h3>
           </div>
           <p className="text-slate-400 mb-6 leading-relaxed">
              Structured identity and centralized control for serious teams.
           </p>
           <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-indigo-500 shrink-0" size={16} /> <span className="font-bold text-white">Controlled Access:</span> Admin retains ownership.</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-indigo-500 shrink-0" size={16} /> <span className="font-bold text-white">Audit Safety:</span> Traceable logs and archives.</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-indigo-500 shrink-0" size={16} /> <span className="font-bold text-white">Trust:</span> name@yourcompany.co.tz implies legitimacy.</li>
              <li className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="text-indigo-500 shrink-0" size={16} /> <span className="font-bold text-white">Continuity:</span> Smooth handover when staff changes.</li>
           </ul>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const EmailPlans = () => (
  <section id="plans" className="py-32 px-6 bg-[#050a16]">
    <div className="max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Workspace Tiers</h2>
          <p className="text-slate-400">Not "cheap hosting email." Professional infrastructure.</p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Essentials */}
        <SpotlightCard className="p-8 h-full bg-[#020617]">
           <Mail className="text-slate-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Business Essentials</h3>
           <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Startups & SMEs</p>
           <div className="text-2xl font-black text-white mb-8">TZS 5,000<span className="text-xs font-normal text-slate-500">/mo/user</span></div>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> 50GB Mailbox Storage</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Branded Identity</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Spam Protection</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Mobile & Desktop Sync</li>
           </ul>
           <Link href="/contact" className="block w-full py-3 border border-white/10 text-center text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">Select Plan</Link>
        </SpotlightCard>

        {/* Collaboration */}
        <SpotlightCard className="p-8 h-full bg-[#020617] border-indigo-500/30">
           <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
              Team Choice
           </div>
           <Users className="text-indigo-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Business Plus</h3>
           <p className="text-indigo-400 text-xs uppercase tracking-widest mb-6">Growing Teams</p>
           <div className="text-2xl font-black text-white mb-8">TZS 10,000<span className="text-xs font-normal text-slate-500">/mo/user</span></div>
           <ul className="space-y-4 mb-8 text-sm text-slate-300">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Shared Inboxes & Groups</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Advanced Aliases & Routing</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Admin Delegation</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-indigo-500" /> Daily Backup Snapshots</li>
           </ul>
           <Link href="/contact" className="block w-full py-3 bg-indigo-600 text-center text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 transition-colors">Get Started</Link>
        </SpotlightCard>

        {/* Stewardship */}
        <SpotlightCard className="p-8 h-full bg-[#020617]">
           <Building2 className="text-slate-500 mb-6" size={32} />
           <h3 className="text-white font-bold mb-2">Enterprise Stewardship</h3>
           <p className="text-slate-500 text-xs uppercase tracking-widest mb-6">Corporates & NGOs</p>
           <div className="text-2xl font-black text-white mb-8">Custom<span className="text-xs font-normal text-slate-500">/volume</span></div>
           <ul className="space-y-4 mb-8 text-sm text-slate-400">
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Access Governance</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Compliance Operations</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Incident & Recovery Support</li>
              <li className="flex gap-3"><CheckCircle2 size={16} className="text-slate-500" /> Mandatory Renewal Protection</li>
           </ul>
           <Link href="/contact" className="block w-full py-3 border border-white/10 text-center text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">Contact Sales</Link>
        </SpotlightCard>
      </div>
    </div>
  </section>
);

const Migration = () => (
  <section id="migration" className="py-24 px-6 bg-[#020617] border-y border-white/5">
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <RefreshCw size={48} className="text-indigo-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-6">Zero Disruption Migration</h2>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
          We move your organization carefully — not urgently. We handle history, contacts, and switchover.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-4 gap-4">
         {[
           { step: "01", label: "Map", desc: "Identity & alias mapping." },
           { step: "02", label: "Copy", desc: "Historical mail transfer." },
           { step: "03", label: "Verify", desc: "Data integrity check." },
           { step: "04", label: "Live", desc: "Controlled DNS switch." },
         ].map((s, i) => (
           <ScrollReveal key={i} delay={i * 0.1}>
             <div className="bg-[#050a16] p-6 border border-white/5 rounded-sm">
                <div className="text-indigo-500 font-mono text-xs mb-2">{s.step}</div>
                <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-1">{s.label}</h3>
                <p className="text-xs text-slate-500">{s.desc}</p>
             </div>
           </ScrollReveal>
         ))}
      </div>
    </div>
  </section>
);

const SecurityIntegrity = () => (
  <section id="security" className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
       <ScrollReveal>
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-indigo-400">
                <Lock size={24} />
                <h2 className="text-2xl font-bold text-white">Identity Integrity</h2>
             </div>
             <p className="text-slate-400 leading-relaxed">
                Security is not a plugin — it is operational discipline. We enforce standards that prevent spoofing and unauthorized access.
             </p>
             <ul className="space-y-4">
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 className="text-indigo-500" size={16} /> Enforced SPF / DKIM alignment</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 className="text-indigo-500" size={16} /> Optional DMARC policy support</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 className="text-indigo-500" size={16} /> Login anomaly monitoring</li>
                <li className="text-sm text-slate-300 flex gap-3"><CheckCircle2 className="text-indigo-500" size={16} /> Lost-staff revocation workflows</li>
             </ul>
          </div>
       </ScrollReveal>
       
       <ScrollReveal delay={0.2}>
          <div className="relative p-8 border border-white/10 bg-[#020617] rounded-sm">
             <div className="absolute top-0 right-0 p-4">
                <span className="flex items-center gap-2 text-[10px] text-green-400 uppercase tracking-widest">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Protected
                </span>
             </div>
             <div className="space-y-6 font-mono text-xs">
                <div>
                   <div className="text-slate-500 mb-1">DKIM SIGNATURE</div>
                   <div className="text-indigo-400 break-all">v=1; a=rsa-sha256; c=relaxed/relaxed; d=sakura.co.tz;</div>
                </div>
                <div>
                   <div className="text-slate-500 mb-1">SPF RECORD</div>
                   <div className="text-green-400">v=spf1 include:_spf.sakura.host -all</div>
                </div>
                <div>
                   <div className="text-slate-500 mb-1">DMARC POLICY</div>
                   <div className="text-white">p=quarantine; rua=mailto:dmarc@sakura...</div>
                </div>
             </div>
          </div>
       </ScrollReveal>
    </div>
  </section>
);

const Integrations = () => (
  <section className="py-24 px-6 bg-[#020617] border-t border-white/5">
    <div className="max-w-5xl mx-auto text-center">
       <ScrollReveal>
          <h2 className="text-2xl font-bold text-white mb-8">Works Where You Work</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-70">
             {["Outlook", "Thunderbird", "Apple Mail", "Android", "Gmail App", "CRM"].map((tool, i) => (
                <div key={i} className="px-6 py-3 border border-white/10 rounded-full text-sm font-bold text-slate-400 uppercase tracking-widest">
                   {tool}
                </div>
             ))}
          </div>
          <p className="text-slate-600 text-xs mt-8">
             Standard IMAP/SMTP/POP3 Compatibility • No forced ecosystem lock-in.
          </p>
       </ScrollReveal>
    </div>
  </section>
);

const Governance = () => (
  <section id="governance" className="py-24 px-6 bg-[#050a16]">
    <div className="max-w-4xl mx-auto text-center">
       <ScrollReveal>
          <Building2 size={48} className="text-slate-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">Governance Philosophy</h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-8">
             "Email accounts belong to the organization, not the individual."
          </p>
          <div className="p-8 bg-[#020617] border border-white/5 rounded-sm text-left max-w-2xl mx-auto">
             <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We help companies mature their communication environment. Access must be role-controlled. Departing staff do not own mailbox history. Leadership retains continuity.
             </p>
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-900/50 flex items-center justify-center text-indigo-400 font-bold text-xs">S</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">SakuraHost Operations</div>
             </div>
          </div>
       </ScrollReveal>
    </div>
  </section>
);

const FAQ = () => (
  <section className="py-24 px-6 bg-[#020617] border-t border-white/5">
    <div className="max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-2xl font-bold text-white mb-8">Email Operations FAQ</h2>
        <div className="space-y-4">
           {[
             { q: "Can you migrate us from Gmail / Zoho / cPanel?", a: "Yes. We perform a full historical migration audit before switching." },
             { q: "Do you support multiple domains?", a: "Yes. You can manage multiple brands (brand1.co.tz, brand2.com) under one admin panel." },
             { q: "Do you provide email-only without hosting?", a: "Yes. You do not need a website to have professional email." },
             { q: "Can department emails share inboxes?", a: "Yes. Sales, Support, and Info addresses can be routed to multiple staff members." },
           ].map((item, i) => (
             <div key={i} className="p-6 border border-white/5 bg-[#050a16] rounded-sm">
                <h4 className="text-white font-bold text-sm mb-2">{item.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
             </div>
           ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-40 px-6 bg-[#02040a] text-center border-t border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 pointer-events-none" />

    <div className="max-w-4xl mx-auto relative z-10">
      <ScrollReveal>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tighter">
          PROTECT YOUR<br/>COMMS.
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          If your communication carries responsibility, we’ll help you protect it.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="#plans" className="px-12 py-5 bg-white text-[#020617] font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-indigo-200 transition-all shadow-2xl">
            Get Business Email
          </Link>
          <Link href="/contact" className="px-12 py-5 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-colors">
            Start Migration
          </Link>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default function EmailPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500 selection:text-white font-sans cursor-none">
      
      <EmailNav />
      
      <Hero />
      <WhyEmailMatters />
      <EmailPlans />
      <Migration />
      <SecurityIntegrity />
      <Governance />
      <Integrations />
      <FAQ />
      <CTA />
      
      
    </main>
  );
}