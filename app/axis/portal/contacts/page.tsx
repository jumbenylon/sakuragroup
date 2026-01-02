"use client";

import React from "react";
import { Users, Search, Plus, Upload, Filter, MoreHorizontal } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
         <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Audience</h1>
            <p className="text-xs text-slate-500 mt-1">Manage contact groups and segments.</p>
         </div>
         <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:border-white/30 transition-colors">
                 <Upload size={14} /> Import
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
                 <Plus size={14} /> New Contact
             </button>
         </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Total Contacts", "Active Groups", "Opt-Outs", "Growth (30d)"].map((label, i) => (
              <div key={i} className="bg-[#050505] border border-white/10 p-6">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">{label}</div>
                  <div className="text-2xl font-mono text-white font-bold">{[12405, 8, 142, "+12%"][i]}</div>
              </div>
          ))}
      </div>

      {/* Table Shell */}
      <div className="bg-[#050505] border border-white/10">
         <div className="p-4 border-b border-white/10 flex gap-4">
             <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                 <input type="text" placeholder="Search contacts..." className="w-full bg-[#0a0a0a] border border-white/10 pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-pink-500 transition-colors" />
             </div>
             <button className="px-3 border border-white/10 text-slate-400 hover:text-white"><Filter size={14} /></button>
         </div>
         
         <table className="w-full text-left text-xs">
             <thead className="bg-[#0a0a0a] text-slate-500 font-bold uppercase tracking-widest">
                 <tr>
                     <th className="p-4">Name</th>
                     <th className="p-4">Phone</th>
                     <th className="p-4">Groups</th>
                     <th className="p-4">Date Added</th>
                     <th className="p-4 text-right">Action</th>
                 </tr>
             </thead>
             <tbody className="divide-y divide-white/5 text-slate-300">
                 {[1,2,3,4,5].map((i) => (
                     <tr key={i} className="hover:bg-white/[0.02]">
                         <td className="p-4 font-bold text-white">John Doe {i}</td>
                         <td className="p-4 font-mono">+255 754 000 00{i}</td>
                         <td className="p-4"><span className="px-2 py-1 bg-pink-500/10 text-pink-500 rounded text-[9px] font-bold uppercase">VIP</span></td>
                         <td className="p-4 text-slate-500">Oct 2{i}, 2024</td>
                         <td className="p-4 text-right"><MoreHorizontal size={14} className="ml-auto cursor-pointer hover:text-white" /></td>
                     </tr>
                 ))}
             </tbody>
         </table>
      </div>
    </div>
  );
}
