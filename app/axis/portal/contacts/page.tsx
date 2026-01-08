"use client";

import React, { useState } from "react";
import { Users, Database, ArrowUpRight, Search, FileUp, Plus, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AudiencePage() {
  const [activeTab, setActiveTab] = useState('database');

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Nodes" value="0" icon={Users} color="text-slate-900" />
        <StatCard label="Active Segments" value="12" icon={Database} color="text-slate-400" />
        <StatCard label="Growth Rate" value="+14%" icon={ArrowUpRight} color="text-emerald-500" />
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">Audience.</h1>
          <p className="text-sm text-slate-400 font-medium">Manage your industrial subscriber database.</p>
        </div>
        <div className="flex gap-4">
           <Link href="/portal/contacts/import" className="px-8 py-5 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all">
             <FileUp size={14} /> Bulk Handshake
           </Link>
           <button className="px-8 py-5 bg-[#0F172A] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl hover:bg-black transition-all">
             <Plus size={14} /> Create Node
           </button>
        </div>
      </header>

      {/* Database Interface */}
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-slate-50 pb-4">
          <div className="flex gap-8">
            {['DATABASE', 'SEGMENTS'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} 
                className={`text-[10px] font-black tracking-widest transition-all ${activeTab === tab.toLowerCase() ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-300'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input placeholder="SEARCH IDENTITY..." className="w-full pl-12 pr-6 py-4 bg-white border border-slate-50 rounded-full text-[10px] font-black tracking-[0.2em] outline-none shadow-sm" />
          </div>
        </div>

        <div className="bg-white rounded-[4rem] border border-slate-50 h-[400px] flex flex-col items-center justify-center space-y-6 shadow-sm">
           <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200"><Users size={40}/></div>
           <div className="text-center space-y-1">
             <p className="text-xs font-black text-slate-900 uppercase">No Nodes Found</p>
             <p className="text-[10px] font-bold text-slate-300 italic">Initialize your first subscriber to begin.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm flex items-center justify-between group hover:shadow-2xl transition-all">
      <div>
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">{label}</p>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">{value}</h2>
      </div>
      <div className={`p-4 bg-slate-50 rounded-2xl ${color} shadow-inner`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
