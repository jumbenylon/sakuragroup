"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Activity 
} from "lucide-react";

export default function AxisLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fake login handler for UI demo
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#020617] font-sans">
      
      {/* LEFT SIDE: THE VISUAL (Only visible on Desktop) */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            alt="Axis Infrastructure" 
            fill 
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617]/90 to-[#064e3b]/40" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Sakura Group
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/30 bg-emerald-500/10 rounded-full backdrop-blur-md">
            <Activity size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">System Status: Operational</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <blockquote className="text-2xl font-light text-slate-200 mb-6 leading-relaxed">
            "Identity is the new currency. When you speak through Axis, the market listens."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <ShieldCheck size={20} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wide">End-to-End Encryption</p>
              <p className="text-xs text-slate-500">256-bit SSL Secured Connection</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: THE FORM */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
              Welcome <span className="text-emerald-500">Back.</span>
            </h1>
            <p className="text-slate-400">Enter your credentials to access the Axis Portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Business Email</label>
                <div className="relative group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    required
                    className="w-full bg-[#0a0f1e] border border-white/10 rounded px-12 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-mono uppercase tracking-widest text-slate-500">Password</label>
                  <Link href="/axis/reset-password" className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required
                    className="w-full bg-[#0a0f1e] border border-white/10 rounded px-12 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="pt-6 text-center border-t border-white/5">
            <p className="text-sm text-slate-500">
              Don't have an Axis Node ID?{' '}
              <Link href="/contact" className="text-white hover:text-emerald-500 font-bold transition-colors">
                Request Access
              </Link>
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-[10px] text-slate-600 font-mono uppercase">
                &copy; 2026 Sakura Group. All Systems Secure.
            </p>
        </div>
      </div>
    </div>
  );
}
