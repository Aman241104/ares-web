"use client";
import { useEffect, useRef } from "react";
import { tournamentRules } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  TrendingDown,
  CheckCircle,
  Award,
  Calendar,
  Trophy,
  ChevronRight,
  Scale,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: "Who can participate in ABL 2026?", a: "All active BNI members can participate. Each team consists of 7-8 business owners from the chapter." },
  { q: "How are points calculated?", a: "Points are awarded based on business growth (TYFCB), referrals, meetings, one-to-ones, and event participation. Bonus points are also available for exceptional performance." },
  { q: "When is the leaderboard updated?", a: "The leaderboard is updated every Wednesday at 8:00 PM throughout the tournament duration." },
  { q: "What are the prizes for winners?", a: "The winning team owner receives 1.5x of the prize pool. There are also individual MVP awards, team trophies for champions and runners-up, and permanent Wall of Fame recognition." },
  { q: "Can I participate if I miss some events?", a: "You must attend a minimum of 75% of events to remain eligible for prizes and recognition. Missing events results in point deductions." },
  { q: "How are teams formed?", a: "Teams are formed by the ARES Business League organizing committee, with each team led by one of the four iconic team owners (Modi, Doval, Amit Shah, Jaishankar)." },
  { q: "What is TYFCB?", a: "TYFCB stands for Thank You For Your Business Check — the business revenue generated through referrals and networking within the BNI chapter." },
  { q: "When does the tournament begin?", a: "The tournament runs from June 24 to July 22, 2026. The opening ceremony is on June 24, 2026 at 6:00 PM." },
];

// Section icons and accent colors
const SECTION_META: Record<string, { icon: React.ReactNode; accent: string; number: string }> = {
  "Scoring System":   { icon: <Star className="w-5 h-5" />,         accent: "#D4AF37", number: "01" },
  "Bonus Points":     { icon: <TrendingDown className="w-5 h-5" />, accent: "#27AE60", number: "02" },
  "Deductions":       { icon: <Scale className="w-5 h-5" />,        accent: "#C0392B", number: "03" },
  "Eligibility":      { icon: <CheckCircle className="w-5 h-5" />,  accent: "#1E3A8A", number: "04" },
  "Tournament Format": { icon: <Calendar className="w-5 h-5" />,   accent: "#E67E22", number: "05" },
  "Prize & Recognition": { icon: <Trophy className="w-5 h-5" />,   accent: "#F5D078", number: "06" },
};

export default function RulesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-links", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

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

  const scrollToSection = (label: string) => {
    const element = document.getElementById(`section-${label}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative py-24 px-6 sm:px-10 lg:px-16 overflow-hidden min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-4 mb-8 h-badge">
            <div className="h-px w-12 bg-white/10" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
              Know the Game
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          <h1 className="h-title font-cinzel font-light text-white leading-[1.1] mb-8" style={{ fontSize: "clamp(36px,8vw,90px)" }}>
            RULES &amp; <span className="text-[#D4AF37] italic">REGULATIONS</span>
          </h1>

          <div className="w-24 h-px mx-auto mb-8 bg-white/20" />

          <p className="h-sub font-montserrat text-white/50 text-sm tracking-wide leading-relaxed max-w-2xl mx-auto">
            Everything you need to know to compete, score, and win in the ARES Business League 2026 arena.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 h-links">
            {["Scoring", "Bonuses", "Deductions", "Eligibility", "Format", "Prizes"].map((label) => (
              <button
                key={label}
                onClick={() => scrollToSection(label)}
                className="font-montserrat text-[10px] uppercase tracking-widest font-bold px-5 py-2.5 rounded-full border border-white/10 text-white/50 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 cursor-pointer transition-all duration-300 bg-white/[0.02]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── RULES GRID ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12 sr">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
              Tournament Rules
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sr-stagger">
            {tournamentRules.map((section, sectionIdx) => {
              const meta = SECTION_META[section.section] || {
                icon: <Award className="w-5 h-5" />,
                accent: "#D4AF37",
                number: String(sectionIdx + 1).padStart(2, "0"),
              };
              
              const idLabel = section.section.split(" ")[0];

              return (
                <div
                  key={section.section}
                  id={`section-${idLabel}`}
                  className="group relative glass-card overflow-hidden border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Left accent stripe */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to bottom, transparent, ${meta.accent}, transparent)` }}
                  />

                  {/* Section number watermark */}
                  <div
                    className="absolute top-6 right-8 font-cinzel font-light text-6xl leading-none select-none pointer-events-none transition-colors duration-500"
                    style={{ color: meta.accent + "10" }}
                  >
                    {meta.number}
                  </div>

                  <div className="p-8 sm:p-10 relative">
                    {/* Header */}
                    <div className="flex items-center gap-5 mb-8">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border bg-white/[0.02] border-white/10 group-hover:bg-opacity-20 transition-all duration-500"
                        style={{ color: meta.accent }}
                      >
                        {meta.icon}
                      </div>
                      <div>
                        <div className="font-montserrat text-[9px] font-bold tracking-[0.4em] uppercase mb-1.5" style={{ color: meta.accent }}>
                          Section {meta.number}
                        </div>
                        <h3 className="font-cinzel text-white text-xl tracking-wider">{section.section}</h3>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mb-6 h-px w-full" style={{ background: `linear-gradient(90deg, ${meta.accent}40, transparent)` }} />

                    {/* Rules list */}
                    <ul className="space-y-4">
                      {section.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold bg-white/[0.02] border border-white/10 text-white/50"
                          >
                            {i + 1}
                          </div>
                          <span className="font-montserrat text-white/60 text-sm leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000] sr">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                Common Questions
              </span>
              <div className="h-px w-8 bg-[#D4AF37]" />
            </div>
            <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
              FREQUENTLY ASKED <span className="text-[#D4AF37] italic">QUESTIONS</span>
            </h2>
          </div>

          <div className="space-y-4 sr-stagger">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group glass-card border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <summary className="flex items-center justify-between gap-6 p-6 sm:p-8 cursor-pointer list-none">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-4 h-4 text-[#D4AF37] group-open:rotate-90 transition-transform duration-300" />
                    </div>
                    <span className="font-cinzel tracking-wider text-white text-base leading-relaxed group-open:text-[#D4AF37] transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37]/50 transition-colors">
                    <span className="text-[#D4AF37] font-light text-xl leading-none group-open:hidden">+</span>
                    <span className="text-[#D4AF37] font-light text-xl leading-none hidden group-open:block">-</span>
                  </div>
                </summary>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                  <div className="ml-12 font-montserrat text-white/50 text-sm leading-relaxed border-t border-white/5 pt-6">
                    {faq.a}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-32 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#050505] border-t border-white/5 sr">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-3xl mx-auto text-center glass-card p-12 lg:p-16 border-white/10 rounded-3xl">
          <div className="w-20 h-20 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-8">
            <Scale className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl lg:text-5xl mb-6 leading-tight">
            PLAY FAIR. <span className="text-[#D4AF37] italic">WIN HARD.</span>
          </h2>
          <p className="font-montserrat text-white/60 text-base mb-4">
            The arena rewards discipline, strategy, and relentless execution.
          </p>
          <p className="font-montserrat text-white/40 text-sm mb-10">
            Still have questions? Our team is here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/leaderboard" className="btn-secondary">
              View Standings
            </Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
