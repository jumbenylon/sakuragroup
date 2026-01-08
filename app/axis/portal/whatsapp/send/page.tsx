"use client";

import React, { useState } from "react";
import { MessageCircle, Globe, Send, ShieldCheck, Loader2 } from "lucide-react";

/**
 * WhatsApp Blast - Meta Live Sync Node
 * Logic: Auto-pulls approved templates from Meta as per whatsapp.php.
 */
export default function WhatsAppPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <header className="flex justify-between items-end border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
            <ShieldCheck size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">Live Meta Protocol</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">WA Blast.</h1>
        </div>
      </header>

      <div className="grid xl:grid-cols-12 gap-12 items-start">
        {/* Configuration Area */}
        <div className="xl:col-span-7 space-y-10">
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 space-y-8">
             <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic">01 — Select Approved Template</h3>
             <div className="grid md:grid-cols-2 gap-4">
                {/* Simulated Template Item */}
                <button className="p-6 rounded-3xl border-2 border-slate-900 bg-slate-50 text-left space-y-2 group transition-all">
                   <h4 className="text-xs font-black text-slate-900 uppercase italic">Welcome_Message</h4>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Utility • SW_TZ</p>
                </button>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 shadow-2xl">
             <div className="space-y-2">
               <label className="text-[9px] font-black uppercase text-slate-500 tracking-widest ml-1">02 — Global Database Selection</label>
               <select className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest outline-none">
                 <option>All Network Nodes (14,200 Contacts)</option>
               </select>
             </div>
             
             <button className="w-full py-6 bg-white text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-400 transition-all flex justify-center items-center gap-3">
               <MessageCircle size={18} /> Launch Meta Blast
             </button>
          </div>
        </div>

        {/* Live Preview Terminal */}
        <div className="xl:col-span-5 sticky top-24">
           <div className="bg-[#e5ddd5] w-full h-[650px] rounded-[4rem] border-8 border-slate-900 p-8 shadow-2xl relative overflow-hidden flex flex-col pt-16">
              <div className="absolute top-0 inset-x-0 h-16 bg-white/90 backdrop-blur-md flex items-center px-8 border-b border-slate-200">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                 <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest italic">Axis Verified Gateway</span>
              </div>
              
              {/* WhatsApp Bubble Aesthetic */}
              <div className="bg-white rounded-3xl rounded-tl-none p-5 max-w-[85%] shadow-sm space-y-2 animate-in slide-in-from-left duration-700">
                 <p className="text-xs text-slate-700 leading-relaxed font-medium">
                   Habari! Hii ni taarifa rasmi kutoka Sakura Axis. Node yako imeanza kufanya kazi...
                 </p>
                 <span className="text-[8px] text-slate-300 font-black uppercase block text-right">12:30 PM</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
