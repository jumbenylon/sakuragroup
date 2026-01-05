"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Sakura Global Preloader
 * Optimized to only trigger on primary entry points (Hubs).
 */
export function GlobalPreloader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Define primary hubs that require the "Arrival" experience
  const mainHubs = ["/", "/hosting", "/rcs", "/axis", "/sakurapay", "/logistics", "/agency", "/learn"];
  const isMainPage = mainHubs.includes(pathname);

  useEffect(() => {
    // If we are on a sub-page, bypass the loading state immediately
    if (!isMainPage) {
      setLoading(false);
      return;
    }

    // Standard high-end reveal duration
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [pathname, isMainPage]);

  // Clean exit for sub-pages to prevent DOM clutter
  if (!isMainPage) return null;

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 relative">
            {/* Ambient Pulse */}
            <motion.div 
              className="absolute inset-0 border-2 border-white/10 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            {/* Precise Spinner */}
            <motion.div 
              className="absolute inset-0 border-t-2 border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-white/40"
          >
            Sakura Group
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}