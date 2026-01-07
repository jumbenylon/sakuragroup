"use client";

import React, { useState, useEffect } from "react";
import { Send, Clock, Users, Smartphone, Calculator, Loader2, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";

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
  const [status, setStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Cost Logic
  const charCount = message.length;
  // GSM logic: 160 chars = 1 part. Over 160? 153 chars per part (7 chars reserved for concatenation header).
  const smsCount = charCount <= 160 ? 1 : Math.ceil(charCount / 153);
  const costPerSms = 28; // TZS
  
  // 🟢 IMPROVED SPLIT LOGIC: Handles commas AND newlines
  const recipientList = recipients
    .split(/[\n,]+/) // Regex: Split by newline OR comma
    .map(n => n.trim())
    .filter(n => n.length > 0);
    
  const recipientCount = recipientList.length;
  const totalCost = smsCount * costPerSms * (recipientCount || 0);

  // Fetch Sender IDs
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
    setStatus(null); // Clear previous status

    try {
        const res = await fetch("/api/sms/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                senderId: selectedSender,
                recipients: recipientList, // Send the cleaned array
                message,
                scheduled: false 
            })
        });

        const data = await res.json();

        if (res.ok && data.success) {
            setStatus({ type: 'success', text: `Campaign dispatched to ${recipientCount} contacts!` });
            setMessage("");
            setRecipients("");
        } else {
            setStatus({ type: 'error', text: data.error || "Dispatch Failed. Check credits or connection." });
        }
    } catch (e) {
        setStatus({ type: 'error', text: "System Error: Could not reach gateway." });
    } finally {
        setSending(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Compose Campaign</h1>
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
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">From (Sender ID)</label>
                  {loading ? (
                      <div className="h-10 w-full bg-slate-50 animate-pulse rounded"></div>
                  ) : senderIds.length === 0 ? (
                      <div className="p-3 bg-amber-50 text-amber-700 text-xs rounded border border-amber-100 flex items-center gap-2">
                          <AlertCircle size={14} /> No Active Sender IDs. System defaults may apply.
                      </div>
                  ) : (
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {senderIds.map((sid) => (
                              <button
                                key={sid.id}
                                onClick={() => setSelectedSender(sid.senderId)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg border transition-all ${
                                    selectedSender === sid.senderId
                                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                  {sid.senderId}
                              </button>
                          ))}
                      </div>
                  )}
              </div>

              {/* Recipients Input */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipients</label>
                      <button className="text-[10px] font-bold text-pink-600 flex items-center gap-1 hover:underline">
                          <Users size={12} /> Select from Groups
                      </button>
                  </div>
                  <textarea 
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="Enter phone numbers separated by comma or new line..."
                    className="w-full h-32 bg-slate-50 border border-slate-200 p-4 text-xs font-mono text-slate-800 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none resize-none placeholder:text-slate-400"
                  />
                  <div className="mt-2 text-[10px] text-slate-400 flex justify-end gap-2">
                      <span>{recipientCount} Valid Recipients</span>
                  </div>
              </div>

              {/* Message Body */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Message Content</label>
                       <div className="flex gap-2">
                         <button className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-slate-600">
                             <Info size={12} /> Templates
                         </button>
                       </div>
                    </div>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full h-48 bg-slate-50 border border-slate-200 p-4 text-sm text-slate-800 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none resize-none placeholder:text-slate-400"
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
                            GSM 03.38 Encoding
                        </div>
                    </div>
              </div>
          </div>

          {/* RIGHT: ACTIONS (4 Cols) */}
          <div className="md:col-span-4 space-y-6">
              
              {/* Summary Card */}
              <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
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

                  {/* STATUS BANNER (Replaces Alert) */}
                  {status && (
                    <div className={`mt-6 p-3 rounded-lg text-xs font-bold flex items-center gap-2 ${
                        status.type === 'success' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>
                        {status.type === 'success' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {status.text}
                    </div>
                  )}

                  <button 
                    onClick={handleSend}
                    disabled={sending || !selectedSender || recipientCount === 0 || !message}
                    className="w-full mt-6 py-4 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-pink-900/20 transition-all flex justify-center items-center gap-2 relative z-10"
                  >
                      {sending ? <Loader2 className="animate-spin" size={16}/> : <Send size={16} />}
                      {sending ? "Dispatching..." : "Send Campaign"}
                  </button>
              </div>

              {/* Schedule Option */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm opacity-60">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                          <Clock size={14} /> Schedule
                      </h3>
                      <div className="w-8 h-4 bg-slate-100 rounded-full relative cursor-not-allowed">
                          <div className="w-4 h-4 bg-slate-300 rounded-full absolute left-0"></div>
                      </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                      Time-delayed dispatch is disabled in Developer Mode.
                  </p>
              </div>

          </div>
      </div>
    </div>
  );
}
