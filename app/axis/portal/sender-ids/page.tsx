"use client";

import React, { useState } from "react";
import { ShieldCheck, Plus, Clock, CheckCircle } from "lucide-react";

/**
 * Axis Identity Module - Sender IDs
 * Purpose: Whitelisting Brand Names with TCRA via Axis.
 */
export default function SenderIdPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight">Sender Identities</h1>
          <p className="text-slate-500 text-sm italic">TCRA Whitelisted Brand Names</p>
        </div>
        <button className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all">
          <Plus size={14} /> Request New Name
        </button>
      </header>

      <div className="grid gap-4">
        {/* Example Item: SAKURA */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl flex justify-between items-center group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 font-black">
              SK
            </div>
            <div>
              <h3 className="font-bold text-slate-900 uppercase">SAKURA</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Active • Standard Route</p>
            </div>
          </div>
          <CheckCircle className="text-emerald-500" size={20} />
        </div>

        {/* Example Item: Pending Request */}
        <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl flex justify-between items-center opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-300 font-black">
              ??
            </div>
            <div>
              <h3 className="font-bold text-slate-400 uppercase tracking-tighter">Jumbenylon</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Awaiting TCRA Whitelisting</p>
            </div>
          </div>
          <Clock className="text-slate-300" size={20} />
        </div>
      </div>
    </div>
  );
}
