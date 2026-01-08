"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
// ... (Previous imports)

export default function AxisBillingPage() {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(searchParams.get("amount") || "");
  const [qty, setQty] = useState(searchParams.get("qty") || "");
  const [tier, setTier] = useState(searchParams.get("tier") || "");

  // UI logic: If prefilled, show a "Selected Package" banner
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {tier && (
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex justify-between items-center animate-in slide-in-from-top-4">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                 <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Selected Capacity</p>
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter">{tier} Package — {Number(qty).toLocaleString()} SMS</h4>
              </div>
           </div>
           <p className="text-2xl font-black text-slate-900">{Number(amount).toLocaleString()} <small className="text-xs">TZS</small></p>
        </div>
      )}

      {/* 🟢 STEP 1: Method selection remains same */}
      {/* 🟢 STEP 3: Verification form fields are now prefilled and read-only if from package */}
      <div className="space-y-2">
         <label className="text-[9px] font-black uppercase text-slate-400 ml-2 italic">Amount (Prefilled)</label>
         <input 
            type="number" 
            readOnly={!!amount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-5 bg-slate-50 border-none rounded-2xl text-lg font-black text-slate-900 outline-none" 
         />
      </div>
    </div>
  );
}
