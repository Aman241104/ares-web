"use client";
import { useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Users, Trophy, Star, TrendingUp, X, Building2, Package, Tag, Handshake } from "lucide-react";
import { teams } from "@/lib/data";
import type { WeeklyMember } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

const WEEK_POINTS: Record<string, number[]> = {
  modi:        [520, 765, 920, 1285],
  doval:       [480, 660, 820, 1160],
  "amit-shah": [430, 600, 760, 1085],
  jaishankar:  [380, 540, 700, 970],
};

function PointsTrendChart({ teamId, color }: { teamId: string; color: string }) {
  const values = WEEK_POINTS[teamId] ?? [0, 0, 0, 0];
  const w = 480, h = 80, pad = 12;
  const min = 0;
  const max = Math.max(...values) * 1.1;
  const xs = values.map((_, i) => pad + (i / (values.length - 1)) * (w - pad * 2));
  const ys = values.map(v => h - pad - ((v - min) / (max - min)) * (h - pad * 2));
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${path} L${xs.at(-1)!.toFixed(1)},${h} L${xs[0].toFixed(1)},${h} Z`;
  const weeks = ["W1", "W2", "W3", "W4"];
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">Points Trend</span>
        <span className="font-montserrat text-white/30 text-[9px] uppercase tracking-widest">4 Weeks</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full" style={{ height: 90 }}>
        <defs>
          <linearGradient id={`grad-${teamId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path d={area} fill={`url(#grad-${teamId})`} />
        {/* Line */}
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots + labels */}
        {xs.map((x, i) => (
          <g key={i}>
            <circle cx={x.toFixed(1)} cy={ys[i].toFixed(1)} r="3.5" fill={color} />
            <text x={x.toFixed(1)} y={(ys[i] - 8).toFixed(1)} textAnchor="middle" fontSize="9" fill={color} fontFamily="inherit" opacity="0.8">{values[i]}</text>
            <text x={x.toFixed(1)} y={h + 16} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" fontFamily="inherit">{weeks[i]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function MemberModal({ member, color, onClose }: { member: WeeklyMember; color: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        className="relative w-full max-w-lg glass-card border-white/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 pb-6" style={{ background: `linear-gradient(135deg, ${color}18 0%, transparent 60%)` }}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 flex-shrink-0 flex items-center justify-center font-cinzel text-2xl font-light border"
              style={{ color, borderColor: `${color}40`, background: `${color}15` }}
            >
              {member.image
                ? <Image src={member.image} alt={member.name} fill className="object-cover" sizes="64px" />
                : member.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-cinzel text-white text-xl tracking-wider mb-1">{member.name}</h3>
              <span
                className="font-montserrat text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 border"
                style={{ color, borderColor: `${color}40`, background: `${color}10` }}
              >
                {member.category}
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 space-y-5">
          {/* Company */}
          <div className="bg-white/[0.03] border border-white/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-3.5 h-3.5 text-white/30" />
              <span className="font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em]">Company</span>
            </div>
            <div className="font-cinzel text-white text-base tracking-wider mb-2">{member.company}</div>
            <p className="font-montserrat text-white/50 text-xs leading-relaxed">{member.companyDesc}</p>
          </div>

          {/* Product / Services */}
          <div className="bg-white/[0.03] border border-white/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-3.5 h-3.5 text-white/30" />
              <span className="font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em]">Products & Services</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {member.product.split(",").map((p) => (
                <span
                  key={p}
                  className="font-montserrat text-[9px] uppercase tracking-wider px-2.5 py-1 border border-white/10 bg-white/[0.03] text-white/60"
                >
                  {p.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Ideal Connect */}
          <div className="bg-white/[0.03] border border-white/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="w-3.5 h-3.5 text-white/30" />
              <span className="font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em]">Ideal Connect</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {member.idealConnect.split(",").map((c) => (
                <span
                  key={c}
                  className="font-montserrat text-[9px] uppercase tracking-wider px-2.5 py-1 border"
                  style={{ color, borderColor: `${color}35`, background: `${color}08` }}
                >
                  {c.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Points */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="font-montserrat text-white/30 text-[9px] uppercase tracking-widest">League Points</span>
            <span className="font-cinzel text-xl" style={{ color }}>{member.points} pts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [activeMember, setActiveMember] = useState<WeeklyMember | null>(null);

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
    <div ref={containerRef} className="pt-24 bg-[#080600] min-h-screen overflow-x-hidden">
      {activeMember && <MemberModal member={activeMember} color={team.color} onClose={() => setActiveMember(null)} />}
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
                       sizes="(max-width: 768px) 100vw, 400px"
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
      <section className="py-8 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-y border-white/5 sr">
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
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#080600]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sr">
          
          {/* Owner card */}
          <div className="glass-card p-10 border-white/10 text-center relative overflow-hidden group hover:border-white/20 transition-colors">
            <div className="font-montserrat text-[9px] font-bold tracking-[0.3em] text-white/40 mb-8 uppercase">Team Owner</div>
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border border-white/20 p-1">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image fill src={team.id === 'modi' ? '/images/owner_modi.png' : team.id === 'doval' ? '/images/owner_doval.png' : team.id === 'amit-shah' ? '/images/owner_shah.png' : '/images/owner_jaishankar.png'} alt={team.owner.name} className="object-cover transition-all duration-700" sizes="120px" />
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

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { l: "Total Points", v: team.points.toLocaleString() },
                { l: "This Week",    v: team.weekPoints.toLocaleString() },
                { l: "Members",      v: String(team.members) },
              ].map((s) => (
                <div key={s.l} className="p-5 bg-white/[0.02] border border-white/5 text-center">
                  <div className="font-cinzel font-light text-3xl text-white mb-2">{s.v}</div>
                  <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-white/[0.02] border border-white/5 mb-8">
              <PointsTrendChart teamId={team.id} color={team.color} />
            </div>

            <p className="font-montserrat text-white/60 text-sm leading-relaxed mb-8 max-w-2xl">{team.description}</p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {[
                { l: "Business",  v: team.business },
                { l: "Referrals", v: String(team.referrals) },
                { l: "1 to 1",    v: String(team.meetings) },
                { l: "Visitors",  v: String(team.visitors) },
                { l: "Induction", v: String(team.induction) },
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
      <section id="members" className="py-32 px-6 sm:px-10 lg:px-16 bg-[#0C0900]">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="font-cinzel font-light text-white text-3xl tracking-widest uppercase">Roster <span className="text-white/40 text-sm tracking-widest">({team.members})</span></h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sr-stagger">
            {team.weeklyMembers.map((m, idx) => (
              <button
                key={m.name}
                onClick={() => setActiveMember(m)}
                className="glass-card border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group text-left overflow-hidden cursor-pointer focus:outline-none"
              >
                {/* Avatar / Photo */}
                <div className="relative w-full aspect-square overflow-hidden" style={{ background: `${team.color}0d` }}>
                  {m.image ? (
                    <Image src={m.image} alt={m.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-cinzel font-light text-6xl opacity-20" style={{ color: team.color }}>{m.name.charAt(0)}</span>
                    </div>
                  )}
                  {/* Rank badge */}
                  <div className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center font-cinzel text-[10px]" style={{ background: `${team.color}22`, color: team.color, border: `1px solid ${team.color}40` }}>
                    {idx + 1}
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <span className="font-montserrat text-white text-[9px] uppercase tracking-[0.2em] border border-white/30 px-3 py-1.5">View Profile</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="font-cinzel tracking-wider text-white text-sm leading-tight mb-1 truncate">{m.name}</div>
                  <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest truncate mb-3">{m.industry}</div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="font-montserrat text-white/25 text-[9px] uppercase tracking-widest truncate pr-2">{m.company.split(" ").slice(0, 2).join(" ")}</span>
                    <span className="font-cinzel text-xs flex-shrink-0" style={{ color: team.color }}>{m.points} pts</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section id="performance" className="py-32 px-6 sm:px-10 lg:px-16 bg-[#080600]">
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
      <section className="py-32 px-6 sm:px-10 lg:px-16 text-center bg-[#0C0900] border-t border-white/5">
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
