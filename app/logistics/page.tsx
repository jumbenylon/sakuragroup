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
  Activity, Shield, Crosshair, Search, Globe, Server, 
  Zap, Database, Wifi, Lock, ChevronRight 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- COMPLEX DATA SIMULATION ---
const liveLogs = [
  "Packet_Trace: DAR_PORT -> TERMINAL_3 [ACK]",
  "Vehicle_ID: KZ-992 // Telemetry: ONLINE",
  "Customs_Clearance: REF_22910 // STATUS: CLEARED",
  "Cold_Chain_Sensor: -18°C // STABLE",
  "Route_Optim: NAIROBI_EXPRESS // TRAFFIC: LOW",
  "Grid_Load: 42% // LATENCY: 12ms",
];

const capabilities = [
  {
    id: "freight",
    label: "Global Freight",
    icon: Anchor,
    title: "Multi-Modal Cargo Execution",
    desc: "Seamlessly integrated sea, air, and land transport. We handle the complexity of cross-border logistics so you don't have to.",
    stats: [
      { label: "Annual Tonnage", value: "450k+" },
      { label: "Ports Served", value: "12" },
      { label: "Customs Speed", value: "< 24h" }
    ]
  },
  {
    id: "tech",
    label: "Digital Twin",
    icon: Database,
    title: "Real-Time Supply Chain Visibility",
    desc: "Our proprietary 'Glass Pipeline' technology gives you a digital twin of your supply chain. Track every SKU, pallet, and container in real-time.",
    stats: [
      { label: "API Uptime", value: "99.99%" },
      { label: "Data Points", value: "2M/day" },
      { label: "Predictive Acc", value: "94%" }
    ]
  },
  {
    id: "fleet",
    label: "Smart Fleet",
    icon: Truck,
    title: "Telematics-Driven Haulage",
    desc: "A modern fleet equipped with IoT sensors for fuel optimization, driver safety monitoring, and predictive maintenance scheduling.",
    stats: [
      { label: "Active Units", value: "140+" },
      { label: "Fuel Eff", value: "+18%" },
      { label: "Safety Rating", value: "A+" }
    ]
  }
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
    <div className="flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="group flex items-center gap-2 text-xs font-mono text-rose-500 hover:text-white transition-colors">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          // RETURN_ROOT
        </Link>
        <div className="hidden md:flex h-4 w-px bg-white/20" />
        <span className="hidden md:block text-xs font-mono text-neutral-500">
          LOGISTICS_MODULE::V2.4
        </span>
      </div>
      <ThemeToggle />
    </div>
  </nav>
);

const RollingLogs = () => (
  <div className="h-8 overflow-hidden bg-rose-500/10 border-y border-rose-500/20 flex items-center">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap gap-8 px-4"
    >
      {[...liveLogs, ...liveLogs, ...liveLogs].map((log, i) => (
        <span key={i} className="text-[10px] font-mono text-rose-400">
          {log}
        </span>
      ))}
    </motion.div>
  </div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  
  return (
    <section className="relative h-screen min-h-[900px] flex flex-col pt-20 overflow-hidden bg-neutral-950">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* The "Globe" or Central Visual */}
      <motion.div style={{ y }} className="absolute right-[-10%] top-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-rose-900/20 to-transparent blur-3xl" />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="px-3 py-1 border border-rose-500 text-rose-500 text-[10px] font-mono font-bold uppercase tracking-widest bg-rose-500/10">
              System Online
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-rose-500 to-transparent" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl md:text-[120px] font-black leading-[0.8] tracking-tighter text-white mix-blend-difference"
          >
            COMMAND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-800">CONTROL.</span>
          </motion.h1>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="flex flex-col md:flex-row gap-12 mt-12 border-t border-white/10 pt-8 max-w-4xl"
          >
             <div className="flex-1">
               <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                 <Globe size={16} className="text-rose-500" /> Network Reach
               </h3>
               <p className="text-neutral-400 text-sm leading-relaxed">
                 Operating across the entire East African Community (EAC) + SADC corridor. 
                 Direct lines to China, Dubai, and Mumbai.
               </p>
             </div>
             <div className="flex-1">
               <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                 <Server size={16} className="text-rose-500" /> Digital Infrastructure
               </h3>
               <p className="text-neutral-400 text-sm leading-relaxed">
                 API-first logistics. Integrate your ERP directly with our WMS/TMS 
                 for instantaneous booking and tracking.
               </p>
             </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20">
        <RollingLogs />
      </div>
    </section>
  );
};

