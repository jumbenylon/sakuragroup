"use client";

import React from "react";
import Image from "next/image";
import { CreditCard, Smartphone, ShieldCheck, Lock, Zap } from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

const mnos = [
  { name: "M-Pesa", color: "bg-red-600" }, 
  { name: "Tigo Pesa", color: "bg-blue-500" },
  { name: "Airtel", color: "bg-red-500" }, 
  { name: "HaloPesa", color: "bg-orange-500" },
];

const MNOIntegration = () => (
  <section className="py-24 bg-neutral-900 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
       <div className="text-center mb-12">
           <h2 className="text-2xl font-bold text-white mb-2">Total Network Coverage</h2>
           <p className="text-neutral-400 text-sm">Direct settlement with all major operators.</p>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {mnos.map(m => (
               <div key={m.name} className="p-6 bg-black border border-white/10 rounded-xl text-white text-center hover:border-emerald-500/50 transition-colors">
                   <div className={`w-3 h-3 rounded-full ${m.color} mx-auto mb-3`} />
                   {m.name}
               </div>
           ))}
       </div>
    </div>
  </section>
);

const SecuritySection = () => (
    <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
            {[
                { title: "Bank-Grade Encryption", desc: "AES-256 encryption for all data at rest.", icon: Lock },
                { title: "PCI-DSS Compliant", desc: "Certified Level 1 Service Provider.", icon: ShieldCheck },
                { title: "Instant Settlement", desc: "T+1 days settlement to bank or wallet.", icon: Zap },
            ].map((item, i) => (
                <div key={i} className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                        <item.icon />
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

export default function SakuraPayPage() {
  return (
    <main className="min-h-screen bg-neutral-950 selection:bg-emerald-500 selection:text-black">
      {/* UPDATED: No Props */}
      <GlobalNavbar />
      
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 bg-neutral-950 overflow-hidden pt-20">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">Live in Tanzania</span>
            </div>
            
            <div className="relative w-64 h-24">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/sakurapay-logo.png" 
                    alt="SakuraPay"
                    fill
                    className="object-contain object-left"
                />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-[1]">
              Unifying Africa.
            </h1>
            
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              The modern payment stack for East African business. Accept M-Pesa, Tigo Pesa, Cards, and USSD via a single, beautiful API.
            </p>
            <div className="flex gap-4">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors">Start Integration</button>
            </div>
          </div>
          
          <div className="perspective-1000 flex justify-center">
              <div className="w-[340px] h-[220px] rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 shadow-2xl flex flex-col justify-between p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CreditCard className="text-emerald-400 w-10 h-10" />
                  <div className="flex justify-between items-end">
                      <span className="font-mono text-white text-xl tracking-widest">•••• 4242</span>
                      <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen" />
                          <div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-screen" />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      <MNOIntegration />
      <SecuritySection />
      <GlobalFooter />
    </main>
  );
}
