"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, 
  ShieldCheck, 
  ArrowUpRight, 
  Terminal, 
  Clock, 
  CheckCircle, 
  RefreshCcw,
  Zap,
  Lock
} from "lucide-react";

/**
 * SakuraPay Merchant Dashboard (v1.0)
 * Design: Refined Industrial Geometry / Calm Fintech
 */

export default function SakuraPayDashboard() {
  const [transactions, setTransactions] = useState([
    { id: '1', ref: '9K203X82N4M', amt: 12000, phone: '255744***123', status: 'VERIFIED', time: '2m ago' },
    { id: '2', ref: '8J159Y11A0P', amt: 5000, phone: '255655***882', status: 'WEBHOOK_SENT', time: '15m ago' },
    { id: '3', ref: '7L992Z00B1Q', amt: 25000, phone: '255712***440', status: 'VERIFIED', time: '1h ago' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans antialiased text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP NAV: SOVEREIGN BRANDING */}
        <header className="flex justify-between items-center border-b border-slate-200 pb-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tighter italic">SakuraPay<span className="text-sky-500">.</span></h1>
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
              <Lock size={10} /> Merchant Node: Axis_Messaging_01
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-white px-4 py-2 rounded-ax-sm border border-slate-200 flex items-center gap-2 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Gateway: Stable</span>
             </div>
          </div>
        </header>

        {/* STATS: INDUSTRIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="24H Volume" value="1.2M" sub="TZS" icon={Activity} />
          <StatCard label="Live Handshakes" value="142" sub="Verified" icon={Zap} />
          <StatCard label="API Uptime" value="99.9%" sub="System Nominal" icon={ShieldCheck} />
        </div>

        {/* LIVE STREAM: TRANSACTION LEDGER */}
        <div className="bg-white border border-slate-200 rounded-ax shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div className="flex items-center gap-3">
                <Terminal size={16} className="text-slate-400" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] italic">Live Transaction Stream</h3>
             </div>
             <button className="text-[9px] font-black uppercase tracking-widest text-sky-500 hover:text-sky-600 transition-colors flex items-center gap-2">
                <RefreshCcw size={12} /> Auto-Sync Active
             </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">Reference</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">Amount</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">Phone Node</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100">Status</th>
                  <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic border-b border-slate-100 text-right">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-xs font-mono font-black tracking-widest text-slate-900 group-hover:text-sky-500 transition-colors">{tx.ref}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-black italic">{tx.amt.toLocaleString()} <small className="text-[9px] text-slate-300 not-italic">TZS</small></span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold text-slate-500 font-mono tracking-tight">{tx.phone}</span>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                         <Clock size={10} /> {tx.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER: INFRASTRUCTURE INFO */}
        <footer className="pt-8 border-t border-slate-200 flex justify-between items-center text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] italic">
          <div>SakuraPay Independent Middle-Gateway v1.0.4</div>
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><ShieldCheck size={12}/> PCI-Sovereign Verified</span>
            <span className="flex items-center gap-2"><ArrowUpRight size={12}/> Node Documentation</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon }: any) {
  return (
    <div className="bg-white p-8 rounded-ax border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-slate-50 rounded-ax-sm text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
          <Icon size={20} />
        </div>
        <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">+12%</div>
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{label}</p>
        <h2 className="text-3xl font-black tracking-tighter text-slate-900 italic">
          {value} <small className="text-xs text-slate-300 not-italic font-bold">{sub}</small>
        </h2>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isVerified = status === 'VERIFIED';
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
      isVerified ? 'bg-sky-50 text-sky-500 border-sky-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'
    }`}>
      <CheckCircle size={10} /> {status.replace('_', ' ')}
    </div>
  );
}
