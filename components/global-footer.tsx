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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050912] text-white pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 1. NEWSLETTER BAR */}
        <div className="bg-[#0B1120] rounded-3xl p-8 md:p-12 mb-20 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Join the Ecosystem Intelligence</h2>
                <p className="text-slate-400 text-sm">Insights on African tech, logistics, and finance.</p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
                <input 
                    type="email" 
                    placeholder="Email address"
                    className="w-full lg:w-80 bg-[#050912] border border-white/10 rounded-xl px-6 py-4 text-sm focus:border-emerald-500 outline-none text-white placeholder:text-slate-600"
                />
                <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all whitespace-nowrap">
                    Subscribe
                </button>
            </div>
        </div>

        {/* 2. MAIN NAVIGATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* BRAND */}
          <div className="space-y-6">
            <Link href="/" className="block relative w-48 h-12">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              We create digital and physical experiences for brands and companies using technology — engineering the rails of African commerce.
            </p>
            <div className="flex gap-4 pt-2">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                        <Icon size={18} />
                    </a>
                ))}
            </div>
          </div>

          {/* ECOSYSTEM */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8">Ecosystem</h4>
            <ul className="space-y-4">
                {[
                    { n: "SakuraPay", l: "/sakurapay" },
                    { n: "Logistics", l: "/logistics" },
                    { n: "Axis API", l: "/axis" },
                    { n: "Xhule Learn", l: "/learn" },
                    { n: "Roof Cleaning", l: "/roofcleaning" }
                ].map((link) => (
                    <li key={link.n}>
                        <Link href={link.l} className="text-sm text-slate-400 hover:text-white transition-colors block py-1">
                            {link.n}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* GROW & SUPPORT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8">Grow & Support</h4>
            <ul className="space-y-4">
                {[
                    { n: "SakuraHost", l: "/hosting" },
                    { n: "Sakura Agency", l: "/marketing" },
                    { n: "Think Loko", l: "/thinkloko" },
                    { n: "Travels", l: "/travel" },
                    { n: "Client Portal", l: "#" }
                ].map((link) => (
                    <li key={link.n}>
                        <Link href={link.l} className="text-sm text-slate-400 hover:text-white transition-colors block py-1">
                            {link.n}
                        </Link>
                    </li>
                ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-8">Global HQ</h4>
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
                <div className="flex gap-4">
                    <Mail size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <a href="mailto:info@sakuragroup.co.tz" className="text-sm text-slate-300 hover:text-white break-all">info@sakuragroup.co.tz</a>
                </div>
                <div className="flex gap-4">
                    <Phone size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                        <p>+255 753 930 000</p>
                        <p>+255 782 020 840</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">Mwenge, TRA Road<br/>Dar es Salaam, TZ</p>
                </div>
            </div>
          </div>

        </div>

        {/* 3. COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-4">
                <span>© {new Date().getFullYear()} Sakura Group</span>
                <span className="hidden md:inline w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="flex items-center gap-1"><ShieldCheck size={10} /> Secure</span>
            </div>
            
            <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-white transition-colors">
                Return to Top <ArrowUp size={12} />
            </button>
        </div>
      </div>
    </footer>
  );
}
