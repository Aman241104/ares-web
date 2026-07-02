"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Handshake,
  Trophy,
  Zap,
  Crown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

type PointRow =
  | { label: string; points: number; detail?: string }
  | { label: string; tiers: { points: number; detail: string }[] };

const scoringActivities: PointRow[] = [
  {
    label: "121",
    tiers: [
      { points: 10, detail: "In Chapter" },
      { points: 20, detail: "Cross Chapter" },
      { points: 25, detail: "With Any Team Owner" },
    ],
  },
  { label: "Participation in Activities", points: 200, detail: "(special points if applicable would mentioned seperately)" },
  {
    label: "Referrals",
    tiers: [
      { points: 50, detail: "Inside" },
      { points: 50, detail: "Outside" },
      { points: 100, detail: "To Any Team Owner" },
    ],
  },
  {
    label: "TYFCB",
    tiers: [
      { points: 50, detail: "0 - 5,000" },
      { points: 250, detail: "5,000 - 50,000" },
      { points: 500, detail: "50,000 - 5,00,000" },
      { points: 1000, detail: ">5,00,000" },
    ],
  },
  {
    label: "TYFCB To Team Owner",
    tiers: [
      { points: 100, detail: "0 - 5,000" },
      { points: 350, detail: "5,000 - 50,000" },
      { points: 700, detail: "50,000 - 5,00,000" },
      { points: 1200, detail: ">5,00,000" },
    ],
  },
  {
    label: "Visitor",
    tiers: [
      { points: 1000, detail: "Coffee Table" },
      { points: 1500, detail: "In Meeting" },
      { points: 2000, detail: "In Meeting - Power Visitor (mentioned categories)" },
    ],
  },
  {
    label: "Organising Power Date",
    tiers: [
      { points: 1000, detail: "Cross Chapter BNI Member" },
      { points: 2000, detail: "Outside BNI Member" },
    ],
  },
  { label: "Induction", points: 6000, detail: "With Your Name As Sponsor" },
  { label: "Absent", points: -250, detail: "being absent in chapter meeting" },
  { label: "Present", points: 100, detail: "being present in chapter meeting before 8am" },
  { label: "Being Present Early", points: 250, detail: "reaching meeting room before 7:30 - selfie in group" },
  { label: "Late Arrival", points: -100, detail: "entering meeting after 8am" },
];

const comingSoon = [
  { icon: <Users className="w-6 h-6" />,  label: "Special Activities" },
  { icon: <Handshake className="w-6 h-6" />, label: "Business Activities" },
  { icon: <Zap className="w-6 h-6" />,    label: "Fun Events & Games" },
  { icon: <Trophy className="w-6 h-6" />, label: "Win Exciting Points" },
];

