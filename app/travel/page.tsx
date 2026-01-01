"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Plane, MapPin, Calendar, Search, 
  Briefcase, Star, Compass 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center text-white mix-blend-difference">
    <Link href="/" className="group flex items-center gap-2 text-xs font-mono tracking-widest hover:text-orange-400 transition-colors">
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      SAKURA_TRAVELS
    </Link>
    <ThemeToggle />
  </nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image 
          src="https://storage.googleapis.com/sakura-web/hero-gradient.jpg" // Represents a sky/sunset view
          alt="Sky"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-9xl font-serif italic text-white"
        >
          Curated <br /> <span className="not-italic font-sans font-bold">Escapes.</span>
        </motion.h1>

        {/* Fake Booking Widget */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full flex flex-col md:flex-row gap-4 items-center max-w-2xl mx-auto"
        >
            <div className="flex items-center gap-3 px-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-white/20 pb-2 md:pb-0">
                <MapPin className="text-white" size={18} />
                <input type="text" placeholder="Where to?" className="bg-transparent border-none text-white placeholder-white/70 outline-none w-full" />
            </div>
            <div className="flex items-center gap-3 px-4 w-full md:w-auto border-b md:border-b-0 md:border-r border-white/20 pb-2 md:pb-0">
                <Calendar className="text-white" size={18} />
                <span className="text-white/70 text-sm whitespace-nowrap">Check-in — Check-out</span>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors w-full md:w-auto flex justify-center">
                <Search size={20} />
            </button>
        </motion.div>
      </div>
    </section>
  );
};

const Destinations = () => (
    <section className="py-32 px-6 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-4xl font-light text-neutral-900 dark:text-white">Corporate & Leisure</h2>
                <button className="text-sm font-bold uppercase tracking-widest border-b border-neutral-900 dark:border-white pb-1">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Zanzibar", tag: "Luxury Retreats", img: "bg-blue-100" },
                    { title: "Serengeti", tag: "Safari Expeditions", img: "bg-orange-100" },
                    { title: "Dubai", tag: "Business Connect", img: "bg-neutral-100" },
                ].map((dest, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className={`relative aspect-[3/4] ${dest.img} overflow-hidden rounded-2xl mb-6`}>
                            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors" />
                            {/* Placeholder for real images */}
                            <div className="absolute bottom-6 left-6">
                                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                                    {dest.tag}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{dest.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="py-12 text-center border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
    <p className="text-neutral-500 text-sm">
      &copy; {new Date().getFullYear()} Sakura Travels. Licensed IATA Agent.
    </p>
  </footer>
);

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500">
      <Navbar />
      <Hero />
      <Destinations />
      <Footer />
    </main>
  );
}
