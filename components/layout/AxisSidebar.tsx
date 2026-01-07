"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Send, 
  Settings, 
  LogOut, 
  Activity,
  ShieldCheck
} from "lucide-react";

interface AxisSidebarProps {
  user: {
    name?: string;
    organization?: string;
    phoneNumber?: string;
  } | null;
}

export default function AxisSidebar({ user }: AxisSidebarProps) {
  const pathname = usePathname();

  // Functional Purity: Logic for "Strong Profile"
  const calculateStrength = () => {
    let score = 0;
    if (user?.name) score += 30;
    if (user?.organization) score += 40;
    if (user?.phoneNumber) score += 30;
    return score;
  };

  const strength = calculateStrength();

  const menuItems = [
    { name: "Dashboard", href: "/axis/portal", icon: LayoutDashboard },
    { name: "Messages", href: "/axis/portal/messages", icon: Send },
    { name: "Infrastructure", href: "/axis/portal/nodes", icon: Activity },
    { name: "Settings", href: "/axis/portal/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-8">
        <div className="text-2xl font-black tracking-tighter text-black flex items-center gap-2">
          SAKURA <span className="text-pink-600">AXIS</span>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Sovereign Gateway</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                isActive 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                : "text-slate-500 hover:text-black hover:bg-slate-50"
              }`}
            >
              <item.icon size={16} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Node Strength Widget */}
      <div className="p-6 m-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className={strength === 100 ? "text-emerald-500" : "text-amber-500"} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Strength</span>
          </div>
          <span className="text-[10px] font-black text-slate-900">{strength}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-pink-600 transition-all duration-1000 ease-out"
            style={{ width: `${strength}%` }}
          />
        </div>
        {strength < 100 && (
          <Link href="/axis/portal/settings" className="text-[9px] text-pink-600 font-bold mt-3 inline-block hover:underline">
            Complete profile to unlock all routes →
          </Link>
        )}
      </div>
    </aside>
  );
}
