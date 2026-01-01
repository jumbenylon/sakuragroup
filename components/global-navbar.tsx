"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  pageName?: string; // Optional: "SAKURA_PAY", "AXIS_CORE", etc.
  backLink?: string; // Optional: Default is "/"
}

export function GlobalNavbar({ pageName, backLink = "/" }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all duration-300 mix-blend-difference text-white">
      <div className="flex items-center gap-4">
        {/* If it's not the homepage, show the Back Arrow */}
        {pageName && (
          <Link 
            href={backLink} 
            className="p-2 rounded-full hover:bg-white/10 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        )}

        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura Group" 
              fill
              className="object-contain"
            />
          </div>
          {pageName ? (
            <span className="text-sm font-mono tracking-widest uppercase opacity-80 border-l border-white/30 pl-3">
              {pageName}
            </span>
          ) : (
            <span className="text-xl font-bold tracking-tight">
              Sakura Group.
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
         {/* We can add a "Contact" button here globally if needed */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
