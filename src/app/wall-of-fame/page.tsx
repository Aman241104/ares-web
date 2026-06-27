"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Award, Trophy, Building2, Shield, Heart, Users, Sparkles } from "lucide-react";
import { teams, partners, commissioners } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const OWNER_IMAGES: Record<string, string> = {
  modi:        "/images/owner_modi.png",
  doval:       "/images/owner_doval.png",
  "amit-shah": "/images/owner_shah.png",
  jaishankar:  "/images/owner_jaishankar.png",
};

const MASCOT_IMAGES: Record<string, string> = {
  modi:        "/images/mascot_lion.png",
  doval:       "/images/mascot_eagle.png",
  "amit-shah": "/images/mascot_tiger.png",
  jaishankar:  "/images/mascot_lotus.png",
};

function SectionHeader({ eyebrow, title, accent, desc }: { eyebrow: string; title: string; accent: string; desc: string }) {
  return (
    <div className="mb-14 sr">
      <div className="section-label mb-5">{eyebrow}</div>
      <h2 className="font-cinzel font-light text-white leading-tight mb-5" style={{ fontSize: "clamp(26px,4vw,50px)" }}>
        {title} <span className="text-gold-gradient">{accent}</span>
      </h2>
      <p className="font-montserrat text-white/40 text-xs sm:text-sm leading-[2] max-w-xl tracking-wide">{desc}</p>
    </div>
  );
}

