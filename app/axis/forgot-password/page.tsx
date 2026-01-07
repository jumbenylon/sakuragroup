"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Call our API to handle the logic
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    // We show success regardless to prevent email enumeration (security best practice)
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-pink-50 rounded-xl mb-4 text-pink-600">
            {sent ? <CheckCircle size={24} /> : <Mail size={24} />}
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {sent ? "Check your logs" : "Reset Password"}
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            {sent 
              ? "If an account exists, we sent a reset link (Check your Terminal)." 
              : "Enter your email to receive a recovery link."}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="admin@sakuragroup.co.tz"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70"
            >
              {loading ? <Loader2 size={16} className="animate-spin"/> : <>Send Link <ArrowRight size={16} /></>}
            </button>
          </form>
        ) : (
           <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm text-center">
              Link generated. Check your console logs.
           </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/axis/login" className="text-xs font-bold text-slate-400 hover:text-slate-600">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
