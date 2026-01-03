"use client";

import React, { useState, useEffect } from "react";
import { Send, Clock, Users, Smartphone, Calculator, Loader2, AlertCircle, Info } from "lucide-react";

// Types
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
  
  // Cost Logic (Sovereign Rates)
  const charCount = message.length;
  // GSM logic: 160 chars = 1 part. Over 160? 153 chars per part.
  const smsCount = charCount <= 160 ? 1 : Math.ceil(charCount / 153);
  const costPerSms = 28; // 28 TZS per part
  const recipientCount = recipients ? recipients.split(',').filter(n => n.trim().length > 0).length : 0;
  const totalCost = smsCount * costPerSms * (recipientCount || 0);

  // [INTEGRATION] Fetch Sender IDs on Load
  useEffect(() => {
    async function fetchSenders() {
      try {
        const res = await fetch("/api/settings/sender-ids");
        if (res.ok) {
          const data = await res.json();
          setSenderIds(data.senderIds || []);
          // Auto-select first approved ID
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
    if (!message || !recipients || !selectedSender) return;
    setSending(true);

    try {
        const res = await fetch("/api/sms/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                senderId: selectedSender,
                recipients: recipients.split(',').map(n => n.trim()), 
                message,
                scheduled: false 
            })
        });

        if (res.ok) {
            alert("Dispatched Successfully!");
            setMessage("");
            setRecipients("");
        } else {
            const err = await res.json();
            alert(`Dispatch Failed: ${err.error || "Check credits."}`);
        }
    } catch (e) {
        alert("System Error");
    } finally {
        setSending(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Compose Campaign</h1>
            <p className="text-xs text-slate-500 mt-1">Create and dispatch high-volume SMS.</p>
          </div>
          <div className="text-right hidden md:block">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Cost</div>
              <div className="text-xl font-mono font-bold text-slate-800">{totalCost.toLocaleString()} TZS</div>
          </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
          
          {/* LEFT: COMPOSER (8 Cols) */}
          <div className="md:col-span-8 space-y-6">
              
              {/* Sender ID Selector */}
              <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">From (Sender ID)</label>
                  {loading ? (
                      <div className="h-10 w-full bg-slate-50 animate-pulse rounded"></div>
                  ) : senderIds.length === 0 ? (
                      <div className="p-3 bg-amber-50 text-amber-700 text-xs rounded border border-amber-100 flex items-center gap-2">
                          <AlertCircle size={14} /> No Active Sender IDs. Go to Settings to request one.
                      </div>
                  ) : (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                          {senderIds.map((sid) => (
                              <button
                                key={sid.id}
                                onClick={() => setSelectedSender(sid.senderId)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded border transition-all ${
                                    selectedSender === sid.senderId
                                    ? "bg-slate-800 text-white border-slate-800 shadow-md"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                                }`}
                              >
                                  {sid.senderId}
                              </button>
                          ))}
                      </div>
                  )}
              </div>

              {/* Recipients Input */}
              <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipients</label>
                      <button className="text-[10px] font-bold text-pink-600 flex items-center gap-1 hover:underline">
                          <Users size={12} /> Select from Groups
                      </button>
                  </div>
                  <textarea 
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="Enter phone numbers separated by comma (e.g. 255712..., 255754...)"
                    className="w-full h-24 bg-slate-50 border border-slate-200 p-4 text-xs font-mono text-slate-800 rounded focus:ring-2 focus:ring-pink-500 outline-none resize-none placeholder:text-slate-400"
                  />
                  <div className="mt-2 text-[10px] text-slate-400 flex justify-end gap-2">
                      <span>{recipientCount} Recipients</span>
                  </div>
              </div>

              {/* Message Body */}
              <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
                   <div className="flex justify-between items-center mb-3">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Content</label>
                      <div className="flex gap-2">
                        <button className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-slate-600">
                            <Info size={12} /> Templates
                        </button>
                        <button className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-slate-600">
                            <Smartphone size={12} /> Preview
                        </button>
                      </div>
                  </div>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full h-40 bg-slate-50 border border-slate-200 p-4 text-sm text-slate-800 rounded focus:ring-2 focus:ring-pink-500 outline-none resize-none placeholder:text-slate-400"
                  />
                  
                  {/* GSM Counter */}
                  <div className="mt-3 flex justify-between items-center border-t border-slate-100 pt-3">
                      <div className="flex gap-4">
                          <div className="text-[10px] font-bold text-slate-500">
                              CHARS: <span className="text-slate-800">{charCount}</span>
                          </div>
                          <div className="text-[10px] font-bold text-slate-500">
                              PARTS: <span className={`text-slate-800 ${smsCount > 1 ? "text-amber-600" : ""}`}>{smsCount}</span>
                          </div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                          GSM Standard Encoding
                      </div>
                  </div>
              </div>
          </div>

          {/* RIGHT: ACTIONS (4 Cols) */}
          <div className="md:col-span-4 space-y-6">
              
              {/* Summary Card */}
              <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Calculator size={16} className="text-pink-500"/> Dispatch Summary
                  </h3>
                  
                  <div className="space-y-4 text-xs relative z-10">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-slate-400">Recipient Count</span>
                          <span className="font-mono font-bold">{recipientCount}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                          <span className="text-slate-400">SMS Parts</span>
                          <span className="font-mono font-bold">x {smsCount}</span>
                      </div>
                      <div className="flex justify-between pt-2">
                          <span className="text-slate-400">Total Estimate</span>
                          <span className="font-mono font-bold text-lg text-emerald-400">{totalCost.toLocaleString()} TZS</span>
                      </div>
                  </div>

                  <button 
                    onClick={handleSend}
                    disabled={sending || !selectedSender || recipientCount === 0}
                    className="w-full mt-8 py-3 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest rounded shadow-lg shadow-pink-900/20 transition-all flex justify-center items-center gap-2"
                  >
                      {sending ? <Loader2 className="animate-spin" size={16}/> : <Send size={16} />}
                      {sending ? "Dispatching..." : "Send Campaign"}
                  </button>
              </div>

              {/* Schedule Option */}
              <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm opacity-75">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                          <Clock size={14} /> Schedule
                      </h3>
                      <div className="w-8 h-4 bg-slate-200 rounded-full relative cursor-not-allowed">
                          <div className="w-4 h-4 bg-slate-400 rounded-full absolute left-0"></div>
                      </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                      Scheduling is currently disabled for your node tier. Upgrade to enable timed dispatch.
                  </p>
              </div>

          </div>
      </div>
    </div>
  );
}
