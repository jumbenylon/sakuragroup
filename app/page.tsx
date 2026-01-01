"use client";

import { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import Image from "next/image";
import Link from "next/link"; 
import { 
  Server, CreditCard, Mic, Briefcase, Truck, ShieldCheck, 
  ArrowUpRight, Globe, Users, TrendingUp, Plane, Terminal, Zap 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- THE LOGICAL 3x3 MATRIX ---
const pillars = [
  // --- ROW 1: DIGITAL INFRASTRUCTURE (The Backbone) ---
  {
    title: "SakuraHost",
    category: "Cloud Infrastructure",
    description: "Enterprise NVMe hosting and .tz domain registrar.",
    icon: Server,
    color: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-500",
    href: "/hosting",
  },
  {
    title: "Axis Core",
    category: "Communication API",
    description: "Omni-channel messaging gateway (SMS, WhatsApp, Email).",
    icon: Zap,
    color: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-500",
    href: "/axis",
  },
  {
    title: "SakuraPay",
    category: "Fintech",
    description: "The payment stack for African commerce. M-Pesa, Card, & USSD.",
    icon: CreditCard,
    color: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-500",
    href: "/sakurapay",
  },

  // --- ROW 2: PHYSICAL OPERATIONS (The Engine) ---
  {
    title: "Sakura Logistics",
    category: "Supply Chain",
    description: "Cross-border haulage and intelligent freight forwarding.",
    icon: Truck,
    color: "from-rose-500/20 to-rose-500/0",
    iconColor: "text-rose-500",
    href: "/logistics",
  },
  {
    title: "Sakura Construction",
    category: "Specialized Services",
    description: "RCS waterproofing, epoxy flooring, and industrial restoration.",
    icon: ShieldCheck,
    color: "from-cyan-500/20 to-cyan-500/0",
    iconColor: "text-cyan-500",
    href: "/industrial",
  },
  {
    title: "Sakura Travels",
    category: "Corporate Travel",
    description: "IATA-certified booking for executives and leisure.",
    icon: Plane,
    color: "from-indigo-500/20 to-indigo-500/0",
    iconColor: "text-indigo-500",
    href: "/travel",
  },

  // --- ROW 3: INFLUENCE & GROWTH (The Mind) ---
  {
    title: "Sakura Agency",
    category: "Strategic Growth",
    description: "Market research, business development, and branding.",
    icon: Briefcase,
    color: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-500",
    href: "/marketing",
  },
  {
    title: "The Terminal",
    category: "EdTech",
    description: "LMS platform for tech skills and certification.",
    icon: Terminal,
    color: "from-yellow-500/20 to-yellow-500/0",
    iconColor: "text-yellow-500",
    href: "/learn",
  },
  {
    title: "Think Loko",
    category: "Media House",
    description: "Podcast network and cultural intelligence.",
    icon: Mic,
    color: "from-red-600/20 to-red-600/0",
    iconColor: "text-red-600",
    href: "/media",
  },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 dark:border-white/5 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl transition-all duration-300">
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8">
        <Image 
          src="https://storage.googleapis.com/sakura-web/logo-icon.png" 
          alt="Sakura Group" 
          fill
          className="object-contain"
        />
      </div>
      <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Sakura Group.
      </span>
    </div>
    <ThemeToggle />
  </nav>
);

const RevealText = ({ text, delay = 0 }: { text: string, delay?: number }) => (
  <span className="inline-block overflow-hidden align-bottom">
    <motion.span
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      className="inline-block"
    >
      {text}
    </motion.span>
  </span>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center px-6 overflow-hidden">
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
         <Image 
          src="https://storage.googleapis.com/sakura-web/hero-gradient.jpg"
          alt="Background"
          fill
          className="object-cover opacity-80 dark:opacity-30 scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white dark:via-neutral-950/60 dark:to-neutral-950" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/5 dark:bg-white/10 backdrop-blur-md border border-neutral-900/10 dark:border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-neutral-600 dark:text-neutral-300 uppercase">
            Est. 2018 • East Africa
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9] mb-8">
          <RevealText text="Build." /> <br />
          <span className="text-neutral-400 dark:text-neutral-600"><RevealText text="Scale." delay={0.1} /></span> <br />
          <RevealText text="Empower." delay={0.2} />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-xl text-xl text-neutral-700 dark:text-neutral-400 leading-relaxed font-light"
        >
          We are an industrial and technology conglomerate engineering the infrastructure of tomorrow for Tanzania, Kenya, and Malawi.
        </motion.p>
      </div>
    </section>
  );
};

const SpotlightCard = ({ item }: { item: typeof pillars[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link href={item.href} className="block h-full">
      <div
        className="group relative h-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.02]"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className={`pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-r ${item.color}`}
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.1),
                transparent 80%
              )
            `,
          }}
        />
        <div className="relative h-full p-8 flex flex-col justify-between z-10">
          <div className="mb-8 flex items-start justify-between">
             <div className={`p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 ${item.iconColor}`}>
               <item.icon size={28} />
             </div>
             <ArrowUpRight className="text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const VelocityMarquee = () => (
  <div className="py-20 overflow-hidden bg-neutral-900 dark:bg-white text-white dark:text-black">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="flex whitespace-nowrap"
    >
       {[...Array(4)].map((_, i) => (
         <div key={i} className="flex items-center gap-8 mx-4">
           <span className="text-8xl font-black uppercase tracking-tighter">Innovation</span>
           <span className="w-4 h-4 rounded-full bg-rose-500" />
           <span className="text-8xl font-black uppercase tracking-tighter">Energy</span>
           <span className="w-4 h-4 rounded-full bg-rose-500" />
           <span className="text-8xl font-black uppercase tracking-tighter">Fintech</span>
           <span className="w-4 h-4 rounded-full bg-rose-500" />
         </div>
       ))}
    </motion.div>
  </div>
);

const Manifesto = () => {
  return (
    <section className="py-32 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-bold leading-tight text-neutral-900 dark:text-white">
        <span className="text-neutral-300 dark:text-neutral-700">We don't just invest. </span>
        We build the rails that East African commerce runs on. From the 
        <span className="text-rose-500"> cloud servers </span> 
        hosting your data to the 
        <span className="text-rose-500"> logistics </span> 
        moving your cargo.
      </h2>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
      <div>
         <h2 className="text-9xl font-bold text-neutral-100 dark:text-neutral-900 tracking-tighter">Sakura.</h2>
      </div>
      <div className="flex gap-8 mb-8 md:mb-4 text-sm font-medium text-neutral-500">
        <a href="https://instagram.com/sakuragroup.tz" target="_blank" className="hover:text-rose-500 transition-colors">@sakuragroup.tz</a>
        <a href="#" className="hover:text-rose-500 transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-rose-500 transition-colors">Twitter</a>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 selection:bg-rose-500 selection:text-white">
      <Navbar />
      <Hero />
      <VelocityMarquee />
      <Manifesto />
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">Our Ecosystem</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
          {pillars.map((item) => (
            <SpotlightCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
