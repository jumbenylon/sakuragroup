"use client";

import React, { useState, useEffect } from "react";
import { 
  Send, Users, CheckCircle2, 
  MessageSquare, RefreshCw 
} from "lucide-react";

export function QuickSendWidget() {
  const [senderId, setSenderId] = useState("SAKURA"); 
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // METRICS
  const [charCount, setCharCount] = useState(0);
  const [smsCount, setSmsCount] = useState(1);
  const [validNumbers, setValidNumbers] = useState(0);
  const [cost, setCost] = useState(0);

  const COST_PER_SMS = 25; // TZS

  // Logic: Calculate segments and cost
  useEffect(() => {
    const len = message.length;
    setCharCount(len);
    
    // GSM-7 Standard: 160 chars = 1 SMS. If > 160, it uses 153 chars per segment.
    const segments = len <= 160 ? 1 : Math.ceil(len / 153);
    setSmsCount(segments);

    // Count numbers (split by comma, newline, or space)
    const numbers = recipients.split(/[\n, ]+/).filter(n => n.length >= 10);
    setValidNumbers(numbers.length);

    setCost(numbers.length * segments * COST_PER_SMS);
  }, [message, recipients]);

  const handleSend = async () => {
    setIsSending(true);
    setStatus("idle");

    try {
      // Clean the numbers (remove spaces, ensure valid format)
      const cleanNumbers = recipients
        .split(/[\n, ]+/)
        .map(n => n.trim())
        .filter(n => n.length >= 10);

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
        // Reset form after delay
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
          setRecipients("");
        }, 3000);
      } else {
        console.error("Send Failed", data);
        setStatus("error");
        alert(`Failed: ${data.details || "Check Gateway Logs"}`);
      }
    } catch (err) {
      console.error("Network Error", err);
      alert("Network Error: Could not reach the server.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-[#0B1120] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* HEADER */}
      <div className="bg-[#0f172a] p-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <MessageSquare size={16} />
          </div>
          <span className="text-xs font-black text-white uppercase tracking-widest">Quick Dispatch</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[10px] font-mono text-emerald-500">GATEWAY READY</span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-6">
        
        {/* 1. SENDER ID & RECIPIENTS */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">From (Sender ID)</label>
                <select 
                    value={senderId}
                    onChange={(e) => setSenderId(e.target.value)}
                    className="w-full bg-[#050912] border border-white/10 rounded-xl p-3 text-sm font-bold text-white outline-none focus:border-emerald-500 transition-colors appearance-none"
                >
                    <option value="SAKURA">SAKURA</option>
                    <option value="INFO">INFO</option>
                </select>
            </div>

            <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recipients</label>
                    <span className="text-[10px] font-mono text-emerald-500">{validNumbers} Valid Numbers</span>
                </div>
                <textarea 
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="Paste numbers here (comma or new line)..."
                    className="w-full h-12 bg-[#050912] border border-white/10 rounded-xl p-3 text-xs font-mono text-slate-300 outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-slate-700"
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
                className="w-full bg-[#050912] border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-emerald-500 transition-colors resize-none leading-relaxed"
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
                        ? "bg-emerald-500/20 text-emerald-500 cursor-wait" 
                        : status === "success"
                            ? "bg-emerald-500 text-[#0B1120]"
                            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                `}
            >
                {isSending ? (
                    <>
                        <RefreshCw className="animate-spin" size={18} /> Processing
                    </>
                ) : status === "success" ? (
                    <>
                        <CheckCircle2 size={18} /> Sent Successfully
                    </>
                ) : (
                    <>
                        Send Blast <Send size={18} />
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
