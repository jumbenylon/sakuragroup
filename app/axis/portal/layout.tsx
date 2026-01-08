"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Send, ShieldCheck, History, 
  Settings, LogOut, CreditCard, MessageCircle, 
  Users, UserPlus, Receipt, Lock, Terminal,
  PlusCircle, BookOpen
} from "lucide-react";

/**
 * Axis Master Portal Layout (v7.0)
 * Logic: Unified Sidebar with categorized SMS, WhatsApp, Contacts, and Finance.
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Simulated System User - Sync with admin@sakurahost.co.tz context
  const [user, setUser] = useState({
      name: "System Admin",
      organization: "Sakura Group",
      email: "admin@sakuragroup.co.tz",
      phoneNumber: "+255744000000",
      balance: 494,
      role: "ADMIN"
  });

  // Business verification logic
  const strength = (() => {
    let score = 0;
    if (user?.name) score += 30;
    if (user?.organization) score += 40;
    if (user?.phoneNumber) score += 30;
    return score;
  })();

  /**
   * NAVIGATION SCHEMA
   * Hierarchical categorization for SMS, WA, Contacts, and Billing.
   */
  const navGroups = [
    {
      group: "Core",
      items: [
        { name: "Overview", icon: LayoutDashboard, path: "/portal" },
      ]
    },
    {
      group: "SMS",
      items: [
        { name: "Send Campaign", icon: Send, path: "/portal/sms/send" },
        { name: "Sender Names", icon: Terminal, path: "/portal/sender-ids" },
        { name: "Campaign Reports", icon: History, path: "/portal/sms/reports" },
        { name: "Scheduled", icon: Lock, path: "#", locked: true },
        { name: "Templates", icon: BookOpen, path: "#", locked: true },
      ]
    },
    {
      group: "WhatsApp",
      items: [
        { name: "Send Campaign", icon: MessageCircle, path: "/portal/whatsapp/send" },
        { name: "Templates", icon: Lock, path: "#", locked: true },
      ]
    },
    {
      group: "Contacts",
      items: [
        { name: "Manage Contacts", icon: Users, path: "/portal/contacts" },
        { name: "Import", icon: PlusCircle, path: "/portal/contacts/import" },
      ]
    },
    {
      group: "Finance",
      items: [
        { name: "Purchase SMS", icon: CreditCard, path: "/portal/billing" },
        { name: "Transaction History", icon: Receipt, path: "/portal/billing/history" },
      ]
    },
    {
      group: "Infrastructure",
      items: [
        { name: "Sovereign Admin", icon: ShieldCheck, path: "/portal/admin" },
        { name: "System Settings", icon: Settings, path: "/portal/settings" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans antialiased">
      {/* MASTER SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20 shadow-sm">
        <div className="h-24 flex items-center px-8 border-b border-slate-50">
           <Image 
             src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
             alt="Logo" width={130} height={40} priority 
             className="grayscale brightness-0"
           />
        </div>

        <nav className="flex-1 py-6 px-4 space-y-8 overflow-y-auto custom-scrollbar">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-2">
              <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.path} 
                      className={`flex items-center justify-between px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide rounded-xl transition-all ${
                        isActive 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={14} className={isActive ? "text-sky-400" : "text-slate-400"} />
                        {item.name}
                      </div>
                      {item.locked && <Lock size={10} className="text-slate-300" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* NODE STRENGTH WIDGET */}
        <div className="px-6 py-6 border-t border-slate-50 bg-slate-50/50">
          <div className="flex justify-between items-center mb-2 text-[9px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Node Strength</span>
            <span className="text-slate-900">{strength}%</span>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 transition-all duration-1000" 
              style={{ width: `${strength}%` }} 
            />
          </div>
        </div>

        {/* ACCOUNT FOOTER */}
        <div className="p-4 border-t border-slate-100">
            <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[10px] font-black italic">
                  SY
                </div>
                <div className="flex-1 truncate">
                   <p className="text-[10px] font-black text-slate-900 leading-none">{user.organization}</p>
                   <p className="text-[9px] font-medium text-slate-400 truncate">{user.email}</p>
                </div>
                <button 
                  onClick={() => router.push("/login")} 
                  className="text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <LogOut size={14}/>
                </button>
            </div>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Global Desktop Header Info */}
        <header className="h-16 px-8 flex items-center justify-end gap-6 bg-white/50 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Balance:</span>
              <span className="text-xs font-black text-slate-900 italic">{user.balance.toLocaleString()} TZS</span>
           </div>
        </header>

        <div className="flex-1 p-8 lg:p-12">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
