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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-ares", { types: "chars" });
      const bl = new SplitType(".h-title-bl", { types: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 60, rotateX: -90, stagger: 0.05, duration: 1, ease: "back.out(1.7)" }, "-=0.4")
        .from(bl.chars, { opacity: 0, x: -20, stagger: 0.02, duration: 0.8 }, "-=0.5")
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
    gsap.to(".parallax-fg", { x: -xPos * 3, y: -yPos * 3, duration: 1, ease: "power2.out" });
  };

  const mascots: Record<string, string> = {
    modi:        "/images/mascot_lion.png",
    doval:       "/images/mascot_eagle.png",
    "amit-shah": "/images/mascot_tiger.png",
    jaishankar:  "/images/mascot_lotus.png",
  };
  const ownerImgs: Record<string, string> = {
    modi:        "/images/owner_modi.png",
    doval:       "/images/owner_doval.png",
    "amit-shah": "/images/owner_shah.png",
    jaishankar:  "/images/owner_jaishankar.png",
  };

  return (
    <div ref={heroRef} className="overflow-x-hidden bg-[#0B132B]">

      {/* ═══════════════════════════════════════════
          HERO — CINEMATIC
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20" onMouseMove={handleMouseMove}>

        {/* Background */}
        <div className="absolute inset-[-5%] z-0 parallax-bg" style={{ width: "110%", height: "110%" }}>
          <Image
            src="/images/hero_arena.png"
            alt="Hero Arena"
            fill
            sizes="100vw"
            className="object-cover object-center scale-110"
            priority
            style={{ filter: "blur(2px) brightness(0.45) saturate(1.15)" }}
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,194,0,0.10) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B132B_85%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/30 via-transparent to-[#0B132B]" />
        </div>

        {/* ── DRAMATIC LIGHT RAYS — symmetrical stadium spotlights for centered hero */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">

          {/* Primary fan from upper-right */}
          <div
            className="absolute inset-[-8%] rays-breathe"
            style={{
              background: `conic-gradient(
                from 0deg at 78% 0%,
                transparent   0deg,
                transparent 178deg,
                rgba(255,194,0,0.24) 192deg,
                rgba(255,210,0,0.16) 202deg,
                transparent         212deg,
                rgba(255,194,0,0.20) 222deg,
                rgba(255,210,0,0.12) 230deg,
                transparent         240deg,
                rgba(255,194,0,0.14) 250deg,
                transparent         264deg,
                rgba(255,194,0,0.10) 274deg,
                transparent         290deg,
                transparent         360deg
              )`,
              filter: "blur(4px)",
            }}
          />
          {/* Mirror fan from upper-left (softer) */}
          <div
            className="absolute inset-[-8%]"
            style={{
              background: `conic-gradient(
                from 0deg at 22% 0%,
                transparent 0deg,
                rgba(255,194,0,0.08) 72deg,
                transparent         88deg,
                rgba(255,194,0,0.12) 104deg,
                transparent         118deg,
                rgba(255,194,0,0.08) 132deg,
                transparent         150deg,
                transparent         360deg
              )`,
              filter: "blur(10px)",
            }}
          />
          {/* Bloom — upper-right floodlight */}
          <div
            className="absolute top-[-8%] right-[-5%]"
            style={{
              width: "45%", height: "55%",
              background: "radial-gradient(ellipse 78% 72% at 85% 8%, rgba(212,175,55,0.24) 0%, rgba(255,194,0,0.14) 40%, transparent 68%)",
              filter: "blur(28px)",
            }}
          />
          {/* Bloom — upper-left (weaker) */}
          <div
            className="absolute top-[-5%] left-[-5%]"
            style={{
              width: "36%", height: "42%",
              background: "radial-gradient(ellipse 70% 60% at 14% 6%, rgba(255,194,0,0.20) 0%, transparent 70%)",
              filter: "blur(36px)",
            }}
          />
          {/* Central trophy glow */}
          <div
            className="absolute top-[15%] left-1/2 -translate-x-1/2 blur-[120px]"
            style={{
              width: "680px", height: "680px",
              background: "radial-gradient(circle, rgba(212,175,55,0.40) 0%, transparent 65%)",
              opacity: 0.22,
            }}
          />
        </div>

        {/* ── FLOATING GOLD PARTICLES */}
        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          {[
            { x: 38, delay: 0,   dur: 6,   size: 1.5, op: 0.35 },
            { x: 44, delay: 1.5, dur: 5.5, size: 1.0, op: 0.28 },
            { x: 50, delay: 0.8, dur: 7.0, size: 2.0, op: 0.32 },
            { x: 55, delay: 2.2, dur: 5.0, size: 1.5, op: 0.40 },
            { x: 60, delay: 0.3, dur: 6.5, size: 1.2, op: 0.30 },
            { x: 65, delay: 1.8, dur: 8.0, size: 2.0, op: 0.22 },
            { x: 70, delay: 3.0, dur: 5.8, size: 1.0, op: 0.35 },
            { x: 42, delay: 4.0, dur: 7.5, size: 2.5, op: 0.25 },
            { x: 58, delay: 0.5, dur: 6.2, size: 1.8, op: 0.28 },
            { x: 73, delay: 1.2, dur: 5.2, size: 1.5, op: 0.30 },
            { x: 47, delay: 2.8, dur: 6.8, size: 1.0, op: 0.38 },
            { x: 62, delay: 0.9, dur: 7.2, size: 2.0, op: 0.24 },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full particle-float"
              style={{
                left: `${p.x}%`, bottom: "5%",
                width: `${p.size}px`, height: `${p.size}px`,
                background: `rgba(212,175,55,${p.op})`,
                boxShadow: `0 0 ${p.size * 3}px rgba(212,175,55,${p.op * 0.6})`,
                animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>

        {/* ── GRAIN OVERLAY */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "url(/images/noise.svg)", backgroundSize: "180px 180px" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 parallax-fg">

          {/* Live badge */}
          <div className="h-badge inline-flex items-center gap-3 mb-10 px-6 py-3 relative">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 backdrop-blur-xl" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-live block relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Nation Builders Edition · 2026</span>
          </div>

          {/* Typography + Trophy composition */}
          <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mb-8 sm:mb-12 h-[380px] sm:h-[520px]">

            {/* Trophy layer */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none translate-y-2 sm:translate-y-6">
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 55%, rgba(212,175,55,0.12) 0%, transparent 55%)" }} />
              <Image
                src="/images/hero-trophy.jpg"
                alt="ARES Championship Trophy"
                width={580}
                height={680}
                priority
                className="relative object-contain mix-blend-screen"
                style={{
                  opacity: 0.95,
                  maskImage: "radial-gradient(ellipse 55% 55% at 50% 48%, black 10%, rgba(0,0,0,0.8) 35%, transparent 65%)",
                  WebkitMaskImage: "radial-gradient(ellipse 55% 55% at 50% 48%, black 10%, rgba(0,0,0,0.8) 35%, transparent 65%)",
                  filter: "brightness(1.15) contrast(1.15) saturate(1.1)",
                }}
              />
            </div>

            {/* Title layer */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full pointer-events-none mt-10 sm:mt-24">
              <h1 className="font-cinzel font-black leading-none text-center">
                <span
                  className="h-title-ares block text-white tracking-[0.12em] sm:tracking-[0.18em]"
                  style={{
                    fontSize: "clamp(64px, 16vw, 190px)",
                    textShadow: "0 20px 60px rgba(0,0,0,1), 0 0 120px rgba(0,0,0,0.8)",
                  }}
                >
                  ARES
                </span>
                <span
                  className="h-title-bl block tracking-[0.5em] sm:tracking-[0.7em] mt-1 sm:mt-4 font-semibold"
                  style={{
                    fontSize: "clamp(10px, 2.2vw, 20px)",
                    background: "linear-gradient(90deg, #C9921A, #F0D060, #D4AF37, #F0D060, #C9921A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                  }}
                >
                  BUSINESS LEAGUE
                </span>
              </h1>
            </div>
          </div>

          {/* Subtext + CTA */}
          <div className="h-sub text-center flex flex-col items-center max-w-xl mx-auto mb-14 relative z-30">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-[#D4AF37]/40" />
              <p className="font-montserrat text-white/55 text-[10px] sm:text-xs tracking-[0.3em] uppercase">4 Teams · 4 Leaders · 1 Mission</p>
              <div className="h-px w-8 bg-[#D4AF37]/40" />
            </div>
            <p className="font-montserrat text-white/45 text-xs sm:text-sm leading-loose tracking-wider mb-10 px-4">
              The ultimate high-stakes corporate tournament.<br className="hidden sm:block" />
              June 24 – July 22, 2026.
            </p>
            <div className="h-btns flex flex-wrap justify-center gap-5">
              <Link href="/teams" className="btn-primary px-9 py-4 text-[11px] tracking-[0.22em]">
                Explore Teams <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/leaderboard" className="btn-secondary px-9 py-4 text-[11px] tracking-[0.22em]">
                Leaderboard
              </Link>
            </div>
          </div>
        </div>

        {/* Stats dock */}
        <div className="relative z-30 w-full max-w-3xl mx-auto px-6 pb-14 h-dock">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-full border border-white/8 bg-black/50 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/4 to-transparent" />
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <div className="flex justify-around items-center sm:divide-x divide-white/8 p-6 sm:py-7 relative z-10">
              {[
                { n: "30", l: "Owners" },
                { n: "4",  l: "Teams" },
                { n: "1",  l: "Month" },
                { n: "1",  l: "Winner" },
              ].map((s) => (
                <div key={s.l} className="h-stat-item flex flex-col items-center text-center px-4 sm:px-8">
                  <div className="font-cinzel font-light text-[28px] sm:text-[38px] text-white mb-1.5 number-glow" style={{ lineHeight: 1 }}>{s.n}</div>
                  <div className="font-montserrat text-[#D4AF37] text-[8px] sm:text-[9px] uppercase tracking-[0.35em] font-semibold">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOURNAMENT METRICS STRIP
      ═══════════════════════════════════════════ */}
      <section className="relative z-20 bg-[#0D1424] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-grid-fine opacity-60" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,194,0,0.08) 0%, transparent 70%)" }} />
        <div className="gold-divider opacity-60" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 relative">
          <div className="text-center mb-14 sr">
            <div className="section-label mx-auto mb-5">Tournament at a Glance</div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 sr overflow-hidden rounded-sm">
            {[
              { n: "30", label: "Elite Owners", sub: "Competing across 4 factions" },
              { n: "4",  label: "Iconic Teams",  sub: "Led by national leaders" },
              { n: "1",  label: "Month",         sub: "June 24 – July 22, 2026" },
              { n: "1",  label: "Grand Winner",  sub: "One champion, one legacy" },
            ].map((s, i) => (
              <div key={s.label} className="relative bg-[#0D1424] flex flex-col items-center justify-center text-center px-8 py-12 group hover:bg-[#0e1830] transition-colors overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 100%, rgba(255,194,0,0.08) 0%, transparent 70%)" }} />
                {i === 0 && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />}
                <div
                  className="font-cinzel font-light text-[#D4AF37] mb-4 number-glow"
                  style={{ fontSize: "clamp(52px, 7vw, 80px)", lineHeight: 1 }}
                >
                  {s.n}
                </div>
                <div className="font-cinzel text-white text-xs sm:text-sm tracking-[0.2em] uppercase mb-2">{s.label}</div>
                <div className="font-montserrat text-white/30 text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="gold-divider opacity-30" />
      </section>

      {/* ═══════════════════════════════════════════
          LIVE LEADERBOARD
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0B132B] relative z-20">
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
                  <p className="font-montserrat text-white/30 text-[9px] uppercase tracking-[0.25em]">Updated in real-time</p>
                </div>
                <Link href="/leaderboard" className="font-montserrat text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.25em] inline-flex items-center gap-2">
                  Full Standings <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-hidden border border-[rgba(212,175,55,0.15)] rounded-sm backdrop-blur-sm">
                {/* Header */}
                <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="col-span-1 font-montserrat text-white/30 text-[8px] uppercase tracking-[0.25em]">#</div>
                  <div className="col-span-6 font-montserrat text-white/30 text-[8px] uppercase tracking-[0.25em]">Team</div>
                  <div className="col-span-2 font-montserrat text-white/30 text-[8px] uppercase tracking-[0.25em] text-right">Pts</div>
                  <div className="col-span-2 font-montserrat text-white/30 text-[8px] uppercase tracking-[0.25em] text-right">Week</div>
                  <div className="col-span-1 font-montserrat text-white/30 text-[8px] uppercase tracking-[0.25em] text-center">Trend</div>
                </div>

                {/* Rows */}
                {sorted.map((team, i) => (
                  <Link key={team.id} href={`/teams/${team.id}`} className="grid grid-cols-12 px-6 py-5 items-center border-b border-white/5 hover:bg-white/[0.025] transition-colors group relative overflow-hidden">
                    {/* Team color left accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: team.color }} />
                    {/* Gold shimmer for #1 */}
                    {i === 0 && <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${team.color}40, transparent)` }} />}

                    <div className="col-span-1">
                      <div
                        className="font-cinzel text-xl font-light"
                        style={{
                          color: i===0?"#D4AF37":i===1?"#b0bec5":i===2?"#CD7F32":"rgba(255,255,255,0.25)",
                          textShadow: i===0?"0 0 20px rgba(212,175,55,0.4)":i===1?"0 0 15px rgba(176,190,197,0.3)":i===2?"0 0 15px rgba(205,127,50,0.3)":"none",
                        }}
                      >
                        {String(i+1).padStart(2,"0")}
                      </div>
                    </div>

                    <div className="col-span-6 flex items-center gap-3 sm:gap-4">
                      <TeamCrest teamId={team.id} color={team.color} size="md" />
                      <div>
                        <div className="font-cinzel text-white text-xs sm:text-sm tracking-widest uppercase group-hover:text-[#F0D060] transition-colors">
                          {team.name}
                        </div>
                        <div className="font-montserrat text-[9px] mt-0.5 tracking-[0.18em] uppercase opacity-70" style={{ color: team.color }}>
                          {team.fullName.split(" ").at(-1)}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-right">
                      <span className="font-cinzel text-lg sm:text-xl" style={{ color: i===0?"#D4AF37":"rgba(240,234,214,0.85)" }}>
                        {team.points.toLocaleString()}
                      </span>
                    </div>

                    <div className="col-span-2 text-right">
                      <span className="font-montserrat text-xs text-white/35 tracking-wider">+{team.weekPoints}</span>
                    </div>

                    <div className="col-span-1 flex justify-center">
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
                    <div className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em]">{m.label}</div>
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
                    <div className="font-montserrat text-[9px] uppercase tracking-[0.2em] text-white/30 mb-1">Full Breakdown</div>
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
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none bg-grid opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35) 30%, rgba(212,175,55,0.35) 70%, transparent)" }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="mb-14 sr text-center">
            <div className="section-label mx-auto mb-4">The Factions</div>
            <h2 className="font-cinzel text-white text-2xl sm:text-3xl tracking-[0.2em] text-shadow-gold">Choose Your Side</h2>
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

                <div className="overflow-hidden border border-[rgba(212,175,55,0.12)] group-hover:border-[rgba(212,175,55,0.28)] transition-all duration-500 bg-[#111827] rounded-sm">
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

                      {/* Team color gradient overlay */}
                      <div
                        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                        style={{ background: `linear-gradient(180deg, ${team.color}00 0%, ${team.color}80 100%)` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Rank badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="font-cinzel text-xs px-2.5 py-1 border border-white/15 bg-black/50 backdrop-blur-sm tracking-widest"
                             style={{ color: team.rank===1?"#D4AF37":team.rank===2?"#b0bec5":team.rank===3?"#CD7F32":"rgba(255,255,255,0.4)" }}>
                          #{team.rank}
                        </div>
                      </div>

                      {/* Normal state overlay */}
                      <div className="absolute bottom-4 left-4 right-4 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
                        <div className="font-cinzel text-white text-xl tracking-widest mb-1">{team.name}</div>
                        <div className="font-montserrat text-[9px] uppercase tracking-[0.22em]" style={{ color: team.color }}>{team.fullName.split(" ").at(-1)}</div>
                      </div>

                      {/* Hover state overlay */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <div className="font-montserrat text-[8px] uppercase tracking-[0.3em] mb-1.5" style={{ color: team.color }}>Team Captain</div>
                        <div className="font-cinzel text-white text-base tracking-wider leading-tight">{team.owner.name}</div>
                        <div className="font-montserrat text-white/45 text-[9px] mt-1.5 tracking-wider leading-relaxed">{team.owner.leadershipStyle}</div>
                      </div>
                    </div>
                  </Link>

                  {/* Footer */}
                  <div className="p-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-montserrat text-white/25 text-[8px] uppercase tracking-widest">Points</div>
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
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0B132B] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Special Events */}
          <div>
            <div className="sr flex items-center justify-between mb-8">
              <div>
                <div className="section-label mb-2">Special Events</div>
                <h2 className="font-cinzel text-white text-xl tracking-widest">Key Milestones</h2>
              </div>
              <Link href="/schedule" className="font-montserrat text-white/35 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
                All Events <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3 sr-stagger">
              {specialEvents.map((ev, i) => (
                <div key={ev.name} className="group relative overflow-hidden border border-[rgba(212,175,55,0.10)] hover:border-[rgba(212,175,55,0.25)] bg-[#111827] hover:bg-[#0D1424] transition-all duration-400">
                  {/* Number */}
                  <div className="absolute top-0 right-0 bottom-0 flex items-center px-5 pointer-events-none">
                    <span className="font-cinzel text-[48px] font-black text-white/[0.025] select-none leading-none">{String(i+1).padStart(2,"0")}</span>
                  </div>

                  <div className="flex items-start gap-4 p-5 relative z-10">
                    <div className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center mt-0.5" style={{ background: "rgba(255,194,0,0.12)", border: "1px solid rgba(212,175,55,0.18)" }}>
                      <Star className="w-4 h-4 text-[#D4AF37]/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <h3 className="font-cinzel text-white text-sm tracking-wider group-hover:text-[#D4AF37] transition-colors">{ev.name}</h3>
                        <span className={`flex-shrink-0 font-montserrat text-[7px] uppercase tracking-[0.25em] px-2 py-0.5 rounded-full border ${ev.status === "completed" ? "text-green-400/80 border-green-500/20 bg-green-500/5" : "text-white/35 border-white/10 bg-white/[0.02]"}`}>
                          {ev.status === "completed" ? "Done" : "Upcoming"}
                        </span>
                      </div>
                      <p className="font-montserrat text-white/35 text-[9px] tracking-wide leading-relaxed mb-2">{ev.desc}</p>
                      <div className="flex items-center gap-3">
                        <span className="font-montserrat text-[#D4AF37]/55 text-[8px] uppercase tracking-[0.18em]">{ev.date}</span>
                        <span className="text-white/10 text-xs">·</span>
                        <span className="font-montserrat text-white/25 text-[8px] uppercase tracking-[0.18em]">{ev.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div>
            <div className="sr flex items-center justify-between mb-8">
              <div>
                <div className="section-label mb-2">Partners</div>
                <h2 className="font-cinzel text-white text-xl tracking-widest">Allies & Sponsors</h2>
              </div>
              <Link href="/partners" className="font-montserrat text-white/35 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sr-stagger">
              {partners.slice(0,6).map((p) => (
                <div key={p.name} className="group relative overflow-hidden border border-white/5 hover:border-[rgba(212,175,55,0.2)] bg-[#111827] hover:bg-[#0D1424] transition-all duration-400 aspect-square flex flex-col items-center justify-center p-6 text-center">
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
              <Link href="/partners" className="w-full flex items-center justify-center gap-2 font-montserrat text-[9px] uppercase tracking-[0.25em] text-white/30 hover:text-[#D4AF37] border border-white/6 hover:border-[#D4AF37]/25 py-4 transition-all duration-300">
                View All Partners <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE PREVIEW
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none bg-grid opacity-50" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(212,175,55,0.025) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="sr flex items-center justify-between mb-12">
            <div>
              <div className="section-label mb-2">Schedule</div>
              <h2 className="font-cinzel text-white text-xl sm:text-2xl tracking-widest">This Week</h2>
            </div>
            <Link href="/schedule" className="font-montserrat text-white/35 hover:text-[#D4AF37] transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
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
                : "text-white/30 border-white/10 bg-white/[0.02]";
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
                    <span className="font-montserrat text-white/25 text-[8px] uppercase tracking-[0.18em]">{ev.category}</span>
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
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0B132B] border-t border-white/5">
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
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 100% at 0% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors rounded-sm bg-[#D4AF37]/8 border border-[#D4AF37]/15 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/30">
                    {link.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="font-cinzel text-white text-sm tracking-wider group-hover:text-[#D4AF37] transition-colors">{link.title}</div>
                    <div className="font-montserrat text-white/25 text-[8px] uppercase tracking-widest mt-0.5">{link.desc}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/15 group-hover:text-[#D4AF37]/50 ml-auto flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5 hidden sm:block" />
                </div>
              </Link>
            ))}
          </div>

          {/* Website CTA */}
          <div className="sr">
            <Link href="/web-partner" className="group block">
              <div className="relative overflow-hidden border border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.35)] bg-[#111827] hover:bg-[#0D1424] p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-500">
                {/* Background image hint */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ background: "linear-gradient(135deg, #D4AF37 0%, transparent 60%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4) 40%, rgba(212,175,55,0.4) 60%, transparent)" }} />

                <div className="flex items-start gap-6 relative z-10">
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors rounded-sm bg-[#D4AF37]/8 border border-[#D4AF37]/20 group-hover:bg-[#D4AF37]/15 group-hover:border-[#D4AF37]/40">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-montserrat text-[#D4AF37]/60 text-[8px] uppercase tracking-[0.35em] mb-2">Exclusive Offer — ABL Members</div>
                    <h3 className="font-cinzel text-white text-xl sm:text-2xl tracking-wider mb-2 group-hover:text-[#D4AF37] transition-colors">Want to Build Your Website?</h3>
                    <p className="font-montserrat text-white/35 text-[10px] sm:text-xs tracking-wider leading-relaxed max-w-lg">
                      Get a professional, high-performance website crafted for your business — built by the same team behind this platform.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex-shrink-0">
                  <span className="btn-primary text-[10px] tracking-[0.25em] px-7 py-3.5">
                    Get Started <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
