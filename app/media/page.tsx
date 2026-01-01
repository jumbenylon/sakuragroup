"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Play, Pause, Mic, Youtube, Headphones, 
  ExternalLink, Clock, Calendar 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- MOCK DATA (Replicating your Apple Podcast Feed) ---
const episodes = [
  {
    id: 1,
    title: "The Future of Tanzanian Tech",
    desc: "We dive deep into the startup ecosystem of Dar es Salaam and what 2026 holds for founders.",
    date: "Dec 28, 2025",
    duration: "45 min",
    type: "Audio"
  },
  {
    id: 2,
    title: "Consumer Behavior in East Africa",
    desc: "Why do we buy what we buy? Analyzing the psychology behind the M-Pesa generation.",
    date: "Dec 15, 2025",
    duration: "32 min",
    type: "Video"
  },
  {
    id: 3,
    title: "Building a Brand in the Chaos",
    desc: "Strategies for standing out in a saturated market. Lessons from Sakura Group's journey.",
    date: "Nov 30, 2025",
    duration: "58 min",
    type: "Audio"
  }
];

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md z-50">
    <Link href="/" className="group flex items-center gap-2 text-xs font-mono text-rose-600 hover:text-white transition-colors">
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      THINK_LOKO
    </Link>
    <div className="flex items-center gap-4">
        <a href="https://www.youtube.com/channel/UClJx6NvQdGerw7zLhi0fLTQ" target="_blank" className="text-white hover:text-red-500 transition-colors">
            <Youtube size={20} />
        </a>
        <ThemeToggle />
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-neutral-900 to-black">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-end gap-8 md:gap-12">
      {/* Podcast Cover Art Placeholder */}
      <div className="w-64 h-64 bg-neutral-800 rounded-lg shadow-2xl relative overflow-hidden flex-shrink-0 group">
         {/* You can replace this src with your actual Podcast Art URL */}
         <div className="absolute inset-0 bg-gradient-to-tr from-rose-900 to-black flex items-center justify-center">
            <Mic className="text-white/20 w-32 h-32" />
         </div>
         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Play className="fill-white text-white w-16 h-16" />
         </div>
      </div>

      <div className="space-y-4 pb-2">
         <span className="text-rose-500 font-bold tracking-widest text-xs uppercase">Original Series</span>
         <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Think Loko.
         </h1>
         <p className="text-neutral-400 text-lg max-w-xl">
            Unfiltered conversations on Tanzanian business, culture, and technology. 
            Hosted by the minds behind Sakura Group.
         </p>
         <div className="flex gap-4 pt-4">
            <a href="https://podcasts.apple.com/tz/podcast/think-loko/id1741229116" target="_blank" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2">
                <Headphones size={18} /> Listen on Apple
            </a>
            <a href="https://www.youtube.com/channel/UClJx6NvQdGerw7zLhi0fLTQ" target="_blank" className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors flex items-center gap-2">
                <Youtube size={18} /> Watch on YouTube
            </a>
         </div>
      </div>
    </div>
  </section>
);

const EpisodeList = () => {
    return (
        <section className="py-12 px-6 bg-black min-h-screen">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
                    <h2 className="text-2xl font-bold text-white">Latest Episodes</h2>
                    <span className="text-neutral-500 text-sm">{episodes.length} Episodes</span>
                </div>

                <div className="space-y-2">
                    {episodes.map((ep) => (
                        <div key={ep.id} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-900 transition-colors cursor-pointer border border-transparent hover:border-neutral-800">
                            <div className="text-neutral-500 font-mono text-sm w-6">{ep.id}</div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white group-hover:text-rose-500 transition-colors">{ep.title}</h3>
                                <p className="text-neutral-500 text-sm line-clamp-1">{ep.desc}</p>
                            </div>
                            <div className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {ep.date}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {ep.duration}</span>
                            </div>
                            <button className="p-3 rounded-full border border-neutral-700 hover:bg-white hover:text-black hover:border-white transition-all text-white">
                                <Play size={16} className="fill-current" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// "Fake" Player Bar (Sticky Bottom)
const PlayerBar = () => (
    <div className="fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-800 rounded flex items-center justify-center">
                    <Mic className="text-neutral-600" />
                </div>
                <div className="hidden md:block">
                    <p className="text-white text-sm font-bold">Select an episode</p>
                    <p className="text-neutral-500 text-xs">Think Loko Podcast</p>
                </div>
            </div>
            
            <div className="flex flex-col items-center gap-1 w-1/3">
                <div className="flex items-center gap-6 text-white">
                    <Play size={24} className="fill-white" />
                </div>
                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-white" />
                </div>
            </div>

            <div className="flex items-center gap-2 text-neutral-500">
                <span className="text-xs">0:00 / 0:00</span>
            </div>
        </div>
    </div>
);

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-rose-600 selection:text-white pb-24">
      <Navbar />
      <Hero />
      <EpisodeList />
      <PlayerBar />
    </main>
  );
}
