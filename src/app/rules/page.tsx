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
  "Scoring System":   { icon: <Star className="w-5 h-5" />,         accent: "#DAA537", number: "01" },
  "Bonus Points":     { icon: <TrendingDown className="w-5 h-5" />, accent: "#27AE60", number: "02" },
  "Deductions":       { icon: <Scale className="w-5 h-5" />,        accent: "#C0392B", number: "03" },
  "Eligibility":      { icon: <CheckCircle className="w-5 h-5" />,  accent: "#1E3A8A", number: "04" },
  "Tournament Format": { icon: <Calendar className="w-5 h-5" />,   accent: "#E67E22", number: "05" },
  "Prize & Recognition": { icon: <Trophy className="w-5 h-5" />,   accent: "#F5D078", number: "06" },
};

export default function RulesPage() {
  return (
    <div className="pt-16 bg-[#060d14]">

      {/* ── HERO ── */}
      <section className="relative py-32 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#060d14]">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(218,165,55,0.09) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 40%, #060d14 100%)" }} />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-[#DAA537]/60" />
            <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
              Know the Game
            </span>
            <div className="h-px w-8 bg-[#DAA537]/60" />
          </div>

          <h1 className="font-cinzel font-black leading-none mb-4" style={{ fontSize: "clamp(44px,7vw,88px)" }}>
            <span className="text-white">RULES &amp;</span>
            <br />
            <span className="text-gold-gradient text-shadow-gold">REGULATIONS</span>
          </h1>

          <div className="w-32 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #DAA537, transparent)" }} />

          <p className="font-montserrat text-white/55 text-lg leading-relaxed max-w-xl mx-auto">
            Everything you need to know to compete, score, and win in the ARES Business League 2026 arena.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Scoring", "Bonuses", "Deductions", "Eligibility", "Format", "Prizes"].map((label) => (
              <span
                key={label}
                className="font-montserrat text-[11px] font-semibold px-4 py-1.5 rounded-full border border-[#DAA537]/25 text-white/50 hover:border-[#DAA537]/60 hover:text-[#DAA537] cursor-pointer transition-all duration-200 bg-[#DAA537]/05"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ── RULES GRID ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1 h-6 rounded-full bg-[#DAA537]" />
            <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.4em] uppercase">
              Tournament Rules
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tournamentRules.map((section, sectionIdx) => {
              const meta = SECTION_META[section.section] || {
                icon: <Award className="w-5 h-5" />,
                accent: "#DAA537",
                number: String(sectionIdx + 1).padStart(2, "0"),
              };

              return (
                <div
                  key={section.section}
                  className="group relative bg-[#060d14] rounded-2xl overflow-hidden border border-[#DAA537]/18 hover:border-[#DAA537]/45 transition-all duration-400 hover:-translate-y-1"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
                >
                  {/* Left accent stripe */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                    style={{ background: `linear-gradient(to bottom, transparent, ${meta.accent}, transparent)` }}
                  />

                  {/* Section number watermark */}
                  <div
                    className="absolute top-4 right-5 font-cinzel font-black text-5xl leading-none select-none pointer-events-none"
                    style={{ color: meta.accent + "0E" }}
                  >
                    {meta.number}
                  </div>

                  <div className="p-6 sm:p-7 relative">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
                        style={{
                          background: meta.accent + "18",
                          borderColor: meta.accent + "40",
                          color: meta.accent,
                        }}
                      >
                        {meta.icon}
                      </div>
                      <div>
                        <div className="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase mb-0.5" style={{ color: meta.accent + "90" }}>
                          Section {meta.number}
                        </div>
                        <h3 className="font-cinzel font-bold text-white text-base tracking-wide">{section.section}</h3>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mb-5 h-px" style={{ background: `linear-gradient(90deg, ${meta.accent}40, transparent)` }} />

                    {/* Rules list */}
                    <ul className="space-y-3">
                      {section.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-black font-cinzel"
                            style={{
                              background: meta.accent + "18",
                              color: meta.accent,
                              border: `1px solid ${meta.accent}35`,
                            }}
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

      <div className="section-sep" />

      {/* ── FAQ ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#DAA537]/60" />
              <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                Common Questions
              </span>
              <div className="h-px w-8 bg-[#DAA537]/60" />
            </div>
            <h2 className="font-cinzel font-black text-white text-3xl sm:text-4xl leading-tight">
              FREQUENTLY ASKED <span className="text-gold-gradient">QUESTIONS</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-[#0D1B2A] border border-[#DAA537]/18 rounded-xl overflow-hidden hover:border-[#DAA537]/45 transition-all duration-300"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-[#DAA537]/12 border border-[#DAA537]/25 flex items-center justify-center flex-shrink-0">
                      <ChevronRight className="w-3 h-3 text-[#DAA537] group-open:rotate-90 transition-transform duration-200" />
                    </div>
                    <span className="font-cinzel font-bold text-white text-sm leading-snug group-open:text-[#F5D078] transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-[#DAA537]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#DAA537] font-bold text-base leading-none group-open:hidden">+</span>
                    <span className="text-[#DAA537] font-bold text-base leading-none hidden group-open:block">-</span>
                  </div>
                </summary>
                <div className="px-5 pb-5 pt-1">
                  <div className="ml-9 font-montserrat text-white/60 text-sm leading-relaxed border-t border-[#DAA537]/10 pt-4">
                    {faq.a}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#0D1B2A]">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(218,165,55,0.07) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#DAA537]/10 border border-[#DAA537]/30 flex items-center justify-center mx-auto mb-6">
            <Scale className="w-7 h-7 text-[#DAA537]" />
          </div>
          <h2 className="font-cinzel font-black text-white text-3xl sm:text-4xl mb-3 leading-tight">
            PLAY FAIR. <span className="text-gold-gradient">WIN HARD.</span>
          </h2>
          <p className="font-montserrat text-white/50 text-base mb-2">
            The arena rewards discipline, strategy, and relentless execution.
          </p>
          <p className="font-montserrat text-white/35 text-sm mb-8">
            Still have questions? Our team is here to help.
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

      <div className="section-sep" />

      <LegacyCTA />
    </div>
  );
}
