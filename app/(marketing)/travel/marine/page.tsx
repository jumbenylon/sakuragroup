"use client";

import React from "react";
import Image from "next/image";
import { TravelSubNav } from "@/components/travel/travel-sub-nav";
import { Anchor, Sun, Waves } from "lucide-react";

export default function MarinePage() {
  return (
    <div className="bg-[#02040a] min-h-screen">
      <TravelSubNav />
      
      <section className="relative h-[70vh] flex items-center px-6">
        <Image 
          src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=2000" 
          alt="Zanzibar Marine" 
          fill 
          className="object-cover opacity-60 grayscale-[10%]"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
          <h1 className="text-7xl md:text-[10rem] font-black text-white tracking-tighter uppercase leading-[0.8] mb-6">
            AZURE <br/><span className="text-cyan-400 italic">GATEWAY.</span>
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto text-xl font-light">
            Luxury yacht charters and private island retreats in the Zanzibar Archipelago.
          </p>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
           {[{
             title: "Yacht Charter",
             icon: Anchor,
             desc: "Private sunset cruises and deep-sea expeditions."
           }, {
             title: "Island Stays",
             icon: Sun,
             desc: "Ultra-luxury villas on exclusive private islands."
           }, {
             title: "Water Ops",
             icon: Waves,
             desc: "Professional diving and marine exploration."
           }].map((item, i) => (
             <div key={i} className="p-10 bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group">
                <item.icon className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-4 italic">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}