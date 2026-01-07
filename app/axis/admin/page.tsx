"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, MessageSquare, Activity, ShieldAlert, 
  DollarSign, TrendingUp, CreditCard, Loader2, 
  CheckCircle, XCircle, Search, ShieldCheck 
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

export default function UnifiedMasterControl() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, traffic: 0, revenue: 0, pendingOffloads: 0 });
  const [loading, setLoading] = useState(true);
  
  // Treasury State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchData = async () => {
    try {
      // 🟢 Logic: Single call to fetch all admin context
      const res = await fetch("/api/admin/master-sync");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Master Sync Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

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
        fetchData();
      }
    } finally { setProcessing(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 selection:bg-pink-100">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-4">
              <ShieldCheck size={40} className="text-pink-600" /> Master Control
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
              Sakura Group • Axis Gateway Sovereign Node
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest text-emerald-700">Gateway Nominal</span>
          </div>
        </div>

        {/* KPI GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard label="Nodes Active" value={stats.totalUsers.toString()} icon={Users} color="text-blue-600" />
          <KpiCard label="Traffic Vol" value={stats.traffic.toLocaleString()} icon={MessageSquare} color="text-purple-600" />
          <KpiCard label="Gross Revenue" value={`${stats.revenue.toLocaleString()} TZS`} icon={DollarSign} color="text-emerald-600" />
          <KpiCard 
            label="Pending Offloads" 
            value={stats.pendingOffloads.toString()} 
            icon={ShieldAlert} 
            color={stats.pendingOffloads > 0 ? "text-red-600 animate-bounce" : "text-slate-300"} 
          />
        </div>

        {/* TREASURY & USER MANAGEMENT */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
              <CreditCard size={14} className="text-pink-600" /> Treasury Management
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
              <input 
                type="text" 
                placeholder="Search Identity..." 
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-pink-500 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-slate-200" size={32} /></div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Node Identity</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Wallet</th>
                    <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[11px]">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{user.email}</div>
                        <div className="text-[9px] font-black text-pink-600 uppercase mt-1 tracking-tighter">{user.organization}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">
                        {user.balance.toLocaleString()} <span className="text-slate-300">TZS</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="px-3 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded hover:bg-slate-800 transition-all"
                        >
                          Top Up
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: TOP UP (Tesla-style minimalist) */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-2xl space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Treasury Action</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Provisioning credits for {selectedUser.organization}</p>
            </div>
            <form onSubmit={handleTopUp} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Credit Amount (TZS)</label>
                <input 
                  type="number" value={amount} onChange={e => setAmount(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono font-bold text-2xl text-slate-900 focus:ring-1 focus:ring-pink-500 outline-none transition-all"
                  autoFocus required
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setSelectedUser(null)} className="flex-1 py-4 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl">Cancel</button>
                <button type="submit" disabled={processing} className="flex-1 py-4 bg-pink-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-pink-200">
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
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{label}</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h2>
        </div>
        <div className={`p-4 rounded-xl bg-slate-50 ${color}`}><Icon size={24} /></div>
      </div>
    </div>
  );
}
