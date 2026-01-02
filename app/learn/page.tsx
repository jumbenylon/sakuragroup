"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  PlayCircle,
  Layers,
  Globe,
  Star,
  ArrowRight,
} from "lucide-react";

export default function LearnPage() {
  return (
    <main className="bg-[#050912] text-white min-h-screen">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-emerald-400 text-sm mb-3 tracking-widest uppercase">
          Xhule — Learn
        </p>

        <h1 className="text-4xl md:text-6xl font-black leading-tight">
          Learn. Build. Share.
          <br />
          Knowledge for the Tanzanian Creative Economy.
        </h1>

        <p className="text-slate-400 mt-6 max-w-2xl">
          Courses, guides, and real-world lessons from practitioners, founders,
          makers, and street innovators. Built for people creating value in
          Tanzania — designers, marketers, developers, and entrepreneurs.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/learn/courses"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold flex items-center gap-2"
          >
            Browse Courses <ArrowRight size={16} />
          </Link>

          <Link
            href="/learn/become-a-tutor"
            className="px-6 py-3 border border-white/20 hover:bg-white/5 rounded-lg"
          >
            Become a Contributor
          </Link>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Why Xhule Exists</h2>
          <p className="text-slate-400">
            Most learning platforms recycle Western examples that don’t match
            how business and culture really work here. We document knowledge
            from Tanzania — creative work, digital trade, media, technology, and
            street-level entrepreneurship.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Community Growth", icon: Users },
              { label: "Earn Rewards", icon: TrendingUp },
              { label: "Build Credibility", icon: ShieldCheck },
              { label: "Global Reach", icon: BookOpen },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl"
              >
                <f.icon className="mb-3 text-emerald-400" size={24} />
                <p className="text-sm">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-80 rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
            alt="Learning community"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* COURSE CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-10">
        <h2 className="text-3xl font-bold">Learning Tracks</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Design & Branding",
              desc: "Identity, product visuals, motion, typography, and creative workflows.",
              icon: Layers,
            },
            {
              title: "Marketing & Growth",
              desc: "Digital strategy, campaigns, content, analytics, and brand positioning.",
              icon: Globe,
            },
            {
              title: "Web & Technology",
              desc: "Web dev, tools, automation, CMS, product thinking and platforms.",
              icon: Star,
            },
          ].map((c, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              <c.icon className="text-emerald-400 mb-4" size={28} />
              <h3 className="font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-slate-400 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TUTOR ONBOARDING */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Become a Tutor</h2>
          <p className="text-slate-400 mb-6">
            Share what you know. Whether you’re a designer, filmmaker, developer
            or creative entrepreneur — your experience can help someone grow.
          </p>

          <ul className="space-y-3 text-slate-300">
            <li>• Create short courses or micro-lessons</li>
            <li>• Get exposure across the Sakura ecosystem</li>
            <li>• Earn rewards and collaboration opportunities</li>
          </ul>

          <Link
            href="/learn/become-a-tutor"
            className="mt-8 inline-flex px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold"
          >
            Start Onboarding
          </Link>
        </div>

        <div className="relative h-80 rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200"
            alt="Creative tutor session"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Built for Tanzania. Ready for the World.
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10">
          Xhule is a living library of real experience — practical lessons,
          culture-aware insights, and knowledge from people doing the work
          today.
        </p>

        <Link
          href="/learn/courses"
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold inline-flex items-center gap-2"
        >
          Explore Courses <PlayCircle size={18} />
        </Link>
      </section>
    </main>
  );
}
