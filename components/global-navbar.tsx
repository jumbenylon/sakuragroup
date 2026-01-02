"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Server, Zap, 
  CreditCard, Truck, Briefcase, Mic, 
  Plane, ShieldCheck, Terminal, ArrowRight 
} from "lucide-react";

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Software",
      links: [
        { name: "SakuraHost", href: "/hosting", icon: Server, d: "Cloud Infrastructure" },
        { name: "Axis", href: "/axis", icon: Zap, d: "Unified Comm API" },
      ]
    },
    { label: "Pay", href: "/sakurapay" },
    { label: "Logistics", href: "/logistics" },
    {
      label: "Grow",
      links: [
        { name: "Sakura Agency", href: "/marketing", icon: Briefcase, d: "Creative Engine" },
        { name: "Think Loko", href: "/thinkloko", icon: Mic, d: "Media & Culture" },
        { name: "Sakura Travels", href: "/travel", icon: Plane, d: "Cinematic Travel" },
        { name: "Roof Cleaning", href: "/roofcleaning", icon: ShieldCheck, d: "Industrial RCS" },
      ]
    },
    { label: "Learn", href: "/learn" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 transition-all duration-500 px-6 z-[9999] ${
        isScrolled ? "py-4 bg-[#050912]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "py-8 bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. LOGO (Dominant Presence - Increased height +15px) */}
        <Link href="/" className="relative w-52 h-[60px] flex items-center shrink-0">
          <Image 
            src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
            alt="Sakura Group" 
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* 2. DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-white transition-all">Home</Link>
          
          {navItems.map((item) => (
            <div 
              key={item.label} 
              className="relative group"
              onMouseEnter={() => item.links && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.links ? (
                <button className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeMenu === item.label ? "text-emerald-400" : "text-white/70 hover:text-white"}`}>
                  {item.label} <ChevronDown size={12} className={`transition-transform duration-300 ${activeMenu === item.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link href={item.href || "#"} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-white transition-all">{item.label}</Link>
              )}

              {/* DROPDOWN PANEL */}
              <AnimatePresence>
                {activeMenu === item.label && item.links && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    className="absolute top-full left-[-20px] pt-6 w-72 pointer-events-auto"
                  >
                    <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-3xl">
                      {item.links.map((link) => (
                        <Link key={link.name} href={link.href} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group/item">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all">
                            <link.icon size={18} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{link.name}</div>
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest">{link.d}</div>
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

        {/* 3. PREMIUM CTA */}
        <div className="flex items-center gap-6">
          <Link href="/#contact" className="hidden md:flex items-center gap-3 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]">
            Start Project <ArrowRight size={14} />
          </Link>
          
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white p-2">
            <Menu size={32} />
          </button>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[10000] bg-[#050912] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <Image src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" alt="Logo" width={160} height={50} className="object-contain" />
              <button onClick={() => setMobileOpen(false)} className="text-white"><X size={40} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-10">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.links ? (
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.label}</p>
                      {item.links.map(l => (
                        <Link key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="block text-3xl font-bold text-white">{l.name}</Link>
                      ))}
                    </div>
                  ) : (
                    <Link href={item.href || "#"} onClick={() => setMobileOpen(false)} className="block text-4xl font-black text-white">{item.label}</Link>
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
