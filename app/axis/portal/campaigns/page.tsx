"use client";

import React from "react";
import { MessageSquare, Calendar, BarChart3, AlertCircle } from "lucide-react";

export default function CampaignsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="pb-6 border-b border-white/10">
         <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Campaign History</h1>
         <p className="text-xs text-slate-500 mt-1">Real-time delivery reports and logs.</p>
      </div>

      <div className="grid gap-4">
          {[1,2,3].map((i) => (
              <div key={i} className="bg-[#050505] border border-white/10 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-pink-500/30 transition-colors group">
                  <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded flex items-center justify-center ${i===1 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-slate-500'}`}>
                          {i===1 ? <MessageSquare size={20}/> : <Calendar size={20}/>}
                      </div>
                      <div>
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Weekly Newsletter #{100+i}</h3>
                          <div className="flex gap-4 text-[10px] text-slate-500 font-mono">
                              <span>ID: CMP-{202499+i}</span>
                              <span>•</span>
                              <span>10:4{i} AM</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex gap-8 text-right">
                      <div>
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Delivered</div>
                          <div className="text-xl font-mono text-white font-bold">98.5%</div>
                      </div>
                      <div>
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Cost</div>
                          <div className="text-xl font-mono text-white font-bold">{(i*5000).toLocaleString()} <span className="text-xs text-slate-600">TZS</span></div>
                      </div>
                      <button className="h-10 w-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                          <BarChart3 size={16} />
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
