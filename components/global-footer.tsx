"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export function GlobalFooter() {
  const sections = [
    {
      title: "SakuraHost",
      links: [
        { name: "Managed Business Hosting", href: "/hosting/managed" },
        { name: "VPS & Cloud Compute", href: "/hosting/vps" },
        { name: "Platform Core", href: "/hosting/core" },
        { name: "Security & Reliability", href: "/hosting/security" }
      ],
    },
    {
      title: "RCS Construction",
      links: [
        { name: "Roof Restoration", href: "/rcs/roofing" },
        { name: "Waterproofing Systems", href: "/rcs/waterproofing" },
        { name: "Industrial Roofing", href: "/rcs/industrial" },
        { name: "Asset Maintenance", href: "/rcs/maintenance" }
      ],
    },
    {
      title: "Fintech",
      links: [
        { name: "SakuraPay Gateway", href: "/sakurapay" },
        { name: "POS & Terminals", href: "/sakurapay/pos" },
        { name: "Agency Banking", href: "/sakurapay/agency" }
      ],
    },
    {
      title: "Logistics",
      links: [
        { name: "Secure Logistics", href: "/logistics" },
        { name: "Confidential Dispatch", href: "/logistics/dispatch" },
        { name: "Inter-City Transport", href: "/logistics/transport" }
      ],
    },
  ];

  return (
    <footer
      role="contentinfo"
      className="mt-32 bg-black text-white border-t border-white/10 pt-24 pb-10 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top Branding & Contact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20 border-b border-white/5 pb-20">
          <div>
            <h2 className="text-white font-black text-2xl mb-6">SakuraGroup.</h2>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
              The operating backbone for Tanzanian enterprises — engineered across logistics,
              cloud infrastructure, communications, and industrial services.
            </p>

            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  aria-label="Social Link"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-slate-400">
            <div className="flex gap-4">
              <MapPin size={20} className="text-white shrink-0" />
              <span className="text-sm">Sakura HQ, Dar es Salaam<br />Tanzania, East Africa</span>
            </div>
            <div className="flex gap-4">
              <Mail size={20} className="text-white shrink-0" />
              <a href="mailto:corporate@sakuragroup.co.tz" className="text-sm hover:text-white transition-colors">
                corporate@sakuragroup.co.tz
              </a>
            </div>
            <div className="flex gap-4">
              <Phone size={20} className="text-white shrink-0" />
              <a href="tel:+255753930000" className="text-sm hover:text-white transition-colors">
                +255 753 930 000
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end">
            <div className="text-right">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                Network Status
              </h4>
              <div className="flex items-center justify-end gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">
                  All Systems Operational
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-10 px-8 py-4 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white hover:text-black transition-all"
            >
              Contact Corporate
            </Link>
          </div>
        </div>

        {/* Division Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-28">
          {sections.map(section => (
            <div key={section.title}>
              <h4 className="text-violet-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-8">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-500 text-[11px] font-semibold tracking-wide hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark Anchor + Legal */}
        <div className="relative pt-8 pb-6 overflow-hidden">
          <div className="select-none pointer-events-none mb-10">
            <h1 className="text-[18vw] font-black text-white leading-none tracking-tighter opacity-100 whitespace-nowrap -ml-2">
              SAKURAGROUP
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-10">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Established 2024</span>
              <span className="text-[9px] font-mono text-slate-500">
                © {new Date().getFullYear()} Sakura Group Ltd. All rights reserved.
              </span>
            </div>

            <div className="flex gap-8 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
