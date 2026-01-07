"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Plus, Trash2, Loader2, UserPlus, Phone, Tag } from "lucide-react";

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
  
  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newGroup, setNewGroup] = useState("General");
  const [submitting, setSubmitting] = useState(false);

  // 1. Fetch Contacts
  const fetchContacts = async () => {
    try {
        const res = await fetch("/api/contacts");
        const data = await res.json();
        if (data.success) setContacts(data.contacts);
    } catch (e) {
        console.error("Failed to load contacts");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 2. Add Contact
  const handleAdd = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
          const res = await fetch("/api/contacts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: newName, phone: newPhone, group: newGroup })
          });
          if (res.ok) {
              await fetchContacts(); // Refresh list
              setIsAddOpen(false);
              setNewName(""); setNewPhone("");
          }
      } catch (e) {
          alert("Failed to add contact");
      } finally {
          setSubmitting(false);
      }
  };

  // 3. Delete Contact
  const handleDelete = async (id: string) => {
      if(!confirm("Are you sure you want to delete this contact?")) return;
      try {
          await fetch("/api/contacts", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id })
          });
          setContacts(contacts.filter(c => c.id !== id));
      } catch (e) {
          alert("Delete failed");
      }
  };

  // Filter Logic
  const filteredContacts = contacts.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.phone.includes(searchTerm) ||
      c.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Audience Manager</h1>
          <p className="text-slate-500 text-sm">Manage your subscriber database and segments.</p>
        </div>
        <button 
           onClick={() => setIsAddOpen(true)}
           className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex items-center gap-2 transition-all"
        >
           <Plus size={16} /> Add Contact
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, phone, or group..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent font-bold text-slate-700 outline-none placeholder:font-normal"
          />
      </div>

      {/* CONTACTS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
             <div className="p-12 flex justify-center text-slate-400 font-bold text-xs gap-2">
                 <Loader2 className="animate-spin" size={16} /> Loading Database...
             </div>
          ) : filteredContacts.length === 0 ? (
             <div className="p-12 text-center text-slate-400">
                 <Users size={48} className="mx-auto mb-4 opacity-20" />
                 <p className="font-bold text-sm">No contacts found.</p>
                 <p className="text-xs mt-1">Add your first subscriber to get started.</p>
             </div>
          ) : (
             <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-200">
                     <tr>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</th>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Group</th>
                         <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                     {filteredContacts.map(contact => (
                         <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                             <td className="p-4 text-sm font-bold text-slate-700 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
                                    {contact.name.substring(0,1).toUpperCase()}
                                </div>
                                {contact.name}
                             </td>
                             <td className="p-4 text-sm font-mono text-slate-500">{contact.phone}</td>
                             <td className="p-4">
                                <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase tracking-wide">
                                    {contact.group}
                                </span>
                             </td>
                             <td className="p-4 text-right">
                                <button 
                                  onClick={() => handleDelete(contact.id)}
                                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
          )}
      </div>

      {/* ADD CONTACT MODAL */}
      {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-in fade-in zoom-in duration-300">
                  <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                      <UserPlus className="text-pink-600" /> New Subscriber
                  </h2>
                  <form onSubmit={handleAdd} className="space-y-4">
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                          <input 
                             required
                             value={newName}
                             onChange={e => setNewName(e.target.value)}
                             className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 outline-none focus:ring-2 focus:ring-pink-500 mt-1"
                          />
                      </div>
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number (255...)</label>
                          <input 
                             required
                             value={newPhone}
                             onChange={e => setNewPhone(e.target.value)}
                             placeholder="2557..."
                             className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm text-slate-800 outline-none focus:ring-2 focus:ring-pink-500 mt-1"
                          />
                      </div>
                      <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Group Tag</label>
                          <select 
                             value={newGroup}
                             onChange={e => setNewGroup(e.target.value)}
                             className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 outline-none mt-1"
                          >
                             <option value="General">General</option>
                             <option value="VIP">VIP</option>
                             <option value="Staff">Staff</option>
                          </select>
                      </div>

                      <div className="pt-4 flex gap-3">
                          <button 
                            type="button" 
                            onClick={() => setIsAddOpen(false)}
                            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-lg"
                          >
                             Cancel
                          </button>
                          <button 
                            type="submit" 
                            disabled={submitting}
                            className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex justify-center items-center gap-2"
                          >
                             {submitting ? <Loader2 className="animate-spin" size={16}/> : "Save Contact"}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

    </div>
  );
}
