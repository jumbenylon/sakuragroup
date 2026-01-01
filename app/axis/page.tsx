"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, MessageSquare, Terminal, Smartphone, 
  Globe, Zap, Code2, Check, ArrowRight 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const channels = [
  { name: "WhatsApp Business API", icon: MessageSquare, color: "text-green-500" },
  { name: "Bulk SMS (A2P)", icon: Smartphone, color: "text-blue-500" },
  { name: "USSD Gateways", icon: HashIcon, color: "text-yellow-500" }, // HashIcon helper below
  { name: "Two-Way Email", icon: Globe, color: "text-purple-500" },
];

function HashIcon({ className }: { className?: string }) {
  return <span className={`font-mono font-bold text-xl ${className}`}>#</span>;
}

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/80 backdrop-blur-xl">
    <Link href="/" className="group flex items-center gap-2 text-xs font-mono text-purple-500 hover:text-white transition-colors">
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      AXIS_CORE
    </Link>
    <ThemeToggle />
  </nav>
);

const CodeHero = () => {
  const [text, setText] = useState("");
  const fullText = `const axis = require('sakura-axis');\n\nawait axis.send({\n  channel: 'whatsapp',\n  to: '+255 753 930 000',\n  message: 'Your cargo has arrived.'\n});\n\n// Status: DELIVERED (12ms)`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg bg-neutral-900 rounded-xl border border-white/10 p-6 shadow-2xl font-mono text-xs md:text-sm overflow-hidden relative">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <pre className="text-purple-300">
        {text}
        <span className="animate-pulse inline-block w-2 h-4 bg-purple-500 ml-1 align-middle" />
      </pre>
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px] pointer-events-none" />
    </div>
  );
};

const Hero = () => (
  <section className="relative min-h-[90vh] flex items-center px-6 bg-black overflow-hidden pt-20">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
          <Zap size={12} className="text-purple-500" />
          <span className="text-[10px] font-bold tracking-widest text-purple-500 uppercase">
            Unified Communication API
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9]">
          Talk to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Everyone.
          </span>
        </h1>
        
        <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
          Orchestrate SMS, WhatsApp, and USSD flows from a single dashboard. 
          The infrastructure powering Tanzania's largest enterprises.
        </p>

        <div className="flex gap-4">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-400 transition-colors">
            Get API Keys
          </button>
        </div>
      </div>

      <div className="flex justify-center lg:justify-end">
        <CodeHero />
      </div>
    </div>
  </section>
);

const ChannelGrid = () => (
  <section className="py-24 px-6 bg-neutral-950 border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">The Omni-Channel Stack</h2>
        <div className="h-1 w-20 bg-purple-500" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {channels.map((c, i) => (
          <div key={i} className="group p-8 bg-neutral-900 border border-white/5 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
            <div className={`w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <c.icon className={`${c.color}`} size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{c.name}</h3>
            <p className="text-sm text-neutral-500">High-throughput delivery with automated failover logic.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 px-6 bg-black">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
      {[
        { t: "99.99% Uptime", d: "Redundant connections to all local telcos." },
        { t: "Real-Time Analytics", d: "Track delivery rates and open rates live." },
        { t: "Developer First", d: "SDKs for Node, Python, PHP, and Java." },
      ].map((f, i) => (
        <div key={i} className="border-l-2 border-purple-500/30 pl-6">
          <h4 className="text-2xl font-bold text-white mb-2">{f.t}</h4>
          <p className="text-neutral-400">{f.d}</p>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 text-center border-t border-white/10 bg-neutral-950">
    <p className="text-neutral-500 text-sm">
      &copy; {new Date().getFullYear()} Axis. Communication Infrastructure.
    </p>
  </footer>
);

export default function AxisPage() {
  return (
    <main className="min-h-screen bg-black selection:bg-purple-500 selection:text-white">
      <Navbar />
      <Hero />
      <ChannelGrid />
      <Features />
      <Footer />
    </main>
  );
}
