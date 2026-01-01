"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Truck, 
  Container, 
  Map, 
  Clock, 
  ShieldCheck, 
  Anchor,
  ArrowUpRight
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

// --- Service Data ---
const services = [
  {
    title: "Clearing & Forwarding",
    id: "01",
    description: "End-to-end customs clearance and cross-border documentation. We navigate the bureaucracy so your cargo never stops moving.",
    icon: Anchor,
  },
  {
    title: "Fleet Management",
    id: "02",
    description: "Tech-enabled asset tracking and maintenance. We provide real-time telematics and driver performance monitoring.",
    icon: Map,
  },
  {
    title: "Dispatch & Delivery",
    id: "03",
    description: "Last-mile precision. From warehouse to doorstep, our dispatched units ensure timely arrival with digital proof-of-delivery.",
    icon: Clock,
  },
  {
    title: "Heavy Cargo Transport",
    id: "04",
    description: "Specialized logistics for industrial machinery and bulk goods across the East African corridor (Dar - Nairobi - Lilongwe).",
    icon: Truck,
  },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-neutral-200 dark:border-white/10 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl transition-all duration-300">
    <div className="flex items-center gap-4">
      <Link href="/" className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
        <ArrowLeft className="w-5 h-5 text-neutral-900 dark:text-white" />
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
        <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white hidden md:block">
          Sakura Logistics.
        </span>
      </div>
    </div>
    <div className="flex items-center gap-4">
        <button className="hidden md:flex text-sm font-medium text-neutral-500 hover:text-rose-500 transition-colors">
            Track Shipment
        </button>
        <ThemeToggle />
    </div>
  </nav>
);

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
      className="group relative border-b border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-12 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(244, 63, 94, 0.05),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        <div className="flex justify-between items-start">
            <span className="text-4xl font-black text-neutral-200 dark:text-neutral-800">{service.id}</span>
            <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-rose-500">
                <service.icon size={24} />
            </div>
        </div>
        <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">{service.title}</h3>
            <p className="text-neutral-500 leading-relaxed">{service.description}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider group-hover:text-rose-500 transition-colors cursor-pointer">
            Explore Capabilities <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 px-6 min-h-[60vh] flex flex-col justify-end">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
         <Image 
            src="https://storage.googleapis.com/sakura-web/ecosystem-lines.png"
            alt="Map"
            fill
            className="object-cover"
         />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
        >
            <div className="h-px w-12 bg-rose-500" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-rose-500">Supply Chain Division</span>
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-neutral-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
            Precision in <br />
            <span className="text-neutral-400 dark:text-neutral-600">Motion.</span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl border-t border-neutral-200 dark:border-neutral-800 pt-8">
            <div>
                <h4 className="text-3xl font-bold text-neutral-900 dark:text-white">24/7</h4>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Dispatch Ops</p>
            </div>
            <div>
                <h4 className="text-3xl font-bold text-neutral-900 dark:text-white">100%</h4>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Border Compliance</p>
            </div>
            <div>
                <h4 className="text-3xl font-bold text-neutral-900 dark:text-white">Live</h4>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Telematics</p>
            </div>
        </div>
      </div>
    </section>
  );
};

const TrackingInterface = () => (
    <section className="py-20 px-6 bg-neutral-100 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Track your Consignment</h2>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input 
                    type="text" 
                    placeholder="Enter Waybill / Container ID" 
                    className="flex-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg px-6 py-4 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button className="bg-rose-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-rose-600 transition-colors">
                    Track
                </button>
            </div>
            <p className="text-sm text-neutral-500">Supported: Road Freight, Sea Cargo, Air Express</p>
        </div>
    </section>
);

export default function LogisticsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-500 selection:bg-rose-500 selection:text-white">
      <Navbar />
      <Hero />
      
      {/* The Service Grid */}
      <section className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto border-x border-neutral-200 dark:border-neutral-800">
            {services.map((service) => (
                <ServiceCard key={service.title} service={service} />
            ))}
        </div>
      </section>

      <TrackingInterface />

      <footer className="py-12 text-center text-sm text-neutral-500 border-t border-neutral-200 dark:border-neutral-800">
        <p>&copy; {new Date().getFullYear()} Sakura Logistics. A Division of Sakura Group.</p>
      </footer>
    </main>
  );
}
