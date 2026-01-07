"use client";

import React, { useState, useEffect } from "react";
import { User, Globe, Shield, Key, Copy, Plus, Loader2, Save, Trash2, Phone } from "lucide-react";
import OffloadRequestModal from "@/components/offload/OffloadRequestModal";

interface UserProfile {
  name: string;
  organization: string | null;
  email: string;
  phoneNumber: string | null;
  role: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isOffloadOpen, setIsOffloadOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await fetch("/api/auth/check-user");
        if (userRes.ok) {
          const data = await userRes.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Settings Sync Failed", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        // Subtle micro-interaction: update the local state to trigger UI changes
        const result = await res.json();
        alert("Node identity successfully updated.");
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "api", label: "API Keys", icon: Key },
    { id: "sender-ids", label: "Sender IDs", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto p-4">
      {/* HEADER SECTION */}
      <div className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your identity and node lifecycle infrastructure.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
          {/* TAB NAVIGATION */}
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

          {/* CONTENT AREA */}
          <div className="md:col-span-9 space-y-8">
              
              {/* --- GENERAL IDENTITY TAB --- */}
              {activeTab === "general" && (
                  <form onSubmit={handleProfileUpdate} className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <User size={16} className="text-pink-600" /> Node Identity
                        </h3>
                        <button 
                          type="submit" 
                          disabled={isSaving}
                          className="flex items-center gap-2 px-6 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-slate-800 transition-all disabled:bg-slate-400"
                        >
                          {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                          Save Changes
                        </button>
                      </div>

                      {loading ? (
                        <div className="flex items-center gap-2 text-slate-400 text-xs italic"><Loader2 className="animate-spin" size={14}/> Syncing with infrastructure...</div>
                      ) : (
                          <div className="grid gap-6 max-w-2xl">
                              <div className="grid md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                      <label htmlFor="fullName" className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name / Admin</label>
                                      <input 
                                        id="fullName" 
                                        type="text" 
                                        value={user?.name || ""} 
                                        onChange={(e) => setUser(prev => prev ? {...prev, name: e.target.value} : null)}
                                        className="w-full bg-white border border-slate-200 p-3 text-xs text-slate-700 font-bold rounded focus:ring-2 focus:ring-pink-500 outline-none transition-all" 
                                        placeholder="e.g. Jumbenylon Admin"
                                      />
                                  </div>
                                  <div className="space-y-2">
                                      <label htmlFor="organization" className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Organization</label>
                                      <input 
                                        id="organization" 
                                        type="text" 
                                        value={user?.organization || ""} 
                                        onChange={(e) => setUser(prev => prev ? {...prev, organization: e.target.value} : null)}
                                        className="w-full bg-white border border-slate-200 p-3 text-xs text-slate-700 font-bold rounded focus:ring-2 focus:ring-pink-500 outline-none transition-all" 
                                        placeholder="Sakura Group Ltd"
                                      />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label htmlFor="phoneNumber" className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact Number</label>
                                  <div className="relative">
                                    <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                      id="phoneNumber" 
                                      type="tel" 
                                      value={user?.phoneNumber || ""} 
                                      onChange={(e) => setUser(prev => prev ? {...prev, phoneNumber: e.target.value} : null)}
                                      className="w-full bg-white border border-slate-200 pl-8 pr-3 py-3 text-xs text-slate-700 font-bold rounded focus:ring-2 focus:ring-pink-500 outline-none transition-all" 
                                      placeholder="+255 --- --- ---"
                                    />
                                  </div>
                              </div>
                              <p className="text-[10px] text-slate-400 italic">Sensitive fields like Email are locked and require re-validation for security.</p>
                          </div>
                      )}
                  </form>
              )}

               {/* --- SECURITY & OFFLOADING TAB --- */}
               {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Shield size={16} className="text-pink-600" /> Account Security
                        </h3>
                        <button className="px-4 py-2 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 rounded transition-colors">
                            Change Password
                        </button>
                    </div>

                    {/* DANGER ZONE: Targeted by Playwright robot */}
                    <div className="bg-red-50/40 border border-red-100 p-8 rounded-lg">
                        <h3 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Trash2 size={16} /> Danger Zone
                        </h3>
                        <p className="text-[11px] text-red-600 mb-6">Requesting infrastructure offloading will deactivate all associated API keys and Sender IDs pending administrator approval.</p>
                        <button 
                          type="button"
                          onClick={() => setIsOffloadOpen(true)}
                          className="px-6 py-2 bg-white border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white rounded transition-all shadow-sm"
                        >
                            Request Node Offloading
                        </button>
                    </div>
                  </div>
              )}

              {/* API and Sender ID tabs remain placeholder for functional purity */}
              {(activeTab === "api" || activeTab === "sender-ids") && (
                <div className="bg-slate-50 border border-dashed border-slate-200 p-20 text-center rounded-lg">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">This module is under infrastructure maintenance.</p>
                </div>
              )}
          </div>
      </div>

      <OffloadRequestModal 
        isOpen={isOffloadOpen} 
        onClose={() => setIsOffloadOpen(false)} 
      />
    </div>
  );
}
