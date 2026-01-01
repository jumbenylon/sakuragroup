"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, Cloud, Truck, 
  CreditCard, Layout, BookOpen, Quote 
} from "lucide-react";
import { GlobalNavbar } from "@/components/global-navbar";
import { GlobalFooter } from "@/components/global-footer";

// --- ANIMATION UTILS ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// --- SECTIONS ---

const Hero = () => (
  <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden bg-neutral-950">
    {/* Abstract Background */}
    <div className="absolute inset-0 z-0 opacity-40">
       <Image 
         src="https://storage.googleapis.com/sakura-web/hero-gradient.jpg" 
         alt="Background" 
         fill 
         className="object-cover"
         priority
       />
       <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
      <motion.div {...fadeIn} className="space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[1.1]">
          Empower Your <br />
          Business to <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">Blossom.</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-lg leading-relaxed font-light">
          We deliver cloud, logistics, finance, and digital solutions under one roof, so you can focus on growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/#contact" className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 group">
            Book a Free Consultation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-neutral-500 text-sm flex items-center justify-center h-full py-4">
            No obligations • 30-minute call
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

const TrustBar = () => (
  <section className="py-12 bg-neutral-900 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-sm font-mono uppercase tracking-widest text-neutral-500 mb-8">
        Trusted by leading companies worldwide
      </p>
      <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale">
        {/* Placeholder Logos - In prod, use real SVGs */}
        {['Vodacom', 'Tigo', 'CRDB', 'NMB', 'Azam'].map((brand) => (
          <span key={brand} className="text-xl font-bold text-white">{brand}</span>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/5">
          {[
              { label: "Global Coverage", val: "TZ / KE / MW" },
              { label: "Data Security", val: "ISO 27001" },
              { label: "Projects Delivered", val: "500+" },
          ].map((stat) => (
              <div key={stat.label} className="text-center">
                  <div className="text-white font-bold text-lg">{stat.val}</div>
                  <div className="text-neutral-500 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
          ))}
      </div>
    </div>
  </section>
);

const OurStory = () => (
  <section id="story" className="py-32 px-6 bg-neutral-950">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
       <motion.div {...fadeIn} className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
           {/* Replace with Founder/Team Image */}
           <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/20 to-neutral-800" />
           <div className="absolute bottom-8 left-8 right-8">
               <Quote className="text-rose-500 mb-4" size={32} />
               <p className="text-white text-xl font-light italic">"Innovation drives us. Your success is our mission."</p>
           </div>
       </motion.div>
       
       <motion.div {...fadeIn} className="space-y-8">
           <h2 className="text-4xl md:text-5xl font-bold text-white">How Sakura Group Began</h2>
           <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
               <p>
                   Founded on the belief that every business deserves world-class support, Sakura Group was born from a passion to simplify complexity.
               </p>
               <p>
                   What started as a tech consultancy quickly grew into a multi-service partner. Today, we blend cutting-edge technology with dedicated people to help your company thrive in the East African market.
               </p>
           </div>
           <Link href="/#contact" className="text-white border-b border-rose-500 pb-1 hover:text-rose-500 transition-colors inline-flex items-center gap-2">
               Learn more about our journey <ArrowRight size={16} />
           </Link>
       </motion.div>
    </div>
  </section>
);

const Services = () => (
    <section id="services" className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How We Serve You</h2>
                <p className="text-neutral-400 text-xl max-w-2xl">Integrated solutions for every aspect of your business operations.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: "Cloud Infrastructure", desc: "Scalable, secure hosting & domains.", icon: Cloud, href: "/hosting" },
                    { title: "Logistics & Supply", desc: "Cross-border haulage & forwarding.", icon: Truck, href: "/logistics" },
                    { title: "Financial Tech", desc: "Payment gateways & bulk SMS.", icon: CreditCard, href: "/sakurapay" },
                    { title: "Digital Agency", desc: "Strategy, branding & growth.", icon: Layout, href: "/marketing" },
                    { title: "Education (LMS)", desc: "Corporate training platforms.", icon: BookOpen, href: "/learn" },
                    { title: "Corporate Travel", desc: "Executive booking management.", icon: Truck, href: "/travel" }, // Reused Icon for travel
                ].map((s, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-8 bg-neutral-900/50 border border-white/5 hover:border-rose-500/50 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center mb-6 text-white group-hover:bg-rose-600 transition-colors">
                            <s.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                        <p className="text-neutral-400 mb-6">{s.desc}</p>
                        <Link href={s.href} className="text-sm font-bold text-white flex items-center gap-2 hover:text-rose-500 transition-colors">
                            Learn More <ArrowRight size={14} />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const WhyChooseUs = () => (
    <section className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Why Sakura Group?</h2>
                <div className="space-y-8">
                    {[
                        { title: "Personalized Partnership", desc: "We tailor every solution to your business needs." },
                        { title: "Proven Expertise", desc: "Decades of cross-industry experience drive your results." },
                        { title: "Premium Support", desc: "Dedicated account managers ensure peace of mind." },
                        { title: "Unified Platform", desc: "All services integrate seamlessly under one team." },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <CheckCircle2 className="text-rose-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                <p className="text-neutral-400">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-neutral-900 rounded-2xl p-12 flex items-center justify-center border border-white/5">
                <div className="text-center">
                    <h3 className="text-6xl font-bold text-white mb-4">98%</h3>
                    <p className="text-neutral-500 uppercase tracking-widest">Client Retention Rate</p>
                </div>
            </div>
        </div>
    </section>
);

const Testimonials = () => (
    <section id="testimonials" className="py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-16">Success Stories</h2>
            <div className="bg-neutral-900 p-12 rounded-3xl border border-white/5 relative">
                <Quote className="absolute top-8 left-8 text-neutral-700" size={48} />
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8 relative z-10">
                    "Working with Sakura Group transformed our supply chain. We cut operational costs by 30% in just 6 months while launching our new digital platform."
                </p>
                <div>
                    <div className="font-bold text-white">Jane Doe</div>
                    <div className="text-rose-500 text-sm uppercase tracking-widest">COO, TechCorp Tanzania</div>
                </div>
            </div>
        </div>
    </section>
);

const ContactCTA = () => (
    <section id="contact" className="py-32 px-6 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Ready to Grow?</h2>
            <p className="text-lg text-neutral-600 mb-10 max-w-xl mx-auto">
                Book a free, no-pressure consultation today. We’ll discuss your challenges and explore solutions tailored to your business.
            </p>
            <form className="max-w-md mx-auto space-y-4 text-left">
                <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Name</label>
                    <input type="text" className="w-full bg-neutral-100 border-none rounded-lg p-3 text-neutral-900 focus:ring-2 focus:ring-rose-500" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">Email</label>
                    <input type="email" className="w-full bg-neutral-100 border-none rounded-lg p-3 text-neutral-900 focus:ring-2 focus:ring-rose-500" placeholder="john@company.com" />
                </div>
                <button className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors text-lg mt-4">
                    Book Consultation
                </button>
                <p className="text-center text-xs text-neutral-400 mt-4">We usually reply within 24 hours.</p>
            </form>
        </div>
    </section>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-rose-500 selection:text-white">
      <GlobalNavbar />
      <Hero />
      <TrustBar />
      <OurStory />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
      <GlobalFooter />
    </main>
  );
}
