"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldAlert, 
  Lock, 
  Key, 
  Fingerprint, 
  ArrowRight, 
  AlertTriangle,
  Terminal
} from "lucide-react";

export default function AdminLoginPage() {
  const [step, setStep] = useState(1); // 1 = Creds, 2 = MFA
  const [loading, setLoading] = useState(false);

  // Fake auth sequence
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate checking DB
    setTimeout(() => {
        setLoading(false);
        setStep(2); // Move to MFA step
    }, 1500);
  };

  const handleMFA = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      // Simulate verification
      setTimeout(() => {
          window.location.href = "/axis/admin/dashboard"; // Redirect
      }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#000000] font-mono text-slate-300 grid md:grid-cols-[1fr_500px] overflow-hidden">
      
      {/* LEFT: SYSTEM LOGS (Visual Fluff) */}
      <div className="relative hidden md:flex flex-col justify-end p-12 border-r border-white/10 bg-[#020202]">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
        
        {/* Fake Terminal Output */}
        <div className="relative z-10 space-y-2 text-[10px] opacity-50 select-none pointer-events-none">
            <p className="text-emerald-500">root@sakura-core:~# init_sequence --admin</p>
            <p>> Establishing secure handshake...</p>
            <p>> [OK] TLS 1.3 Connection Verified</p>
            <p>> [OK] IP Address Whitelisted</p>
            <p>> [CHECK] Biometric signature... PENDING</p>
            <p className="animate-pulse">> Waiting for credentials...</p>
        </div>

        <div className="mt-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tighter mb-2 flex items-center gap-2">
                <ShieldAlert className="text-red-500" /> Restricted Area
            </h2>
            <p className="text-xs text-slate-500 max-w-sm">
                Unauthorized access to this system is a criminal offense under the Tanzania Cybercrimes Act, 2015. 
                All IP addresses are logged and monitored.
            </p>
        </div>
      </div>

      {/* RIGHT: THE FORM */}
      <div className="flex flex-col justify-center p-8 md:p-16 relative">
         <div className="max-w-xs w-full mx-auto">
            
            {/* Header */}
            <div className="mb-12 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Terminal size={24} className="text-white" />
                </div>
                <h1 className="text-xl font-bold text-white uppercase tracking-widest">Root Access</h1>
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 flex items-center justify-center gap-1">
                    <AlertTriangle size={10} /> Level 5 Clearance
                </p>
            </div>

            {/* STEP 1: CREDENTIALS */}
            {step === 1 && (
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500">Admin ID</label>
                        <div className="flex items-center border-b border-white/20 focus-within:border-white transition-colors py-2">
                            <Lock size={14} className="mr-3 text-slate-500" />
                            <input 
                                type="text" 
                                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-700 font-sans"
                                placeholder="root_admin"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest text-slate-500">Access Key</label>
                        <div className="flex items-center border-b border-white/20 focus-within:border-white transition-colors py-2">
                            <Key size={14} className="mr-3 text-slate-500" />
                            <input 
                                type="password" 
                                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-700 font-sans"
                                placeholder="••••••••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button disabled={loading} className="w-full bg-white text-black h-12 text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mt-8">
                        {loading ? "Verifying..." : <>Authenticate <ArrowRight size={14} /></>}
                    </button>
                </form>
            )}

            {/* STEP 2: MFA / 2FA */}
            {step === 2 && (
                <form onSubmit={handleMFA} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="text-center mb-6">
                        <Fingerprint size={48} className="text-emerald-500 mx-auto mb-4 animate-pulse" />
                        <p className="text-xs text-white">Enter 2FA Token</p>
                    </div>

                    <div className="flex gap-2 justify-center">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <input 
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-10 h-12 bg-white/5 border border-white/10 text-center text-white font-bold rounded focus:border-emerald-500 focus:outline-none"
                            />
                        ))}
                    </div>

                    <button disabled={loading} className="w-full bg-emerald-600 text-white h-12 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 mt-8 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        {loading ? "Decrypting..." : "Verify Token"}
                    </button>
                    
                    <button type="button" onClick={() => setStep(1)} className="w-full text-[10px] text-slate-500 hover:text-white uppercase tracking-widest mt-4">
                        Cancel Verification
                    </button>
                </form>
            )}
         </div>

         <div className="absolute bottom-8 left-0 right-0 text-center">
             <Link href="/" className="text-[10px] text-slate-700 hover:text-slate-500 transition-colors">
                 Exit to Safe Mode
             </Link>
         </div>
      </div>
    </div>
  );
}
