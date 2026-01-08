"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, Search, Plus, Trash2, Loader2, UserPlus, 
  Database, Filter, FileUp, MoreVertical, CheckCircle,
  ShieldCheck, ArrowUpRight
} from "lucide-react";
import Link from "next/link";

interface Contact {
  id: string;
  name: string;
  phone: string;
  group: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'segments'>('all');
  
  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newGroup, setNewGroup] = useState("General");
  const [submitting, setSubmitting] = useState(false);

  const fetchContacts = async () => {
    try {
        const res = await fetch("/api/contacts");
        const data = await res.json();
        if (data.success) setContacts(data.contacts);
    } catch (e) {
        console.error("Infrastructure Sync Failed");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  // Handshake Normalization: 07... -> 2557...
  const normalizePhone = (num: string) => {
    let clean = num.replace(/\D/g, '');
    if (clean.startsWith('0')) clean = '255' + clean.substring(1);
    return clean;
  };

  const handleAdd = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      const phone = normalizePhone(newPhone);
      
      try {
          const res = await fetch("/api/contacts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: newName, phone, group: newGroup })
          });
          if (res.ok) {
              await fetchContacts();
              setIsAddOpen(false);
              setNewName(""); setNewPhone("");
          }
      } catch (e) {
          alert("Gateway Rejection");
      } finally {
          setSubmitting(false);
      }
  };

  const filteredContacts = contacts.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.phone.includes(searchTerm) ||
      c.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      
      {/* 1. MASTER KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Nodes" value={contacts.length.toLocaleString()} icon={Users} color="text-slate-900" />
        <StatCard label="Active Segments" value="12" icon={Database} color="text-slate-400" />
        <StatCard label="Growth Rate" value="+14%" icon={ArrowUpRight} color="text-emerald-500" />
      </div>

      {/* 2. HEADER & ACTIONS */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">Audience.</h1>
          <p className="text-sm text-slate-400 font-medium">Manage your industrial subscriber database.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Link 
            href="/portal/contacts/import"
            className="flex-1 md:flex-none px-6 py-4 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
          >
            <FileUp size={14} /> Bulk Handshake
          </Link>
          <button 
             onClick={() => setIsAddOpen(true)}
             className="flex-1 md:flex-none px-8 py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            <Plus size={14} /> Create Node
          </button>
        </div>
      </header>

      {/* 3. SEARCH & NAVIGATION */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-8 border-b border-slate-100 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('all')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'all' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-300 hover:text-slate-500'}`}
          >
            Database
          </button>
          <button 
            onClick={() => setActiveTab('segments')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'segments' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-300 hover:text-slate-500'}`}
          >
            Segments
          </button>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
          <input 
            type="text" 
            placeholder="Search Identity..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-[2rem] text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-slate-900/5 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* 4. DATA TABLE */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
            <div className="p-24 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-slate-200" size={32} />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Syncing Audience Metadata...</p>
            </div>
        ) : filteredContacts.length === 0 ? (
            <div className="p-24 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-200 border border-slate-50">
                   <Users size={32} />
                </div>
                <div className="space-y-1">
                  <p className="font-black text-slate-900 uppercase text-xs">No Nodes Found</p>
                  <p className="text-[10px] text-slate-400 font-bold italic">Initialize your first subscriber to begin.</p>
                </div>
            </div>
        ) : (
            <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                    <tr>
                        <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Identity</th>
                        <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Phone Handler</th>
                        <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Segment</th>
                        <th className="p-8 text-[9px] font-black text-slate-400 uppercase tracking-widest italic text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {filteredContacts.map(contact => (
                        <tr key={contact.id} className="hover:bg-slate-50/50 transition-all group">
                            <td className="p-8">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black italic shadow-lg shadow-slate-200">
                                      {contact.name.substring(0,2).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-[13px] font-black text-slate-900 tracking-tight">{contact.name}</p>
                                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Added {new Date(contact.createdAt).toLocaleDateString()}</p>
                                  </div>
                                </div>
                            </td>
                            <td className="p-8 text-xs font-black font-mono text-slate-400 tracking-widest">{contact.phone}</td>
                            <td className="p-8">
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-200">
                                    {contact.group}
                                </span>
                            </td>
                            <td className="p-8 text-right">
                               <button className="p-3 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                                  <Trash2 size={16} />
                               </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>

      {/* 5. ADD MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
            <div className="bg-white rounded-[3rem] shadow-2xl p-12 w-full max-w-sm space-y-10 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 italic tracking-tighter">New Node.</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initialize Single Entry</p>
                </div>
                
                <form onSubmit={handleAdd} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Name</label>
                        <input required value={newName} onChange={e => setNewName(e.target.value)}
                           className="w-full p-5 bg-slate-50 border-none rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-slate-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Phone (TZ)</label>
                        <input required value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="07XX..."
                           className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-black text-slate-900 outline-none focus:ring-1 focus:ring-slate-900 font-mono" />
                    </div>
                    <button disabled={submitting} className="w-full py-6 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all">
                        {submitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Finalize Handshake"}
                    </button>
                    <button type="button" onClick={() => setIsAddOpen(false)} className="w-full text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors">Abort</button>
                </form>
            </div>
        </div>
      )}
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
      <div className={`p-4 bg-slate-50 rounded-2xl ${color} transition-all group-hover:bg-slate-900 group-hover:text-white`}>
        <Icon size={20} />
      </div>
    </div>
  );
}
