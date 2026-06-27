"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Target, Users, Zap, Trophy, Globe, Star,
  Medal, ShieldCheck, Flame, Handshake, TrendingUp,
  CalendarCheck, UserPlus, Sparkles, MinusCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";
import PageHero from "@/components/PageHero";
import { tournamentRules } from "@/lib/data";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Compete",
    desc: "High-stakes business competition that drives performance, accountability, and measurable growth across all 4 teams.",
    num: "01",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Collaborate",
    desc: "Build powerful business relationships that generate referrals, partnerships, and TYFCB revenue for all members.",
    num: "02",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Create Impact",
    desc: "Build nation-leading businesses through consistent action, strategic thinking, and legendary leadership.",
    num: "03",
  },
];

const VALUES = [
  { icon: <ShieldCheck className="w-6 h-6" />, title: "Integrity",    desc: "Every move is made with honesty, transparency, and honour.", accent: "#D4AF37" },
  { icon: <Flame className="w-6 h-6" />,       title: "Ambition",     desc: "We compete at the highest level because great businesses demand it.", accent: "#E07820" },
  { icon: <Medal className="w-6 h-6" />,       title: "Excellence",   desc: "Only championship-level execution earns a spot on the podium.", accent: "#C9921A" },
  { icon: <Users className="w-6 h-6" />,       title: "Brotherhood",  desc: "Competitors on the field, brothers in business — always.", accent: "#F0D060" },
];

