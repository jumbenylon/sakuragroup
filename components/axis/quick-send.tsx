"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, CheckCircle2, MessageSquare, 
  RefreshCw, AlertCircle, Terminal, Upload, FileSpreadsheet, X 
} from "lucide-react";
import * as XLSX from "xlsx";

export function QuickSendWidget() {
  const SENDER_ID = "sakurahost"; // Locked ID
  
  // TABS: 'manual' or 'upload'
  const [mode, setMode] = useState<'manual' | 'upload'>('manual');
  
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [log, setLog] = useState<{ type: 'success' | 'error' | 'info', msg: string } | null>(null);

  // EXCEL STATE
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // METRICS
  const [charCount, setCharCount] = useState(0);
  const [smsCount, setSmsCount] = useState(1);
  const [validNumbers, setValidNumbers] = useState(0);
  const [cost, setCost] = useState(0);

  const COST_PER_SMS = 25; // TZS

  // METRICS CALCULATOR
  useEffect(() => {
    const len = message.length;
    setCharCount(len);
    const segments = len <= 160 ? 1 : Math.ceil(len / 153);
    setSmsCount(segments);
    
    const numbers = recipients.split(/[\n, ]+/).filter(n => n.trim().length >= 9);
    setValidNumbers(numbers.length);
    setCost(numbers.length * segments * COST_PER_SMS);
  }, [message, recipients]);

  // --- EXCEL PARSER LOGIC ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setFileName(file.name);
    setLog({ type: 'info', msg: `Parsing file: ${file.name}...` });

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const bstr = event.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        
        // Grab first sheet
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        
        // Convert to JSON (Array of Arrays) to grab first column safely
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][];
        
        // Extract numbers from FIRST COLUMN (Index 0), skipping header if needed
        // Heuristic: If row 0 looks like a header (text), skip it.
        let extractedNumbers: string[] = [];
        
        data.forEach((row) => {
           if (row[0]) {
               const val = String(row[0]).replace(/[^0-9]/g, ""); // Keep only digits
               if (val.length >= 9) extractedNumbers.push(val);
           }
        });

        // Remove duplicates
        const uniqueNumbers = Array.from(new Set(extractedNumbers));
        
        // Update State
        setRecipients(uniqueNumbers.join(", "));
        setLog({ type: 'success', msg: `FILE LOADED: Extracted ${uniqueNumbers.length} unique numbers.` });
      } catch (err) {
        console.error(err);
        setLog({ type: 'error', msg: "FAILED: Could not parse Excel file. Ensure 1st column contains numbers." });
        setFileName(null);
      } finally {
        setIsParsing(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const clearFile = () => {
      setFileName(null);
      setRecipients("");
      if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- SEND LOGIC ---
  const handleSend = async () => {
    setIsSending(true);
    setLog({ type: 'info', msg: `Connecting via ${SENDER_ID}...` });

    try {
      const cleanNumbers = recipients.split(/[\n, ]+/).map(n => n.trim()).filter(n => n.length >= 9);

      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: cleanNumbers,
          message: message,
          senderId: SENDER_ID,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLog({ 
            type: 'success', 
            msg: `GATEWAY: ${data.gateway_response.message} (ID: ${data.gateway_response.request_id})` 
        });
        setTimeout(() => {
           if(mode === 'manual') setRecipients(""); // Don't clear excel lists automatically, safer to keep
           setMessage("");
        }, 3000);
      } else {
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
      
      {/* HEADER WITH TABS */}
      <div className="bg-[#0a0a0a] p-0 flex justify-between items-center border-b border-white/10">
        <div className="flex">
            <button 
                onClick={() => setMode('manual')}
                className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-colors ${
                    mode === 'manual' ? "bg-[#050505] text-white border-r border-white/10" : "text-slate-500 hover:text-white"
                }`}
            >
                Manual Entry
            </button>
            <button 
                 onClick={() => setMode('upload')}
                 className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${
                    mode === 'upload' ? "bg-[#050505] text-white border-x border-white/10" : "text-slate-500 hover:text-white"
                }`}
            >
                Excel Import <FileSpreadsheet size={14} />
            </button>
        </div>
        <div className="flex items-center gap-2 px-4">
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-[9px] font-mono font-bold text-emerald-500">READY</span>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-8 flex-1">
        
        {/* 1. SENDER ID */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sender ID</label>
                <div className="w-full bg-[#0a0a0a] border border-white/10 p-3 text-xs font-bold text-slate-400 flex items-center justify-between cursor-not-allowed">
                    {SENDER_ID}
                    <span className="text-[9px] text-emerald-600 bg-emerald-900/20 px-1.5 py-0.5 rounded border border-emerald-500/20">LOCKED</span>
                </div>
            </div>

            <div className="md:col-span-2 space-y-2">
                <div className="flex justify-between">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Target Audience</label>
                    <span className="text-[9px] font-mono text-pink-500">{validNumbers} Valid Contacts</span>
                </div>
                
                {/* CONDITIONAL INPUT: MANUAL VS UPLOAD */}
                {mode === 'manual' ? (
                    <textarea 
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="Paste numbers here (255...)"
                        className="w-full h-24 bg-[#0a0a0a] border border-white/10 focus:border-pink-500 p-3 text-xs font-mono text-white outline-none transition-colors resize-none placeholder:text-slate-700"
                    />
                ) : (
                    <div className="w-full h-24 bg-[#0a0a0a] border border-dashed border-white/20 hover:border-pink-500 transition-colors relative flex flex-col items-center justify-center group">
                        {!fileName ? (
                            <>
                                <Upload className="text-slate-600 group-hover:text-pink-500 mb-2" size={20} />
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Drop Excel File Here</span>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    accept=".xlsx, .xls, .csv"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-900/20 rounded flex items-center justify-center text-emerald-500">
                                    <FileSpreadsheet size={16} />
                                </div>
                                <div className="text-left">
                                    <span className="block text-xs font-bold text-white">{fileName}</span>
                                    <span className="text-[9px] text-emerald-500 font-mono uppercase">Processed Successfully</span>
                                </div>
                                <button onClick={clearFile} className="p-2 hover:bg-white/10 rounded-full text-slate-500 hover:text-rose-500 transition-colors ml-4">
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                        {isParsing && <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-xs text-white font-mono">Reading Data...</div>}
                    </div>
                )}
            </div>
        </div>

        {/* 2. MESSAGE COMPOSER */}
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Payload</label>
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
                        <RefreshCw className="animate-spin" size={14} /> Processing
                    </>
                ) : (
                    <>
                        Send {mode === 'upload' ? 'Bulk' : ''} Blast <Send size={14} />
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
