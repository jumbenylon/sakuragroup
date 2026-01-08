"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, PenTool, Users, History, 
  Settings, LogOut, Bell, Menu, X, CreditCard,
  Wallet, ShieldCheck
} from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
      name: "System Admin",
      organization: "Sakura Group",
      email: "admin@sakuragroup.co.tz",
      phoneNumber: null,
      balance: 0,
      role: "ADMIN"
  });

  // Calculate Strength for the integrated widget
  const calculateStrength = () => {
    let score = 0;
    if (user?.name) score += 30;
    if (user?.organization) score += 40;
    if (user?.phoneNumber) score += 30;
    return score;
  };
  const strength = calculateStrength();

  const menu = [
    { name: "Overview", icon: LayoutDashboard, path: "/portal" },
    { name: "Compose", icon: PenTool, path: "/portal/compose" },
    { name: "Audience", icon: Users, path: "/portal/contacts" },
    { name: "Campaigns", icon: History, path: "/portal/campaigns" },
    { name: "Billing", icon: CreditCard, path: "/portal/billing" },
    { name: "Sovereign", icon: ShieldCheck, path: "/portal/admin" },
    { name: "System", icon: Settings, path: "/portal/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* ONE SIDEBAR ONLY */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20 shadow-sm">
        <div className="h-24 flex items-center px-6 border-b border-slate-100">
           <Image src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" alt="Logo" width={150} height={50} priority />
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
           {menu.map((item) => (
             <Link key={item.name} href={item.path} className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${pathname === item.path ? "bg-pink-50 text-pink-600 shadow-sm ring-1 ring-pink-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
               <item.icon size={16} />
               {item.name}
             </Link>
           ))}
        </nav>

        {/* INTEGRATED NODE STRENGTH WIDGET */}
        <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/50">
          <div className="flex justify-between items-center mb-2 text-[9px] font-black uppercase tracking-widest">
            <span className="text-slate-400">Node Strength</span>
            <span className="text-pink-600">{strength}%</span>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-pink-600 transition-all duration-1000" style={{ width: `${strength}%` }} />
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-[10px] font-bold">SY</div>
                <div className="flex-1 truncate text-xs font-bold text-slate-800">{user.organization}</div>
                <button onClick={() => router.push("/login")} className="text-slate-400 hover:text-pink-600"><LogOut size={14}/></button>
            </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
