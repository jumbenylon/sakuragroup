"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Instagram, Linkedin, Twitter, 
  MapPin, Phone, Mail, ArrowUp,
  ArrowUpRight, Command, Send, ShieldCheck
} from "lucide-react";

export function GlobalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ecosystemLinks = [
    { name: "SakuraPay", href: "/sakurapay" },
    { name: "Sakura Logistics", href: "/logistics" },
    { name: "Axis by Sakura", href: "/axis" },
    { name: "Xhule — Learn", href: "/learn" },
    { name: "Industrial (RCS)", href: "/industrial" },
  ];

  const secondaryLinks = [
    { name: "SakuraHost", href: "/hosting" },
    { name: "Sakura Agency", href: "/marketing" },
    { name: "Sakura Travels", href: "/travel" },
    { name: "Think Loko", href: "/media" },
  ];

  const insights = [
    { 
        title: "The Future of Digital Payments in TZ", 
        img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200" 
    },
    { 
        title: "Logistics: Moving the Soul of Mwenge", 
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=200" 
    },
  ];

  return (
    <footer className="bg-[#050912] text-white pt-24 pb-8 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. TOP BAR: GLOBAL INTEL (NEWSLETTER) */}
        <div className="bg-[#0B1120] rounded-2xl p-8 md:p-12 mb-20 flex flex-col lg:flex-row justify-between items-center gap-8 border border-white/5 backdrop-blur-sm">
            <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                    Signup for latest news and insights from Sakura Group
                </h2>
                <p className="text-slate-500 text-sm">Join our intelligence feed for updates across the ecosystem.</p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
                <div className="relative flex-grow lg:w-80">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="email" 
                        placeholder="Enter your email address"
                        className="w-full bg-[#050912] border border-white/10 rounded-lg py-4 pl-12 pr-4 text-sm focus:border-emerald-500 outline-none transition-all"
                    />
                </div>
                <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-emerald-600/20">
                    Subscribe
                </button>
            </div>
        </div>

        {/* 2. MAIN NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* COLUMN: BRAND & DESCRIPTION (4 SPAN) */}
          <div className="lg:col-span-3 space-y-8">
            <Link href="/" className="inline-block relative w-40 h-10">
              <Image 
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
                alt="Sakura Group" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              We create digital and physical experiences for brands and companies by using technology. A multi-sector conglomerate defined by functional purity.
            </p>
            <div className="flex gap-4">
                {[
                    { icon: Instagram, url: "https://instagram.com/sakuragroup.tz" },
                    { icon: Linkedin, url: "#" },
                    { icon: Twitter, url: "#" }
                ].map((social, i) => (
                    <a 
                        key={i} 
                        href={social.url} 
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <social.icon size={20} />
                    </a>
                ))}
            </div>
          </div>

          {/* COLUMN: LATEST BLOG/INSIGHTS (3 SPAN) */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Latest Insights</h4>
            <div className="space-y-6">
                {insights.map((item, i) => (
                    <Link key={i} href="/media" className="flex gap-4 group">
                        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/10">
                            <Image src={item.img} alt="" fill className="object-cover transition-transform group-hover:scale-110" />
                        </div>
                        <p className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors leading-snug">
                            {item.title}
                        </p>
                    </Link>
                ))}
            </div>
          </div>

          {/* COLUMN: ECOSYSTEM (4 SPAN) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Ecosystem</h4>
                <ul className="space-y-4">
                    {ecosystemLinks.map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-8 pt-10">
                <ul className="space-y-4">
                    {secondaryLinks.map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* COLUMN: CONTACT INFO (2 SPAN) */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Contact Info</h4>
            <div className="space-y-6 text-sm font-light text-slate-400">
                <div className="flex gap-3">
                    <Mail size={16} className="text-slate-500 mt-1" />
                    <a href="mailto:info@sakuragroup.co.tz" className="hover:text-white transition-colors">info@sakuragroup.co.tz</a>
                </div>
                <div className="flex gap-3">
                    <Phone size={16} className="text-slate-500 mt-1" />
                    <div>
                        <p>+255 753 930 000</p>
                        <p>+255 782 020 840</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <MapPin size={16} className="text-slate-500 mt-1" />
                    <p>Mwenge, TRA Road,<br/>Dar es Salaam, TZ</p>
                </div>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM BAR: LEGAL & STATUS */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
             <span>© {new Date().getFullYear()} Sakura Group</span>
             <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
             <span>Ecosystem Active</span>
          </div>

          <div className="flex items-center gap-8 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-white transition-colors">Legal Notice</Link>
             <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 group text-white font-black"
             >
                Return to Summit <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
