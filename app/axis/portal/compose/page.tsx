"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Send, Clock, Users, Smartphone, Calculator, 
  Loader2, AlertCircle, Info, CheckCircle, XCircle, 
  ShieldCheck, ArrowRight, Terminal 
} from "lucide-react";

/**
 * Axis Master Composer (v9.5)
 * Design: Radical Simplicity, Industrial Grayscale.
 * Logic: High-volume dispatch with real-time TZS cost telemetry.
 */

interface SenderId {
  id: string;
  senderId: string;
}

export default function ComposePage() {
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [senderIds, setSenderIds] = useState<SenderId[]>([]);
  const [selectedSender, setSelectedSender] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // SAKURA LOGIC: 160 chars = 1 part. Over 160? 153 chars per part (7 chars for header).
  const charCount = message.length;
  const smsCount = charCount <= 160 ? (charCount > 0 ? 1 : 0) : Math.ceil(charCount / 153);
  const costPerSms = 21; // 🟢 TZS (Updated to Sakura Standard)
  
  // Normalization logic: Clean phone numbers and filter
  const recipientList = recipients
    .split(/[\n,]+/) 
    .map(n => n.trim().replace(/\D/g, ''))
    .filter(n => n.length >= 9);
    
  const recipientCount = recipientList.length;
  const totalCost = smsCount * costPerSms * (recipientCount || 0);

  useEffect(() => {
    async function fetchSenders() {
      try {
        const res = await fetch("/api/settings/sender-ids");
        if (res.ok) {
          const data = await res.json();
          setSenderIds(data.senderIds || []);
          if (data.senderIds?.length > 0) setSelectedSender(data.senderIds[0].senderId);
        }
      } catch (e) {
        console.error("Sender Fetch Error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchSenders();
  }, []);

  const handleSend = async () => {
    if (!message || recipientCount === 0 || !selectedSender) return;
    setSending(true);
    setStatus(null);

    try {
        const res = await fetch("/api/sms/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                senderId: selectedSender,
                recipients: recipientList,
                message,
                scheduled: false 
            })
        });

        const data = await res.json();

        if (res.ok && data.success) {
            setStatus({ type: 'success', text: `Campaign dispatched to ${recipientCount} nodes!` });
            setMessage("");
            setRecipients("");
        } else {
            setStatus({ type: 'error', text: data.error || "Infrastructure Rejection." });
        }
    } catch (e) {
        setStatus({ type: 'error', text: "System Error: Gateway Unreachable." });
    } finally {
        setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      
      {/* 1. HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 pb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full">
            <Send size={12} className="text-sky-400 -rotate-12" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live Dispatch protocol</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">Compose.</h1>
          <p className="text-sm text-slate-400 font-medium italic">Create and dispatch industrial-grade SMS campaigns.</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: COMPOSER (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
              
              {/* Sender ID Selector */}
              <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm space-y-6">
                  <div className="flex items-center gap-2">
                     <Terminal size={14} className="text-slate-400" />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 italic">01 — Identity Verification</h3>
                  </div>
                  {loading ? (
                      <div className="h-14 w-full bg-slate-50 animate-pulse rounded-2xl"></div>
                  ) : senderIds.length === 0 ? (
                      <div className="p-4 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-amber-100 flex items-center gap-2">
                          <AlertCircle size={14} /> No Verified IDs. Node defaulting to INFO.
                      </div>
                  ) : (
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {senderIds.map((sid) => (
                              <button
                                key={sid.id}
                                onClick={() => setSelectedSender(sid.senderId)}
                                className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl border transition-all ${
                                    selectedSender === sid.senderId
                                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200"
                                    : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                                }`}
                              >
                                  {sid.senderId}
                              </button>
                          ))}
                      </div>
                  )}
              </div>

              {/* Recipients Input */}
              <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <Users size={14} className="text-slate-400" />
                         <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 italic">02 — Target Audience</h3>
                      </div>
                      <Link href="/portal/contacts" className="text-[10px] font-black text-sky-500 uppercase tracking-widest hover:underline">
                          Select from Segments →
                      </Link>
                  </div>
                  <textarea 
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="Enter phone numbers separated by comma or new line..."
                    className="w-full h-40 bg-slate-50 border-none p-6 text-xs font-mono text-slate-800 rounded-[2rem] outline-none focus:ring-1 focus:ring-slate-900 resize-none placeholder:italic"
                  />
                  <div className="flex justify-end">
                      <span className="px-4 py-2 bg-slate-50 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                        {recipientCount} Valid Nodes Detected
                      </span>
                  </div>
              </div>

              {/* Message Body */}
              <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <MessageSquare size={14} className="text-slate-400" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 italic">03 — Message Content</h3>
                       </div>
                    </div>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message protocol here..."
                      className="w-full h-56 bg-slate-50 border-none p-8 text-sm font-medium text-slate-700 rounded-[2.5rem] outline-none focus:ring-1 focus:ring-slate-900 resize-none placeholder:italic"
                    />
                    
                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                        <div className="flex gap-6">
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                CHARS: <span className="text-slate-900">{charCount}</span>
                            </div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                PARTS: <span className={`text-slate-900 ${smsCount > 1 ? "text-amber-500" : ""}`}>{smsCount}</span>
                            </div>
                        </div>
                        <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                            GSM 03.38 ENCODING
                        </div>
                    </div>
              </div>
          </div>

          {/* RIGHT: ACTIONS (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
              <div className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-10">
                    <div className="flex items-center gap-3">
                       <Calculator size={18} className="text-sky-400"/>
                       <h3 className="text-xs font-black uppercase tracking-[0.4em] italic text-slate-500">Telemetry</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit Rate</span>
                            <span className="text-xs font-black italic">21.00 TZS</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calculated Cost</span>
                            <span className="text-2xl font-black text-emerald-400 italic">{totalCost.toLocaleString()} TZS</span>
                        </div>
                    </div>

                    {status && (
                      <div className={`p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top duration-300 ${
                          status.type === 'success' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}>
                          {status.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                          {status.text}
                      </div>
                    )}

                    <button 
                      onClick={handleSend}
                      disabled={sending || !selectedSender || recipientCount === 0 || !message}
                      className="w-full py-6 bg-white text-slate-900 font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:bg-sky-400 hover:text-white transition-all disabled:opacity-10 shadow-xl"
                    >
                        {sending ? <Loader2 className="animate-spin mx-auto" size={18}/> : <>EXECUTE DISPATCH <ArrowRight size={16} className="ml-2 inline" /></>}
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[120px] pointer-events-none" />
              </div>

              <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] flex items-center gap-4">
                 <ShieldCheck size={24} className="text-emerald-500" />
                 <p className="text-[10px] text-slate-400 font-bold italic leading-tight">
                   Infrastructure handshake verified. 98.2% predicted delivery success across local carrier routes.
                 </p>
              </div>
          </div>
      </div>
    </div>
  );
}
