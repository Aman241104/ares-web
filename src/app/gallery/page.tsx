"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHT_VIDEOS = [
  { src: "/videos/gallery/gallery-01.mp4", label: "Box Cricket – Bonding League" },
  { src: "/videos/gallery/gallery-02.mp4", label: "Box Cricket – Bonding League" },
  { src: "/videos/gallery/gallery-03.mp4", label: "BNI Conference" },
  { src: "/videos/gallery/gallery-04.mp4", label: "Conference Moments" },
  { src: "/videos/gallery/gallery-05.mp4", label: "Conference Moments" },
  { src: "/videos/gallery/gallery-06.mp4", label: "Conference Moments" },
  { src: "/videos/gallery/gallery-07.mp4", label: "Conference Moments" },
  { src: "/videos/gallery/gallery-08.mp4", label: "Coffee With Business" },
  { src: "/videos/gallery/gallery-09.mp4", label: "Coffee With Business" },
  { src: "/videos/gallery/gallery-10.mp4", label: "KYM – Advocate Jay Patel" },
  { src: "/videos/gallery/gallery-11.mp4", label: "KYM – Advocate Jay Patel" },
  { src: "/videos/gallery/gallery-12.mp4", label: "Cross Chapter Session" },
  { src: "/videos/gallery/gallery-13.mp4", label: "Cross Chapter Session" },
  { src: "/videos/gallery/gallery-14.mp4", label: "Cross Chapter Session" },
  { src: "/videos/gallery/gallery-15.mp4", label: "Auction Night" },
  { src: "/videos/gallery/gallery-16.mp4", label: "Auction Night" },
];

