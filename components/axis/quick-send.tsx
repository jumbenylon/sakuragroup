"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, RefreshCw, Upload, FileSpreadsheet, X, User, 
  CheckSquare, Square, Trash2, Filter
} from "lucide-react";
import * as XLSX from "xlsx";

interface Contact {
  phone: string;
  firstName?: string;
  lastName?: string;
  selected: boolean; // New field for selection
}

export function QuickSendWidget() {
  const SENDER_ID = "sakurahost"; 
  const COST_PER_SMS = 25; 

  const [mode, setMode] = useState<'manual' | 'upload'>('manual');
  
  // DATA
  const [manualRecipients, setManualRecipients] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]); // Full list
  const [message, setMessage] = useState("");
  
  // UI
  const [isSending, setIsSending] = useState(false);
  const [log, setLog] = useState<{ type: 'success' | 'error' | 'info', msg: string } | null>(null);
  const [view, setView] = useState<'input' | 'review'>('input'); // Toggle between upload and list view
  
  // EXCEL
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  // METRICS
  const [stats, setStats] = useState({ valid: 0, sms: 1, cost: 0, chars: 0 });

  useEffect(() => {
    // 1. Count Valid & Selected
    let count = 0;
    if (mode === 'manual') {
       count = manualRecipients.split(/[\n, ]+/).filter(n => n.trim().length >= 9).length;
    } else {
       count = contacts.filter(c => c.selected).length;
    }

    // 2. Message Stats
    const len = message.length;
    const segments = len <= 160 ? 1 : Math.ceil(len / 153);
    
    setStats({
        valid: count,
        chars: len,
        sms: segments,
        cost: count * segments * COST_PER_SMS
    });
  }, [message, manualRecipients, contacts, mode]);

  // --- ACTIONS ---

  const insertVariable = (varName: string) => setMessage((prev) => prev + ` {${varName}}`);

  const toggleContact = (index: number) => {
      const newContacts = [...contacts];
      newContacts[index].selected = !newContacts[index].selected;
      setContacts(newContacts);
  };

  const toggleAll = () => {
      const allSelected = contacts.every(c => c.selected);
      setContacts(contacts.map(c => ({ ...c, selected: !allSelected })));
  };

  // --- PARSER ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setFileName(file.name);
    setLog({ type: 'info', msg: `Parsing ${file.name}...` });

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const wb = XLSX.read(event.target?.result, { type: "binary" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" }) as any[][];

        if (!data.length) throw new Error("Empty file");

        // Simple Heuristic: Find 'phone' column
        let phoneCol = -1, firstCol = -1;
        
        // Scan headers
        const headerRow = data[0].map(c => String(c).toLowerCase());
        phoneCol = headerRow.findIndex(c => c.includes("phone") || c.includes("mobile") || c.includes("tel"));
        firstCol = headerRow.findIndex(c => c.includes("first") || c.includes("name"));
        
        // Extract
        const extracted: Contact[] = [];
        const startRow = phoneCol !== -1 ? 1 : 0; // Skip header if found
        
        // Fallback: If no header found, use Col 0 for phone
        if (phoneCol === -1) phoneCol = 0;

        for (let r = startRow; r < data.length; r++) {
            const row = data[r];
            if (!row) continue;
            const raw = String(row[phoneCol] || "").replace(/[^0-9]/g, "");
            if (raw.length >= 9) {
                extracted.push({
                    phone: raw,
                    firstName: firstCol !== -1 ? row[firstCol] : undefined,
                    selected: true // Default to selected
                });
            }
        }

        // Deduplicate
        const unique = Array.from(new Map(extracted.map(item => [item.phone, item])).values());
        
        setContacts(unique);
        setView('review'); // Switch to review view
        setLog({ type: 'success', msg: `Ready: ${unique.length} contacts found.` });

      } catch (err: any) {
        setLog({ type: 'error', msg: `Error: ${err.message}` });
        setFileName(null);
      } finally {
        setIsParsing(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  // --- SEND ---
  const handleSend = async () => {
    setIsSending(true);
    setLog({ type: 'info', msg: `Dispatching to ${stats.valid} recipients...` });

    try {
      let finalContacts = [];
      if (mode === 'manual') {
          finalContacts = manualRecipients.split(/[\n, ]+/).filter(n => n.length >= 9).map(p => ({ phone: p }));
      } else {
          finalContacts = contacts.filter(c => c.selected);
      }

      const response = await fetch("/api/sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contacts: finalContacts,
          message: message,
          senderId: SENDER_ID,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setLog({ type: 'success', msg: `SENT: ${data.info || "Batch Processed"}` });
        if (mode === 'manual') setManualRecipients("");
        setMessage("");
      } else {
        setLog({ type: 'error', msg: `FAIL: ${data.details || "Gateway Error"}` });
      }
    } catch (err: any) {
      setLog({ type: 'error', msg: `NETWORK: ${err.message}` });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full bg-[#050505] border border-white/10 shadow-2xl relative flex flex-col h-full rounded-sm overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-[#0a0a0a] border-b border-white/10 flex">
         <button onClick={() => setMode('manual')} className={`flex-1 py-3 text-[10px] font-black uppercase transition-colors ${mode === 'manual' ? "bg-[#050505] text-white border-t-2 border-pink-500" : "text-slate-600 hover:text-white"}`}>Manual</button>
         <button onClick={() => setMode('upload')} className={`flex-1 py-3 text-[10px] font-black uppercase transition-colors ${mode === 'upload' ? "bg-[#050505] text-white border-t-2 border-pink-500" : "text-slate-600 hover:text-white"}`}>Bulk Import</button>
      </div>

      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        
        {/* RECIPIENT SECTION */}
        <div className="space-y-2">
             <div className="flex justify-between items-center">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    {mode === 'manual' ? "Numbers" : `Contacts (${stats.valid} Selected)`}
                </label>
                {mode === 'upload' && contacts.length > 0 && (
                    <button onClick={() => setView(view === 'input' ? 'review' : 'input')} className="text-[9px] font-bold text-pink-500 hover:underline flex items-center gap-1">
                        {view === 'input' ? <Filter size={10}/> : <Upload size={10}/>}
                        {view === 'input' ? "Review List" : "Re-Upload"}
                    </button>
                )}
             </div>

             {mode === 'manual' ? (
                 <textarea 
                     value={manualRecipients}
                     onChange={(e) => setManualRecipients(e.target.value)}
                     placeholder="2557..., 2556..."
                     className="w-full h-32 bg-[#0a0a0a] border border-white/10 focus:border-pink-500 p-3 text-xs font-mono text-white outline-none resize-none placeholder:text-slate-700"
                 />
             ) : view === 'input' ? (
                 // UPLOAD VIEW
                 <div className="w-full h-32 bg-[#0a0a0a] border border-dashed border-white/20 hover:border-pink-500 transition-colors relative flex flex-col items-center justify-center">
                     {!fileName ? (
                         <>
                             <Upload className="text-slate-600 mb-2" size={20} />
                             <span className="text-[9px] text-slate-500 font-bold uppercase">Drop Excel / CSV</span>
                             <input type="file" ref={fileInputRef} accept=".xlsx,.csv" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                         </>
                     ) : (
                         <div className="text-center">
                            <FileSpreadsheet size={24} className="text-emerald-500 mx-auto mb-2" />
                            <div className="text-xs font-bold text-white mb-2">{fileName}</div>
                            <button onClick={() => {setFileName(null); setContacts([]);}} className="text-[9px] text-rose-500 underline">Remove</button>
                         </div>
                     )}
                     {isParsing && <div className="absolute inset-0 bg-black/90 flex items-center justify-center text-xs text-white">Parsing...</div>}
                 </div>
             ) : (
                 // REVIEW VIEW (The Selection List)
                 <div className="w-full h-64 bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col">
                    <div className="flex justify-between items-center p-2 border-b border-white/10 bg-[#0f0f0f]">
                        <button onClick={toggleAll} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white">
                            <CheckSquare size={12}/> {contacts.every(c=>c.selected) ? "Deselect All" : "Select All"}
                        </button>
                        <span className="text-[9px] text-slate-500">{contacts.length} Total</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {contacts.map((c, i) => (
                            <div key={i} onClick={() => toggleContact(i)} className={`flex items-center justify-between p-2 rounded cursor-pointer border ${c.selected ? "bg-pink-900/10 border-pink-500/20" : "bg-transparent border-transparent hover:bg-white/5"}`}>
                                <div className="flex items-center gap-3">
                                    {c.selected ? <CheckSquare size={14} className="text-pink-500"/> : <Square size={14} className="text-slate-600"/>}
                                    <div className="text-xs font-mono text-white">{c.phone}</div>
                                </div>
                                {c.firstName && <div className="text-[10px] text-slate-500">{c.firstName}</div>}
                            </div>
                        ))}
                    </div>
                 </div>
             )}
        </div>

        {/* MESSAGE COMPOSER */}
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Message</label>
                <div className="flex gap-2">
                    <button onClick={() => insertVariable('firstName')} className="text-[9px] font-bold text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20 hover:bg-pink-500/20">+ Name</button>
                </div>
            </div>
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hello {firstName}..."
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 focus:border-pink-500 p-4 text-sm text-white outline-none resize-none font-mono"
            />
            <div className="text-right text-[9px] font-mono text-slate-500">
                {stats.chars} chars | {stats.sms} SMS | Est. {stats.cost.toLocaleString()} TZS
            </div>
        </div>

        {/* LOGS */}
        {log && <div className={`p-2 text-[10px] font-mono border-l-2 ${log.type === 'error' ? 'border-rose-500 text-rose-400' : 'border-emerald-500 text-emerald-400'}`}>{log.msg}</div>}

        {/* SEND BUTTON */}
        <button 
            onClick={handleSend}
            disabled={isSending || stats.valid === 0 || !message}
            className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {isSending ? <RefreshCw className="animate-spin" size={14}/> : <Send size={14}/>}
            {isSending ? "Processing..." : `Send to ${stats.valid} Contacts`}
        </button>

      </div>
    </div>
  );
}
