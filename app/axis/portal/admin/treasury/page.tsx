"use client";

import React, { useState } from "react";
import { CheckCircle, XCircle, DollarSign, Search, Loader2, Wallet } from "lucide-react";

export default function AdminTreasuryPage() {
  const [loading, setLoading] = useState(false);
  
  // Simulated Pending Queue
  const pendingPayments = [
    { id: "TX-901", user: "Jumbenylon", org: "Sakura Host", amount: 50000, ref: "9K203X82", provider: "M-Pesa", date: "08 Jan, 12:45" },
    { id: "TX-902", user: "Hassan B.", org: "Apex Retail", amount: 25000, ref: "B829X110", provider: "CRDB", date: "08 Jan, 11:20" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <header className="space-y-2 border-b border-slate-100 pb-10">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">Treasury Queue.</h1>
        <p className="text-sm text-slate-400 font-medium">Verify incoming SakuraPay manual handshakes.</p>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Source Node</th>
              <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Transaction Details</th>
              <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pendingPayments.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="p-8">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{pay.org}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{pay.user}</p>
                </td>
                <td className="p-8">
                   <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm font-black text-slate-900">{pay.amount.toLocaleString()} TZS</p>
                        <p className="text-[9px] font-black text-sky-500 uppercase tracking-widest">{pay.provider} • {pay.ref}</p>
                      </div>
                      <span className="text-[9px] text-slate-300 font-mono italic">{pay.date}</span>
                   </div>
                </td>
                <td className="p-8 text-right space-x-2">
                   <button className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><XCircle size={16}/></button>
                   <button className="px-6 py-3 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-emerald-100">Approve & Credit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
