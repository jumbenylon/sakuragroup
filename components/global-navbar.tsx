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

  const links = [
    { name: "Design", href: "/agency" },
    { name: "Host", href: "/hosting" },
    { name: "Chat", href: "/axis" },
    { name: "Pay", href: "/sakurapay" },
    { name: "Build", href: "/rcs" },
    { name: "Move", href: "/logistics" },
    { name: "Travel", href: "/travel" },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <nav className="fixed top-0 w-full h-20 z-[100] bg-black/60 backdrop-blur-xl border-b border-white/5 flex items-center px-6 lg:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="relative w-32 h-8 z-[120]">
            <Image src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" alt="Sakura" fill className="object-contain" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className={`text-[10px] font-black uppercase tracking-widest transition-colors ${pathname.startsWith(link.href) ? "text-white" : "text-white/40 hover:text-white"}`}>
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-sm">Tubonge</Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white z-[120]">{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-[110] flex flex-col pt-32 px-10">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="text-4xl font-black text-white uppercase tracking-tighter mb-6">{link.name}</Link>
            ))}
            <div className="h-px w-full bg-white/10 my-6" />
            <Link href="/about" className="text-xl font-bold text-white/40 uppercase tracking-widest">Ni Sisi</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
