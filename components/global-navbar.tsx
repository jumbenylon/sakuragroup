"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X, ChevronRight, Globe } from "lucide-react";

const LOGO_URL = "https://storage.googleapis.com/sakura-web/sakura-logo-white.png"; // Ensure this is the clean group logo

export const GlobalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const navLinks = [
    { name: "Axis", path: "/axis" },
    { name: "Logistics", path: "/logistics" },
    { name: "Industrial", path: "/industrial" },
    { name: "Hosting", path: "/hosting" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-[150] transition-all duration-700 ease-in-out ${
        isScrolled 
          ? "h-16 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-black/5 dark:border-white/5" 
          : "h-24 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-8 flex justify-between items-center">
        
        {/* BRAND IDENTITY */}
        <Link href="/" className="relative z-10 flex items-center gap-3 group">
          <Image 
            src={LOGO_URL} 
            alt="Sakura Group" 
            width={100} 
            height={32} 
            className={`transition-all duration-500 ${isScrolled ? "scale-90" : "scale-100"} dark:brightness-200`}
          />
        </Link>

        {/* NAVIGATION LINKS - PRECISION LAYOUT */}
        <div className="hidden lg:flex items-center gap-10">
          <LayoutGroup id="global-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 hover:text-pink-600 dark:text-white/40 dark:hover:text-white transition-colors py-2"
              >
                {link.name}
                {hoveredPath === link.path && (
                  <motion.div
                    layoutId="nav-hover-bg"
                    className="absolute -bottom-1 left-0 w-full h-px bg-pink-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </LayoutGroup>
        </div>

        {/* CTAs - FUNCTIONAL PURITY */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/axis/login" 
            className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Console
          </Link>
          <Link 
            href="/axis/signup" 
            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-pink-600 hover:text-white transition-all shadow-xl shadow-black/5"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          className="lg:hidden text-slate-900 dark:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE OVERLAY - MINIMALIST FULLSCREEN */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 bg-white dark:bg-[#020202] z-[140] flex flex-col justify-center px-12 gap-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-black italic uppercase tracking-tighter hover:text-pink-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-black/5 dark:bg-white/5 my-4" />
            <Link href="/axis/signup" className="text-sm font-black uppercase tracking-widest text-pink-600">
              Start Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