function PointsTable({ rows }: { rows: PointRow[] }) {
  return (
    <div className="border border-white/6 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr_auto_auto] bg-[#D4AF37]/8 border-b border-white/8">
        <div className="px-6 py-3 font-montserrat text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]/70 font-bold">Activity</div>
        <div className="px-6 py-3 font-montserrat text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]/70 font-bold text-right">Points</div>
        <div className="px-6 py-3 font-montserrat text-[9px] uppercase tracking-[0.35em] text-[#D4AF37]/70 font-bold w-48 sm:w-[280px] text-right">Details</div>
      </div>

      {rows.map((row, i) => {
        const isLast = i === rows.length - 1;
        if ("tiers" in row) {
          return (
            <div key={row.label} className={`group ${!isLast ? "border-b border-white/5" : ""}`}>
              {row.tiers.map((tier, ti) => (
                <div
                  key={ti}
                  className="grid grid-cols-[1fr_auto_auto] hover:bg-white/[0.025] transition-colors duration-200"
                >
                  <div className="px-6 py-3.5 font-montserrat text-[11px] text-white/70 tracking-wide">
                    {ti === 0 ? (
                      <span className="text-white/90 font-semibold">{row.label}</span>
                    ) : (
                      <span className="text-white/0 select-none text-[9px]">—</span>
                    )}
                  </div>
                  <div className="px-6 py-3.5 text-right">
                    <span
                      className="font-cinzel font-bold text-sm"
                      style={{
                        background: tier.points < 0 
                          ? "linear-gradient(135deg, #FF6B6B 0%, #DC2626 100%)" 
                          : "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 60%, #C9921A 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {tier.points.toLocaleString()}
                    </span>
                  </div>
                  <div className="px-6 py-3.5 w-48 sm:w-[280px] text-right">
                    <span className="font-montserrat text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[0.1em] leading-relaxed block">{tier.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div
            key={row.label}
            className={`grid grid-cols-[1fr_auto_auto] hover:bg-white/[0.025] transition-colors duration-200 ${!isLast ? "border-b border-white/5" : ""}`}
          >
            <div className="px-6 py-3.5 font-montserrat text-[11px] text-white/90 tracking-wide font-semibold">{row.label}</div>
            <div className="px-6 py-3.5 text-right">
              <span
                className="font-cinzel font-bold text-sm"
                style={{
                  background: row.points < 0 
                    ? "linear-gradient(135deg, #FF6B6B 0%, #DC2626 100%)" 
                    : "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 60%, #C9921A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {row.points.toLocaleString()}
              </span>
            </div>
            <div className="px-6 py-3.5 w-48 sm:w-[280px] text-right">
              <span className="font-montserrat text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[0.1em] leading-relaxed block">
                {"detail" in row && row.detail ? row.detail : "—"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function PointsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-split", { types: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 50, stagger: 0.04, duration: 0.7, ease: "back.out(1.4)" }, "-=0.4")
        .from(".h-sub",   { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: parent, start: "top 90%", once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <PageHero backgroundImage="/images/hero_arena.png" layout="centered" className="min-h-[60vh] justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-badge inline-flex items-center gap-3 mb-8 relative px-5 py-2.5">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 backdrop-blur-xl" />
            <Star className="w-3.5 h-3.5 text-[#D4AF37] relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Points That Build Champions</span>
          </div>

          <h1 className="font-cinzel font-bold text-white mb-8 leading-none">
            <span className="block text-white/55 font-montserrat text-xs sm:text-sm tracking-[0.5em] uppercase mb-2">Scoring</span>
            <span
              className="h-title-split block"
              style={{
                fontSize: "clamp(52px, 13vw, 130px)",
                background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              POINTS
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-5 h-sub">
            <div className="h-px w-12 bg-[#D4AF37]/30" />
            <p className="font-montserrat text-white/60 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              ABL 2026 · Every Action Counts
            </p>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>

          <p className="font-montserrat text-white/60 text-xs sm:text-sm leading-[2] max-w-xl mx-auto tracking-wide">
            Every action you take earns points. Every point builds legacy. Know the system and play to win.
          </p>
        </div>
      </PageHero>

      {/* ── LEAGUE SCORING SYSTEM ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#030712] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="sr mb-12">
            <div className="section-label mb-4">League Scoring System</div>
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/25 bg-[#D4AF37]/8"
                style={{ color: "#D4AF37" }}
              >
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="font-montserrat text-[8px] font-bold tracking-[0.35em] uppercase text-[#D4AF37]/70 mb-0.5">Comprehensive</div>
                <h2 className="font-cinzel text-white text-xl tracking-wider">Activity Points</h2>
              </div>
            </div>
            <div className="mt-6 h-px w-full" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.35), transparent)" }} />
          </div>

          <div className="sr bg-[#0B1120]">
            <PointsTable rows={scoringActivities} />
          </div>
        </div>
      </section>

      {/* ── AND THAT'S NOT ALL ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#030712] border-t border-white/5 sr">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-16 bg-[#D4AF37]/30" />
              <Star className="w-4 h-4 text-[#D4AF37]" />
              <div className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.45em] uppercase">And That's Not All</div>
              <Star className="w-4 h-4 text-[#D4AF37]" />
              <div className="h-px w-16 bg-[#D4AF37]/30" />
            </div>
            <h2 className="font-cinzel font-bold text-white mb-5" style={{ fontSize: "clamp(24px, 4vw, 42px)" }}>
              More Ways to <span className="text-[#D4AF37]">Earn</span>
            </h2>
            <p className="font-montserrat text-white/55 text-xs leading-[2] max-w-lg mx-auto tracking-wide">
              There will be a lot of special activities, business activities, and fun events & games throughout the league.
              Participate. Engage. Earn more.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sr-stagger">
            {comingSoon.map((item) => (
              <div
                key={item.label}
                className="group flex flex-col items-center text-center border border-white/6 bg-[#0B1120] hover:border-[rgba(212,175,55,0.2)] hover:bg-[#030712] p-8 transition-all duration-400 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }}
                />
                <div className="w-12 h-12 flex items-center justify-center border border-[#D4AF37]/15 bg-[#D4AF37]/6 text-[#D4AF37] mb-4 group-hover:border-[#D4AF37]/35 group-hover:bg-[#D4AF37]/10 transition-all duration-400">
                  {item.icon}
                </div>
                <span className="font-cinzel text-white/80 text-xs tracking-wider leading-snug group-hover:text-white transition-colors duration-300">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Coming soon banner */}
          <div className="mt-8 border border-[#D4AF37]/15 bg-[#D4AF37]/4 px-6 py-4 text-center">
            <span className="font-montserrat text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold">
              Details Will Be Disclosed Later
            </span>
          </div>
        </div>
      </section>



    </div>
  );
}
