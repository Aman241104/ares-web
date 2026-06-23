"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Users,
  Zap,
  Trophy,
  Globe,
  Star,
  Medal,
  ShieldCheck,
  Flame,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: <Target className="w-6 h-6 text-[#D4AF37]" />,
    title: "Compete",
    desc: "High-stakes business competition that drives performance, accountability, and measurable growth across all 4 teams.",
  },
  {
    icon: <Users className="w-6 h-6 text-[#D4AF37]" />,
    title: "Collaborate",
    desc: "Build powerful business relationships that generate referrals, partnerships, and TYFCB revenue for all members.",
  },
  {
    icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
    title: "Create Impact",
    desc: "Build nation-leading businesses through consistent action, strategic thinking, and legendary leadership.",
  },
];

const WHY_CARDS = [
  {
    icon: <Target className="w-5 h-5 text-[#D4AF37]" />,
    title: "Showcase Tournament",
    desc: "Real-time leaderboard showing live tournament progress across all 4 weeks.",
  },
  {
    icon: <Trophy className="w-5 h-5 text-[#D4AF37]" />,
    title: "Celebrate Teams",
    desc: "Honor the 4 legendary teams and their outstanding team owners.",
  },
  {
    icon: <Globe className="w-5 h-5 text-[#D4AF37]" />,
    title: "Nation Building",
    desc: "Building a nation-building culture through collective business growth.",
  },
  {
    icon: <Star className="w-5 h-5 text-[#D4AF37]" />,
    title: "Permanent Recognition",
    desc: "Create lasting recognition for owners, partners, and member champions.",
  },
];

const VALUES = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Integrity", desc: "Every move is made with honesty, transparency, and honour." },
  { icon: <Flame className="w-6 h-6" />, title: "Ambition", desc: "We compete at the highest level because great businesses demand it." },
  { icon: <Medal className="w-6 h-6" />, title: "Excellence", desc: "Only championship-level execution earns a spot on the podium." },
  { icon: <Users className="w-6 h-6" />, title: "Brotherhood", desc: "Competitors on the field, brothers in business — always." },
];

const LEADERSHIP = [
  { name: "Narendra Modi", role: "Team Leader — Lions", img: "/images/owner_modi.png" },
  { name: "Ajit Doval", role: "Team Leader — Eagles", img: "/images/owner_doval.png" },
  { name: "Amit Shah", role: "Team Leader — Tigers", img: "/images/owner_shah.png" },
  { name: "Dr. S. Jaishankar", role: "Team Leader — Lotus", img: "/images/owner-portrait-4.jpg" },
];

