"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

const LOGO_SAKURA = "https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png";

export default function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/axis/portal",
    });
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] flex flex-col md:flex-row overflow-hidden">
      {/* LEFT: IMMERSIVE HERO */}
      <section className="hidden md:flex md:w-7/12 relative bg-[#0a0a0a] items-center justify-center p-20 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Replace with your actual Hero Video URL */}
           <video autoPlay loop muted playsInline className="w-full h-full object-cover">
             <source src="https://storage.googleapis.com/sakura-web/axis-bg-abstract.mp4" type="video/mp4" />
           </video>
        </div>
        <div className="relative z-10 space-y-6 max-w-lg">
          <Image src={LOGO_SAKURA} alt="Sakura" width={160} height={50} className="brightness-200 mb-8" />
          <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white leading-[0.9]">
            Sovereign<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Communication</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 max-w-xs leading-relaxed">
            Secure enterprise messaging for the East African digital frontier.
          </p>
        </div>
      </section>

      {/* RIGHT: GLASS UTILITY */}
      <section className="flex-1 flex items-center justify-center p-8 md:p-20 relative bg-[#020202]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/5 blur-[120px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-sm shadow-2xl relative z-10"
        >
          <div className="mb-12">
            <p className="text-pink-600 font-black text-[9px] uppercase tracking-[0.3em] mb-2">Security Portal</p>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Initialize Session</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-px">
              <input 
                required
                type="email"
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-black/40 border border-white/10 p-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-pink-600 transition-all placeholder:text-slate-600"
                onChange={e => setData({...data, email: e.target.value})}
              />
              <input 
                required
                type="password" 
                placeholder="ACCESS KEY" 
                className="w-full bg-black/40 border border-white/10 p-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-pink-600 transition-all placeholder:text-slate-600"
                onChange={e => setData({...data, password: e.target.value})}
              />
            </div>

            <button 
              disabled={loading}
              className="group w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : "Unlock Access"}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
            <Link href="/signup" className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors text-center">
              New to Axis? Request Credentials
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
