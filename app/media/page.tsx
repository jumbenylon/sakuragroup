"use client";

import React from "react";
import Image from "next/image";
import { Play, Mic, Youtube, Headphones, Calendar, Clock } from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

const episodes = [
  { id: 1, title: "The Future of Tanzanian Tech", desc: "Startup ecosystem deep dive.", date: "Dec 28", duration: "45m" },
  { id: 2, title: "Consumer Behavior", desc: "Psychology of the M-Pesa generation.", date: "Dec 15", duration: "32m" },
  { id: 3, title: "Building a Brand", desc: "Lessons from Sakura Group.", date: "Nov 30", duration: "58m" },
];

const EpisodeList = () => (
    <section className="py-12 px-6 bg-black min-h-screen">
       <div className="max-w-5xl mx-auto space-y-2">
         <h2 className="text-white font-bold mb-6">Latest Episodes</h2>
         {episodes.map(ep => (
           <div key={ep.id} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-neutral-900 border border-transparent hover:border-neutral-800 cursor-pointer transition-all">
             <div className="text-neutral-500 font-mono text-sm w-6">0{ep.id}</div>
             <div className="flex-1">
               <h3 className="text-lg font-bold text-white group-hover:text-rose-500 transition-colors">{ep.title}</h3>
               <p className="text-neutral-500 text-sm">{ep.desc}</p>
             </div>
             <div className="hidden md:flex gap-4 text-xs text-neutral-600">
                <span className="flex items-center gap-1"><Calendar size={12}/> {ep.date}</span>
                <span className="flex items-center gap-1"><Clock size={12}/> {ep.duration}</span>
             </div>
             <div className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                <Play size={12} className="fill-current" />
             </div>
           </div>
         ))}
       </div>
    </section>
);

const PlayerBar = () => ( 
    <div className="fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800 p-4 text-white z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center">
                    <Mic size={16} className="text-neutral-500" />
                </div>
                <div className="text-sm">
                    <p className="font-bold">Select an episode</p>
                    <p className="text-neutral-500 text-xs">Think Loko Podcast</p>
                </div>
            </div>
            <div className="hidden md:block w-1/3 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-white" />
            </div>
        </div>
    </div> 
);

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-rose-600 selection:text-white pb-24">
      <GlobalNavbar pageName="THINK_LOKO" />
      
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-end gap-8">
          {/* LOGO UPDATE */}
          <div className="w-64 h-64 bg-black rounded-lg shadow-2xl relative overflow-hidden flex-shrink-0 border border-white/10 group">
             <Image 
                src="https://storage.googleapis.com/sakura-web/think-logo-logo.png"
                alt="Think Loko"
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
             />
          </div>
          <div className="space-y-4 pb-2">
             <span className="text-rose-500 font-bold tracking-widest text-xs uppercase">Original Series</span>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Think Loko.</h1>
             <p className="text-neutral-400 text-lg max-w-xl">Unfiltered conversations on Tanzanian business, culture, and technology.</p>
             <div className="flex gap-4 pt-4">
                <a href="https://podcasts.apple.com/tz/podcast/think-loko/id1741229116" target="_blank" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2">
                    <Headphones size={16}/> Apple Podcasts
                </a>
                <a href="https://www.youtube.com/channel/UClJx6NvQdGerw7zLhi0fLTQ" target="_blank" className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors flex items-center gap-2">
                    <Youtube size={16}/> YouTube
                </a>
             </div>
          </div>
        </div>
      </section>

      <EpisodeList />
      <PlayerBar />
      <GlobalFooter />
    </main>
  );
}
