"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Copy, CheckCircle, ArrowRight, ShieldCheck, 
  QrCode, Receipt, Wallet, Loader2 
} from "lucide-react";
import Image from "next/image";

const METHODS = [
  { name: 'M-Pesa', acc: '5925016', key: 'mpesa', label: 'Lipa Namba', img: 'https://storage.googleapis.com/sakura-web/sakurapay/mpesa.jpg', qr: 'https://storage.googleapis.com/sakura-web/sakurapay/mpesa-qr.jpg' },
  { name: 'CRDB Bank', acc: '11863551', key: 'crdb', label: 'Account No.', img: 'https://storage.googleapis.com/sakura-web/sakurapay/crdb.jpg', qr: 'https://storage.googleapis.com/sakura-web/sakurapay/crdb-qr.jpg' },
  { name: 'Mixx by YAS', acc: '17142889', key: 'mixx', label: 'Merchant ID', img: 'https://storage.googleapis.com/sakura-web/sakurapay/mixx.jpg', qr: 'https://storage.googleapis.com/sakura-web/sakurapay/mixx-qr.jpg' },
  { name: 'Selcom Pay', acc: '61051199', key: 'selcom', label: 'Paybill', img: 'https://storage.googleapis.com/sakura-web/sakurapay/selcom.jpg', qr: 'https://storage.googleapis.com/sakura-web/sakurapay/selcom-qr.jpg' }
];

const STEPS: any = {
  mpesa: ["Dial *150*00#", "Select 4 (Payments)", "Select 1 (Paybill)", "Select 1 (M-Pesa)", "Enter Business No: 5925016", "Enter Amount & PIN."],
  crdb: ["Dial *150*03#", "Select Payments", "Select Pay to Bank Account", "Enter Account No: 11863551", "Enter Amount & PIN."],
  mixx: ["Open Network App", "Select Pay to Merchant", "Enter Merchant ID: 17142889", "Enter Amount & Confirm."],
  selcom: ["Dial *150*01#", "Select Pay Bill", "Select Selcom Pay / Masterpass", "Enter Number: 61051199", "Enter Amount & PIN."]
};

function BillingContent() {
  const searchParams = useSearchParams();
  const [activeKey, setActiveKey] = useState<string | null>(searchParams.get("method") || 'mpesa');
  const [copied, setCopied] = useState(false);
  
  // Prefilled Package Data
  const [amount] = useState(searchParams.get("amount") || "");
  const [qty] = useState(searchParams.get("qty") || "");
  const [tier] = useState(searchParams.get("tier") || "");

  const selected = METHODS.find(m => m.key === activeKey);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      
      {/* PACKAGE HANDSHAKE BANNER */}
      {tier && (
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[3rem] flex justify-between items-center shadow-sm">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-emerald-200">
                 <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-1 italic">Handshake Initiated</p>
                <h4 className="text-xl font-black text-slate-900 tracking-tighter">
                  {tier} Package — {Number(qty).toLocaleString()} SMS Credits
                </h4>
              </div>
           </div>
           <div className="text-right">
              <p className="text-3xl font-black text-slate-900 tracking-tighter italic">
                {Number(amount).toLocaleString()} <span className="text-xs uppercase text-slate-300 not-italic">TZS</span>
              </p>
           </div>
        </div>
      )}

      {/* STEP 01: METHOD SELECTION */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">01 — Select Payment Route</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METHODS.map((m) => (
            <button key={m.key} onClick={() => setActiveKey(m.key)}
              className={`p-8 rounded-[2.5rem] border transition-all flex flex-col items-center gap-4 ${
                activeKey === m.key ? 'border-slate-900 bg-[#0F172A] text-white shadow-2xl' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}>
              <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                <Image src={m.img} alt={m.name} fill className="object-cover" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{m.name}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* STEP 02: INSTRUCTIONS & QR */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-[3rem] p-12 space-y-10 shadow-sm">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">02 — Execution Steps</h4>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <ul className="space-y-5">
                {STEPS[activeKey || 'mpesa'].map((step: string, i: number) => (
                  <li key={i} className="flex gap-4 items-start text-xs text-slate-600 font-bold leading-relaxed italic">
                    <span className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5">{i+1}</span>
                    {step}
                  </li>
                ))}
              </ul>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{selected?.label}</p>
                  <p className="text-2xl font-black tracking-tighter text-slate-900">{selected?.acc}</p>
                </div>
                <button onClick={() => copyToClipboard(selected?.acc || '')} 
                  className="p-4 bg-white border border-slate-200 hover:bg-slate-900 hover:text-white rounded-xl transition-all">
                  {copied ? <CheckCircle size={20} className="text-emerald-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-300">
                    <QrCode size={14} /> SCAN TO DISPATCH
                </div>
                <div className="aspect-square bg-white rounded-[2rem] border border-slate-100 p-8 shadow-inner relative overflow-hidden flex items-center justify-center">
                   <Image src={selected?.qr || ''} alt="QR Code" width={200} height={200} className="object-contain grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
            </div>
          </div>
        </div>

        {/* STEP 03: VERIFICATION */}
        <div className="lg:col-span-2 bg-[#0F172A] text-white rounded-[3rem] p-12 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">03 — Verification</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Handshake Amount (TZS)</label>
                <input 
                  type="number" 
                  readOnly={!!amount}
                  value={amount}
                  className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-xl font-black text-white outline-none focus:ring-1 focus:ring-sky-500 transition-all" 
                  placeholder="0.00" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Reference ID</label>
                <input 
                  type="text" 
                  className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-sky-500" 
                  placeholder="EX: 9K203X..." 
                />
              </div>
            </div>
            <button className="w-full py-6 bg-white text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-sky-400 hover:text-white transition-all shadow-xl">
              VERIFY HANDSHAKE <ArrowRight size={16} className="ml-2 inline" />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

// 🟢 Main Export with mandatory Suspense boundary
export default function AxisBillingPage() {
  return (
    <Suspense fallback={
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-slate-200" size={40} />
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">Initializing Payment Gateway...</p>
      </div>
    }>
      <BillingContent />
    </Suspense>
  );
}
