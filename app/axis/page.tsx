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
  Send, CheckCircle2, Shield, Heart, 
  Sparkles, Globe, Hash, Server, Zap, Lock, Landmark, TrendingUp
} from "lucide-react";

// --- CORE ASSETS ---
const LOGO_URL = "https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png";
const HERO_IMAGE = "http://googleusercontent.com/image_generation_content/0"; // Your generated market image

// --- SHARED MOTION COMPONENTS ---

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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-pink-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center"
    >
        <div className="text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-8"
            >
              <Image src={LOGO_URL} alt="Sakura Axis" width={80} height={80} className="mx-auto" />
            </motion.div>
            <div className="flex gap-2 justify-center mb-6">
                {[1,2,3].map((i) => (
                    <motion.div 
                        key={i}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 h-1.5 bg-pink-500 rounded-full"
                    />
                ))}
            </div>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[9px] text-pink-500/60 uppercase tracking-[0.5em]"
            >
                Authenticating Axis Core 2026...
            </motion.p>
        </div>
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
      className={`relative border border-white/5 bg-white/[0.02] overflow-hidden group rounded-sm ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(236, 72, 153, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full z-10">{children}</div>
    </div>
  );
};

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020202] px-6">
      {/* Background Cinematic Image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <Image 
          src={HERO_IMAGE} 
          alt="African Enterprise" 
          fill 
          className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/80 via-[#020202]/40 to-[#020202]" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full mb-8">
            <Sparkles size={12} className="text-pink-500" />
            <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest">The 2026 Communication Standard</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85] uppercase italic">
            Sakura<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">Axis.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Orchestrate mass-market engagement. A unified gateway for <span className="text-white border-b border-pink-500/50">SMS, WhatsApp, and USSD</span>, built on an immutable financial ledger for the modern African enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/axis/login" 
              className="px-12 py-5 bg-white text-black font-bold rounded-sm transition-all hover:bg-pink-500 hover:text-white flex items-center gap-4 group"
            >
              LAUNCH CONSOLE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
              View API Documentation
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020202] to-transparent z-20" />
    </section>
  );
};

const ChannelMatrix = () => (
  <section className="py-32 px-6 bg-[#020202] relative border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <p className="text-pink-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Channel Orchestration</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 italic uppercase">Unified<br/>Messaging.</h2>
          <div className="space-y-8">
            <ChannelItem 
              icon={<MessageCircle className="text-green-500" />} 
              title="WhatsApp Business" 
              desc="Rich media delivery with interactive buttons. High-trust communication for 2026."
            />
            <ChannelItem 
              icon={<Smartphone className="text-blue-500" />} 
              title="Flash SMS & USSD" 
              desc="Zero-latency transactional alerts and offline interactive menus for deep market penetration."
            />
            <ChannelItem 
              icon={<Send className="text-pink-500" />} 
              title="Reliable Bulk SMS" 
              desc="99.9% delivery rate across all major African networks. Fast, cheap, and effective."
            />
          </div>
        </div>

        {/* The Animated Hub Visualization */}
        <div className="relative aspect-square bg-gradient-to-br from-white/[0.03] to-transparent rounded-full border border-white/5 p-12 flex items-center justify-center">
            <div className="relative w-32 h-32 bg-white flex items-center justify-center rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.1)]">
               <Image src={LOGO_URL} alt="Core" width={60} height={60} />
            </div>
            {/* Orbiting Elements would go here using absolute positioning and CSS animation */}
            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-10 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        </div>
      </div>
    </div>
  </section>
);

function ChannelItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="text-white font-bold text-lg mb-1 group-hover:text-pink-500 transition-colors">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

const Metrics = () => (
  <section className="py-24 bg-[#050505] border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        <MetricCard label="Global Throughput" value="500/sec" />
        <MetricCard label="Average Latency" value="<180ms" />
        <MetricCard label="Active Connections" value="14 Carriers" />
        <MetricCard label="Success Rate" value="99.98%" />
      </div>
    </div>
  </section>
);

function MetricCard({ label, value }: any) {
  return (
    <div className="text-center md:text-left">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-3xl font-black text-white italic tracking-tighter uppercase">{value}</p>
    </div>
  );
}

// --- MAIN PAGE ---

export default function AxisPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#020202] text-white selection:bg-pink-500 cursor-default">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <nav className="fixed top-0 left-0 w-full z-[90] p-8 flex justify-between items-center mix-blend-difference">
             <Image src={LOGO_URL} alt="Sakura" width={40} height={40} />
             <Link href="/axis/login" className="text-[10px] font-black uppercase tracking-widest text-white border-b border-white/20 pb-1">Enter Console</Link>
          </nav>

          <Hero />
          
          <section className="py-12 bg-white text-black flex overflow-hidden">
             <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap gap-16 text-xs font-black uppercase tracking-[0.4em]">
                {[1,2,3,4,5].map(i => (
                  <span key={i}>SAKURA AXIS • ENTERPRISE GATEWAY • 2026 EDITION • SMS • WHATSAPP • USSD</span>
                ))}
             </div>
          </section>

          <ChannelMatrix />

          {/* Use Cases Grid */}
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4">
              <SpotlightCard className="p-12 aspect-square flex flex-col justify-end">
                <Landmark className="mb-6 text-blue-500" size={32} />
                <h3 className="text-2xl font-black uppercase italic mb-4">Banking</h3>
                <p className="text-slate-500 text-sm">Secure OTP delivery and transaction alerts for SACCOs and Microfinance.</p>
              </SpotlightCard>
              <SpotlightCard className="p-12 aspect-square flex flex-col justify-end">
                <TrendingUp className="mb-6 text-green-500" size={32} />
                <h3 className="text-2xl font-black uppercase italic mb-4">Marketing</h3>
                <p className="text-slate-500 text-sm">Mass-scale promotional broadcasts with real-time conversion tracking.</p>
              </SpotlightCard>
              <SpotlightCard className="p-12 aspect-square flex flex-col justify-end">
                <ShieldCheck className="mb-6 text-pink-500" size={32} />
                <h3 className="text-2xl font-black uppercase italic mb-4">Security</h3>
                <p className="text-slate-500 text-sm">Military-grade encryption for critical infrastructure communications.</p>
              </SpotlightCard>
            </div>
          </section>

          <Metrics />

          {/* Final Call to Action */}
          <section className="py-64 flex flex-col items-center text-center px-6">
             <motion.div 
               whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
               className="space-y-12"
             >
                <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter">Ready to<br/>Connect?</h2>
                <Link href="/axis/login" className="inline-block px-16 py-6 bg-white text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-pink-500 hover:text-white transition-all shadow-2xl">
                   Start Your Campaign
                </Link>
             </motion.div>
          </section>

          <footer className="p-12 border-t border-white/5 text-center">
             <Image src={LOGO_URL} alt="Sakura" width={30} height={30} className="mx-auto mb-6 opacity-30" />
             <p className="text-[9px] text-slate-600 uppercase tracking-widest font-mono">© 2026 Sakura Group • Precision Engineering for Africa</p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}

// Simple keyframe for marquee
const style = document.createElement('style');
style.textContent = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;
if (typeof document !== 'undefined') document.head.appendChild(style);
