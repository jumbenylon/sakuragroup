"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Terminal, Code2, Cpu, GitBranch, Zap, Shield, 
  BookOpen, ChevronRight, Check, Copy, MessageCircle 
} from "lucide-react";

/**
 * Axis Portal - Easy Integrations (Developers)
 * Design Ethos: Radical Simplicity + Technical Purity.
 * Logic: Inherits PortalLayout sidebar for seamless navigation.
 */

// --- INTERNAL COMPONENTS ---

const CodeBlock = () => {
  const [activeTab, setActiveTab] = useState<'node' | 'php'>('node');
  const [copied, setCopied] = useState(false);

  const SNIPPETS = {
    node: `const axios = require('axios');\n\nawait axios.post('https://api.sakuragroup.co.tz/v1/sms', {\n  to: '+255754123456',\n  sender_id: 'SAKURA',\n  message: 'Your OTP is 8492'\n}, {\n  headers: { 'Authorization': 'Bearer sk_live_...' }\n});`,
    php: `<?php\n\n$client = new GuzzleHttp\\Client();\n$res = $client->request('POST', 'https://api.sakuragroup.co.tz/v1/sms', [\n  'json' => [\n    'to' => '+255754123456',\n    'sender_id' => 'SAKURA',\n    'message' => 'Your OTP is 8492'\n  ],\n  'headers' => ['Authorization' => 'Bearer sk_live_...']\n]);`
  };

  const copyCode = () => {
    navigator.clipboard.writeText(SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-white/10 p-6 font-mono text-xs md:text-sm shadow-2xl overflow-hidden relative group">
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex gap-4 items-center">
           <button onClick={() => setActiveTab('node')} className={`text-[10px] font-bold tracking-widest transition-colors ${activeTab === 'node' ? 'text-emerald-400' : 'text-slate-500'}`}>NODE.JS</button>
           <button onClick={() => setActiveTab('php')} className={`text-[10px] font-bold tracking-widest transition-colors ${activeTab === 'php' ? 'text-blue-400' : 'text-slate-500'}`}>PHP</button>
           <div className="h-4 w-[1px] bg-white/10 mx-2" />
           <button onClick={copyCode} className="text-slate-500 hover:text-white transition-colors">
             {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
           </button>
        </div>
      </div>
      <div className="relative z-10 overflow-x-auto custom-scrollbar">
        <pre className="text-slate-300 leading-relaxed">
          {SNIPPETS[activeTab]}
        </pre>
      </div>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
    </div>
  );
};

const DocCard = ({ title, icon: Icon, desc }: { title: string, icon: any, desc: string }) => (
  <div className="group p-6 bg-white border border-slate-200 rounded-xl hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
        <Icon size={20} />
      </div>
      <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
    </div>
    <h3 className="text-slate-900 font-bold mb-2">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </div>
);

export default function AxisPortalDevelopers() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HERO SECTION */}
      <section className="grid lg:grid-cols-2 gap-12 items-center bg-slate-900 rounded-[2rem] p-12 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
            <Terminal size={14} />
            <span className="font-mono text-[9px] font-black uppercase tracking-widest">Axis Gateway Uplink</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
            Build Faster.<br/>
            <span className="text-slate-500">Break Nothing.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base mb-10 max-w-md leading-relaxed font-medium">
            Connect to Vodacom, Tigo, Airtel, and Halotel via a single API node. 
            99.99% Uptime SLA guaranteed for mission-critical infrastructure.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-widest rounded-lg hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
              Refresh API Keys
            </button>
            <button className="px-6 py-3 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-lg hover:bg-white/5 transition-all">
              Full Documentation
            </button>
          </div>
        </div>

        <div className="relative z-10">
          <CodeBlock />
        </div>
      </section>

      {/* 2. RESOURCES GRID */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Documentation Modules</h2>
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DocCard title="Messaging API" icon={Code2} desc="Programmatic SMS and WhatsApp alerts." />
          <DocCard title="Webhooks" icon={GitBranch} desc="Real-time delivery events and inbound triggers." />
          <DocCard title="Verify API" icon={Shield} desc="Sub-3 second 2FA and OTP infrastructure." />
          <DocCard title="SDK Guides" icon={BookOpen} desc="Native libraries for Node, PHP, and Python." />
        </div>
      </section>

      {/* 3. TECH SPECS & STATUS */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 p-10 rounded-[2rem] shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 uppercase italic flex items-center gap-2">
            <Zap size={20} className="text-emerald-500" /> Infrastructure Specs
          </h3>
          <p className="text-slate-500 text-sm mb-10 leading-relaxed">
            Axis handles over 5,000 transactions per second across 3 availability zones in Tanzania. 
            All traffic is encrypted via TLS 1.3 for enterprise security.
          </p>
          <div className="grid grid-cols-2 gap-8 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400">
             <div className="flex items-center gap-3"><Check size={14} className="text-emerald-500" /> Sub-200ms Latency</div>
             <div className="flex items-center gap-3"><Check size={14} className="text-emerald-500" /> Auto-Scaling Queues</div>
             <div className="flex items-center gap-3"><Check size={14} className="text-emerald-500" /> IPv6 Ready</div>
             <div className="flex items-center gap-3"><Check size={14} className="text-emerald-500" /> Webhook Retries</div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] flex flex-col">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Real-Time Node Status</h4>
          <div className="space-y-6 flex-1">
            <StatusRow label="API Gateway" />
            <StatusRow label="SMS Relay (Vodacom)" />
            <StatusRow label="SMS Relay (Tigo)" />
            <StatusRow label="WhatsApp Bridge" />
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
            <span className="text-[9px] font-black text-slate-400 uppercase">System Uptime</span>
            <span className="text-[10px] font-black text-emerald-600">99.99%</span>
          </div>
        </div>
      </section>

    </div>
  );
}

// --- SUB-COMPONENTS ---
function StatusRow({ label }: { label: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Operational</span>
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
