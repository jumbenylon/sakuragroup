"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "SakuraHost", href: "/hosting", badge: "Cloud", color: "text-violet-400" },
    { name: "RCS Build", href: "/rcs", badge: "Industrial", color: "text-orange-500" },
    { name: "SakuraPay", href: "/sakurapay", badge: "Fintech", color: "text-emerald-500" },
    { name: "Axis", href: "/axis", badge: "Comms", color: "text-emerald-400" },
    { name: "Logistics", href: "/logistics", badge: "Fleet", color: "text-blue-500" },
    { name: "Agency", href: "/agency", badge: "Creative", color: "text-pink-500" },
  ];

  return (
    <nav className={`fixed top-0 w-full transition-all duration-500 z-[100] flex items-center px-6 lg:px-12
      ${isScrolled ? "h-16 bg-black/90 backdrop-blur-xl border-b border-white/5" : "h-20 bg-black/20"}`}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="relative w-32 md:w-40 h-8 z-[120]">
          <Image 
            src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
            alt="Sakura Group" fill className="object-contain object-left" priority 
          />
        </Link>

        {/* ALWAYS VISIBLE DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.name} href={link.href} className="group relative py-2">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all
                  ${isActive ? "text-white" : "text-white/40 group-hover:text-white"}`}>
                  {link.name}
                </span>
                {isActive && <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />}
              </Link>
            );
          })}
          <Link href="/contact" className="ml-6 px-6 py-2 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all">
            Get Started
          </Link>
        </div>

        <button className="lg:hidden text-white z-[120]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu logic remains same */}
    </nav>
  );
}