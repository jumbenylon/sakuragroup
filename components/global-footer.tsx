"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Instagram, Linkedin, Twitter, 
  MapPin, Phone, Mail, ArrowUp
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
    <footer className="bg-[#050912] text-white pt-20 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">

          {/* BRAND */}
          <div className="lg:col-span-3 space-y-8">
            <Link href="/" className="inline-block relative w-40 h-10">
              <Image
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png"
                alt="Sakura Group Logo"
                fill
                className="object-contain object-left"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              We create digital and physical experiences for brands and companies using technology.
              A multi-sector conglomerate defined by functional purity.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Instagram, url: "https://instagram.com/sakuragroup.tz", label: "Instagram" },
                { icon: Linkedin, url: "#", label: "LinkedIn" },
                { icon: Twitter, url: "#", label: "Twitter" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  aria-label={social.label}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Latest Insights
            </h4>

            <div className="space-y-6">
              {insights.map((item, i) => (
                <Link key={i} href="/media" className="flex gap-4 group">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <p className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors leading-snug">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* ECOSYSTEM LINKS */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Ecosystem
              </h4>

              <ul className="space-y-4">
                {ecosystemLinks.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <ul className="space-y-4">
                {secondaryLinks.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Contact Info
            </h4>

            <div className="space-y-6 text-sm text-slate-400">
              <div className="flex gap-3">
                <Mail size={16} className="text-slate-500 mt-1" />
                <a href="mailto:info@sakuragroup.co.tz" className="hover:text-white transition-colors">
                  info@sakuragroup.co.tz
                </a>
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
                <p>Mwenge, TRA Road<br />Dar es Salaam, TZ</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
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
              className="flex items-center gap-2 group text-white font-black focus:outline-none"
            >
              Return to Summit
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
