"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TravelSubNav() {
  const pathname = usePathname();
  
  const subLinks = [
    { name: "Overview", href: "/travel" },
    { name: "Safari", href: "/travel/safari" },
    { name: "Aviation", href: "/travel/aviation" },
    { name: "Marine", href: "/travel/marine" },
  ];

  return (
    <div className="sticky top-20 z-50 w-full bg-black/80 backdrop-blur-xl border-b border-white/5 py-3">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-500 italic">TWENZETU</span>
        </div>
        <div className="flex gap-8">
          {subLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${pathname === link.href ? "text-violet-400" : "text-white/40 hover:text-white"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}