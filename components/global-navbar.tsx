"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ChevronDown,
  Server,
  CreditCard,
  Zap,
  Truck,
  ShieldCheck,
  Plane,
  Briefcase,
  Terminal,
  Mic
} from "lucide-react";

// ------------------------------------------------------------
// Navigation Data — Single Source of Truth
// ------------------------------------------------------------
const menuGroups = [
  {
    label: "Infrastructure",
    desc: "Digital Backbone",
    items: [
      { name: "SakuraHost", href: "/hosting", icon: Server, desc: "Cloud & Domains" },
      { name: "Axis Core", href: "/axis", icon: Zap, desc: "Comm API" },
      { name: "SakuraPay", href: "/sakurapay", icon: CreditCard, desc: "Fintech Gateway" }
    ]
  },
  {
    label: "Operations",
    desc: "Physical Engine",
    items: [
      { name: "Logistics", href: "/logistics", icon: Truck, desc: "Supply Chain" },
      { name: "Construction", href: "/industrial", icon: ShieldCheck, desc: "RCS & Epoxy" },
      { name: "Travels", href: "/travel", icon: Plane, desc: "Corporate Booking" }
    ]
  },
  {
    label: "Growth",
    desc: "Strategic Mind",
    items: [
      { name: "Agency", href: "/marketing", icon: Briefcase, desc: "Consultancy" },
      { name: "The Terminal", href: "/learn", icon: Terminal, desc: "EdTech LMS" },
      { name: "Think Loko", href: "/media", icon: Mic, desc: "Media House" }
    ]
  }
];

export function GlobalNavbar() {
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ------------------------------------------------------------
  // Scroll — Only toggles when crossing threshold (no churn)
  // ------------------------------------------------------------
  useMotionValueEvent(scrollY, "change", (y) => {
    const dark = y > 20;
    setIsScrolled((prev) => (prev !== dark ? dark : prev));
  });

  // ------------------------------------------------------------
  // Close menus when route changes
  // ------------------------------------------------------------
  useEffect(() => {
    setActiveTab(null);
  }, [pathname]);

  // ------------------------------------------------------------
  // Click outside & Escape close — professional UX affordances
  // ------------------------------------------------------------
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setActiveTab(null);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTab(null);
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  // ------------------------------------------------------------
  // Hover-assist with forgiveness — avoids accidental closures
  // ------------------------------------------------------------
  const openWithGrace = (label: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setActiveTab(label);
  };

  const closeWithDelay = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActiveTab(null), 120);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 mx-auto hidden md:block max-w-5xl px-4"
    >
      <div
        ref={containerRef}
        className={`relative flex items-center justify-between rounded-full border border-white/10 px-6 py-3 backdrop-blur-xl transition-all
        ${isScrolled ? "bg-neutral-950/90 shadow-xl shadow-black/40" : "bg-neutral-900/60"}`}
      >
        {/* ------------------------------------------------------------------
            Brand Anchor — quiet confidence, grounded left
        ------------------------------------------------------------------ */}
        <Link
          href="/"
          prefetch={false}
          className="relative flex items-center gap-2 pr-8 border-r border-white/10"
        >
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

        {/* ------------------------------------------------------------------
            Navigation — click + hover-assist, premium restraint
        ------------------------------------------------------------------ */}
        <nav className="flex items-center gap-6 px-8">
          {menuGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => openWithGrace(group.label)}
              onMouseLeave={closeWithDelay}
            >
              <button
                onClick={() =>
                  setActiveTab((cur) => (cur === group.label ? null : group.label))
                }
                className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest py-3 px-2 rounded-md transition-colors
                ${activeTab === group.label ? "text-white" : "text-neutral-400 hover:text-white"}`}
              >
                {group.label}
                <ChevronDown
                  size={10}
                  className={`transition-transform duration-300 ${
                    activeTab === group.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeTab === group.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full mt-3 w-[360px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 shadow-2xl"
                  >
                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#0a0a0a] border-l border-t border-white/10" />

                    <div className="grid gap-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          prefetch={false}
                          className="group flex items-center gap-4 rounded-xl p-3 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 border border-white/10 text-neutral-400 group-hover:border-rose-500/50 group-hover:text-rose-500 transition-all">
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

        {/* ------------------------------------------------------------------
            Right-Side Action — intentional, minimal, confident
        ------------------------------------------------------------------ */}
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
  );
}
