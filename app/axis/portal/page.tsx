"use client";

import React from "react";
import { QuickSendWidget } from "@/components/axis/quick-send";
import { Activity, Database, Server, ArrowUpRight } from "lucide-react";

export default function AxisPortalPage() {
  return (
    <div className="space-y-8">
      
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold text-white uppercase tracking-tight">System Overview</h1>
           <p className="text-slate-500 text-xs font-mono mt-1">NODE: DAR-ES-SALAAM-01 • STATUS: OPTIMAL</p>
        </div>
        <div className="flex gap-4">
            <button className="px-5 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors">
                New Campaign
            </button>
            <button className="px-5 py-2.5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
                Add Credits
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         
         {/* LEFT COLUMN: CONSOLE (8 Cols) */}
         <div className="lg:col-span-8 space-y-8">
             {/* WIDGET WRAPPER */}
             <div className="bg-[#050505] border border-white/10">
                 <div className="px-6 py-3 border-b border-white/10 bg-[#0a0a0a] flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Direct Dispatch Protocol</span>
                    <div className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[10px] font-mono text-emerald-500">GSM GATEWAY ACTIVE</span>
                    </div>
                 </div>
                 <div className="p-0">
                    {/* Reuse existing widget logic but the container handles the style */}
                    <QuickSendWidget /> 
                 </div>
             </div>

             {/* METRIC PLATES */}
             <div className="grid grid-cols-3 gap-4">
                {[
                    { l: "Success Rate", v: "99.9%", i: Activity },
                    { l: "Throughput", v: "450/sec", i: Server },
                    { l: "Database", v: "14.2k", i: Database },
                ].map((m, i) => (
                    <div key={i} className="bg-[#050505] border border-white/10 p-6 flex items-start justify-between group hover:border-white/20 transition-colors">
                        <div>
                            <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block mb-2">{m.l}</span>
                            <span className="text-2xl font-mono text-white">{m.v}</span>
                        </div>
                        <m.i className="text-slate-700 group-hover:text-pink-600 transition-colors" size={20} />
                    </div>
                ))}
             </div>
         </div>

         {/* RIGHT COLUMN: LOGS (4 Cols) */}
         <div className="lg:col-span-4">
            <div className="bg-[#050505] border border-white/10 h-full flex flex-col">
                <div className="px-6 py-4 border-b border-white/10 bg-[#0a0a0a]">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Traffic Logs</h3>
                </div>
                
                <div className="flex-1 p-0 font-mono text-xs">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex gap-3 px-6 py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <span className="text-slate-600">10:42:{10+i}</span>
                            <span className="text-pink-500">OUT</span>
                            <span className="text-slate-400 truncate">CID-8829{i} :: Delivered to Vodacom</span>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-white/10">
                    <button className="w-full py-3 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                        System Audit <ArrowUpRight size={12} />
                    </button>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
}
