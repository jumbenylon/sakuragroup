"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

export function GlobalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Solutions", href: "/#services" },
    { name: "About Us", href: "/#story" },
    { name: "Our Work", href: "/#testimonials" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-neutral-950/80 backdrop-blur-md border-white/10 py-4" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="relative h-8 w-32 md:h-10 md:w-40">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura Group" 
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/#contact"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-full transition-all hover:scale-105"
            >
              Book Consultation
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 pt-12">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   href={link.href} 
                   onClick={() => setMobileMenuOpen(false)}
                   className="text-2xl font-light text-white"
                 >
                   {link.name}
                 </Link>
               ))}
               <Link 
                 href="/#contact" 
                 onClick={() => setMobileMenuOpen(false)}
                 className="mt-8 px-8 py-4 bg-rose-600 text-white font-bold rounded-full text-lg"
               >
                 Book Consultation
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
