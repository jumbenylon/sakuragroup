"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, useScroll, useTransform, useMotionValue, 
  useMotionTemplate, AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, Truck, Clock, Building2, 
  Navigation, FileText, CheckCircle2, Globe, Zap, BarChart3, Shield, FileCheck, Package
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function LogisticsPage() {
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#111827] text-white selection:bg-yellow-500 selection:text-black">
      <GlobalNavbar />
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center px-6 pt-32 pb-20 overflow-hidden bg-[#111827]">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
           <Image 
              src="https://images.unsplash.com/photo-1591768793355-74d7c869619a?q=80&w=2000"
              alt="African professional courier"
              fill
              className="object-cover opacity-30 grayscale contrast-125"
              priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/90 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <ScrollReveal>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] max-w-5xl">
                  Trusted City-Courier & <br/>
                  <span className="text-yellow-500">Document Delivery.</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-12 border-l-4 border-yellow-500 pl-6 font-light">
                  Same-day urban delivery and clearing & forwarding support operated by a professional logistics team across Tanzania.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/#contact" className="px-12 py-6 bg-yellow-500 hover:bg-yellow-400 text-[#111827] font-black rounded-sm transition-all hover:scale-105 flex items-center gap-2">
                      Request a Pickup <Truck size={20} />
                  </Link>
              </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="py-32 px-6 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 relative min-h-[500px] rounded-3xl overflow-hidden border border-white/5">
                  <Image 
                      src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad21?q=80&w=1000"
                      alt="African logistics hub"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
              </div>

              <div className="lg:col-span-7 space-y-4">
                  {[
                      { title: "Urban Courier", desc: "Same-day movements with time-stamped logs.", icon: Navigation },
                      { title: "Confidential", desc: "Strict sealed-package identity-verified courier.", icon: FileText },
                      { title: "Forwarding", desc: "Support at East African ports and terminals.", icon: Globe }
                  ].map((s, i) => (
                      <div key={i} className="group bg-[#111827] border border-white/5 p-10 hover:border-yellow-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-8">
                          <div className="flex items-start gap-8">
                              <s.icon className="text-yellow-500" size={24} />
                              <div>
                                  <h4 className="text-2xl font-bold text-white mb-2">{s.title}</h4>
                                  <p className="text-slate-400 text-sm">{s.desc}</p>
                              </div>
                          </div>
                          <ArrowRight className="text-white/20 group-hover:text-yellow-500 transition-all" />
                      </div>
                  ))}
              </div>
          </div>
      </section>

      <GlobalFooter />
    </main>
  );
}
