"use client";

import React, { useState } from "react";
import { User, Key, Globe, Shield, Save, Loader2, Phone, Lock, CheckCircle, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "api", label: "API Infrastructure", icon: Key },
    { id: "security", label: "Account Security", icon: Shield },
  ];

  const handleProtocolUpdate = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic uppercase">System Settings.</h1>
          <p className="text-sm text-slate-400 font-medium italic">Manage your identity and node lifecycle infrastructure.</p>
        </div>
        <button onClick={handleProtocolUpdate} className="px-8 py-4 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl flex items-center gap-2 hover:bg-black transition-all shadow-xl">
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : success ? <CheckCircle size={16} /> : <Save size={16} />}
          {success ? "Handshake Verified" : "Save Changes"}
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* TAB NAVIGATION */}
        <div className="lg:col-span-3 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-4 rounded-2xl transition-all ${
                activeTab === tab.id ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50"
              }`}>
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="lg:col-span-9 space-y-8">
          {activeTab === "general" && (
            <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm space-y-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 italic">01 — Node Identity Profile</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 italic underline underline-offset-4">Full Name / Admin</label>
                  <input defaultValue="System Admin" className="w-full p-5 bg-slate-50 border-none rounded-2xl text-[11px] font-black text-slate-900 outline-none focus:ring-1 focus:ring-slate-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 italic underline underline-offset-4">Organization</label>
                  <input defaultValue="Sakura Group" className="w-full p-5 bg-slate-50 border-none rounded-2xl text-[11px] font-black text-slate-900 outline-none focus:ring-1 focus:ring-slate-900" />
                </div>
                <div className="space-y-2 opacity-60">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 flex items-center gap-2 italic"><Lock size={10}/> Protocol Email (Read-Only)</label>
                  <input value="admin@sakuragroup.co.tz" readOnly className="w-full p-5 bg-slate-100 border-none rounded-2xl text-[11px] font-black text-slate-400 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 italic underline underline-offset-4">Contact Phone</label>
                  <div className="relative">
                    <Phone size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input defaultValue="+255 744 000 000" className="w-full pl-10 p-5 bg-slate-50 border-none rounded-2xl text-[11px] font-black text-slate-900 outline-none focus:ring-1 focus:ring-slate-900" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 italic">Production Keys</h3>
                 <p className="text-xs text-slate-400 font-medium max-w-md italic">Use these keys for direct carrier API handshakes. Keep them encrypted at rest.</p>
                 <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] font-mono text-sky-400 text-[10px] tracking-widest break-all">
                    AXIS_KEY_PROD_91022J0K1_SK_LIVE
                 </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] pointer-events-none" />
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8">
              <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 italic mb-8">Access Verification</h3>
                <button className="px-8 py-4 border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all">Change Account Password</button>
              </div>
              <div className="bg-rose-50 border border-rose-100 p-10 rounded-[3rem] space-y-4">
                <div className="flex items-center gap-2 text-rose-800">
                  <Trash2 size={16} />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Infrastructure Decommission</h3>
                </div>
                <p className="text-[10px] text-rose-600 font-bold italic">Requesting node offloading will terminate all active API keys and Sender IDs.</p>
                <button className="px-8 py-4 bg-white border border-rose-200 text-rose-600 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white rounded-2xl transition-all shadow-sm">Request Node Offloading</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
