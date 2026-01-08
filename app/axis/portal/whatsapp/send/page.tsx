"use client";

import React, { useState } from "react";
import { MessageCircle, ShieldCheck, Zap, Send, Phone, Info, Globe, Loader2, MessageSquare } from "lucide-react";

export default function WhatsAppPage() {
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("WELCOME_MESSAGE");

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
            <ShieldCheck size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">Live Meta Protocol</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic">WA Blast.</h1>
        </div>
      </header>

      <div className="grid xl:grid-cols-12 gap-12 items-start">
        <div className="xl:col-span-7 space-y-10">
          {/* Template Selection */}
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 space-y-8 shadow-sm">
             <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] italic">01 — Select Approved Template</h3>
             <div className="grid md:grid-cols-1 gap-4">
                <button className="p-8 rounded-[2rem] border-2 border-slate-900 bg-slate-50 text-left flex justify-between items-center group transition-all">
                   <div>
                     <h4 className="text-sm font-black text-slate-900 uppercase italic mb-1">WELCOME_MESSAGE</h4>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Utility • SW_TZ Language</p>
                   </div>
                   <Zap size={18} className="text-amber-500" />
                </button>
             </div>
          </div>

          {/* Database Selection */}
          <div className="bg-[#0F172A] rounded-[3rem] p-12 text-white space-y-10 shadow-2xl relative overflow-hidden">
             <div className="relative z-10 space-y-10">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 italic underline underline-offset-8 decoration-slate-800">02 — Global Database Selection</label>
                 <select className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-sm font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-sky-500 appearance-none">
                   <option className="bg-slate-900">All Network Nodes (14,200 Contacts)</option>
                 </select>
               </div>
               <button className="w-full py-8 bg-white text-slate-900 text-[11px] font-black uppercase tracking-[0.4em] rounded-[2rem] hover:bg-emerald-400 transition-all flex justify-center items-center gap-4 shadow-xl">
                 <MessageSquare size={20} /> Launch Meta Blast
               </button>
             </div>
             <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[120px]" />
          </div>
        </div>

        {/* 📱 PERFECT PHONE MOCKUP */}
        <div className="xl:col-span-5 sticky top-24">
           <div className="mx-auto w-[360px] h-[720px] bg-slate-900 rounded-[4.5rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-slate-800 relative">
              {/* Internal Screen */}
              <div className="w-full h-full bg-[#E5DDD5] rounded-[3rem] overflow-hidden relative flex flex-col">
                 <div className="h-24 bg-[#075E54] p-6 flex items-end gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"><Globe size={20}/></div>
                    <div>
                      <p className="text-white font-black text-xs">Sakura Axis Verified</p>
                      <p className="text-emerald-200 text-[9px] font-bold">Online</p>
                    </div>
                 </div>
                 
                 <div className="flex-1 p-4 space-y-4 pt-10">
                    <div className="bg-white rounded-2xl rounded-tl-none p-5 shadow-sm max-w-[85%] relative animate-in slide-in-from-left duration-700">
                       <p className="text-[11px] text-slate-800 leading-relaxed font-medium">
                         Habari! Hii ni taarifa rasmi kutoka Sakura Axis. Node yako imeanza kufanya kazi kwenye mfumo wa Meta...
                       </p>
                       <span className="text-[8px] text-slate-400 font-bold block text-right mt-2 uppercase">12:30 PM ✓✓</span>
                    </div>
                 </div>
              </div>
              {/* Physical Hardware Buttons */}
              <div className="absolute -left-3 top-24 w-1 h-12 bg-slate-700 rounded-r-lg" />
              <div className="absolute -right-3 top-32 w-1 h-20 bg-slate-700 rounded-l-lg" />
           </div>
           <p className="text-center mt-8 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Industrial Preview Interface</p>
        </div>
      </div>
    </div>
  );
}
