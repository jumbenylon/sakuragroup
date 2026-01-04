"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * Sakura Sovereign Navigation (v4.0)
 * ADDED: Pathname awareness for active states.
 * ADDED: Scroll locking for mobile menu.
 * ADDED: Context badges (Cloud, Industrial, etc).
 */
export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Scroll Lock
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [mobileMenuOpen]);

  // Ecosystem Map with Context Badges & Brand Colors
  const navLinks = [
    { name: "SakuraHost", href: "/hosting", badge: "Cloud", color: "text-violet-400" },
    { name: "RCS Build", href: "/rcs", badge: "Industrial", color: "text-orange-500" },
    { name: "SakuraPay", href: "/sakurapay", badge: "Fintech", color: "text-emerald-500" },
    { name: "Axis", href: "/axis", badge: "Comms", color: "text-emerald-400" },
    { name: "Logistics", href: "/logistics", badge: "Fleet", color: "text-blue-500" },
    { name: "Agency", href: "/agency", badge: "Creative", color: "text-pink-500" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full transition-all duration-500 font-sans tracking-tight
        ${isScrolled 
          ? "h-16 bg-[#000000]/80 backdrop-blur-xl border-b border-white/5" 
          : "h-24 bg-transparent"}
        z-[100] flex items-center px-6 lg:px-12`}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        
        {/* BRAND LOGO */}
        <Link href="/" className="relative w-32 md:w-40 h-8 hover:opacity-80 transition-opacity z-[120]">
          <Image 
            src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
            alt="Sakura Group" 
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className="group relative flex flex-col items-center justify-center h-full py-2"
              >
                {/* Main Link Text */}
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300
                  ${isActive ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                  {link.name}
                </span>

                {/* Hover Context Badge (Subtle Reveal) */}
                <span className={`absolute -bottom-3 text-[8px] font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-widest ${link.color}`}>
                  {link.badge}
                </span>

                {/* Active Dot Indicator */}
                {isActive && (
                  <span className={`absolute -top-1 w-1 h-1 rounded-full bg-current ${link.color.replace('text-', 'bg-')}`} />
                )}
              </Link>
            );
          })}
          
          <Link 
            href="/contact" 
            className="ml-6 px-8 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE TRIGGER */}
        <button 
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[120]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#020617]/98 backdrop-blur-2xl z-[110] flex flex-col items-center justify-center gap-8 lg:hidden p-12 animate-in fade-in duration-300">
          
          <div className="flex flex-col gap-6 text-center w-full max-w-sm">
            {navLinks.map((link) => {
               const isActive = pathname.startsWith(link.href);
               return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between w-full border-b border-white/5 pb-4"
                >
                  <span className={`text-2xl font-black uppercase tracking-widest transition-colors ${isActive ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                    {link.name}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-white/5 ${link.color}`}>
                    {link.badge}
                  </span>
                </Link>
              );
            })}
          </div>

          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-sm hover:bg-emerald-500 hover:text-white transition-colors w-full text-center max-w-sm shadow-xl"
          >
            Contact HQ
          </Link>
        </div>
      )}
    </nav>
  );
}