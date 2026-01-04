"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ShieldCheck, HardHat, Briefcase, Activity, MessageSquare, Users } from "lucide-react";

export const GlobalPreloader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [currentConfig, setCurrentConfig] = useState({ 
    text: "Karibu Sana.", 
    color: "text-white", 
    bg: "bg-orange-500",
    icon: <Activity size={48} />
  });

  // --- CONFIGURATION MAP ---
  // This maps routes to specific Swahili phrases and brand colors
  const getRouteConfig = (path: string) => {
    if (path.startsWith("/agency")) {
      return { 
        text: "ji-brandi.", 
        color: "text-purple-500", 
        bg: "bg-purple-500",
        icon: <Briefcase size={48} /> 
      };
    }
    if (path.startsWith("/logistics")) {
      return { 
        text: "nitume.", 
        color: "text-emerald-400", 
        bg: "bg-emerald-500",
        icon: <Zap size={48} /> 
      };
    }
    if (path.startsWith("/sakurapay") || path.startsWith("/fintech")) {
      return { 
        text: "Lipa.", 
        color: "text-emerald-500", 
        bg: "bg-emerald-500",
        icon: <ShieldCheck size={48} /> 
      };
    }
    if (path.startsWith("/rcs")) {
      return { 
        text: "Tujenge.", 
        color: "text-yellow-500", 
        bg: "bg-yellow-500",
        icon: <HardHat size={48} /> 
      };
    }
    if (path.startsWith("/contact")) {
      return { 
        text: "Tuwasiliane", 
        color: "text-blue-400", 
        bg: "bg-blue-500",
        icon: <MessageSquare size={48} /> 
      };
    }
    if (path.startsWith("/about")) {
      return { 
        text: "Sisi ndio wale.", 
        color: "text-rose-500", 
        bg: "bg-rose-500",
        icon: <Users size={48} /> 
      };
    }
    // Default / Home
    return { 
      text: "Karibu Sana.", 
      color: "text-orange-500", 
      bg: "bg-orange-500",
      icon: <Zap size={48} /> 
    };
  };

  useEffect(() => {
    // 1. Reset loading state on route change
    setIsLoading(true);
    
    // 2. Update config based on new path
    setCurrentConfig(getRouteConfig(pathname));

    // 3. Fake loading time (simulating heavy asset load)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 Seconds Uniform Delay

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center cursor-none"
        >
          {/* ICON ANIMATION */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`mb-8 ${currentConfig.color}`}
          >
            {currentConfig.icon}
          </motion.div>

          {/* TEXT REVEAL */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className={`text-4xl md:text-6xl font-black tracking-tighter text-white`}
            >
              {currentConfig.text}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50`}></span>
            </motion.h1>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className={`h-full ${currentConfig.bg}`}
            />
          </div>

          {/* LOADING INDICATOR */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500"
          >
            Loading Experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};