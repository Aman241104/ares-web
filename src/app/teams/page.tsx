import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Users, Trophy, Calendar, TrendingUp, Shield } from "lucide-react";
import { teams } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const TEAM_IMAGES: Record<string, string> = {
  modi: "/images/team-modi.jpg",
  doval: "/images/team-doval.jpg",
  "amit-shah": "/images/team-amit-shah.jpg",
  jaishankar: "/images/team-jaishankar.jpg",
};

const MASCOT_IMAGES: Record<string, string> = {
  lion: "/images/mascot-lion.jpg",
  eagle: "/images/mascot-eagle.jpg",
  tiger: "/images/mascot-tiger.jpg",
  lotus: "/images/mascot-lotus.jpg",
};

const RANK_LABELS: Record<number, string> = {
  1: "CHAMPIONS",
  2: "CONTENDERS",
  3: "CHALLENGERS",
  4: "RISING",
};

export default function TeamsPage() {
  const sorted = [...teams].sort((a, b) => a.rank - b.rank);

  return (
    <div className="pt-16 bg-[#060d14]">

      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center py-24 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#060d14]">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        {/* Large radial gold bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 80% at 50% 60%, rgba(218,165,55,0.09) 0%, transparent 70%)" }}
        />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #060d14)" }} />

        <div className="max-w-7xl mx-auto relative w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 font-montserrat text-xs text-white/30 mb-12">
            <Link href="/" className="hover:text-[#DAA537] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#DAA537]">Team Owners</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-[#DAA537]/60" />
                <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                  4 Teams. 4 Leaders. 1 Mission.
                </span>
                <div className="h-px w-8 bg-[#DAA537]/60" />
              </div>

              <h1 className="font-cinzel font-black text-white leading-none mb-2" style={{ fontSize: "clamp(48px,7vw,84px)" }}>
                THE
              </h1>
              <h1 className="font-cinzel font-black leading-none mb-6 text-gold-gradient text-shadow-gold" style={{ fontSize: "clamp(56px,9vw,104px)" }}>
                4 TEAMS
              </h1>

              <div className="w-32 h-px mb-6" style={{ background: "linear-gradient(90deg, #DAA537, transparent)" }} />

              <p className="font-montserrat text-white/55 text-base leading-relaxed mb-8 max-w-md">
                Four iconic team owners. Thirty elite business builders. One legendary tournament to define who leads the nation and builds its future.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/leaderboard" className="btn-primary">View Leaderboard <ArrowRight className="w-4 h-4" /></Link>
                <Link href="/schedule" className="btn-secondary">View Schedule</Link>
              </div>
            </div>

            {/* Team mini-badges grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {sorted.map((team) => (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}`}
                  className="group relative rounded-2xl overflow-hidden border hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: team.color + "40", background: `linear-gradient(135deg, ${team.color}10 0%, #060d14 100%)` }}
                >
                  {/* Rank badge */}
                  <div
                    className="absolute top-3 right-3 font-cinzel font-black text-[9px] px-2 py-0.5 rounded-full z-10"
                    style={{ background: team.color + "30", color: team.color, border: `1px solid ${team.color}50` }}
                  >
                    #{team.rank}
                  </div>

                  <div className="p-4 flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2"
                      style={{ borderColor: team.color + "50" }}
                    >
                      {TEAM_IMAGES[team.id] ? (
                        <Image
                          src={TEAM_IMAGES[team.id]}
                          alt={team.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-cinzel font-black text-lg" style={{ background: team.color + "20", color: team.color }}>
                          {team.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-cinzel font-bold text-sm leading-tight mb-0.5" style={{ color: team.color }}>
                        {team.name.toUpperCase()}
                      </div>
                      <div className="font-montserrat text-white/45 text-[11px]">{team.tagline}</div>
                      <div className="font-montserrat text-white/25 text-[10px] mt-1">
                        {team.points.toLocaleString()} pts · {team.winRate} WR
                      </div>
                    </div>
                  </div>

                  {/* Bottom color bar */}
                  <div className="h-0.5 w-0 group-hover:w-full transition-all duration-400" style={{ background: team.color }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section className="py-8 px-4 sm:px-8 lg:px-12 border-y border-[#DAA537]/12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Users className="w-5 h-5 text-[#DAA537]" />, value: "30", label: "Business Owners" },
            { icon: <Trophy className="w-5 h-5 text-[#DAA537]" />, value: "4", label: "Iconic Teams" },
            { icon: <Calendar className="w-5 h-5 text-[#DAA537]" />, value: "4", label: "Tournament Weeks" },
            { icon: <TrendingUp className="w-5 h-5 text-[#DAA537]" />, value: "1.5x", label: "Prize Multiplier" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3 p-4 bg-[#060d14] border border-[#DAA537]/15 rounded-xl">
              <div className="w-9 h-9 rounded-lg bg-[#DAA537]/10 flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="font-cinzel font-black text-xl text-[#DAA537] leading-tight">{s.value}</div>
                <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-sep" />

      {/* ── CINEMATIC TEAM CARDS ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-6 rounded-full bg-[#DAA537]" />
            <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.4em] uppercase">
              Meet the Teams
            </span>
          </div>

          <div className="space-y-8">
            {sorted.map((team, idx) => (
              <div
                key={team.id}
                className="group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-1"
                style={{
                  borderColor: team.color + "35",
                  boxShadow: `0 4px 32px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Full-bleed background image with overlay */}
                <div className="absolute inset-0 overflow-hidden">
                  {TEAM_IMAGES[team.id] && (
                    <Image
                      src={TEAM_IMAGES[team.id]}
                      alt={team.name}
                      fill
                      sizes="100vw"
                      className="object-cover object-center opacity-15 group-hover:opacity-22 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform duration-700"
                    />
                  )}
                  {/* Gradient overlay: heavier on right, shows image on left */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(105deg, ${team.color}18 0%, #060d14 45%, #060d14 100%)`,
                    }}
                  />
                  {/* Team color bloom */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse 50% 80% at 10% 50%, ${team.color}12 0%, transparent 60%)` }}
                  />
                </div>

                {/* Top accent bar */}
                <div className="relative h-1" style={{ background: `linear-gradient(90deg, ${team.color}, ${team.color}40, transparent)` }} />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── Left: Identity ── */}
                    <div className="lg:col-span-4">
                      {/* Rank label */}
                      <div className="font-montserrat text-[10px] font-bold tracking-[0.35em] uppercase mb-3 flex items-center gap-2">
                        <span style={{ color: team.color }}>RANK #{team.rank}</span>
                        <span className="text-white/20">·</span>
                        <span
                          className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                          style={{ background: team.color + "20", color: team.color, border: `1px solid ${team.color}40` }}
                        >
                          {RANK_LABELS[team.rank]}
                        </span>
                      </div>

                      {/* Team image + name */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2"
                          style={{ borderColor: team.color + "70" }}
                        >
                          {TEAM_IMAGES[team.id] ? (
                            <Image
                              src={TEAM_IMAGES[team.id]}
                              alt={team.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center font-cinzel font-black text-3xl"
                              style={{ background: team.color + "20", color: team.color }}
                            >
                              {team.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h2 className="font-cinzel font-black text-2xl sm:text-3xl leading-tight mb-1" style={{ color: team.color }}>
                            {team.name.toUpperCase()}
                          </h2>
                          <div className="font-montserrat text-white/50 text-sm">{team.tagline}</div>
                          <div className="font-montserrat text-white/30 text-xs mt-1 italic">"{team.motto}"</div>
                        </div>
                      </div>

                      <p className="font-montserrat text-white/45 text-sm leading-relaxed mb-5 line-clamp-3">
                        {team.description}
                      </p>

                      {/* Mascot badge */}
                      {MASCOT_IMAGES[team.icon.toLowerCase()] && (
                        <div className="flex items-center gap-2 mb-5">
                          <div
                            className="w-8 h-8 rounded-lg overflow-hidden border"
                            style={{ borderColor: team.color + "40" }}
                          >
                            <Image
                              src={MASCOT_IMAGES[team.icon.toLowerCase()]}
                              alt={team.mascot}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-montserrat text-[9px] text-white/30 uppercase tracking-wider">Mascot</div>
                            <div className="font-cinzel font-bold text-xs" style={{ color: team.color }}>{team.mascot}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── Middle: Stats ── */}
                    <div className="lg:col-span-4">
                      <div className="font-montserrat text-[10px] text-white/30 uppercase tracking-widest mb-3">Performance</div>
                      <div className="grid grid-cols-3 gap-2 mb-4">
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
                            className="text-center p-2.5 rounded-xl border"
                            style={{
                              background: team.color + "08",
                              borderColor: team.color + "25",
                            }}
                          >
                            <div className="font-cinzel font-black text-base sm:text-lg leading-tight mb-0.5" style={{ color: team.color }}>
                              {s.v}
                            </div>
                            <div className="font-montserrat text-white/35 text-[9px] uppercase tracking-wider">{s.l}</div>
                          </div>
                        ))}
                      </div>

                      {/* Progress bar — win rate visual */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-montserrat text-[10px] text-white/30 uppercase tracking-wider">League Standing</span>
                          <span className="font-montserrat text-[10px] font-bold" style={{ color: team.color }}>
                            #{team.rank} of 4
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/08 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${((5 - team.rank) / 4) * 100}%`,
                              background: `linear-gradient(90deg, ${team.color}, ${team.color}80)`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Right: Owner + CTA ── */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      {/* Owner card */}
                      <div
                        className="rounded-xl p-4 border"
                        style={{ borderColor: team.color + "30", background: team.color + "08" }}
                      >
                        <div className="font-montserrat text-[9px] text-white/30 uppercase tracking-widest mb-2">Team Owner</div>
                        <div className="font-cinzel font-black text-white text-lg leading-tight mb-1">
                          {team.owner.name}
                        </div>
                        <div className="font-montserrat text-xs mb-3" style={{ color: team.color }}>
                          {team.owner.title}
                        </div>
                        <div className="font-montserrat text-white/35 text-[11px] italic leading-relaxed line-clamp-2">
                          "{team.owner.quote}"
                        </div>
                      </div>

                      {/* Achievements teaser */}
                      {team.achievements.length > 0 && (
                        <div className="rounded-xl p-3 border border-[#DAA537]/12 bg-white/03">
                          <div className="font-montserrat text-[9px] text-white/30 uppercase tracking-widest mb-2">
                            Latest Achievement
                          </div>
                          <div className="flex items-start gap-2">
                            <Trophy className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: team.color }} />
                            <div>
                              <div className="font-cinzel font-bold text-white text-xs">{team.achievements[0].title}</div>
                              <div className="font-montserrat text-white/40 text-[10px] mt-0.5">{team.achievements[0].desc}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={`/teams/${team.id}`}
                          className="btn-primary flex-1 justify-center text-[10px] py-3"
                        >
                          View Team <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/owners/${team.owner.id}`}
                          className="btn-secondary flex-1 justify-center text-[10px] py-3"
                          style={{ borderColor: team.color + "80", color: team.color }}
                        >
                          Owner <ArrowRight className="w-3.5 h-3.5" />
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

      <div className="section-sep" />

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 text-center overflow-hidden bg-[#0D1B2A]">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(218,165,55,0.07) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-[#DAA537]/60" />
            <span className="font-montserrat text-[#DAA537]/70 text-[11px] font-bold tracking-[0.4em] uppercase">
              One League. One Vision.
            </span>
            <Shield className="w-5 h-5 text-[#DAA537]/60" />
          </div>
          <h2 className="font-cinzel font-black text-white text-3xl sm:text-4xl mb-3 leading-tight">
            ONE LEGACY TO <span className="text-gold-gradient">BUILD.</span>
          </h2>
          <p className="font-montserrat text-white/50 text-base mb-8">
            Compete. Collaborate. Create Impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/leaderboard" className="btn-primary">
              View Leaderboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/schedule" className="btn-secondary">View Schedule</Link>
          </div>
        </div>
      </section>

      <div className="section-sep" />

      <LegacyCTA />
    </div>
  );
}
