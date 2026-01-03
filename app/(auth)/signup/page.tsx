"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Loader2, Globe } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", password: "", org: "" });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const nextStep = () => setStep(s => s + 1);

  const handleFinalSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) setComplete(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#020202] flex flex-col md:flex-row overflow-hidden">
      {/* LEFT: CONTENT Mimicking Axis Hero */}
      <section className="hidden md:flex md:w-5/12 bg-[#0a0a0a] p-20 flex-col justify-between border-r border-white/5">
        <Link href="/">
          <Image src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" alt="Sakura" width={120} height={40} />
        </Link>
        
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-3 py-1 border border-pink-600/30 rounded-full bg-pink-600/5">
             <span className="w-1.5 h-1.5 rounded-full bg-pink-600 animate-pulse" />
             <span className="text-[8px] font-black uppercase tracking-widest text-pink-600">Enterprise Onboarding</span>
          </div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Join the<br/>Ecosystem.</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed max-w-xs font-bold">
            Onboarding follows a strict verification process to maintain gateway integrity.
          </p>
        </div>

        <div className="text-[9px] font-black uppercase tracking-widest text-slate-700">© 2026 Sakura Group</div>
      </section>

      {/* RIGHT: STEP-BY-STEP GLASS SECTION */}
      <section className="flex-1 relative flex items-center justify-center p-8">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-pink-600/5 blur-[150px] pointer-events-none" />
        
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!complete ? (
              <motion.div 
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-12 rounded-sm shadow-2xl relative"
              >
                {/* Progress Line */}
                <div className="absolute top-0 left-0 h-[2px] bg-pink-600 transition-all duration-500" style={{ width: `${(step/3)*100}%` }} />

                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 italic">Step {step} of 3</p>

                {step === 1 && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Organization</h3>
                    <input 
                      autoFocus
                      placeholder="COMPANY LEGAL NAME"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white text-xs outline-none focus:border-pink-600 transition-all"
                      onChange={e => setForm({...form, org: e.target.value})}
                    />
                    <button onClick={nextStep} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-pink-600 transition-colors">
                      Continue <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Identity</h3>
                    <input 
                      autoFocus
                      placeholder="BUSINESS EMAIL"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white text-xs outline-none focus:border-pink-600 transition-all"
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                    <button onClick={nextStep} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-pink-600 transition-colors">
                      Continue <ArrowRight size={14} />
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Security</h3>
                    <input 
                      autoFocus
                      type="password"
                      placeholder="CREATE ACCESS KEY"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-white text-xs outline-none focus:border-pink-600 transition-all"
                      onChange={e => setForm({...form, password: e.target.value})}
                    />
                    <button onClick={handleFinalSubmit} disabled={loading} className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all">
                      {loading ? "Transmitting..." : "Initialize Onboarding"}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 bg-white/[0.02] border border-white/10 rounded-sm">
                <div className="w-16 h-16 bg-pink-600/10 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-pink-600/20">
                  <Check size={30} />
                </div>
                <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter">Request Filed</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-4 leading-relaxed">
                  Your credentials are being verified by the Sovereign network. You will be notified via email once your node is active.
                </p>
                <Link href="/login" className="block mt-10 text-[10px] font-black uppercase tracking-widest text-white hover:text-pink-600 underline underline-offset-8">Return to Gateway</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
