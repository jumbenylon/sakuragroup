"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Globe, Cpu, Zap } from "lucide-react";

const VALUES = [
  { label: "Reliability", icon: Shield, desc: "Infrastructure that never blinks." },
  { label: "Sovereignty", icon: Globe, desc: "Local control over global technology." },
  { label: "Engineering", icon: Cpu, desc: "Built with industrial-grade precision." },
  { label: "Velocity", icon: Zap, desc: "Moving at the speed of the next economy." }
];

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black pt-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none" />
      
      {/* Narrative Hero */}
      <section className="relative h-[80vh] flex items-center px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] font-black leading-[0.8] tracking-tighter uppercase mb-12"
          >
            NI <span className="italic text-neutral-600">SISI.</span>
          </motion.h1>
          
          <div className="grid md:grid-cols-2 gap-20 items-end">
            <p className="text-xl md:text-3xl font-light leading-snug border-l-4 border-white pl-8 italic">
              "We are the quiet engine behind the transition. The builders of the 
              backbone. The architects of Tanzanian sovereignty."
            </p>
            <div className="text-neutral-500 font-mono text-xs uppercase tracking-[0.3em]">
              Established 2024 — Dar es Salaam, TZ
            </div>
          </div>
        </div>
      </section>

      {/* The Values Grid */}
      <section className="py-32 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          {VALUES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-12 bg-neutral-900/50 border border-white/5 hover:bg-white hover:text-black transition-all duration-500 group">
                <Icon size={32} className="mb-8 text-neutral-500 group-hover:text-black" />
                <h3 className="text-sm font-black uppercase tracking-widest mb-4">{item.label}</h3>
                <p className="text-xs opacity-50 group-hover:opacity-100 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Industrial Visual Anchor */}
      <section className="relative h-[60vh] border-y border-white/10">
        <Image 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
          alt="Sakura Industrial Infrastructure" 
          fill 
          className="object-cover grayscale contrast-125 opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-center italic">
                The Operating <br/> Backbone.
            </h2>
        </div>
      </section>
    </main>
  );
}