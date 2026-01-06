"use client";

import React from "react";
import { TravelHero } from "@/components/travel/travel-hero";
import { ExperienceGrid } from "@/components/travel/experience-grid";
import { TravelSubNav } from "@/components/travel/travel-sub-nav";
import { motion } from "framer-motion";

export default function TravelPage() {
  return (
    <div className="bg-[#02040a] min-h-screen selection:bg-violet-500">
      <TravelSubNav />
      <TravelHero />
      
      {/* Narrative Section */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-sm font-bold text-violet-500 uppercase tracking-[0.4em] mb-6">
            The Twenzetu Protocol
          </h2>
          <p className="text-2xl md:text-4xl font-light leading-tight text-white italic">
            "Travel is the ultimate expression of sovereignty. We provide the 
            infrastructure; you provide the destination."
          </p>
        </div>
      </section>

      <ExperienceGrid />
    </div>
  );
}