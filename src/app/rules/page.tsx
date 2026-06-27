"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { tournamentRules } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";
import PageHero from "@/components/PageHero";
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
import SplitType from "split-type";

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
      const title = new SplitType(".h-title-split", { types: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge",   { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars,  { opacity: 0, y: 50, stagger: 0.04, duration: 0.7, ease: "back.out(1.4)" }, "-=0.4")
        .from(".h-sub",     { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-links",   { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

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
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <PageHero backgroundImage="/images/hero_arena.png" layout="centered" className="min-h-[65vh] justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-28">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-badge inline-flex items-center gap-3 mb-8 relative px-5 py-2.5">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 backdrop-blur-xl" />
            <Scale className="w-3.5 h-3.5 text-[#D4AF37] relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Know the Game</span>
          </div>

          <h1 className="font-cinzel font-bold text-white mb-8 leading-none">
            <span className="block text-white/55 font-montserrat text-xs sm:text-sm tracking-[0.5em] uppercase mb-2">Tournament</span>
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
              RULES
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-7 h-sub">
            <div className="h-px w-12 bg-[#D4AF37]/30" />
            <p className="font-montserrat text-white/60 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              ABL 2026 · Official Regulations
            </p>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>

          <p className="font-montserrat text-white/60 text-xs sm:text-sm leading-[2] max-w-xl mx-auto tracking-wide mb-10">
            Everything you need to know to compete, score, and win in the ARES Business League 2026 arena.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 h-links">
            {["Scoring", "Bonuses", "Deductions", "Eligibility", "Format", "Prizes"].map((label) => (
              <button
                key={label}
                onClick={() => scrollToSection(label)}
                className="font-montserrat text-[8px] uppercase tracking-[0.25em] font-bold px-4 py-2 border border-white/10 text-white/70 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/6 cursor-pointer transition-all duration-300 bg-white/[0.05]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </PageHero>

      {/* ── RULES GRID ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="section-label mb-12 sr">Tournament Rules</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sr-stagger">
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
                  className="group relative border border-white/6 bg-[#111827] hover:bg-[#0D1424] hover:border-[rgba(212,175,55,0.18)] transition-all duration-500 overflow-hidden"
                >
                  {/* Color left accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(to bottom, transparent, ${meta.accent}, transparent)` }}
                  />
                  {/* Top line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `linear-gradient(90deg, transparent, ${meta.accent}80, transparent)` }}
                  />
                  {/* Ghost number watermark */}
                  <div
                    className="absolute -bottom-2 -right-2 font-cinzel font-bold text-[80px] leading-none select-none pointer-events-none"
                    style={{ color: meta.accent + "08" }}
                  >
                    {meta.number}
                  </div>

                  <div className="p-8 sm:p-10 relative">
                    <div className="flex items-center gap-4 mb-7">
                      <div
                        className="w-10 h-10 flex-shrink-0 flex items-center justify-center border bg-white/[0.05] border-white/10 group-hover:border-opacity-40 transition-all duration-400"
                        style={{ color: meta.accent }}
                      >
                        {meta.icon}
                      </div>
                      <div>
                        <div className="font-montserrat text-[8px] font-bold tracking-[0.35em] uppercase mb-1" style={{ color: meta.accent + "90" }}>
                          Section {meta.number}
                        </div>
                        <h3 className="font-cinzel text-white text-lg tracking-wider group-hover:text-[#F0D060] transition-colors duration-300">{section.section}</h3>
                      </div>
                    </div>

                    <div className="mb-6 h-px w-full" style={{ background: `linear-gradient(90deg, ${meta.accent}35, transparent)` }} />

                    <ul className="space-y-3.5">
                      {section.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3.5">
                          <div
                            className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px] font-bold font-montserrat border border-white/10 text-white/60"
                          >
                            {i + 1}
                          </div>
                          <span className="font-montserrat text-white/55 text-[11px] leading-[1.85] tracking-wide">{rule}</span>
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
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0B132B] border-t border-white/5 sr">
        <div className="max-w-4xl mx-auto">
          <div className="section-label mx-auto mb-10">Common Questions</div>
          <h2 className="font-cinzel font-bold text-white text-center mb-12" style={{ fontSize: "clamp(24px, 4vw, 48px)" }}>
            Frequently Asked <span className="text-[#D4AF37]">Questions</span>
          </h2>

          <div className="space-y-2.5 sr-stagger">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-white/6 bg-[#0D1424] hover:border-[rgba(212,175,55,0.18)] overflow-hidden transition-all duration-300"
              >
                <summary className="flex items-center justify-between gap-6 p-6 cursor-pointer list-none">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]/60 group-open:rotate-90 transition-transform duration-300" />
                    </div>
                    <span className="font-cinzel tracking-wider text-white text-sm leading-relaxed group-open:text-[#D4AF37] transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <div className="w-7 h-7 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:border-[#D4AF37]/35 transition-colors">
                    <span className="text-[#D4AF37]/70 font-light text-lg leading-none group-open:hidden">+</span>
                    <span className="text-[#D4AF37]/70 font-light text-lg leading-none hidden group-open:block">−</span>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <div className="ml-10 font-montserrat text-white/70 text-[11px] leading-[1.9] border-t border-white/5 pt-5 tracking-wide">
                    {faq.a}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-24 px-6 sm:px-10 lg:px-16 overflow-hidden bg-[#0D1424] border-t border-white/5 sr">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />

        <div className="relative max-w-2xl mx-auto text-center border border-[rgba(212,175,55,0.2)] bg-[#111827] p-12 lg:p-16 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />
          <div className="w-14 h-14 border border-[#D4AF37]/25 bg-[#D4AF37]/14 flex items-center justify-center mx-auto mb-8">
            <Scale className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel font-bold text-white mb-5 leading-tight" style={{ fontSize: "clamp(24px, 4vw, 48px)" }}>
            PLAY FAIR. <span className="text-[#D4AF37]">WIN HARD.</span>
          </h2>
          <div className="gold-divider max-w-xs mx-auto mb-6" />
          <p className="font-montserrat text-white/60 text-xs leading-[2] mb-10 tracking-wide">
            The arena rewards discipline, strategy, and relentless execution. Still have questions? Our team is here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Contact Us <ArrowRight className="w-4 h-4" />
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