const PREVIEW_IMAGES = [
  { src: "/images/gallery/gallery-19.jpg", alt: "Box Cricket",      label: "Box Cricket – Bonding League" },
  { src: "/images/gallery/gallery-03.jpg", alt: "KYM",              label: "KYM – Advocate Jay Patel" },
  { src: "/images/gallery/gallery-02.jpg", alt: "KYM",              label: "KYM – Nisha Kumbhani" },
  { src: "/images/gallery/gallery-04.jpg", alt: "Session",          label: "Cross Chapter Session" },
  { src: "/images/gallery/gallery-05.jpg", alt: "Team Portrait",    label: "Team Portrait" },
  { src: "/images/gallery/gallery-06.jpg", alt: "Dinner Meet",      label: "Dinner Meet" },
  { src: "/images/gallery/gallery-07.jpg", alt: "Dinner Meet",      label: "Dinner Meet" },
  { src: "/images/gallery/gallery-08.jpg", alt: "Lounge Meet",      label: "Lounge Meet" },
  { src: "/images/gallery/gallery-09.jpg", alt: "Coffee",           label: "Coffee With Business" },
  { src: "/images/gallery/gallery-10.jpg", alt: "121 Conclave",     label: "121 Conclave" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Conference",       label: "Conference Selfie" },
  { src: "/images/gallery/gallery-12.jpg", alt: "Night Meet",       label: "Night Meet" },
  { src: "/images/gallery/gallery-13.jpg", alt: "Terrace Meet",     label: "Terrace Get-Together" },
  { src: "/images/gallery/gallery-14.jpg", alt: "Birthday",         label: "Birthday Celebration" },
  { src: "/images/gallery/gallery-15.jpg", alt: "Birthday",         label: "Birthday Celebration" },
  { src: "/images/gallery/gallery-16.jpg", alt: "Birthday",         label: "Birthday Celebration" },
  { src: "/images/gallery/gallery-17.jpg", alt: "Birthday",         label: "Birthday Celebration" },
  { src: "/images/gallery/gallery-18.jpg", alt: "Birthday",         label: "Birthday Celebration" },
  { src: "/images/gallery/gallery-20.jpg", alt: "Garden Meet",      label: "Garden Cafe Meet" },
  { src: "/images/gallery/gallery-21.jpg", alt: "Cross Chapter",    label: "Cross Chapter Call" },
  { src: "/images/gallery/gallery-22.jpg", alt: "Coffee Meet",      label: "Coffee Meet" },
  { src: "/images/gallery/gallery-23.jpg", alt: "Cross Chapter",    label: "Cross Chapter Meeting" },
  { src: "/images/gallery/gallery-24.jpg", alt: "Team Hangout",     label: "Team Hangout" },
  { src: "/images/gallery/gallery-25.jpg", alt: "Cross Chapter",    label: "Cross Chapter Meeting" },
  { src: "/images/gallery/gallery-01.jpg", alt: "Team Call",        label: "Team Call" },
  { src: "/images/gallery/gallery-26.jpg", alt: "Gift Ceremony",    label: "Gift Ceremony" },
  { src: "/images/gallery/gallery-27.jpg", alt: "Lights Camera Action", label: "Lights, Camera, Action" },
  { src: "/images/gallery/gallery-28.jpg", alt: "KYM",              label: "KYM – Shruti Agrawal" },
  { src: "/images/gallery/gallery-29.jpg", alt: "Conference",       label: "Conference Selfie" },
  { src: "/images/gallery/gallery-30.jpg", alt: "Conference",       label: "Conference Selfie" },
  { src: "/images/gallery/gallery-31.jpg", alt: "Hotel Meet",       label: "Hotel Corridor Meet" },
  { src: "/images/gallery/gallery-32.jpg", alt: "Restaurant Meet",  label: "Restaurant Meet" },
  { src: "/images/gallery/gallery-33.jpg", alt: "Conference",       label: "Conference Selfie" },
  { src: "/images/gallery/gallery-34.jpg", alt: "Lounge Meet",      label: "Lounge Meet" },
  { src: "/images/gallery/gallery-35.jpg", alt: "Event Swag",       label: "Event Swag Bags" },
  { src: "/images/gallery/gallery-36.jpg", alt: "Silver Spoon",     label: "Silver Spoon Gifts" },
  { src: "/images/gallery/gallery-37.jpg", alt: "Coffee With Business", label: "Coffee With Business" },
  { src: "/images/gallery/gallery-38.jpg", alt: "Coffee With Business", label: "Coffee With Business" },
  { src: "/images/gallery/gallery-39.jpg", alt: "BNI Ahmedabad",    label: "BNI Ahmedabad Chapter" },
  { src: "/images/gallery/gallery-40.jpg", alt: "Week 1 Recap",     label: "Week 1 Recap" },
  { src: "/images/gallery/gallery-41.jpg", alt: "MVP of Week 1",    label: "MVP of Week 1 – Ashutosh Mehta" },
  { src: "/images/gallery/gallery-42.jpg", alt: "Session",          label: "Cross Chapter Session" },
  { src: "/images/gallery/gallery-43.jpg", alt: "Session",          label: "Understanding Intelligence" },
  { src: "/images/gallery/gallery-44.jpg", alt: "Auction Complete", label: "Auction Complete" },
];

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge",          { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title-gradient", { opacity: 0, y: 40, duration: 0.9, ease: "back.out(1.4)" }, "-=0.4")
        .from(".h-sub",            { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

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
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <PageHero backgroundImage="/images/hero_arena.png" layout="centered" className="py-16 sm:py-28 px-6 sm:px-10 lg:px-16 min-h-[60vh] justify-center">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-badge inline-flex items-center gap-3 mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/6 backdrop-blur-xl" />
            <Camera className="w-3.5 h-3.5 text-[#D4AF37] relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Relive the Moments</span>
          </div>

          <h1 className="font-cinzel font-bold text-white mb-8 leading-none">
            <span
              className="h-title-gradient block"
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
            <p className="font-montserrat text-white/70 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              July 1st – July 29th, 2026
            </p>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>

          <p className="font-montserrat text-white/60 text-xs sm:text-sm leading-[2] max-w-xl mx-auto tracking-wide">
            Every milestone, every victory, every connection from ARES Business League 2026 — captured and preserved forever.
          </p>
        </div>
      </PageHero>

      {/* ─── PREVIEW GRID ─── */}
      <section className="py-10 sm:py-20 px-6 sm:px-10 lg:px-16 bg-[#000000] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr mb-10 flex items-center justify-between">
            <div>
              <div className="section-label mb-2">Sneak Peek</div>
              <h2 className="font-cinzel text-white text-xl sm:text-2xl tracking-widest">Preview Gallery</h2>
            </div>
            <div className="font-montserrat text-white/65 text-[8px] uppercase tracking-[0.3em]">{PREVIEW_IMAGES.length} Photos</div>
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
                  style={{ filter: "brightness(0.90) saturate(1.0)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="font-cinzel text-white text-xs tracking-wider">{img.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO HIGHLIGHTS ─── */}
      <section className="py-10 sm:py-20 px-6 sm:px-10 lg:px-16 bg-[#030712] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr mb-10 flex items-center justify-between">
            <div>
              <div className="section-label mb-2">In Motion</div>
              <h2 className="font-cinzel text-white text-xl sm:text-2xl tracking-widest">Video Highlights</h2>
            </div>
            <div className="font-montserrat text-white/65 text-[8px] uppercase tracking-[0.3em]">{HIGHLIGHT_VIDEOS.length} Clips</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sr-stagger">
            {HIGHLIGHT_VIDEOS.map((v, i) => (
              <div key={i} className="group relative overflow-hidden border border-white/5 hover:border-[rgba(212,175,55,0.25)] transition-all duration-500 bg-black">
                <video
                  src={v.src}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                  <div className="font-cinzel text-white text-xs tracking-wider">{v.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM COVERAGE ─── */}
      <section className="py-10 sm:py-20 px-6 sm:px-10 lg:px-16 bg-[#030712] border-t border-white/5">
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
              <div key={w.week} className={`relative p-6 border transition-all duration-300 ${w.status === "in-progress" ? "border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5" : w.status === "completed" ? "border-green-500/20 bg-green-500/4" : "border-white/6 bg-[#0B1120]"}`}>
                {w.status === "in-progress" && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />}
                <div className={`font-montserrat text-[7px] uppercase tracking-[0.3em] mb-2 font-semibold ${w.status === "in-progress" ? "text-[#D4AF37]" : w.status === "completed" ? "text-green-400/70" : "text-white/65"}`}>
                  {w.status === "in-progress" ? "● Live" : w.status === "completed" ? "✓ Captured" : "○ Upcoming"}
                </div>
                <div className="font-cinzel text-white text-base tracking-widest mb-1">{w.week}</div>
                <div className="font-montserrat text-white/55 text-[8px] uppercase tracking-[0.2em] mb-3">{w.dates}</div>
                <div className="font-montserrat text-white/60 text-[9px] leading-relaxed">{w.events}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
