"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Users, Trophy, Calendar, TrendingUp, Shield } from "lucide-react";
import { teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const TEAM_IMAGES: Record<string, string> = {
  modi: "/images/team_modi.png",
  doval: "/images/team_doval.png",
  "amit-shah": "/images/team_shah.png",
  jaishankar: "/images/team_jaishankar.png",
};

const MASCOT_IMAGES: Record<string, string> = {
  lion: "/images/mascot_lion.png",
  eagle: "/images/mascot_eagle.png",
  tiger: "/images/mascot_tiger.png",
  lotus: "/images/mascot_lotus.png",
};

const RANK_LABELS: Record<number, string> = {
  1: "CHAMPIONS",
  2: "CONTENDERS",
  3: "CHALLENGERS",
  4: "RISING",
};

export default function TeamsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sorted = [...teams].sort((a, b) => a.rank - b.rank);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-btns", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-card", { opacity: 0, y: 30, duration: 0.8, stagger: 0.1 }, "-=0.8");

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
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <PageHero backgroundImage="/images/hero_arena.png" layout="left" className="min-h-[60vh] py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 font-montserrat text-xs text-white/30 mb-10 h-badge">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#D4AF37]">Teams</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6 h-badge">
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                  4 Teams. 4 Leaders. 1 Mission.
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>

              <h1 className="h-title font-cinzel font-light text-white leading-[1.1] mb-6" style={{ fontSize: "clamp(36px,7vw,84px)" }}>
                THE <span className="text-gold-gradient tracking-widest block">4 TEAMS</span>
              </h1>

              <p className="h-sub font-montserrat text-white/50 text-base leading-relaxed mb-10 max-w-lg tracking-wide">
                Four iconic team owners. Thirty elite business builders. One legendary tournament to define who leads the nation and builds its future.
              </p>

              <div className="h-btns flex flex-wrap gap-4">
                <Link href="/leaderboard" className="btn-primary">View Leaderboard <ArrowRight className="w-4 h-4 ml-2" /></Link>
                <Link href="/schedule" className="btn-secondary">View Schedule</Link>
              </div>
            </div>

            {/* Team mini-badges grid */}
            <div className="hidden lg:grid grid-cols-2 gap-6">
              {sorted.map((team) => (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}`}
                  className="h-card glass-card relative group hover:-translate-y-1 border-white/5 hover:bg-white/[0.03]"
                >
                  {/* Rank badge */}
                  <div
                    className="absolute top-4 right-4 font-cinzel text-[10px] px-3 py-1 rounded-full z-10 font-bold border"
                    style={{ background: team.color + "15", color: team.color, borderColor: team.color + "30" }}
                  >
                    #{team.rank}
                  </div>

                  <div className="p-6 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-white/10 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        {TEAM_IMAGES[team.id] ? (
                          <Image
                            src={TEAM_IMAGES[team.id]}
                            alt={team.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-cinzel font-light text-xl" style={{ background: team.color + "20", color: team.color }}>
                            {team.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-cinzel tracking-widest text-sm leading-tight mb-1" style={{ color: team.color }}>
                        {team.name.toUpperCase()}
                      </div>
                      <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest mb-1.5">{team.tagline}</div>
                      <div className="font-montserrat text-white/30 text-[9px] uppercase tracking-wider">
                        {team.points.toLocaleString()} pts · {team.winRate} WR
                      </div>
                    </div>
                  </div>

                  {/* Bottom color bar */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: team.color }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageHero>

      {/* ── QUICK STATS ── */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
          {[
            { icon: <Users className="w-5 h-5 text-[#D4AF37]" />, value: "30", label: "Business Owners" },
            { icon: <Trophy className="w-5 h-5 text-[#D4AF37]" />, value: "4", label: "Iconic Teams" },
            { icon: <Calendar className="w-5 h-5 text-[#D4AF37]" />, value: "4", label: "Tournament Weeks" },
            { icon: <TrendingUp className="w-5 h-5 text-[#D4AF37]" />, value: "1.5x", label: "Prize Multiplier" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 p-6 glass-card bg-white/[0.01] border-white/5">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="font-cinzel font-light text-2xl text-white mb-1 leading-none">{s.value}</div>
                <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CINEMATIC TEAM CARDS ── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-cinzel font-light text-white text-3xl tracking-widest uppercase">
              Meet the <span className="text-[#D4AF37]">Teams</span>
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="space-y-16 sr-stagger">
            {sorted.map((team) => (
              <div
                key={team.id}
                className="glass-card group relative overflow-hidden border-white/10 hover:border-white/20 transition-all duration-700 hover:-translate-y-1"
              >
                {/* Full-bleed background image with overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  {TEAM_IMAGES[team.id] && (
                    <Image
                      src={TEAM_IMAGES[team.id]}
                      alt={team.name}
                      fill
                      sizes="100vw"
                      className="object-cover object-center opacity-20 group-hover:opacity-30 transition-opacity duration-700 scale-105 group-hover:scale-100 transition-transform"
                    />
                  )}
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(105deg, ${team.color}15 0%, #000000 50%, #000000 100%)` }}
                  />
                </div>

                <div className="relative p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* ── Left: Identity ── */}
                    <div className="lg:col-span-4">
                      {/* Rank label */}
                      <div className="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                        <span style={{ color: team.color }}>RANK #{team.rank}</span>
                        <span className="w-4 h-px bg-white/20" />
                        <span className="text-white/60">{RANK_LABELS[team.rank]}</span>
                      </div>

                      {/* Team name */}
                      <h2 className="font-cinzel font-light text-3xl lg:text-4xl leading-tight mb-2 uppercase" style={{ color: team.color }}>
                        {team.name}
                      </h2>
                      <div className="font-montserrat text-white/50 text-[11px] uppercase tracking-widest mb-2">{team.tagline}</div>
                      <div className="font-montserrat text-white/30 text-[10px] uppercase tracking-widest italic mb-6">"{team.motto}"</div>

                      <p className="font-montserrat text-white/50 text-sm leading-relaxed mb-8">
                        {team.description}
                      </p>

                      {/* Mascot badge */}
                      {MASCOT_IMAGES[team.icon.toLowerCase()] && (
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 p-1">
                            <div className="w-full h-full rounded-full overflow-hidden">
                               <Image
                                 src={MASCOT_IMAGES[team.icon.toLowerCase()]}
                                 alt={team.mascot}
                                 width={48}
                                 height={48}
                                 className="w-full h-full object-cover"
                               />
                            </div>
                          </div>
                          <div>
                            <div className="font-montserrat text-[8px] text-white/40 uppercase tracking-widest mb-1">Mascot</div>
                            <div className="font-cinzel tracking-wider text-sm text-white">{team.mascot}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Middle: Stats ── */}
                    <div className="lg:col-span-4">
                      <div className="font-montserrat text-[9px] text-white/40 uppercase tracking-widest mb-4">Performance</div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                        {[
                          { l: "Total Pts", v: team.points.toLocaleString() },
                          { l: "Members", v: String(team.members) },
                          { l: "Business", v: team.business },
                          { l: "Referrals", v: String(team.referrals) },
                          { l: "Meetings", v: String(team.meetings) },
                          { l: "Win Rate", v: team.winRate },
                        ].map((s) => (
                          <div
                            key={s.l}
                            className="text-center p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors"
                          >
                            <div className="font-cinzel font-light text-xl mb-1 text-white">{s.v}</div>
                            <div className="font-montserrat text-white/40 text-[8px] uppercase tracking-widest">{s.l}</div>
                          </div>
                        ))}
                      </div>

                      {/* Progress bar — win rate visual */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-montserrat text-[9px] text-white/40 uppercase tracking-widest">League Standing</span>
                          <span className="font-montserrat text-[10px] font-bold" style={{ color: team.color }}>
                            #{team.rank} of 4
                          </span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${((5 - team.rank) / 4) * 100}%`, background: team.color }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Right: Owner + CTA ── */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                      {/* Owner card */}
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-colors mb-6">
                        <div className="font-montserrat text-[8px] text-white/40 uppercase tracking-widest mb-3">Team Owner</div>
                        <div className="font-cinzel font-light text-white text-xl mb-1">
                          {team.owner.name}
                        </div>
                        <div className="font-montserrat text-[10px] uppercase tracking-widest mb-4" style={{ color: team.color }}>
                          {team.owner.title}
                        </div>
                        <div className="font-montserrat text-white/40 text-xs italic leading-relaxed">
                          "{team.owner.quote}"
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <Link
                          href={`/teams/${team.id}`}
                          className="btn-primary flex-1 justify-center text-[10px] py-4"
                        >
                          View Team <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Link>
                        <Link
                          href={`/owners/${team.owner.id}`}
                          className="btn-secondary flex-1 justify-center text-[10px] py-4"
                        >
                          Owner Profile
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 text-center bg-[#0D1424] border-t border-white/5">
        <div className="max-w-2xl mx-auto sr">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-white/10" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
              One League. One Vision.
            </span>
            <div className="w-8 h-px bg-white/10" />
          </div>
          <h2 className="font-cinzel font-light text-white text-4xl sm:text-5xl mb-6">
            ONE LEGACY TO <span className="text-[#D4AF37] italic">BUILD.</span>
          </h2>
          <p className="font-montserrat text-white/50 text-sm tracking-wide mb-10 max-w-md mx-auto">
            Compete. Collaborate. Create Impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/leaderboard" className="btn-primary">
              View Leaderboard <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/schedule" className="btn-secondary">View Schedule</Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
