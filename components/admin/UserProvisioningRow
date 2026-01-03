"use client";

import React, { useState } from "react";
import { Check, User, CreditCard } from "lucide-react";

interface UserProps {
  user: {
    id: string;
    email: string;
    balance: number;
    smsRate: number;
  };
  onUpdate: (userId: string, tier: string, topUpAmount: number) => Promise<void>;
}

export const UserProvisioningRow = ({ user, onUpdate }: UserProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [topUp, setTopUp] = useState(0);
  const [selectedTier, setSelectedTier] = useState(
    user.smsRate <= 20 ? "ENTERPRISE" : user.smsRate <= 24 ? "GROWTH" : "CORE"
  );
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    await onUpdate(user.id, selectedTier, topUp);
    setLoading(false);
    setIsEditing(false);
  };

  return (
    <div className="border-b border-white/5 py-6 px-8 hover:bg-white/[0.01] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
          <User size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm">{user.email}</span>
          <div className="flex gap-3 mt-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Rate: {user.smsRate} TZS</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-pink-500">Wallet: {user.balance.toLocaleString()} TZS</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsEditing(!isEditing)}
        className="px-6 py-2 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
      >
        {isEditing ? "Cancel" : "Manage Client"}
      </button>

      {isEditing && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex justify-end">
          <motion_div 
            initial={{ x: "100%" }} animate={{ x: 0 }} 
            className="w-full max-w-md bg-[#0a0a0a] border-l border-white/10 p-12 overflow-y-auto"
          >
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">Provisioning</h3>
            <p className="text-slate-500 text-xs mb-10 uppercase tracking-widest">{user.email}</p>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Tier</label>
                <select 
                  value={selectedTier} 
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs outline-none focus:border-pink-500"
                >
                  <option value="CORE">CORE (28 TZS)</option>
                  <option value="GROWTH">GROWTH (24 TZS)</option>
                  <option value="ENTERPRISE">ENTERPRISE (20 TZS)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Manual Top-Up (TZS)</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  onChange={(e) => setTopUp(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs outline-none focus:border-pink-500" 
                />
              </div>

              <button 
                disabled={loading}
                onClick={handleAction}
                className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Confirm Provisioning"} <Check size={14} />
              </button>
            </div>
          </motion_div>
        </div>
      )}
    </div>
  );
};

// Simple motion shim to avoid build errors if framer-motion is finicky in deep components
const motion_div = ({ children, initial, animate, className }: any) => (
  <div className={className}>{children}</div>
);
