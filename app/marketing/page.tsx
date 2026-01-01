"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  PieChart, TrendingUp, Search, Target, Users, 
  Lightbulb, BarChart3, ArrowRight 
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

const Hero = () => (
  <section className="pt-40 pb-20 px-6 bg-neutral-950 min-h-[70vh] flex flex-col justify-center">
    <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-orange-500/20 bg-orange-500/10 rounded-full">
            <Lightbulb size={14} className="text-orange-500" />
            <span className="text-orange-500 font-mono text-xs uppercase tracking-widest">
                Strategic Intelligence
            </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            Chaos into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Growth.</span>
        </h1>
        
        <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
            We don't just advise; we execute. From market entry research in Tanzania to full-scale digital transformation and brand positioning.
        </p>
        
        <button className="flex items-center gap-2 text-white border-b border-orange-500 pb-1 hover:text-orange-500 transition-colors">
            View Case Studies <ArrowRight size={16} />
        </button>
      </div>

      {/* Abstract Strategy Visualization */}
      <div className="relative h-[400px] w-full bg-neutral-900 rounded-2xl border border-white/10 p-8 overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
         
         <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
                <div className="bg-black border border-white/10 p-4 rounded-lg">
                    <span className="text-xs text-neutral-500 uppercase block mb-1">Market Share</span>
                    <span className="text-2xl font-bold text-white">+24.5%</span>
                </div>
                <div className="bg-black border border-white/10 p-4 rounded-lg">
                    <span className="text-xs text-neutral-500 uppercase block mb-1">ROI</span>
                    <span className="text-2xl font-bold text-orange-500">4.2x</span>
                </div>
            </div>

            {/* Simulated Chart */}
            <div className="flex items-end justify-between gap-2 h-32">
                {[40, 65, 50, 80, 60, 90, 100].map((h, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="w-full bg-orange-500/20 rounded-t-sm relative group"
                    >
                        <div className="absolute bottom-0 left-0 w-full bg-orange-500 transition-all duration-500 h-0 group-hover:h-full opacity-80" />
                    </motion.div>
                ))}
            </div>
         </div>
      </div>
    </div>
  </section>
);

const Services = () => (
    <section className="py-24 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { 
                        title: "Market Research", 
                        icon: Search, 
                        desc: "Data-driven insights into Tanzanian consumer behavior. We uncover the 'Why' behind the buy."
                    },
                    { 
                        title: "Business Development", 
                        icon: TrendingUp, 
                        desc: "Partnership sourcing, government relations, and go-to-market strategies for foreign and local entities."
                    },
                    { 
                        title: "Brand Strategy", 
                        icon: Target, 
                        desc: "Positioning your identity to dominate the noise. From visual systems to tone-of-voice playbooks."
                    },
                ].map((s, i) => (
                    <div key={i} className="group cursor-default">
                        <div className="w-12 h-12 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:border-orange-500/50 transition-colors">
                            <s.icon className="text-white group-hover:text-orange-500 transition-colors" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                        <p className="text-neutral-400 leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-orange-500 selection:text-black">
      {/* UPDATED: No Props */}
      <GlobalNavbar />
      <Hero />
      <Services />
      <GlobalFooter />
    </main>
  );
}
