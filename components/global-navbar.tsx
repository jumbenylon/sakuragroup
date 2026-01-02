"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Search, ChevronDown, 
  CreditCard, Truck, Zap, Terminal, 
  ShieldCheck, Plane, Briefcase, Mic, 
  Server, ArrowRight, Command
} from "lucide-react";

const ecosystem = [
  { name: "SakuraPay", href: "/sakurapay", icon: CreditCard, desc: "Fintech Gateway" },
  { name: "Logistics", href: "/logistics", icon: Truck, desc: "Supply Chain" },
  { name: "Axis", href: "/axis", icon: Zap, desc: "Unified Comm API" },
  { name: "Xhule", href: "/learn", icon: Terminal, desc: "LMS & Skills" },
  { name: "Roof Cleaning", href: "/roofcleaning", icon: ShieldCheck, desc: "Industrial RCS" },
  { name: "Sakura Travels", href: "/travel", icon: Plane, desc: "Luxury Agency" },
  { name: "Sakura Agency", href: "/marketing", icon: Briefcase, desc: "Strategy & Brand" },
  { name: "Think Loko", href: "/thinkloko", icon: Mic, desc: "Media & Podcast" },
  { name: "SakuraHost", href: "/hosting", icon: Server, desc: "Cloud & Domains" },
];

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegamenuOpen, setIsMegamenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
          isScrolled ? "bg-[#050912]/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative w-32 h-8 group">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura Group" 
              fill
              className="object-contain object-left transition-transform group-hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            <div 
              className="relative"
              onMouseEnter={() => setIsMegamenuOpen(true)}
              onMouseLeave={() => setIsMegamenuOpen(false)}
            >
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors py-2">
                Ecosystem <ChevronDown size={14} className={`transition-transform duration-300 ${isMegamenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* MEGAMENU */}
              <AnimatePresence>
                {isMegamenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#0B1120] border border-white/10 rounded-3xl p-8 shadow-2xl mt-2 grid grid-cols-2 gap-4 backdrop-blur-2xl"
                  >
                    {ecosystem.map((item) => (
                      <Link key={item.name} href={item.href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/#story" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">Our Story</Link>
            <Link href="/#contact" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">Contact</Link>
          </div>

          {/* UTILITY ACTIONS */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all group">
              <Command size={14} />
              <span className="text-[10px] font-mono tracking-widest">K</span>
              <Search size={14} className="ml-1" />
            </button>
            
            <Link href="/#contact" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-lg shadow-emerald-600/20 flex items-center gap-2">
              Start Project <ArrowRight size={14} />
            </Link>

            {/* MOBILE TOGGLE */}
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DASHBOARD OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-[#050912] p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                width={120} 
                height={30} 
                className="object-contain"
              />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>

            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Ecosystem Dashboard</h4>
                <div className="grid grid-cols-2 gap-4">
                  {ecosystem.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4"
                    >
                      <item.icon className="text-emerald-500" size={24} />
                      <span className="text-xs font-bold text-white uppercase tracking-widest">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                <Link href="/#story" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-white">Our Story</Link>
                <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-bold text-white">Contact HQ</Link>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>System Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
