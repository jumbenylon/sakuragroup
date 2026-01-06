"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function TravelHero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* 1. The High-Res Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          // A high-end, moody safari/nature shot from Unsplash
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop"
          alt="Sakura Travel Experience"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        
        {/* 2. Cinematic Dark Overlay (Crucial for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-[#02040a]" />
        
        {/* 3. Subtle Noise Texture (Optional, matches your other pages) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* 4. The Hero Content */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-900/30 border border-violet-500/30 rounded-full mb-8 backdrop-blur-md">
          <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-violet-300">
            Premium Aviation & Safari Protocol
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
          Travel <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-200 italic">
            Sovereign.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed mb-10 text-shadow-sm">
          "We provide the infrastructure; you provide the destination. 
          Experience the ultimate expression of freedom."
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/contact" 
            className="px-8 py-4 bg-violet-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-violet-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            Book Experience
          </Link>
          <Link 
            href="#aviation" 
            className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            View Fleet
          </Link>
        </div>
      </div>
    </section>
  );
}
