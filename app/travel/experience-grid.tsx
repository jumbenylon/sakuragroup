"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Waves, Mountain, Camera } from "lucide-react";

const EXPERIENCES = [
  {
    title: "Serengeti Safaris",
    description: "Witness the Great Migration from our premium luxury camps.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000",
    icon: Compass,
    color: "text-amber-500"
  },
  {
    title: "Zanzibar Shores",
    description: "Pristine white sands and the ancient heritage of Stone Town.",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1000",
    icon: Waves,
    color: "text-cyan-400"
  },
  {
    title: "Roof of Africa",
    description: "Guided expeditions to the summit of Mount Kilimanjaro.",
    image: "https://images.unsplash.com/photo-1589553416260-1947d9595fca?q=80&w=1000",
    icon: Mountain,
    color: "text-violet-400"
  },
  {
    title: "Cultural Hubs",
    description: "Deep-dive into the local heritage and artisan crafts of Tanzania.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=1000",
    icon: Camera,
    color: "text-rose-400"
  }
];

export function ExperienceGrid() {
  return (
    <section id="experiences" className="py-32 bg-[#02040a] px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
              Curated <span className="italic text-violet-500">Expeditions.</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              We don't just book travel; we orchestrate sovereign experiences across the East African landscape. 
              From the plains of the Serengeti to the peaks of Kilimanjaro.
            </p>
          </div>
          <button className="px-8 py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all">
            View All Destinations
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIENCES.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[500px] overflow-hidden rounded-sm border border-white/5"
            >
              {/* Image Layer */}
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-100"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <item.icon className={`${item.color} mb-4 transition-transform group-hover:scale-110`} size={32} />
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-violet-500 group-hover:text-white transition-colors">
                  Explore Now <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}