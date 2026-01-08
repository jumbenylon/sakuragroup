"use client";

import React, { useState, useEffect } from "react";
import { 
  CreditCard, CheckCircle, Copy, Clock, 
  ArrowRight, ShieldCheck, Wallet, Loader2 
} from "lucide-react";
import Image from "next/image";

/**
 * SakuraPay Core v1.0 - Manual Gateway Node
 * Design Ethos: Apple-simple, Industrial Purity.
 * Purpose: Centralized payment verification for all SakuraGroup projects.
 */

const SAKURAPAY_METHODS = [
  { name: 'M-Pesa', acc: '5925016', key: 'mpesa', label: 'Lipa Namba', img: 'https://storage.googleapis.com/sakura-web/mpesa.jpg' },
  { name: 'CRDB Bank', acc: '11863551', key: 'crdb', label: 'Account No.', img: 'https://storage.googleapis.com/sakura-web/crdb.jpg' },
  { name: 'Mixx by YAS', acc: '17142889', key: 'mixx', label: 'Merchant ID', img: 'https://storage.googleapis.com/sakura-web/mixx.jpg' },
  { name: 'Selcom Pay', acc: '61051199', key: 'selcom', label: 'Paybill', img: 'https://storage.googleapis.com/sakura-web/selcom.jpg' }
];

const PAYMENT_STEPS: any = {
  mpesa: ["Dial <b>*150*00#</b>", "Select <b>4</b> (Payments)", "Select <b>1</b> (Paybill)", "Enter Business No: <b>5925016</b>", "Enter Amount & PIN."],
  crdb: ["Dial <b>*150*03#</b>", "Select <b>Payments</b>", "Select <b>Pay to Bank</b>", "Enter Account: <b>11863551</b>", "Enter Amount & PIN."],
  // ... (Steps for other providers remain consistent with your legacy system)
};

export default function SakuraPayGateway() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedMethod = SAKURAPAY_METHODS.find(m => m.key === activeKey);

  const copyRef = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000">
      {/* 1. SAKURAPAY BRANDING */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full">
            <Wallet size={12} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">SakuraPay Infrastructure</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 italic">Billing Center.</h1>
        </div>
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-right min-w-[240px]">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Axis Node Balance</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter italic">24,500 <small className="text-xs uppercase text-slate-300 not-italic font-bold">TZS</small></p>
        </div>
      </header>

      {/* 2. PROVIDER SELECTION */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SAKURAPAY_METHODS.map((method) => (
          <button 
            key={method.key}
            onClick={() => setActiveKey(method.key)}
            className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${
              activeKey === method.key ? 'border-slate-900 bg-slate-50 shadow-2xl shadow-slate-200' : 'border-slate-100 bg-white hover:border-slate-300'
            }`}
          >
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden grayscale brightness-110 group-hover:grayscale-0 transition-all">
              <Image src={method.img} alt={method.name} fill className="object-cover" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{method.name}</span>
          </button>
        ))}
      </section>

      {/* 3. INSTRUCTIONS & VERIFICATION GRID */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Manual Steps Card */}
        <div className="lg:col-span-3 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col justify-between min-h-[450px]">
          <div className="relative z-10 space-y-10">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 italic">Verification Instructions</h4>
            
            {!activeKey ? (
              <p className="text-slate-400 font-medium animate-pulse italic">Please select a payment method to begin the SakuraPay handshake...</p>
            ) : (
              <div className="space-y-10">
                <ul className="space-y-6">
                  {PAYMENT_STEPS[activeKey]?.map((step: string, i: number) => (
                    <li key={i} className="flex gap-6 items-start text-sm text-slate-400 font-medium leading-relaxed">
                      <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-1">{i+1}</span>
                      <span dangerouslySetInnerHTML={{ __html: step }} />
                    </li>
                  ))}
                </ul>
                
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black text-emerald-500 uppercase mb-1">{selectedMethod?.label}</p>
                    <p className="text-2xl font-black tracking-widest text-white">{selectedMethod?.acc}</p>
                  </div>
                  <button onClick={() => copyRef(selectedMethod?.acc || '')} className="p-4 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all">
                    {copied ? <CheckCircle size={20} /> : <Copy size={20} className="text-slate-500" />}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[140px] pointer-events-none" />
        </div>

        {/* Verification Form */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-[3rem] p-12 flex flex-col justify-between shadow-sm">
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Submit Reference</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2 tracking-widest">Amount Paid (TZS)</label>
                <input type="number" placeholder="e.g. 50000" className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2 tracking-widest">Transaction Reference</label>
                <input type="text" placeholder="e.g. 9K203X..." className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900" />
              </div>
            </div>
          </div>
          
          <button 
            disabled={!activeKey || isSubmitting}
            className="w-full py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-emerald-600 transition-all disabled:opacity-20 flex justify-center items-center gap-3 mt-10 shadow-2xl shadow-black/10"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <>Process Payment <ArrowRight size={16} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}
