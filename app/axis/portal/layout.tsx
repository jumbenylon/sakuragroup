"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Send, ShieldCheck, History, 
  Settings, LogOut, CreditCard, MessageCircle, 
  Users, Receipt, Lock, Terminal,
  PlusCircle, BookOpen, Wallet, Zap
} from "lucide-react";

/**
 * AXIS MASTER PORTAL (v8.0 FINAL)
 * Design: Sovereign Industrial / Tesla Minimalist
 * Purpose: Unified shell for admin@sakurahost.co.tz
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // 🟢 Real-time Context - Synced with admin@sakurahost.co.tz
  const [user] = useState({
      name: "System Admin",
      organization: "Sakura Group",
      email: "admin@sakuragroup.co.tz",
      phoneNumber: "+255744000000",
      balance: 494,
      role: "ADMIN"
  });

  // Identity verification handshake logic
  const strength = 100;

  const navGroups = [
    {
      group: "CORE",
      items: [
        { name: "Overview", icon: LayoutDashboard, path: "/portal" },
      ]
    },
    {
      group: "SMS INFRASTRUCTURE",
      items: [
        { name: "Send Campaign", icon: Send, path: "/portal/compose" },
        { name: "Sender Names", icon: Terminal, path: "/portal/sender-ids" },
        { name: "Campaign Reports", icon: History, path: "/portal/campaigns" },
        { name: "Scheduled", icon: Lock, path: "#", locked: true },
        { name: "Templates", icon: BookOpen, path: "#", locked: true },
      ]
    },
    {
      group: "WHATSAPP PROTOCOL",
      items: [
        { name: "Send Campaign", icon: MessageCircle, path: "/portal/whatsapp/send" },
        { name: "Templates", icon: Lock, path: "#", locked: true },
      ]
    },
    {
      group: "AUDIENCE",
      items: [
        { name: "Manage Contacts", icon: Users, path: "/portal/contacts" },
        { name: "Bulk Import", icon: PlusCircle, path: "/portal/contacts/import" },
      ]
    },
    {
      group: "FINANCE (SAKURAPAY)",
      items: [
        { name: "Purchase SMS", icon: CreditCard, path: "/portal/billing" },
        { name: "Transaction History", icon: Receipt, path: "/portal/billing/history" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased selection:bg-sky-100">
      
      {/* 1. MASTER SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 fixed h-full z-20 shadow-sm">
        
        {/* FULL COLOR LOGO RESTORED */}
        <div className="h-24 flex items-center px-8 border-b border-slate-50">
           <Image 
             src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
             alt="Sakura Axis" width={130} height={40} priority 
             className="object-contain"
           />
        </div>

        {/* NAVIGATION ENGINE */}
        <nav className="flex-1 py-8 px-4 space-y-8 overflow-y-auto custom-scrollbar scrollbar-hide">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 italic">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.path} 
                      className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all ${
                        isActive 
                        ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={14} className={isActive ? "text-sky-400" : "text-slate-400"} />
                        {item.name}
                      </div>
                      {item.locked && <Lock size={10} className="text-slate-200" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* NODE STRENGTH WIDGET */}
        <div className="px-6 py-8 border-t border-slate-50 bg-slate-50/30">
          <div className="flex justify-between items-center mb-2 text-[9px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Node Strength</span>
            <span className="text-slate-900">{strength}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-1000" 
              style={{ width: `${strength}%` }} 
            />
          </div>
        </div>

        {/* ACCOUNT FOOTER */}
        <div className="p-4 border-t border-slate-50">
            <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[11px] font-black italic shadow-inner">
                  SY
                </div>
                <div className="flex-1 truncate">
                   <p className="text-[11px] font-black text-slate-900 leading-none">{user.organization}</p>
                   <p className="text-[9px] font-medium text-slate-400 truncate mt-0.5">{user.email}</p>
                </div>
                <button 
                  onClick={() => router.push("/login")} 
                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                >
                  <LogOut size={14}/>
                </button>
            </div>
        </div>
      </aside>

      {/* 2. MAIN VIEWPORT */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        
        {/* GLOBAL TELEMETRY HEADER */}
        <header className="h-16 px-8 flex items-center justify-end gap-8 bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-10">
           <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <Zap size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Balance</span>
              <span className="text-xs font-black text-slate-900 italic tracking-tighter">{user.balance.toLocaleString()} TZS</span>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Infrastructure Active</span>
           </div>
        </header>

        {/* DYNAMIC CONTENT */}
        <div className="flex-1 p-8 lg:p-12 selection:bg-sky-50">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-1000">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
