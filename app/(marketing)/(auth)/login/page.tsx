"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Globe, Chrome } from "lucide-react";

const LOGO_SAKURA = "https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png";

export default function SmartGateway() {
  const [view, setView] = useState<"identify" | "login" | "signup">("identify");
  const [form, setForm] = useState({ email: "", password: "", org: "" });
  const [loading, setLoading] = useState(false);

  const handleIdentify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/check-user", {
      method: "POST",
      body: JSON.stringify({ email: form.email })
    });
    const { exists } = await res.json();
    setView(exists ? "login" : "signup");
    setLoading(false);
  };

  const handleFinalAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (view === "login") {
      await signIn("credentials", { ...form, callbackUrl: "/axis/portal" });
    } else {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(form)
      });
      if (res.ok) await signIn("credentials", { ...form, callbackUrl: "/axis/portal" });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#020202] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* LEFT: THE VISION (Axis Hero Mimic) */}
      <section className="hidden md:flex md:w-5/12 bg-[#080808] p-20 flex-col justify-between border-r border-white/5 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <Link href="/" className="relative z-10">
          <Image src={LOGO_SAKURA} alt="Sakura" width={130} height={40} className="brightness-200" priority />
        </Link>
        <div className="relative z-10 space-y-6">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
            Sovereign<br/><span className="text-slate-700">Access.</span>
          </h2>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed max-w-xs font-bold">
            One gateway. Total control. Your node in the Axis communication network starts here.
          </p>
        </div>
        <div className="relative z-10 text-[9px] font-black uppercase tracking-widest text-slate-800">Sakura Group © 2026</div>
      </section>

      {/* RIGHT: THE SMART GLASS INTERFACE */}
      <section className="flex-1 relative flex items-center justify-center p-8 bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/[0.03] blur-[150px] pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <motion.div 
            layout
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-12 rounded-sm shadow-2xl"
          >
            <header className="mb-10 text-center">
               <p className="text-[9px] font-black text-pink-600 uppercase tracking-[0.5em] mb-3">Security Protocol</p>
               <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                  {view === "identify" && "Identify"}
                  {view === "login" && "Welcome Back"}
                  {view === "signup" && "New Account"}
               </h3>
            </header>

            <AnimatePresence mode="wait">
              <form onSubmit={view === "identify" ? handleIdentify : handleFinalAction} className="space-y-6">
                {/* Email Phase */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Business Email</label>
                  <input 
                    required
                    disabled={view !== "identify"}
                    type="email"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm outline-none focus:border-pink-600 transition-all disabled:text-slate-500"
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>

                {/* Intelligent Expansion */}
                {view !== "identify" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-6 pt-4"
                  >
                    {view === "signup" && (
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Organization Name</label>
                        <input 
                          required
                          className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm outline-none focus:border-pink-600 transition-all"
                          onChange={e => setForm({...form, org: e.target.value})}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Access Key</label>
                      <input 
                        required
                        type="password"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm outline-none focus:border-pink-600 transition-all"
                        onChange={e => setForm({...form, password: e.target.value})}
                      />
                    </div>
                  </motion.div>
                )}

                <button 
                  disabled={loading}
                  className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center gap-3 mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" size={14} /> : (view === "identify" ? "Continue" : "Initialize")}
                  {!loading && <ArrowRight size={14} />}
                </button>
              </form>
            </AnimatePresence>

            {/* Google Login Capabilities */}
            <div className="mt-10 pt-10 border-t border-white/5 space-y-4">
              <p className="text-center text-[8px] font-black text-slate-600 uppercase tracking-widest">Or utilize SSO</p>
              <button 
                onClick={() => signIn("google", { callbackUrl: "/axis/portal" })}
                className="w-full py-4 border border-white/10 bg-white/[0.02] text-white font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
              >
                <Chrome size={14} /> Continue with Google
              </button>
            </div>
            
            {view !== "identify" && (
              <button 
                onClick={() => setView("identify")}
                className="w-full mt-6 text-[8px] font-black text-slate-500 uppercase tracking-widest hover:text-pink-600 transition-colors"
              >
                Change Email Address
              </button>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
