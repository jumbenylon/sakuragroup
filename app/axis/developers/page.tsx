"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Code2, Cpu, GitBranch, Zap, Shield, BookOpen, ChevronRight, Check, Copy, Server, Lock, MessageCircle } from "lucide-react";

// --- COMPONENTS ---

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
    <div className="bg-[#0f172a] rounded-xl border border-white/10 p-6 font-mono text-xs md:text-sm shadow-2xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex gap-4">
           <button onClick={() => setActiveTab('node')} className={`hover:text-white transition-colors ${activeTab === 'node' ? 'text-emerald-400' : 'text-slate-500'}`}>NODE</button>
           <button onClick={() => setActiveTab('php')} className={`hover:text-white transition-colors ${activeTab === 'php' ? 'text-blue-400' : 'text-slate-500'}`}>PHP</button>
           <button onClick={copyCode} className="text-slate-500 hover:text-white">
             {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
           </button>
        </div>
      </div>
      <div className="relative z-10 overflow-x-auto">
        <pre className="text-slate-300 leading-relaxed">
          {SNIPPETS[activeTab]}
        </pre>
      </div>
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] pointer-events-none" />
    </div>
  );
};

const DocCard = ({ title, icon: Icon, desc }: { title: string, icon: any, desc: string }) => (
  <Link href="#" className="group p-6 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-500 group-hover:text-emerald-400 transition-colors">
        <Icon size={20} />
      </div>
      <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-white font-bold mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{desc}</p>
  </Link>
);

const AxisSubNav = () => (
    <nav className="border-b border-white/5 bg-[#050a14]/90 backdrop-blur fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/axis" className="text-xs font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-2">
            <MessageCircle size={14} /> Back to Product
          </Link>
          <div className="flex gap-6 text-xs font-bold text-slate-400">
            <Link href="#" className="hover:text-white">API Ref</Link>
            <Link href="#" className="hover:text-white">SDKs</Link>
            <Link href="#" className="hover:text-white">Status</Link>
          </div>
        </div>
    </nav>
);

export default function AxisDevelopersPage() {
  return (
    <main className="min-h-screen bg-[#050a14] text-white selection:bg-emerald-500 selection:text-black font-sans">
      <AxisSubNav />

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Terminal size={14} />
              <span className="font-mono text-[10px] uppercase tracking-widest">Axis Developer Network</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              Build Faster.<br/>
              <span className="text-slate-500">Break Nothing.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
              Direct carrier connections to Vodacom, Tigo, Airtel, and Halotel. 
              Single API for SMS, USSD, and WhatsApp. 99.99% Uptime SLA.
            </p>
            <div className="flex gap-4">
              <Link href="/axis/portal" className="px-8 py-3 bg-emerald-600 text-black font-bold rounded-md hover:bg-emerald-500 transition-colors">
                Get API Key
              </Link>
              <Link href="#" className="px-8 py-3 border border-white/20 text-white font-bold rounded-md hover:bg-white/10 transition-colors">
                Read the Docs
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CodeBlock />
          </motion.div>
        </div>
      </section>

      {/* RESOURCES GRID */}
      <section className="py-20 px-6 border-t border-white/5 bg-[#02040a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-12">Documentation Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DocCard title="Messaging API" icon={Code2} desc="Send SMS, OTPs, and WhatsApp alerts programmatically." />
            <DocCard title="Webhooks" icon={GitBranch} desc="Real-time delivery reports and incoming message events." />
            <DocCard title="Verify API" icon={Shield} desc="2FA and phone number verification logic pre-built." />
            <DocCard title="Guides" icon={BookOpen} desc="Tutorials for Node.js, Python, PHP, and Go." />
          </div>
        </div>
      </section>

      {/* TECH SPECS */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">Built for Scale</h3>
            <p className="text-slate-400 mb-8">
              Our infrastructure is distributed across 3 availability zones. We handle 5,000+ TPS (Transactions Per Second) without breaking a sweat.
            </p>
            <ul className="space-y-4 font-mono text-sm text-emerald-400">
              <li className="flex gap-3"><Zap size={16} /> Sub-200ms Latency</li>
              <li className="flex gap-3"><Cpu size={16} /> Auto-Scaling Queues</li>
              <li className="flex gap-3"><Shield size={16} /> TLS 1.3 Encryption</li>
            </ul>
          </div>
          <div className="flex-1 p-8 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">System Status</h4>
            <div className="space-y-4">
              {['API Gateway', 'SMS Relay (Vodacom)', 'SMS Relay (Tigo)', 'WhatsApp Bridge'].map((service, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-white">{service}</span>
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    OPERATIONAL
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
