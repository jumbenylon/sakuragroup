"use client";

import React from "react";
import { Clock, ShieldCheck, Mail } from "lucide-react";

export default function PendingApproval() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
        
        {/* ICON GROUP */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full" />
          <div className="relative p-6 bg-[#0a0a0a] border border-white/10 rounded-full text-pink-500">
            <Clock size={48} strokeWidth={1.5} className="animate-pulse" />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-4">
          <h1 className="text-2xl font-black text-white uppercase tracking-widest">
            Application Received
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Your account is currently in <span className="text-white font-bold">Review Mode</span>. 
            The Sakura Admin team has been notified and will verify your reseller credentials shortly.
          </p>
        </div>

        {/* STEPS LIST */}
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm space-y-4 text-left">
          <div className="flex items-start gap-4">
            <ShieldCheck className="text-green-500 mt-1" size={18} />
            <div>
              <p className="text-sm font-bold text-white">Identity Verified</p>
              <p className="text-xs text-slate-500">Your secure credentials have been hashed via Argon2id.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="text-pink-500 mt-1" size={18} />
            <div>
              <p className="text-sm font-bold text-white">Admin Notification Sent</p>
              <p className="text-xs text-slate-500">We've alerted the regional office at admin@sakuragroup.co.tz.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="w-full py-4 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          Check Status
        </button>
      </div>
    </div>
  );
}
