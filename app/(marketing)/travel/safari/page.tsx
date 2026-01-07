"use client";

import React from "react";
import Image from "next/image";
import { TravelSubNav } from "@/components/travel/travel-sub-nav";
import { Compass, ShieldCheck, Map } from "lucide-react";

export default function SafariPage() {
  return (
    <div className="bg-[#02040a] min-h-screen">
      <TravelSubNav />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center px-6">
        <Image 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000" 
          alt="Serengeti Safari" 
          fill 
          className="object-cover opacity-50 grayscale-[30%]"
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
            Wild <br/><span className="text-violet-500 italic">Sovereignty.</span>
          </h1>
          <p className="mt-8 text-slate-300 max-w-xl text-lg font-light">
            Orchestrated expeditions into the heart of the Serengeti, Ngorongoro, and beyond. 
            Luxury meets the untamed.
          </p>
        </div>
      </section>

      {/* Booking Form Interface */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="flex gap-6">
            <Compass className="text-violet-500 shrink-0" size={32} />
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest mb-2">Private Rangers</h3>
              <p className="text-slate-500 text-sm">Dedicated experts who know the land's secrets.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <ShieldCheck className="text-violet-500 shrink-0" size={32} />
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest mb-2">Secure Transit</h3>
              <p className="text-slate-500 text-sm">Internal logistics handled by Sakura Logistics.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-10 rounded-sm backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white uppercase mb-8">Secure Safari Slot</h2>
          <form className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Expedition Date" className="bg-black/50 border border-white/10 p-4 text-white text-xs uppercase tracking-widest font-bold focus:border-violet-500 outline-none" />
                <input type="number" placeholder="Guests" className="bg-black/50 border border-white/10 p-4 text-white text-xs uppercase tracking-widest font-bold focus:border-violet-500 outline-none" />
             </div>
             <select className="w-full bg-black/50 border border-white/10 p-4 text-white text-xs uppercase tracking-widest font-bold focus:border-violet-500 outline-none appearance-none">
                <option>Serengeti Premium Camp</option>
                <option>Ngorongoro Crater Lodge</option>
                <option>Selous River Fly-In</option>
             </select>
             <button className="w-full py-5 bg-violet-600 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-violet-500 transition-all">
                Request Itinerary
             </button>
          </form>
        </div>
      </section>
    </div>
  );
}