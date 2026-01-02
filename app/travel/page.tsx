"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, Compass, Sunset, 
  Heart, Wind, X, MapPin, Calendar
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- CONCIERGE MODAL ---
const TravelConcierge = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="max-w-2xl w-full bg-[#050912] border border-white/10 p-12 rounded-[2rem] relative"
        >
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white">
            <X size={24} />
          </button>
          <h2 className="text-3xl font-serif italic text-white mb-4">The journey in your mind.</h2>
          <p className="text-slate-400 mb-8 font-light">Share your dream, and we will shape it into something real.</p>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="border-b border-white/10 pb-2">
                    <label className="text-[10px] text-amber-500 uppercase tracking-widest block mb-2">Name</label>
                    <input type="text" className="bg-transparent w-full text-white outline-none font-light" placeholder="Your name" />
                </div>
                <div className="border-b border-white/10 pb-2">
                    <label className="text-[10px] text-amber-500 uppercase tracking-widest block mb-2">Destination</label>
                    <input type="text" className="bg-transparent w-full text-white outline-none font-light" placeholder="Where to?" />
                </div>
            </div>
            <div className="border-b border-white/10 pb-2">
                <label className="text-[10px] text-amber-500 uppercase tracking-widest block mb-2">The Experience</label>
                <textarea rows={2} className="bg-transparent w-full text-white outline-none font-light resize-none" placeholder="Adventure, Stillness, or Celebration?" />
            </div>
            <button className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-colors rounded-full">
                Begin Planning
            </button>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
         <Image 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2000"
            alt="Serengeti Sunset"
            fill
            className="object-cover transition-opacity duration-1000"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-white text-sm uppercase tracking-[0.5em] mb-8 font-light"
          >
            Sakura Travels
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
            className="text-6xl md:text-[10rem] font-serif italic text-white mb-8 leading-none"
          >
            Where journeys begin.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-amber-200/60 uppercase tracking-[0.3em] text-[10px] md:text-xs"
          >
            Tanzania — told through travel, memory and adventure.
          </motion.p>
      </div>
    </section>
  );
};

const NarrativeSection = () => (
    <section className="py-40 px-6 bg-[#020617] text-center">
        <div className="max-w-4xl mx-auto space-y-12">
            {[
                "Tanzania is not a place you visit.",
                "It is a place that meets you.",
                "In the wind. In the stillness. In the light."
            ].map((line, i) => (
                <motion.p 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.3 }}
                    className="text-3xl md:text-5xl font-serif italic text-white/90 leading-tight"
                >
                    {line}
                </motion.p>
            ))}
        </div>
    </section>
);

const DestinationGrid = () => {
    const destinations = [
        { name: "Serengeti", cat: "Wildlife", img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000" },
        { name: "Zanzibar", cat: "Coast", img: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=1000" },
        { name: "Kilimanjaro", cat: "Peak", img: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=1000" },
        { name: "Ruaha", cat: "Uncrowded", img: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?q=80&w=1000" },
    ];

    return (
        <section className="py-20 bg-[#020617] px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                {destinations.map((d, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ scale: 0.98 }}
                        className="relative aspect-[4/5] md:aspect-video overflow-hidden group cursor-pointer"
                    >
                        <Image src={d.img} alt={d.name} fill className="object-cover transition-transform duration-[3s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                        <div className="absolute bottom-10 left-10">
                            <span className="text-[10px] text-amber-500 uppercase tracking-widest block mb-2">{d.cat}</span>
                            <h3 className="text-4xl text-white font-serif italic">{d.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
);
}

export default function TravelPage() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black min-h-screen text-white selection:bg-amber-500 selection:text-black">
      <GlobalNavbar />
      <AnimatePresence>
        {loading && (
            <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
                <span className="text-amber-500 font-serif italic text-2xl animate-pulse">Unfolding...</span>
            </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <NarrativeSection />
      <DestinationGrid />

      <section className="py-40 bg-[#020617] text-center border-t border-white/5">
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-2xl mx-auto px-6"
         >
            <h2 className="text-4xl font-serif italic mb-12">The art of going somewhere that stays with you.</h2>
            <button 
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-amber-500 transition-colors"
            >
                Begin Your Story <ArrowRight size={16} />
            </button>
         </motion.div>
      </section>

      <TravelConcierge isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <GlobalFooter />
    </main>
  );
}
