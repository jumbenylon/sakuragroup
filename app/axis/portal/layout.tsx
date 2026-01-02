"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, MessageSquare, Users, CreditCard, 
  Settings, LogOut, Bell, Menu, X, ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AxisPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = [
    { name: "Overview", href: "/axis/portal", icon: LayoutDashboard },
    { name: "Campaigns", href: "/axis/portal/campaigns", icon: MessageSquare },
    { name: "Audience", href: "/axis/portal/contacts", icon: Users },
    { name: "Billing", href: "/axis/portal/billing", icon: CreditCard },
    { name: "Settings", href: "/axis/portal/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-pink-600/30 overflow-x-hidden flex">
      
      {/* ENTERPRISE SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 border-r border-white/10 bg-[#050505] flex-col z-50">
        
        {/* BRANDING AREA */}
        <div className="h-32 flex items-center justify-center border-b border-white/5 bg-black">
             <div className="relative w-40 h-20">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                    alt="Axis" 
                    fill
                    className="object-contain"
                    priority
                />
             </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 py-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border-l-2 ${
                  isActive 
                    ? "bg-white/5 text-white border-pink-600" 
                    : "text-slate-500 border-transparent hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <link.icon size={16} className={isActive ? "text-pink-500" : "text-slate-600"} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-6 border-t border-white/10 bg-[#020202]">
            <button className="flex items-center gap-3 text-slate-600 hover:text-white transition-colors">
                <LogOut size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
            </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-white/10 z-50 flex items-center justify-between px-6">
         <div className="relative w-24 h-8">
            <Image 
                src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                alt="Axis" 
                fill
                className="object-contain object-left"
            />
         </div>
         <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white">
            {mobileMenu ? <X /> : <Menu />}
         </button>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0">
        
        {/* UTILITY HEADER */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#050505] sticky top-0 z-40">
           {/* Breadcrumbs / Context */}
           <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>SAKURA GROUP</span>
              <ChevronRight size={12} />
              <span className="text-white">AXIS GATEWAY</span>
           </div>

           {/* Metrics & Profile */}
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <span className="block text-[9px] font-black uppercase text-slate-600 tracking-widest">Balance (TZS)</span>
                 <span className="font-mono text-lg text-white">24,500.00</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <button className="text-slate-400 hover:text-white transition-colors">
                 <Bell size={18} />
              </button>
           </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8 max-w-[1600px] mx-auto">
           {children}
        </div>
      </main>

    </div>
  );
}
