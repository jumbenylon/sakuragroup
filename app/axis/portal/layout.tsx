"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Added Image component
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, PenTool, Users, History, 
  Settings, LogOut, Bell, Menu, X, CreditCard 
} from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    { name: "Overview", icon: LayoutDashboard, path: "/axis/portal" },
    { name: "Compose", icon: PenTool, path: "/axis/portal/compose" },
    { name: "Audience", icon: Users, path: "/axis/portal/contacts" },
    { name: "Campaigns", icon: History, path: "/axis/portal/campaigns" },
    { name: "Billing", icon: CreditCard, path: "/axis/portal/billing" },
    { name: "System", icon: Settings, path: "/axis/portal/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-pink-500/30 flex">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#050505] fixed h-full z-20">
        
        {/* BRAND LOGO RESTORED */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
           <div className="relative w-32 h-10">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                alt="Sakura Axis" 
                fill
                className="object-contain object-left"
                priority
              />
           </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2">
           <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-4 mb-4">
              Main Menu
           </div>
           {menu.map((item) => {
             const isActive = pathname === item.path;
             return (
               <Link 
                 key={item.name} 
                 href={item.path}
                 className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wide rounded-sm transition-all group ${
                    isActive 
                    ? "bg-pink-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                 }`}
               >
                 <item.icon size={16} className={isActive ? "text-white" : "text-slate-500 group-hover:text-white"} />
                 {item.name}
               </Link>
             );
           })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-white/10">
            <div className="bg-[#0a0a0a] p-3 rounded-sm border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">SG</div>
                <div className="flex-1">
                    <div className="text-xs font-bold text-white">Sakura Admin</div>
                    <div className="text-[9px] text-emerald-500">● Online</div>
                </div>
                <button className="text-slate-500 hover:text-white"><LogOut size={14}/></button>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* TOP BAR */}
        <header className="h-20 bg-[#020202]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-10 flex items-center justify-between px-8">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white"><Menu /></button>
            
            <div className="hidden md:block">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    Sakura Group / Axis Portal / <span className="text-white">Active Session</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Credits</span>
                    <span className="text-sm font-mono font-bold text-white">24,500 <span className="text-slate-600">TZS</span></span>
                </div>
                <div className="h-8 w-[1px] bg-white/10"></div>
                <button className="relative">
                    <Bell size={18} className="text-slate-400 hover:text-white" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                </button>
            </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <div className="flex-1 p-8 bg-[#020202]">
            {children}
        </div>
      </main>
      
      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col p-8 md:hidden">
            <div className="flex justify-between items-center mb-8">
                <div className="relative w-32 h-10">
                    <Image 
                        src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                        alt="Sakura Axis" 
                        fill
                        className="object-contain object-left"
                    />
                </div>
                <button onClick={() => setMobileMenuOpen(false)}><X /></button>
            </div>
            <nav className="space-y-4">
                {menu.map((item) => (
                    <Link key={item.name} href={item.path} onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-slate-300 hover:text-pink-500">
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
      )}
    </div>
  );
}
