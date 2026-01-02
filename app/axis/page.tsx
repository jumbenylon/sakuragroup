"use client";

import React from "react";
import { QuickSendWidget } from "@/components/axis/quick-send";

export default function AxisPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Command Center</h1>
        <p className="text-slate-400">Manage your communication campaigns.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         {/* LEFT: THE WIDGET */}
         <QuickSendWidget />

         {/* RIGHT: PLACEHOLDER STATS */}
         <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0B1120] border border-white/5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[1,2,3].map(i => (
                        <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0">
                            <span className="text-white">Campaign #{2020 + i}</span>
                            <span className="text-emerald-500 font-mono">DELIVERED</span>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
