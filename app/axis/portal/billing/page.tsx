"use client";

import React, { useState } from "react";
import { 
  CreditCard, CheckCircle, Copy, ArrowRight, 
  Wallet, Loader2, ShieldCheck, Receipt, Globe 
} from "lucide-react";
import Image from "next/image";

/**
 * Axis Unified Billing Center (v7.5)
 * Design: Radical Simplicity, Industrial Grayscale.
 * Logic: SakuraPay manual gateway for verified Axis nodes.
 */

const METHODS = [
  { name: 'M-Pesa', acc: '5925016', key: 'mpesa', label: 'Lipa Namba', img: 'https://storage.googleapis.com/sakura-web/mpesa.jpg' },
  { name: 'CRDB Bank', acc: '11863551', key: 'crdb', label: 'Account No.', img: 'https://storage.googleapis.com/sakura-web/crdb.jpg' },
  { name: 'Mixx by YAS', acc: '17142889', key: 'mixx', label: 'Merchant ID', img: 'https://storage.googleapis.com/sakura-web/mixx.jpg' },
  { name: 'Selcom Pay', acc: '61051199', key: 'selcom', label: 'Paybill', img: 'https://storage.googleapis.com/sakura-web/selcom.jpg' }
];

export default function AxisBillingPage() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const selected = METHODS.find(m => m.key === activeKey);

  const copyRef = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 1. HEADER: Financial Telemetry */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full">
            <ShieldCheck size={12} className="text-sky-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">SakuraPay Secure Node</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">Add Funds.</h1>
          <p className="text-sm text-slate-400 font-medium">Top-up your Axis node for industrial messaging.</p>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-right min-w-[280px]">
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">Node Balance</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">
            24,500 <small className="text-xs uppercase text-slate-300 not-italic font-bold">TZS</small>
          </p>
        </div>
      </header>

      {/* 2. STEP 1: Method Selection (Tesla Style) */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">01 — Select Payment Route</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METHODS.map((m) => (
            <button 
              key={m.key}
              onClick={() => setActiveKey(m.key)}
              className={`p-8 rounded-[2.5rem] border transition-all flex flex-col items-center gap-4 group ${
                activeKey === m.key 
                ? 'border-slate-900 bg-slate-900 text-white shadow-2xl' 
                : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden grayscale brightness-110 group-hover:grayscale-0 transition-all">
                <Image src={m.img} alt={m.name} fill className="object-cover" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${activeKey === m.key ? 'text-white' : 'text-slate-900'}`}>{m.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. STEP 2 & 3: Handshake Grid */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Instructions Card */}
        <div className="lg:col-span-3 bg-slate-50 border border-slate-100 rounded-[3rem] p-12 flex flex-col justify-between min-h-[400px]">
          <div className="space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">02 — Instructions</h4>
            
            {!activeKey ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-200 border border-slate-50">
                   <Globe size={32} />
                </div>
                <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Awaiting selection...</p>
              </div>
            ) : (
              <div className="space-y-10 animate-in slide-in-from-left-4 duration-500">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{selected?.label}</p>
                    <p className="text-3xl font-black tracking-tighter text-slate-900">{selected?.acc}</p>
                  </div>
                  <button 
                    onClick={() => copyRef(selected?.acc || '')} 
                    className="p-5 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl transition-all"
                  >
                    {copied ? <CheckCircle size={20} className="text-emerald-500" /> : <Copy size={20} />}
                  </button>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm italic">
                  Complete the payment on your phone. Ensure the amount matches your intended top-up exactly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Verification Form */}
        <div className="lg:col-span-2 bg-white border border-slate-900 rounded-[3rem] p-12 shadow-2xl shadow-slate-200">
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">03 — Verification</h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Amount Paid (TZS)</label>
                <input 
                   type="number" 
                   className="w-full p-5 bg-slate-50 border-none rounded-2xl text-lg font-black text-slate-900 focus:ring-1 focus:ring-slate-900 outline-none placeholder:text-slate-200" 
                   placeholder="0.00" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2">Reference ID</label>
                <input 
                   type="text" 
                   className="w-full p-5 bg-slate-50 border-none rounded-2xl text-xs font-black uppercase tracking-widest text-slate-900 focus:ring-1 focus:ring-slate-900 outline-none placeholder:text-slate-200" 
                   placeholder="EX: 9K203X..." 
                />
              </div>
            </div>
          </div>
          
          <button 
            disabled={!activeKey || loading}
            className="w-full py-6 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-black transition-all disabled:opacity-10 mt-10 shadow-xl"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" size={18} /> : <>Verify Deposit <ArrowRight size={16} className="ml-2 inline" /></>}
          </button>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY */}
      <section className="space-y-6 pt-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic text-center">Infrastructure Transaction History</h3>
        <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Handshake ID</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-8">
                  <p className="text-xs font-black text-slate-900 uppercase">9K203X82</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">M-Pesa • 07 Jan, 2026</p>
                </td>
                <td className="p-8">
                   <p className="text-sm font-black text-slate-900">50,000 <small className="text-[9px] text-slate-400 font-bold uppercase tracking-widest ml-1">TZS</small></p>
                </td>
                <td className="p-8 text-right">
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                    Approved
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
