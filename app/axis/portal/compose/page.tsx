"use client";

import React, { useEffect, useState } from "react";
import { QuickSendWidget } from "@/components/axis/quick-send";
import { Activity, Database, Server, ArrowUpRight, Zap, RefreshCw } from "lucide-react";
import Link from "next/link";

// Types for Real Data
interface DashboardStats {
  throughput: number;
  successRate: number;
  totalMessages: number;
  recentLogs: Array<{
    id: string;
    recipient: string;
    status: string;
    createdAt: string;
    cost: number;
  }>;
}

export default function AxisPortalPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // [INTEGRATION] Fetch Real System Pulse
  async function fetchStats() {
    try {
      // We reuse the analytics endpoint logic, but for the specific user
      // Note: You might need to create a user-specific '/api/user/stats' if admin analytics are too broad
      // For now, we simulate the fetch or hit a user-logs endpoint
      const res = await fetch("/api/sms/history?limit=5"); 
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error("Dashboard Sync Failed", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-200 pb-6 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">System Overview</h1>
           <p className="text-slate-400 text-xs font-mono mt-1 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
             NODE: DAR-ES-SALAAM-01 • STATUS: OPTIMAL
           </p>
        </div>
        <div className="flex gap-4">
            <Link href="/axis/portal/compose" className="px-5 py-2.5 bg-pink-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200 rounded-sm">
                New Campaign
            </Link>
            <Link href="/axis/portal/billing" className="px-5 py-2.5 border border-slate-300 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors rounded-sm">
                Add Credits
            </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
         
         {/* LEFT COLUMN: CONSOLE (8 Cols) */}
         <div className="lg:col-span-8 space-y-8">
             {/* WIDGET WRAPPER (Light Mode) */}
             <div className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
                 <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <Zap size={12} className="text-amber-500"/> Direct Dispatch Protocol
                    </span>
                    <div className="flex gap-2 items-center">
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">GSM GATEWAY ACTIVE</span>
                    </div>
                 </div>
                 <div className="p-0">
                    {/* Ensure QuickSendWidget handles light mode internally too */}
                    <QuickSendWidget /> 
                 </div>
             </div>

             {/* METRIC PLATES */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { l: "Success Rate", v: "99.8%", i: Activity, color: "text-emerald-500" },
                    { l: "Throughput", v: "High", i: Server, color: "text-blue-500" },
                    { l: "Total Sent", v: loading ? "..." : stats?.totalMessages ?? 0, i: Database, color: "text-purple-500" },
                ].map((m, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-6 flex items-start justify-between group hover:border-pink-200 hover:shadow-md transition-all rounded-lg">
                        <div>
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2">{m.l}</span>
                            <span className="text-2xl font-mono text-slate-800 font-bold">{m.v}</span>
                        </div>
                        <div className={`p-2 rounded-full bg-slate-50 group-hover:bg-white transition-colors`}>
                           <m.i className={`${m.color}`} size={20} />
                        </div>
                    </div>
                ))}
             </div>
         </div>

         {/* RIGHT COLUMN: LOGS (4 Cols) */}
         <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200 h-full flex flex-col shadow-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Traffic Logs</h3>
                    <button onClick={fetchStats} className="text-slate-400 hover:text-pink-600 transition-colors">
                      <RefreshCw size={12} className={loading ? "animate-spin" : ""}/>
                    </button>
                </div>
                
                <div className="flex-1 p-0 font-mono text-xs overflow-y-auto max-h-[500px]">
                    {loading ? (
                      <div className="p-6 text-center text-slate-400 italic">Syncing with Node...</div>
                    ) : (stats?.recentLogs && stats.recentLogs.length > 0) ? (
                      stats.recentLogs.map((log, i) => (
                        <div key={i} className="flex flex-col gap-1 px-6 py-3 border-b border-slate-50 hover:bg-pink-50/30 transition-colors">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400 text-[10px]">{new Date(log.createdAt).toLocaleTimeString()}</span>
                              <span className={`text-[10px] font-bold ${log.status === 'SENT' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {log.status}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-700 truncate font-bold">To: {log.recipient}</span>
                              <span className="text-slate-400 text-[10px]">-{log.cost} TZS</span>
                            </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-slate-400">No traffic recorded yet.</div>
                    )}
                </div>

                <div className="p-4 border-t border-slate-100">
                    <Link href="/axis/portal/campaigns" className="w-full py-3 border border-slate-200 text-slate-500 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 text-[10px] font-bold uppercase tracking-widest transition-all rounded flex items-center justify-center gap-2">
                        Full System Audit <ArrowUpRight size={12} />
                    </Link>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
}
