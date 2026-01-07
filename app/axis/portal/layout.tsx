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

interface UserProfile {
  name: string;
  organization: string | null;
  email: string;
  balance: number;
  role: "ADMIN" | "USER";
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 🟢 1. User Identity (Bypassed for Dev/Testing)
  const [user, setUser] = useState<UserProfile | null>({
      name: "System Admin",
      organization: "Sakura Group",
      email: "admin@sakuragroup.co.tz", // Must match your DB admin email
      balance: 0,
      role: "USER"
  });

  // 🟢 2. Real Balance Sync (Fetches from API)
  useEffect(() => {
    async function syncBalance() {
      try {
        const res = await fetch("/api/sms/balance");
        if (res.ok) {
           const data = await res.json();
           setUser(prev => prev ? { ...prev, balance: data.balance } : prev);
        }
      } catch (e) {
        console.error("Balance Sync Failed", e);
      }
    }
    syncBalance();
  }, []);

  const handleLogout = async () => {
    router.push("/login");
  };

  // 🟢 3. Sidebar Menu (Includes Sovereign Link)
  const menu = [
    { name: "Overview", icon: LayoutDashboard, path: "/portal" },
    { name: "Compose", icon: PenTool, path: "/portal/compose" },
    { name: "Audience", icon: Users, path: "/portal/contacts" },
    { name: "Campaigns", icon: History, path: "/portal/campaigns" },
    { name: "Billing", icon: CreditCard, path: "/portal/billing" },
    
    // 👑 The God Mode Link
    { name: "Sovereign", icon: ShieldCheck, path: "/portal/admin" },
    
    { name: "System", icon: Settings, path: "/portal/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-pink-100 flex">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20 shadow-[2px_0_20px_rgba(0,0,0,0.02)]">
        
        {/* BRAND LOGO */}
        <div className="h-24 flex items-center px-6 border-b border-slate-100">
           <div className="relative w-48 h-14"> 
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
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
             Main Menu
           </div>
           {menu.map((item) => {
             const isActive = pathname === item.path;
             return (
               <Link 
                 key={item.name} 
                 href={item.path}
                 className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wide rounded-lg transition-all group ${
                   isActive 
                   ? "bg-pink-50 text-pink-600 shadow-sm ring-1 ring-pink-100" 
                   : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                 }`}
               >
                 <item.icon size={16} className={isActive ? "text-pink-600" : "text-slate-400 group-hover:text-slate-600"} />
                 {item.name}
               </Link>
             );
           })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : "SG"}
                </div>
                <div className="flex-1 min-w-0">
                    {loading ? (
                       <div className="h-2 w-20 bg-slate-200 animate-pulse rounded"/>
                    ) : (
                      <>
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {user?.organization || user?.name || "Guest Node"}
                        </div>
                        <div className="text-[9px] text-emerald-600 flex items-center gap-1">
                          <ShieldCheck size={10} /> {user?.role === 'ADMIN' ? "Sovereign Admin" : "Active Node"}
                        </div>
                      </>
                    )}
                </div>
                <button onClick={handleLogout} className="text-slate-400 hover:text-pink-600 transition-colors">
                  <LogOut size={14}/>
                </button>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* TOP BAR */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8 shadow-sm">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-800"><Menu /></button>
            
            <div className="hidden md:block">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                    Sakura Group / Axis Portal / <span className="text-pink-600 font-bold">Active Session</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Balance Ticker */}
                <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-end gap-1">
                      <Wallet size={10} /> {user?.role === 'ADMIN' ? "Gateway Funds" : "Wallet Balance"}
                    </span>
                    <span className="text-sm font-mono font-bold text-slate-800">
                        {loading ? "..." : `TZS ${user?.balance?.toLocaleString() ?? "0.00"}`}
                    </span>
                </div>

                <div className="h-8 w-[1px] bg-slate-200"></div>

                <div className="flex flex-col text-right">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Gateway</span>
                    <span className="text-xs font-mono font-bold text-emerald-600 flex items-center justify-end gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> CONNECTED
                    </span>
                </div>
                
                <button className="relative p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <Bell size={18} className="text-slate-400" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <div className="flex-1 p-8 bg-[#F8FAFC]">
            {children}
        </div>
      </main>
      
      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-8 md:hidden">
            <div className="flex justify-between items-center mb-8">
                <div className="relative w-40 h-12">
                   <Image 
                     src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                     alt="Sakura Axis" 
                     fill
                     className="object-contain object-left"
                   />
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-800"><X /></button>
            </div>
            <nav className="space-y-4">
                {menu.map((item) => (
                    <Link key={item.name} href={item.path} onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-slate-600 hover:text-pink-600">
                        {item.name}
                    </Link>
                ))}
            </nav>
        </div>
      )}
    </div>
  );
}
