"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MessageSquare, LayoutDashboard, Users, CreditCard, 
  Settings, LogOut, Bell
} from "lucide-react";

export default function AxisDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/axis", icon: LayoutDashboard },
    { name: "Campaigns", href: "/axis/campaigns", icon: MessageSquare },
    { name: "Audience", href: "/axis/contacts", icon: Users },
    { name: "Billing", href: "/axis/billing", icon: CreditCard },
    { name: "Settings", href: "/axis/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050912] text-white font-sans selection:bg-emerald-500/30">
      
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-[#0B1120] flex flex-col z-50">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 text-emerald-500">
             <MessageSquare size={20} />
             <span className="font-black tracking-widest text-sm">AXIS PORTAL</span>
          </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-white/5 text-white border border-white/5" 
                    : "text-slate-500 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <link.icon size={18} className={isActive ? "text-emerald-500" : "text-slate-600"} />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white cursor-pointer transition-colors">
                <LogOut size={18} />
                <span className="text-xs font-bold">Sign Out</span>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="pl-64">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#050912]/80 backdrop-blur-xl sticky top-0 z-40">
           <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span className="font-mono">SAKURA GROUP</span>
              <span className="h-4 w-[1px] bg-white/10" />
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500" />
                 <span className="text-xs font-bold tracking-wider text-white">SYSTEM OPERATIONAL</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Balance</span>
                 <span className="font-mono text-lg font-bold text-emerald-500">
                    24,500 <span className="text-xs text-slate-600">TZS</span>
                 </span>
              </div>
              <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative">
                 <Bell size={18} />
              </button>
           </div>
        </header>

        <div className="p-8">
           {children}
        </div>
      </main>
    </div>
  );
}
