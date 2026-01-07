"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, Award, ArrowRight, Quote } from "lucide-react";

// --- SHARED COMPONENTS ---
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-xs font-mono text-emerald-500 border border-emerald-500/30 px-2 py-1 rounded">
      {number}
    </span>
    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
      {title}
    </h2>
  </div>
);

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="bg-[#050505] text-white selection:bg-emerald-500 font-sans">
      
      {/* 1. HERO MANIFESTO */}
      <section className="relative min-h-[90vh] flex items-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
           {/* Replace with a high-quality B&W photo of Dar es Salaam skyline or Construction site */}
           <Image 
             src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
             alt="Dar es Salaam Skyline"
             fill
             className="object-cover opacity-20 grayscale"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-12">
              We Build<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-slate-500">The Rails.</span>
            </h1>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl border-t border-white/10 pt-12">
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                Africa doesn't need more apps. It needs <strong>infrastructure</strong>.
                We operate at the intersection of the physical and digital worlds—moving cargo on the ground 
                and data in the cloud.
              </p>
              <div>
                <p className="text-sm font-mono text-emerald-500 uppercase tracking-widest mb-2">
                  EST. 2018 • Dar es Salaam
                </p>
                <p className="text-white font-bold text-lg">
                  A Conglomerate of 4 Verticals.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PHILOSOPHY (Why we do it) */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeading number="01" title="The Thesis" />
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded h-full">
                <Quote className="text-emerald-500 mb-6" size={32} />
                <h3 className="text-xl font-bold text-white mb-4">Sovereignty</h3>
                <p className="text-slate-400 leading-relaxed">
                  We believe Tanzanian businesses should own their data and their logistics. 
                  We don't resell foreign services; we build local infrastructure.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded h-full">
                <Quote className="text-emerald-500 mb-6" size={32} />
                <h3 className="text-xl font-bold text-white mb-4">Integration</h3>
                <p className="text-slate-400 leading-relaxed">
                  Logistics needs Software. Software needs Hosting. Hosting needs Payments. 
                  We close the loop. A unified ecosystem for the modern enterprise.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded h-full">
                <Quote className="text-emerald-500 mb-6" size={32} />
                <h3 className="text-xl font-bold text-white mb-4">Velocity</h3>
                <p className="text-slate-400 leading-relaxed">
                  The market moves fast. Our "Agency" arm ensures that while we build the heavy infrastructure, 
                  we communicate with speed and relevance.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. THE FOUNDERS (Trust) */}
      <section className="py-32 px-6 bg-[#020202] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/5 blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
           <ScrollReveal>
             <SectionHeading number="02" title="The Architects" />
           </ScrollReveal>

           <div className="grid md:grid-cols-2 gap-16 items-center">
             <ScrollReveal>
               <div className="relative aspect-[3/4] md:aspect-square bg-[#111] border border-white/10 rounded-sm overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-700">
                  {/* Replace with actual founders photo */}
                  <Image 
                    src="https://storage.googleapis.com/sakura-web/sakuragroup-founders.jpg" 
                    alt="Jumbenylon & Omary"
                    fill
                    className="object-cover"
                  />
               </div>
             </ScrollReveal>

             <ScrollReveal delay={0.2}>
               <div className="space-y-8">
                 <div>
                   <h3 className="text-4xl font-black text-white uppercase italic">Jumbenylon</h3>
                   <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest mt-1">Co-Founder & Technology Lead</p>
                 </div>
                 <div>
                   <h3 className="text-4xl font-black text-white uppercase italic">Omary</h3>
                   <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest mt-1">Co-Founder & Operations Lead</p>
                 </div>
                 
                 <div className="h-px w-24 bg-white/20 my-8" />
                 
                 <p className="text-lg text-slate-300 font-light leading-relaxed">
                   "We started Sakura not to build a company, but to fix the broken links in Tanzania's value chain. 
                   From the server rack to the shipping container, we are obsessed with uptime, efficiency, and scale."
                 </p>
               </div>
             </ScrollReveal>
           </div>
        </div>
      </section>

      {/* 4. THE TIMELINE */}
      <section className="py-32 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
             <SectionHeading number="03" title="The Path" />
          </ScrollReveal>

          <div className="space-y-12 border-l border-white/10 pl-8 ml-4">
             {[
               { year: "2024", title: "Axis & Hosting", desc: "Launched sovereign cloud infrastructure and Axis SMS gateway." },
               { year: "2022", title: "Sakura RCS", desc: "Expanded into industrial roofing and waterproofing services." },
               { year: "2020", title: "Logistics", desc: "Established clearing and forwarding operations for Dar Port." },
               { year: "2018", title: "Origin", desc: "Sakura Agency founded as a digital strategy consultancy." },
             ].map((item, i) => (
               <ScrollReveal key={i} delay={i * 0.1}>
                 <div className="relative">
                   <div className="absolute -left-[41px] top-1 w-5 h-5 bg-[#050505] border border-emerald-500 rounded-full flex items-center justify-center">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                   </div>
                   <span className="text-4xl font-black text-white/10 absolute -top-4 -left-6 z-0 pointer-events-none">{item.year}</span>
                   <div className="relative z-10">
                     <h4 className="text-xl font-bold text-white">{item.title}</h4>
                     <p className="text-slate-400 mt-2">{item.desc}</p>
                   </div>
                 </div>
               </ScrollReveal>
             ))}
          </div>
        </div>
      </section>

      {/* 5. LOCATION */}
      <section className="py-32 px-6 bg-[#0a0a0a] border-y border-white/5">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
               <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8">
                 Rooted in<br/>
                 <span className="text-emerald-500">Dar es Salaam.</span>
               </h2>
               <div className="space-y-6 text-slate-300">
                 <div className="flex items-start gap-4">
                    <MapPin className="text-emerald-500 mt-1" />
                    <p>
                      <strong>HQ Operations:</strong><br/>
                      Mabatini Road, Kijitonyama<br/>
                      (Opposite TRA Tax Offices)<br/>
                      Dar es Salaam, Tanzania
                    </p>
                 </div>
                 <div className="flex items-start gap-4">
                    <Calendar className="text-emerald-500 mt-1" />
                    <p>
                      <strong>Hours:</strong><br/>
                      Mon - Fri: 08:00 - 18:00<br/>
                      Sat: 09:00 - 13:00
                    </p>
                 </div>
               </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
               {/* Embed Google Map or Stylized Map Image */}
               <div className="aspect-video bg-[#111] border border-white/10 rounded-lg overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.9482813958996!2d39.24584067587399!3d-6.776100866265748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4c3187c33653%3A0x629538743130310!2sKijitonyama%2C%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1709123456789!5m2!1sen!2stz" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </ScrollReveal>
         </div>
      </section>

    </main>
  );
}
