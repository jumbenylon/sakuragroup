"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, MessageSquare, Activity, ShieldAlert, 
  DollarSign, TrendingUp, CreditCard, Loader2, 
  CheckCircle, XCircle, Search, ShieldCheck, Save
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  status: string;
  balance: number;
}

export default function SovereignPortalPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, traffic: 0, revenue: 0, pendingOffloads: 0 });
  const [loading, setLoading] = useState(true);
  
  // Treasury State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchMasterData = async () => {
    try {
      // Syncing all administrative context in one high-performance call
      const res = await fetch("/api/admin/master-sync");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Infrastructure Sync Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMasterData(); }, []);

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !amount) return;
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser.id, action: "TOPUP", amount: Number(amount) })
      });
      if (res.ok) {
        setSelectedUser(null);
        setAmount("");
        fetchMasterData(); // Refresh local state
      }
    } finally { setProcessing(false); }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-7xl mx-auto">
      
      {/* 1. MASTER KPI GRID (Tesla Minimalist) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard label="Nodes Active" value={stats.totalUsers.toString()} icon={Users} color="text-blue-600" />
        <KpiCard label="Traffic Vol" value={stats.traffic.toLocaleString()} icon={MessageSquare} color="text-purple-600" />
        <KpiCard label="Revenue" value={`${stats.revenue.toLocaleString()} TZS`} icon={DollarSign} color="text-emerald-600" />
        <KpiCard 
          label="Pending Deletions" 
          value={stats.pendingOffloads.toString()} 
          icon={ShieldAlert} 
          color={stats.pendingOffloads > 0 ? "text-red-600 animate-pulse" : "text-slate-300"} 
        />
      </div>

      {/* 2. TREASURY CONTROL CENTER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
            <ShieldCheck size={14} className="text-pink-600" /> Infrastructure Provisioning
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={12} />
            <input 
              type="text" 
              placeholder="Filter Nodes..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-pink-500 w-48 transition-all focus:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-slate-200" size={32} />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic text-center">Reading System State...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Node Identity</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Wallet Balance</th>
                  <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-[11px]">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{user.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono tracking-tighter">{user.email}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black text-pink-600 uppercase tracking-tighter">{user.organization}</span>
                        <span className={`px-1.5 py-0.5 rounded-[4px] text-[8px] font-black uppercase tracking-tighter ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-slate-900 text-sm">
                      {user.balance.toLocaleString()} <span className="text-slate-300 text-[9px]">TZS</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="px-4 py-2 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
                      >
                        Credit Node
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 3. TREASURY MODAL (Functional Purity) */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">Treasury Load</h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Target Node: {selectedUser.organization}</p>
            </div>
            <form onSubmit={handleTopUp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Deposit Amount (TZS)</label>
                <input 
                  type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono font-bold text-3xl text-slate-900 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder:text-slate-200"
                  placeholder="0.00"
                  autoFocus required
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setSelectedUser(null)} className="flex-1 py-4 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors">Abort</button>
                <button type="submit" disabled={processing} className="flex-1 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-slate-800 transition-all">
                  {processing ? <Loader2 className="animate-spin mx-auto" size={16}/> : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-slate-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{label}</p>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{value}</h2>
        </div>
        <div className={`p-3 rounded-xl bg-slate-50 ${color}`}><Icon size={18} /></div>
      </div>
    </div>
  );
}
