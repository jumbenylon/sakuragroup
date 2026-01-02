"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Instagram, Linkedin, Twitter, 
  MapPin, Phone, Mail, ArrowUp,
  Send, Command, ShieldCheck, Globe
} from "lucide-react";

export function GlobalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ecosystemLinks = [
    { name: "SakuraPay", href: "/sakurapay" },
    { name: "Sakura Logistics", href: "/logistics" },
    { name: "Axis by Sakura", href: "/axis" },
    { name: "Xhule — Learn", href: "/learn" },
    { name: "Roof Cleaning (RCS)", href: "/roofcleaning" },
  ];

  const secondaryLinks = [
    { name: "SakuraHost", href: "/hosting" },
    { name: "Sakura Agency", href: "/marketing" },
    { name: "Sakura Travels", href: "/travel" },
    { name: "Think Loko", href: "/thinkloko" },
  ];

  const insights = [
    { 
      title: "The Future of Digital Payments in TZ", 
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200" 
    },
    { 
      title: "Logistics: Moving the Soul of Mwenge", 
      img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=200" 
    },
  ];

  return (
    <footer className="bg-[#050912] text-white pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* GHOST WATERMARK */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none flex justify-center overflow-hidden z-0">
        <h1 className="text-[20vw] font-black text-white/5 leading-none tracking-tighter whitespace-nowrap translate-y-[30%] mix-blend-overlay">
          SAKURA
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. THE INTEL BAR (Engagement Zone) */}
        <div className="bg-[#0B1120] rounded-[2.5rem] p-8 md:p-16 mb-24 flex flex-col lg:flex-row justify-between items-center gap-10 border border-white/5 shadow-2xl backdrop-blur-xl">
            <div className="max-w-xl text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none">
                    Signup for latest news and insights from Sakura Group.
                </h2>
                <p className="text-slate-500 text-sm font-light">Join the intelligence feed for updates across the ecosystem.</p>
            </div>
            <div className="flex w-full lg:w-auto gap-3 items-center">
                <div className="relative flex-grow lg:w-96">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="email" 
                        placeholder="Enter your email address"
                        className="w-full bg-[#050912] border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700"
                    />
                </div>
                <button className="px-10 py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
                    Subscribe
                </button>
            </div>
        </div>

        {/* 2. ARCHITECTURAL GRID (Navigation Zone) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-3 space-y-10">
            <Link href="/" className="inline-block relative w-44 h-12">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group Logo" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              We create digital and physical experiences for brands and companies using technology — engineering the rails of African commerce.
            </p>
            <div className="flex gap-5">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                        <Icon size={20} />
                    </a>
                ))}
            </div>
          </div>

          {/* INSIGHTS COLUMN */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 flex items-center gap-2">
                <Command size={12} className="text-emerald-500" /> Latest Insights
            </h4>
            <div className="space-y-8">
                {insights.map((item, i) => (
                    <Link key={i} href="/thinkloko" className="flex gap-5 group">
                        <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-white/10">
                            <Image src={item.img} alt={item.title} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
                        </div>
                        <p className="text-sm font-bold text-slate-300 group-hover:text-emerald-400 transition-colors leading-tight self-center">
                            {item.title}
                        </p>
                    </Link>
                ))}
            </div>
          </div>

          {/* ECOSYSTEM COLUMN */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Ecosystem</h4>
            <div className="grid grid-cols-1 gap-8">
                <ul className="space-y-4">
                    {[...ecosystemLinks, ...secondaryLinks].map(link => (
                        <li key={link.name}>
                            <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-3 group">
                                <span className="w-0 h-[1px] bg-emerald-500 group-hover:w-4 transition-all" />
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">Global HQ</h4>
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] space-y-8 backdrop-blur-md">
                <div className="flex gap-4">
                    <Mail size={18} className="text-emerald-500 mt-1 shrink-0" />
                    <a href="mailto:info@sakuragroup.co.tz" className="text-sm text-slate-400 hover:text-white transition-colors truncate">
                        info@sakuragroup.co.tz
                    </a>
                </div>
                <div className="flex gap-4">
                    <Phone size={18} className="text-emerald-500 shrink-0" />
                    <div className="text-sm text-slate-400 space-y-1">
                        <p>+255 753 930 000</p>
                        <p>+255 782 020 840</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <MapPin size={18} className="text-emerald-500 shrink-0" />
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Mwenge, TRA Road<br />Dar es Salaam, Tanzania
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* 3. FINAL BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-[0.3em] text-slate-600 uppercase">
             <span>© {new Date().getFullYear()} Sakura Group</span>
             <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
             <div className="flex items-center gap-2">
                <Globe size={12} />
                <span>Ecosystem Active</span>
             </div>
          </div>

          <button onClick={scrollToTop} className="group flex items-center gap-4 text-white font-black bg-white/5 py-4 px-8 rounded-full border border-white/10 hover:border-emerald-500/50 transition-all text-[10px] uppercase tracking-widest">
            Return to Summit <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
