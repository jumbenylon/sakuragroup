"use client";

import React from "react";
import { Lock, User, Globe, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-white uppercase tracking-tight pb-6 border-b border-white/10">System Settings</h1>

      <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-1">
              {["General", "API Keys", "Security", "Notifications"].map((tab, i) => (
                  <button key={i} className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest ${i===0 ? "bg-pink-500/10 text-pink-500 border-l-2 border-pink-500" : "text-slate-500 hover:text-white hover:bg-white/5"}`}>
                      {tab}
                  </button>
              ))}
          </div>

          <div className="md:col-span-2 space-y-8">
              {/* PROFILE SECTION */}
              <div className="bg-[#050505] border border-white/10 p-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                      <User size={16} /> Admin Profile
                  </h3>
                  <div className="grid gap-6">
                      <div className="grid md:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Company Name</label>
                              <input type="text" value="Sakura Group" readOnly className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-xs text-white" />
                          </div>
                          <div>
                              <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Support Email</label>
                              <input type="text" value="admin@sakuragroup.co.tz" readOnly className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-xs text-white" />
                          </div>
                      </div>
                  </div>
              </div>

              {/* SENDER ID SECTION */}
              <div className="bg-[#050505] border border-white/10 p-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Globe size={16} /> Sender IDs
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/10">
                      <div>
                          <div className="text-xs font-bold text-white">sakurahost</div>
                          <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Active • Default</div>
                      </div>
                      <button className="text-[10px] text-slate-500 border border-white/10 px-3 py-1 hover:text-white">Configure</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
