"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Define which paths actually deserve a preloader
  const mainHubs = ["/", "/hosting", "/rcs", "/axis", "/sakurapay", "/logistics", "/agency", "/learn"];
  const isMainPage = mainHubs.includes(pathname);

  useEffect(() => {
    // If not a main page, turn off loading immediately
    if (!isMainPage) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [pathname, isMainPage]);

  if (!isMainPage) return null; // Kill component entirely for sub-pages

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 relative">
            <motion.div 
              className="absolute inset-0 border-2 border-white/10 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.div 
              className="absolute inset-0 border-t-2 border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-[10px] font-black uppercase tracking-[0.5em] text-white/40"
          >
            Sakura Group
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}