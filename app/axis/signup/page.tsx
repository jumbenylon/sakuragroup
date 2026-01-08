"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Lock, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/**
 * Axis Signup - Premium Simple Onboarding
 * Purpose: Unified entry for verified Google IDs or custom Email/Phone/Password nodes.
 */
export default function AxisSignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Senior Logic: Pass all three fields to your custom Credentials Provider
    const res = await signIn("credentials", {
      ...formData,
      redirect: false,
      isSignup: "true", // Custom flag for your authorize() function
    });

    if (res?.ok) {
      router.push("/portal/settings"); // Direct to profile completion
    } else {
      setLoading(false);
      setError("Registration failed: Please check your details.");
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/portal/settings" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 antialiased">
      <div className="w-full max-w-[360px] space-y-12 animate-in fade-in duration-700">
        
        {/* Branding */}
        <header className="text-center space-y-4">
          <div className="flex justify-center">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
              alt="Sakura Axis" 
              width={140} 
              height={40} 
              className="grayscale brightness-0"
              priority
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Join Axis.</h1>
            <p className="text-sm text-slate-400 font-medium">Create your secure messaging node.</p>
          </div>
        </header>

        {/* Primary Action: Google */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignup}
            disabled={googleLoading || loading}
            className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl flex justify-center items-center gap-3 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
          >
            {googleLoading ? <Loader2 size={14} className="animate-spin" /> : (
              <>
                <Image src="https://storage.googleapis.com/sakura-web/google-icon.png" width={14} height={14} alt="Google" className="grayscale" />
                Sign up with Google
              </>
            )}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-black text-slate-300 bg-white px-4">
              OR FILL DETAILS
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg text-center border border-red-100">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-300" size={14} />
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-slate-300" size={14} />
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full pl-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300"
                placeholder="+255 000 000 000"
              />
            </div>
          </div>
          
          <div className="space-y-1">
             <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
             <div className="relative">
               <input 
                 type={showPassword ? "text" : "password"}
                 required
                 value={formData.password}
                 onChange={(e) => setFormData({...formData, password: e.target.value})}
                 className="w-full pl-4 pr-11 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-300"
                 placeholder="••••••••"
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
            className="w-full py-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex justify-center items-center gap-2 transition-all hover:bg-slate-800 disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? <Loader2 size={14} className="animate-spin"/> : <>Join Gateway <ArrowRight size={14} /></>}
          </button>
        </form>

        <footer className="text-center pt-4">
          <Link href="/login" className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
            Already registered? <span className="text-black">Login</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
