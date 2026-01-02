"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, 
  CreditCard, Truck, Zap, Terminal, 
  ShieldCheck, Plane, Briefcase, Mic, 
  Server, ArrowRight, Globe, Sparkles
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleClickOutside = () => setActiveDropdown(null);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 ${
        isScrolled ? "py-4 bg-[#050912]/90 backdrop-blur-2xl border-b border-white/5" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO - STATEMENT SIZE */}
        <Link href="/" className="relative w-48 h-[55px] group overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full h-full"
          >
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura Group" 
              fill
              className="object-contain object-left transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
            {/* Golden Shimmer Effect */}
            <motion.div 
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent w-1/2 skew-x-12 pointer-events-none"
            />
          </motion.div>
        </Link>

        {/* DESKTOP NAV - CATEGORIZED */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors">Home</Link>
          
          {navConfig.map((item) => (
            <div key={item.label} className="relative">
              {item.links ? (
                <button 
                  onClick={(e) => toggleDropdown(e, item.label)}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                    activeDropdown === item.label ? "text-emerald-400" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label} <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link href={item.href || "#"} className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors">
                  {item.label}
                </Link>
              )}

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {activeDropdown === item.label && item.links && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 w-72 bg-[#0B1120] border border-white/10 rounded-2xl p-4 shadow-2xl mt-6 backdrop-blur-3xl"
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

        {/* PREMIUM CTA */}
        <div className="flex items-center gap-6">
          <Link 
            href="/#contact" 
            className="hidden md:flex items-center gap-3 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] group"
          >
            Start Project 
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 z-[200] bg-[#050912] p-8 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                width={140} 
                height={40} 
                className="object-contain"
              />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>

            <div className="space-y-8 overflow-y-auto py-10">
              {navConfig.map((item) => (
                <div key={item.label} className="space-y-4">
                  {item.links ? (
                    <>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{item.label}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {item.links.map((link) => (
                          <Link 
                            key={link.name} 
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                          >
                            <link.icon className="text-emerald-500" size={20} />
                            <span className="text-sm font-bold text-white uppercase tracking-widest">{link.name}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link 
                      href={item.href || "#"} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-3xl font-bold text-white block hover:text-emerald-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Ecosystem Active</span>
              </div>
              <Globe size={18} className="text-slate-700" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