export default function WallOfFamePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 40, duration: 1.1 }, "-=0.4")
        .from(".h-sub",   { opacity: 0, y: 20, duration: 0.9 }, "-=0.6")
        .from(".h-cta",   { opacity: 0, y: 16, duration: 0.8 }, "-=0.5");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: parent, start: "top 88%", once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const allMembers = teams.flatMap((t) =>
    t.weeklyMembers.map((m) => ({ ...m, teamName: t.name, teamColor: t.color, teamId: t.id }))
  );

  return (
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <PageHero layout="left" className="min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full z-10 relative py-24">
          <div className="max-w-2xl">
            <div className="h-badge inline-flex items-center gap-3 mb-8 relative">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/6 backdrop-blur-xl" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-live block relative z-10" />
              <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Nation Builders Edition · ABL 2026</span>
            </div>

            <h1 className="h-title font-cinzel font-light text-white leading-none mb-7">
              <span style={{ fontSize: "clamp(48px,10vw,110px)", display: "block" }}>WALL</span>
              <span style={{
                fontSize: "clamp(48px,10vw,110px)",
                display: "block",
                background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}>OF FAME</span>
            </h1>

            <div className="gold-divider max-w-[120px] mb-8" />

            <p className="h-sub font-montserrat text-white/50 text-sm sm:text-base tracking-wide leading-[2] max-w-lg mb-10">
              This page is dedicated to every person who believed in this vision — our partners who powered the league, the warriors who competed with honour, and the guardians who kept it fair. You are the legacy.
            </p>

            <div className="h-cta flex flex-wrap gap-4">
              <Link href="/teams" className="btn-primary">Meet the Teams <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/partners" className="btn-secondary">Our Partners</Link>
            </div>
          </div>
        </div>
      </PageHero>

      {/* ══════════════ STATS BAR ══════════════ */}
      <section className="py-14 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-y border-white/5 sr">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 sr-stagger">
          {[
            { num: "30",  label: "Warriors",        icon: <Users    className="w-5 h-5 text-[#D4AF37]" /> },
            { num: "4",   label: "Visionary Owners", icon: <Star     className="w-5 h-5 text-[#D4AF37]" /> },
            { num: "8+",  label: "Proud Partners",   icon: <Heart    className="w-5 h-5 text-[#D4AF37]" /> },
            { num: "6",   label: "League Guardians", icon: <Shield   className="w-5 h-5 text-[#D4AF37]" /> },
          ].map((s) => (
            <div key={s.label} className="glass-card p-6 text-center hover:border-[#D4AF37]/20 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/8 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <div className="font-cinzel font-light text-3xl text-white mb-1">{s.num}</div>
              <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ PARTNERS ══════════════ */}
      <section className="py-28 px-6 sm:px-10 lg:px-16 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Backbone"
            title="Our Founding"
            accent="Partners"
            desc="These organisations stood beside us from day one — investing their trust, resources, and reputation into making ABL 2026 a reality. Their belief made this possible."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sr-stagger">
            {partners.map((p) => {
              const isPlatinum = p.tier.toLowerCase().includes("platinum");
              const isStrategic = p.tier.toLowerCase().includes("strategic");
              const isGold = p.tier.toLowerCase().includes("gold");
              const isPremium = isPlatinum || isStrategic;
              const accentColor = isPremium ? "#D4AF37" : isGold ? "#C49428" : "rgba(255,255,255,0.45)";

              return (
                <div
                  key={p.name}
                  className="relative glass-card p-7 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden"
                  style={isPremium ? { borderColor: "rgba(212,175,55,0.2)" } : {}}
                >
                  {isPremium && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                  )}
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5 border transition-colors"
                    style={{ borderColor: `${accentColor}30`, background: `${accentColor}08` }}
                  >
                    <Building2 className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <div className="font-cinzel text-white text-sm tracking-wider leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors">{p.name}</div>
                  <div className="font-montserrat text-[9px] italic text-white/60 mb-3">{p.tagline}</div>
                  <span
                    className="font-montserrat text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 border"
                    style={{ color: accentColor, borderColor: `${accentColor}35`, background: `${accentColor}08` }}
                  >
                    {p.tier}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ TEAM OWNERS ══════════════ */}
      <section className="py-28 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Visionaries"
            title="Team"
            accent="Owners"
            desc="Four extraordinary leaders who assembled their squads, defined their strategies, and led from the front. Their drive and character shaped everything this league stands for."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
            {teams.map((team) => (
              <Link
                key={team.id}
                href={`/owners/${team.owner.id}`}
                className="group block glass-card overflow-hidden hover:border-white/15 transition-all duration-500"
                style={{ borderTop: `2px solid ${team.color}` }}
              >
                <div className="relative h-56 overflow-hidden bg-black">
                  <Image
                    src={OWNER_IMAGES[team.id]}
                    alt={team.owner.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
                  <div
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border"
                    style={{ borderColor: `${team.color}50`, background: `${team.color}18` }}
                  >
                    <Award className="w-4 h-4" style={{ color: team.color }} />
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-montserrat text-[9px] uppercase tracking-widest mb-1" style={{ color: team.color }}>{team.name}</div>
                  <div className="font-cinzel text-white text-base tracking-wider mb-1">{team.owner.name}</div>
                  <div className="font-montserrat text-white/40 text-[10px] leading-relaxed line-clamp-2">{team.owner.leadershipStyle}</div>
                  <div className="flex items-center gap-1.5 mt-4 font-montserrat text-[9px] uppercase tracking-widest text-white/55 group-hover:text-white/60 transition-colors">
                    View Profile <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ALL WARRIORS ══════════════ */}
      <section className="py-28 px-6 sm:px-10 lg:px-16 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Competitors"
            title="Our"
            accent="Warriors"
            desc="Thirty business owners who stepped into the arena, gave it everything they had, and represented their teams with pride. Every referral, every meeting, every point — counted."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sr-stagger">
            {allMembers.map((m) => (
              <div
                key={`${m.teamId}-${m.name}`}
                className="glass-card p-5 hover:bg-white/[0.04] transition-all duration-300 group border-white/5 hover:border-white/10"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center font-cinzel text-lg mb-3 border"
                  style={{ color: m.teamColor, borderColor: `${m.teamColor}35`, background: `${m.teamColor}0d` }}
                >
                  {m.name.charAt(0)}
                </div>
                <div className="font-cinzel text-white text-sm tracking-wider leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors">{m.name}</div>
                <div className="font-montserrat text-white/60 text-[9px] uppercase tracking-widest mb-3">{m.industry}</div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="font-montserrat text-[8px] uppercase tracking-widest" style={{ color: m.teamColor }}>
                    {m.teamName.replace("Team ", "")}
                  </span>
                  <span className="font-cinzel text-xs text-white/40">{m.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ COMMISSIONERS ══════════════ */}
      <section className="py-28 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Guardians"
            title="League"
            accent="Officials"
            desc="Behind every great league is a team of committed officials who ensure fairness, smooth operations, and the highest standards of integrity. This one is no different."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sr-stagger">
            {commissioners.map((c) => (
              <div
                key={c.name}
                className="glass-card p-6 text-center hover:border-[#D4AF37]/20 hover:bg-white/[0.03] transition-all duration-300 group"
              >
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/25 bg-[#D4AF37]/8 group-hover:bg-[#D4AF37]/15 transition-colors">
                  <Shield className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="font-cinzel text-white text-sm mb-1 tracking-wider">{c.name}</div>
                <div className="font-montserrat text-[8px] uppercase tracking-widest font-bold mb-3" style={{ color: "#D4AF37" }}>{c.role}</div>
                <div className="font-montserrat text-white/60 text-[9px] leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ABL 2026 COMING SOON ══════════════ */}
      <section className="relative py-32 sm:py-40 px-6 sm:px-10 lg:px-16 bg-[#0B132B] overflow-hidden border-t border-white/5 sr">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 65%)" }} />

        {/* Decorative mascots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
          {Object.entries(MASCOT_IMAGES).map(([id, src], i) => {
            const positions = [
              "left-[2%] top-[10%] opacity-[0.04]",
              "left-[20%] bottom-[5%] opacity-[0.03]",
              "right-[20%] top-[5%] opacity-[0.03]",
              "right-[2%] bottom-[10%] opacity-[0.04]",
            ];
            return (
              <div key={id} className={`absolute w-48 h-48 ${positions[i]}`}>
                <Image src={src} alt="" fill className="object-contain" sizes="192px" />
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-[#D4AF37]/8 border border-[#D4AF37]/25 px-5 py-2.5 mb-10">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">The Next Chapter</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <h2 className="font-cinzel font-light text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(40px,9vw,110px)" }}>
            ABL<br />
            <span className="text-[#D4AF37]">2026</span>
          </h2>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-px flex-1 max-w-[100px] bg-white/10" />
            <span className="font-montserrat text-white/60 text-sm tracking-[0.3em] uppercase">Coming Soon</span>
            <div className="h-px flex-1 max-w-[100px] bg-white/10" />
          </div>

          <p className="font-montserrat text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-12 tracking-wide">
            The next edition of ARES Business League is being forged. New teams, new battles, new legends. The arena will be bigger, the stakes will be higher, and the legacy will be greater.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-14">
            {[
              { n: "4",    l: "Teams" },
              { n: "30+",  l: "Warriors" },
              { n: "1",    l: "Champion" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-cinzel font-light text-3xl sm:text-4xl text-white mb-1">{s.n}</div>
                <div className="font-montserrat text-white/55 text-[9px] uppercase tracking-[0.2em]">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Register Your Interest <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/" className="btn-secondary">
              Explore ABL 2025
            </Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
