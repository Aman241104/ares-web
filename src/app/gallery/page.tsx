"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const PREVIEW_IMAGES = [
  { src: "/images/hero_arena.png",        alt: "Arena",          label: "The Arena" },
  { src: "/images/luxury_boardroom.png",  alt: "Boardroom",      label: "Opening Night" },
  { src: "/images/blog_strategy.png",     alt: "Strategy",       label: "Strategy Session" },
  { src: "/images/blog_leadership.png",   alt: "Leadership",     label: "Leadership Summit" },
  { src: "/images/blog-networking.png",   alt: "Networking",     label: "Networking Gala" },
  { src: "/images/blog-growth.png",       alt: "Growth",         label: "Growth Showcase" },
  { src: "/images/mascot_lion.png",       alt: "Lions",          label: "Team Modi Lions" },
  { src: "/images/mascot_eagle.png",      alt: "Eagles",         label: "Team Doval Eagles" },
  { src: "/images/mascot_tiger.png",      alt: "Tigers",         label: "Team Shah Tigers" },
  { src: "/images/mascot_lotus.png",      alt: "Lotus",          label: "Team Jaishankar" },
  { src: "/images/owner_modi.png",        alt: "Owner Modi",     label: "Narendra Modi" },
  { src: "/images/owner_doval.png",       alt: "Owner Doval",    label: "Ajit Doval" },
];

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-split", { types: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 40, stagger: 0.04, duration: 0.8, ease: "back.out(1.4)" }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: parent, start: "top 88%", once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#080600] min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative py-28 px-6 sm:px-10 lg:px-16 overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Mosaic BG */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-6 gap-0 opacity-10">
            {PREVIEW_IMAGES.slice(0,12).map((img, i) => (
              <div key={i} className="relative overflow-hidden">
                <Image src={img.src} alt="" fill sizes="200px" className="object-cover object-center scale-110" style={{ filter: "blur(1px) saturate(0.5)" }} />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#080600]/60 via-[#080600]/70 to-[#080600]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080600]/40 via-transparent to-[#080600]/40" />
        </div>
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-badge inline-flex items-center gap-3 mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/6 backdrop-blur-xl" />
            <Camera className="w-3.5 h-3.5 text-[#D4AF37] relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Relive the Moments</span>
          </div>

          <h1 className="font-cinzel font-light text-white mb-8 leading-none">
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
              GALLERY
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-7 h-sub">
            <div className="h-px w-12 bg-[#D4AF37]/30" />
            <p className="font-montserrat text-white/45 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              June 24 – July 22, 2026
            </p>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>

          <p className="font-montserrat text-white/40 text-xs sm:text-sm leading-[2] max-w-xl mx-auto tracking-wide">
            Every milestone, every victory, every connection from ARES Business League 2026 — captured and preserved forever.
          </p>
        </div>
      </section>

      {/* ─── COMING SOON ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-t border-white/5">
        <div className="max-w-5xl mx-auto sr">
          {/* Coming soon card */}
          <div className="relative overflow-hidden border border-[rgba(212,175,55,0.2)] bg-[#100D04]">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />

            <div className="p-12 lg:p-20 text-center relative z-10">
              <div className="w-20 h-20 rounded-sm bg-[#D4AF37]/8 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-8">
                <Clock className="w-9 h-9 text-[#D4AF37]/70" />
              </div>

              <div className="section-label mx-auto mb-5">Tournament in Progress</div>

              <h2 className="font-cinzel font-light text-white mb-5" style={{ fontSize: "clamp(28px,5vw,56px)" }}>
                PHOTOS ARRIVING <span className="text-[#D4AF37]">SOON</span>
              </h2>

              <div className="gold-divider max-w-xs mx-auto mb-7" />

              <p className="font-montserrat text-white/40 text-xs sm:text-sm max-w-xl mx-auto leading-[2] tracking-wide mb-10">
                Official photos, highlights and videos from every event will be published here throughout the tournament. Check back after each weekly event.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-12">
                {[
                  { n: "12+", l: "Events" },
                  { n: "30",  l: "Warriors" },
                  { n: "4W",  l: "Coverage" },
                ].map((s) => (
                  <div key={s.l} className="text-center border border-white/5 py-4 bg-white/[0.02]">
                    <div className="font-cinzel text-[#D4AF37] text-2xl mb-1 number-glow">{s.n}</div>
                    <div className="font-montserrat text-white/30 text-[8px] uppercase tracking-[0.2em]">{s.l}</div>
                  </div>
                ))}
              </div>

              <Link href="/schedule" className="btn-primary">
                View Upcoming Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREVIEW GRID ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#080600] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr mb-10 flex items-center justify-between">
            <div>
              <div className="section-label mb-2">Sneak Peek</div>
              <h2 className="font-cinzel text-white text-xl sm:text-2xl tracking-widest">Preview Gallery</h2>
            </div>
            <div className="font-montserrat text-white/25 text-[8px] uppercase tracking-[0.3em]">More coming soon</div>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sr-stagger">
            {PREVIEW_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden border border-white/5 hover:border-[rgba(212,175,55,0.25)] transition-all duration-500 cursor-pointer ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto sm:h-[360px]" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i === 0 ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "brightness(0.75) saturate(0.85)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="font-cinzel text-white text-xs tracking-wider">{img.label}</div>
                </div>
                {/* Placeholder overlay */}
                <div className="absolute top-3 right-3 font-montserrat text-[7px] uppercase tracking-[0.2em] text-white/40 bg-black/60 border border-white/10 px-2 py-1">
                  Preview
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM COVERAGE ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr text-center mb-10">
            <div className="section-label mx-auto mb-3">Photo Schedule</div>
            <h2 className="font-cinzel text-white text-xl tracking-widest">Event Coverage</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sr-stagger">
            {[
              { week: "Week 1", dates: "Jun 24–30", status: "completed", events: "Opening Ceremony, Team Reveal" },
              { week: "Week 2", dates: "Jul 1–7",   status: "in-progress", events: "Mid-Week Challenge, Leaderboard Update" },
              { week: "Week 3", dates: "Jul 8–14",  status: "upcoming", events: "Power Hours, Special Showcases" },
              { week: "Week 4", dates: "Jul 15–22", status: "upcoming", events: "Finals, Grand Ceremony" },
            ].map((w) => (
              <div key={w.week} className={`relative p-6 border transition-all duration-300 ${w.status === "in-progress" ? "border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5" : w.status === "completed" ? "border-green-500/20 bg-green-500/4" : "border-white/6 bg-[#100D04]"}`}>
                {w.status === "in-progress" && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />}
                <div className={`font-montserrat text-[7px] uppercase tracking-[0.3em] mb-2 font-semibold ${w.status === "in-progress" ? "text-[#D4AF37]" : w.status === "completed" ? "text-green-400/70" : "text-white/25"}`}>
                  {w.status === "in-progress" ? "● Live" : w.status === "completed" ? "✓ Captured" : "○ Upcoming"}
                </div>
                <div className="font-cinzel text-white text-base tracking-widest mb-1">{w.week}</div>
                <div className="font-montserrat text-white/30 text-[8px] uppercase tracking-[0.2em] mb-3">{w.dates}</div>
                <div className="font-montserrat text-white/40 text-[9px] leading-relaxed">{w.events}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
