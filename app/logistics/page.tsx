"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, Truck, Anchor, Map, Clock, ArrowUpRight, 
  Globe, Package, ShieldCheck, Zap 
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- DATA ---
const services = [
  {
    title: "Cross-Border Haulage",
    description: "Heavy-duty transport across the East African Community. We manage the fleet, the fuel, and the borders.",
    icon: Truck,
    color: "from-rose-500/20 to-transparent",
  },
  {
    title: "Ocean Freight Forwarding",
    description: "Priority clearing at Dar es Salaam port. Direct integrations with customs authorities for faster release.",
    icon: Anchor,
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "Cold Chain Logistics",
    description: "Temperature-controlled supply chain for perishables and pharmaceuticals. -20°C to +25°C precision.",
    icon: Zap,
    color: "from-cyan-500/20 to-transparent",
  },
  {
    title: "Last-Mile Distribution",
    description: "Urban fulfillment centers ensuring products reach the final consumer within 24 hours.",
    icon: Clock,
    color: "from-yellow-500/20 to-transparent",
  },
];

const network = [
  "DAR ES SALAAM", "NAIROBI", "LILONGWE", "KAMPALA", "LUSAKA", "MOMBASA", "DODOMA", "ARUSHA"
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl transition-all duration-300">
    <div className="flex items-center gap-4">
      <Link href="/" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group">
        <ArrowLeft className="w-5 h-5 text-neutral-900 dark:text-white group-hover:-translate-x-1 transition-transform" />
      </Link>
      <div className="flex items-center gap-3">
        <div className="relative w-6 h-6">
          <Image 
            src="https://storage.googleapis.com/sakura-web/logo-icon.png" 
            alt="Sakura Group" 
            fill
            className="object-contain"
          />
        </div>
        <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
          Sakura Logistics.
        </span>
      </div>
    </div>
    <ThemeToggle />
  </nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[90vh] flex items-center px-6 overflow-hidden">
      {/* Background with Bucket Asset */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
         <Image 
          src="https://storage.googleapis.com/sakura-web/hero-gradient.jpg"
          alt="Background"
          fill
          className="object-cover opacity-80 dark:opacity-40 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-neutral-950/50 dark:to-neutral-950" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">
              Supply Chain Division
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] mb-8">
            Moving <br />
            <span className="text-neutral-400 dark:text-neutral-600">East Africa.</span>
          </h1>
          
          <p className="max-w-xl text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We operate the arteries of commerce. From the port of Dar es Salaam to the inland depots of Lilongwe, we ensure seamless flow.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// The "Spotlight" Card - Premium & Playful Hover
const ServiceCard = ({ service }: { service: typeof services[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative border-b border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-12 overflow-hidden transition-all duration-500 hover:bg-neutral-50 dark:hover:bg-neutral-900"
      onMouseMove={handleMouseMove}
    >
      {/* The Flashlight Effect */}
      <motion.div
        className={`pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-br ${service.color}`}
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(244, 63, 94, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full justify-between gap-12">
        <div className="flex justify-between items-start">
            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <service.icon size={32} />
            </div>
            <ArrowUpRight className="w-6 h-6 text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors duration-300" />
        </div>
        
        <div>
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
              {service.title}
            </h3>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {service.description}
            </p>
        </div>
      </div>
    </div>
  );
};

// Infinite Scrolling Marquee (Playful Network Display)
const NetworkMarquee = () => (
  <div className="py-24 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 mb-8">
      <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Active Corridors</h3>
    </div>
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      className="flex whitespace-nowrap gap-16"
    >
      {[...network, ...network, ...network, ...network].map((city, i) => (
        <div key={i} className="flex items-center gap-4 text-5xl md:text-7xl font-bold text-neutral-300 dark:text-neutral-800">
          <span>{city}</span>
          <Globe className="w-8 h-8 text-rose-500" />
        </div>
      ))}
    </motion.div>
  </div>
);

const Stats = () => (
  <section className="py-24 px-6 bg-white dark:bg-neutral-950">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h4 className="text-6xl font-bold text-neutral-900 dark:text-white mb-2">24<span className="text-rose-500">h</span></h4>
        <p className="text-neutral-500">Maximum dwell time for transit cargo at our terminals.</p>
      </div>
      <div>
        <h4 className="text-6xl font-bold text-neutral-900 dark:text-white mb-2">100<span className="text-rose-500">%</span></h4>
        <p className="text-neutral-500">Digital visibility. Track every container in real-time.</p>
      </div>
      <div>
        <h4 className="text-6xl font-bold text-neutral-900 dark:text-white mb-2">1.2<span className="text-rose-500">M</span></h4>
        <p className="text-neutral-500">Kilometers covered annually across the SADC region.</p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 text-center border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
    <p className="text-sm text-neutral-500">
      &copy; {new Date().getFullYear()} Sakura Logistics. Precision in every mile.
    </p>
  </footer>
);

export default function LogisticsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 selection:bg-rose-500 selection:text-white">
      <Navbar />
      <Hero />
      
      {/* The Grid: 2x2 Layout */}
      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto border-x border-neutral-200 dark:border-neutral-800">
            {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
            ))}
        </div>
      </section>

      <NetworkMarquee />
      <Stats />
      <Footer />
    </main>
  );
}
