"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Instagram, Linkedin, Twitter, 
  MapPin, Phone, Mail, ArrowUp
} from "lucide-react";

export function GlobalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Grouping everything under Ecosystem as the primary driver
  const ecosystemLinks = [
    { name: "SakuraPay", href: "/sakurapay" },
    { name: "SakuraHost", href: "/hosting" },
    { name: "Sakura Logistics", href: "/logistics" },
    { name: "Sakura Agency", href: "/marketing" },
    { name: "Axis by Sakura", href: "/axis" },
    { name: "Sakura Travels", href: "/travel" },
    { name: "Xhule — Learn", href: "/learn" },
    { name: "Think Loko", href: "/media" },
    { name: "Industrial (RCS)", href: "/industrial" },
  ];

  const corporateLinks = [
    { name: "The Group", href: "/#story" },
    { name: "Contact HQ", href: "/#contact" },
    { name: "Careers", href: "#" },
    { name: "Legal", href: "/privacy" },
  ];

  return (
    <footer className="bg-[#020617] text-white pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* BRAND BLOCK */}
          <div className="md:col-span-4 space-y-8">
            <Link href="/" className="inline-block relative w-40 h-10">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm">
              Engineering the digital and physical infrastructure of tomorrow. A multi-sector conglomerate defined by functional purity.
            </p>
            <div className="flex gap-4">
                {[
                    { icon: Instagram, url: "https://instagram.com/sakuragroup.tz" },
                    { icon: Linkedin, url: "#" },
                    { icon: Twitter, url: "#" }
                ].map((social, i) => (
                    <a 
                        key={i} 
                        href={social.url} 
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/40 transition-all duration-300"
                    >
                        <social.icon size={16} />
                    </a>
                ))}
            </div>
          </div>

          {/* ECOSYSTEM LINKS (Dense Grid) */}
          <div className="md:col-span-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">
                Ecosystem
            </h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                {ecosystemLinks.map((link) => (
                    <li key={link.name}>
                        <Link 
                            href={link.href} 
                            className="group text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                            <span className="w-0 h-[1px] bg-white group-hover:w-3 transition-all duration-300" />
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* CORPORATE & HQ */}
          <div className="md:col-span-3 space-y-12">
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">
                    Corporate
                </h4>
                <ul className="space-y-3">
                    {corporateLinks.map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="space-y-4 text-sm font-light text-slate-400 pt-6 border-t border-white/5">
                <div className="flex gap-3">
                    <MapPin size={16} className="text-white/20 shrink-0" />
                    <p>Mwenge, Dar es Salaam, TZ</p>
                </div>
                <div className="flex gap-3">
                    <Mail size={16} className="text-white/20 shrink-0" />
                    <a href="mailto:info@sakuragroup.co.tz" className="hover:text-white transition-colors">info@sakuragroup.co.tz</a>
                </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
             <span>© {new Date().getFullYear()} Sakura Group</span>
             <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
             <span>Ecosystem Active</span>
          </div>

          <div className="flex items-center gap-8">
             <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.2em]"
             >
                Return to Summit
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUp size={14} />
                </div>
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
