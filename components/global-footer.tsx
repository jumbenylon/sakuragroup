"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Phone, Mail, MapPin, Instagram, Linkedin, Twitter, 
  ArrowUpRight, Send, Command, Globe, ShieldCheck, Zap
} from "lucide-react";

export function GlobalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    ecosystem: [
      { name: "SakuraHost", href: "/hosting" },
      { name: "SakuraPay", href: "/sakurapay" },
      { name: "Sakura Logistics", href: "/logistics" },
      { name: "Industrial", href: "/industrial" },
      { name: "Sakura Agency", href: "/marketing" },
    ],
    company: [
      { name: "About Us", href: "/#story" },
      { name: "The Terminal", href: "/learn" },
      { name: "Think Loko", href: "/media" },
      { name: "Sakura Travels", href: "/travel" },
      { name: "Contact", href: "/#contact" },
    ]
  };

  return (
    <footer className="relative bg-[#050912] pt-32 pb-12 overflow-hidden text-white border-t border-white/5">
      {/* KINETIC BACKGROUND TEXT (Infinite Marquee) */}
      <div className="absolute top-1/2 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02] mix-blend-overlay z-0">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          <h1 className="text-[25vw] font-black tracking-tighter leading-none pr-20">
            SAKURA GROUP SAKURA GROUP SAKURA GROUP
          </h1>
          <h1 className="text-[25vw] font-black tracking-tighter leading-none pr-20">
            SAKURA GROUP SAKURA GROUP SAKURA GROUP
          </h1>
        </motion.div>
      </div>

      {/* TOP GRADIENT LINE */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          
          {/* COLUMN 1: BRAND IDENTITY */}
          <div className="space-y-8">
            <Link href="/" className="block relative w-44 h-12">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xs">
              Engineering the digital and physical rails for African commerce. 
              A conglomerate dedicated to radical functional purity.
            </p>
            
            {/* Intel Input */}
            <div className="relative group max-w-sm">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Command size={14} className="text-emerald-500" />
                </div>
                <input 
                    type="email" 
                    placeholder="Join the intelligence feed..." 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-12 text-xs focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all font-mono text-white placeholder:text-slate-600 backdrop-blur-sm"
                />
                <button className="absolute inset-y-0 right-2 flex items-center pr-2">
                    <div className="p-2 bg-emerald-500 rounded-full text-black hover:scale-110 transition-transform">
                        <Send size={14} />
                    </div>
                </button>
            </div>
          </div>

          {/* COLUMN 2: ECOSYSTEM */}
          <div>
            <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-10">Ecosystem</h4>
            <ul className="space-y-5">
                {footerLinks.ecosystem.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                            <span className="h-px w-0 bg-emerald-500 group-hover:w-4 transition-all duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* COLUMN 3: COMPANY */}
          <div>
            <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-10">Corporate</h4>
            <ul className="space-y-5">
                {footerLinks.company.map((link) => (
                    <li key={link.name}>
                        <Link href={link.href} className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                            <span className="h-px w-0 bg-rose-500 group-hover:w-4 transition-all duration-300" />
                            <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* COLUMN 4: GLOBAL HQ (Glass Card) */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">Global HQ</h4>
            
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Globe size={40} className="text-emerald-500" />
                </div>

                <div className="flex items-start gap-4">
                    <MapPin className="text-emerald-500 mt-1 shrink-0" size={18} />
                    <div>
                        <p className="text-white font-bold text-sm">Dar es Salaam</p>
                        <p className="text-slate-500 text-xs mt-2 leading-relaxed font-light">
                            Mwenge, Mabatini Road<br/>
                            Opposite TRA Offices<br/>
                            Tanzania
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <Phone className="text-emerald-500 mt-1 shrink-0" size={18} />
                    <div className="flex flex-col text-xs text-slate-400 gap-2 font-mono">
                        <a href="tel:+255753930000" className="hover:text-emerald-400 transition-colors">+255 753 930 000</a>
                        <a href="tel:+255782020840" className="hover:text-emerald-400 transition-colors">+255 782 020 840</a>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-4">
                    <Mail className="text-emerald-500 shrink-0" size={18} />
                    <a href="mailto:info@sakuragroup.co.tz" className="text-xs text-slate-400 hover:text-white transition-colors font-mono">
                        info@sakuragroup.co.tz
                    </a>
                </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
                <p className="text-slate-600 text-[10px] font-mono tracking-widest uppercase">
                    © {new Date().getFullYear()} SAKURA GROUP
                </p>
                <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-emerald-500/50 text-[10px] font-mono tracking-widest uppercase">
                    Core Systems Nominal
                </p>
            </div>
            
            <div className="flex gap-4">
                {[
                    { Icon: Instagram, color: "hover:text-rose-500", url: "https://instagram.com/sakuragroup.tz" },
                    { Icon: Linkedin, color: "hover:text-blue-500", url: "#" },
                    { Icon: Twitter, color: "hover:text-sky-400", url: "#" }
                ].map((social, idx) => (
                    <a 
                        key={idx} 
                        href={social.url} 
                        target="_blank" 
                        className={`p-3 rounded-full bg-white/5 border border-white/5 text-slate-400 ${social.color} transition-all duration-300 hover:-translate-y-1 hover:bg-white/10`}
                    >
                        <social.Icon size={16} />
                    </a>
                ))}
            </div>

            <button 
                onClick={scrollToTop} 
                className="group flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em] hover:text-emerald-400 transition-colors"
            >
                Back to Summit
                <div className="p-2 rounded-full border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                    <ArrowUpRight size={14} />
                </div>
            </button>
        </div>
      </div>
    </footer>
  );
}
