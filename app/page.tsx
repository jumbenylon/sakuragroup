"use client";

import React, { useRef, useState, useEffect } from "react";
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
  ArrowRight, CheckCircle2, Cloud, Truck, 
  CreditCard, Layout, BookOpen, Quote, 
  Server, Zap, ShieldCheck, Plane, Briefcase, 
  Terminal, Mic, MapPin, Phone, Mail 
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- CUSTOM COLORS ---
// Dark Navy: #0B1120
// Mint Green: #34D399
// Marigold: #FBBF24

// --- 1. CUSTOM CURSOR COMPONENT ---
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
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
    >
      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm" />
    </motion.div>
  );
};

// --- 2. PRELOADER COMPONENT ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-[100] bg-[#050912] flex items-center justify-center"
        >
            <div className="text-center">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 200 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-1 bg-emerald-500 mb-4 mx-auto rounded-full"
                />
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-xs text-emerald-500 uppercase tracking-widest"
                >
                    System Initializing...
                </motion.p>
            </div>
        </motion.div>
    );
};

// --- ANIMATION COMPONENTS ---

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: useTransform(mouseY, [-300, 300], [15, -15]),
        rotateY: useTransform(mouseX, [-300, 300], [-15, 15]),
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- DATA ---
const services = [
  // ROW 1: INFRASTRUCTURE (Unified Naming)
  { title: "SakuraHost", desc: "Enterprise Cloud & Domains", icon: Server, href: "/hosting", color: "text-blue-400" },
  { title: "Axis by Sakura", desc: "Unified Comm API", icon: Zap, href: "/axis", color: "text-amber-400" },
  { title: "Sakura Pay", desc: "Fintech Gateway", icon: CreditCard, href: "/sakurapay", color: "text-emerald-400" },
  // ROW 2: OPERATIONS
  { title: "Sakura Logistics", desc: "Supply Chain & Haulage", icon: Truck, href: "/logistics", color: "text-rose-400" },
  { title: "Roof Cleaning (RCS)", desc: "Industrial Restoration", icon: ShieldCheck, href: "/roofcleaning", color: "text-cyan-400" },
  { title: "Sakura Travels", desc: "Cinematic Adventures", icon: Plane, href: "/travel", color: "text-indigo-400" },
  // ROW 3: GROWTH
  { title: "Sakura Agency", desc: "Strategy & Branding", icon: Briefcase, href: "/marketing", color: "text-orange-400" },
  { title: "Xhule — Learn", desc: "Skills for Real World", icon: Terminal, href: "/learn", color: "text-yellow-400" },
  { title: "Think Loko", desc: "Culture & Media", icon: Mic, href: "/thinkloko", color: "text-red-500" },
];

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  // Parallax Text Effect
  const textY = useTransform(scrollY, [0, 500], [0, 100]); 

  return (
    <section className="relative h-screen min-h-[900px] flex items-center px-6 pt-20 overflow-hidden bg-[#0B1120]">
      {/* BACKGROUND VIDEO */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 opacity-40">
         <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale mix-blend-luminosity">
           <source src="https://storage.googleapis.com/sakura-web/hero-video.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              Est. 2018 • East Africa
            </span>
          </div>
          
          <motion.h1 style={{ y: textY }} className="text-7xl md:text-9xl font-bold tracking-tighter text-white leading-[0.9] mb-8">
            Build. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-400">
              Bloom.
            </span>
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-xl leading-relaxed font-light mb-12">
            We deliver cloud, logistics, finance, and digital solutions under one roof. 
            The integrated ecosystem for the modern African enterprise.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/#contact" className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-[#0B1120] font-bold rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(52,211,153,0.5)]">
              Book Consultation
              <ArrowRight size={20} />
            </Link>
            <button className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white font-medium rounded-full transition-all">
              Explore Solutions
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const TrustTicker = () => (
  <section className="py-12 bg-[#080d1a] border-y border-white/5 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
        Trusted by Industry Leaders
      </p>
    </div>
    <div className="relative flex overflow-x-hidden group">
      <motion.div 
        className="flex gap-24 items-center whitespace-nowrap animate-marquee"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {['Coop Bank', 'Capys Travel', 'CRDB Bank', 'JK Cement', 'Fahad Fuad', 'Afrinuva', 'AGS Engineering', 'City-Pest', 'Eristic'].map((brand) => (
              <span key={brand} className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 uppercase tracking-tighter">
                {brand}
              </span>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
      {/* Gradient fade on sides */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#080d1a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#080d1a] to-transparent z-10" />
    </div>
  </section>
);

const OurStory = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section id="story" className="py-32 px-6 bg-[#0B1120] overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
         {/* IMAGE SIDE */}
         <TiltCard className="relative aspect-[4/5] rounded-3xl bg-neutral-900 group">
             <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sakuragroup-founders.jpg" 
                    alt="Jumbenylon and Omary"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />
             </div>
             
             {/* FLOATING BADGE */}
             <motion.div 
                style={{ rotate }}
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber-400 rounded-full flex items-center justify-center text-[#0B1120] font-black text-xl leading-none text-center p-4 shadow-2xl z-20"
             >
                SINCE 2017
             </motion.div>
         </TiltCard>
         
         {/* TEXT SIDE */}
         <div className="space-y-10 relative">
             <ScrollReveal>
                <div className="inline-block px-3 py-1 border border-amber-400/30 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                    The Origin
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                    Bridging the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                        Modern Gap.
                    </span>
                </h2>
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed font-light">
                    <p>
                        It started with a conversation between two friends, <strong className="text-white">Jumbenylon and Omary</strong>. 
                        They saw a fragmented market where businesses had to juggle a dozen vendors just to operate.
                    </p>
                    <p>
                        They decided to build a singular ecosystem. A place where a company could host its data, 
                        move its cargo, and train its staff—all without leaving the Sakura network.
                    </p>
                </div>
             </ScrollReveal>
         </div>
      </div>
    </section>
  );
};

const EcosystemGrid = () => (
    <section id="ecosystem" className="py-32 px-6 bg-[#080d1a]">
        <div className="max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">The 9 Pillars</h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        A unified infrastructure designed to handle every stage of your business lifecycle.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((s, i) => (
                    <ScrollReveal key={i} delay={i * 0.05}>
                        <Link href={s.href} className="block h-full">
                            <div className="group relative h-full p-8 bg-[#0B1120] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="mb-8">
                                        <div className={`w-14 h-14 rounded-2xl bg-[#080d1a] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${s.color}`}>
                                            <s.icon size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">{s.title}</h3>
                                        <p className="text-slate-500 font-mono text-sm uppercase tracking-wide">{s.desc}</p>
                                    </div>
                                    
                                    <div className="flex justify-between items-center border-t border-white/5 pt-6">
                                        <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0">EXPLORE</span>
                                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    </section>
);

const Testimonial = () => (
    <section className="py-32 px-6 bg-[#0B1120] relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
            <ScrollReveal>
                <div className="bg-[#080d1a]/80 backdrop-blur-xl p-12 md:p-20 rounded-[3rem] border border-white/5 text-center shadow-2xl">
                    <Quote className="text-emerald-500 mx-auto mb-8" size={48} />
                    <p className="text-2xl md:text-4xl text-white font-light leading-snug mb-12">
                        "The integration of <span className="text-emerald-400">CRM and ERP</span> within the Sakura ecosystem gave us visibility we never thought possible. We stopped guessing and started scaling."
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-16 bg-neutral-800 rounded-full mb-4 border-2 border-emerald-500 overflow-hidden relative">
                             {/* Placeholder for Eddy */}
                             <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-neutral-700">ER</div>
                        </div>
                        <h4 className="text-xl font-bold text-white">Eddy Ronnie</h4>
                        <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Operations Manager • RCS</p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    </section>
);

const ContactCockpit = () => (
    <section id="contact" className="relative bg-[#050912] text-white">
        <div className="grid lg:grid-cols-2 min-h-screen">
            
            {/* LEFT: FORM */}
            <div className="p-12 md:p-24 flex flex-col justify-center border-r border-white/5">
                <ScrollReveal>
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 text-emerald-400 mb-4">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="font-mono text-xs uppercase tracking-widest">Online • Responding in 2h</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold mb-6">Let's Build.</h2>
                        <p className="text-slate-400 text-lg">
                            Ready to modernize your operations? Book a free consultation with our solutions architects.
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Name</label>
                                <input className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Company</label>
                                <input className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="Sakura Inc." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-500">Email</label>
                            <input className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="john@company.com" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-bold uppercase text-slate-500">Message</label>
                             <textarea rows={4} className="w-full bg-[#0B1120] border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors" placeholder="Tell us about your project..." />
                        </div>
                        <button className="w-full bg-white text-black font-bold py-5 rounded-xl hover:bg-emerald-400 hover:text-black transition-all duration-300 text-lg">
                            Send Request
                        </button>
                    </form>
                </ScrollReveal>
            </div>

            {/* RIGHT: MAP VISUALIZATION */}
            <div className="relative h-[500px] lg:h-auto bg-[#0B1120] overflow-hidden">
                {/* Overlay details */}
                <div className="absolute top-12 left-12 z-20 space-y-6">
                    <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-xs">
                         <div className="flex items-start gap-4 mb-4">
                             <MapPin className="text-emerald-500 mt-1" />
                             <div>
                                 <h4 className="font-bold text-white">Headquarters</h4>
                                 <p className="text-sm text-slate-400 mt-1">Mwenge opposite TRA Tax Offices<br/>Mabatini Road - Kijitonyama<br/>Dar es Salaam, Tanzania</p>
                             </div>
                         </div>
                         <div className="flex items-center gap-4 text-sm text-slate-400">
                             <Phone size={14} /> <span>+255 753 930 000</span>
                         </div>
                         <div className="flex items-center gap-4 text-sm text-slate-400">
                             <Phone size={14} /> <span>+255 782 020 840</span>
                         </div>
                    </div>
                </div>

                {/* Actual Map Embed */}
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.62492458114178!2d39.23026060569367!3d-6.769999122965163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18371bd280b59d59%3A0x542020034d27d3d!2sSakurahost%20Network%20%26%20IT%20Solutions!5e0!3m2!1sen!2stz!4v1767291463344!5m2!1sen!2stz" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: "grayscale(100%) invert(90%) opacity(0.8)" }} 
                    allowFullScreen 
                    loading="lazy" 
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            </div>
        </div>
    </section>
);

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white selection:bg-emerald-400 selection:text-black cursor-none">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <GlobalNavbar />
            <Hero />
            <TrustTicker />
            <OurStory />
            <EcosystemGrid />
            <Testimonial />
            <ContactCockpit />
            <GlobalFooter />
        </motion.div>
      )}
    </main>
  );
}
