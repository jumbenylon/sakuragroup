"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2, UserPlus, ShieldCheck } from "lucide-react";

/**
 * Axis Signup - Live Provisioning
 * Logic: Uses Google OAuth to create the user record and redirects to onboarding.
 */
export default function AxisSignupPage() {
  const [loading, setLoading] = useState(false);

  const handleProvisioning = async () => {
    setLoading(true);
    // Real Stuff: We trigger the provider and force the landing on settings
    // to ensure the user completes their "Strong Profile" immediately.
    await signIn("google", { callbackUrl: "/axis/portal/settings" });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 selection:bg-pink-100">
      <div className="w-full max-w-sm space-y-10">
        
        {/* Branding */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sms/sakura-sms-logo.png" 
              alt="Axis" 
              width={160} 
              height={50} 
              priority
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-mono">Node Provisioning</h1>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Enterprise Gateway Access</p>
          </div>
        </div>

        {/* Info Card */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
             <div className="flex items-center gap-3 text-pink-600">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Sovereign Onboarding</span>
             </div>
             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
               New nodes are provisioned via verified Google Identities to ensure infrastructure integrity and prevent unauthorized messaging.
             </p>
          </div>

          {/* Action */}
          <button
            onClick={handleProvisioning}
            disabled={loading}
            className="w-full py-4 bg-black text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl flex justify-center items-center gap-3 transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : (
              <>
                <UserPlus size={14} /> Initialize Node
              </>
            )}
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Existing Node?{" "}
            <Link href="/axis/login" className="text-pink-600 hover:underline underline-offset-4">
              Access Gateway
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
