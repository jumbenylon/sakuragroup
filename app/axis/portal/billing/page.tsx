"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Copy, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  QrCode, 
  Loader2,
  Wallet
} from "lucide-react";
import Image from "next/image";

/**
 * Axis Pro Billing (v15.0)
 * Geometry: Refined Industrial (Reduced Curves)
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
  const [isVerifying, setIsVerifying] = useState(false);
  const [amountInput, setAmountInput] = useState(searchParams.get("amount") || "");
  const [refInput, setRefInput] = useState("");

  const selected = METHODS.find(m => m.key === activeKey) || METHODS[0];
  const tier = searchParams.get("tier");
  const qty = searchParams.get("qty");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    if (!amountInput || !refInput) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      alert("Submission successful. Ref: " + refInput);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-6">
         <div className="bg-slate-900 text-white px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={12} className="text-sky-400" /> SAKURAPAY SECURE
         </div>
         <div className="text-right">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Balance</p>
            <p className="text-3xl font-black text-slate-900 tracking-tighter italic">24,500 <small className="text-xs uppercase text-slate-300 font-bold not-italic">TZS</small></p>
         </div>
      </div>

      <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">Add Funds.</h1>

      {/* PACKAGE BANNER */}
      {tier && (
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-4">
           <Wallet className="text-emerald-500" size={24} />
           <div>
              <p className="text-[9px] font-black uppercase text-emerald-600 tracking-widest italic">Tier Selection</p>
              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{tier} — {Number(qty).toLocaleString()} SMS</h4>
           </div>
        </div>
      )}

      {/* 01 — PROVIDERS */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">01 — Selection</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METHODS.map((m) => (
            <button key={m.key} onClick={() => setActiveKey(m.key)}
              className={`p-6 rounded-2xl border transition-all flex items-center gap-4 ${
                activeKey === m.key ? 'border-slate-900 bg-slate-900 text-white shadow-lg' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}>
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white">
                <Image src={m.img} alt={m.name} fill className="object-contain p-1" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{m.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 02 & 03 — MAIN WORKFLOW */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* INSTRUCTIONS */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-8 space-y-8 shadow-sm">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">02 — Instructions</h4>
          <div className="grid md:grid-cols-2 gap-10">
            <ul className="space-y-4">
              {selected.steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-center text-xs text-slate-600 font-bold italic tracking-tight">
                  <span className="w-5 h-5 rounded bg-slate-100 text-slate-900 flex items-center justify-center text-[9px] font-black shrink-0">{i+1}</span>
                  {step}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center gap-4">
               <div className="p-4 bg-white border border-slate-50 rounded-2xl shadow-inner w-full flex items-center justify-center">
                  <Image src={selected.qr} alt="QR" width={160} height={160} className="object-contain" />
               </div>
               <div className="w-full bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-100">
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">{selected.label}</p>
                    <p className="text-xl font-black text-slate-900">{selected.acc}</p>
                  </div>
                  <button onClick={() => handleCopy(selected.acc)} className="p-3 bg-white rounded-lg shadow-sm hover:bg-slate-900 hover:text-white transition-all">
                    {copied ? <CheckCircle size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* VERIFICATION */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-8 space-y-8 flex flex-col justify-between shadow-xl">
           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">03 — Verification</h4>
              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Amount</label>
                    <input value={amountInput} onChange={(e) => setAmountInput(e.target.value)} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-lg font-black text-white outline-none focus:ring-1 focus:ring-sky-500 transition-all" />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase text-slate-500 ml-1">Reference ID</label>
                    <input value={refInput} onChange={(e) => setRefInput(e.target.value)} className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-sky-500" placeholder="EX: 9K203X..." />
                 </div>
              </div>
           </div>
           <button onClick={handleVerify} disabled={isVerifying} className="w-full py-5 bg-white text-slate-900 text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-sky-400 transition-all shadow-lg flex items-center justify-center gap-2">
              {isVerifying ? <Loader2 className="animate-spin" size={14} /> : <>Verify Handshake <ArrowRight size={14} /></>}
           </button>
        </div>

      </div>
    </div>
  );
}

export default function AxisBillingPage() {
  return (
    <Suspense fallback={<div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-slate-200" size={32} /></div>}>
      <BillingContent />
    </Suspense>
  );
}
