"use client";
import { useState } from "react";

export default function OffloadRequestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRequest = async () => {
    if (confirmation !== "OFFLOAD") return;
    setLoading(true);
    
    const res = await fetch("/api/offload", { 
      method: "DELETE",
      body: JSON.stringify({ reason: "User requested offload" })
    });

    if (res.ok) {
      window.location.reload(); // Refresh to show pending status
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl scale-in-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Offload Infrastructure?</h2>
        <p className="text-gray-500 text-sm mb-8">This will queue your account for admin approval. Access will be restricted during the offloading window.</p>
        
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Type "OFFLOAD" to confirm</label>
          <input 
            type="text" 
            placeholder="OFFLOAD"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
          />
          
          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 px-4 py-3 font-bold text-gray-400 hover:text-black transition-colors">CANCEL</button>
            <button 
              onClick={handleRequest}
              disabled={confirmation !== "OFFLOAD" || loading}
              className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-bold text-sm disabled:opacity-30 hover:bg-red-700 transition-all"
            >
              {loading ? "PROCESSING..." : "CONFIRM REQUEST"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
