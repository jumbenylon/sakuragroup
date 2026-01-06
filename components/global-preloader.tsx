"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const BRAND_MAP: Record<string, { word: string; color: string }> = {
  "/": { word: "Karibu", color: "#FFFFFF" },
  "/axis": { word: "tuchati", color: "#10b981" },
  "/logistics": { word: "nitume", color: "#3b82f6" },
  "/rcs": { word: "tujenge", color: "#f97316" },
  "/travel": { word: "twenzetu", color: "#8b5cf6" },
  "/sakurapay": { word: "Mkwanja", color: "#10b981" },
  "/hosting": { word: "tuko live", color: "#a78bfa" },
  "/about": { word: "ni sisi", color: "#FFFFFF" },
  "/contact": { word: "tubonge", color: "#FFFFFF" },
};

export function GlobalPreloader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const config = BRAND_MAP[pathname];

  useEffect(() => {
    if (!config) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname, config]);

  if (!config) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <div className="w-10 h-10 border-2 border-white/5 border-t-white rounded-full animate-spin mb-8" />
          <h2 style={{ color: config.color }} className="text-4xl font-black uppercase tracking-[0.4em] italic">
            {config.word}
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
