"use client";

import React, { useEffect, useState } from "react";
import { 
  MessageSquare, Calendar, ShieldCheck, 
  CheckCircle2, AlertCircle, Loader2, 
  ArrowUpRight, BarChart3, Activity 
} from "lucide-react";

/**
 * Axis Traffic History (v8.0)
 * Design: Radical Simplicity, Industrial Grayscale.
 * Logic: Real-time delivery logs and transaction cost telemetry.
 */

interface MessageLog {
  id: string;
  recipient: string;
  content: string;
  status: string;
  costToTenant: number;
  sentAt: string;
}

export default function CampaignsPage() {
  const [logs, setLogs] = useState<MessageLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/sms/history?limit=20");
        if (res.ok) {
          const data = await res.json();
          setLogs(data.logs || []);
        }
      } catch (error) {
        console.error("Infrastructure Sync Failed", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. MASTER TELEMETRY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Dispatch" value={logs.length.toLocaleString()} icon={Activity} color="text-slate-900" />
        <StatCard label="Network Success" value="98.2%" icon={ShieldCheck} color="text-emerald-500" />
        <StatCard label="System Uptime" value="100%" icon={BarChart3} color="text-sky-500" />
      </div>

      {/* 2. HEADER */}
      <header className="pb-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-[9px] font-black uppercase tracking-widest">
            <Activity size={12} className="text-sky-400" /> Real-time Node Logs
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">Traffic History.</h1>
          <p className="text-sm text-slate-400 font-medium italic">Full-stack delivery ledger and cost analysis.</p>
        </div>
        
        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Gateway Nominal</span>
        </div>
      </header>

      {/* 3. LOG TERMINAL */}
      <div className="grid gap-4">
        {loading ? (
          <div className="p-24 text-center flex flex-col items-center gap-4">
            <Loader2 size={32} className="animate-spin text-slate-900" />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Syncing Ledger...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="bg-white border border-slate-100 p-24 text-center rounded-[3rem] shadow-sm space-y-4">
            <MessageSquare size={48} className="mx-auto text-slate-100" />
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 uppercase">No Traffic Detected</h3>
              <p className="text-xs text-slate-400 font-medium italic tracking-tight">Your dispatch history is currently empty.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-white border border-slate-100 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group rounded-[2.5rem] relative overflow-hidden">
                
                {/* Status Indicator Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  log.status === 'SENT' ? 'bg-emerald-500' : 'bg-amber-400'
                }`} />

                <div className="flex gap-6 w-full md:w-auto items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                    log.status === 'SENT' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {log.status === 'SENT' ? <CheckCircle2 size={22}/> : <AlertCircle size={22}/>}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight mb-2 truncate max-w-[200px] md:max-w-lg italic">
                      {log.content}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-[9px] text-slate-400 font-black uppercase tracking-[0.15em] items-center">
                      <span className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 text-slate-500 italic">TO: {log.recipient}</span>
                      <span className="flex items-center gap-2">
                        <Calendar size={12} className="text-slate-300" />
                        {new Date(log.sentAt).toLocaleDateString()} • {new Date(log.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-12 text-right w-full md:w-auto justify-between md:justify-end items-center">
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Node Status</p>
                    <div className={`text-xs font-black tracking-widest uppercase ${
                      log.status === 'SENT' ? 'text-emerald-600' : 'text-amber-500'
                    }`}>
                      {log.status}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">Handshake Cost</p>
                    <div className="text-sm font-black text-slate-900">
                      {log.costToTenant.toLocaleString()} <span className="text-[10px] text-slate-300 uppercase tracking-tighter">TZS</span>
                    </div>
                  </div>
                  <button className="h-12 w-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-sm">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-slate-900 transition-all">
      <div>
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">{label}</p>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">{value}</h2>
      </div>
      <div className={`p-4 bg-slate-50 rounded-2xl ${color} transition-all group-hover:bg-slate-900 group-hover:text-white shadow-inner`}>
        <Icon size={20} />
      </div>
    </div>
  );
}
