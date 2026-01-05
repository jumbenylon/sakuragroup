"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const mainLinks = [
    { name: "SakuraHost", href: "/hosting" },
    { name: "SakuraPay", href: "/sakurapay" },
    { name: "Axis", href: "/axis" },
    { name: "RCS Build", href: "/rcs" },
    { name: "Logistics", href: "/logistics" },
    { name: "Travel", href: "/travel" },
  ];

  const utilityLinks = [
    { name: "Ni Sisi", href: "/about" },
    { name: "Tubonge", href: "/contact" },
  ];

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <nav className="fixed top-0 w-full h-20 z-[100] bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="relative w-32 h-8 z-[120]">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura" fill className="object-contain object-left" priority 
            />
          </Link>

          {/* Desktop Navigation - Always Visible Links */}
          <div className="hidden lg:flex items-center gap-8">
            {mainLinks.map((link) => (
              <Link key={link.name} href={link.href} className="group relative py-2">
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${pathname.startsWith(link.href) ? "text-white" : "text-white/40 group-hover:text-white"}`}>
                  {link.name}
                </span>
                {pathname.startsWith(link.href) && (
                  <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]" />
                )}
              </Link>
            ))}
            <div className="h-4 w-px bg-white/10 mx-2" />
            <Link href="/contact" className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-zinc-200 transition-colors">
              Tubonge
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white z-[120] p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Apple-Style Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-[110] flex flex-col pt-32 px-10 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {mainLinks.map((link, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                >
                  <Link href={link.href} className="text-4xl font-black text-white uppercase tracking-tighter hover:italic transition-all">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px w-full bg-white/10 my-4" />
              {utilityLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-xl font-bold text-white/40 uppercase tracking-widest hover:text-white">
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}