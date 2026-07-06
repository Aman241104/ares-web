"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Award, Trophy, Building2, Shield, Heart, Users, Sparkles, X, Phone, Mail, Briefcase, ExternalLink } from "lucide-react";
import { teams } from "@/lib/data";
import { COMMISSIONERS_2026, PARTNERS_2026 } from "@/lib/honorees";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const MASCOT_IMAGES: Record<string, string> = {
  modi:        "/images/mascot_lion.png",
  doval:       "/images/mascot_eagle.png",
  "amit-shah": "/images/mascot_tiger.png",
  jaishankar:  "/images/mascot_lotus.png",
};

// Re-cropped so every owner's head sits at the same size/level in the card —
// the source portraits were shot at different zoom levels.
const OWNER_CARD_IMAGES: Record<string, string> = {
  modi:        "/images/owner_modi_card.jpg",
  doval:       "/images/owner_doval_card.jpg",
  "amit-shah": "/images/owner_shah_card.jpg",
  jaishankar:  "/images/owner_jaishankar_card.jpg",
};

interface WallHonoree {
  name: string;
  role: string;
  img?: string;
  companyName: string;
  category: string;
  phone?: string;
  email?: string;
  idealConnect?: string;
  href?: string;
}

function SectionHeader({ eyebrow, title, accent, desc }: { eyebrow: string; title: string; accent: string; desc: string }) {
  return (
    <div className="mb-14 sr">
      <div className="section-label mb-5">{eyebrow}</div>
      <h2 className="font-cinzel font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(26px,4vw,50px)" }}>
        {title} <span className="text-gold-gradient">{accent}</span>
      </h2>
      <p className="font-montserrat text-white/40 text-xs sm:text-sm leading-[2] max-w-xl tracking-wide">{desc}</p>
    </div>
  );
}

