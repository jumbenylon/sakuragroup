"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Design", href: "/agency" },
    { name: "Host", href: "/hosting" },
    { name: "Chat", href: "/axis" },
    { name: "Pay", href: "/sakurapay" },
    { name: "Build", href: "/rcs" },
    { name: "Move", href: "/logistics" },
    { name: "Travel", href: "/travel" },
  ];

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  // Animation Variants for Mobile Menu
  const menuVars = {
    initial: { scaleY: 0 },
    animate: { 
      scaleY: 1, 
      transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] } 
    },
    exit: { 
      scaleY: 0, 
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  const mobileLinkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } }
  };

  return (
    <>
      <nav className="fixed top-0 w-full h-20 z-[100] bg-black/80 backdrop-blur-md border-b border-white/5 flex items-center px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="relative w-32 h-10 z-[120]">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura" 
              fill 
              className="object-contain object-left" 
              priority 
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  pathname.startsWith(link.href) ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className="px-6 py-2.5 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded-sm hover:bg-emerald-400 transition-colors"
            >
              Tubonge
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-white z-[120] p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black z-[110] origin-top flex flex-col pt-32 px-6"
          >
            <motion.div 
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col gap-6 h-full"
            >
              {links.map((link) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div variants={mobileLinkVars}>
                    <Link 
                      href={link.href} 
                      className="text-4xl font-black text-white uppercase tracking-tighter hover:text-emerald-500 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
              
              <div className="h-px w-full bg-white/10 my-4" />
              
              {/* Mobile Footer Links */}
              <div className="overflow-hidden">
                <motion.div variants={mobileLinkVars} className="flex flex-col gap-4">
                   <Link href="/about" className="text-xl font-bold text-white/40 uppercase tracking-widest hover:text-white">
                     Ni Sisi (About)
                   </Link>
                   <Link 
                     href="/contact" 
                     className="flex items-center gap-4 text-2xl font-black text-emerald-500 uppercase tracking-tighter mt-4"
                   >
                     Tubonge Now <ArrowRight />
                   </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
