"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Instagram, Linkedin, Twitter, 
  MapPin, Phone, Mail, ArrowUp,
  ShieldCheck
} from "lucide-react";

export function GlobalFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#050912] text-white pt-40 pb-12 px-8 border-t border-white/5 relative overflow-hidden font-sans">
      {/* Container changed to max-w-7xl for standard professional alignment */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* 1. MAIN NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* BRAND IDENTITY */}
          <div className="space-y-6">
            <Link href="/" className="block relative w-48 h-12 grayscale brightness-200">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Engineering the rails of African commerce through integrated technology, logistics, and industrial precision.
            </p>
            <div className="flex gap-4 pt-2">
                {[
                  { Icon: Instagram, href: "https://instagram.com/sakuragrouptz" },
                  { Icon: Linkedin, href: "https://linkedin.com/company/sakuragrouptz" },
                  { Icon: Twitter, href: "https://twitter.com/sakuragrouptz" }
                ].map(({ Icon, href }, i) => (
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all border border-white/5">
                        <Icon size={18} />
                    </a>
                ))}
            </div>
          </div>

          {/* ECOSYSTEM DIVISIONS */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Ecosystem</h4>
            <ul className="space-y-4">
                {[
                    { n: "SakuraPay", l: "/sakurapay" },
                    { n: "Logistics", l: "/logistics" },
                    { n: "Axis API", l: "/axis" },
                    { n: "Xhule Learn", l: "/learn" },
                    { n: "Construction", l: "/roofcleaning" }
                ].map((link) => (
                    <li key={link.n}>
                        <Link href={link.l} className="text-sm text-slate-400 hover:text-white transition-colors block py-1 font-light">
                            {link.n}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* INTELLIGENCE & SUPPORT */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Intelligence</h4>
            <ul className="space-y-4">
                {[
                    { n: "SakuraHost", l: "/hosting" },
                    { n: "Creative Agency", l: "/agency" },
                    { n: "Think Loko", l: "/thinkloko" },
                    { n: "Contact HQ", l: "/contact" },
                    { n: "Client Portal", l: "/login" } // Standardized to /login per auth structure
                ].map((link) => (
                    <li key={link.n}>
                        <Link href={link.l} className="text-sm text-slate-400 hover:text-white transition-colors block py-1 font-light">
                            {link.n}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* GLOBAL HQ NODE */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-8">Global HQ</h4>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="flex gap-4">
                    <Mail size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <a href="mailto:hello@sakuragroup.co.tz" className="text-sm text-slate-300 hover:text-white break-all font-light">hello@sakuragroup.co.tz</a>
                </div>
                <div className="flex gap-4">
                    <Phone size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300 font-mono">
                        <p>+255 753 930 000</p>
                        <p>+255 782 020 840</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300 leading-relaxed font-light">Mwenge, TRA Road<br/>Dar es Salaam, TZ</p>
                </div>
            </div>
          </div>

        </div>

        {/* 2. COPYRIGHT BAR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-4">
                <span>© {new Date().getFullYear()} Sakura Group Ltd</span>
                <span className="hidden md:inline w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-500" /> ISO Certified Network</span>
            </div>
            
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 hover:text-white transition-all group"
            >
                Return to Zenith <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
      </div>
    </footer>
  );
}