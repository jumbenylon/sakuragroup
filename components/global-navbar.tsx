"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Server, Zap, 
  CreditCard, Truck, Briefcase, Mic, 
  Plane, ShieldCheck, ArrowRight 
} from "lucide-react";

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "Software",
      links: [
        { name: "SakuraHost", href: "/hosting", icon: Server, d: "Cloud & Domains" },
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
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 px-4 md:px-8 font-sans ${
          isScrolled 
            ? "py-4 bg-[#050912]/95 backdrop-blur-md border-b border-white/10 shadow-2xl" 
            : "py-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative z-[10000] block w-40 md:w-48 h-10 md:h-12 shrink-0">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura Group" 
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 768px) 160px, 192px"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:text-emerald-400 transition-colors">Home</Link>
            
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative group h-full py-2"
                onMouseEnter={() => item.links && setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {item.links ? (
                  <button className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${activeMenu === item.label ? "text-emerald-400" : "text-white/80 hover:text-white"}`}>
                    {item.label} <ChevronDown size={12} className={`transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link href={item.href || "#"} className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                )}

                {/* DROPDOWN */}
                <AnimatePresence>
                  {activeMenu === item.label && item.links && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72"
                    >
                      <div className="bg-[#0B1120] border border-white/10 rounded-xl p-3 shadow-2xl ring-1 ring-black/5">
                        {item.links.map((link) => (
                          <Link key={link.name} href={link.href} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group/item">
                            <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-black transition-colors">
                              <link.icon size={16} />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white mb-0.5">{link.name}</div>
                              <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">{link.d}</div>
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

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <Link 
              href="/#contact" 
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              Start Project <ArrowRight size={14} />
            </Link>
            
            <button 
              onClick={() => setMobileOpen(true)} 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#050912] overflow-y-auto font-sans"
          >
            <div className="p-6 md:p-8 min-h-screen flex flex-col">
              <div className="flex justify-between items-center mb-12">
                <div className="relative w-40 h-10">
                    <Image src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" alt="Logo" fill className="object-contain object-left" />
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-white p-2 bg-white/5 rounded-full"><X size={24} /></button>
              </div>
              
              <div className="flex-1 space-y-8">
                {navItems.map((item) => (
                  <div key={item.label} className="border-b border-white/5 pb-6 last:border-0">
                    {item.links ? (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">{item.label}</h4>
                        <div className="grid gap-3">
                            {item.links.map(l => (
                            <Link key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="text-xl font-bold text-white hover:text-emerald-400 transition-colors block pl-4 border-l-2 border-white/10 hover:border-emerald-500">
                                {l.name}
                            </Link>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <Link href={item.href || "#"} onClick={() => setMobileOpen(false)} className="block text-3xl font-bold text-white hover:text-emerald-500 transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-8 mt-8 border-t border-white/10">
                <Link href="/#contact" onClick={() => setMobileOpen(false)} className="w-full flex items-center justify-center gap-2 py-4 bg-emerald-600 text-white font-bold uppercase tracking-widest rounded-lg">
                    Start Project Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
