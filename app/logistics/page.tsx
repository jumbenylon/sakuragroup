"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence 
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Truck, Anchor, Map, Clock, ArrowUpRight, 
  Activity, Shield, Crosshair, Search 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- HOOKS & UTILS ---

// Hacker Text Effect (Decrypts text on load)
const useHackerText = (text: string, speed = 30) => {
  const [display, setDisplay] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, index) => {
          if (index < i) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      i += 1/3;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return display;
};

// --- DATA ---
const telemetry = [
  { label: "Active Fleet", value: "142", unit: "UNITS" },
  { label: "Transit Vol", value: "8.4", unit: "KT" },
  { label: "On-Time Rate", value: "99.2", unit: "%" },
  { label: "Grid Status", value: "ONLINE", unit: "SECURE" },
];

const services = [
  {
    id: "01",
    title: "Heavy Haulage",
    desc: "Industrial machinery transport across the Dar-Nairobi corridor.",
    icon: Truck,
    color: "text-rose-500",
  },
  {
    id: "02",
    title: "Ocean Freight",
    desc: "Customs clearance & forwarding for Port of Dar es Salaam.",
    icon: Anchor,
    color: "text-blue-500",
  },
  {
    id: "03",
    title: "Telematics",
    desc: "Real-time satellite tracking and geo-fenced asset security.",
    icon: Map,
    color: "text-emerald-500",
  },
  {
    id: "04",
    title: "Last Mile",
    desc: "Precision urban delivery network with digital proof-of-delivery.",
    icon: Clock,
    color: "text-yellow-500",
  },
];

// --- COMPONENTS ---

const Radar = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-20 dark:opacity-10">
    <div className="absolute w-[800px] h-[800px] border border-rose-500/20 rounded-full" />
    <div className="absolute w-[600px] h-[600px] border border-rose-500/20 rounded-full" />
    <div className="absolute w-[400px] h-[400px] border border-rose-500/20 rounded-full" />
    {/* Rotating Scan Line */}
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute w-[800px] h-[800px] bg-gradient-to-r from-transparent via-transparent to-rose-500/10 rounded-full"
      style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 50%)" }}
    />
  </div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5 backdrop-blur-md">
    <div className="flex items-center gap-4">
      <Link href="/" className="group flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-rose-500 transition-colors">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        BACK_TO_HQ
      </Link>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-rose-500 animate-pulse">
        <Activity size={12} />
        SYSTEM_LIVE
      </div>
      <ThemeToggle />
    </div>
  </nav>
);

const TelemetryBar = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 border-y border-white/10 bg-black/20 backdrop-blur-sm">
    {telemetry.map((item, idx) => (
      <div key={idx} className="p-6 border-r border-white/10 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
          {item.label}
        </span>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-black text-white">{item.value}</span>
          <span className="text-[10px] font-bold text-rose-500 mb-1">{item.unit}</span>
        </div>
      </div>
    ))}
  </div>
);

const HolographicCard = ({ service }: { service: typeof services[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative h-96 border border-white/10 bg-neutral-900/50 backdrop-blur-md overflow-hidden rounded-none hover:border-rose-500/50 transition-colors duration-500"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(244, 63, 94, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Decorative Corner Marks (HUD Style) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-4xl font-black text-white/10 group-hover:text-rose-500/20 transition-colors">
            {service.id}
          </span>
          <service.icon className={`w-8 h-8 ${service.color}`} />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
          <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-white transition-colors">
            {service.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-rose-500 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          ACCESS_MODULE <ArrowUpRight size={12} />
        </div>
      </div>
    </div>
  );
};

const TrackingConsole = () => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="relative w-full max-w-2xl mx-auto mt-20">
            <div className={`relative flex items-center bg-black border ${focused ? 'border-rose-500' : 'border-white/20'} transition-colors duration-300`}>
                <div className="px-6 py-6 border-r border-white/10">
                    <Search className={`w-6 h-6 ${focused ? 'text-rose-500' : 'text-neutral-500'} transition-colors`} />
                </div>
                <input 
                    type="text" 
                    placeholder="ENTER_WAYBILL_ID..."
                    className="w-full bg-transparent border-none text-white font-mono px-6 focus:ring-0 placeholder:text-neutral-700 outline-none h-full py-6"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <button className="absolute right-2 top-2 bottom-2 px-8 bg-white text-black font-bold hover:bg-rose-500 hover:text-white transition-colors uppercase tracking-wider text-sm">
                    Track
                </button>
            </div>
            {/* HUD Elements */}
            <div className="flex justify-between mt-2 text-[10px] font-mono text-neutral-600 uppercase">
                <span>Database: Connected</span>
                <span>Latency: 12ms</span>
            </div>
        </div>
    );
};

export default function LogisticsPage() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const title = useHackerText("SAKURA LOGISTICS");

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-rose-500 selection:text-white overflow-x-hidden">
      <Navbar />
      
      {/* SECTION 1: THE RADAR HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 pt-20">
        <Radar />
        
        <motion.div 
            style={{ scale }}
            className="relative z-10 text-center space-y-6 max-w-4xl"
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-rose-500/30 rounded-full bg-rose-500/10 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-rose-400">OPERATIONS LIVE</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                {title}
            </h1>
            
            <p className="max-w-xl mx-auto text-neutral-400 text-lg md:text-xl font-light leading-relaxed">
                We engineer movement. A digital-first supply chain network synchronizing 
                <span className="text-white font-medium"> cargo, data, and borders</span> in real-time.
            </p>

            <TrackingConsole />
        </motion.div>
      </section>

      {/* SECTION 2: TELEMETRY STRIP */}
      <TelemetryBar />

      {/* SECTION 3: THE HOLOGRAPHIC GRID */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto mb-16 flex items-end justify-between">
            <div>
                <h2 className="text-4xl font-bold mb-2">Capabilities</h2>
                <div className="h-1 w-20 bg-rose-500" />
            </div>
            <p className="hidden md:block text-neutral-500 font-mono text-xs text-right">
                SECURE_PROTOCOL_V4<br />
                AUTHORIZED_PERSONNEL_ONLY
            </p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
            {services.map((service) => (
                <HolographicCard key={service.id} service={service} />
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-12 px-6 text-center">
        <p className="text-neutral-600 font-mono text-xs">
          SAKURA_GROUP © {new Date().getFullYear()} // ALL_SYSTEMS_NOMINAL
        </p>
      </footer>
    </main>
  );
}
