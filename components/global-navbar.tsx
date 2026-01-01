"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  ChevronUp,
  Server,
  CreditCard,
  Zap,
  Truck,
  ShieldCheck,
  Plane,
  Briefcase,
  Terminal,
  Mic,
  Menu,
  X,
  ArrowRight
} from "lucide-react";

// =======================================================
// NAVIGATION DATA (Single Source of Truth)
// =======================================================
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

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // -------------------------------------------------------
  // Scroll → darken threshold (optimized, no churn)
  // -------------------------------------------------------
  useMotionValueEvent(scrollY, "change", (y) => {
    const dark = y > 20;
    setIsScrolled((prev) => (prev !== dark ? dark : prev));
  });

  // -------------------------------------------------------
  // Reset menus on route change
  // -------------------------------------------------------
  useEffect(() => {
    setActiveTab(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [pathname]);

  // -------------------------------------------------------
  // Desktop interaction — click + hover-assist
  // -------------------------------------------------------
  const toggleTab = useCallback(
    (label: string) => {
      setActiveTab((cur) => (cur === label ? null : label));
    },
    []
  );

  return (
    <>
      {/* =======================================================
          DESKTOP — COMMAND BAR
      ======================================================= */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 mx-auto hidden md:block max-w-5xl px-4"
      >
        <div
          className={`relative flex items-center justify-between rounded-full border border-white/10 px-6 py-3 backdrop-blur-xl transition-all duration-400
          ${isScrolled ? "bg-neutral-950/90 shadow-xl shadow-black/40" : "bg-neutral-900/60"}`}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="relative z-50 flex items-center gap-2 pr-8 border-r border-white/10"
            prefetch={false}
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

          {/* NAVIGATION */}
          <nav className="flex items-center gap-6 px-8">
            {menuGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveTab(group.label)}
                onMouseLeave={() => setActiveTab(null)}
              >
                <button
                  onClick={() => toggleTab(group.label)}
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
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full mt-3 w-[320px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 shadow-2xl"
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

          {/* ACTION */}
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
          MOBILE — HEADER BAR
      ======================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-black/90 px-6 py-4 backdrop-blur-xl md:hidden border-b border-white/10">
        <Link href="/" className="relative h-6 w-24" prefetch={false}>
          <Image
            src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png"
            alt="Sakura Group"
            fill
            className="object-contain object-left"
          />
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white p-2 rounded-lg border border-white/10 bg-neutral-900"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* =======================================================
          MOBILE — FULLSCREEN ACCORDION NAV
      ======================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 210 }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-xs text-neutral-500 uppercase tracking-widest">
                Global Navigation
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white p-2 bg-neutral-900 rounded-full border border-white/10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="h-full overflow-y-auto p-6 pb-20">
              {menuGroups.map((group) => {
                const open = mobileAccordion === group.label;
                return (
                  <div key={group.label} className="mb-6">
                    <button
                      onClick={() =>
                        setMobileAccordion(open ? null : group.label)
                      }
                      className="flex w-full items-center justify-between text-sm font-bold uppercase tracking-widest text-neutral-300 py-3"
                    >
                      {group.label}
                      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-1 pt-2 space-y-4"
                        >
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              prefetch={false}
                              className="flex items-center justify-between text-lg text-white group"
                            >
                              <span className="group-hover:text-rose-500 transition-colors">
                                {item.name}
                              </span>
                              <ArrowRight
                                size={16}
                                className="text-neutral-600 group-hover:text-rose-500 transition-colors"
                              />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

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
