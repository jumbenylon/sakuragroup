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
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">
      {/* 🟢 PREVIOUS BILLING CONTENT (Add Funds Section) GOES HERE */}
      {/* ... keeping the UI you approved ... */}

      {/* 4. TRANSACTION HISTORY: THE UNIFIED LEDGER */}
      <section className="space-y-6 pt-10">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
           <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg">
              <Receipt size={18} />
           </div>
           <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Financial Ledger</h3>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Activity</h2>
           </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Reference ID</th>
                <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Network</th>
                <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Amount</th>
                <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] italic text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50/50 transition-all group">
                <td className="p-8">
                  <p className="text-xs font-black text-slate-900 uppercase group-hover:text-sky-500 transition-colors tracking-tight">9K203X82</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">07 Jan, 2026 • 22:45</p>
                </td>
                <td className="p-8 text-xs font-black text-slate-400 uppercase tracking-widest italic">M-Pesa</td>
                <td className="p-8">
                   <p className="text-sm font-black text-slate-900">50,000 <small className="text-[10px] text-slate-300 font-bold ml-1 uppercase tracking-widest">TZS</small></p>
                </td>
                <td className="p-8 text-right">
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                    Approved
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-all opacity-60">
                <td className="p-8 text-xs font-black text-slate-900 uppercase tracking-tight">B829X110</td>
                <td className="p-8 text-xs font-black text-slate-400 uppercase tracking-widest italic">CRDB</td>
                <td className="p-8 text-sm font-black text-slate-900">100,000 TZS</td>
                <td className="p-8 text-right">
                  <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100 animate-pulse">
                    Pending
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
