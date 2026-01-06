"use client";

import React from "react";
import Link from "next/link";
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Facebook, 
  MapPin, 
  Mail, 
  Phone
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10 relative overflow-hidden font-sans">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP ROW: Brand & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
          <div className="max-w-md">
            <Link href="/" className="text-2xl font-black tracking-tighter mb-6 block">
              Sakura<span className="text-neutral-500">Group.</span>
            </Link>
            <p className="text-neutral-400 leading-relaxed mb-8 text-sm italic">
              The operating backbone for Tanzanian enterprises — engineered across logistics, cloud infrastructure, communications, and industrial services.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm text-neutral-400">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-neutral-600 mt-1" />
              <span>
                Sakura HQ, Dar es Salaam<br />
                Tanzania, East Africa
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-neutral-600" />
              <a href="mailto:hello@sakuragroup.co.tz" className="hover:text-white transition-colors">hello@sakuragroup.co.tz</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-neutral-600" />
              <a href="tel:+255753930000" className="hover:text-white transition-colors">0753 93 0000</a>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: The Ecosystem Grid (Matched to Physical Folders) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-t border-white/10 pt-16 mb-16">
          
          {/* COLUMN 1: SAKURAHOST */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-violet-400">SakuraHost</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/hosting/web" className="hover:text-violet-300 transition-colors">Business Hosting</Link></li>
              <li><Link href="/hosting/vps" className="hover:text-violet-300 transition-colors">VPS & Cloud</Link></li>
              <li><Link href="/hosting/managed" className="hover:text-violet-300 transition-colors">Managed Core</Link></li>
              <li><Link href="/hosting/domains" className="hover:text-violet-300 transition-colors">Domains</Link></li>
              <li><Link href="/hosting/security" className="hover:text-violet-300 transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* COLUMN 2: RCS */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-orange-500">RCS Build</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/rcs/restoration" className="hover:text-orange-300 transition-colors">Restoration</Link></li>
              <li><Link href="/rcs/waterproofing" className="hover:text-orange-300 transition-colors">Waterproofing</Link></li>
              <li><Link href="/rcs/installation" className="hover:text-orange-300 transition-colors">Industrial Roofing</Link></li>
              <li><Link href="/rcs/construction" className="hover:text-orange-300 transition-colors">Construction</Link></li>
              <li><Link href="/rcs/repairs" className="hover:text-orange-300 transition-colors">Maintenance</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: FINTECH & AXIS */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-emerald-500">Fintech</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/sakurapay" className="hover:text-emerald-300 transition-colors">SakuraPay Platform</Link></li>
            </ul>
            
            <h4 className="font-bold text-xs uppercase tracking-widest text-white/50 mt-4">Axis Platform</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/axis" className="hover:text-emerald-300 transition-colors">Comm API</Link></li>
              <li><Link href="/axis/pricing" className="hover:text-emerald-300 transition-colors">Pricing</Link></li>
              <li><Link href="/axis/developers" className="hover:text-emerald-300 transition-colors">Developers</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: LOGISTICS & CREATIVE */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-blue-500">Field Ops</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/logistics" className="hover:text-blue-300 transition-colors">Logistics</Link></li>
              <li><Link href="/travel" className="hover:text-blue-300 transition-colors">Twenzetu Travel</Link></li>
            </ul>

            <h4 className="font-bold text-xs uppercase tracking-widest text-white/50 mt-4">Creative</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/agency" className="hover:text-pink-300 transition-colors">Sakura Agency</Link></li>
              <li><Link href="/thinkloko" className="hover:text-pink-300 transition-colors">ThinkLoko</Link></li>
            </ul>
          </div>

          {/* COLUMN 5: CORPORATE */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white">Corporate</h4>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/about" className="hover:text-white transition-colors">Ni Sisi</Link></li>
              <li><Link href="/hosting/support" className="hover:text-white transition-colors">Service Desk</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Tubonge</Link></li>
              <li><Link href="/learn" className="hover:text-white transition-colors">Terminal</Link></li>
              
              <li className="flex items-center gap-2 mt-6 text-xs font-mono text-green-500">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 All Systems Normal
              </li>
            </ul>
          </div>

        </div>

        {/* INDUSTRIAL WORDMARK (Webstacks Style) */}
        <div className="relative pt-10 pb-6 overflow-hidden border-t border-white/5 select-none">
             <h1 className="text-[17vw] font-black text-white leading-none tracking-tighter opacity-100 whitespace-nowrap -ml-2">
                SAKURAGROUP
             </h1>
        </div>

        {/* BOTTOM ROW: Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-xs text-neutral-600">
          <p>© {currentYear} Sakura Group Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};