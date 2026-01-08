"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Loader2, ArrowRight, Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portal";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
      setError("Infrastructure rejection: Invalid credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    // Real Stuff: Standard Google Provider trigger
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="w-full max-w-sm space-y-10 animate-in fade-in duration-700">
      {/* BRAND HEADER */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Image 
            src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
            alt="Axis" 
            width={160} 
            height={50} 
            priority
            className="object-contain grayscale brightness-0"
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Welcome Back</h1>
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Access your messaging gateway</p>
        </div>
      </div>

      {/* PRIMARY ACTION: GOOGLE SIGN IN */}
      <div className="space-y-4">
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl flex justify-center items-center gap-3 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
        >
          {googleLoading ? <Loader2 size={14} className="animate-spin" /> : (
            <>
              <Image src="https://storage.googleapis.com/sakura-web/google-icon.png" width={14} height={14} alt="Google" className="grayscale" />
              Continue with Google
            </>
          )}
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-black text-slate-300 bg-white px-4">
            OR USE IDENTITY
          </div>
        </div>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2 justify-center border border-red-100 italic">
          {error}
        </div>
      )}

      {/* SECONDARY ACTION: EMAIL FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-300" size={14} />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300"
              placeholder="admin@sakuragroup.co.tz"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
           <div className="flex justify-between items-center px-1">
             <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
             <Link href="/axis/forgot-password" size={10} className="text-[9px] font-black text-pink-600 hover:text-pink-700 uppercase tracking-widest">
               Recovery
             </Link>
           </div>
           <div className="relative">
             <input 
               type={showPassword ? "text" : "password"}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full pl-4 pr-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300"
               placeholder="••••••••"
               required
             />
             <button
               type="button"
               onClick={() => setShowPassword(!showPassword)}
               className="absolute right-4 top-3.5 text-slate-300 hover:text-slate-600 transition-colors"
             >
               {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
             </button>
           </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || googleLoading}
          className="w-full py-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex justify-center items-center gap-2 transition-all hover:bg-slate-800 disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-black/5"
        >
          {loading ? <Loader2 size={14} className="animate-spin"/> : <>Login to Gateway <ArrowRight size={14} /></>}
        </button>
      </form>

      {/* SIGNUP PROMPT */}
      <div className="text-center pt-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          New Customer?{" "}
          <Link href="/signup" className="text-pink-600 hover:underline underline-offset-4">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-slate-100">
      <Suspense fallback={<Loader2 className="animate-spin text-slate-200" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
