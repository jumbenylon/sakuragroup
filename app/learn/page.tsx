"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, BookOpen, Trophy, Users, Lock, 
  ChevronRight, Terminal, Cpu 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- MOCK DATA ---
const courses = [
  { 
    title: "Mastering WHMCS Development", 
    modules: 12, 
    level: "Advanced", 
    duration: "6 Weeks",
    progress: 0 
  },
  { 
    title: "Digital Marketing in East Africa", 
    modules: 8, 
    level: "Intermediate", 
    duration: "4 Weeks",
    progress: 0 
  },
  { 
    title: "Cloud Infrastructure 101", 
    modules: 15, 
    level: "Beginner", 
    duration: "8 Weeks",
    progress: 0 
  },
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/10 bg-neutral-900/90 backdrop-blur-md">
    <Link href="/" className="group flex items-center gap-2 text-xs font-mono text-yellow-500 hover:text-white transition-colors">
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      THE_TERMINAL
    </Link>
    <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-neutral-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            SYSTEM_ONLINE
        </div>
        <button className="text-xs font-bold bg-white text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors">
            Student Login
        </button>
        <ThemeToggle />
    </div>
  </nav>
);

const Hero = () => (
  <section className="pt-40 pb-20 px-6 bg-neutral-900 min-h-[60vh] flex flex-col justify-center">
    <div className="max-w-7xl mx-auto w-full">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-yellow-500/20 bg-yellow-500/10 rounded-full">
            <Trophy size={14} className="text-yellow-500" />
            <span className="text-yellow-500 font-mono text-xs uppercase tracking-widest">
                Official Certification Hub
            </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            Upgrade <br />
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Mindset.</span>
        </h1>
        
        <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-xl">
            The Terminal is Sakura Group's premier education environment. 
            Access industry-standard modules on tech, business logic, and logistics infrastructure.
        </p>
        
        <button className="group flex items-center gap-2 text-white border-b border-yellow-500 pb-1 hover:text-yellow-500 transition-colors">
            View Course Catalog 
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </section>
);

const StatsStrip = () => (
    <div className="border-y border-white/10 bg-black py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-8 md:gap-16">
            {[
                { label: "Active Students", val: "1,204" },
                { label: "Certifications Issued", val: "850+" },
                { label: "Instructors", val: "Top 1%" },
            ].map((s, i) => (
                <div key={i}>
                    <div className="text-2xl font-bold text-white">{s.val}</div>
                    <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{s.label}</div>
                </div>
            ))}
        </div>
    </div>
);

const CourseGrid = () => (
    <section className="py-20 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
                <h2 className="text-2xl font-bold text-white">Available Modules</h2>
                <div className="flex gap-2">
                    <span className="h-2 w-2 bg-yellow-500 rounded-full" />
                    <span className="h-2 w-2 bg-neutral-800 rounded-full" />
                    <span className="h-2 w-2 bg-neutral-800 rounded-full" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((c, i) => (
                    <div key={i} className="group p-8 bg-neutral-900 border border-white/5 hover:border-yellow-500/50 transition-all duration-300 rounded-xl relative overflow-hidden cursor-pointer">
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <Lock size={20} className="text-neutral-600 group-hover:text-yellow-500 transition-colors" />
                        </div>
                        
                        <div className="mb-8 relative z-10">
                            <span className="inline-block px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-yellow-500 uppercase tracking-wider mb-3">
                                {c.level}
                            </span>
                            <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-yellow-400 transition-colors leading-tight">
                                {c.title}
                            </h3>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-neutral-500 relative z-10">
                            <span className="flex items-center gap-1"><BookOpen size={14} /> {c.modules} Modules</span>
                            <span className="flex items-center gap-1"><Cpu size={14} /> {c.duration}</span>
                        </div>
                        
                        {/* Progress Bar (Visual Only) */}
                        <div className="w-full h-0.5 bg-neutral-800 mt-8 rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-yellow-500 group-hover:w-full transition-all duration-[1.5s] ease-out" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="py-12 text-center border-t border-white/10 bg-neutral-900">
    <div className="flex items-center justify-center gap-2 mb-4 text-neutral-600">
        <Terminal size={16} />
        <span className="font-mono text-xs">TERMINAL_OS v2.4</span>
    </div>
    <p className="text-neutral-500 text-sm">
      &copy; {new Date().getFullYear()} Sakura Group. Education Division.
    </p>
  </footer>
);

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <Hero />
      <StatsStrip />
      <CourseGrid />
      <Footer />
    </main>
  );
}
