"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PenTool, Users, ArrowUpRight, Activity, CreditCard, RefreshCw } from "lucide-react";

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
        // Formats number with commas (e.g. 5,000)
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
    <div className="space-y-8 animate-in fade-in duration-700">
        
        {/* HERO */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Command Center</h1>
                <p className="text-slate-400">System functional. All gateways operational.</p>
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
                    {/* UPDATED: Changed TZS to SMS */}
                    {balance === null ? "..." : balance} <span className="text-sm font-sans font-normal text-slate-500">SMS</span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Available Credit</div>
            </div>

            {/* 2. CONTACTS (Still Dummy until DB) */}
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-white/20 transition-colors opacity-70">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-900/20 text-blue-500 rounded"><Users size={18}/></div>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">--</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Contacts (No DB)</div>
            </div>

            {/* 3. PERFORMANCE (Still Dummy until DB) */}
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-white/20 transition-colors opacity-70">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-900/20 text-orange-500 rounded"><ArrowUpRight size={18}/></div>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">--</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Success Rate (No DB)</div>
            </div>
        </div>

        {/* DATABASE WARNING */}
        <div className="p-6 bg-yellow-900/10 border border-yellow-500/20 rounded-sm flex items-start gap-4">
            <Activity className="text-yellow-500 shrink-0 mt-1" size={20} />
            <div>
                <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-1">System Notice: Database Disconnected</h3>
                <p className="text-xs text-yellow-200/60 leading-relaxed">
                    We are currently running in <strong>Stateless Mode</strong>. 
                    While you can send SMS and check your balance, your message history and contact lists are <strong>not being saved</strong>.
                    <br/><br/>
                    To fix this, we need to provision a PostgreSQL Database (Phase 59).
                </p>
            </div>
        </div>
    </div>
  );
}
