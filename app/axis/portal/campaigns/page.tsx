"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, Calendar, BarChart3, AlertCircle, CheckCircle2, XCircle, Loader2, ArrowUpRight } from "lucide-react";

// Real Data Type matching your Prisma Schema
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

  // [INTEGRATION] Fetch Real Traffic History
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/sms/history?limit=20");
        if (res.ok) {
          const data = await res.json();
          setLogs(data.logs || []);
        }
      } catch (error) {
        console.error("History Sync Failed", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="pb-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
             <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Traffic History</h1>
             <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
               Real-time delivery logs and transaction costs.
             </p>
         </div>
         <div className="flex gap-3">
             <div className="px-4 py-2 bg-slate-100 rounded text-xs font-bold text-slate-600 border border-slate-200 uppercase tracking-widest">
                Total Logs: {loading ? "..." : logs.length}
             </div>
         </div>
      </div>

      {/* CONTENT GRID */}
      <div className="grid gap-4">
          {loading ? (
             <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-3">
                <Loader2 size={32} className="animate-spin text-pink-500" />
                <span className="text-xs font-mono uppercase">Syncing Ledger...</span>
             </div>
          ) : logs.length === 0 ? (
             <div className="bg-white border border-slate-200 p-12 text-center rounded-lg shadow-sm">
                <MessageSquare size={48} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-slate-800 font-bold">No Traffic Recorded</h3>
                <p className="text-slate-500 text-sm mt-2">Your dispatch history is empty.</p>
             </div>
          ) : (
             logs.map((log) => (
               <div key={log.id} className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-pink-300 hover:shadow-md transition-all group rounded-lg">
                   
                   {/* Left: Message Info */}
                   <div className="flex gap-4 w-full md:w-auto">
                       <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                         log.status === 'SENT' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                       }`}>
                           {log.status === 'SENT' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
                       </div>
                       <div className="min-w-0">
                           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1 truncate max-w-[200px] md:max-w-md">
                             {log.content}
                           </h3>
                           <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-mono items-center">
                               <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">TO: {log.recipient}</span>
                               <span className="flex items-center gap-1">
                                 <Calendar size={10} />
                                 {new Date(log.sentAt).toLocaleString()}
                               </span>
                           </div>
                       </div>
                   </div>
                   
                   {/* Right: Metrics */}
                   <div className="flex gap-8 text-right w-full md:w-auto justify-between md:justify-end items-center">
                       <div>
                           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</div>
                           <div className={`text-sm font-mono font-bold ${
                             log.status === 'SENT' ? 'text-emerald-600' : 'text-amber-500'
                           }`}>
                             {log.status}
                           </div>
                       </div>
                       <div>
                           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Cost</div>
                           <div className="text-sm font-mono text-slate-800 font-bold">
                             {log.costToTenant.toLocaleString()} <span className="text-[10px] text-slate-400">TZS</span>
                           </div>
                       </div>
                       <button className="h-8 w-8 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-colors">
                           <ArrowUpRight size={14} />
                       </button>
                   </div>
               </div>
             ))
          )}
      </div>
    </div>
  );
}
