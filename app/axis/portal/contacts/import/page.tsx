"use client";

import React, { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle, Info, Loader2 } from "lucide-react";

/**
 * Axis Import Center - Handshake Protocol
 * Logic: Cleans spaces/codes during ingestion as per Sakura legacy.
 */
export default function ImportCenter() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <header className="space-y-2 text-center py-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Bulk Import.</h1>
        <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">Connect your CSV database</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* Upload Terminal */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Target Group</label>
              <select className="w-full p-4 bg-slate-50 border-none rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-slate-900">
                <option>Ungrouped Contacts</option>
                <option>VIP Retailers</option>
              </select>
            </div>
          </div>

          <div className="relative group border-2 border-dashed border-slate-100 rounded-[3rem] p-20 text-center bg-slate-50/50 hover:bg-slate-50 transition-all">
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".csv" />
            <div className="flex flex-col items-center space-y-4">
              <FileSpreadsheet size={48} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Drop CSV Handshake</h4>
              <p className="text-[10px] text-slate-400 font-bold italic tracking-tighter">Max file size: 10MB per node</p>
            </div>
          </div>

          <button className="w-full py-6 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all">
            Execute Bulk Import
          </button>
        </div>

        {/* Structure Guide */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] italic">Template Guide</h4>
            <div className="space-y-4">
               <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <p className="text-[8px] text-slate-500 uppercase mb-1">Column A</p>
                  <p className="text-xs font-black font-mono">Customer Name</p>
               </div>
               <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                  <p className="text-[8px] text-slate-500 uppercase mb-1">Column B</p>
                  <p className="text-xs font-black font-mono">255 7XX XXX XXX</p>
               </div>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic border-l-2 border-sky-500 pl-4">
              System cleans dashes and country codes automatically during the handshake.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-[80px]" />
        </div>
      </div>
    </div>
  );
}
