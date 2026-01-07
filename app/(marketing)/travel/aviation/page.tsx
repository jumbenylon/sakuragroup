"use client";

import React from "react";
import Image from "next/image";
import { TravelSubNav } from "@/components/travel/travel-sub-nav";
import { Plane, Shield, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AviationPage() {
  return (
    <div className="bg-[#02040a] min-h-screen selection:bg-violet-500">
      <TravelSubNav />
      
      {/* Aviation Hero */}
      <section className="relative h-[80vh] flex items-center px-6 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2000" 
            alt="Private Aviation Tanzania" 
            fill 
            className="object-cover opacity-40 grayscale-[40%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-[#02040a]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 inline-block px-3 py-1 border border-violet-500/30 bg-violet-500/10 rounded-full"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-400">Executive Fleet</span>
          </motion.div>
          <h1 className="text-7xl md:text-[9rem] font-black text-white tracking-tighter uppercase leading-[0.8]">
            SKY-HIGH <br/>
            <span className="text-violet-500 italic">COMMAND.</span>
          </h1>
          <p className="mt-8 text-slate-400 max-w-xl text-lg font-light leading-relaxed">
            Eliminate the friction of commercial travel. We orchestrate private flight paths 
            across the Serengeti, Kilimanjaro, and regional business hubs.
          </p>
        </div>
      </section>

      {/* Booking & Fleet Interface */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Booking Card */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 p-10 backdrop-blur-xl">
            <h2 className="text-3xl font-black text-white uppercase mb-8 italic">Charter Request</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Origin</label>
                  <input type="text" placeholder="e.g. Dar es Salaam" className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm font-bold focus:border-violet-500 outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Destination</label>
                  <input type="text" placeholder="e.g. Serengeti" className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm font-bold focus:border-violet-500 outline-none transition-colors" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</label>
                  <input type="date" className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm font-bold focus:border-violet-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Passengers</label>
                  <input type="number" placeholder="1" className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm font-bold focus:border-violet-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Aircraft Type</label>
                  <select className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm font-bold focus:border-violet-500 outline-none appearance-none">
                    <option>Light Turboprop (Cessna)</option>
                    <option>Mid-Size Jet</option>
                    <option>Helicopter Transfer</option>
                  </select>
                </div>
              </div>

              <button className="w-full py-6 bg-violet-600 text-white font-black uppercase tracking-[0.4em] text-[11px] hover:bg-violet-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                Initialize Dispatch
              </button>
            </form>
          </div>

          {/* Features Sidebar */}
          <div className="space-y-4">
            {[
              { icon: Shield, title: "Sovereign Safety", desc: "Rigorous maintenance and vetted pilots." },
              { icon: Clock, title: "Zero Wait-Time", desc: "Board within 15 minutes of arrival." },
              { icon: Plane, title: "Bush Access", desc: "Landing rights on remote private strips." }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/5">
                <feature.icon className="text-violet-500 mb-4" size={28} />
                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">{feature.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}