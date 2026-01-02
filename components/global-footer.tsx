"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowUp
} from "lucide-react";

export function GlobalFooter() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const services = [
    { name: "SakuraPay", href: "/sakurapay" },
    { name: "Sakura Logistics", href: "/logistics" },
    { name: "Axis by Sakura", href: "/axis" },
    { name: "Xhule — Learn", href: "/learn" },
    { name: "Roof Cleaning (RCS)", href: "/roofcleaning" }
  ];

  const secondary = [
    { name: "SakuraHost", href: "/hosting" },
    { name: "Sakura Agency", href: "/marketing" },
    { name: "Sakura Travels", href: "/travel" },
    { name: "Think Loko", href: "/thinkloko" }
  ];

  return (
    <footer className="bg-[#050912] text-white pt-20 pb-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* ======== DESKTOP FOOTER (4 COLUMNS) ======== */}
        <div className="hidden md:grid grid-cols-12 gap-16 mb-16">

          {/* ABOUT */}
          <div className="col-span-3 space-y-8">
            <Link href="/" className="relative w-44 h-12 block">
              <Image
                src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png"
                alt="Sakura Group Logo"
                fill
                className="object-contain object-left"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              We create digital and physical experiences for brands and companies using technology —
              engineering the rails of African commerce.
            </p>

            <div className="flex gap-4">
              {[
                { icon: Instagram, url: "https://instagram.com/sakuragroup.tz", label: "Instagram" },
                { icon: Linkedin, url: "#", label: "LinkedIn" },
                { icon: Twitter, url: "#", label: "Twitter" }
              ].map((s, i) => (
                <a
                  key={i}
                  aria-label={s.label}
                  href={s.url}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-emerald-400 transition-all"
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* OUR SERVICES */}
          <div className="col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
              Our Services
            </h4>

            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="space-y-3">
              {secondary.map(s => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-span-3 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
              Head Office — Dar es Salaam
            </h4>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl space-y-6">
              <div className="flex gap-3">
                <Mail className="text-emerald-500" size={18} />
                <a href="mailto:info@sakuragroup.co.tz" className="text-sm text-slate-400 hover:text-white transition-colors">
                  info@sakuragroup.co.tz
                </a>
              </div>

              <div className="flex gap-3">
                <Phone className="text-emerald-500" size={18} />
                <div className="text-sm text-slate-400 space-y-1">
                  <p>+255 753 930 000</p>
                  <p>+255 782 020 840</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-emerald-500" size={18} />
                <p className="text-sm text-slate-400">
                  Mwenge, TRA Road<br />Dar es Salaam, Tanzania
                </p>
              </div>
            </div>
          </div>

          {/* CTA / SCROLL TOP */}
          <div className="col-span-3 flex flex-col justify-between items-end">
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* ======== MOBILE FOOTER (REDUCED CONTENT) ======== */}
        <div className="md:hidden space-y-8 mb-16">

          <Link href="/" className="relative w-40 h-10 block">
            <Image
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png"
              alt="Sakura Group Logo"
              fill
              className="object-contain object-left"
            />
          </Link>

          <p className="text-slate-400 text-sm leading-relaxed">
            We create digital and physical experiences for brands and companies using technology —
            engineering the rails of African commerce.
          </p>

          <div className="flex gap-4">
            <Instagram size={20} />
            <Linkedin size={20} />
            <Twitter size={20} />
          </div>
        </div>

        {/* ======== BOTTOM BAR (WITH EXTRA BUFFER SPACE) ======== */}
        <div className="pt-10 pb-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-slate-600 uppercase">
            <span>© {new Date().getFullYear()} Sakura Group</span>
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
            <span>Ecosystem Active</span>
          </div>

          {/* Mobile does NOT show scroll top — per your instruction */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="hidden md:flex p-3 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
