"use client";
import { useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Users, Trophy, Star, TrendingUp } from "lucide-react";
import { teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

const TEAM_IMAGES: Record<string, string> = {
  modi: "/images/mascot_lion.png",
  doval: "/images/mascot_eagle.png",
  "amit-shah": "/images/mascot_tiger.png",
  jaishankar: "/images/mascot_lotus.png",
};

// Next.js uses async component for params when using app router but since this is client component, we use React.use()
// However, to keep it simple and match the provided structure, we will use normal props and wrap page with a server component in a real app.
// Since we are replacing the existing file, we'll keep the params prop but resolve it synchronously as an approximation for the client.
// Wait, in Next 13+ app dir, a client component can receive params as a promise.
import { use } from "react";

export default function TeamPage({ params }: { params: Promise<{ team: string }> }) {
  const resolvedParams = use(params);
  const { team: id } = resolvedParams;
  const team = teams.find((t) => t.id === id);
  if (!team) notFound();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll reveals
      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: parent, start: "top 90%", once: true },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 70% at 70% 50%, ${team.color}10 0%, transparent 70%)` }} />

        <div className="max-w-7xl mx-auto relative w-full z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-montserrat text-[10px] uppercase tracking-widest text-white/40 mb-10 sr">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/teams" className="hover:text-white transition-colors">Teams</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: team.color }}>{team.fullName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center sr">
            <div>
              <h1 className="font-cinzel font-light leading-[1.1] mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-montserrat text-white/50 text-[10px] font-bold tracking-[0.4em] uppercase">{team.name.toUpperCase()}</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <span className="block text-white" style={{ fontSize: "clamp(40px,7vw,84px)" }}>
                  {team.fullName.split(" ").at(-1)!.toUpperCase()}
                </span>
              </h1>
              <div className="font-montserrat text-white/40 text-[9px] tracking-[0.3em] uppercase mb-8 flex items-center gap-4">
                <span className="w-6 h-px" style={{ background: team.color }} />
                {team.motto}
                <span className="w-6 h-px" style={{ background: team.color }} />
              </div>
              <p className="font-montserrat text-white/60 text-sm leading-relaxed mb-10 max-w-md tracking-wide">{team.description}</p>

              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { icon: <Users className="w-4 h-4" />, n: String(team.members), l: "Members" },
                  { icon: <Trophy className="w-4 h-4" />, n: "1", l: "Championship" },
                  { icon: <Star className="w-4 h-4" />, n: team.points.toLocaleString(), l: "Points" },
                  { icon: <TrendingUp className="w-4 h-4" />, n: `Rank #${team.rank}`, l: "" },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 glass-card bg-white/[0.02] border-white/5">
                    <span style={{ color: team.color }}>{s.icon}</span>
                    <span className="font-cinzel text-sm text-white">{s.n}</span>
                    {s.l && <span className="font-montserrat text-[9px] uppercase tracking-widest text-white/40">{s.l}</span>}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#members" className="btn-primary">View Members <ArrowRight className="w-4 h-4 ml-2" /></a>
                <a href="#performance" className="btn-secondary">View Stats</a>
              </div>
            </div>

            {/* Right Hero Mascot image */}
            <div className="hidden lg:flex justify-end">
               {TEAM_IMAGES[team.id] ? (
                 <div className="relative w-[400px] h-[400px]">
                    <Image
                       src={TEAM_IMAGES[team.id]}
                       alt={team.name}
                       fill
                       className="object-contain opacity-70"
                    />
                 </div>
               ) : (
                 <div className="w-[300px] h-[300px] rounded-full flex items-center justify-center border border-white/5 bg-white/[0.02]">
                    <span className="font-cinzel text-9xl text-white/10">{team.name.charAt(0)}</span>
                 </div>
               )}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM INFO BAR */}
      <section className="py-8 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5 sr">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
          {[
            { l: "Team Color", v: team.colorName, dot: true },
            { l: "Team Icon", v: team.mascot },
            { l: "Team Motto", v: `"${team.motto}"` },
            { l: "Leadership Style", v: team.owner.leadershipStyle ?? team.tagline },
          ].map((item) => (
            <div key={item.l} className="flex items-start gap-4 p-4 glass-card bg-white/[0.01] border-white/5">
              {item.dot && (
                <span className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: team.color }} />
              )}
              <div>
                <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-1.5">{item.l}</div>
                <div className="font-cinzel text-white text-sm tracking-wider">{item.v}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAPTAIN + OVERVIEW */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sr">
          
          {/* Captain card */}
          <div className="glass-card p-10 border-white/10 text-center relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="font-montserrat text-[9px] font-bold tracking-[0.3em] text-white/40 mb-8 uppercase">Team Captain</div>
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border border-white/20 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                 <img src={team.id === 'modi' ? '/images/owner_modi.png' : team.id === 'doval' ? '/images/owner_doval.png' : team.id === 'amit-shah' ? '/images/owner_shah.png' : '/images/owner-portrait-4.jpg'} alt={team.owner.name} className="w-full h-full object-cover transition-all duration-700" />
              </div>
            </div>
            <div className="font-cinzel font-light text-white text-3xl mb-2">{team.owner.name}</div>
            <div className="font-montserrat text-[10px] uppercase tracking-widest mb-6" style={{ color: team.color }}>{team.tagline}</div>
            <blockquote className="font-montserrat text-white/50 text-xs italic leading-relaxed mb-8 px-4">
              "{team.owner.quote}"
            </blockquote>
            <Link href={`/owners/${team.owner.id}`} className="btn-secondary w-full justify-center">
              Owner Profile
            </Link>
          </div>

          {/* Overview stats */}
          <div className="lg:col-span-2 glass-card p-10 border-white/10 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-cinzel text-white text-xl tracking-widest uppercase">Team Overview</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              {[
                { l: "Rank", v: `${team.rank}` },
                { l: "Total Points", v: team.points.toLocaleString() },
                { l: "Win Rate", v: team.winRate },
                { l: "Trend", v: "Steady" },
              ].map((s) => (
                <div key={s.l} className="p-6 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                  <div className="font-cinzel font-light text-3xl text-white mb-2">{s.v}</div>
                  <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>

            <p className="font-montserrat text-white/60 text-sm leading-relaxed mb-10 max-w-2xl">{team.description}</p>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { l: "Business", v: team.business },
                { l: "Referrals", v: String(team.referrals) },
                { l: "Meetings", v: String(team.meetings) }
              ].map(s => (
                <div key={s.l} className="border-l-2 pl-4" style={{ borderColor: team.color }}>
                  <div className="font-cinzel text-2xl text-white mb-1">{s.v}</div>
                  <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section id="members" className="py-32 px-6 sm:px-10 lg:px-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="font-cinzel font-light text-white text-3xl tracking-widest uppercase">Roster <span className="text-white/40 text-sm tracking-widest">({team.members})</span></h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 sr-stagger">
            {team.weeklyMembers.map((m) => (
              <div key={m.name} className="glass-card p-6 border-white/5 hover:border-white/20 transition-all text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-cinzel font-light text-xl mx-auto mb-4 border border-white/10" style={{ color: team.color }}>
                  {m.name.charAt(0)}
                </div>
                <div className="font-cinzel tracking-wider text-white text-sm mb-1">{m.name}</div>
                <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-3">{m.industry}</div>
                <div className="font-cinzel text-xs text-white/70">{m.points} pts</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section id="performance" className="py-32 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="font-cinzel font-light text-white text-3xl tracking-widest uppercase">Performance</h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-10 border-white/10 flex flex-col justify-center sr">
              <h3 className="font-cinzel tracking-widest text-white/60 text-sm mb-8 uppercase">Key Metrics</h3>
              <div className="space-y-6">
                {[
                  { l: "Visitors", v: team.performance.visitors },
                  { l: "Referrals", v: team.performance.referrals },
                  { l: "TYFCB", v: team.performance.tyfcb },
                  { l: "One-to-Ones", v: team.performance.oneToOnes },
                  { l: "Attendance", v: team.performance.attendance },
                ].map((p) => (
                  <div key={p.l}>
                    <div className="flex justify-between mb-2">
                      <span className="font-montserrat text-white/60 text-[10px] uppercase tracking-widest">{p.l}</span>
                      <span className="font-cinzel text-sm" style={{ color: team.color }}>{p.v}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${p.v}%`, background: team.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-10 border-white/10 sr">
              <h3 className="font-cinzel tracking-widest text-white/60 text-sm mb-8 uppercase">Recent Achievements</h3>
              <div className="space-y-4">
                {team.achievements.map((a) => (
                  <div key={a.title} className="flex gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <div className="font-cinzel text-white text-base mb-1">{a.title}</div>
                      <div className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest leading-relaxed">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM MOTTO CTA */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 text-center bg-[#050505] border-t border-white/5">
        <div className="max-w-2xl mx-auto sr">
          <div className="w-12 h-px mx-auto mb-8 bg-white/20" />
          <h2 className="font-cinzel font-light text-white text-4xl sm:text-5xl mb-6 uppercase leading-tight">
            One Team. <span style={{ color: team.color }}>One Legacy.</span>
          </h2>
          <p className="font-montserrat text-white/50 text-sm tracking-wide mb-10 max-w-md mx-auto">
            {team.motto}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/leaderboard" className="btn-primary">View Leaderboard</Link>
            <Link href="/schedule" className="btn-secondary">View Schedule</Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
