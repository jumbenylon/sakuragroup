"use client";

import React from "react";
import Link from "next/link";
import { PenTool, Users, ArrowUpRight, Activity } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
        
        {/* WELCOME HERO */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                    Command Center
                </h1>
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
            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-900/20 text-blue-500 rounded"><Users size={18}/></div>
                    <span className="text-[10px] text-emerald-500 bg-emerald-900/20 px-2 py-1 rounded font-bold">+12%</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">1,204</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Contacts</div>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-900/20 text-purple-500 rounded"><Activity size={18}/></div>
                    <span className="text-[10px] text-slate-500 font-bold">Last 7 Days</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">8,500</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">SMS Dispatched</div>
            </div>

            <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-orange-900/20 text-orange-500 rounded"><ArrowUpRight size={18}/></div>
                    <span className="text-[10px] text-slate-500 font-bold">Success Rate</span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-1">99.8%</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Delivery Performance</div>
            </div>
        </div>
    </div>
  );
}
