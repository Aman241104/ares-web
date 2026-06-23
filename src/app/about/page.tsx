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
import LegacyCTA from "@/components/LegacyCTA";

const PILLARS = [
  {
    icon: <Target className="w-7 h-7" />,
    title: "Compete",
    desc: "High-stakes business competition that drives performance, accountability, and measurable growth across all 4 teams.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Collaborate",
    desc: "Build powerful business relationships that generate referrals, partnerships, and TYFCB revenue for all members.",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Create Impact",
    desc: "Build nation-leading businesses through consistent action, strategic thinking, and legendary leadership.",
  },
];

const WHY_CARDS = [
  {
    icon: <Target className="w-6 h-6 text-[#DAA537]" />,
    title: "Showcase Tournament",
    desc: "Real-time leaderboard showing live tournament progress across all 4 weeks.",
  },
  {
    icon: <Trophy className="w-6 h-6 text-[#DAA537]" />,
    title: "Celebrate Teams",
    desc: "Honor the 4 legendary teams and their outstanding team owners.",
  },
  {
    icon: <Globe className="w-6 h-6 text-[#DAA537]" />,
    title: "Nation Building",
    desc: "Building a nation-building culture through collective business growth.",
  },
  {
    icon: <Star className="w-6 h-6 text-[#DAA537]" />,
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
  { name: "Team Owner I", role: "Team Leader — Lions", img: "/images/owner-portrait-1.jpg" },
  { name: "Team Owner II", role: "Team Leader — Eagles", img: "/images/owner-portrait-2.jpg" },
  { name: "Team Owner III", role: "Team Leader — Tigers", img: "/images/owner-portrait-3.jpg" },
  { name: "Team Owner IV", role: "Team Leader — Lotus", img: "/images/owner-portrait-4.jpg" },
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
  return (
    <div className="pt-16">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[82vh] flex items-center px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#060d14]">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

        {/* Large atmospheric radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 50% 55%, rgba(218,165,55,0.10) 0%, rgba(218,165,55,0.03) 45%, transparent 70%)",
          }}
        />

        {/* Subtle corner glows */}
        <div
          className="absolute -top-40 -left-40 w-[640px] h-[640px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(218,165,55,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[640px] h-[640px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(218,165,55,0.05) 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
          {/* LEFT — copy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#DAA537]/70" />
              <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                The Arena Is Set
              </span>
            </div>

            <h1
              className="font-cinzel font-black text-white leading-[1.05] mb-6"
              style={{ fontSize: "clamp(44px,6.5vw,82px)" }}
            >
              ABOUT
              <br />
              <span className="text-shadow-gold" style={{ color: "#DAA537" }}>
                ABL 2026
              </span>
            </h1>

            <div className="gold-divider w-28 mb-6" />

            <p className="font-montserrat text-white/60 text-base leading-relaxed mb-8 max-w-xl">
              ARES Business League 2026 is a high-stakes, one-month business tournament bringing
              together 30 elite business owners competing across 4 iconic teams. Strategy.
              Leadership. Execution. One Winner.
            </p>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-5 mb-10 max-w-sm">
              {[
                { val: "30", label: "Elite Players" },
                { val: "4", label: "Iconic Teams" },
                { val: "4", label: "Weeks of Battle" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-cinzel font-black text-[#DAA537]"
                    style={{ fontSize: "clamp(28px,3vw,40px)" }}
                  >
                    {s.val}
                  </div>
                  <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/teams" className="btn-primary">
                Meet The Teams <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/leaderboard" className="btn-secondary">
                View Leaderboard
              </Link>
            </div>
          </div>

          {/* RIGHT — info card */}
          <div className="relative">
            {/* Trophy image in background */}
            <div
              className="absolute -top-6 -right-6 w-full h-full pointer-events-none rounded-2xl overflow-hidden"
              style={{ opacity: 0.08 }}
            >
              <img
                src="/images/hero-trophy-pedestal.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="glass-card relative overflow-hidden p-8">
              {/* Top gold accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: "linear-gradient(90deg, transparent, #DAA537, #F5D078, #DAA537, transparent)",
                }}
              />

              {/* Trophy image */}
              <div className="flex justify-center mb-6">
                <img
                  src="/images/hero-trophy.jpg"
                  alt="Championship Trophy"
                  className="w-24 h-28 object-cover rounded-xl trophy-glow"
                />
              </div>

              <h3 className="font-cinzel font-bold text-[#DAA537] text-xl text-center mb-1">
                ARES BUSINESS LEAGUE
              </h3>
              <div className="font-montserrat text-white/35 text-sm text-center mb-5">
                2026 — Nation Builders Edition
              </div>

              <div className="gold-divider mb-5" />

              <div className="space-y-3">
                {[
                  { label: "Tournament Duration", value: "June 24 – July 22, 2026" },
                  { label: "Teams", value: "4 Iconic Teams" },
                  { label: "Business Owners", value: "30 Elite Players" },
                  { label: "Prize", value: "1.5x Pool + Trophies + MVP Awards" },
                  { label: "Platform", value: "BNI Chapter" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2.5 border-b border-[#DAA537]/10 last:border-0"
                  >
                    <span className="font-montserrat text-white/40 text-xs">{item.label}</span>
                    <span className="font-montserrat font-semibold text-white text-xs text-right max-w-[55%]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── MISSION ─── */}
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#0D1B2A]">
        {/* Atmospheric trophy pedestal background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/images/hero-trophy-pedestal.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.04]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0D1B2A 0%, rgba(13,27,42,0.6) 50%, #0D1B2A 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Section label */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#DAA537]/70" />
                <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                  Our Purpose
                </span>
              </div>
              <h2
                className="font-cinzel font-black text-white leading-tight mb-6"
                style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
              >
                THE <span className="text-gold-gradient">MISSION</span>
              </h2>
              <p className="font-montserrat text-white/55 text-base leading-relaxed mb-6 max-w-lg">
                It is NOT just a competition. ARES Business League exists to build a nation through
                business growth, member collaboration, and forging legendary enterprises that
                generate massive TYFCB revenue together.
              </p>
              <div className="gold-divider w-24" />
            </div>

            {/* Right side pull-quote */}
            <div
              className="glass-card p-8 relative overflow-hidden"
              style={{ borderColor: "rgba(218,165,55,0.25)" }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
                style={{ background: "linear-gradient(to bottom, #F5D078, #B8860B)" }}
              />
              <p className="font-cinzel text-white/90 text-xl leading-relaxed pl-4">
                &ldquo;Leaders Compete.
                <br />
                <span style={{ color: "#DAA537" }}>Nation Progresses.</span>&rdquo;
              </p>
              <div className="mt-6 pl-4 font-montserrat text-white/40 text-xs tracking-widest uppercase">
                The ABL 2026 Creed
              </div>
            </div>
          </div>

          {/* Three mission cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {PILLARS.map((item) => (
              <div
                key={item.title}
                className="card-premium p-8 text-center group cursor-default"
                style={{ background: "rgba(6,13,20,0.7)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#DAA537] mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "rgba(218,165,55,0.08)",
                    border: "1px solid rgba(218,165,55,0.25)",
                    boxShadow: "0 0 24px rgba(218,165,55,0.08)",
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="font-cinzel font-bold text-[#DAA537] text-xl mb-3">
                  {item.title.toUpperCase()}
                </h3>
                <div className="w-8 h-px bg-[#DAA537]/40 mx-auto mb-4" />
                <p className="font-montserrat text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── VALUES / PILLARS ─── */}
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#060d14] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(218,165,55,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#DAA537]/70" />
              <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                Why It Matters
              </span>
              <div className="h-px w-8 bg-[#DAA537]/70" />
            </div>
            <h2
              className="font-cinzel font-black text-white"
              style={{ fontSize: "clamp(28px,4vw,52px)" }}
            >
              THE PILLARS OF <span className="text-gold-gradient">ABL</span>
            </h2>
            <p className="font-montserrat text-white/45 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
              Four foundational principles that drive everything we do — from the opening ceremony
              to the final championship ceremony.
            </p>
          </div>

          {/* Why it matters grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {WHY_CARDS.map((item) => (
              <div
                key={item.title}
                className="card group cursor-default text-center"
                style={{ background: "rgba(13,27,42,0.6)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "rgba(218,165,55,0.08)",
                    border: "1px solid rgba(218,165,55,0.2)",
                  }}
                >
                  {item.icon}
                </div>
                <h3 className="font-cinzel font-bold text-[#DAA537] text-base mb-2">
                  {item.title}
                </h3>
                <p className="font-montserrat text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-sep mb-16" />

          {/* Values — larger icon cards */}
          <div className="text-center mb-12">
            <h2
              className="font-cinzel font-black text-white"
              style={{ fontSize: "clamp(24px,3.5vw,44px)" }}
            >
              CORE <span className="text-gold-gradient">VALUES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group cursor-default relative overflow-hidden rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "rgba(13,27,42,0.8)",
                  border: "1px solid rgba(218,165,55,0.18)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                {/* Hover gold glow border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "0 0 0 1px rgba(218,165,55,0.55), 0 12px 40px rgba(218,165,55,0.14)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#DAA537] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "rgba(218,165,55,0.08)",
                    border: "1px solid rgba(218,165,55,0.25)",
                  }}
                >
                  {v.icon}
                </div>

                <h3 className="font-cinzel font-bold text-white text-lg mb-3">{v.title}</h3>
                <div className="w-8 h-px bg-[#DAA537]/50 mx-auto mb-3" />
                <p className="font-montserrat text-white/45 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── LEADERSHIP / TEAM OWNERS ─── */}
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(218,165,55,0.06) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#DAA537]/70" />
              <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                The Champions
              </span>
              <div className="h-px w-8 bg-[#DAA537]/70" />
            </div>
            <h2
              className="font-cinzel font-black text-white"
              style={{ fontSize: "clamp(28px,4vw,52px)" }}
            >
              MEET THE <span className="text-gold-gradient">LEADERS</span>
            </h2>
            <p className="font-montserrat text-white/45 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Four elite team owners. Four unique strategies. One arena to determine the greatest
              among them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="group cursor-default relative overflow-hidden rounded-2xl transition-all duration-400 hover:-translate-y-3"
                style={{
                  background: "rgba(6,13,20,0.7)",
                  border: "1px solid rgba(218,165,55,0.18)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(218,165,55,0.55), 0 16px 50px rgba(218,165,55,0.14)",
                  }}
                />

                {/* Portrait */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Bottom gradient overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,13,20,0.95) 0%, transparent 100%)",
                    }}
                  />
                  {/* Gold top line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #DAA537, transparent)",
                      opacity: 0,
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="font-cinzel font-bold text-white text-base mb-1">
                    {leader.name}
                  </h3>
                  <div className="font-montserrat text-[#DAA537] text-xs tracking-wide">
                    {leader.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── SPIRIT QUOTES ─── */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 bg-[#060d14] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h2
              className="font-cinzel font-black text-white"
              style={{ fontSize: "clamp(24px,3.5vw,44px)" }}
            >
              THE ARES <span className="text-gold-gradient">SPIRIT</span>
            </h2>
            <div className="gold-divider w-24 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {QUOTES.map((quote) => (
              <div
                key={quote}
                className="group cursor-default p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(13,27,42,0.7)",
                  border: "1px solid rgba(218,165,55,0.18)",
                }}
              >
                {/* Gold left accent */}
                <div
                  className="w-0.5 h-8 mb-4 rounded-full"
                  style={{ background: "linear-gradient(to bottom, #F5D078, #B8860B)" }}
                />
                <p className="font-cinzel text-[#DAA537] text-sm font-bold leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/teams" className="btn-primary">
              Meet The Teams <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/leaderboard" className="btn-secondary">
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(218,165,55,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-12 bg-[#DAA537]/60" />
            <span className="font-montserrat text-[#DAA537]/80 text-[10px] font-bold tracking-[0.5em] uppercase">
              Ready to Compete
            </span>
            <div className="h-px w-12 bg-[#DAA537]/60" />
          </div>

          <h2
            className="font-cinzel font-black text-white leading-tight mb-5"
            style={{ fontSize: "clamp(28px,4vw,52px)" }}
          >
            JOIN THE{" "}
            <span className="text-shadow-gold" style={{ color: "#DAA537" }}>
              ARENA
            </span>
          </h2>

          <div className="gold-divider w-20 mx-auto mb-6" />

          <p className="font-montserrat text-white/55 text-base leading-relaxed mb-8">
            Be part of the most exciting business tournament of 2026. Connect with elite business
            owners, compete for glory, and build your legacy.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get In Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/schedule" className="btn-secondary">
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
