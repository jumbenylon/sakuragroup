"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 🟢 State for toggle
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setLoading(false);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex p-3 bg-pink-50 rounded-xl mb-4 text-pink-600">
           <Lock size={24} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Axis Gateway</h1>
        <p className="text-sm text-slate-500 mt-2">Enter your Sovereign credentials.</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs font-bold rounded flex items-center gap-2 justify-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Identity</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-300" size={16} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="admin@sakuragroup.co.tz"
              required
            />
          </div>
        </div>
        
        <div>
           <div className="flex justify-between items-center mb-1">
             <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key</label>
             {/* 🟢 Forgot Password Link */}
             <Link href="/axis/forgot-password" className="text-[10px] font-bold text-pink-600 hover:text-pink-700">
               Forgot Password?
             </Link>
           </div>
           <div className="relative">
             <Lock className="absolute left-4 top-3.5 text-slate-300" size={16} />
             <input 
               type={showPassword ? "text" : "password"} // 🟢 Toggle Type
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full pl-11 pr-10 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
               placeholder="••••••••"
               required
             />
             {/* 🟢 Toggle Button */}
             <button
               type="button"
               onClick={() => setShowPassword(!showPassword)}
               className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
             >
               {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
             </button>
           </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 size={16} className="animate-spin"/> : <>Access Portal <ArrowRight size={16} /></>}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
