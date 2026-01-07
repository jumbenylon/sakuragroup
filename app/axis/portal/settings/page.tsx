"use client";

import React, { useState, useEffect } from "react";
import { User, Globe, Shield, Key, Copy, Plus, Loader2, Save, Trash2 } from "lucide-react";
import OffloadRequestModal from "@/components/offload/OffloadRequestModal";

interface UserProfile {
  name: string;
  organization: string | null;
  email: string;
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
    
    // API Route: src/app/api/user/profile/route.ts
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      body: JSON.stringify(user),
    });

    if (res.ok) {
      alert("Profile updated successfully");
    }
    setIsSaving(false);
  };

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "api", label: "API Keys", icon: Key },
    { id: "sender-ids", label: "Sender IDs", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto p-4">
      <div className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">System Settings</h1>
          <p className="text-xs text-slate-500 mt-1">Manage your identity and node lifecycle.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
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

          <div className="md:col-span-9 space-y-8">
              {activeTab === "general" && (
                  <form onSubmit={handleProfileUpdate} className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <User size={16} className="text-pink-600" /> Node Identity
                        </h3>
                        <button 
                          type="submit" 
                          disabled={isSaving}
                          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-slate-800 transition-all"
                        >
                          {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                          Save Changes
                        </button>
                      </div>

                      {loading ? <Loader2 className="animate-spin text-slate-400"/> : (
                          <div className="grid gap-6 max-w-2xl">
                              <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name / Admin</label>
                                      <input 
                                        type="text" 
                                        value={user?.name || ""} 
                                        onChange={(e) => setUser(prev => prev ? {...prev, name: e.target.value} : null)}
                                        className="w-full bg-white border border-slate-200 p-3 text-xs text-slate-700 font-bold rounded focus:ring-2 focus:ring-pink-500 outline-none" 
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Organization</label>
                                      <input 
                                        type="text" 
                                        value={user?.organization || ""} 
                                        onChange={(e) => setUser(prev => prev ? {...prev, organization: e.target.value} : null)}
                                        className="w-full bg-white border border-slate-200 p-3 text-xs text-slate-700 font-bold rounded focus:ring-2 focus:ring-pink-500 outline-none" 
                                      />
                                  </div>
                              </div>
                              <p className="text-[10px] text-slate-400 italic font-medium">Note: Email changes require infrastructure re-validation.</p>
                          </div>
                      )}
                  </form>
              )}

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

                    {/* DANGER ZONE - The Robot is looking for this */}
                    <div className="bg-red-50/30 border border-red-100 p-8 rounded-lg">
                        <h3 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Trash2 size={16} /> Danger Zone
                        </h3>
                        <p className="text-[11px] text-red-600 mb-6">Requesting infrastructure offloading will deactivate all API keys and Sender IDs pending approval.</p>
                        <button 
                          onClick={() => setIsOffloadOpen(true)}
                          className="px-4 py-2 bg-white border border-red-200 text-red-600 text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white rounded transition-all"
                        >
                            Request Node Offloading
                        </button>
                    </div>
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
