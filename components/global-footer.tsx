"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

export function GlobalFooter() {
  return (
    <footer id="footer" className="bg-neutral-950 pt-24 pb-12 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* COL 1: BRAND */}
        <div className="space-y-6">
          <div className="relative w-32 h-10">
            <Image 
              src="https://storage.googleapis.com/sakura-web/sakuragroup-logo-white.png" 
              alt="Sakura Group" 
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Engineering the infrastructure of tomorrow. From cloud systems to physical logistics, we build the rails for African commerce.
          </p>
        </div>

        {/* COL 2: DIVISIONS */}
        <div>
          <h4 className="font-bold mb-6">Business Units</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li><Link href="/hosting" className="hover:text-white transition-colors">SakuraHost</Link></li>
            <li><Link href="/sakurapay" className="hover:text-white transition-colors">SakuraPay</Link></li>
            <li><Link href="/logistics" className="hover:text-white transition-colors">Logistics</Link></li>
            <li><Link href="/industrial" className="hover:text-white transition-colors">Construction</Link></li>
            <li><Link href="/marketing" className="hover:text-white transition-colors">Sakura Agency</Link></li>
          </ul>
        </div>

        {/* COL 3: QUICK LINKS */}
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li><Link href="/travel" className="hover:text-white transition-colors">Corporate Travel</Link></li>
            <li><Link href="/media" className="hover:text-white transition-colors">Think Loko Media</Link></li>
            <li><Link href="/learn" className="hover:text-white transition-colors">The Terminal (LMS)</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>

        {/* COL 4: CONTACT (From Flyer) */}
        <div>
          <h4 className="font-bold mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-1 text-rose-500" />
              <div className="flex flex-col">
                <a href="tel:+255753930000" className="hover:text-white">+255 753 930 000</a>
                <a href="tel:+255782020840" className="hover:text-white">+255 782 020 840</a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-rose-500" />
              <a href="mailto:info@sakuragroup.co.tz" className="hover:text-white">info@sakuragroup.co.tz</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-rose-500" />
              <span>Dar es Salaam, Tanzania</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-neutral-600 text-xs">
          &copy; {new Date().getFullYear()} Sakura Group. All rights reserved.
        </p>
        <div className="flex gap-6 text-neutral-500">
          <a href="https://instagram.com/sakuragroup.tz" target="_blank" className="hover:text-rose-500 transition-colors"><Instagram size={18} /></a>
          <a href="#" className="hover:text-rose-500 transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-rose-500 transition-colors"><Twitter size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
