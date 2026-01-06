"use client";

import React from "react";
import { TravelHero } from "@/components/travel/travel-hero";
import { ExperienceGrid } from "@/components/travel/experience-grid";
import { TravelSubNav } from "@/components/travel/travel-sub-nav";

export default function TravelPage() {
  return (
    <div className="bg-[#02040a] min-h-screen selection:bg-violet-500">
      <TravelSubNav />
      <TravelHero />
      <section className="py-24 px-6 border-y border-white/5 text-center">
        <h2 className="text-sm font-bold text-violet-500 uppercase tracking-[0.4em] mb-6">The Twenzetu Protocol</h2>
        <p className="text-2xl text-white italic max-w-2xl mx-auto">"Travel is the ultimate expression of sovereignty."</p>
      </section>
      <ExperienceGrid />
    </div>
  );
}