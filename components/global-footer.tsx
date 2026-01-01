"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Phone, Mail, MapPin, Instagram, Linkedin, Twitter, 
  ArrowUpRight, Send, Command 
} from "lucide-react";

export function GlobalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050912] pt-32 pb-12 overflow-hidden text-white border-t border-white/5">
      {/* DECORATIVE GRADIENT LINE */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* COL 1: BRAND & MISSION (Span 4) */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="block relative w-40 h-12">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              We build the rails for African commerce. A conglomerate engineering the infrastructure of tomorrow.
            </p>
            
            {/* TERMINAL INPUT */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Command size={14} className="text-emerald-500" />
                </div>
                <input 
                    type="email" 
                    placeholder="Enter email for intel..." 
                    className="w-full bg-[#0B1120] border border-white/10 rounded-xl py-4 pl-12 pr-12 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all font-mono"
                />
                <button className="absolute inset-y-0 right-2 p-2 text-slate-500 hover:text-white transition-colors">
                    <Send size={16} />
                </button>
            </div>
          </div>

          {/* COL 2: NAVIGATION MATRIX (Span 4) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-6">Ecosystem</h4>
                <ul className="space-y-4">
                    {[
                        { name: "Hosting", href: "/hosting" },
                        { name: "Fintech", href: "/sakurapay" },
                        { name: "Logistics", href: "/logistics" },
                        { name: "Construction", href: "/industrial" },
                        { name: "Agency", href: "/marketing" },
                    ].map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                                <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-6">Company</h4>
                <ul className="space-y-4">
                    {[
                        { name: "About Us", href: "/#story" },
                        { name: "Careers", href: "#" },
                        { name: "The Terminal", href: "/learn" },
                        { name: "Think Loko", href: "/media" },
                        { name: "Contact", href: "/#contact" },
                    ].map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                                <ArrowUpRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                                <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* COL 3: CONTACT INTEL (Span 4) */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">Global HQ</h4>
            
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/5 space-y-6">
                <div className="flex items-start gap-4">
                    <MapPin className="text-emerald-500 mt-1 shrink-0" />
                    <div>
                        <p className="text-white font-medium">Mwenge opposite TRA Tax Offices</p>
                        <p className="text-slate-500 text-sm">Mabatini Road - Kijitonyama<br/>Dar es Salaam, Tanzania</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="text-emerald-500 shrink-0" />
                    <div className="flex flex-col text-sm text-slate-400">
                        <a href="tel:+255753930000" className="hover:text-white transition-colors">+255 753 930 000</a>
                        <a href="tel:+255782020840" className="hover:text-white transition-colors">+255 782 020 840</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="text-emerald-500 shrink-0" />
                    <a href="mailto:info@sakuragroup.co.tz" className="text-sm text-slate-400 hover:text-white transition-colors">
                        info@sakuragroup.co.tz
                    </a>
                </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs font-mono">
                © {new Date().getFullYear()} SAKURA GROUP. ALL SYSTEMS OPERATIONAL.
            </p>
            
            <div className="flex gap-6">
                <a href="https://instagram.com/sakuragroup.tz" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-500 transition-colors">
                    <Instagram size={18} />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-blue-500 transition-colors">
                    <Linkedin size={18} />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-sky-500 transition-colors">
                    <Twitter size={18} />
                </a>
            </div>

            <button onClick={scrollToTop} className="text-xs font-bold text-white uppercase tracking-widest hover:text-emerald-400 transition-colors">
                Back to Top ↑
            </button>
        </div>
      </div>

      {/* MASSIVE BACKGROUND TEXT */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none flex justify-center overflow-hidden opacity-[0.03]">
        <h1 className="text-[15vw] font-black text-white leading-none tracking-tighter whitespace-nowrap translate-y-[20%]">
            SAKURA GROUP
        </h1>
      </div>
    </footer>
  );
}