const InteractiveCapabilities = () => {
  const [activeTab, setActiveTab] = useState("freight");

  return (
    <section className="py-32 px-6 bg-neutral-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Sidebar Navigation */}
        <div className="lg:w-1/3 space-y-2">
          <h2 className="text-xs font-mono text-neutral-500 mb-8 uppercase tracking-widest">
            // Select Module
          </h2>
          {capabilities.map((cap) => (
            <button
              key={cap.id}
              onClick={() => setActiveTab(cap.id)}
              className={`w-full text-left p-6 border transition-all duration-300 group ${
                activeTab === cap.id 
                  ? "border-rose-500 bg-rose-500/5" 
                  : "border-white/10 hover:border-white/30 bg-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-mono uppercase ${activeTab === cap.id ? "text-rose-400" : "text-neutral-500"}`}>
                  0{capabilities.indexOf(cap) + 1}
                </span>
                <cap.icon size={20} className={activeTab === cap.id ? "text-rose-500" : "text-neutral-600"} />
              </div>
              <span className={`text-2xl font-bold ${activeTab === cap.id ? "text-white" : "text-neutral-400 group-hover:text-white"}`}>
                {cap.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content Display Area */}
        <div className="lg:w-2/3 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {capabilities.map((cap) => (
              activeTab === cap.id && (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-8">
                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                      {cap.title}
                    </h2>
                    <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                    {cap.stats.map((stat, idx) => (
                      <div key={idx} className="p-6 bg-black/40 border border-white/10 backdrop-blur-sm">
                        <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-xs font-mono text-rose-500 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-rose-500/20 rounded-tr-3xl" />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

const DataGrid = () => (
  <section className="py-20 bg-black border-y border-white/10 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Activity className="text-emerald-500" /> Live Operations
        </h3>
        <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-500">REALTIME_FEED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
        {[
            { label: "Server Load", val: "42%", icon: Wifi, col: "text-emerald-500" },
            { label: "Encryption", val: "AES-256", icon: Lock, col: "text-blue-500" },
            { label: "Active Routes", val: "84", icon: Map, col: "text-purple-500" },
            { label: "Power Grid", val: "STABLE", icon: Zap, col: "text-yellow-500" },
        ].map((item, idx) => (
            <div key={idx} className="bg-neutral-900 p-8 flex flex-col gap-4 group hover:bg-neutral-800 transition-colors">
                <div className="flex justify-between items-start">
                    <item.icon className={`w-6 h-6 ${item.col}`} />
                    <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                    <h4 className="text-3xl font-bold text-white">{item.val}</h4>
                    <p className="text-xs font-mono text-neutral-500 mt-1 uppercase">{item.label}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-neutral-950 pt-24 pb-12 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
      <div>
         <h2 className="text-9xl font-bold text-neutral-900 tracking-tighter select-none">SAKURA.</h2>
      </div>
      <div className="flex gap-8 mb-8 md:mb-4 text-xs font-mono text-neutral-600 uppercase">
        <span>// DAR_ES_SALAAM_HQ</span>
        <span>// NAIROBI_HUB</span>
        <span>// LILONGWE_LINK</span>
      </div>
    </div>
  </footer>
);

export default function LogisticsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-rose-500 selection:text-white">
      <Navbar />
      <Hero />
      <DataGrid />
      <InteractiveCapabilities />
      <Footer />
    </main>
  );
}
