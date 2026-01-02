"use client";

import React, { useState, useEffect } from "react";
import { 
  Send, CheckCircle2, MessageSquare, 
  RefreshCw, AlertCircle, Sparkles 
} from "lucide-react";

export function QuickSendWidget() {
  const [senderId, setSenderId] = useState("sakurahost"); 
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
    const numbers = recipients.split(/[\n, ]+/).filter(n => n.trim().length >= 9);
    setValidNumbers(numbers.length);
    setCost(numbers.length * segments * COST_PER_SMS);
  }, [message, recipients]);

  const handleSend = async () => {
    setIsSending(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const cleanNumbers = recipients.split(/[\n, ]+/).map(n => n.trim()).filter(n => n.length >= 9);
      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: cleanNumbers,
          message: message,
          senderId: senderId === "REQUEST_NEW" ? undefined : senderId, 
        }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
          setRecipients("");
        }, 4000);
      } else {
        setStatus("error");
        setErrorMsg(data.details || data.error || "Gateway Error");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network Error: Could not reach server.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#0B1120] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <div className="bg-[#0f172a] p-4 flex justify-between items-center border-b border-white/5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/10">
            <MessageSquare size={16} />
          </div>
          <span className="text-xs font-black text-white uppercase tracking-widest">Quick Dispatch</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
           <span className="text-[10px] font-mono text-pink-400">GATEWAY READY</span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-6 relative z-10">
        
        {/* 1. SENDER ID & RECIPIENTS */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">From</label>
                <select 
                    value={senderId}
                    onChange={(e) => setSenderId(e.target.value)}
                    className="w-full bg-[#050912] border border-white/10 rounded-xl p-3 text-sm font-bold text-white outline-none focus:border-pink-500 transition-colors appearance-none"
                >
                    <option value="SAKURA">SAKURA</option>
                    <option value="INFO">INFO</option>
                </select>
            </div>

            <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recipients</label>
                    <span className="text-[10px] font-mono text-pink-400">{validNumbers} Valid Numbers</span>
                </div>
                <textarea 
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="Paste numbers here (e.g. 255753...)"
                    className="w-full h-12 bg-[#050912] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-300 outline-none focus:border-pink-500 transition-colors resize-none placeholder:text-slate-700"
                />
            </div>
        </div>

        {/* 2. MESSAGE COMPOSER */}
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Message Content</label>
                <div className="text-[10px] font-mono text-slate-400">
                    <span className={charCount > 160 ? "text-amber-500 font-bold" : "text-white"}>{charCount}</span> chars 
                    <span className="mx-2">|</span> 
                    <span className="text-white font-bold">{smsCount}</span> SMS unit(s)
                </div>
            </div>
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={5}
                className="w-full bg-[#050912] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-pink-500 transition-colors resize-none leading-relaxed selection:bg-pink-500/30"
            />
        </div>

        {/* 3. FLIGHT CHECK & ACTION */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Estimated Cost</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-mono font-bold text-white">{cost.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">TZS</span>
                </div>
            </div>

            <button 
                onClick={handleSend}
                disabled={isSending || validNumbers === 0 || message.length === 0}
                className={`
                    relative px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-3
                    ${isSending 
                        ? "bg-purple-500/20 text-purple-400 cursor-wait" 
                        : status === "success"
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0B1120]"
                            : status === "error"
                                ? "bg-rose-600 text-white"
                                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/40 hover:scale-105"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100
                `}
            >
                {isSending ? (
                    <>
                        <RefreshCw className="animate-spin" size={18} /> Sending...
                    </>
                ) : status === "success" ? (
                    <>
                        <CheckCircle2 size={18} /> Sent!
                    </>
                ) : status === "error" ? (
                    <>
                        <AlertCircle size={18} /> Retry?
                    </>
                ) : (
                    <>
                        Send Blast <Send size={18} />
                    </>
                )}
            </button>
        </div>
        
        {/* Error Message Display */}
        {errorMsg && (
            <div className="mt-2 text-xs text-rose-500 font-mono text-center">
                {errorMsg}
            </div>
        )}
      </div>
    </div>
  );
}
