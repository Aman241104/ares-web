"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, BarChart2, Trophy, Handshake, Megaphone, Target, Globe, Building2, Star } from "lucide-react";
import { partners } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import LegacyCTA from "@/components/LegacyCTA";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

export default function PartnersPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-split", { types: "chars" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge",  { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 50, stagger: 0.05, duration: 0.7, ease: "back.out(1.4)" }, "-=0.4")
        .from(".h-sub",    { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

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
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">
      
      {/* ─── HERO ─── */}
      <PageHero backgroundImage="/images/blog-networking.png" layout="centered" className="min-h-[65vh] justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-28">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-badge inline-flex items-center gap-3 mb-8 relative px-5 py-2.5">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 backdrop-blur-xl" />
            <Handshake className="w-3.5 h-3.5 text-[#D4AF37] relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Building Together</span>
          </div>

          <h1 className="font-cinzel font-bold text-white mb-8 leading-none">
            <span className="block text-white/55 font-montserrat text-xs sm:text-sm tracking-[0.5em] uppercase mb-2">Our</span>
            <span
              className="h-title-split block"
              style={{
                fontSize: "clamp(56px, 14vw, 140px)",
                background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PARTNERS
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-7 h-sub">
            <div className="h-px w-12 bg-[#D4AF37]/30" />
            <p className="font-montserrat text-white/60 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              ABL 2026 · Official Supporters
            </p>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>

          <p className="font-montserrat text-white/60 text-xs sm:text-sm leading-[2] max-w-xl mx-auto tracking-wide">
            Proud partners who believe in our mission and power the ARES Business League 2026 — building businesses, building the nation.
          </p>
        </div>
      </PageHero>

      {/* ─── STATS ─── */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5 sr">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 sr-stagger">
          {[
            { icon: <Users className="w-5 h-5" />,    num: "18+", label: "Trusted Partners" },
            { icon: <Trophy className="w-5 h-5" />,   num: "4",   label: "Team Owners" },
            { icon: <BarChart2 className="w-5 h-5" />, num: "6",  label: "Commissioners" },
            { icon: <Globe className="w-5 h-5" />,    num: "∞",   label: "Endless Impact" },
          ].map((s) => (
            <div key={s.label} className="text-center p-8 bg-[#0D1424] hover:bg-[#111827] transition-colors duration-300 group">
              <div className="w-10 h-10 border border-[#D4AF37]/18 bg-[#D4AF37]/14 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
                {s.icon}
              </div>
              <div className="font-cinzel font-bold text-3xl text-[#D4AF37] mb-1.5 number-glow">{s.num}</div>
              <div className="font-montserrat text-white/60 text-[8px] uppercase tracking-[0.25em]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED WEB PARTNER ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0B132B] border-t border-white/5 sr">
        <div className="max-w-7xl mx-auto">
          <div className="section-label mx-auto mb-3">Featured Partner</div>
          <h2 className="font-cinzel font-bold text-white text-center mb-12" style={{ fontSize: "clamp(24px, 3.5vw, 44px)" }}>
            Official <span className="text-[#D4AF37]">Web Partner</span>
          </h2>

          <div className="max-w-3xl mx-auto relative border border-[rgba(212,175,55,0.25)] bg-[#111827] p-10 lg:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)" }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 80%)" }} />

            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#FFC200]/65" />
                <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.45em] uppercase">Official Web Partner</span>
                <Star className="w-3.5 h-3.5 text-[#D4AF37]" />
                <div className="h-px w-8 bg-[#FFC200]/65" />
              </div>
              <h3
                className="font-cinzel font-bold mb-4 tracking-widest"
                style={{
                  fontSize: "clamp(32px, 6vw, 64px)",
                  background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #F0D060 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                WebHance
              </h3>
              <div className="gold-divider max-w-xs mx-auto mb-7" />
              <p className="font-montserrat text-white/60 text-[11px] leading-[2] max-w-lg mx-auto mb-9 tracking-wide">
                Building digital legacies for India's top business owners. WebHance is the exclusive Web Partner of ABL 2026 — crafting premium, high-performance websites that drive real growth.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/web-partner" className="btn-primary">
                  Build Your Website <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARTNERS GRID ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-5">
            <div>
              <div className="section-label mb-2 text-left" style={{ textAlign: "left" }}>
                <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.4em] uppercase">Network</span>
              </div>
              <h2 className="font-cinzel font-bold text-white" style={{ fontSize: "clamp(22px, 3vw, 40px)" }}>
                Our <span className="text-[#D4AF37]">Partners</span>
              </h2>
            </div>
            <Link href="/contact" className="hidden sm:inline-flex items-center gap-2 font-montserrat text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">
              Become a Partner <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10 sr-stagger">
            {partners.map((p) => {
              const isPremium = p.tier.toLowerCase().includes("platinum") || p.tier.toLowerCase().includes("strategic");
              const isGold = p.tier.toLowerCase().includes("gold");

              let tierColor = "rgba(255,255,255,0.5)";
              let tierBg = "rgba(255,255,255,0.04)";
              let tierBorder = "rgba(255,255,255,0.08)";

              if (isPremium) {
                tierColor = "#D4AF37";
                tierBg = "rgba(212,175,55,0.1)";
                tierBorder = "rgba(212,175,55,0.28)";
              } else if (isGold) {
                tierColor = "#C49428";
                tierBg = "rgba(196,148,40,0.08)";
                tierBorder = "rgba(196,148,40,0.2)";
              }

              return (
                <div
                  key={p.name}
                  className="group relative border bg-[#0D1424] hover:bg-[#111827] transition-all duration-400 p-7 flex flex-col items-center justify-center text-center min-h-[140px] overflow-hidden"
                  style={{ borderColor: isPremium ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.06)" }}
                >
                  {isPremium && (
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)" }} />
                  )}
                  {/* Hover top line */}
                  {!isPremium && (
                    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                  )}

                  <div
                    className="w-9 h-9 flex items-center justify-center mb-4 border transition-all duration-300"
                    style={{
                      background: isPremium ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.02)",
                      borderColor: isPremium ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.08)",
                      color: isPremium ? "#D4AF37" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>

                  <div className="font-cinzel text-white text-[11px] tracking-wider leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors">{p.name}</div>

                  <div
                    className="font-montserrat text-[7px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 border"
                    style={{ color: tierColor, background: tierBg, borderColor: tierBorder }}
                  >
                    {p.tier}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center sm:hidden">
            <Link href="/contact" className="btn-secondary text-[9px]">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BECOME A PARTNER CTA ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5 sr">
        <div className="max-w-5xl mx-auto">
          <div className="relative border border-[rgba(212,175,55,0.2)] bg-[#111827] p-10 lg:p-14 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 80%)" }} />

            <div className="relative">
              <div className="w-14 h-14 border border-[#D4AF37]/25 bg-[#D4AF37]/14 flex items-center justify-center mx-auto mb-8">
                <Handshake className="w-6 h-6 text-[#D4AF37]" />
              </div>

              <h2 className="font-cinzel font-bold text-white mb-5 leading-tight" style={{ fontSize: "clamp(24px, 4vw, 48px)" }}>
                PROUD PARTNERS IN<br className="hidden sm:block" />
                <span className="text-[#D4AF37]"> BUILDING THE NATION</span>
              </h2>

              <div className="gold-divider max-w-xs mx-auto mb-7" />

              <p className="font-montserrat text-white/60 text-[11px] mb-11 max-w-xl mx-auto leading-[2] tracking-wide">
                Join us as a partner and get exclusive visibility, networking opportunities, and brand association with India's elite business owners and their networks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
                {[
                  { icon: <Megaphone className="w-5 h-5" />, title: "Strategic Partnership", desc: "Brand visibility throughout the tournament", num: "01" },
                  { icon: <Target className="w-5 h-5" />,    title: "Leadership Access",      desc: "Associate with top business leaders", num: "02" },
                  { icon: <Globe className="w-5 h-5" />,     title: "Nation Building",        desc: "Be part of something truly impactful", num: "03" },
                ].map((b) => (
                  <div key={b.title} className="relative p-6 border border-white/6 bg-[#0D1424] hover:border-[rgba(212,175,55,0.15)] transition-colors group overflow-hidden">
                    <div className="absolute top-2 right-3 font-cinzel text-white/4 text-3xl font-light leading-none select-none">{b.num}</div>
                    <div className="w-9 h-9 border border-[#D4AF37]/18 bg-[#D4AF37]/14 text-[#D4AF37]/60 group-hover:text-[#D4AF37] flex items-center justify-center mb-4 transition-colors">
                      {b.icon}
                    </div>
                    <div className="font-cinzel text-white text-xs tracking-wider mb-2 group-hover:text-[#D4AF37] transition-colors">{b.title}</div>
                    <div className="font-montserrat text-white/55 text-[8px] uppercase tracking-[0.2em] leading-relaxed">{b.desc}</div>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="btn-primary inline-flex">
                Contact Us to Partner <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
