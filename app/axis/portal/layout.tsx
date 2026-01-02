"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MessageSquare, LayoutDashboard, Users, CreditCard, 
  Settings, LogOut, Bell, Menu, X
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
    <div className="min-h-screen bg-[#050912] text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 border-r border-white/5 bg-[#0B1120] flex-col z-50">
        <div className="p-8 border-b border-white/5">
          {/* UPDATED LOGO & BRANDING */}
          <div className="flex items-center gap-4">
             <div className="relative w-10 h-10 shrink-0">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                    alt="Axis by Sakura" 
                    fill
                    className="object-contain"
                />
             </div>
             <div>
                <span className="font-black tracking-widest text-sm block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    AXIS
                </span>
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">by Sakura</span>
             </div>
          </div>
        </div>

        <div className="flex-1 py-8 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group ${
                  isActive 
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/10 text-white border-l-2 border-pink-500" 
                    : "text-slate-500 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                <link.icon size={18} className={`transition-colors ${isActive ? "text-pink-400" : "text-slate-600 group-hover:text-white"}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="p-6 border-t border-white/5 bg-[#080c17]">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-400 cursor-pointer transition-colors rounded-lg hover:bg-white/5">
                <LogOut size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Disconnect</span>
            </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1120] border-b border-white/5 z-50 flex items-center justify-between px-6">
         <div className="flex items-center gap-3">
             <div className="relative w-8 h-8">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                    alt="Axis" 
                    fill
                    className="object-contain"
                />
             </div>
             <span className="font-black tracking-widest text-sm">AXIS</span>
         </div>
         <button onClick={() => setMobileMenu(!mobileMenu)} className="text-white">
            {mobileMenu ? <X /> : <Menu />}
         </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenu && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="fixed inset-0 top-16 bg-[#050912] z-40 p-6 lg:hidden"
            >
                 <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl text-white font-bold">
                        <link.icon size={20} className="text-pink-500"/> {link.name}
                    </Link>
                  ))}
                 </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="lg:pl-72 pt-16 lg:pt-0">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050912]/80 backdrop-blur-xl sticky top-0 z-40">
           <div className="hidden lg:flex items-center gap-4 text-slate-500 text-sm">
              <span className="font-mono text-xs text-pink-500">● LIVE CONNECTION</span>
              <span className="h-4 w-[1px] bg-white/10" />
              <span className="text-xs font-bold tracking-wider text-slate-400">SakuraGroup Main Node</span>
           </div>

           <div className="flex items-center gap-8">
              <div className="text-right">
                 <span className="block text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1">Available Credits</span>
                 <span className="font-mono text-xl font-bold text-white leading-none">
                    24,500 <span className="text-xs text-pink-500">TZS</span>
                 </span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <button className="p-2.5 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors relative border border-white/5">
                 <Bell size={18} />
                 <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-[#050912]" />
              </button>
           </div>
        </header>

        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}
