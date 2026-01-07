"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight, CheckCircle, Shield } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  
  // States: 'EMAIL' | 'OTP'
  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Request Code
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setStep('OTP');
      } else {
        setError("Failed to send code. Try again.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      otp,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/portal");
    } else {
      setLoading(false);
      setError("Invalid or expired code.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
      
      {/* Decorative Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex p-3 bg-pink-50 rounded-xl mb-4 text-pink-600">
           {step === 'EMAIL' ? <Mail size={24} /> : <Shield size={24} />}
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {step === 'EMAIL' ? "Axis Gateway" : "Secure Access"}
        </h1>
        <p className="text-sm text-slate-500 mt-2">
            {step === 'EMAIL' ? "Enter your ID to receive a secure code." : `Code sent to ${email}`}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs font-bold rounded flex items-center gap-2 justify-center">
          {error}
        </div>
      )}

      {step === 'EMAIL' ? (
        <form onSubmit={handleRequestOtp} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Identity</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="admin@sakuragroup.co.tz"
              required
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin"/> : <>Send Code <ArrowRight size={16} /></>}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-4 relative z-10 animate-in fade-in slide-in-from-right-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">One-Time Password</label>
            <input 
              type="text" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-center text-2xl font-mono font-bold text-slate-900 tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              placeholder="000000"
              maxLength={6}
              required
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin"/> : <>Verify & Enter <CheckCircle size={16} /></>}
          </button>
          
          <button 
             type="button"
             onClick={() => setStep('EMAIL')}
             className="w-full text-center text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest mt-4"
          >
             Use different email
          </button>
        </form>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/5 rounded-full blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <Suspense fallback={<div className="text-slate-400 font-bold text-xs"><Loader2 className="animate-spin inline mr-2"/> Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
