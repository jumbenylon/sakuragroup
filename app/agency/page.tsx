"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence,
  useInView
} from "framer-motion";
import { 
  ArrowRight, MousePointer2, Briefcase, 
  PenTool, Monitor, Megaphone, Smartphone, 
  Globe, Zap, Layout, Code, Hash, Layers, 
  TrendingUp, Users, Award, Coffee
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
    >
      <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => (
    <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
        <div className="text-center">
             <motion.div 
                 className="text-8xl font-black text-white mb-4 tracking-tighter"
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 0.5 }}
             >
                 CREATE.
             </motion.div>
             <div className="h-1 w-32 bg-orange-500 mx-auto rounded-full overflow-hidden">
                 <motion.div 
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
             </div>
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

// --- 2. SPECIAL EFFECTS ---

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
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 77, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block group hover:text-orange-500 transition-colors duration-300">
      <span className="absolute top-0 left-0 -ml-1 text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 ml-1 text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:animate-pulse" style={{ animationDelay: "0.1s" }}>
        {text}
      </span>
      <span className="relative z-10">{text}</span>
    </span>
  );
};

const Counter = ({ value, label, icon: Icon }: { value: string, label: string, icon: any }) => {
    return (
        <div className="text-center p-6 border border-white/5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
            <Icon className="mx-auto mb-4 text-orange-500 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" size={32} />
            <div className="text-4xl md:text-5xl font-black text-white mb-2">{value}</div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">{label}</div>
        </div>
    );
};

