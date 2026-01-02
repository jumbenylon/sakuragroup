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
  Sparkles, Globe, Hash 
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- 1. SHARED COMPONENTS ---

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
      <motion.div style={{ y }} className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(88,28,135,0.15),transparent_70%)]" />
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
                {/* PORTAL LINK: Opens in New Tab */}
                <Link 
                    href="/axis/portal" 
                    target="_blank"
                    className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.4)] flex items-center gap-2"
                >
                    Open Console <ArrowRight size={20} />
                </Link>
                <button className="px-10 py-5 border border-white/20 hover:bg-white/5 text-white font-medium rounded-full transition-all">
                    View Pricing
                </button>
            </div>
        </ScrollReveal>

        {/* VISUAL */}
        <motion.div 
            style={{ y: useTransform(scrollY, [0, 500], [0, 50]) }}
            className="mt-20 relative max-w-4xl mx-auto"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-20" />
            <div className="relative bg-[#1e1b4b]/80 backdrop-blur-xl border border-white/10 rounded-t-3xl p-8 shadow-2xl overflow-hidden">
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

// ... (Other sections like WhyAxis, Features, UseCases remain same as previous context for brevity. Ensure they are included in the file.)

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
            {/* Add remaining sections: WhyAxis, ChannelOrchestration, UseCases, Features, Compliance, Pricing, CTA */}
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
