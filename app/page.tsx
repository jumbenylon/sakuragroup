"use client";

import { motion } from "framer-motion";
import { 
  Server, 
  Flame, 
  CreditCard, 
  Mic, 
  Briefcase, 
  Truck, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

// --- Types ---
interface PillarProps {
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

// --- Data: The 7 Strategic Pillars ---
const pillars: PillarProps[] = [
  {
    title: "SakuraHost",
    category: "Digital Infrastructure",
    description: "Enterprise-grade cloud hosting and .tz domain registrar services.",
    icon: Server,
    color: "group-hover:text-blue-400",
  },
  {
    title: "Axis & SakuraPay",
    category: "Fintech & Omni-Channel",
    description: "Seamless financial modules and SMS/WhatsApp communication bridges.",
    icon: CreditCard,
    color: "group-hover:text-emerald-400",
  },
  {
    title: "Think Loko",
    category: "Media & Culture",
    description: "Podcast & intelligence on Tanzanian consumer behavior and business culture.",
    icon: Mic,
    color: "group-hover:text-rose-500",
  },
  {
    title: "Sakura Consulting",
    category: "B2B Services",
    description: "High-level business development, market research, and strategic growth.",
    icon: Briefcase,
    color: "group-hover:text-purple-400",
  },
  {
    title: "Sakura Logistics",
    category: "Supply Chain",
    description: "Dedicated logistics division moving goods across East Africa.",
    icon: Truck,
    color: "group-hover:text-yellow-400",
  },
  {
    title: "Roof Solutions",
    category: "Industrial Services",
    description: "Premium roof cleaning and restoration solutions for residential and commercial.",
    icon: ShieldCheck,
    color: "group-hover:text-cyan-400",
  },
];

// --- Components ---

const Hero = () => (
  <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <h2 className="text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase">
        The Conglomerate
      </h2>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
        Building the future <br />
        of <span className="text-neutral-500">East African Industry.</span>
      </h1>
      <p className="max-w-xl text-lg text-neutral-400 leading-relaxed">
        Sakura Group operates at the intersection of technology, energy, and infrastructure. 
        We build systems that empower businesses and communities.
      </p>
    </motion.div>
  </section>
);

const BentoGrid = () => (
  <section className="px-6 pb-24 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
      {pillars.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="group relative flex flex-col justify-between p-8 bg-neutral-900 border border-neutral-800 rounded-3xl hover:bg-neutral-800/50 transition-colors duration-300 cursor-pointer overflow-hidden"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-full bg-neutral-950/50 border border-neutral-800 ${item.color} transition-colors duration-300`}>
              <item.icon size={24} />
            </div>
            <ArrowUpRight className="text-neutral-600 group-hover:text-white transition-colors" size={20} />
          </div>

          {/* Content */}
          <div className="space-y-2 relative z-10">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {item.category}
            </p>
            <h3 className="text-2xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-400 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.description}
            </p>
          </div>

          {/* Decorative Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-neutral-950/20 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-neutral-900 bg-neutral-950 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
      <p>&copy; {new Date().getFullYear()} Sakura Group. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <span className="hover:text-white cursor-pointer transition-colors">Dar es Salaam</span>
        <span className="hover:text-white cursor-pointer transition-colors">Nairobi</span>
        <span className="hover:text-white cursor-pointer transition-colors">Lilongwe</span>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 selection:bg-rose-500/30">
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none">
        <span className="text-xl font-bold tracking-tight text-white pointer-events-auto">
          Sakura Group.
        </span>
      </nav>
      <Hero />
      <BentoGrid />
      <Footer />
    </main>
  );
}