function HonoreeCard({ honoree, onOpen }: { honoree: WallHonoree; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative block w-full text-left glass-card overflow-hidden hover:border-[#D4AF37]/25 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-56 overflow-hidden bg-black">
        {honoree.img ? (
          <Image
            src={honoree.img}
            alt={honoree.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top"
            style={{ filter: "brightness(1.25) saturate(1.05)" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0B1120]">
            <Building2 className="w-10 h-10 text-[#D4AF37]/30" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="font-montserrat text-[9px] uppercase tracking-widest mb-1 text-[#D4AF37]/80">{honoree.role}</div>
        <div className="font-cinzel text-white text-base tracking-wider mb-1">{honoree.name}</div>
        <div className="flex items-center gap-1.5 font-montserrat text-[9px] text-[#D4AF37] uppercase tracking-widest mt-3">
          <Briefcase className="w-3 h-3" /> {honoree.companyName}
        </div>
        <div className="font-montserrat text-white/40 text-[8px] uppercase tracking-[0.2em] mt-1">{honoree.category}</div>
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5 font-montserrat text-[9px] uppercase tracking-widest text-white/40 group-hover:text-[#D4AF37] transition-colors">
          Tap to View <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </button>
  );
}

function HonoreeModal({ honoree, onClose }: { honoree: WallHonoree; onClose: () => void }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative h-full overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-6">
      <div
        className="relative w-full max-w-md bg-[#0B1120] border border-[#D4AF37]/25 shadow-[0_40px_80px_rgba(0,0,0,0.7)] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-[#D4AF37] transition-colors" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D4AF37]/30 relative flex-shrink-0 bg-[#030712] flex items-center justify-center">
            {honoree.img ? (
              <Image src={honoree.img} alt={honoree.name} fill className="object-cover" style={{ filter: "brightness(1.25) saturate(1.05)" }} />
            ) : (
              <Building2 className="w-6 h-6 text-[#D4AF37]/40" />
            )}
          </div>
          <div>
            <h4 className="font-cinzel text-white text-lg tracking-wide">{honoree.name}</h4>
            <div className="font-montserrat text-[#D4AF37]/80 text-[9px] uppercase tracking-[0.2em]">{honoree.role}</div>
          </div>
        </div>

        <div className="space-y-0 divide-y divide-white/5 border-t border-white/5">
          <div className="flex justify-between items-center py-3.5">
            <span className="font-montserrat text-white/50 text-[9px] uppercase tracking-[0.22em]">Company</span>
            <span className="font-cinzel text-white/90 text-xs tracking-wider text-right">{honoree.companyName}</span>
          </div>
          <div className="flex justify-between items-center py-3.5">
            <span className="font-montserrat text-white/50 text-[9px] uppercase tracking-[0.22em]">Category</span>
            <span className="font-cinzel text-white/90 text-xs tracking-wider text-right">{honoree.category}</span>
          </div>
          {honoree.phone && (
            <div className="flex justify-between items-center py-3.5">
              <span className="font-montserrat text-white/50 text-[9px] uppercase tracking-[0.22em] flex items-center gap-1.5"><Phone className="w-3 h-3" /> Phone</span>
              <span className="font-cinzel text-white/90 text-xs tracking-wider">{honoree.phone}</span>
            </div>
          )}
          {honoree.email && (
            <div className="flex justify-between items-center py-3.5">
              <span className="font-montserrat text-white/50 text-[9px] uppercase tracking-[0.22em] flex items-center gap-1.5"><Mail className="w-3 h-3" /> Email</span>
              <span className="font-cinzel text-white/90 text-[11px] tracking-wide break-all text-right">{honoree.email}</span>
            </div>
          )}
        </div>

        {honoree.idealConnect && (
          <div className="mt-5 pt-5 border-t border-white/5">
            <div className="font-montserrat text-white/40 text-[8px] uppercase tracking-[0.3em] mb-2">Ideal Connects</div>
            <p className="font-montserrat text-white/60 text-[11px] leading-relaxed">{honoree.idealConnect}</p>
          </div>
        )}

        {honoree.href && (
          <Link href={honoree.href} className="mt-6 flex items-center justify-center gap-2 font-montserrat text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] hover:text-[#F0D060] transition-colors border-t border-white/5 pt-5">
            View Full Profile <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function WallOfFamePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHonoree, setActiveHonoree] = useState<WallHonoree | null>(null);

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

  const wallCommissioners: WallHonoree[] = COMMISSIONERS_2026.map((c) => ({
    name: c.name,
    role: c.role,
    img: c.img,
    companyName: c.company.name,
    category: c.company.category,
    phone: c.company.phone,
    email: c.company.email,
    idealConnect: c.company.idealConnect,
  }));

  const wallOwners: WallHonoree[] = teams.map((t) => ({
    name: t.owner.name,
    role: `Team Owner — ${t.name}`,
    img: OWNER_CARD_IMAGES[t.id] ?? t.owner.image,
    companyName: t.owner.company.name,
    category: t.owner.company.industry,
    phone: t.owner.phone,
    email: t.owner.email,
    idealConnect: t.owner.company.about,
    href: `/owners/${t.owner.id}`,
  }));

  const wallPartners: WallHonoree[] = PARTNERS_2026.map((p) => ({
    name: p.name,
    role: p.role,
    img: p.img,
    companyName: p.company.name,
    category: p.company.category,
    phone: p.company.phone,
    email: p.company.email,
    idealConnect: p.company.idealConnect,
  }));

  return (
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <PageHero layout="left" className="min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full z-10 relative py-24">
          <div className="max-w-2xl">
            <div className="h-badge inline-flex items-center gap-3 mb-8 relative">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/6 backdrop-blur-xl" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-live block relative z-10" />
              <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">A Legacy That Never Resets</span>
            </div>

            <h1 className="h-title font-cinzel font-bold text-white leading-none mb-7">
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
              Every year the ARES Business League is played, this page grows by one edition. New commissioners, new team owners, new partners — each one permanently etched here. Tap any face to see who they are and what they build.
            </p>

            <div className="h-cta flex flex-wrap gap-4">
              <Link href="/teams" className="btn-primary">Meet the Teams <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/partners" className="btn-secondary">Our Partners</Link>
            </div>
          </div>
        </div>
      </PageHero>

      {/* ══════════════ STATS BAR ══════════════ */}
      <section className="py-14 px-6 sm:px-10 lg:px-16 bg-[#030712] border-y border-white/5 sr">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5 sr-stagger">
          {[
            { num: "30",  label: "Warriors",        icon: <Users    className="w-5 h-5 text-[#D4AF37]" /> },
            { num: "4",   label: "Team Owners",      icon: <Star     className="w-5 h-5 text-[#D4AF37]" /> },
            { num: "4",   label: "Founding Partners", icon: <Heart    className="w-5 h-5 text-[#D4AF37]" /> },
            { num: "2",   label: "Commissioners",     icon: <Shield   className="w-5 h-5 text-[#D4AF37]" /> },
          ].map((s) => (
            <div key={s.label} className="glass-card p-6 text-center hover:border-[#D4AF37]/20 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/14 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <div className="font-cinzel font-bold text-3xl text-white mb-1">{s.num}</div>
              <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ 2026 EDITION HEADER ══════════════ */}
      <section className="pt-28 px-6 sm:px-10 lg:px-16 bg-[#000000] sr">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-5 py-2.5 mb-6">
            <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Edition One</span>
          </div>
          <h2 className="font-cinzel font-bold text-white" style={{ fontSize: "clamp(32px,5vw,60px)" }}>
            ARES BUSINESS LEAGUE <span className="text-[#D4AF37]">2026</span>
          </h2>
        </div>
      </section>

      {/* ══════════════ COMMISSIONERS ══════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Guardians"
            title="League"
            accent="Commissioners"
            desc="The two who kept the league fair, ran the arena, and made sure every point on the board was earned."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger max-w-3xl">
            {wallCommissioners.map((c) => (
              <HonoreeCard key={c.name} honoree={c} onOpen={() => setActiveHonoree(c)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TEAM OWNERS ══════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#030712] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Visionaries"
            title="Team"
            accent="Owners"
            desc="Four extraordinary leaders who assembled their squads, defined their strategies, and led from the front."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
            {teams.map((team, i) => (
              <div key={team.id} style={{ borderTop: `2px solid ${team.color}` }}>
                <HonoreeCard honoree={wallOwners[i]} onOpen={() => setActiveHonoree(wallOwners[i])} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PARTNERS ══════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Backbone"
            title="Founding"
            accent="Partners"
            desc="These businesses stood beside us from day one — investing their trust, resources, and reputation into making ABL 2026 a reality."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sr-stagger">
            {wallPartners.map((p) => (
              <HonoreeCard key={p.name} honoree={p} onOpen={() => setActiveHonoree(p)} />
            ))}
          </div>
        </div>
      </section>

      {activeHonoree && <HonoreeModal honoree={activeHonoree} onClose={() => setActiveHonoree(null)} />}

      {/* ══════════════ ALL WARRIORS ══════════════ */}
      <section className="py-28 px-6 sm:px-10 lg:px-16 bg-[#030712] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="The Competitors"
            title="Our"
            accent="Warriors"
            desc="Thirty business owners who stepped into the arena, gave it everything they had, and represented their teams with pride."
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
                <div className="font-montserrat text-white/60 text-[9px] uppercase tracking-widest mb-3">{m.company}</div>
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

      {/* ══════════════ ABL 2026 COMING SOON ══════════════ */}
      <section className="relative py-20 sm:py-32 sm:py-40 px-6 sm:px-10 lg:px-16 bg-[#000000] overflow-hidden border-t border-white/5 sr">
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
          <div className="inline-flex items-center gap-3 bg-[#D4AF37]/14 border border-[#D4AF37]/25 px-5 py-2.5 mb-10">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">The Next Chapter</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <h2 className="font-cinzel font-bold text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(40px,9vw,110px)" }}>
            EDITION<br />
            <span className="text-[#D4AF37]">TWO</span>
          </h2>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-px flex-1 max-w-[100px] bg-white/10" />
            <span className="font-montserrat text-white/60 text-sm tracking-[0.3em] uppercase">Coming Soon</span>
            <div className="h-px flex-1 max-w-[100px] bg-white/10" />
          </div>

          <p className="font-montserrat text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-12 tracking-wide">
            This wall grows every year. New commissioners, new team owners, new partners — the next edition will be added right here, alongside 2026, forever.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Register Your Interest <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/" className="btn-secondary">
              Explore ABL 2026
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
