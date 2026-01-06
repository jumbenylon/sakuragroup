"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, 
  ArrowRight, Loader2, CheckCircle, 
  ChevronDown, Terminal, Crosshair,
  Globe
} from "lucide-react";

// DEPARTMENT CONFIGURATION
const DEPARTMENTS = [
  "General Inquiry",
  "Marketing & Strategy",
  "Software Development",
  "Logistics & Supply Chain",
  "Messaging (Axis/WhatsApp)",
  "Think Loko Podcast",
  "Xhule Learn",
  "Construction & RCS"
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txId, setTxId] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: DEPARTMENTS[0],
    message: "",
    honey: "" // Bot Trap
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "general" 
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Transmission failed.");

      setTxId(data.txId || "TX-" + Math.random().toString(36).substr(2, 9).toUpperCase());
      setSuccess(true);
      setFormData({ name: "", email: "", service: DEPARTMENTS[0], message: "", honey: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#020202] min-h-screen text-white selection:bg-emerald-500 font-sans">
      
      <section className="relative pt-40 pb-24 px-8 min-h-screen flex items-center">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-start relative z-10">

          {/* LEFT FLANK: HIERARCHY LOCKED */}
          <div className="space-y-12">
            
            {/* 1. HEADER & DESCRIPTION */}
            <div>
              <p className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase mb-8 flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                System Online
              </p>
              <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.85] tracking-tighter mb-8">
                Initiate<br/>Uplink.
              </h1>
              <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
                Whether you need industrial logistics, digital infrastructure, or creative strategy — 
                Sakura Group is ready to engineer the solution.
              </p>
            </div>

            {/* 2. CONTACT MATRIX */}
            <div className="space-y-8 border-t border-white/5 pt-8">
              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm group-hover:border-emerald-500/50 transition-colors">
                  <Phone className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Secure Lines</h3>
                  <p className="text-xl font-mono text-white group-hover:text-emerald-400 transition-colors">+255 753 930 000</p>
                  <p className="text-xl font-mono text-white group-hover:text-emerald-400 transition-colors">+255 782 020 840</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm group-hover:border-emerald-500/50 transition-colors">
                  <MapPin className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Global HQ Coordinates</h3>
                  <p className="text-lg text-white font-light leading-relaxed">
                    Mwenge, TRA Road<br/>
                    Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>
            </div>

            {/* 3. LIVE SATELLITE LOCK (Visual Fix) */}
            <div className="w-full h-72 bg-white/5 border border-white/10 rounded-sm relative overflow-hidden group">
               {/* Replaced broken iframe with High-Res Satellite Image */}
               <motion.div 
                 initial={{ scale: 1.4, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 2.5, ease: "circOut" }}
                 className="w-full h-full relative"
               >
                 <Image
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop"
                    alt="Satellite View"
                    fill
                    className="object-cover opacity-60 grayscale contrast-125 hover:opacity-80 transition-opacity duration-700"
                 />
               </motion.div>

               {/* HUD Overlay */}
               <div className="absolute inset-0 pointer-events-none border border-white/5 z-10">
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Crosshair size={14} className="text-emerald-500 animate-spin-slow" />
                    <span className="text-[8px] font-mono text-emerald-500 tracking-widest uppercase">Target Locked</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/10">
                    <span className="text-[8px] font-mono text-white tracking-widest uppercase">Live Feed • TRA Rd</span>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT FLANK: THE TERMINAL (Form) */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
            
            <AnimatePresence mode="wait">
              {success ? (
                // SUCCESS STATE
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-emerald-500" size={40} />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase mb-2">Transmission Locked.</h3>
                  <p className="text-slate-400 font-light mb-8">Our team is decrypting your request.</p>
                  
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-sm font-mono text-sm text-emerald-400 tracking-widest">
                    TXID: {txId}
                  </div>
                  
                  <button 
                    onClick={() => setSuccess(false)}
                    className="mt-12 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                // INPUT FORM
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-2 mb-8 opacity-50">
                    <Terminal size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Secure Input Terminal v4.0</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Identity</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="FULL NAME"
                        className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/10 focus:border-emerald-500 focus:outline-none transition-colors font-light"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="EMAIL ADDRESS"
                        className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/10 focus:border-emerald-500 focus:outline-none transition-colors font-light"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Department</label>
                    <div className="relative">
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-white/20 py-4 text-white appearance-none focus:border-emerald-500 focus:outline-none transition-colors font-light uppercase cursor-pointer"
                      >
                        {DEPARTMENTS.map(dept => (
                          <option key={dept} value={dept} className="bg-black text-slate-300">{dept}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Briefing</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="TELL US ABOUT YOUR PROJECT..."
                      rows={4}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/10 focus:border-emerald-500 focus:outline-none transition-colors font-light resize-none"
                      required
                    />
                  </div>

                  {/* HONEYPOT (Hidden) */}
                  <input type="text" name="honey" value={formData.honey} onChange={handleChange} className="hidden" />

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                      ERROR: {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-white text-black py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : "Transmit Request"} 
                    {!loading && <ArrowRight size={16} />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </main>
  );
}
