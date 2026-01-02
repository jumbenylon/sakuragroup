"use client";

import React from "react";
import { CreditCard, Download, History } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-white uppercase tracking-tight pb-6 border-b border-white/10">Billing & Credits</h1>

      <div className="grid md:grid-cols-3 gap-8">
          {/* BALANCE CARD */}
          <div className="md:col-span-2 bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 p-8 rounded-sm relative overflow-hidden">
              <div className="relative z-10">
                  <div className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">Available Balance</div>
                  <div className="text-6xl font-black text-white mb-6">24,500 <span className="text-xl text-slate-400 font-normal">TZS</span></div>
                  <div className="flex gap-4">
                      <button className="px-6 py-3 bg-pink-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-pink-500">Top Up Credits</button>
                      <button className="px-6 py-3 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5">Auto-Recharge</button>
                  </div>
              </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-[#050505] border border-white/10 p-8">
              <div className="flex justify-between items-center mb-6">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Default Method</div>
                  <button className="text-[10px] text-pink-500 underline">Change</button>
              </div>
              <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-6 bg-slate-700 rounded-sm"></div>
                  <span className="text-sm font-mono text-white">•••• 4242</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                  Next invoice will be charged to this card on <span className="text-white">Jan 31, 2026</span>.
              </p>
          </div>
      </div>

      {/* INVOICE HISTORY */}
      <div className="pt-8">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={16} /> Transaction History
          </h3>
          <div className="bg-[#050505] border border-white/10">
              {[1,2,3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-b border-white/5 hover:bg-white/[0.02]">
                      <div className="flex gap-4 items-center">
                          <div className="p-2 bg-emerald-900/20 text-emerald-500 rounded"><CreditCard size={14}/></div>
                          <div>
                              <div className="text-xs font-bold text-white">Credit Top-Up</div>
                              <div className="text-[10px] text-slate-500">Dec {20+i}, 2025</div>
                          </div>
                      </div>
                      <div className="flex items-center gap-6">
                          <div className="font-mono text-sm text-white font-bold">+50,000 TZS</div>
                          <Download size={14} className="text-slate-600 hover:text-white cursor-pointer" />
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
