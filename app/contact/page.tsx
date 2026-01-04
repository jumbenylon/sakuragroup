"use client";

import React, { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, ShieldCheck, Phone } from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- FORM COMPONENT ---
const ContactForm = () => {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "general";
  
  const [activeTab, setActiveTab] = useState(initialService);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [txId, setTxId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
      honey: formData.get("website"), // Honeypot field
      service: activeTab,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setTxId(result.txId);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto lg:mx-0">
      <AnimatePresence mode="wait">
        {status !== "success" ? (
          <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
            {/* Service Selection Tabs */}
            <div className="flex flex-wrap gap-3 mb-12">
              {["logistics", "agency", "industrial", "general"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeTab === id ? `border-yellow-500 bg-yellow-500/10 text-white` : "border-white/5 text-slate-500 hover:border-white/20"
                  }`}
                >
                  {id}
                </button>
              ))}
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* HONEYPOT - Hidden from humans */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid md:grid-cols-2 gap-6">
                <input name="name" required placeholder="Full Name" className="w-full bg-[#080d1a] border border-white/5 p-4 text-white outline-none rounded-xl focus:border-yellow-500/50 transition-colors" />
                <input name="email" required type="email" placeholder="Email" className="w-full bg-[#080d1a] border border-white/5 p-4 text-white outline-none rounded-xl focus:border-yellow-500/50 transition-colors" />
              </div>
              <input name="company" placeholder="Company (Optional)" className="w-full bg-[#080d1a] border border-white/5 p-4 text-white outline-none rounded-xl" />
              <textarea name="message" required rows={5} placeholder="Inquiry Details" className="w-full bg-[#080d1a] border border-white/5 p-4 text-white outline-none rounded-xl resize-none" />

              {status === "error" && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">! Transmission Interrupted</p>}

              <button disabled={status === "submitting"} className="w-full py-6 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-4 disabled:opacity-50">
                {status === "submitting" ? "Encrypting..." : "Secure Transmission"} <Send size={16} />
              </button>
            </form>
          </motion.div>
        ) : (
          /* SUCCESS RECEIPT */
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white text-black p-12 rounded-sm relative shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-2 bg-[radial-gradient(circle,_transparent_70%,_white_70%)] bg-[length:15px_15px] -translate-y-1" />
            <div className="flex justify-between items-start mb-12">
              <div><h3 className="font-black text-2xl tracking-tighter">SAKURA.</h3><p className="text-[10px] font-mono text-slate-500">TRANSMISSION OK</p></div>
              <p className="text-[10px] font-mono">ID: {txId}</p>
            </div>
            <div className="space-y-4 mb-12 border-y border-slate-100 py-8 font-mono text-xs">
              <div className="flex justify-between"><span>DEPT</span><span className="font-bold">{activeTab.toUpperCase()}</span></div>
              <div className="flex justify-between"><span>STATUS</span><span className="font-bold text-emerald-600">RECEIVED</span></div>
            </div>
            <p className="text-sm italic text-center mb-8">"Your data packet has been successfully routed to Sakura HQ."</p>
            <button onClick={() => setStatus("idle")} className="w-full text-[10px] font-black uppercase tracking-[0.3em] border-b border-black pb-2">New Inquiry</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN PAGE WRAPPER ---
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050912] text-white">
      <GlobalNavbar />
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">LET'S BUILD <br/><span className="text-slate-500 italic font-light">FUTURE.</span></h1>
            <div className="space-y-6">
              <div className="flex gap-4"><MapPin className="text-yellow-500" /> <span className="text-slate-400 text-sm">Dar es Salaam, TZ</span></div>
              <div className="flex gap-4"><Phone className="text-yellow-500" /> <span className="text-slate-400 text-sm">+255 (0) 700 000 000</span></div>
              <div className="flex gap-4"><ShieldCheck className="text-emerald-500" /> <span className="text-slate-400 text-sm">ISO Certified Intake</span></div>
            </div>
          </div>
          <Suspense fallback={<div className="text-white font-mono text-xs animate-pulse">BOOTING INTAKE SYSTEM...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
      <GlobalFooter />
    </main>
  );
}