// --- 3. PAGE SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen min-h-[900px] flex items-center px-6 pt-20 overflow-hidden bg-black">
      {/* BACKGROUND VIDEO */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 opacity-60">
         <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale contrast-125"
         >
             <source src="https://storage.googleapis.com/sakura-web/sakura-agency.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full mb-8">
             <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
             <span className="text-xs font-bold text-white uppercase tracking-widest">Global Reach • Tanzanian Roots</span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter mb-8">
            IDEAS THAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                <GlitchText text="BREAK BOUNDARIES." />
            </span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-end">
             <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed border-l-4 border-orange-500 pl-6">
                We’re the 360° creative force for banks, telcos, and startups. 
                Fearless in ambition, precise in execution.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/#contact" className="group relative px-10 py-5 bg-orange-600 text-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-2">Let's Build Bold <ArrowRight size={20}/></span>
                </Link>
             </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Manifesto = () => (
    <section className="py-32 px-6 bg-black border-y border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
            <ScrollReveal>
                <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Our Manifesto</h2>
                <div className="space-y-8 text-3xl md:text-5xl font-bold text-white leading-tight">
                    <p className="opacity-50 hover:opacity-100 transition-opacity duration-500">
                        “We believe Africa tells its own story – <span className="text-white">boldly, on its own terms.</span>”
                    </p>
                    <p className="opacity-50 hover:opacity-100 transition-opacity duration-500">
                        “We don’t follow trends; <span className="text-orange-500">we make them.</span>”
                    </p>
                    <p className="opacity-50 hover:opacity-100 transition-opacity duration-500">
                        “Creativity powered by culture, <span className="text-white">driven by data.</span>”
                    </p>
                    <p className="opacity-50 hover:opacity-100 transition-opacity duration-500">
                        “Strategy, art, and tech in <span className="text-orange-500">perfect harmony.</span>”
                    </p>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const SelectedWorks = () => {
    const works = [
        { client: "Tigo Pesa", project: "Pesa Ni Pesa", cat: "Campaign 360", img: "bg-blue-900" },
        { client: "CRDB Bank", project: "Digital Transformation", cat: "UI/UX & App", img: "bg-green-900" },
        { client: "Zanzibar Tourism", project: "Island of Stories", cat: "Brand Identity", img: "bg-emerald-900" },
        { client: "Serengeti Lite", project: "Lite Your Way", cat: "Social Media", img: "bg-yellow-900" },
    ];

    return (
        <section className="py-32 bg-[#050505] overflow-hidden">
            <div className="px-6 mb-12 flex justify-between items-end max-w-7xl mx-auto">
                 <div>
                    <h2 className="text-5xl font-black text-white mb-2">SELECTED WORK</h2>
                    <p className="text-slate-400">Proof of concept.</p>
                 </div>
                 <Link href="#" className="hidden md:flex items-center gap-2 text-orange-500 font-bold hover:text-white transition-colors">
                    View All Projects <ArrowRight size={16} />
                 </Link>
            </div>
            
            {/* Horizontal Scroll Area */}
            <div className="flex gap-6 overflow-x-auto pb-12 px-6 snap-x">
                {works.map((w, i) => (
                    <motion.div 
                        key={i}
                        className="snap-center shrink-0 w-[85vw] md:w-[600px] group cursor-pointer"
                        whileHover={{ scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`relative aspect-[16/9] rounded-3xl overflow-hidden ${w.img} mb-6 border border-white/5`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            {/* Placeholder visuals */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-4xl font-black text-white uppercase tracking-tighter">{w.client}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-orange-500 transition-colors">{w.project}</h3>
                                <p className="text-slate-500">{w.client}</p>
                            </div>
                            <span className="px-3 py-1 border border-white/10 rounded-full text-xs font-mono text-slate-400 uppercase">
                                {w.cat}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const ImpactStats = () => (
    <section className="py-20 px-6 bg-black border-y border-white/10">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <Counter value="50+" label="Brands Launched" icon={Rocket} />
                <Counter value="120M+" label="Impressions" icon={TrendingUp} />
                <Counter value="15" label="Industry Awards" icon={Award} />
                <Counter value="∞" label="Coffees Drunk" icon={Coffee} />
            </div>
        </div>
    </section>
);

// Helper for Stats
const Rocket = (props: any) => <Zap {...props} />; // Placeholder icon

const ServicesGrid = () => (
    <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">360° CREATIVE.</h2>
                    <p className="text-xl text-slate-400 max-w-2xl">
                        We bridge data and storytelling to build end-to-end brands. From concept to launch.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Brand Strategy", desc: "Naming & Visual Identity", icon: PenTool },
                    { title: "Campaigns", desc: "Digital & Analog Advertising", icon: Megaphone },
                    { title: "UI/UX Design", desc: "Pixel-Perfect Web & App", icon: Layout },
                    { title: "Tech Dev", desc: "Custom Software & Platforms", icon: Code },
                    { title: "Media Buying", desc: "Data-Driven Planning", icon: Zap },
                    { title: "Content", desc: "Video & Storytelling", icon: Layers },
                ].map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <SpotlightCard className="p-8 rounded-3xl h-full border border-white/5 bg-neutral-900/40 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-orange-500 mb-8 group-hover:bg-orange-500 group-hover:text-black transition-all">
                                <s.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-slate-400">{s.desc}</p>
                        </SpotlightCard>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Process = () => (
    <section className="py-32 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-16 text-center">How We Work</h2>
            </ScrollReveal>
            
            <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-none md:grid md:grid-cols-5 gap-8">
                {[
                    { step: "01", title: "Discover", desc: "Deep dive into your world. Data & Culture." },
                    { step: "02", title: "Strategize", desc: "Define bold objectives. Chart the course." },
                    { step: "03", title: "Create", desc: "Ideate fearlessly. Brainstorm & Prototype." },
                    { step: "04", title: "Build", desc: "Execute with precision. Code & Craft." },
                    { step: "05", title: "Optimize", desc: "Measure, learn, repeat. Continuous Growth." },
                ].map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="mb-12 md:mb-0 pl-8 md:pl-0 relative">
                            {/* Mobile Timeline Dot */}
                            <div className="absolute left-[-5px] top-0 w-3 h-3 bg-orange-500 rounded-full md:hidden" />
                            
                            <div className="text-6xl font-black text-white/10 mb-4">{s.step}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Clients = () => (
    <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <h2 className="text-4xl font-bold text-white mb-12">Who We Scale</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-8">
                {[
                    { title: "Banks & Finance", desc: "Simplifying complexity with trust." },
                    { title: "Telecom & Tech", desc: "Engaging millions in digital-first campaigns." },
                    { title: "Gov & Public Sector", desc: "Communications that inform and inspire." },
                    { title: "Consumer Brands", desc: "Cultural insights that create loyalty." },
                    { title: "Startups", desc: "Big ideas for bold new ventures." },
                    { title: "NGOs", desc: "Purpose-driven campaigns for change." },
                ].map((c, i) => (
                    <ScrollReveal key={i}>
                        <div className="group flex items-start gap-4 p-6 border-b border-white/10 hover:bg-white/5 transition-colors">
                            <ArrowRight className="text-orange-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0" />
                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">{c.title}</h3>
                                <p className="text-slate-500 mt-1">{c.desc}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const CTA = () => (
    <section className="py-32 px-6 bg-orange-600">
        <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
                <h2 className="text-5xl md:text-7xl font-black text-black mb-8 leading-tight">
                    READY TO MAKE WAVES?
                </h2>
                <p className="text-xl text-black/80 font-medium mb-12 max-w-2xl mx-auto">
                    We’re excited by big challenges. Drop us a line, and let’s build something legendary together.
                </p>
                <Link href="/#contact" className="inline-flex items-center gap-3 px-12 py-6 bg-black text-white font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-2xl">
                    Start the Project <ArrowRight size={24} />
                </Link>
            </ScrollReveal>
        </div>
    </section>
);

export default function MarketingPage() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <Manifesto />
            <ImpactStats />
            <SelectedWorks />
            <ServicesGrid />
            <Process />
            <Clients />
            <CTA />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
