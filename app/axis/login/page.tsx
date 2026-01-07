"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

// 1. Rename your existing main component to "LoginForm"
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // <--- This is the line causing the error
  const error = searchParams.get("error");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/axis/portal");
    } else {
      setLoading(false);
      // Optional: Handle error state here
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-pink-50 rounded-xl mb-4 text-pink-600">
           <Lock size={24} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Axis Gateway</h1>
        <p className="text-sm text-slate-500 mt-2">Authorized Personnel Only</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs font-bold rounded flex items-center gap-2">
          <AlertCircle size={14} />
          {error === "CredentialsSignin" ? "Invalid email or password" : "Authentication failed"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Identity</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="admin@sakuragroup.co.tz"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Passcode</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={16} className="animate-spin"/> : "Authenticate"}
        </button>
      </form>

      <div className="mt-8 text-center">
         <p className="text-[10px] text-slate-400">
            Protected by Sakura Sovereign Identity. <br/>
            Unauthorized access is prohibited.
         </p>
      </div>
    </div>
  );
}

// 2. Create the default export that WRAPS the form in Suspense
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* 3. The Suspense Boundary */}
      <Suspense fallback={
        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
          <Loader2 className="animate-spin" size={16} /> Loading Gateway...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
