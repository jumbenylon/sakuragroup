"use client";

import React, { useState, useEffect } from "react";
import { UserProvisioningRow } from "@/components/admin/UserProvisioningRow";

export default function AdminProvisioningPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdate = async (userId: string, tier: string, topUpAmount: number) => {
    try {
      const res = await fetch("/api/admin/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          tier,
          topUpAmount,
          adminId: "admin@sakuragroup.co.tz"
        }),
      });

      if (res.ok) {
        alert("Success: User tier and balance updated.");
        fetchUsers(); // Refresh list
      }
    } catch (e) { alert("Error updating user."); }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-pink-500 antialiased pt-32 px-8">
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Client Provisioning</h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] mt-4 font-bold">Sakura Axis Command Center</p>
        </header>

        <div className="bg-white/[0.02] border border-white/5 rounded-sm overflow-hidden">
          {loading ? (
            <div className="p-20 text-center animate-pulse text-[10px] uppercase tracking-[0.5em] text-slate-600">Syncing Client Data...</div>
          ) : users.length === 0 ? (
            <div className="p-20 text-center text-slate-600 text-[10px] uppercase tracking-widest">No clients found in system.</div>
          ) : (
            users.map((u: any) => (
              <UserProvisioningRow key={u.id} user={u} onUpdate={handleUpdate} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
