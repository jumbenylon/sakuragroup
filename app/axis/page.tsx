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
  ArrowRight, MessageCircle, Smartphone, Users, 
  Calendar, Send, CheckCircle2, Shield, Heart, 
  Sparkles, Globe, Mail, Clock, Hash 
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#0f172a] flex items-center justify-center"
    >
        <div className="text-center">
            {/* Typing Indicator Animation */}
            <div className="flex gap-2 justify-center mb-6 bg-white/10 px-6 py-4 rounded-full rounded-bl-none">
                {[1,2,3].map((i) => (
                    <motion.div 
                        key={i}
                        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        className="w-3 h-3 bg-purple-500 rounded-full"
                    />
                ))}
            </div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-purple-400 uppercase tracking-widest"
            >
                Connecting Channels...
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
      className={`relative border border-white/10 bg-[#1e1b4b]/50 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
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
    <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#0f172a]">
      {/* Background: Abstract Conversation Nodes */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(88,28,135,0.15),transparent_70%)]" />
         {/* Floating Bubbles */}
         {[...Array(5)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute w-64 h-64 bg-purple-500/5 rounded-full blur-[80px]"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                }}
                animate={{
                    y: [0, -50, 0],
                    x: [0, 30, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
             />
         ))}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
        <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-purple-500/20 rounded-full mb-8 backdrop-blur-md">
                <MessageCircle size={14} className="text-purple-400" />
                <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
                    WhatsApp Approved • TCRA Aware
                </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-tight">
                Talk to Everyone.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    From One Place.
                </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
                Send messages, reminders, updates and broadcasts across SMS, WhatsApp and USSD — all from one simple, friendly dashboard made for real businesses and communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/#contact" className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center gap-2">
                    Start a Conversation <Send size={20} />
                </Link>
                <button className="px-10 py-5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-full transition-all">
                    View Pricing
                </button>
            </div>
        </ScrollReveal>

        {/* Hero Visual: Abstract Chat Interface */}
        <motion.div 
            style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
            className="mt-20 relative max-w-4xl mx-auto"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-20" />
            <div className="relative bg-[#1e1b4b]/80 backdrop-blur-xl border border-white/10 rounded-t-3xl p-8 shadow-2xl overflow-hidden">
                {/* Simulated Messages */}
                <div className="space-y-6 opacity-80">
                    <div className="flex gap-4 items-end">
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">A</div>
                        <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none text-slate-200 text-sm max-w-md">
                            Meeting reminder: Community gathering tomorrow at 10 AM. Please confirm attendance.
                        </div>
                    </div>
                    <div className="flex gap-4 items-end flex-row-reverse">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">S</div>
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl rounded-br-none text-white text-sm max-w-md shadow-lg">
                             Sent to 1,500 Members via SMS & WhatsApp. <br/>
                             <span className="text-xs opacity-70 mt-2 block flex items-center gap-1"><CheckCircle2 size={10}/> 99% Delivered</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

const WhyAxis = () => (
    <section className="py-24 px-6 bg-[#0f172a] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    If your people are everywhere, <br/>
                    <span className="text-purple-400">your messages should reach everywhere.</span>
                </h2>
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                    <p>
                        Some of your customers are on WhatsApp. Some of your members only receive SMS. 
                        Some of your teams rely on USSD.
                    </p>
                    <p className="text-white font-medium">
                        Different people. Different devices. But your work still needs one clear message.
                    </p>
                    <p>
                        Axis brings all your communication together in one place. 
                        No confusion. No scattered conversations. Just one platform where communication feels organized.
                    </p>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const ChannelOrchestration = () => (
    <section className="py-32 px-6 bg-[#17153B] overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
                <div className="inline-block px-3 py-1 border border-pink-500/30 rounded-full text-pink-400 text-xs font-bold uppercase tracking-widest mb-6 bg-pink-500/5">
                    Orchestration Engine
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">
                    One message. <br/>Many ways to reach.
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Write your message once — and choose how it should reach your audience. 
                    Axis adapts to your people instead of forcing them to adapt to technology.
                </p>
                <ul className="space-y-4">
                    {[
                        "WhatsApp for rich media & engagement",
                        "SMS for universal reach & alerts",
                        "USSD for interactive services",
                        "No one left behind"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <CheckCircle2 size={14} />
                            </div>
                            {item}
                        </li>
                    ))}
                </ul>
            </ScrollReveal>

            {/* Visual: 1 Input -> 3 Outputs */}
            <ScrollReveal delay={0.2}>
                <div className="relative h-[400px] bg-[#0f172a] rounded-3xl border border-white/10 p-8 flex flex-col justify-center items-center">
                    {/* Source */}
                    <div className="relative z-10 bg-white text-black px-6 py-3 rounded-xl font-bold shadow-xl mb-12 flex items-center gap-2">
                        <Send size={16} /> Your Message
                    </div>
                    
                    {/* Lines */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 w-px h-24 bg-gradient-to-b from-white to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-4 w-64 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                    
                    {/* Destinations */}
                    <div className="grid grid-cols-3 gap-8 relative z-10 w-full mt-8">
                        {[
                            { icon: MessageCircle, label: "WhatsApp", color: "text-green-400", bg: "bg-green-400/10" },
                            { icon: Smartphone, label: "SMS", color: "text-blue-400", bg: "bg-blue-400/10" },
                            { icon: Hash, label: "USSD", color: "text-yellow-400", bg: "bg-yellow-400/10" }
                        ].map((d, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className={`w-12 h-12 rounded-full ${d.bg} flex items-center justify-center ${d.color} shadow-lg border border-white/5`}>
                                    <d.icon size={20} />
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const UseCases = () => (
    <section className="py-32 px-6 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <h2 className="text-3xl font-bold text-white mb-16 text-center">Built for Real Life</h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { 
                        title: "SACCOs & Finance", 
                        desc: "Send contribution reminders and meeting notices without phone trees.",
                        icon: Users 
                    },
                    { 
                        title: "Weddings & Events", 
                        desc: "Share digital invites, maps, and thank-you notes in one broadcast.",
                        icon: Heart 
                    },
                    { 
                        title: "Small Businesses", 
                        desc: "Send promotions and delivery updates. Stay relevant and professional.",
                        icon: Sparkles 
                    },
                    { 
                        title: "Schools & Learning", 
                        desc: "Announce schedules and exam updates so nothing gets missed.",
                        icon: Globe 
                    },
                    { 
                        title: "Communities", 
                        desc: "Coordinate prayer schedules, charity, and volunteer activities.",
                        icon: Users 
                    },
                    { 
                        title: "Startups", 
                        desc: "Product updates and user notifications without complex code.",
                        icon: Smartphone 
                    }
                ].map((u, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="p-8 rounded-2xl h-full hover:-translate-y-2 transition-transform">
                            <u.icon className="text-pink-500 mb-6" size={28} />
                            <h3 className="text-xl font-bold text-white mb-3">{u.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{u.desc}</p>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Features = () => (
    <section className="py-24 px-6 bg-[#1e1b4b]/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "Smart Broadcast", desc: "One message, multiple channels." },
                    { title: "Contact Groups", desc: "Organize by team, customer, or member." },
                    { title: "Templates", desc: "Save recurring announcements." },
                    { title: "Scheduling", desc: "Write now, send later." },
                    { title: "Delivery Reports", desc: "See who received what, instantly." },
                    { title: "Team Access", desc: "Invite admins to help manage." },
                ].map((f, i) => (
                    <ScrollReveal key={i} delay={i * 0.05}>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                                <CheckCircle2 size={18} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">{f.title}</h3>
                                <p className="text-slate-500 text-sm">{f.desc}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Compliance = () => (
    <section className="py-24 px-6 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <Shield size={48} className="text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-6">Responsible Communication</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Axis operates with WhatsApp approval, awareness of TCRA regulatory expectations, and respect for privacy-aligned messaging principles.
                </p>
                <div className="inline-block px-6 py-3 bg-white/5 rounded-lg text-slate-300 font-mono text-sm border border-white/10">
                    No Spam. No Intrusion. Just Connection.
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const Pricing = () => (
    <section className="py-32 px-6 bg-gradient-to-b from-[#0f172a] to-[#1e1b4b]">
        <div className="max-w-5xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-6">Communication that grows with you.</h2>
                <p className="text-slate-400 mb-16 max-w-2xl mx-auto">
                    Start small and scale as your community expands. Affordable, transparent, and accessible.
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    <div className="p-8 rounded-3xl bg-[#0f172a] border border-white/10 flex flex-col items-center">
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Bulk SMS</div>
                        <div className="text-5xl font-black text-white mb-2">21 <span className="text-xl font-normal text-slate-500">TSH</span></div>
                        <div className="text-slate-500 text-sm mb-8">Per Message</div>
                        <ul className="space-y-3 text-left w-full mb-8">
                            <li className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle2 size={14} className="text-purple-500"/> Instant Delivery</li>
                            <li className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle2 size={14} className="text-purple-500"/> Sender ID Support</li>
                        </ul>
                        <button className="w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                            Get Started
                        </button>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-3 py-1 bg-purple-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                            Popular
                        </div>
                        <div className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-4">WhatsApp</div>
                        <div className="text-4xl font-black text-white mb-2">Flexible</div>
                        <div className="text-slate-400 text-sm mb-8">Volume Based</div>
                        <ul className="space-y-3 text-left w-full mb-8">
                            <li className="flex items-center gap-2 text-white text-sm"><CheckCircle2 size={14} className="text-pink-500"/> Rich Media (Images/PDF)</li>
                            <li className="flex items-center gap-2 text-white text-sm"><CheckCircle2 size={14} className="text-pink-500"/> Interactive Buttons</li>
                        </ul>
                        <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <ScrollReveal>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Start a Conversation.
                </h2>
                <p className="text-xl text-slate-300 mb-12 max-w-lg mx-auto">
                    Whether you are running a small business, managing a SACCO, or leading a community — Axis keeps you connected.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/#contact" className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        Get Started <ArrowRight size={20} />
                    </Link>
                </div>
                <p className="mt-8 text-xs text-purple-400 font-mono uppercase tracking-widest">
                    Axis by Sakura — Built for people.
                </p>
            </ScrollReveal>
        </div>
    </section>
);

export default function AxisPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white selection:bg-purple-500 selection:text-white cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <WhyAxis />
            <ChannelOrchestration />
            <UseCases />
            <Features />
            <Compliance />
            <Pricing />
            <CTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
