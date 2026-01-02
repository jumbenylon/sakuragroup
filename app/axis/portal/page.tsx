"use client";

import React from "react";
import { QuickSendWidget } from "@/components/axis/quick-send";
import { Activity, Users, ArrowUpRight } from "lucide-react";

export default function AxisPortalPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Welcome Block */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
        <div>
           <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">Command Center</h1>
           <p className="text-slate-400 text-sm">Manage your communication streams and monitor throughput.</p>
        </div>
        <div className="flex gap-3">
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors border border-white/10">
                Manage Keys
            </button>
            <button className="px-6 py-3 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors border border-emerald-500/20">
                Top Up Balance
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* LEFT: THE WIDGET (Takes 2 columns) */}
         <div className="lg:col-span-2 space-y-8">
             <QuickSendWidget />
             
             {/* Mini Stats Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/5">
                    <div className="flex items-center gap-3 mb-4 text-slate-500">
                        <Activity size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Success Rate</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">99.8%</div>
                </div>
                <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/5">
                    <div className="flex items-center gap-3 mb-4 text-slate-500">
                        <Users size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Active Contacts</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">14,205</div>
                </div>
             </div>
         </div>

         {/* RIGHT: LIVE FEED */}
         <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0B1120] border border-white/5 h-full">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Traffic</h3>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"/>
                </div>
                
                <div className="space-y-0 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/5" />
                    
                    {[1,2,3,4,5].map((i) => (
                        <div key={i} className="flex gap-4 items-start py-3 group">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#050912] border border-white/10 group-hover:border-emerald-500 transition-colors z-10 shrink-0 mt-1" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs text-white font-bold group-hover:text-emerald-400 transition-colors">Campaign #{2024 + i}</span>
                                    <span className="text-[10px] font-mono text-slate-600">10:4{i} AM</span>
                                </div>
                                <div className="text-[10px] text-slate-500 mt-1">
                                    Delivered to <span className="text-slate-300">Vodacom</span> • 150 Recipients
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2">
                    View Full Logs <ArrowUpRight size={14} />
                </button>
            </div>
         </div>
      </div>
    </div>
  );
}