const LEADERSHIP = [
  { name: "Narendra Modi",   role: "Team Leader",  faction: "Lions Visionaries",    color: "#E07820", img: "/images/owner_modi.png" },
  { name: "Ajit Doval",      role: "Team Leader",  faction: "Eagles Strategists",   color: "#1F3A93", img: "/images/owner_doval.png" },
  { name: "Amit Shah",       role: "Team Leader",  faction: "Tigers Warriors",      color: "#C0392B", img: "/images/owner_shah.png" },
  { name: "Dr. S. Jaishankar", role: "Team Leader", faction: "Lotus Diplomats",    color: "#1E824C", img: "/images/owner_jaishankar.png" },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-split", { types: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 40, stagger: 0.03, duration: 0.8 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-btns", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-card", { opacity: 0, x: 30, duration: 1 }, "-=0.8");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: parent, start: "top 88%", once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <PageHero backgroundImage="/images/luxury_boardroom.png" layout="left" className="min-h-[90vh] px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-20">

          {/* Left copy */}
          <div className="lg:col-span-6">
            <div className="h-badge inline-flex items-center gap-3 mb-8 relative">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/6 backdrop-blur-xl" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-live block relative z-10" />
              <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">The Arena Is Set · 2026</span>
            </div>

            <h1 className="font-cinzel font-bold text-white leading-none mb-8">
              <span className="h-title-split block" style={{ fontSize: "clamp(44px, 8vw, 96px)" }}>ABOUT</span>
              <span
                className="block mt-2 tracking-[0.08em]"
                style={{
                  fontSize: "clamp(44px, 8vw, 96px)",
                  background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
              >
                ABL 2026
              </span>
            </h1>

            <div className="h-sub max-w-lg mb-10">
              <p className="font-montserrat text-white/55 text-sm sm:text-base tracking-wider leading-[1.9] mb-8">
                A high-stakes, one-month business tournament bringing together 30 elite business owners competing across 4 iconic factions. Strategy. Leadership. Execution. One Winner.
              </p>
              <div className="flex items-center gap-8">
                {[
                  { val: "30", label: "Elite Players" },
                  { val: "4",  label: "Factions" },
                  { val: "4W", label: "Battle" },
                ].map((s, i) => (
                  <div key={s.label} className="relative">
                    {i !== 0 && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />}
                    <div className="font-cinzel font-bold text-[#D4AF37] text-3xl mb-1 number-glow">{s.val}</div>
                    <div className="font-montserrat text-white/60 text-[8px] uppercase tracking-[0.25em]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-btns flex flex-wrap gap-4">
              <Link href="/teams" className="btn-primary">Meet The Factions <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/leaderboard" className="btn-secondary">Live Leaderboard</Link>
            </div>
          </div>

          {/* Right info card */}
          <div className="h-card lg:col-span-5 lg:col-start-8">
            <div className="relative overflow-hidden border border-[rgba(212,175,55,0.2)] bg-black/50 backdrop-blur-xl rounded-sm p-8 shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />

              {/* Image inside card */}
              <div className="relative w-full h-44 mb-8 overflow-hidden rounded-sm">
                <Image fill src="/images/hero_arena.png" alt="Championship Arena" className="object-cover" sizes="400px" style={{ filter: "brightness(0.7) contrast(1.1)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="font-montserrat text-[7px] uppercase tracking-[0.3em] text-[#D4AF37]/70 mb-1">The Stage</div>
                  <div className="font-cinzel text-white text-sm tracking-widest">ARES Arena 2026</div>
                </div>
              </div>

              <h3 className="font-cinzel font-bold tracking-widest text-[#D4AF37] text-lg text-center mb-1 uppercase">Ares Business League</h3>
              <div className="font-montserrat text-white/55 text-[8px] tracking-[0.3em] uppercase text-center mb-7">2026 — Nation Builders Edition</div>

              <div className="space-y-0 divide-y divide-white/5">
                {[
                  { label: "Duration",  value: "June 24 – July 22, 2026" },
                  { label: "Format",    value: "4 Teams · 30 Players" },
                  { label: "Stakes",    value: "1.5× Pool + MVP Awards" },
                  { label: "Organized", value: "ARES League Committee" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-3.5">
                    <span className="font-montserrat text-white/55 text-[9px] uppercase tracking-[0.22em]">{item.label}</span>
                    <span className="font-cinzel text-white/85 text-xs tracking-wider">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* ═══════════════════════════════════
          MISSION STATEMENT
      ═══════════════════════════════════ */}
      <section className="relative py-16 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0D1424] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 30%, rgba(212,175,55,0.3) 70%, transparent)" }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">

            {/* Quote block */}
            <div className="sr order-2 lg:order-1">
              <div className="relative pl-8 border-l-2 border-[#D4AF37]/50">
                <div className="text-[#D4AF37]/20 font-cinzel text-[120px] leading-none absolute -top-6 -left-2 select-none pointer-events-none">&ldquo;</div>
                <p className="font-cinzel text-white text-2xl sm:text-3xl leading-relaxed font-light relative z-10">
                  Leaders Compete.<br />
                  <span className="text-[#D4AF37]">Nation Progresses.</span>
                </p>
                <div className="mt-6 font-montserrat text-white/65 text-[9px] tracking-[0.35em] uppercase">The ABL 2026 Creed</div>
              </div>
            </div>

            {/* Mission text */}
            <div className="sr order-1 lg:order-2">
              <div className="section-label mb-5">Our Purpose</div>
              <h2 className="font-cinzel font-bold text-white leading-tight mb-7" style={{ fontSize: "clamp(32px,4.5vw,54px)" }}>
                THE <span className="text-[#D4AF37]">MISSION</span>
              </h2>
              <p className="font-montserrat text-white/55 text-sm leading-[2] tracking-wide mb-6">
                It is NOT just a competition. ARES Business League exists to build a nation through business growth, member collaboration, and forging legendary enterprises that generate massive TYFCB revenue together.
              </p>
              <p className="font-montserrat text-white/60 text-xs leading-relaxed tracking-wide">
                Over 4 weeks, 30 elite business owners will compete, collaborate, and create impact — shaping the future of business in India.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sr-stagger">
            {PILLARS.map((item) => (
              <div key={item.title} className="group relative overflow-hidden border border-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.28)] bg-[#111827] hover:bg-[#0D1424] transition-all duration-500 p-8">
                {/* Ghost number */}
                <div className="absolute top-4 right-4 font-cinzel text-[72px] font-black text-white/[0.03] leading-none select-none pointer-events-none">{item.num}</div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]/0 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-[#D4AF37]/40 group-hover:to-transparent transition-all duration-500" />

                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-7 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors border border-[#D4AF37]/15 bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/30">
                  {item.icon}
                </div>
                <h3 className="font-cinzel tracking-[0.2em] text-white text-lg mb-4 group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                <p className="font-montserrat text-white/60 text-[10px] leading-[1.9] tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VALUES
      ═══════════════════════════════════ */}
      <section className="relative py-16 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0B132B] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.025) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sr">
            <div className="section-label mx-auto mb-5">Core Principles</div>
            <h2 className="font-cinzel font-bold text-white" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
              THE <span className="text-[#D4AF37]">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sr-stagger">
            {VALUES.map((v) => (
              <div key={v.title} className="group relative overflow-hidden border border-[rgba(212,175,55,0.1)] hover:border-[rgba(212,175,55,0.3)] bg-[#111827] hover:bg-[#0D1424] transition-all duration-500 p-8">
                {/* Top accent line in value color */}
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)` }} />
                <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-6 transition-all duration-400" style={{ color: v.accent, background: `${v.accent}12`, border: `1px solid ${v.accent}25` }}>
                  {v.icon}
                </div>
                <h3 className="font-cinzel tracking-[0.2em] text-white text-base mb-3 group-hover:text-[#D4AF37] transition-colors">{v.title}</h3>
                <p className="font-montserrat text-white/60 text-[10px] leading-relaxed tracking-wider">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          LEADERSHIP
      ═══════════════════════════════════ */}
      <section className="relative py-16 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0D1424] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.25) 30%, rgba(212,175,55,0.25) 70%, transparent)" }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sr">
            <div className="section-label mx-auto mb-5">The Champions</div>
            <h2 className="font-cinzel font-bold text-white" style={{ fontSize: "clamp(28px,4vw,48px)" }}>
              MEET THE <span className="text-[#D4AF37]">LEADERS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sr-stagger">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="group relative">
                {/* Top team color line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: leader.color, boxShadow: `0 0 10px ${leader.color}80` }} />

                <div className="aspect-[3/4] overflow-hidden relative border border-[rgba(212,175,55,0.1)] group-hover:border-[rgba(212,175,55,0.25)] transition-colors duration-500">
                  <Image
                    fill
                    src={leader.img}
                    alt={leader.name}
                    className="object-cover object-top opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width:640px) 50vw, 25vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  {/* Team color tint at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" style={{ mixBlendMode: "multiply" }} />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="font-montserrat text-[7px] uppercase tracking-[0.3em] mb-1.5" style={{ color: leader.color }}>{leader.role}</div>
                    <h3 className="font-cinzel tracking-wider text-white text-sm leading-tight mb-1">{leader.name}</h3>
                    <div className="font-montserrat text-white/60 text-[8px] tracking-[0.2em] uppercase">{leader.faction}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          POINT SYSTEM
      ═══════════════════════════════════ */}
      <section className="relative py-16 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0B132B] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sr">
            <div className="section-label mx-auto mb-5">How Points Work</div>
            <h2 className="font-cinzel font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(28px,4vw,52px)" }}>
              THE POINT <span className="text-[#D4AF37]">SYSTEM</span>
            </h2>
            <p className="font-montserrat text-white/60 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto tracking-wide">
              Every referral, every meeting, every business generated earns points. Here is exactly how the scoreboard moves.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 sr">
            {/* Core scoring */}
            <div className="lg:col-span-2 overflow-hidden border border-[rgba(212,175,55,0.15)] rounded-sm">
              <div className="px-7 py-5 border-b border-white/5 flex items-center gap-3 bg-[#D4AF37]/5">
                <Trophy className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-cinzel text-white text-xs tracking-[0.25em] uppercase">Core Scoring</span>
                <span className="ml-auto font-montserrat text-white/65 text-[8px] uppercase tracking-widest">Per Week</span>
              </div>
              <div className="divide-y divide-white/5 bg-[#111827]">
                {[
                  { icon: <TrendingUp className="w-4 h-4" />,    label: "Business Growth (TYFCB)",  pts: "Up to 300",  color: "#D4AF37" },
                  { icon: <UserPlus className="w-4 h-4" />,      label: "Referrals Generated",      pts: "Up to 250",  color: "#b0bec5" },
                  { icon: <Handshake className="w-4 h-4" />,     label: "1 to 1 Meetings",          pts: "Up to 200",  color: "#CD7F32" },
                  { icon: <Users className="w-4 h-4" />,         label: "One-to-Ones Conducted",    pts: "Up to 150",  color: "#D4AF37" },
                  { icon: <CalendarCheck className="w-4 h-4" />, label: "Event Participation",      pts: "Up to 100",  color: "#b0bec5" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-5 px-7 py-4 hover:bg-white/[0.05] transition-colors group">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-sm border" style={{ color: row.color, borderColor: `${row.color}30`, background: `${row.color}0d` }}>
                      {row.icon}
                    </div>
                    <span className="font-montserrat text-white/60 text-xs tracking-wide flex-1">{row.label}</span>
                    <span className="font-cinzel text-sm flex-shrink-0" style={{ color: row.color }}>{row.pts}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between px-7 py-5 bg-[#D4AF37]/6 border-t border-[#D4AF37]/15">
                  <span className="font-montserrat text-white/70 text-[9px] uppercase tracking-[0.22em]">Maximum Core Points</span>
                  <span className="font-cinzel text-[#D4AF37] text-xl">1,000 <span className="text-xs text-[#D4AF37]/50">/ week</span></span>
                </div>
              </div>
            </div>

            {/* Bonus + Deductions */}
            <div className="flex flex-col gap-5">
              <div className="flex-1 overflow-hidden border border-[rgba(212,175,55,0.12)] rounded-sm">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-[#D4AF37]/5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-cinzel text-white text-[10px] tracking-[0.25em] uppercase">Bonus Points</span>
                </div>
                <div className="divide-y divide-white/5 bg-[#111827]">
                  {[
                    { label: "Early Bird",          pts: "+25"  },
                    { label: "Weekly Top Scorer",   pts: "+50"  },
                    { label: "Perfect Attendance",  pts: "+30"  },
                    { label: "Special Events",      pts: "+100" },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.05] transition-colors">
                      <span className="font-montserrat text-white/50 text-[10px] tracking-wide">{b.label}</span>
                      <span className="font-cinzel text-[#D4AF37] text-sm">{b.pts}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden border border-red-500/15 rounded-sm">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-red-500/5">
                  <MinusCircle className="w-4 h-4 text-red-400/70" />
                  <span className="font-cinzel text-white text-[10px] tracking-[0.25em] uppercase">Deductions</span>
                </div>
                <div className="divide-y divide-white/5 bg-[#111827]">
                  {[
                    { label: "Absence (unexcused)", pts: "−25" },
                    { label: "Late Submission",     pts: "−15" },
                  ].map((d) => (
                    <div key={d.label} className="flex items-center justify-between px-6 py-3.5 hover:bg-white/[0.05] transition-colors">
                      <span className="font-montserrat text-white/50 text-[10px] tracking-wide">{d.label}</span>
                      <span className="font-cinzel text-red-400/80 text-sm">{d.pts}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center sr">
            <Link href="/rules" className="inline-flex items-center gap-2 font-montserrat text-white/60 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.25em]">
              View Full Rules & Scoring Guide <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════ */}
      <section className="relative py-16 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#0D1424] text-center border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto sr relative">
          <div className="section-label mx-auto mb-6">Join The Arena</div>
          <h2 className="font-cinzel font-bold text-white mb-6" style={{ fontSize: "clamp(32px,5vw,64px)" }}>
            READY TO <span className="text-[#D4AF37]">COMPETE?</span>
          </h2>
          <p className="font-montserrat text-white/70 text-sm tracking-wide mb-10 max-w-xl mx-auto leading-[2]">
            Be part of the most exciting business tournament of 2026. Connect with elite business owners, compete for glory, and build your legacy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">Contact <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/schedule" className="btn-secondary">View Schedule</Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
