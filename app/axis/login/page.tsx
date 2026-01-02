"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Lock, ChevronRight, AlertTriangle } from "lucide-react";

export default function AxisLoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        router.push("/axis/portal");
      } else {
        setError("ACCESS DENIED: INVALID CREDENTIALS");
      }
    } catch (err) {
      setError("SYSTEM ERROR: HANDSHAKE FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white font-mono flex flex-col items-center justify-center p-6 selection:bg-pink-600/30">
      
      {/* SECURITY HEADER */}
      <div className="w-full max-w-md mb-8 flex items-center justify-between text-[10px] text-slate-600 uppercase tracking-widest">
         <span>Secure Gateway v2.4</span>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
            <span>UNAUTHORIZED ACCESS PROHIBITED</span>
         </div>
      </div>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-[#050505] border border-white/10 p-8 shadow-2xl relative overflow-hidden group">
        
        {/* SCANNER LINE ANIMATION */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-600 to-transparent opacity-50 animate-scan" />

        <div className="flex justify-center mb-8">
             <div className="relative w-32 h-16">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
                    alt="Axis" 
                    fill
                    className="object-contain"
                />
             </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Lock size={10} /> Enter Access Code
                </label>
                <input 
                    type="password" 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0a0a0a] border border-white/10 focus:border-pink-600 p-4 text-center text-xl tracking-[0.5em] text-white outline-none transition-colors placeholder:text-slate-800"
                    autoFocus
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 text-rose-500 text-xs justify-center bg-rose-950/10 p-2 border border-rose-900/20">
                    <AlertTriangle size={12} /> {error}
                </div>
            )}

            <button 
                disabled={loading}
                className="w-full bg-white text-black hover:bg-slate-200 font-bold uppercase tracking-widest py-4 text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {loading ? "Authenticating..." : <>Initialize Session <ChevronRight size={14} /></>}
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-[9px] text-slate-600 leading-relaxed">
                This system is monitored. All access attempts are logged. <br/>
                IP Address: <span className="text-slate-400">HIDDEN</span>
            </p>
        </div>
      </div>
    </main>
  );
}
