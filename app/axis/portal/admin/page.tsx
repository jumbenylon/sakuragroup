"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Search, MoreVertical, CheckCircle, XCircle, CreditCard, Loader2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  status: string;
  balance: number;
}

export default function SovereignPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Top Up Modal State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  // 1. Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (e) {
      console.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Handle Top Up
  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !amount) return;
    
    setProcessing(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           userId: selectedUser.id,
           action: "TOPUP",
           amount: Number(amount)
        })
      });

      if (res.ok) {
        alert(`Success! Added TZS ${Number(amount).toLocaleString()} to ${selectedUser.name}`);
        setAmount("");
        setSelectedUser(null);
        fetchUsers(); // Refresh table
      }
    } catch (e) {
      alert("Top Up Failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-3">
             <ShieldCheck className="text-pink-600" size={32} /> Sovereign Command
          </h1>
          <p className="text-slate-500 text-sm">System-wide user management and treasury control.</p>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         {loading ? (
             <div className="p-12 flex justify-center text-slate-400 font-bold text-xs gap-2">
                 <Loader2 className="animate-spin" size={16} /> Loading System Data...
             </div>
         ) : (
           <table className="w-full text-left">
             <thead className="bg-slate-900 text-white">
               <tr>
                 <th className="p-4 text-[10px] font-bold uppercase tracking-widest">User / Organization</th>
                 <th className="p-4 text-[10px] font-bold uppercase tracking-widest">Role</th>
                 <th className="p-4 text-[10px] font-bold uppercase tracking-widest">Status</th>
                 <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-right">Wallet Balance</th>
                 <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {users.map(user => (
                 <tr key={user.id} className="hover:bg-slate-50">
                   <td className="p-4">
                      <div className="font-bold text-slate-800 text-sm">{user.name}</div>
                      <div className="text-xs text-slate-400 font-mono">{user.email}</div>
                      {user.organization && (
                        <span className="inline-block mt-1 text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold uppercase">
                           {user.organization}
                        </span>
                      )}
                   </td>
                   <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide ${
                        user.role === 'ADMIN' ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"
                      }`}>
                        {user.role}
                      </span>
                   </td>
                   <td className="p-4">
                      {user.status === 'ACTIVE' ? (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
                          <CheckCircle size={12}/> Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase">
                          <XCircle size={12}/> {user.status}
                        </div>
                      )}
                   </td>
                   <td className="p-4 text-right">
                      <div className="font-mono font-bold text-slate-800">
                         {user.balance.toLocaleString()} <span className="text-slate-400 text-[10px]">TZS</span>
                      </div>
                   </td>
                   <td className="p-4 text-right">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-[10px] uppercase tracking-wide rounded border border-pink-200 transition-colors flex items-center gap-1 ml-auto"
                      >
                         <CreditCard size={12} /> Top Up
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         )}
      </div>

      {/* TOP UP MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm animate-in fade-in zoom-in duration-300">
                <h2 className="text-xl font-black text-slate-900 mb-2">Treasury Top-Up</h2>
                <p className="text-sm text-slate-500 mb-6">
                   Adding funds to <span className="font-bold text-slate-800">{selectedUser.name}</span>
                </p>

                <form onSubmit={handleTopUp} className="space-y-4">
                   <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount (TZS)</label>
                      <input 
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="e.g. 50000"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-lg text-slate-800 outline-none focus:ring-2 focus:ring-pink-500 mt-1"
                        autoFocus
                      />
                   </div>

                   <div className="pt-2 flex gap-3">
                      <button 
                        type="button"
                        onClick={() => { setSelectedUser(null); setAmount(""); }}
                        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-lg"
                      >
                         Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={processing}
                        className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex justify-center items-center gap-2"
                      >
                         {processing ? <Loader2 className="animate-spin" size={16}/> : "Confirm"}
                      </button>
                   </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}
