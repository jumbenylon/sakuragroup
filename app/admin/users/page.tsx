"use client";

import React, { useState, useEffect } from "react";
import { UserProvisioningRow } from "@/components/admin/UserProvisioningRow";
import { GlobalNavbar } from "@/components/global-navbar";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users"); // You'll need an API to list users
      const data = await res.json();
      setUsers(data.users);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // 2. Handle the Provisioning Update
  const handleUpdate = async (userId: string, tier: string, topUpAmount: number) => {
    const res = await fetch("/api/admin/users/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        tier,
        topUpAmount,
        adminId: "admin@sakuragroup.co.tz" // Currently hardcoded to your master admin
      }),
    });

    if (res.ok) {
      alert("Provisioning Successful");
      window.location.reload(); // Refresh to see new balance
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] pt-32 px-8">
      <GlobalNavbar />
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            Client Provisioning
          </h1>
          <p className="text-slate-500 text-sm font-light mt-2">
            Manage pricing tiers and credit allocation for Axis SMEs.
          </p>
        </header>

        <div className="bg-white/[0.02] border border-white/5 rounded-sm">
          {loading ? (
            <p className="p-10 text-[10px] uppercase tracking-widest text-slate-500">Loading Clients...</p>
          ) : (
            users.map((user: any) => (
              <UserProvisioningRow 
                key={user.id} 
                user={user} 
                onUpdate={handleUpdate} 
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
