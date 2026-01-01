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
  Terminal, Mic, Menu, X, ArrowRight, ArrowLeft 
} from "lucide-react";

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

  // Detect scroll to darken the glass
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Close menus when route changes
  useEffect(() => {
    setActiveTab(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* =======================================================
          DESKTOP: FLOATING COMMAND BAR (Hidden on Mobile)
      ======================================================= */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 mx-auto hidden md:block max-w-5xl px-4"
      >
        <div 
          className={`relative flex items-center justify-between rounded-full border border-white/10 px-6 py-3 backdrop-blur-xl transition-all duration-500
          ${isScrolled ? "bg-neutral-950/90 shadow-2xl shadow-black/50" : "bg-neutral-900/60"}`}
          onMouseLeave={() => setActiveTab(null)}
        >
          
          {/* LOGO */}
          <Link href="/" className="relative z-50 flex items-center gap-2 pr-8 border-r border-white/10">
            <div className="relative h-6 w-24">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                    alt="Sakura Group" 
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div>
          </Link>

          {/* CENTER NAVIGATION */}
          <nav className="flex items-center gap-8 px-8">
            {menuGroups.map((group) => (
              <div 
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveTab(group.label)}
              >
                <button 
                  className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors duration-200 py-4
                  ${activeTab === group.label ? "text-white" : "text-neutral-400 hover:text-white"}`}
                >
                  {group.label}
                  <ChevronDown 
                    size={10} 
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
                      className="absolute left-1/2 top-full mt-2 w-[320px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 shadow-2xl overflow-hidden"
                    >
                      {/* Triangle Pointer */}
                      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#0a0a0a] border-l border-t border-white/10" />
                      
                      <div className="relative z-10 grid gap-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/5"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 group-hover:border-rose-500/50 group-hover:text-rose-500 transition-all">
                              <item.icon size={18} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white group-hover:text-rose-500 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
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

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4 pl-8 border-l border-white/10">
             <Link 
                href="/#footer" 
                className="text-xs font-bold text-white hover:text-rose-500 transition-colors uppercase tracking-widest"
            >
                Contact
             </Link>
          </div>
        </div>
      </motion.header>

      {/* =======================================================
          MOBILE: SIMPLE HEADER (Visible only on Mobile)
      ======================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/90 px-6 py-4 backdrop-blur-xl md:hidden border-b border-white/10">
         <Link href="/" className="relative h-6 w-24">
            <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
            />
         </Link>
         <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2">
            <Menu size={24} />
         </button>
      </header>

      {/* =======================================================
          MOBILE: FULLSCREEN OVERLAY
      ======================================================= */}
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
               <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Global Navigation</span>
               <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2 bg-neutral-900 rounded-full border border-white/10">
                  <X size={20} />
               </button>
            </div>
            
            <div className="h-full overflow-y-auto p-6 pb-20">
               {menuGroups.map((group) => (
                 <div key={group.label} className="mb-10">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-600 border-b border-white/5 pb-2">
                        {group.label}
                    </h3>
                    <div className="space-y-6">
                        {group.items.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className="flex items-center justify-between text-lg font-medium text-white group"
                            >
                                <span className="group-hover:text-rose-500 transition-colors">{item.name}</span>
                                <ArrowRight size={16} className="text-neutral-700 group-hover:text-rose-500 transition-colors" />
                            </Link>
                        ))}
                    </div>
                 </div>
               ))}
               
               <Link 
                  href="/#footer" 
                  className="mt-8 flex w-full justify-center rounded-xl bg-white py-4 font-bold text-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-colors"
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
