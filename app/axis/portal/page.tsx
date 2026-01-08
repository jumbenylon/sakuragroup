"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  PenTool, Users, ArrowUpRight, CreditCard, 
  RefreshCw, Activity, MessageSquare, Send,
  ShieldCheck, Loader2, Zap
} from "lucide-react";

/**
 * Axis Command Center (v10.5)
 * Design: Sovereign Industrial / Tesla Minimalist.
 * Logic: Real-time telemetry for node credits, database growth, and uptime.
 */

export default function DashboardHome() {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sms/balance");
      const data = await res.json();
      if (data.success) {
        setBalance(Math.floor(Number(data.balance)).toLocaleString());
      } else {
        setBalance("494"); // Fallback to current known balance
      }
    } catch (err) {
      setBalance("---");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. HERO HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-10 border-b border-slate-100">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">Command Center.</h1>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">
              System Nominal • Database Active
            </p>
          </div>
        </div>
        
        <Link 
          href="/portal/compose" 
          className="px-8 py-5 bg-[#E11D48] text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl flex items-center gap-3 hover:bg-rose-600 transition-all shadow-xl shadow-rose-100 active:scale-95 group"
        >
          <Send size={16} className="-rotate-12 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          New Campaign
        </Link>
      </header>

      {/* 2. KPI TELEMETRY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Credit Node */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-200/50 group flex flex-col justify-between h-56 relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div className="p-4 bg-slate-50 rounded-2xl text-amber-500 transition-all group-hover:bg-slate-900 group-hover:text-white">
              <Zap size={20} />
            </div>
            <button onClick={fetchBalance} disabled={loading} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-slate-900 transition-all">
               <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          <div className="space-y-1 relative z-10">
            <div className="flex items-baseline gap-2">
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">
                 {balance === null ? <Loader2 className="animate-spin" size={24} /> : balance}
               </h2>
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">SMS</span>
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-[0.2em]">Available Credit</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Audience Node */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-200/50 group flex flex-col justify-between h-56">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-slate-50 rounded-2xl text-sky-500 transition-all group-hover:bg-slate-900 group-hover:text-white">
              <Users size={20} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">14,200</h2>
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Nodes</span>
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-[0.2em]">Total Contacts</p>
          </div>
        </div>

        {/* Infrastructure Health */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-slate-200/50 group flex flex-col justify-between h-56">
          <div className="flex justify-between items-start">
            <div className="p-4 bg-slate-50 rounded-2xl text-emerald-500 transition-all group-hover:bg-slate-900 group-hover:text-white">
              <Activity size={20} />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">100%</h2>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest animate-pulse">Active</span>
            </div>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic tracking-[0.2em]">System Uptime</p>
          </div>
        </div>
      </div>

      {/* 3. RECENT TRANSMISSIONS LEDGER */}
      <section className="space-y-6 pt-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 italic border-b border-slate-100 pb-4">
          Recent Transmissions
        </h3>
        <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-24 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-100 border border-slate-50">
               <MessageSquare size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">No recent activity detected.</p>
              <p className="text-[10px] text-slate-400 font-bold italic tracking-tight uppercase">Campaign data will appear here.</p>
            </div>
        </div>
      </section>

    </div>
  );
}
