"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Server, Globe, Shield, Zap, 
  ExternalLink, Cpu, HardDrive, CheckCircle2 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl">
    <Link href="/" className="group flex items-center gap-2 text-xs font-mono text-blue-500 hover:text-white transition-colors">
      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
      SAKURA_HOST
    </Link>
    <div className="flex items-center gap-4">
        <a 
            href="https://billing.sakurahost.co.tz" 
            target="_blank"
            className="hidden md:flex items-center gap-2 text-xs font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
        >
            Client Portal <ExternalLink size={12} />
        </a>
        <ThemeToggle />
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 px-6 bg-neutral-950 flex flex-col items-center text-center overflow-hidden min-h-[80vh] justify-center">
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>

    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">
                Systems Nominal
            </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
            The Cloud for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                East Africa.
            </span>
        </h1>

        <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade NVMe hosting, localized for low latency in Tanzania and Kenya. 
            Deploy your next project on the region's most reliable infrastructure.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
            <a 
                href="https://billing.sakurahost.co.tz" 
                target="_blank"
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
                Deploy Now
            </a>
            <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-colors">
                View Pricing
            </button>
        </div>
    </div>
  </section>
);

const Accreditation = () => (
    <section className="py-16 px-6 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition-opacity">
            <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                Officially Accredited By
            </p>
            <div className="relative h-16 w-48 grayscale hover:grayscale-0 transition-all duration-500">
                <Image 
                    src="https://storage.googleapis.com/sakura-web/tznic-logo.png" 
                    alt="tzNIC Accredited Registrar" 
                    fill
                    className="object-contain"
                />
            </div>
            <div className="hidden md:block h-8 w-px bg-white/10" />
            <p className="text-neutral-400 text-sm max-w-xs text-center md:text-left">
                Certified .tz Domain Registrar <br />
                <span className="text-blue-500">Registry Compliant</span>
            </p>
        </div>
    </section>
);

const Features = () => (
    <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
            {[
                { 
                    title: "NVMe Storage", 
                    desc: "10x faster than traditional SSDs. Your database queries will fly.", 
                    icon: HardDrive, 
                    color: "text-purple-400" 
                },
                { 
                    title: "DDoS Protection", 
                    desc: "Automated mitigation against volumetric attacks at the edge.", 
                    icon: Shield, 
                    color: "text-emerald-400" 
                },
                { 
                    title: "99.9% Uptime", 
                    desc: "Redundant power and cooling systems ensure your site stays up.", 
                    icon: Zap, 
                    color: "text-yellow-400" 
                },
            ].map((f, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-colors group">
                    <f.icon className={`w-8 h-8 ${f.color} mb-6`} />
                    <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{f.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

const ServerStatus = () => (
    <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-bold">Live Infrastructure Status</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-500 text-xs font-mono font-bold">ALL SYSTEMS OPERATIONAL</span>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { loc: "Dar es Salaam (TZ-01)", ping: "4ms", load: "32%" },
                    { loc: "Nairobi (KE-01)", ping: "12ms", load: "45%" },
                    { loc: "Johannesburg (ZA-01)", ping: "42ms", load: "28%" },
                ].map((server, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-neutral-900 rounded-lg border border-white/5">
                        <div className="flex items-center gap-4">
                            <Server className="text-neutral-600" size={18} />
                            <span className="text-white text-sm font-medium">{server.loc}</span>
                        </div>
                        <div className="flex gap-8 text-xs font-mono text-neutral-400">
                            <span>PING: <span className="text-emerald-400">{server.ping}</span></span>
                            <span>LOAD: <span className="text-blue-400">{server.load}</span></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="py-12 text-center border-t border-white/10 bg-neutral-950">
    <p className="text-neutral-500 text-sm">
      &copy; {new Date().getFullYear()} SakuraHost. An Accredited .tz Registrar.
    </p>
  </footer>
);

export default function HostingPage() {
  return (
    <main className="min-h-screen bg-neutral-950 selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <Accreditation />
      <Features />
      <ServerStatus />
      <Footer />
    </main>
  );
}
