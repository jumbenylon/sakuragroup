"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Send, 
  Settings, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

export default function AxisSidebar({ user }: { user: any }) {
  const pathname = usePathname();

  // Calculate "Node Strength" based on profile completion
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
    { name: "Messages", href: "/axis/portal/compose", icon: Send },
    { name: "Identity", href: "/axis/portal/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <div className="text-xl font-black tracking-tighter text-black">
            AXIS<span className="text-pink-600">.</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              pathname === item.href 
              ? "bg-slate-900 text-white shadow-md shadow-slate-200" 
              : "text-slate-400 hover:text-black hover:bg-slate-50"
            }`}
          >
            <item.icon size={14} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-5 m-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={12} className={strength === 100 ? "text-emerald-500" : "text-amber-500"} />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Node Strength</span>
          </div>
          <span className="text-[9px] font-black text-slate-900">{strength}%</span>
        </div>
        <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-pink-600 transition-all duration-1000 ease-in-out"
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
