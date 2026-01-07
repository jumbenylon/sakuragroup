"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PenTool, Users, ArrowUpRight, CreditCard, RefreshCw } from "lucide-react";

export default function DashboardHome() {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sms/balance");
      const data = await res.json();
      if (data.success) {
        setBalance(Math.floor(Number(data.balance)).toLocaleString());
      } else {
        setBalance("Error");
      }
    } catch (err) {
      setBalance("---");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-8 md:p-12 max-w-7xl mx-auto">
        
        {/* HERO */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Command Center</h1>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-slate-400 text-xs font-mono uppercase">System Nominal • Database Active</p>
                </div>
            </div>
            <Link 
                href="/axis/portal/compose" 
                className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all flex items-center gap-2"
            >
                <PenTool size={16} /> New Campaign
            </Link>
        </div>

        {/* KPI CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
            
            {/* 1. REAL BALANCE CARD */}
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-pink-500/30 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CreditCard size={64} />
                </div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-pink-900/20 text-pink-500 rounded"><CreditCard size={18}/></div>
                    <button onClick={fetchBalance} disabled={loading} className="text-slate-500 hover:text-white transition-colors">
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">
                    {balance === null ? "..." : balance} <span className="text-sm font-sans font-normal text-slate-500">SMS</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Available Credit</div>
            </div>

            {/* 2. CONTACTS (Ready for Data) */}
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-900/20 text-blue-500 rounded"><Users size={18}/></div>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">0</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Contacts</div>
            </div>

            {/* 3. PERFORMANCE (Ready for Data) */}
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-900/20 text-orange-500 rounded"><ArrowUpRight size={18}/></div>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">100%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Uptime</div>
            </div>
        </div>

        {/* RECENT ACTIVITY (Placeholder) */}
        <div className="border border-white/10 rounded-sm p-8 bg-white/[0.02]">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Recent Transmissions</h3>
            <div className="text-center py-12">
               <p className="text-slate-600 text-sm">No recent activity detected.</p>
            </div>
        </div>
    </div>
  );
}
