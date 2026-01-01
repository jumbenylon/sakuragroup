"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  motion, 
  AnimatePresence,
  useScroll,
  useMotionValueEvent 
} from "framer-motion";
import { 
  ChevronDown, Server, CreditCard, Zap, 
  Truck, ShieldCheck, Plane, Briefcase, 
  Terminal, Mic, Menu, X, ArrowRight 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- DATA STRUCTURE ---
const menuGroups = [
  {
    label: "Infrastructure",
    desc: "Digital Backbone",
    items: [
      { name: "SakuraHost", href: "/hosting", icon: Server, desc: "Cloud & Domains" },
      { name: "Axis Core", href: "/axis", icon: Zap, desc: "Comm API" },
      { name: "SakuraPay", href: "/sakurapay", icon: CreditCard, desc: "Fintech Gateway" },
    ]
  },
  {
    label: "Operations",
    desc: "Physical Engine",
    items: [
      { name: "Logistics", href: "/logistics", icon: Truck, desc: "Supply Chain" },
      { name: "Construction", href: "/industrial", icon: ShieldCheck, desc: "RCS & Epoxy" },
      { name: "Travels", href: "/travel", icon: Plane, desc: "Corporate Booking" },
    ]
  },
  {
    label: "Growth",
    desc: "Strategic Mind",
    items: [
      { name: "Agency", href: "/marketing", icon: Briefcase, desc: "Consultancy" },
      { name: "The Terminal", href: "/learn", icon: Terminal, desc: "EdTech LMS" },
      { name: "Think Loko", href: "/media", icon: Mic, desc: "Media House" },
    ]
  }
];

export function GlobalNavbar() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Close menus on route change
  useEffect(() => {
    setActiveTab(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* --- DESKTOP FLOATING ISLAND --- */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 transition-all duration-300 hidden md:block`}
      >
        <div 
          className={`relative flex items-center justify-between rounded-2xl border border-white/10 px-6 py-4 backdrop-blur-xl transition-all duration-500
          ${isScrolled ? "bg-black/80 shadow-2xl shadow-black/50" : "bg-black/40"}`}
          onMouseLeave={() => setActiveTab(null)}
        >
          
          {/* LOGO */}
          <Link href="/" className="relative z-50 flex items-center gap-2">
            <div className="relative h-8 w-32">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                    alt="Sakura Group" 
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div>
          </Link>

          {/* NAVIGATION LINKS */}
          <nav className="flex items-center gap-8">
            {menuGroups.map((group) => (
              <div 
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveTab(group.label)}
              >
                <button 
                  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 
                  ${activeTab === group.label ? "text-white" : "text-neutral-400 hover:text-white"}`}
                >
                  {group.label}
                  <ChevronDown 
                    size={12} 
                    className={`transition-transform duration-300 ${activeTab === group.label ? "rotate-180" : ""}`} 
                  />
                </button>

                {/* MEGA MENU DROPDOWN */}
                <AnimatePresence>
                  {activeTab === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-4 w-[350px] -translate-x-1/2 rounded-2xl border border-white/10 bg-neutral-900/95 p-2 shadow-2xl backdrop-blur-2xl"
                    >
                      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/10 bg-neutral-900/95" />
                      
                      <div className="grid gap-1">
                         <div className="px-4 py-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                                {group.desc}
                            </span>
                         </div>
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black border border-white/10 text-white group-hover:border-white/30 group-hover:text-rose-500 transition-colors">
                              <item.icon size={18} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-rose-500 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
             <ThemeToggle />
             <Link 
                href="/#footer" 
                className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black transition-transform hover:scale-105 hover:bg-rose-500 hover:text-white"
            >
                Start Project
             </Link>
          </div>
        </div>
      </motion.header>

      {/* --- MOBILE HEADER (Simplified) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/80 px-6 py-4 backdrop-blur-xl md:hidden border-b border-white/10">
         <Link href="/" className="relative h-8 w-28">
            <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
            />
         </Link>
         <button onClick={() => setMobileMenuOpen(true)} className="text-white">
            <Menu />
         </button>
      </header>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
               <span className="text-xs font-mono text-neutral-500">NAVIGATION</span>
               <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2 bg-neutral-900 rounded-full">
                  <X size={20} />
               </button>
            </div>
            
            <div className="h-full overflow-y-auto p-6 pb-20">
               {menuGroups.map((group) => (
                 <div key={group.label} className="mb-8">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                        {group.label}
                    </h3>
                    <div className="space-y-4">
                        {group.items.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className="flex items-center justify-between border-b border-white/10 pb-4 text-xl font-medium text-white"
                            >
                                {item.name}
                                <ArrowRight size={16} className="text-neutral-600" />
                            </Link>
                        ))}
                    </div>
                 </div>
               ))}
               <Link 
                  href="/#footer" 
                  className="mt-8 flex w-full justify-center rounded-xl bg-rose-500 py-4 font-bold text-white"
                >
                  Get in Touch
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
