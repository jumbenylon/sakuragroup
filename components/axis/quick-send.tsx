"use client";

import React, { useState, useEffect } from "react";
import { 
  Send, CheckCircle2, MessageSquare, 
  RefreshCw, AlertCircle, Terminal, XCircle 
} from "lucide-react";

export function QuickSendWidget() {
  // CRITICAL: Sender ID strictly set to lowercase as per Beem approval
  const SENDER_ID = "sakurahost";
  
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // LOGS: Stores the real server response
  const [log, setLog] = useState<{ type: 'success' | 'error' | 'info', msg: string } | null>(null);

  // METRICS
  const [charCount, setCharCount] = useState(0);
  const [smsCount, setSmsCount] = useState(1);
  const [validNumbers, setValidNumbers] = useState(0);
  const [cost, setCost] = useState(0);

  const COST_PER_SMS = 25; // TZS

  useEffect(() => {
    const len = message.length;
    setCharCount(len);
    const segments = len <= 160 ? 1 : Math.ceil(len / 153);
    setSmsCount(segments);
    
    // Filter ensures we only count plausible numbers (at least 9 digits)
    const numbers = recipients.split(/[\n, ]+/).filter(n => n.trim().length >= 9);
    setValidNumbers(numbers.length);
    setCost(numbers.length * segments * COST_PER_SMS);
  }, [message, recipients]);

  const handleSend = async () => {
    setIsSending(true);
    setLog({ type: 'info', msg: `Connecting via ${SENDER_ID}...` });

    try {
      const cleanNumbers = recipients
        .split(/[\n, ]+/)
        .map(n => n.trim())
        .filter(n => n.length >= 9);

      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: cleanNumbers,
          message: message,
          senderId: SENDER_ID, // Sending "sakurahost"
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // SUCCESS: Show the gateway message
        setLog({ 
            type: 'success', 
            msg: `GATEWAY: ${data.gateway_response.message} (ID: ${data.gateway_response.request_id})` 
        });
        
        // Optional: Clear form only on success
        setTimeout(() => {
           setMessage("");
           setRecipients("");
        }, 2000);
      } else {
        // FAIL: Show the specific error
        console.error("Gateway Error:", data);
        setLog({ 
            type: 'error', 
            msg: `ERROR: ${data.details || data.error || "Unknown Gateway Failure"}` 
        });
      }
    } catch (err: any) {
      setLog({ type: 'error', msg: `NETWORK FATAL: ${err.message}` });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full bg-[#050505] border border-white/10 shadow-2xl relative flex flex-col h-full">
      
      {/* HEADER */}
      <div className="bg-[#0a0a0a] p-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center text-pink-500 border border-pink-500/20 bg-pink-500/5">
            <MessageSquare size={16} />
          </div>
          <span className="text-xs font-black text-white uppercase tracking-widest">Single Dispatch</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[9px] font-mono font-bold text-emerald-500">LIVE</span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-8 flex-1">
        
        {/* 1. SENDER ID (LOCKED) */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sender ID (Locked)</label>
                <div className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-xs font-bold text-slate-400 flex items-center justify-between cursor-not-allowed">
                    {SENDER_ID}
                    <span className="text-[9px] text-emerald-600 bg-emerald-900/20 px-1.5 py-0.5 rounded border border-emerald-500/20">VERIFIED</span>
                </div>
            </div>

            <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Recipients</label>
                    <span className="text-[9px] font-mono text-pink-500">{validNumbers} Valid</span>
                </div>
                <textarea 
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="2557XXXXXXXX, 2556XXXXXXXX"
                    className="w-full h-12 bg-[#0a0a0a] border border-white/10 focus:border-pink-500 p-3 text-xs font-mono text-white outline-none transition-colors resize-none placeholder:text-slate-700"
                />
            </div>
        </div>

        {/* 2. MESSAGE COMPOSER */}
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Content Payload</label>
                <div className="text-[9px] font-mono text-slate-500">
                    <span className={charCount > 160 ? "text-amber-500" : "text-white"}>{charCount}</span> chars 
                    <span className="mx-2">/</span> 
                    <span className="text-white">{smsCount}</span> SMS
                </div>
            </div>
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter campaign message..."
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 focus:border-pink-500 p-4 text-sm text-white outline-none transition-colors resize-none leading-relaxed selection:bg-pink-500/30 font-mono"
            />
        </div>

        {/* 3. DEBUG CONSOLE */}
        {log && (
            <div className={`p-4 border-l-2 text-xs font-mono ${
                log.type === 'success' ? 'bg-emerald-900/10 border-emerald-500 text-emerald-400' :
                log.type === 'error' ? 'bg-rose-900/10 border-rose-500 text-rose-400' :
                'bg-blue-900/10 border-blue-500 text-blue-400'
            }`}>
                <div className="flex gap-2 items-start">
                    <Terminal size={14} className="shrink-0 mt-0.5" />
                    <span className="break-all">{log.msg}</span>
                </div>
            </div>
        )}

        {/* 4. ACTIONS */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Est. Cost</span>
                <span className="text-xl font-mono font-bold text-white">{cost.toLocaleString()} <span className="text-[10px] text-slate-600">TZS</span></span>
            </div>

            <button 
                onClick={handleSend}
                disabled={isSending || validNumbers === 0 || message.length === 0}
                className={`
                    px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 border
                    ${isSending 
                        ? "bg-transparent border-white/10 text-slate-400 cursor-wait" 
                        : "bg-white text-black border-white hover:bg-slate-200"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                {isSending ? (
                    <>
                        <RefreshCw className="animate-spin" size={14} /> Transmitting...
                    </>
                ) : (
                    <>
                        Send Blast <Send size={14} />
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
