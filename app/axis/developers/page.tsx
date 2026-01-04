"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Code2, 
  Webhook, 
  ShieldAlert, 
  Zap, 
  Copy, 
  Check, 
  Server,
  Lock
} from "lucide-react";

import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- CODE SNIPPETS ---
const SNIPPETS = {
  node: `const axios = require('axios');

// 1. Configure the Payload
const payload = {
  to: '+255753930000',
  from: 'SAKURA',
  body: 'Your verification code is: 8492'
};

// 2. Dispatch via Axis Gateway
async function sendSMS() {
  try {
    const res = await axios.post(
      'https://api.axis.sakuragroup.co.tz/v1/sms', 
      payload,
      { headers: { 'Authorization': 'Bearer sk_live_...' } }
    );
    console.log('Transmission ID:', res.data.txId);
  } catch (error) {
    console.error('Dispatch Failed:', error.message);
  }
}

sendSMS();`,

  php: `<?php

$curl = curl_init();

$payload = json_encode([
  "to" => "+255753930000",
  "from" => "SAKURA",
  "body" => "Your verification code is: 8492"
]);

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.axis.sakuragroup.co.tz/v1/sms",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => $payload,
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer sk_live_...",
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
echo $response;
`
};

export default function AxisDevelopersPage() {
  const [activeTab, setActiveTab] = useState<'node' | 'php'>('node');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(SNIPPETS[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-[#020617] text-white selection:bg-emerald-500 font-sans min-h-screen">
      <GlobalNavbar />

      {/* 1. HERO: API FIRST */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/10 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4">
            <Terminal size={12} className="text-emerald-400" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">v1.4 Stable</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Build with<br/>
            <span className="text-slate-500">Confidence.</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
            A developer-first messaging API engineered for reliability. 
            Connect your stack to the Tanzanian telecom grid in minutes, not weeks.
          </p>

          <div className="flex justify-center gap-6 pt-6">
             <Link href="/contact" className="px-8 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all rounded-sm">
               Get API Keys
             </Link>
             <Link href="https://github.com/sakuragroup" target="_blank" className="px-8 py-3 border border-white/10 text-slate-300 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all rounded-sm">
               View Documentation
             </Link>
          </div>
        </div>
      </section>

      {/* 2. THE TERMINAL (Code Demo) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Context */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black uppercase italic">
                Integration is <span className="text-emerald-500">Trivial.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Whether you run a monolithic PHP backend or a serverless Node.js stack, Axis speaks your language. 
                Our RESTful endpoints are strictly typed, versioned, and idempotent.
              </p>
            </div>

            <div className="space-y-6">
               {[
                 { icon: <Zap size={20} className="text-yellow-400" />, title: "Sub-Second Latency", desc: "Direct routes to MNOs ensuring <2s delivery." },
                 { icon: <Webhook size={20} className="text-pink-500" />, title: "Real-time Webhooks", desc: "Get delivery reports (DLR) pushed to your endpoint instantly." },
                 { icon: <ShieldAlert size={20} className="text-emerald-500" />, title: "Sandbox Environment", desc: "Test freely without spending credits or triggering real SMS." }
               ].map((feat, i) => (
                 <div key={i} className="flex gap-4 p-4 border border-white/5 rounded-lg bg-white/[0.02]">
                    <div className="mt-1">{feat.icon}</div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide text-white">{feat.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{feat.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* RIGHT: Code Block */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            
            <div className="relative bg-[#0b1121] rounded-lg border border-white/10 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex gap-4 text-[10px] font-mono font-bold text-slate-400">
                  <button 
                    onClick={() => setActiveTab('node')} 
                    className={`hover:text-white transition-colors ${activeTab === 'node' ? 'text-emerald-400' : ''}`}
                  >
                    INDEX.JS
                  </button>
                  <button 
                    onClick={() => setActiveTab('php')} 
                    className={`hover:text-white transition-colors ${activeTab === 'php' ? 'text-blue-400' : ''}`}
                  >
                    SEND.PHP
                  </button>
                </div>
                <button onClick={copyCode} className="text-slate-500 hover:text-white transition-colors">
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-xs leading-relaxed">
                  <code className="text-slate-300">
                    {SNIPPETS[activeTab]}
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECURITY & COMPLIANCE */}
      <section className="py-20 px-6 border-t border-white/5 bg-[#0b1121]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Architecture & Compliance</h2>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Built for the paranoid</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
           <div className="p-8 bg-[#020617] border border-white/10 rounded-xl text-center hover:border-emerald-500/30 transition-colors">
              <Lock className="w-10 h-10 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">TLS 1.3 Encryption</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All data in transit is encrypted via TLS 1.3. We enforce strict HTTPS on all API endpoints.
              </p>
           </div>
           
           <div className="p-8 bg-[#020617] border border-white/10 rounded-xl text-center hover:border-blue-500/30 transition-colors">
              <Server className="w-10 h-10 text-blue-500 mx-auto mb-6" />
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">Local Data Residency</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Primary data nodes are compliant with Tanzania's Personal Data Protection Act (PDPA).
              </p>
           </div>

           <div className="p-8 bg-[#020617] border border-white/10 rounded-xl text-center hover:border-pink-500/30 transition-colors">
              <Code2 className="w-10 h-10 text-pink-500 mx-auto mb-6" />
              <h3 className="text-sm font-black uppercase tracking-widest mb-4">99.9% Uptime SLA</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our distributed gateway architecture ensures message dispatch even during carrier outages.
              </p>
           </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-32 text-center">
        <h2 className="text-2xl font-black uppercase text-slate-500 tracking-widest mb-8">Ready to Build?</h2>
        <div className="flex justify-center gap-6">
           <Link href="/contact" className="inline-flex items-center gap-2 px-12 py-5 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all rounded-sm shadow-lg shadow-emerald-900/20">
             Get API Keys <Code2 size={16} />
           </Link>
        </div>
      </section>

      <GlobalFooter />
    </main>
  );
}