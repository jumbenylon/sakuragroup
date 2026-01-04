"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

/**
 * Sakura Sovereign Navigation (v2.2)
 * RESTORED: All ecosystem menu items.
 * FIXED: Z-index stacking and build-time syntax.
 */
export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // EVERY ITEM RESTORED PER YOUR PROJECT STRUCTURE
  const navLinks = [
    { name: "Logistics", href: "/logistics" },
    { name: "Axis", href: "/axis" },
    { name: "SakuraPay", href: "/sakurapay" },
    { name: "Agency", href: "/agency" },
    { name: "Learn", href: "/learn" },
    { name: "Construction", href: "/roofcleaning" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full transition-all duration-500 font-sans tracking-tight
        ${isScrolled 
          ? "h-16 bg-black/70 backdrop-blur-2xl border-b border-white/5" 
          : "h-24 bg-transparent"}
        z-[100] flex items-center px-6 lg:px-12`}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        
        {/* BRAND LOGO */}
        <Link href="/" className="relative w-40 h-8 brightness-200 hover:opacity-80 transition-opacity">
          <Image 
            src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
            alt="Sakura Group" 
            fill
            className="object-contain object-left"
          />
        </Link>

        {/* FULL RESTORED NAVIGATION */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all"
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            href="/contact" 
            className="ml-4 px-8 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-emerald-500 hover:text-white transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-[110] flex flex-col items-center justify-center gap-10 lg:hidden p-12">
           <button 
            className="absolute top-8 right-8 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-widest text-white/60 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 px-12 py-4 bg-white text-black text-xs font-black uppercase tracking-widest"
          >
            Speak to Sales
          </Link>
        </div>
      )}
    </nav>
  );
}