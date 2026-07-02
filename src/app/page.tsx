"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Calendar, Briefcase, Building2, Star, CheckCircle2, CircleDot, Circle, Image as ImageIcon, BookOpen, Phone, Globe, TrendingUp } from "lucide-react";
import { teams, partners, specialEvents, scheduleEvents } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const TeamCrest = ({ teamId, color, size = "sm" }: { teamId: string; color: string; size?: "sm" | "md" | "lg" }) => {
  const initials: Record<string, string> = { modi: "V", doval: "S", "amit-shah": "W", jaishankar: "D" };
  const sz = size === "sm" ? "w-8 h-8 text-xs" : size === "md" ? "w-10 h-10 text-sm" : "w-14 h-14 text-base";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-cinzel font-black text-white flex-shrink-0 ring-2 ring-white/5`} style={{ background: `linear-gradient(135deg, ${color}ee, ${color}88)`, boxShadow: `0 0 16px ${color}44` }}>
      {initials[teamId]}
    </div>
  );
};

function MiniSparkline({ values, color }: { values: number[]; color: string }) {
  const w = 56, h = 18;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const xs = values.map((_, i) => (i / (values.length - 1)) * w);
  const ys = values.map(v => h - 2 - ((v - min) / range) * (h - 4));
  const pts = xs.map((x, i) => `${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{display:"block"}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {xs.map((x, i) => <circle key={i} cx={x.toFixed(1)} cy={ys[i].toFixed(1)} r="2" fill={color} />)}
    </svg>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const glassPanelRef = useRef<HTMLDivElement>(null);
  const glassArrowRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const bgLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       if (ctaTitleRef.current) {
         const titleSplit = new SplitType(ctaTitleRef.current, { types: "words,chars" });
         gsap.from(titleSplit.chars, {
           scrollTrigger: { trigger: ctaRef.current, start: "top 75%", once: true },
           opacity: 0, y: 50, rotateX: -90, stagger: 0.04, duration: 1, ease: "back.out(1.5)"
         });
       }

       if (glassArrowRef.current && glassPanelRef.current) {
         gsap.fromTo(glassArrowRef.current,
           { y: 80, opacity: 0 },
           {
             scrollTrigger: { trigger: glassPanelRef.current, start: "top 90%", end: "bottom 30%", scrub: 1 },
             y: -20, opacity: 1, ease: "none"
           }
         );
       }

       if (ctaRef.current) {
         gsap.fromTo(".cta-orb",
           { y: 50, scale: 0.8 },
           {
             scrollTrigger: { trigger: ctaRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
             y: -150, scale: 1.2, ease: "none", stagger: 0.1
           }
         );
       }

       if (bgLogoRef.current && ctaRef.current) {
         gsap.fromTo(bgLogoRef.current,
           { yPercent: 20, rotation: -10 },
           {
             scrollTrigger: { trigger: ctaRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
             yPercent: -20, rotation: 10, ease: "none"
           }
         );
       }
    });
    return () => ctx.revert();
  }, []);

  const handleGlassMouseMove = (e: React.MouseEvent) => {
    if (!glassPanelRef.current || typeof window === "undefined" || window.innerWidth < 1024) return;
    const { left, top, width, height } = glassPanelRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    gsap.to(glassPanelRef.current, { 
      rotateY: x, rotateX: -y, 
      "--mouse-x": `${e.clientX - left}px`,
      "--mouse-y": `${e.clientY - top}px`,
      duration: 0.4, ease: "power2.out", transformPerspective: 1000 
    });
  };

  const handleGlassMouseLeave = () => {
    if (!glassPanelRef.current) return;
    gsap.to(glassPanelRef.current, { rotateY: 0, rotateX: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
  };

  const handleBtnMouseMove = (e: React.MouseEvent) => {
    if (!ctaBtnRef.current || typeof window === "undefined" || window.innerWidth < 1024) return;
    const { left, top, width, height } = ctaBtnRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    gsap.to(ctaBtnRef.current, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleBtnMouseLeave = () => {
    if (!ctaBtnRef.current) return;
    gsap.to(ctaBtnRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-ares", { types: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 60, rotateX: -90, stagger: 0.05, duration: 1, ease: "back.out(1.7)" }, "-=0.4")
        .from(".h-title-bl", { opacity: 0, x: -30, duration: 0.8 }, "-=0.5")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-btns", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-dock", { opacity: 0, y: 30, duration: 1, ease: "power3.out" }, "-=0.4")
        .from(".h-stat-item", { opacity: 0, y: 15, duration: 0.8, stagger: 0.1 }, "-=0.8");

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
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: parent, start: "top 90%", once: true },
          }
        );
      });

      ScrollTrigger.refresh();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const sorted = [...teams].sort((a, b) => a.rank - b.rank);

  const weekData: Record<string, number[]> = {
    modi: [520, 765, 920, 1285],
    doval: [480, 660, 820, 1160],
    "amit-shah": [430, 600, 760, 1076],
    jaishankar: [380, 540, 700, 945],
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    gsap.to(".parallax-bg", { x: xPos * 2, y: yPos * 2, duration: 1, ease: "power2.out" });
  };

  const mascots: Record<string, string> = {
    modi:        "/images/poster_modi.png",
    doval:       "/images/poster_doval.png",
    "amit-shah": "/images/poster_amitshah.png",
    jaishankar:  "/images/poster_jaishankar.png",
  };
  const ownerImgs: Record<string, string> = {
    modi:        "/images/owner_modi.png",
    doval:       "/images/owner_doval.png",
    "amit-shah": "/images/owner_shah.png",
    jaishankar:  "/images/owner_jaishankar.png",
  };

  return (
    <div ref={heroRef} className="overflow-x-hidden bg-[#000000]" onMouseMove={handleMouseMove}>

      {/* ═══════════════════════════════════════════
          HERO — CINEMATIC (trophy stadium left-split)
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* ── FULL-BLEED BACKGROUND IMAGE ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_trophy_stadium.png"
            alt="ARES Business League 2026 — Championship Trophy"
            fill
            sizes="100vw"
            className="object-cover object-center parallax-bg scale-110"
            priority
            style={{ filter: "brightness(0.85) saturate(1.1)" }}
          />
        </div>

        {/* ── GRADIENT OVERLAYS — darken left so text pops, let right show trophy ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Strong dark veil over left half */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(7,12,28,0.97) 0%, rgba(7,12,28,0.90) 28%, rgba(7,12,28,0.55) 52%, rgba(7,12,28,0.10) 70%, transparent 85%)" }} />
          {/* Top fade for navbar */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-transparent to-transparent" style={{ height: "22%" }} />
          {/* Bottom fade into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000000] to-transparent" />
          {/* Diagonal gold accent line removed as it overlapped with text */}
        </div>

        {/* ── FLOATING GOLD PARTICLES ── z-[2] (left half only) */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {[
            { x: 6,  delay: 0,   dur: 7.0, size: 1.5, op: 0.45 },
            { x: 12, delay: 1.4, dur: 5.5, size: 1.0, op: 0.35 },
            { x: 18, delay: 0.7, dur: 8.0, size: 2.0, op: 0.30 },
            { x: 24, delay: 2.1, dur: 6.2, size: 1.5, op: 0.40 },
            { x: 30, delay: 0.3, dur: 5.8, size: 1.2, op: 0.28 },
            { x: 36, delay: 1.9, dur: 7.5, size: 2.5, op: 0.25 },
            { x: 42, delay: 3.2, dur: 6.0, size: 1.0, op: 0.38 },
            { x: 9,  delay: 0.6, dur: 9.0, size: 1.8, op: 0.22 },
            { x: 20, delay: 4.0, dur: 5.2, size: 1.2, op: 0.32 },
          ].map((p, i) => (
            <div key={i} className="absolute rounded-full particle-float"
              style={{
                left: `${p.x}%`, bottom: "8%",
                width: `${p.size}px`, height: `${p.size}px`,
                background: `rgba(255,194,0,${p.op})`,
                boxShadow: `0 0 ${p.size * 4}px rgba(255,194,0,${p.op * 0.7})`,
                animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>

        {/* ── GRAIN OVERLAY ── z-[3] */}
        <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "url(/images/noise.svg)", backgroundSize: "180px 180px" }} />

        {/* ── HERO CONTENT — LEFT SIDE ── */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen pt-20 sm:pt-24 pb-0 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="max-w-[600px] lg:max-w-[52%]">

            {/* Live badge */}
            <div className="h-badge inline-flex items-center gap-3 mb-5 sm:mb-8 px-4 sm:px-5 py-2 sm:py-2.5 relative">
              <div className="absolute inset-0 border border-[#FFC200]/30 bg-[#FFC200]/14 backdrop-blur-xl" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC200] pulse-live block relative z-10" />
              <span className="font-montserrat text-[#FFC200] text-[8px] font-bold tracking-[0.5em] uppercase relative z-10">Nation Builders Edition · 2026</span>
            </div>

            {/* Main title */}
            <h1 className="font-cinzel font-black leading-none mb-2">
              <span
                className="h-title-ares block text-white"
                style={{
                  fontSize: "clamp(72px, 14vw, 160px)",
                  letterSpacing: "0.08em",
                  textShadow: "0 4px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)",
                  lineHeight: 0.92,
                }}
              >
                ARES
              </span>
              <span
                className="h-title-bl block font-bold whitespace-nowrap"
                style={{
                  fontSize: "clamp(18px, 3.4vw, 46px)",
                  letterSpacing: "0.22em",
                  background: "linear-gradient(90deg, #B88733, #FFC200, #FFD700, #FFC200, #B88733)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginTop: "0.15em",
                  lineHeight: 1,
                }}
              >
                BUSINESS LEAGUE
              </span>
            </h1>

            {/* Gold divider */}
            <div className="flex items-center gap-4 my-7">
              <div className="h-[1.5px] w-16 bg-gradient-to-r from-[#FFC200] to-transparent" />
              <span className="font-montserrat text-[#FFC200]/70 text-[8px] tracking-[0.45em] uppercase font-bold">Est. 2026</span>
            </div>

            {/* Subtext */}
            <div className="h-sub mb-10">
              {/* Primary tagline — design guide hero statement */}
              <p className="font-cinzel font-bold text-white leading-[1.15] mb-4"
                style={{ fontSize: "clamp(14px, 2.2vw, 22px)", letterSpacing: "0.12em", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}>
                COMPETE.{" "}
                <span style={{ background: "linear-gradient(90deg, #FFC200, #FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  COLLABORATE.
                </span>{" "}
                CREATE IMPACT.
              </p>
              <p className="font-montserrat text-white/50 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
                4 Teams · 4 Leaders · 1 Mission · July 1st – July 29th
              </p>
            </div>

            {/* CTAs */}
            <div className="h-btns flex flex-col sm:flex-row flex-wrap items-center sm:items-start gap-4 sm:gap-6 mb-14">
              <div className="flex flex-wrap gap-4">
                <Link href="/teams" className="btn-primary px-10 py-5 text-[11px] tracking-[0.25em]">
                  Explore Teams <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/leaderboard" className="btn-secondary px-10 py-5 text-[11px] tracking-[0.25em]">
                  View Leaderboard
                </Link>
              </div>
              <div className="flex items-center sm:h-[52px]">
                <span className="font-montserrat text-white/50 text-[9px] uppercase tracking-[0.2em] border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                  Scores refreshed every Wednesday
                </span>
              </div>
            </div>

            {/* ── STATS DOCK — inline below CTAs ── */}
            <div className="h-dock w-full max-w-lg relative">
              <div className="flex gap-6 sm:gap-10 relative z-10">
                {[
                  { n: "30",  l: "Business Owners", icon: <Users className="w-5 h-5 text-[#D4AF37]/70" /> },
                  { n: "4",   l: "Teams", icon: <Building2 className="w-5 h-5 text-[#D4AF37]/70" /> },
                  { n: "1",   l: "Month", icon: <Calendar className="w-5 h-5 text-[#D4AF37]/70" /> },
                  { n: "1",   l: "Winner", icon: <Trophy className="w-5 h-5 text-[#D4AF37]/70" /> },
                ].map((s) => (
                  <div key={s.l} className="h-stat-item flex flex-col items-center sm:items-start">
                    <div className="mb-2">{s.icon}</div>
                    <div className="font-cinzel font-bold text-[#FFC200] number-glow" style={{ fontSize: "clamp(24px, 3.5vw, 36px)", lineHeight: 1, textShadow: "0 0 25px rgba(255,194,0,0.55)" }}>{s.n}</div>
                    <div className="font-montserrat text-white/55 text-[7px] uppercase tracking-[0.3em] font-bold mt-1.5 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 z-10 hidden lg:flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
          <span className="font-montserrat text-[7px] uppercase tracking-[0.4em] text-white/60" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#FFC200]/60 to-transparent" style={{ animation: "float-slow 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOURNAMENT METRICS STRIP
      ═══════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#030712] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-grid-fine opacity-60" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,194,0,0.08) 0%, transparent 70%)" }} />
        <div className="gold-divider opacity-60" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 relative">
          <div className="text-center mb-14 sr">
            <div className="section-label mx-auto mb-5">Tournament at a Glance</div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 sr overflow-hidden border border-[rgba(255,194,0,0.12)] rounded-sm">
            {[
              { n: "30",  label: "Business Owners",  sub: "Competing across 4 factions", suffix: "+" },
              { n: "4",   label: "Iconic Teams",   sub: "Led by iconic team owners",     suffix: "" },
              { n: "4",   label: "Weeks of Battle", sub: "July 1st – July 29th, 2026",     suffix: "" },
              { n: "∞",   label: "Legacy",         sub: "One champion, one legend",    suffix: "" },
            ].map((s, i) => (
              <div key={s.label} className="relative bg-[#030712] flex flex-col items-center justify-center text-center px-6 py-14 group hover:bg-[#0e1830] transition-all duration-500 overflow-hidden border-r border-[rgba(255,194,0,0.08)] last:border-r-0">
                {/* Ghost chapter number */}
                <div className="absolute top-4 right-4 font-cinzel text-[64px] font-black text-white/[0.03] select-none leading-none pointer-events-none">{String(i+1).padStart(2,"0")}</div>
                {/* Hover gold floor glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,194,0,0.10) 0%, transparent 70%)" }} />
                {/* Top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, transparent, rgba(255,194,0,0.8), transparent)" }} />
                <div
                  className="font-cinzel font-bold text-[#FFC200] mb-3 number-glow relative z-10"
                  style={{ fontSize: "clamp(56px, 8vw, 100px)", lineHeight: 1, textShadow: "0 0 40px rgba(255,194,0,0.4), 0 4px 20px rgba(0,0,0,0.8)" }}
                >
                  {s.n}{s.suffix && <span className="text-[0.4em] align-top mt-2 inline-block text-[#D4AF37]">{s.suffix}</span>}
                </div>
                <div className="font-cinzel text-white text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2 relative z-10">{s.label}</div>
                <div className="font-montserrat text-white/55 text-[7px] sm:text-[8px] uppercase tracking-[0.2em] relative z-10">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="gold-divider opacity-30" />
      </section>

      {/* ═══════════════════════════════════════════
          LIVE LEADERBOARD
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000] relative z-20">
        {/* Subtle ambient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(212,175,55,0.025) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Leaderboard table */}
            <div className="lg:col-span-2 sr">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-1">
                    <h2 className="font-cinzel text-white text-lg sm:text-xl tracking-widest">Standings</h2>
                    <span className="flex items-center gap-2 bg-green-500/8 border border-green-500/20 rounded-full px-3 py-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-live block" />
                      <span className="font-montserrat text-green-400/80 text-[8px] font-bold uppercase tracking-[0.25em]">Live</span>
                    </span>
                  </div>
                  <p className="font-cormorant italic text-white/60 text-sm">Updated in real-time</p>
                </div>
                <Link href="/leaderboard" className="font-montserrat text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.25em] inline-flex items-center gap-2">
                  Full Standings <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-hidden border border-[rgba(255,194,0,0.20)] rounded-sm backdrop-blur-sm shadow-[0_0_0_0.5px_rgba(255,194,0,0.08)]">
                {/* Header */}
                <div className="grid grid-cols-[32px_1fr_auto] sm:grid-cols-12 px-4 sm:px-6 py-4 border-b border-white/5 bg-white/[0.05]">
                  <div className="sm:col-span-1 font-montserrat text-white/55 text-[8px] uppercase tracking-[0.25em]">#</div>
                  <div className="sm:col-span-6 font-montserrat text-white/55 text-[8px] uppercase tracking-[0.25em]">Team</div>
                  <div className="sm:col-span-2 font-montserrat text-white/55 text-[8px] uppercase tracking-[0.25em] text-right">Pts</div>
                  <div className="hidden sm:block sm:col-span-2 font-montserrat text-white/55 text-[8px] uppercase tracking-[0.25em] text-right">Week</div>
                  <div className="hidden sm:block sm:col-span-1 font-montserrat text-white/55 text-[8px] uppercase tracking-[0.25em] text-center">Trend</div>
                </div>

                {/* Rows */}
                {sorted.map((team, i) => (
                  <Link key={team.id} href={`/teams/${team.id}`} className="grid grid-cols-[32px_1fr_auto] sm:grid-cols-12 px-4 sm:px-6 py-4 sm:py-5 items-center border-b border-white/5 transition-all duration-300 group relative overflow-hidden"
                    style={{ background: i === 0 ? `linear-gradient(90deg, rgba(255,194,0,0.07) 0%, transparent 50%)` : undefined }}
                  >
                    {/* Left team-color bar — always visible for top 3 */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: i < 3 ? team.color : "transparent", boxShadow: i === 0 ? `0 0 12px ${team.color}` : "none", opacity: i === 0 ? 1 : 0.5 }} />
                    {/* Hover tint */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `linear-gradient(90deg, ${team.color}06 0%, transparent 60%)` }} />
                    {/* #1 LEADER badge — desktop only */}
                    {i === 0 && <div className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 font-montserrat text-[6px] font-black uppercase tracking-[0.35em] text-[#FFC200] border border-[#FFC200]/30 bg-[#FFC200]/14 px-2 py-0.5">LEADER</div>}

                    <div className="sm:col-span-1 flex items-center">
                      <div
                        className="font-cinzel text-lg sm:text-xl font-light"
                        style={{
                          color: i===0?"#D4AF37":i===1?"#b0bec5":i===2?"#CD7F32":"rgba(255,255,255,0.25)",
                          textShadow: i===0?"0 0 20px rgba(212,175,55,0.4)":i===1?"0 0 15px rgba(176,190,197,0.3)":i===2?"0 0 15px rgba(205,127,50,0.3)":"none",
                        }}
                      >
                        {String(i+1).padStart(2,"0")}
                      </div>
                    </div>

                    <div className="sm:col-span-6 flex items-center gap-2 sm:gap-4 min-w-0">
                      <TeamCrest teamId={team.id} color={team.color} size="sm" />
                      <div className="min-w-0">
                        <div className="font-cinzel text-white text-[10px] sm:text-sm tracking-[0.12em] sm:tracking-widest uppercase group-hover:text-[#F0D060] transition-colors truncate">
                          {team.name}
                        </div>
                        <div className="font-montserrat text-[8px] mt-0.5 tracking-[0.15em] uppercase opacity-70" style={{ color: team.color }}>
                          {team.fullName.split(" ").at(-1)}
                        </div>
                      </div>
                      {/* Mobile-only LEADER pill */}
                      {i === 0 && <div className="sm:hidden flex-shrink-0 font-montserrat text-[6px] font-black uppercase tracking-[0.25em] text-[#FFC200] border border-[#FFC200]/30 bg-[#FFC200]/14 px-1.5 py-0.5">LEADER</div>}
                    </div>

                    <div className="sm:col-span-2 text-right">
                      <span className="font-cinzel text-base sm:text-xl" style={{ color: i===0?"#D4AF37":"rgba(240,234,214,0.85)" }}>
                        {team.points.toLocaleString()}
                      </span>
                    </div>

                    <div className="hidden sm:block sm:col-span-2 text-right">
                      <span className="font-montserrat text-xs text-white/60 tracking-wider">+{team.weekPoints}</span>
                    </div>

                    <div className="hidden sm:flex sm:col-span-1 justify-center">
                      <MiniSparkline values={weekData[team.id] ?? [0,0,0,0]} color={team.color} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Metrics sidebar */}
            <div className="sr flex flex-col gap-5">
              <div className="flex items-center gap-3 mb-1">
                <Trophy className="w-4 h-4 text-[#D4AF37]/70" />
                <h3 className="font-cinzel text-white text-base tracking-widest">League Metrics</h3>
              </div>

              {[
                { label: "TYFCB Generated", value: "₹3.4M", icon: <Briefcase className="w-4 h-4" />, sub: "Business value created" },
                { label: "Referrals Passed", value: "610",   icon: <Users className="w-4 h-4" />,    sub: "Connections made" },
                { label: "1-2-1 Meetings",   value: "1,078", icon: <Calendar className="w-4 h-4" />, sub: "Direct meetings held" },
              ].map((m) => (
                <div key={m.label} className="card-glow p-6 group hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-montserrat text-white/60 text-[8px] uppercase tracking-[0.25em]">{m.label}</div>
                    <div className="text-[#D4AF37]/30 group-hover:text-[#D4AF37]/60 transition-colors">{m.icon}</div>
                  </div>
                  <div className="font-cinzel text-white text-3xl sm:text-4xl mb-1">{m.value}</div>
                  <div className="font-montserrat text-white/20 text-[8px] uppercase tracking-[0.2em]">{m.sub}</div>
                </div>
              ))}

              {/* CTA card */}
              <Link href="/leaderboard" className="group block mt-1">
                <div className="glass-card p-5 flex items-center justify-between hover:border-[#D4AF37]/30 transition-all">
                  <div>
                    <div className="font-montserrat text-[9px] uppercase tracking-[0.2em] text-white/55 mb-1">Full Breakdown</div>
                    <div className="font-cinzel text-white text-sm tracking-wider group-hover:text-[#D4AF37] transition-colors">View Analytics</div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TEAM SPOTLIGHT — THE FACTIONS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-grid opacity-40" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,194,0,0.08) 0%, transparent 70%)" }} />
        <div className="gold-divider opacity-60" />

        <div className="max-w-7xl mx-auto relative">
          <div className="mb-14 sr text-center">
            <div className="section-label mx-auto mb-4">The Factions</div>
            <h2 className="font-cinzel text-white text-2xl sm:text-3xl tracking-[0.2em] text-shadow-gold">Choose Your Side</h2>
            <p className="font-cormorant italic text-white/50 text-base sm:text-lg mt-2">Four factions. One championship. Eternal legacy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sr-stagger">
            {sorted.map((team) => (
              <div key={team.id} className="group relative">
                {/* Top team-color accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 z-20 transition-all duration-500 rounded-t-sm" style={{ background: team.color, boxShadow: `0 0 12px ${team.color}88`, opacity: 0.7 }} />
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: team.color, boxShadow: `0 0 20px ${team.color}, 0 0 40px ${team.color}60` }}
                />

                <div className="overflow-hidden border transition-all duration-500 bg-[#0B1120] rounded-sm relative"
                  style={{
                    borderColor: "rgba(255,194,0,0.22)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = team.color + "99"; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 50px ${team.color}25, 0 20px 60px rgba(0,0,0,0.5)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,194,0,0.22)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  {/* Image area */}
                  <Link href={`/teams/${team.id}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={mascots[team.id]}
                        alt={team.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover object-center transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                      />
                      <Image
                        src={ownerImgs[team.id]}
                        alt={team.owner.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover object-top transition-all duration-700 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
                      />

                      {/* Team color gradient overlay — lighter on default (poster has own design) */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                        style={{ background: `linear-gradient(180deg, ${team.color}00 0%, ${team.color}90 100%)` }}
                      />
                      {/* Team color ambient flood on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse 120% 80% at 50% 110%, ${team.color}30 0%, transparent 60%)` }}
                      />
                      {/* Scrim — invisible on default (poster has its own), appears on hover for owner card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Rank badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="font-cinzel text-xs px-2.5 py-1 border border-white/15 bg-black/50 backdrop-blur-sm tracking-widest"
                             style={{ color: team.rank===1?"#D4AF37":team.rank===2?"#b0bec5":team.rank===3?"#CD7F32":"rgba(255,255,255,0.4)" }}>
                          #{team.rank}
                        </div>
                      </div>

                      {/* Hover state overlay — owner reveal */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                        <div className="font-montserrat text-[8px] uppercase tracking-[0.3em] mb-1.5" style={{ color: team.color }}>Team Captain</div>
                        <div className="font-cinzel text-white text-base tracking-wider leading-tight">{team.owner.name}</div>
                        <div className="font-montserrat text-white/70 text-[9px] mt-1.5 tracking-wider leading-relaxed">{team.owner.leadershipStyle}</div>
                      </div>
                    </div>
                  </Link>

                  {/* Footer */}
                  <div className="p-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-montserrat text-white/70 text-[8px] uppercase tracking-widest">Points</div>
                      <div className="font-cinzel text-sm" style={{ color: team.color }}>{team.points.toLocaleString()}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/teams/${team.id}`}
                        className="flex items-center justify-center gap-1.5 font-montserrat text-[8px] text-white/40 uppercase tracking-[0.18em] py-2.5 border border-white/8 hover:border-white/20 hover:text-white transition-all duration-300"
                      >
                        Team <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                      <Link
                        href={`/owners/${team.owner.id}`}
                        className="flex items-center justify-center gap-1.5 font-montserrat text-[8px] uppercase tracking-[0.18em] py-2.5 border transition-all duration-300 hover:opacity-90"
                        style={{ color: team.color, borderColor: `${team.color}35`, background: `${team.color}08` }}
                      >
                        Owner <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sr">
            <Link href="/teams" className="btn-secondary px-8 py-3.5 text-[10px] tracking-[0.22em]">
              View All Teams <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EVENTS & PARTNERS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,194,0,0.06) 0%, transparent 70%)" }} />
        <div className="gold-divider opacity-60" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

          {/* Special Events */}
          <div>
            <div className="sr flex items-center justify-between mb-8">
              <div>
                <div className="section-label mb-2">Special Events</div>
                <h2 className="font-cinzel text-white text-xl tracking-widest">Key Milestones</h2>
              </div>
              <Link href="/schedule" className="font-montserrat text-white/60 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
                All Events <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Timeline style */}
            <div className="relative sr-stagger">
              {/* Vertical gold connector line */}
              <div className="absolute left-5 top-6 bottom-6 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,194,0,0.4) 15%, rgba(255,194,0,0.4) 85%, transparent)" }} />
              <div className="space-y-4">
              {specialEvents.map((ev, i) => (
                <div key={ev.name} className="group relative overflow-hidden flex items-start gap-5 pl-12">
                  {/* Timeline node */}
                  <div className={`absolute left-[14px] top-5 w-3 h-3 rounded-full border-2 z-10 transition-all duration-300 group-hover:scale-125 ${ev.status === "completed" ? "bg-green-400 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]" : "bg-[#FFC200] border-[#FFC200] shadow-[0_0_10px_rgba(255,194,0,0.6)]"}`} />

                  <div className="flex-1 border border-[rgba(255,194,0,0.10)] hover:border-[rgba(255,194,0,0.30)] bg-[#0B1120] hover:bg-[#030712] transition-all duration-400 relative overflow-hidden">
                    {/* Top line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, rgba(255,194,0,0.8), transparent)" }} />
                    {/* Ghost number */}
                    <div className="absolute bottom-0 right-3 font-cinzel text-[52px] font-black text-white/[0.03] select-none leading-none pointer-events-none">{String(i+1).padStart(2,"0")}</div>

                    <div className="flex items-start gap-4 p-5 relative z-10">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <h3 className="font-cinzel text-white text-sm tracking-wider group-hover:text-[#FFC200] transition-colors">{ev.name}</h3>
                          <span className={`flex-shrink-0 font-montserrat text-[7px] uppercase tracking-[0.25em] px-2 py-0.5 border ${ev.status === "completed" ? "text-green-400 border-green-500/30 bg-green-500/8" : "text-[#FFC200] border-[#FFC200]/25 bg-[#FFC200]/5"}`}>
                            {ev.status === "completed" ? "Completed" : "Upcoming"}
                          </span>
                        </div>
                        <p className="font-montserrat text-white/60 text-[9px] tracking-wide leading-relaxed mb-2">{ev.desc}</p>
                        <div className="flex items-center gap-3">
                          <span className="font-montserrat text-[#FFC200] text-[8px] uppercase tracking-[0.18em] font-bold">{ev.date}</span>
                          <span className="text-white/20">·</span>
                          <span className="font-montserrat text-white/60 text-[8px] uppercase tracking-[0.18em]">{ev.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Partners */}
          <div>
            <div className="sr flex items-center justify-between mb-8">
              <div>
                <div className="section-label mb-2">Partners</div>
                <h2 className="font-cinzel text-white text-xl tracking-widest">Allies & Sponsors</h2>
              </div>
              <Link href="/partners" className="font-montserrat text-white/60 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sr-stagger">
              {partners.slice(0,6).map((p) => (
                <div key={p.name} className="group relative overflow-hidden border border-white/5 hover:border-[rgba(212,175,55,0.2)] bg-[#0B1120] hover:bg-[#030712] transition-all duration-400 aspect-square flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 100%, rgba(255,194,0,0.08) 0%, transparent 70%)" }} />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-white/[0.03] border border-white/8 group-hover:border-[#D4AF37]/20 transition-colors">
                    <Building2 className="w-4 h-4 text-white/20 group-hover:text-[#D4AF37]/50 transition-colors" />
                  </div>
                  <div className="font-cinzel text-white/75 text-xs tracking-wide group-hover:text-white transition-colors mb-1">{p.name}</div>
                  <div className="font-montserrat text-[#D4AF37]/45 text-[7px] uppercase tracking-widest">{p.tier.replace(" Partner","")}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 sr">
              <Link href="/partners" className="w-full flex items-center justify-center gap-2 font-montserrat text-[9px] uppercase tracking-[0.25em] text-white/55 hover:text-[#D4AF37] border border-white/6 hover:border-[#D4AF37]/25 py-4 transition-all duration-300">
                View All Partners <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE PREVIEW
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#030712] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-grid opacity-50" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,194,0,0.08) 0%, transparent 70%)" }} />
        <div className="gold-divider opacity-60" />

        <div className="max-w-7xl mx-auto relative">
          <div className="sr flex items-center justify-between mb-12">
            <div>
              <div className="section-label mb-2">Schedule</div>
              <h2 className="font-cinzel text-white text-xl sm:text-2xl tracking-widest">This Week</h2>
            </div>
            <Link href="/schedule" className="font-montserrat text-white/60 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
              Full Schedule <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sr-stagger">
            {scheduleEvents.map((ev) => {
              const statusIcon = ev.status === "completed"
                ? <CheckCircle2 className="w-4 h-4 text-green-400/70" />
                : ev.status === "in-progress"
                ? <CircleDot className="w-4 h-4 text-[#D4AF37]" />
                : <Circle className="w-4 h-4 text-white/20" />;
              const statusClass = ev.status === "completed"
                ? "text-green-400/70 border-green-500/20 bg-green-500/5"
                : ev.status === "in-progress"
                ? "text-[#D4AF37] border-[#D4AF37]/20 bg-[#D4AF37]/5"
                : "text-white/55 border-white/10 bg-white/[0.05]";
              return (
                <div key={ev.name} className="group glass-card p-6 hover:border-[rgba(212,175,55,0.25)] transition-all duration-400 relative overflow-hidden">
                  {ev.status === "in-progress" && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
                  )}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    {statusIcon}
                    <span className={`font-montserrat text-[7px] uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border ${statusClass}`}>
                      {ev.status === "completed" ? "Done" : ev.status === "in-progress" ? "Live" : "Soon"}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-white text-sm tracking-wider mb-1 group-hover:text-[#F0D060] transition-colors">{ev.name}</h3>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                    <span className="font-montserrat text-white/70 text-[8px] uppercase tracking-[0.18em]">{ev.category}</span>
                    <span className="font-cinzel text-[#D4AF37] text-sm">+{ev.points} pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUICK ACCESS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000] border-t border-white/5">
        <div className="max-w-7xl mx-auto">

          <div className="sr mb-12 text-center">
            <div className="section-label mx-auto mb-3">Explore</div>
            <h2 className="font-cinzel text-white text-xl sm:text-2xl tracking-widest">Quick Access</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sr-stagger mb-6">
            {[
              { href: "/gallery",  icon: <ImageIcon className="w-5 h-5" />, title: "Gallery",  desc: "Event photos & media" },
              { href: "/rules",    icon: <BookOpen  className="w-5 h-5" />, title: "Rules",    desc: "Tournament guidelines" },
                  { href: "/schedule", icon: <Calendar  className="w-5 h-5" />, title: "Schedule", desc: "Upcoming dates" },
                  { href: "/contact",  icon: <Phone     className="w-5 h-5" />, title: "Contact",  desc: "Get in touch" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="group block">
                    <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[rgba(212,175,55,0.28)] transition-all duration-400 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,194,0,0.06) 0%, transparent 60%)" }} />
                      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, rgba(255,194,0,0.8), transparent)" }} />
                      <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors rounded-sm bg-[#D4AF37]/14 border border-[#D4AF37]/15 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/30">
                        {link.icon}
                      </div>
                      <div className="relative z-10">
                        <div className="font-cinzel text-white text-sm tracking-wider group-hover:text-[#D4AF37] transition-colors">{link.title}</div>
                        <div className="font-montserrat text-white/70 text-[8px] uppercase tracking-widest mt-0.5">{link.desc}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#D4AF37]/50 ml-auto flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5 hidden sm:block" />
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </section>



    </div>
  );
}
