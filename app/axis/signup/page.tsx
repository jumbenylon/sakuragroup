"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2, ArrowRight, Shield } from "lucide-react";

/**
 * Axis Signup - Simple English Version
 * Design: Radical Simplicity, high whitespace, premium focus.
 * Logic: Streamlined Google OAuth entry.
 */
export default function AxisSignupPage() {
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    // Redirects to settings to ensure profile completion immediately
    await signIn("google", { callbackUrl: "/axis/portal/settings" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 selection:bg-slate-100 antialiased">
      <div className="w-full max-w-[340px] space-y-12">
        
        {/* Step 1: Branding */}
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
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Get Started.</h1>
            <p className="text-sm text-slate-400 font-medium">Simple. Secure. Reliable.</p>
          </div>
        </header>

        {/* Step 2: Information */}
        <section className="space-y-6">
          <div className="p-8 bg-slate-50 rounded-[2.5rem] space-y-4 text-center border border-slate-100">
             <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Shield size={22} className="text-slate-900" />
             </div>
             <div className="space-y-2">
               <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Verify Identity</h2>
               <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                 We use Google to quickly verify your business. This keeps our messaging network safe for everyone.
               </p>
             </div>
          </div>

          {/* Step 3: Action */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="group w-full py-5 bg-black text-white font-bold text-xs uppercase tracking-[0.2em] rounded-2xl flex justify-center items-center gap-3 transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-black/5"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4">
          <Link 
            href="/axis/login" 
            className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Already have an account? <span className="text-black">Login</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