const QUOTES = [
  "4 Teams. 4 Leaders. 1 Mission.",
  "Compete. Collaborate. Create Impact.",
  "The Arena is Set. The Legends Will Compete.",
  "Leaders Compete. Nation Progresses.",
  "One League. Endless Possibilities.",
  "Strategy Today. Legacy Tomorrow.",
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-btns", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-card", { opacity: 0, x: 30, duration: 1 }, "-=0.8");

      // Scroll reveals
      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: parent, start: "top 90%", once: true },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">
      
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
          <div>
            <div className="h-badge inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] block pulse-live" />
              <span className="font-montserrat text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase">The Arena Is Set</span>
            </div>

            <h1 className="h-title font-cinzel font-light text-white leading-[1.1] mb-6" style={{ fontSize: "clamp(36px, 6vw, 80px)" }}>
              ABOUT<br/>
              <span className="text-[#D4AF37] tracking-widest">ABL 2026</span>
            </h1>

            <div className="h-sub">
              <p className="font-montserrat text-white/60 text-base sm:text-lg tracking-[0.1em] mb-10 max-w-xl leading-relaxed">
                ARES Business League 2026 is a high-stakes, one-month business tournament bringing together 30 elite business owners competing across 4 iconic factions. Strategy. Leadership. Execution. One Winner.
              </p>

              <div className="flex flex-wrap gap-8 mb-10">
                {[
                  { val: "30", label: "Elite Players" },
                  { val: "4", label: "Iconic Factions" },
                  { val: "4", label: "Weeks of Battle" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-cinzel font-light text-[#D4AF37] text-3xl mb-1">{s.val}</div>
                    <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-btns flex flex-wrap gap-4">
              <Link href="/teams" className="btn-primary">
                Meet The Factions <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/leaderboard" className="btn-secondary">
                Live Leaderboard
              </Link>
            </div>
          </div>

          <div className="h-card relative">
            <div className="glass-card relative overflow-hidden p-10 border-white/10 bg-white/[0.02]">
              <div className="flex justify-center mb-8">
                <img src="/images/hero_arena.png" alt="Championship" className="w-full h-48 object-cover rounded-xl border border-white/10" style={{ filter: "contrast(110%)" }} />
              </div>

              <h3 className="font-cinzel font-light tracking-widest text-[#D4AF37] text-xl text-center mb-2 uppercase">
                Ares Business League
              </h3>
              <div className="font-montserrat text-white/40 text-[10px] tracking-[0.2em] uppercase text-center mb-8">
                2026 — Nation Builders Edition
              </div>

              <div className="space-y-4">
                {[
                  { label: "Duration", value: "June 24 – July 22, 2026" },
                  { label: "Format", value: "4 Teams. 30 Players." },
                  { label: "Stakes", value: "1.5x Pool + MVP Awards" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                    <span className="font-montserrat text-white/40 text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
                    <span className="font-cinzel text-white/90 text-sm tracking-wider">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="relative py-32 px-6 sm:px-10 lg:px-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="sr">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase">Our Purpose</span>
                <div className="h-px w-12 bg-white/10" />
              </div>
              <h2 className="font-cinzel font-light text-white leading-tight mb-8" style={{ fontSize: "clamp(36px,5vw,56px)" }}>
                THE <span className="text-[#D4AF37]">MISSION</span>
              </h2>
              <p className="font-montserrat text-white/60 text-sm leading-relaxed max-w-lg mb-8 tracking-wide">
                It is NOT just a competition. ARES Business League exists to build a nation through business growth, member collaboration, and forging legendary enterprises that generate massive TYFCB revenue together.
              </p>
            </div>

            <div className="glass-card p-10 relative overflow-hidden sr border-l-4 border-l-[#D4AF37] bg-white/[0.02]">
              <p className="font-cinzel text-white/90 text-2xl leading-relaxed font-light">
                &ldquo;Leaders Compete.<br />
                <span className="text-[#D4AF37]">Nation Progresses.</span>&rdquo;
              </p>
              <div className="mt-6 font-montserrat text-white/30 text-[10px] tracking-[0.3em] uppercase">
                The ABL 2026 Creed
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sr-stagger">
            {PILLARS.map((item) => (
              <div key={item.title} className="glass-card p-10 bg-white/[0.01] hover:bg-white/[0.03] transition-colors border-white/5">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-lg mb-4">{item.title}</h3>
                <p className="font-montserrat text-white/50 text-[11px] leading-[1.8] uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="relative py-32 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto relative sr">
          <div className="text-center mb-20">
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">Core Principles</span>
            <h2 className="font-cinzel font-light text-white" style={{ fontSize: "clamp(32px,4vw,48px)" }}>
              THE <span className="text-[#D4AF37]">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
            {VALUES.map((v) => (
              <div key={v.title} className="glass-card p-8 bg-white/[0.01] hover:bg-white/[0.03] transition-all border-white/5 hover:border-[#D4AF37]/30 group">
                <div className="w-10 h-10 mb-6 text-white/40 group-hover:text-[#D4AF37] transition-colors">
                  {v.icon}
                </div>
                <h3 className="font-cinzel tracking-widest text-white text-base mb-3 group-hover:text-[#D4AF37] transition-colors">{v.title}</h3>
                <p className="font-montserrat text-white/40 text-[10px] leading-relaxed tracking-wider uppercase">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP ─── */}
      <section className="relative py-32 px-6 sm:px-10 lg:px-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto relative sr">
          <div className="text-center mb-20">
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">The Champions</span>
            <h2 className="font-cinzel font-light text-white" style={{ fontSize: "clamp(32px,4vw,48px)" }}>
              MEET THE <span className="text-[#D4AF37]">LEADERS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sr-stagger">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="group relative">
                <div className="aspect-[3/4] overflow-hidden rounded-sm border border-white/10 relative">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover filter opacity-70 group-hover:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-cinzel tracking-wider text-white text-lg mb-1">{leader.name}</h3>
                    <div className="font-montserrat text-[#D4AF37] text-[9px] tracking-[0.2em] uppercase">{leader.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#000000] text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto sr">
          <h2 className="font-cinzel font-light text-white mb-6" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            READY TO <span className="text-[#D4AF37] italic">COMPETE?</span>
          </h2>
          <p className="font-montserrat text-white/50 text-sm tracking-wide mb-10 max-w-xl mx-auto leading-relaxed">
            Be part of the most exciting business tournament of 2026. Connect with elite business owners, compete for glory, and build your legacy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
             <Link href="/contact" className="btn-primary">
               Contact <ArrowRight className="w-4 h-4 ml-2" />
             </Link>
             <Link href="/schedule" className="btn-secondary">
               View Schedule
             </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
