"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Menu, X, ChevronDown } from "lucide-react";

interface NavbarProps {
  pageName?: string; 
  backLink?: string; 
}

export function GlobalNavbar({ pageName, backLink = "/" }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll to Footer for Contact
  const scrollToContact = () => {
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 transition-all duration-300 mix-blend-difference text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LEFT: LOGO AREA */}
          <div className="flex items-center gap-4">
            {pageName && (
              <Link 
                href={backLink} 
                className="p-2 rounded-full hover:bg-white/10 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            )}

            <Link href="/" className="relative w-40 h-10 block">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* RIGHT: DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/" className="hover:text-rose-500 transition-colors">Home</Link>
            
            {/* Simple Dropdown Trigger (Visual Only for now, links to grid) */}
            <Link href="/#ecosystem" className="flex items-center gap-1 hover:text-rose-500 transition-colors">
              Solutions <ChevronDown size={14} />
            </Link>
            
            <Link href="/marketing" className="hover:text-rose-500 transition-colors">Agency</Link>
            
            <button onClick={scrollToContact} className="px-5 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all">
              Get in Touch
            </button>
          </div>

          {/* RIGHT: MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-32 px-6">
           <div className="flex flex-col gap-8 text-2xl font-light text-white">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/#ecosystem" onClick={() => setIsMobileMenuOpen(false)}>Our Divisions</Link>
              <Link href="/marketing" onClick={() => setIsMobileMenuOpen(false)}>Sakura Agency</Link>
              <Link href="/hosting" onClick={() => setIsMobileMenuOpen(false)}>Hosting Portal</Link>
              <button onClick={scrollToContact} className="text-left text-rose-500">Contact Us</button>
           </div>
        </div>
      )}
    </>
  );
}
