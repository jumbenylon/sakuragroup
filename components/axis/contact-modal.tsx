"use client";

import { motion } from "framer-motion";
import { X, Send } from "lucide-react";

export const ContactSpecialist = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg p-12 rounded-sm relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Speak to Axis</h3>
        <p className="text-slate-500 text-sm mb-10 font-light">Tell us about your organization. An Axis specialist will reach out within 2 hours.</p>

        <form className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-pink-500">Organization Name</label>
            <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm focus:border-pink-500 outline-none transition-all" placeholder="e.g. Arusha SACCO Ltd" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Person</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none" placeholder="Name" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone (WhatsApp)</label>
              <input type="tel" className="w-full bg-white/5 border border-white/10 p-4 text-white text-sm outline-none" placeholder="255..." />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Interest</label>
            <select className="w-full bg-white/5 border border-white/10 p-4 text-white/60 text-sm outline-none appearance-none cursor-pointer">
              <option>Bulk SMS Infrastructure</option>
              <option>WhatsApp Business Integration</option>
              <option>Enterprise Multi-Channel Solutions</option>
            </select>
          </div>

          <button type="submit" className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all flex items-center justify-center gap-4">
            Request Specialist Call <Send size={14} />
          </button>
        </form>
      </div>
    </motion.div>
  );
};
