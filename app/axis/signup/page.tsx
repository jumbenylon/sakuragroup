"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowRight, UserPlus, ShieldCheck } from "lucide-react";

export default function AxisSignupPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-10">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
              alt="Axis" 
              width={160} 
              height={50} 
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Node Provisioning</h1>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Join the Axis Ecosystem</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
             <div className="flex items-center gap-3 text-pink-600">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Sovereign Onboarding</span>
             </div>
             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
               All new nodes must be provisioned via a verified Google Identity for infrastructure integrity.
             </p>
          </div>

          <button
            onClick={() => { setLoading(true); window.location.href = "/api/auth/signin/google?callbackUrl=/axis/portal/settings"; }}
            disabled={loading}
            className="w-full py-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex justify-center items-center gap-3 transition-all hover:bg-slate-800"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : (
              <>
                <UserPlus size={14} /> Initialize Node
              </>
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Existing Node?{" "}
            <Link href="/axis/login" className="text-pink-600 hover:underline">
              Access Gateway
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
