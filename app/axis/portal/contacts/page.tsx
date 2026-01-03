"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Plus, Upload, Filter, MoreHorizontal, Download, Loader2 } from "lucide-react";

// Types for Real Data
interface Contact {
  id: string;
  name: string;
  phone: string;
  groups: string[];
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // [INTEGRATION] Fetch Real Contacts
  // You need to create: app/api/contacts/route.ts
  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("/api/contacts?limit=50");
        if (res.ok) {
          const data = await res.json();
          setContacts(data.contacts || []); 
        } else {
          // Fallback for demo if API isn't ready
          setContacts([]);
        }
      } catch (error) {
        console.error("Contacts Sync Failed", error);
      } finally {
        setLoading(false);
      }
    }
    fetchContacts();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
         <div>
            <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Audience Manager</h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              Manage your verified recipients and segments.
            </p>
         </div>
         <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-600 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-colors rounded-sm shadow-sm">
                 <Upload size={14} /> Import CSV
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-pink-700 transition-colors rounded-sm shadow-md shadow-pink-200">
                 <Plus size={14} /> New Contact
             </button>
         </div>
      </div>

      {/* Stats Cards (Light Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Contacts", val: loading ? "..." : contacts.length.toLocaleString(), color: "text-slate-800" },
            { label: "Active Groups", val: "3", color: "text-slate-800" },
            { label: "Opt-Outs", val: "0", color: "text-slate-400" },
            { label: "Growth (30d)", val: "+0%", color: "text-emerald-600" }
          ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm hover:border-pink-200 transition-colors">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">{stat.label}</div>
                  <div className={`text-2xl font-mono font-bold ${stat.color}`}>{stat.val}</div>
              </div>
          ))}
      </div>

      {/* Table Shell (Light Mode) */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
         <div className="p-4 border-b border-slate-100 flex gap-4 bg-slate-50/50">
             <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                 <input 
                    type="text" 
                    placeholder="Search name or phone..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-sm transition-all placeholder:text-slate-400" 
                 />
             </div>
             <div className="flex gap-2 ml-auto">
               <button className="px-3 py-2 border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-300 rounded-sm transition-colors">
                 <Filter size={14} />
               </button>
               <button className="px-3 py-2 border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-300 rounded-sm transition-colors">
                 <Download size={14} />
               </button>
             </div>
         </div>
         
         <div className="overflow-x-auto">
           <table className="w-full text-left text-xs">
               <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest border-b border-slate-200">
                   <tr>
                       <th className="p-4 w-1/4">Name</th>
                       <th className="p-4 w-1/4">Phone</th>
                       <th className="p-4 w-1/4">Groups</th>
                       <th className="p-4 w-1/4">Date Added</th>
                       <th className="p-4 text-right">Action</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-slate-600">
                   {loading ? (
                     <tr>
                       <td colSpan={5} className="p-8 text-center text-slate-400 flex justify-center items-center gap-2">
                         <Loader2 size={16} className="animate-spin"/> Loading Directory...
                       </td>
                     </tr>
                   ) : contacts.length === 0 ? (
                     <tr>
                       <td colSpan={5} className="p-12 text-center">
                         <div className="flex flex-col items-center gap-3">
                           <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                             <Users size={24} />
                           </div>
                           <div className="text-slate-500 font-medium">No contacts found</div>
                           <button className="text-pink-600 hover:underline font-bold">Add your first contact</button>
                         </div>
                       </td>
                     </tr>
                   ) : (
                     contacts.map((contact, i) => (
                       <tr key={i} className="hover:bg-slate-50 transition-colors group">
                           <td className="p-4 font-bold text-slate-800">{contact.name}</td>
                           <td className="p-4 font-mono text-slate-600">{contact.phone}</td>
                           <td className="p-4">
                             <span className="px-2 py-1 bg-pink-50 text-pink-600 border border-pink-100 rounded text-[9px] font-bold uppercase">
                               General
                             </span>
                           </td>
                           <td className="p-4 text-slate-400">{new Date(contact.createdAt).toLocaleDateString()}</td>
                           <td className="p-4 text-right">
                             <button className="text-slate-400 hover:text-pink-600 transition-colors">
                               <MoreHorizontal size={16} />
                             </button>
                           </td>
                       </tr>
                     ))
                   )}
               </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
