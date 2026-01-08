"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, Zap, Building2, Crown } from "lucide-react";

const PACKAGES = [
  { 
    id: "p1", name: "Starter", icon: Zap, qty: 1000, price: 21, 
    features: ["Standard Route", "Basic Analytics", "98% Delivery Rate"] 
  },
  { 
    id: "p2", name: "Business", icon: Building2, qty: 5000, price: 18, 
    features: ["Priority Route", "Advanced Reports", "Dedicated API Key"], 
    recommended: true 
  },
  { 
    id: "p3", name: "Enterprise", icon: Crown, qty: 25000, price: 15, 
    features: ["Direct Carrier Route", "Full White-label", "24/7 Priority Support"] 
  }
];

export default function PackageSelectionPage() {
  const router = useRouter();

  const handleSelection = (pkg: typeof PACKAGES[0]) => {
    const total = pkg.qty * pkg.price;
    // Handshake with SakuraPay Billing
    router.push(`/portal/billing?amount=${total}&qty=${pkg.qty}&tier=${pkg.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">Select Capacity.</h1>
        <p className="text-slate-400 font-medium italic">Choose a node capacity that fits your messaging volume.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {PACKAGES.map((pkg) => (
          <div key={pkg.id} 
               className={`relative bg-white p-10 rounded-[3rem] border transition-all flex flex-col justify-between ${
                 pkg.recommended ? 'border-slate-900 shadow-2xl scale-105' : 'border-slate-100 shadow-sm'
               }`}>
            {pkg.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                Most Efficient
              </div>
            )}

            <div className="space-y-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900">
                <pkg.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest text-slate-900">{pkg.name}</h3>
                <p className="text-xs text-slate-400 font-medium italic">Tsh {pkg.price} per SMS</p>
              </div>
              <div className="text-4xl font-black tracking-tighter">
                {pkg.qty.toLocaleString()} <span className="text-xs uppercase text-slate-300">Credits</span>
              </div>
              <ul className="space-y-3 pt-6">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                    <Check size={14} className="text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handleSelection(pkg)}
              className="w-full mt-10 py-5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all shadow-xl"
            >
              Order {(pkg.qty * pkg.price).toLocaleString()} TZS
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
