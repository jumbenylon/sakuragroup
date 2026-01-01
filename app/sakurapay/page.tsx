"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Smartphone, Globe, ShieldCheck, 
  Zap, CreditCard, Lock, ArrowRight, Check 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const mnos = [
  { name: "M-Pesa", color: "bg-red-600", provider: "Vodacom" },
  { name: "Tigo Pesa", color: "bg-blue-500", provider: "Tigo" },
  { name: "Airtel Money", color: "bg-red-500", provider: "Airtel" },
  { name: "HaloPesa", color: "bg-orange-500", provider: "Halotel" },
];

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl">
    <Link href="/" className="group flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-white transition-colors">
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      SAKURA_PAY
    </Link>
    <ThemeToggle />
  </nav>
);

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 bg-neutral-950 overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Copy */}
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
              Live in Tanzania
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[1]">
            Payments <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Unifying Africa.
            </span>
          </h1>
          
          <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
            The modern payment stack for East African business. Accept M-Pesa, Tigo Pesa, Cards, and USSD via a single, beautiful API.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors">
              Start Integration
            </button>
            <button className="px-8 py-4 border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2">
              Read Documentation <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* The 3D Card (Apple Wallet Style) */}
        <div className="perspective-1000 flex justify-center" onMouseMove={handleMouseMove}>
            <motion.div 
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-[340px] h-[220px] md:w-[460px] md:h-[280px] rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 shadow-2xl flex flex-col justify-between p-8"
            >
                {/* Gloss Effect */}
                <div className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none" />
                
                <div className="flex justify-between items-start">
                    <CreditCard className="text-emerald-400 w-10 h-10" />
                    <span className="font-mono text-white/50 text-sm">SAKURA_VIRTUAL</span>
                </div>
                
                <div className="space-y-2">
                    <div className="flex gap-4">
                        <div className="h-2 w-12 bg-white/20 rounded-full" />
                        <div className="h-2 w-8 bg-white/20 rounded-full" />
                    </div>
                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                </div>

                <div className="flex justify-between items-end">
                    <span className="font-mono text-white text-xl tracking-widest">
                        •••• 4242
                    </span>
                    <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full bg-red-500/80 mix-blend-screen" />
                        <div className="w-8 h-8 rounded-full bg-yellow-500/80 mix-blend-screen -ml-4" />
                    </div>
                </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
};

const MNOIntegration = () => (
    <section className="py-24 bg-neutral-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Total Network Coverage</h2>
                <p className="text-neutral-400">Direct integration with all major Mobile Network Operators in Tanzania.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mnos.map((mno) => (
                    <div key={mno.name} className="group p-6 bg-black border border-white/10 rounded-xl hover:border-emerald-500/50 transition-colors cursor-default">
                        <div className={`w-10 h-10 ${mno.color} rounded-full mb-4 flex items-center justify-center`}>
                            <Smartphone className="text-white w-5 h-5" />
                        </div>
                        <h3 className="text-white font-bold text-lg">{mno.name}</h3>
                        <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">{mno.provider}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const SecuritySection = () => (
    <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            {[
                { title: "Bank-Grade Encryption", desc: "AES-256 encryption for all data at rest and in transit.", icon: Lock },
                { title: "PCI-DSS Compliant", desc: "Certified Level 1 Service Provider. We handle the compliance so you don't have to.", icon: ShieldCheck },
                { title: "Instant Settlement", desc: "Funds settle to your bank account or mobile wallet in T+1 days.", icon: Zap },
            ].map((item, i) => (
                <div key={i} className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                        <item.icon />
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

const Footer = () => (
  <footer className="py-12 text-center border-t border-white/10 bg-black">
    <p className="text-neutral-500 text-sm">
      &copy; {new Date().getFullYear()} SakuraPay. Secured by Axis Infrastructure.
    </p>
  </footer>
);

export default function SakuraPayPage() {
  return (
    <main className="min-h-screen bg-neutral-950 selection:bg-emerald-500 selection:text-black">
      <Navbar />
      <Hero />
      <MNOIntegration />
      <SecuritySection />
      <Footer />
    </main>
  );
}
