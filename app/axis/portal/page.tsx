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
    <div className="space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
        
        {/* HERO */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Command Center</h1>
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-slate-500 text-xs font-mono uppercase">System Nominal • Database Active</p>
                </div>
            </div>
            <Link 
                href="/portal/compose" 
                className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-pink-200 transition-all flex items-center gap-2"
            >
                <PenTool size={16} /> New Campaign
            </Link>
        </div>

        {/* KPI CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
            
            {/* 1. REAL BALANCE CARD */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <CreditCard size={100} className="text-slate-900" />
                </div>
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><CreditCard size={18}/></div>
                    <button onClick={fetchBalance} disabled={loading} className="text-slate-400 hover:text-pink-600 transition-colors">
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
                <div className="text-3xl font-mono font-bold text-slate-900 mb-1">
                    {balance === null ? "..." : balance} <span className="text-sm font-sans font-normal text-slate-500">SMS</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Available Credit</div>
            </div>

            {/* 2. CONTACTS */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users size={18}/></div>
                </div>
                <div className="text-3xl font-mono font-bold text-slate-900 mb-1">0</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Contacts</div>
            </div>

            {/* 3. PERFORMANCE */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><ArrowUpRight size={18}/></div>
                </div>
                <div className="text-3xl font-mono font-bold text-slate-900 mb-1">100%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Uptime</div>
            </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="border border-slate-200 rounded-xl p-8 bg-white shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Recent Transmissions</h3>
            <div className="text-center py-12 bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
               <p className="text-slate-500 text-sm font-medium">No recent activity detected.</p>
               <p className="text-slate-400 text-xs mt-1">Campaign data will appear here.</p>
            </div>
        </div>
    </div>
  );
}
