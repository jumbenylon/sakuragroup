"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png";

export const GlobalNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const navLinks = [
    { name: "Agency", path: "/agency" },
    { name: "Communication", path: "/axis" },
    { name: "Logistics", path: "/logistics" },
    { name: "Construction", path: "/roofcleaning" },
    { name: "Hosting", path: "/hosting" },
    { name: "Sakura Pay", path: "/sakurapay" },
    { name: "Podcast", path: "/thinkloko" }
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
          ? "h-16 bg-black/85 backdrop-blur-3xl border-b border-white/10" 
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
            className={`transition-all duration-500 brightness-200 ${isScrolled ? "scale-90" : "scale-100"}`}
          />
        </Link>

        {/* NAVIGATION LINKS - PURE WHITE TYPOGRAPHY */}
        <div className="hidden lg:flex items-center gap-10">
          <LayoutGroup id="global-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
                className="relative text-[10px] font-black uppercase tracking-[0.25em] text-white/90 hover:text-white transition-opacity py-2"
              >
                {link.name}
                {hoveredPath === link.path && (
                  <motion.div
                    layoutId="nav-hover-bg"
                    className="absolute -bottom-1 left-0 w-full h-px bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </LayoutGroup>
        </div>

        {/* CTA - REDESIGNED PER SPECIFICATIONS */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/contact" 
            className="px-8 py-2.5 border border-white/20 bg-white/5 text-white text-[9px] font-black uppercase tracking-widest rounded-[4px] hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 bg-black z-[140] flex flex-col justify-center px-12 gap-8"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-black italic uppercase tracking-tighter text-white hover:text-yellow-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-white/10 my-4" />
            <Link 
              href="/contact" 
              onClick={() => setMobileOpen(false)}
              className="text-sm font-black uppercase tracking-widest text-white/60 hover:text-white"
            >
              Start Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};