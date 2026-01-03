"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/axis/portal" });
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-12">
        <div className="flex flex-col items-center gap-4">
          <Image src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" alt="Sakura" width={120} height={40} />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500 italic">Secure Gateway V3.0</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="w-full bg-white/5 border border-white/10 p-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-pink-500 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="ACCESS KEY" 
            className="w-full bg-white/5 border border-white/10 p-4 text-white text-[10px] font-bold tracking-widest outline-none focus:border-pink-500 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-pink-600 hover:text-white transition-all">
            Initialize Session
          </button>
        </form>
        
        <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest">
          Unauthorized Access Prohibited
        </p>
      </div>
    </main>
  );
}
