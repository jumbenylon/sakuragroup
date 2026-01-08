"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // 🟢 Protocol Fix
import { 
  LayoutDashboard, Send, ShieldCheck, History, 
  Settings, LogOut, CreditCard, MessageCircle, 
  Users, Receipt, Lock, Terminal,
  PlusCircle, BookOpen, Zap
} from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [user] = useState({
      name: "System Admin",
      organization: "Sakura Group",
      email: "admin@sakuragroup.co.tz",
      phoneNumber: "+255744000000",
      balance: 494,
      role: "ADMIN"
  });

  const strength = 100;

  const handleSignOut = async () => {
    // Handshake: Destroy session and redirect to login protocol
    await signOut({ callbackUrl: "/login" });
  };

  const navGroups = [
    { group: "Core", items: [{ name: "Overview", icon: LayoutDashboard, path: "/portal" }] },
    {
      group: "SMS",
      items: [
        { name: "Send Campaign", icon: Send, path: "/portal/send" },
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
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20 shadow-sm">
        <div className="h-24 flex items-center px-8 border-b border-slate-50">
           <Image src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" alt="Logo" width={130} height={40} priority className="object-contain" />
        </div>

        <nav className="flex-1 py-6 px-4 space-y-8 overflow-y-auto scrollbar-hide">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 italic">{group.group}</h3>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link key={item.name} href={item.path} 
                      className={`flex items-center justify-between px-4 py-2 text-[11px] font-bold uppercase tracking-wide rounded-xl transition-all ${
                        isActive ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                      }`}>
                      <div className="flex items-center gap-3"><item.icon size={14} />{item.name}</div>
                      {item.locked && <Lock size={10} className="text-slate-200" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-6 py-6 border-t border-slate-50 bg-slate-50/30">
          <div className="flex justify-between items-center mb-2 text-[9px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Node Strength</span>
            <span className="text-slate-900">{strength}%</span>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 transition-all duration-1000" style={{ width: `${strength}%` }} />
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
            <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white text-[10px] font-black italic">SY</div>
                <div className="flex-1 truncate text-[10px] font-black text-slate-900 uppercase">{user.organization}</div>
                <button onClick={handleSignOut} className="text-slate-300 hover:text-rose-500 transition-colors">
                  <LogOut size={14}/>
                </button>
            </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="h-16 px-8 flex items-center justify-end bg-white/70 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10 gap-6">
           <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <Zap size={12} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase text-slate-900 italic">{user.balance.toLocaleString()} TZS</span>
           </div>
        </header>
        <div className="flex-1 p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-2 duration-700">{children}</div>
      </main>
    </div>
  );
}
