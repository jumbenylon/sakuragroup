"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Added for Logo
import { 
  Server, 
  CreditCard, 
  Mic, 
  Briefcase, 
  Truck, 
  ShieldCheck, 
  ArrowUpRight,
  Globe,
  Users,
  TrendingUp
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- Data ---
const pillars = [
  {
    title: "SakuraHost",
    category: "Digital Infrastructure",
    description: "Enterprise-grade cloud hosting and .tz domain registrar services.",
    icon: Server,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    title: "Axis & SakuraPay",
    category: "Fintech & Omni-Channel",
    description: "Seamless financial modules and SMS/WhatsApp communication bridges.",
    icon: CreditCard,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-900/20",
  },
  {
    title: "Think Loko",
    category: "Media & Culture",
    description: "Podcast & intelligence on Tanzanian consumer behavior and business culture.",
    icon: Mic,
    color: "text-rose-600 dark:text-rose-500",
    bg: "bg-rose-100 dark:bg-rose-900/20",
  },
  {
    title: "Sakura Consulting",
    category: "B2B Services",
    description: "High-level business development, market research, and strategic growth.",
    icon: Briefcase,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    title: "Sakura Logistics",
    category: "Supply Chain",
    description: "Dedicated logistics division moving goods across East Africa.",
    icon: Truck,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
  },
  {
    title: "Roof Solutions",
    category: "Industrial Services",
    description: "Premium roof cleaning and restoration solutions for residential and commercial.",
    icon: ShieldCheck,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-900/20",
  },
];

const stats = [
  { label: "Active Markets", value: "3", icon: Globe },
  { label: "Business Clients", value: "500+", icon: Users },
  { label: "Years of Impact", value: "7+", icon: TrendingUp },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
    <div className="flex items-center gap-3">
      <div className="relative w-8 h-8">
        <Image 
          src="https://storage.googleapis.com/sakura-web/logo-icon.png" 
          alt="Sakura Group" 
          fill
          className="object-contain"
        />
      </div>
      <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Sakura Group.
      </span>
    </div>
    <ThemeToggle />
  </nav>
);

const Hero = () => (
  <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <h2 className="text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase">
        The Conglomerate
      </h2>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
        Building the future <br />
        of <span className="text-neutral-500">East African Industry.</span>
      </h1>
      <p className="max-w-xl text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
        Sakura Group operates at the intersection of technology, energy, and infrastructure. 
        We build systems that empower businesses and communities.
      </p>
    </motion.div>
  </section>
);

const StatsSection = () => (
  <section className="py-12 border-y border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex items-center gap-4">
          <div className="p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-sm">
            <stat.icon className="w-6 h-6 text-neutral-900 dark:text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</h4>
            <p className="text-sm text-neutral-500 uppercase tracking-wide">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const BentoGrid = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="mb-12">
      <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">Our Ecosystem</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
      {pillars.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="group relative flex flex-col justify-between p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover:shadow-xl dark:hover:bg-neutral-800/50 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-full ${item.bg} ${item.color} transition-colors duration-300`}>
              <item.icon size={24} />
            </div>
            <ArrowUpRight className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" size={20} />
          </div>

          {/* Content */}
          <div className="space-y-3 relative z-10">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              {item.category}
            </p>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white group-hover:translate-x-1 transition-transform duration-300">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
      <p>&copy; {new Date().getFullYear()} Sakura Group. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Dar es Salaam</span>
        <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Nairobi</span>
        <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer transition-colors">Lilongwe</span>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Navbar />
      <Hero />
      <StatsSection />
      <BentoGrid />
      <Footer />
    </main>
  );
}
