"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, CheckCircle, ArrowRight, ShieldCheck, QrCode, Loader2 } from "lucide-react";
import Image from "next/image";

/**
 * Axis High-Fidelity Billing (v12.5)
 * Logic: Dynamic instruction sets per MNO with SakuraPay assets.
 */

const METHODS = [
  { 
    name: 'M-PESA', 
    acc: '5925016', 
    key: 'mpesa', 
    label: 'LIPA NAMBA',
    img: 'https://storage.googleapis.com/sakura-web/sakurapay/mpesa.jpg', 
    qr: 'https://storage.googleapis.com/sakura-web/sakurapay/mpesa-qr.jpg',
    steps: ["Dial *150*00#", "Select 4 (Payments)", "Select 1 (Paybill)", "Select 1 (M-Pesa)", "Enter Business No: 5925016", "Enter Amount & PIN."]
  },
  { 
    name: 'CRDB BANK', 
    acc: '11863551', 
    key: 'crdb', 
    label: 'ACCOUNT NO.',
    img: 'https://storage.googleapis.com/sakura-web/sakurapay/crdb.jpg', 
    qr: 'https://storage.googleapis.com/sakura-web/sakurapay/crdb-qr.jpg',
    steps: ["Dial *150*03#", "Select 5 (Payments)", "Select 2 (Bank Account)", "Enter Account: 11863551", "Enter Amount", "Confirm with PIN."]
  },
  { 
    name: 'MIXX BY YAS', 
    acc: '17142889', 
    key: 'mixx', 
    label: 'MERCHANT ID',
    img: 'https://storage.googleapis.com/sakura-web/sakurapay/mixx.jpg', 
    qr: 'https://storage.googleapis.com/sakura-web/sakurapay/mixx-qr.jpg',
    steps: ["Open MIXX App", "Select 'Pay Merchant'", "Scan QR or enter ID: 17142889", "Enter Amount", "Authorize Transaction."]
  },
  { 
    name: 'SELCOM PAY', 
    acc: '61051199', 
    key: 'selcom', 
    label: 'PAYBILL',
    img: 'https://storage.googleapis.com/sakura-web/sakurapay/selcom.jpg', 
    qr: 'https://storage.googleapis.com/sakura-web/sakurapay/selcom-qr.jpg',
    steps: ["Dial *150*01#", "Select 4 (Paybill)", "Select 5 (Selcom Pay)", "Enter Number: 61051199", "Enter Amount & PIN."]
  }
];

function BillingContent() {
  const searchParams = useSearchParams();
  const [activeKey, setActiveKey] = useState('mpesa');
  const [copied, setCopied] = useState(false);
  
  const selected = METHODS.find(m => m.key === activeKey) || METHODS[0];

  const copyRef = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B1222] text-white rounded-full">
            <ShieldCheck size={12} className="text-sky-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">SakuraPay Verified Gateway</span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 italic">Add Funds.</h1>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm text-right min-w-[280px]">
          <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic mb-1">Node Balance</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter italic">24,500 <small className="text-xs uppercase text-slate-300 not-italic font-bold">TZS</small></p>
        </div>
      </header>

      {/* 01 — DYNAMIC LOGO SELECTOR */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 italic">01 — Select Payment Route</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODS.map((m) => (
            <button 
              key={m.key} 
              onClick={() => setActiveKey(m.key)}
              className={`p-10 rounded-[3rem] border transition-all flex flex-col items-center gap-6 group ${
                activeKey === m.key 
                ? 'border-slate-900 bg-[#0B1222] text-white shadow-2xl scale-105' 
                : 'border-slate-50 bg-white hover:border-slate-200 shadow-sm'
              }`}
            >
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-inner bg-white p-2">
                <Image 
                  src={m.img} 
                  alt={m.name} 
                  fill 
                  className={`object-contain transition-all ${activeKey === m.key ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`} 
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{m.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 02 & 03 — HANDSHAKE INTERFACE */}
      <div className="grid lg:grid-cols-5 gap-10 items-stretch">
        
        {/* DYNAMIC STEPS AREA */}
        <div className="lg:col-span-3 bg-white border border-slate-50 rounded-[4rem] p-16 space-y-12 shadow-sm relative overflow-hidden">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 italic relative z-10">02 — Execution Steps</h4>
          
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-10">
              <ul className="space-y-6">
                {selected.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 items-center text-xs text-slate-600 font-bold italic tracking-tight animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <span className="w-6 h-6 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ul>
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{selected.label}</p>
                  <p className="text-3xl font-black tracking-tighter text-slate-900">{selected.acc}</p>
                </div>
                <button 
                  onClick={() => copyRef(selected.acc)}
                  className="p-5 bg-white rounded-2xl shadow-sm hover:bg-slate-900 hover:text-white transition-all"
                >
                  {copied ? <CheckCircle size={20} className="text-emerald-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            {/* DYNAMIC QR AREA */}
            <div className="space-y-6 flex flex-col items-center">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                    <QrCode size={14} /> Scan to Dispatch
                </div>
                <div className="aspect-square w-full bg-white rounded-[4rem] border border-slate-100 p-12 shadow-inner relative flex items-center justify-center overflow-hidden">
                   <Image 
                     src={selected.qr} 
                     alt="Provider QR" 
                     width={240} 
                     height={240} 
                     className="object-contain animate-in fade-in zoom-in duration-700" 
                   />
                </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-slate-50 rounded-full opacity-50" />
        </div>

        {/* VERIFICATION TERMINAL */}
        <div className="lg:col-span-2 bg-[#0B1222] text-white rounded-[4rem] p-16 space-y-12 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-12 relative z-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 italic">03 — Verification</h4>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Amount Paid (TZS)</label>
                <input className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-2xl font-black text-white outline-none focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-700" placeholder="0.00" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Reference ID</label>
                <input className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-xs font-black uppercase tracking-[0.2em] text-white outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-slate-700" placeholder="EX: 9K203X..." />
              </div>
            </div>
          </div>
          <button className="w-full py-8 bg-white text-slate-900 text-[11px] font-black uppercase tracking-[0.5em] rounded-[2rem] hover:bg-sky-400 transition-all shadow-xl relative z-10">
            Verify Handshake <ArrowRight size={18} className="ml-2 inline" />
          </button>
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[120px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default function AxisBillingPage() {
  return (
    <Suspense fallback={
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-slate-200" size={40} />
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Syncing Payment Gateway...</p>
      </div>
    }>
      <BillingContent />
    </Suspense>
  );
}
