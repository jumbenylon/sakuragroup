"use client";

import React, { useState, useEffect } from "react";
import { Lock, User, Globe, Shield, Key, Copy, Plus, Loader2 } from "lucide-react";

// Types
interface UserProfile {
  name: string;
  organization: string | null;
  email: string;
  role: string;
}

interface SenderId {
  id: string;
  senderId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [senderIds, setSenderIds] = useState<SenderId[]>([]);
  const [loading, setLoading] = useState(true);

  // [INTEGRATION] Fetch Real Data
  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Profile
        const userRes = await fetch("/api/auth/check-user");
        if (userRes.ok) {
           const data = await userRes.json();
           setUser(data.user);
        }

        // 2. Sender IDs (You need to create this endpoint)
        // For now, we simulate an empty list or fetch if exists
        const senderRes = await fetch("/api/settings/sender-ids");
        if (senderRes.ok) {
            const data = await senderRes.json();
            setSenderIds(data.senderIds || []);
        }
      } catch (error) {
        console.error("Settings Sync Failed", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "api", label: "API Keys", icon: Key },
    { id: "sender-ids", label: "Sender IDs", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your identity, connectivity, and security preferences.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
          
          {/* SIDEBAR TABS */}
          <div className="md:col-span-3 space-y-1">
              {tabs.map((tab) => (
                  <button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 text-xs font-bold uppercase tracking-widest flex items-center gap-3 rounded transition-all ${
                        activeTab === tab.id 
                        ? "bg-pink-50 text-pink-600 shadow-sm ring-1 ring-pink-100" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                      <tab.icon size={14} />
                      {tab.label}
                  </button>
              ))}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="md:col-span-9 space-y-8">
              
              {/* --- GENERAL TAB --- */}
              {activeTab === "general" && (
                  <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <User size={16} className="text-pink-600" /> Node Identity
                      </h3>
                      {loading ? <Loader2 className="animate-spin text-slate-400"/> : (
                          <div className="grid gap-6 max-w-2xl">
                              <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Organization / Name</label>
                                      <input type="text" value={user?.organization || user?.name || ""} readOnly className="w-full bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 font-bold rounded focus:ring-2 focus:ring-pink-500 outline-none" />
                                  </div>
                                  <div>
                                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Registered Email</label>
                                      <input type="text" value={user?.email || ""} readOnly className="w-full bg-slate-50 border border-slate-200 p-3 text-xs text-slate-700 font-mono rounded" />
                                  </div>
                              </div>
                              <div>
                                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Role Permissions</label>
                                  <div className="px-3 py-2 bg-pink-50 text-pink-700 text-xs font-bold inline-block rounded border border-pink-100">
                                      {user?.role || "USER"}
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              )}

              {/* --- API KEYS TAB --- */}
              {activeTab === "api" && (
                  <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <Key size={16} className="text-pink-600" /> API Access
                        </h3>
                        <button className="px-4 py-2 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black rounded transition-colors">
                            Generate New Key
                        </button>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded flex justify-between items-center">
                          <div>
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Live Secret Key</div>
                              <div className="font-mono text-sm text-slate-800">sk_live_****************4x92</div>
                          </div>
                          <button className="p-2 hover:bg-white hover:text-pink-600 rounded border border-transparent hover:border-slate-200 transition-all">
                              <Copy size={16} />
                          </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-4">
                        Use this key to authenticate requests to the Axis API. Do not share this key.
                      </p>
                  </div>
              )}

              {/* --- SENDER IDS TAB --- */}
              {activeTab === "sender-ids" && (
                  <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <Globe size={16} className="text-pink-600" /> Registered Sender IDs
                        </h3>
                        <button className="px-4 py-2 bg-pink-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-pink-700 rounded transition-colors flex items-center gap-2">
                            <Plus size={14} /> Request ID
                        </button>
                      </div>

                      <div className="space-y-3">
                          {loading ? <Loader2 className="animate-spin text-slate-400"/> : senderIds.length === 0 ? (
                             <div className="text-center py-8 text-slate-500 text-xs italic">No Sender IDs registered. Request one above.</div>
                          ) : (
                             senderIds.map((sid) => (
                                <div key={sid.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded hover:border-pink-200 transition-colors">
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">{sid.senderId}</div>
                                        <div className={`text-[9px] font-bold uppercase tracking-widest mt-1 ${
                                            sid.status === 'APPROVED' ? 'text-emerald-600' : 
                                            sid.status === 'REJECTED' ? 'text-red-500' : 'text-amber-500'
                                        }`}>
                                            {sid.status}
                                        </div>
                                    </div>
                                    <button className="text-[10px] text-slate-500 border border-slate-200 bg-white px-3 py-1 hover:text-pink-600 hover:border-pink-200 rounded transition-colors">
                                        Configure
                                    </button>
                                </div>
                             ))
                          )}
                      </div>
                  </div>
              )}

               {/* --- SECURITY TAB --- */}
               {activeTab === "security" && (
                  <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Shield size={16} className="text-pink-600" /> Account Security
                      </h3>
                      <button className="px-4 py-2 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 rounded transition-colors">
                          Change Password
                      </button>
                  </div>
              )}

          </div>
      </div>
    </div>
  );
}
