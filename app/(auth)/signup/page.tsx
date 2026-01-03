"use client";

import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", org: "" });

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form)
    });
    if (res.ok) window.location.href = "/axis/login";
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-12 space-y-8">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Join Axis</h1>
        <div className="space-y-4">
          <input placeholder="ORGANIZATION NAME" onChange={e => setForm({...form, org: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs" />
          <input placeholder="EMAIL" onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs" />
          <input type="password" placeholder="PASSWORD" onChange={e => setForm({...form, password: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs" />
          <button onClick={handleSignup} className="w-full py-5 bg-pink-600 text-white font-black text-[10px] uppercase tracking-widest">Create Account</button>
        </div>
      </div>
    </main>
  );
}
