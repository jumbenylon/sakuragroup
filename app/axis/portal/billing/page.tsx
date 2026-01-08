"use client";

import React, { useState } from "react";
import { Copy, CheckCircle, ArrowRight, ShieldCheck, QrCode } from "lucide-react";
import Image from "next/image";

const METHODS = [
  { name: 'M-Pesa', acc: '5925016', key: 'mpesa', label: 'Lipa Namba', img: 'https://storage.googleapis.com/sakura-web/sakurapay/mpesa.jpg', qr: 'https://storage.googleapis.com/sakura-web/sakurapay/mpesa-qr.jpg' },
  { name: 'CRDB Bank', acc: '11863551', key: 'crdb', label: 'Account No.', img: 'https://storage.googleapis.com/sakura-web/sakurapay/crdb.jpg', qr: 'https://storage.googleapis.com/sakura-web/sakurapay/crdb-qr.jpg' },
  { name: 'Mixx by YAS', acc: '17142889', key: 'mixx', label: 'Merchant ID', img: 'https://storage.googleapis.com/sakura-web/sakurapay/mixx.jpg', qr: 'https://storage.googleapis.com/sakura-web/mixx-qr.jpg' },
  { name: 'Selcom Pay', acc: '61051199', key: 'selcom', label: 'Paybill', img: 'https://storage.googleapis.com/sakura-web/sakurapay/selcom.jpg', qr: 'https://storage.googleapis.com/sakura-web/selcom-qr.jpg' }
];

const STEPS: any = {
  mpesa: ["Dial *150*00#", "Select 4 (Payments)", "Select 1 (Paybill)", "Select 1 (M-Pesa)", "Enter Business No: 5925016", "Enter Amount & PIN."],
  crdb: ["Dial *150*03#", "Select Payments", "Select Pay to Bank Account", "Enter Account No: 11863551", "Enter Amount & PIN."],
  mixx: ["Open Network App", "Select Pay to Merchant", "Enter Merchant ID: 17142889", "Enter Amount & Confirm."],
  selcom: ["Dial *150*01#", "Select Pay Bill", "Select Selcom Pay / Masterpass", "Enter Number: 61051199", "Enter Amount & PIN."]
};

export default function AxisBillingPage() {
  const [activeKey, setActiveKey] = useState<string | null>('mpesa');
  const [copied, setCopied] = useState(false);
  const selected = METHODS.find(m => m.key === activeKey);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F172A] text-white rounded-full text-[9px] font-black uppercase tracking-widest">
            <ShieldCheck size={12} className="text-sky-400" /> SAKURAPAY SECURE NODE
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">Add Funds.</h1>
          <p className="text-sm text-slate-400 font-medium">Top-up your Axis node for industrial messaging.</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-right min-w-[280px]">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Node Balance</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">24,500 <small className="text-xs uppercase text-slate-300 not-italic font-bold">TZS</small></p>
        </div>
      </header>

      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">01 — SELECT PAYMENT ROUTE</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METHODS.map((m) => (
            <button key={m.key} onClick={() => setActiveKey(m.key)}
              className={`p-8 rounded-[2.5rem] border transition-all flex flex-col items-center gap-4 ${
                activeKey === m.key ? 'border-slate-900 bg-[#0F172A] text-white shadow-2xl' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}>
              <Image src={m.img} alt={m.name} width={48} height={48} className="rounded-xl" />
              <span className="text-[10px] font-black uppercase tracking-widest">{m.name}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-[3rem] p-12 space-y-10 min-h-[500px]">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">02 — INSTRUCTIONS</h4>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <ul className="space-y-4">
                {STEPS[activeKey || 'mpesa'].map((step: string, i: number) => (
                  <li key={i} className="flex gap-4 items-start text-xs text-slate-600 font-bold leading-relaxed italic">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5">{i+1}</span>
                    {step}
                  </li>
                ))}
              </ul>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{selected?.label}</p>
                  <p className="text-2xl font-black tracking-tighter text-slate-900">{selected?.acc}</p>
                </div>
                <button onClick={() => {navigator.clipboard.writeText(selected?.acc || ''); setCopied(true); setTimeout(()=>setCopied(false), 2000)}} 
                  className="p-4 bg-white border border-slate-200 hover:bg-slate-900 hover:text-white rounded-2xl transition-all">
                  {copied ? <CheckCircle size={20} className="text-emerald-500" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-300">
                    <QrCode size={12} /> SCAN TO PAY
                </div>
                <div className="aspect-square bg-white rounded-[2rem] border border-slate-100 p-6 shadow-inner relative overflow-hidden group">
                   <Image src={selected?.qr || ''} alt="QR Code" fill className="p-8 object-contain" />
                </div>
                <p className="text-[9px] text-center text-slate-400 font-bold italic">Scan with any Mobile Bank or MNO App</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#0F172A] text-white rounded-[3rem] p-12 space-y-10 shadow-2xl">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">03 — VERIFICATION</h4>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Amount Paid (TZS)</label>
              <input type="number" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-lg font-black text-white outline-none focus:ring-1 focus:ring-sky-500" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Reference ID</label>
              <input type="text" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-sky-500" placeholder="EX: 9K203X..." />
            </div>
          </div>
          <button className="w-full py-6 bg-white text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-sky-400 transition-all shadow-xl">
            VERIFY DEPOSIT <ArrowRight size={16} className="ml-2 inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
