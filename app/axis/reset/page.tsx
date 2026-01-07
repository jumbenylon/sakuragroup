"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";

function ResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/reset-password-confirm", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });

    setLoading(false);
    if (res.ok) {
      setStatus("success");
      setTimeout(() => router.push("/axis/login"), 2000);
    } else {
      setStatus("error");
    }
  };

  if (!token) return <div className="text-center p-10 text-red-500">Invalid Link</div>;

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-slate-900">New Password</h1>
        <p className="text-sm text-slate-500 mt-2">Secure your account.</p>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center text-green-600 gap-2 py-8">
          <CheckCircle size={48} />
          <p className="font-bold">Password Updated!</p>
          <p className="text-xs text-slate-400">Redirecting...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded flex items-center gap-2">
              <AlertCircle size={16} /> Token invalid or expired.
            </div>
          )}
          <div>
             <div className="relative">
               <Lock className="absolute left-4 top-3.5 text-slate-300" size={16} />
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-11 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                 placeholder="New Password"
                 required
                 minLength={6}
               />
             </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 size={16} className="animate-spin"/> : <>Update Password <ArrowRight size={16} /></>}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetForm />
      </Suspense>
    </div>
  );
}
