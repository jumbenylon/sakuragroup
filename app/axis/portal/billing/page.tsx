"use client";

import React, { useEffect, useState } from "react";
import { CreditCard, Download, History, Wallet, Smartphone, ArrowUpRight } from "lucide-react";

// Types matching your Schema
interface Transaction {
  id: string;
  amount: number;
  type: string;
  reference: string | null;
  createdAt: string;
}

export default function BillingPage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // [INTEGRATION] Fetch Real Wallet Data
  useEffect(() => {
    async function fetchWallet() {
      try {
        // 1. Get Balance
        const userRes = await fetch("/api/auth/check-user");
        if (userRes.ok) {
           const userData = await userRes.json();
           setBalance(userData.user.balance);
        }

        // 2. Get Transactions (You'll need to build /api/billing/history)
        // For now, we simulate empty or fetch if endpoint exists
        // const txRes = await fetch("/api/billing/history");
        setTransactions([]); 
      } catch (error) {
        console.error("Wallet Sync Failed", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWallet();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Billing & Credits</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your prepaid wallet and transaction history.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
          {/* BALANCE CARD (Light Mode Gradient) */}
          <div className="md:col-span-2 bg-gradient-to-br from-pink-600 to-purple-700 p-8 rounded-lg shadow-lg relative overflow-hidden text-white">
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 text-pink-100 uppercase tracking-widest text-xs font-bold">
                    <Wallet size={14} /> Available Funds
                  </div>
                  <div className="text-5xl md:text-6xl font-black mb-8 tracking-tight">
                    {loading ? "..." : balance?.toLocaleString() ?? "0"} 
                    <span className="text-xl text-pink-200 font-medium ml-2">TZS</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                      <button className="px-6 py-3 bg-white text-pink-700 font-bold text-xs uppercase tracking-widest hover:bg-pink-50 transition-colors rounded shadow-sm flex items-center gap-2">
                        <Smartphone size={16} /> Top Up (Mobile Money)
                      </button>
                      <button className="px-6 py-3 border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors rounded flex items-center gap-2">
                        <CreditCard size={16} /> Bank Card
                      </button>
                  </div>
              </div>
          </div>

          {/* PAYMENT METHOD (Placeholder for Selcom/Gateway Info) */}
          <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Auto-Recharge</div>
                  <div className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase">Disabled</div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                    <ArrowUpRight size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Threshold Alert</div>
                    <div className="text-xs text-slate-500">Notify when below 5,000 TZS</div>
                  </div>
              </div>
              <button className="w-full py-3 border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-colors rounded">
                  Configure Alerts
              </button>
          </div>
      </div>

      {/* INVOICE HISTORY */}
      <div className="pt-8">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
              <History size={16} /> Transaction History
          </h3>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              {loading ? (
                 <div className="p-8 text-center text-slate-400 text-xs font-mono uppercase">Loading Ledger...</div>
              ) : transactions.length === 0 ? (
                 <div className="p-12 text-center">
                    <div className="text-slate-800 font-bold mb-1">No Transactions Found</div>
                    <div className="text-slate-500 text-sm">You haven't topped up your account yet.</div>
                 </div>
              ) : (
                 transactions.map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex gap-4 items-center">
                          <div className={`p-2 rounded ${tx.type === 'CREDIT' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                            {tx.type === 'CREDIT' ? <Download size={14}/> : <ArrowUpRight size={14}/>}
                          </div>
                          <div>
                              <div className="text-xs font-bold text-slate-800">
                                {tx.type === 'CREDIT' ? "Wallet Top-Up" : "Usage Debit"}
                              </div>
                              <div className="text-[10px] text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</div>
                          </div>
                      </div>
                      <div className="flex items-center gap-6">
                          <div className={`font-mono text-sm font-bold ${tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-800'}`}>
                            {tx.type === 'CREDIT' ? '+' : '-'}{tx.amount.toLocaleString()} TZS
                          </div>
                          <button className="text-slate-400 hover:text-pink-600 transition-colors">
                            <Download size={14} />
                          </button>
                      </div>
                  </div>
                 ))
              )}
          </div>
      </div>
    </div>
  );
}
