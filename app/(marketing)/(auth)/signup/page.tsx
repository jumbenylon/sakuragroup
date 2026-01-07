"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const LOGO_SAKURA = "https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  // Fixed: Added 'phone' to the initial state so the input works
  const [form, setForm] = useState({ email: "", password: "", org: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  const nextStep = () => {
    if (step === 1 && !form.org) return setError("Organization name is required");
    if (step === 2 && !form.email.includes("@")) return setError("Valid business email required");
    setError("");
    setStep(s => s + 1);
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      
      if (res.ok) {
        setComplete(true);
      } else {
        setError(data.error || "System synchronization failed.");
      }
    } catch (err) {
      setError("Network connectivity issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* LEFT: BRAND VISION */}
      <section className="hidden md:flex md:w-5/12 bg-[#080808] p-20 flex-col justify-between border-r border-white/5 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <Link href="/" className="relative z-10">
          <Image src={LOGO_SAKURA} alt="Sakura" width={130} height={40} className="brightness-200" priority />
        </Link>
        
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-3 px-3 py-1 border border-pink-600/20 rounded-full bg-pink-600/5">
             <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-pulse" />
             <span className="text-[8px] font-black uppercase tracking-widest text-pink-600">Enterprise Node V3.0</span>
          </div>
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
            Scale Your<br/><span className="text-slate-700">Reach.</span>
          </h2>
          <p className="text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed max-w-xs font-bold">
            Connect your business to the Axis infrastructure. Secure, high-throughput communication for the Tanzanian market.
          </p>
        </div>

        <div className="relative z-10 text-[9px] font-black uppercase tracking-widest text-slate-800">
            Powered by Sakura Group © 2026
        </div>
      </section>

      {/* RIGHT: THE GLASS INTERFACE */}
      <section className="flex-1 relative flex items-center justify-center p-8 bg-black">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <AnimatePresence mode="wait">
            {!complete ? (
              <motion.div 
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-12 rounded-sm shadow-2xl"
              >
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-[1px] bg-pink-600 transition-all duration-700 ease-out" style={{ width: `${(step/3)*100}%` }} />

                <header className="mb-12">
                   <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] mb-2">Step {step} / 03</p>
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                      {step === 1 && "Identity"}
                      {step === 2 && "Gateway"}
                      {step === 3 && "Security"}
                   </h3>
                </header>

                <div className="space-y-10">
                  {step === 1 && (
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Legal Organization Name</label>
                      <input 
                        autoFocus
                        placeholder="e.g. Sakura Group Ltd"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm outline-none focus:border-pink-600 transition-all placeholder:text-slate-800"
                        onChange={e => setForm({...form, org: e.target.value})}
                        value={form.org}
                        onKeyDown={e => e.key === 'Enter' && nextStep()}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Corporate Email Address</label>
                      <input 
                        autoFocus
                        type="email"
                        placeholder="name@company.co.tz"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm outline-none focus:border-pink-600 transition-all placeholder:text-slate-800"
                        onChange={e => setForm({...form, email: e.target.value})}
                        value={form.email}
                      />
                    </div>
                    {/* FIXED: Added Phone Input */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Administrator Phone</label>
                      <input 
                        type="tel"
                        placeholder="+255 700 000 000"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm outline-none focus:border-pink-600 transition-all placeholder:text-slate-800"
                        onChange={e => setForm({...form, phone: e.target.value})}
                        value={form.phone}
                        onKeyDown={e => e.key === 'Enter' && nextStep()}
                      />
                    </div>
                    </>
                  )}

                  {step === 3 && (
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Create Access Key</label>
                      <input 
                        autoFocus
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm outline-none focus:border-pink-600 transition-all placeholder:text-slate-800"
                        onChange={e => setForm({...form, password: e.target.value})}
                        value={form.password}
                        onKeyDown={e => e.key === 'Enter' && handleFinalSubmit()}
                      />
                    </div>
                  )}

                  {error && (
                    <p className="text-[10px] font-black uppercase text-pink-600 tracking-widest">{error}</p>
                  )}

                  <div className="flex items-center justify-between pt-6">
                    <Link href="/login" className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors">
                      Back to Login
                    </Link>
                    
                    <button 
                      onClick={step === 3 ? handleFinalSubmit : nextStep} 
                      disabled={loading}
                      className="flex items-center gap-3 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all group"
                    >
                      {loading ? <Loader2 className="animate-spin" size={14} /> : (step === 3 ? "Initialize" : "Next")}
                      {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center p-12 bg-white/[0.02] border border-white/10 rounded-sm backdrop-blur-3xl shadow-2xl"
              >
                <div className="w-16 h-16 bg-pink-600/10 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-10 border border-pink-600/20">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-4xl font-black uppercase italic text-white tracking-tighter">Node Pending</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-6 leading-relaxed font-bold">
                  Your request has been filed. The Sovereign network is currently verifying your organization. You will receive an activation email shortly.
                </p>
                <div className="pt-12">
                   <Link href="/login" className="px-10 py-4 border border-white/10 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                      Return to Gateway
                   </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
