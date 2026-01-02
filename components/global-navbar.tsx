"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, 
  CreditCard, Truck, Zap, Terminal, 
  ShieldCheck, Plane, Briefcase, Mic, 
  Server, ArrowRight, Globe
} from "lucide-react";

const navConfig = [
  {
    label: "Software",
    links: [
      { name: "SakuraHost", href: "/hosting", icon: Server, desc: "Cloud Infrastructure" },
      { name: "Axis", href: "/axis", icon: Zap, desc: "Unified Comm API" },
    ]
  },
  { label: "Pay", href: "/sakurapay" },
  { label: "Logistics", href: "/logistics" },
  {
    label: "Grow",
    links: [
      { name: "Sakura Agency", href: "/marketing", icon: Briefcase, desc: "Creative Engine" },
      { name: "Think Loko", href: "/thinkloko", icon: Mic, desc: "Media & Culture" },
      { name: "Sakura Travels", href: "/travel", icon: Plane, desc: "Cinematic Travel" },
      { name: "Roof Cleaning", href: "/roofcleaning", icon: ShieldCheck, desc: "Industrial RCS" },
    ]
  },
  { label: "Learn", href: "/learn" },
];

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Immediate check on mount
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll(); 

    window.addEventListener("scroll", handleScroll);
    const handleClickOutside = () => setActiveDropdown(null);
    window.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-700 px-6 ${
        isScrolled 
          ? "py-4 bg-[#050912]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl" 
          : "py-8 bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* LOGO - FORCED VISIBILITY */}
        <Link href="/" className="relative w-48 h-[55px] flex items-center justify-start z-[1001]">
          <div className="relative w-full h-full min-w-[150px]">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura Group" 
              fill
              className="object-contain object-left priority"
              priority
              sizes="200px"
            />
          </div>
        </Link>

        {/* DESKTOP NAV - REINFORCED CONTRAST */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-[10px] font-black uppercase tracking-[0.25em] text-white hover:text-emerald-400 transition-colors">Home</Link>
          
          {navConfig.map((item) => (
            <div key={item.label} className="relative">
              {item.links ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.label ? null : item.label); }}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                    activeDropdown === item.label ? "text-emerald-400" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label} <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link href={item.href || "#"} className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors">
                  {item.label}
                </Link>
              )}

              <AnimatePresence>
                {activeDropdown === item.label && item.links && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-72 bg-[#0B1120] border border-white/10 rounded-2xl p-4 shadow-2xl mt-6 backdrop-blur-3xl z-[1100]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-1">
                      {item.links.map((link) => (
                        <Link 
                          key={link.name} 
                          href={link.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                            <link.icon size={16} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{link.name}</div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest">{link.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA - PREMIUM HUD ELEMENT */}
        <div className="flex items-center gap-6">
          <Link 
            href="/#contact" 
            className="hidden md:flex items-center gap-3 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] z-[1001]"
          >
            Start Project <ArrowRight size={14} />
          </Link>

          <button 
            className="lg:hidden text-white p-2 z-[1001]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-0 z-[2000] bg-[#050912] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="relative w-40 h-10">
                <Image 
                  src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                  alt="Sakura Group" 
                  fill
                  className="object-contain"
                />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <div className="space-y-10 overflow-y-auto">
              {navConfig.map((item) => (
                <div key={item.label}>
                   {item.links ? (
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.label}</h4>
                        {item.links.map(l => (
                          <Link key={l.name} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-white mb-2">{l.name}</Link>
                        ))}
                     </div>
                   ) : (
                     <Link href={item.href || "#"} onClick={() => setIsMobileMenuOpen(false)} className="block text-4xl font-black text-white">{item.label}</Link>
                   )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
