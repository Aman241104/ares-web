"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { weeklyEvents, scheduleEvents, teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const statusColors: Record<string, string> = {
  completed: "bg-white/5 text-white/50 border-white/10",
  "in-progress": "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30",
  upcoming: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

const statusDot: Record<string, string> = {
  completed: "bg-white/50",
  "in-progress": "bg-[#D4AF37]",
  upcoming: "bg-blue-400",
};

const galleryPreviewImages = [
  { src: "/images/hero_arena.png",       alt: "Arena",      label: "The Arena" },
  { src: "/images/luxury_boardroom.png", alt: "Boardroom",  label: "Opening Night" },
  { src: "/images/blog_strategy.png",    alt: "Strategy",   label: "Strategy Session" },
  { src: "/images/blog_leadership.png",  alt: "Leadership", label: "Leadership Summit" },
  { src: "/images/blog-networking.png",  alt: "Networking", label: "Networking Gala" },
  { src: "/images/blog-growth.png",      alt: "Growth",     label: "Growth Showcase" },
];

export default function SchedulePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWeek, setActiveWeek] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-title", { opacity: 0, y: 30, duration: 1 })
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-img", { opacity: 0, scale: 0.9, duration: 1 }, "-=0.8");

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
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">
      {/* ── HERO ── */}
      <PageHero layout="left" className="py-14 sm:py-24 px-6 sm:px-10 lg:px-16 min-h-[55vh]" objectPosition="object-[78%_center] md:object-center">
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="h-title">
              <div className="section-label mb-6">42 Challenges · 4 Weeks · 1 Champion</div>
              <h1 className="font-cinzel font-bold text-white mb-6 leading-none">
                <span style={{ fontSize: "clamp(40px,8vw,96px)", display: "block" }}>SCHEDULE</span>
                <span style={{
                  fontSize: "clamp(40px,8vw,96px)",
                  display: "block",
                  background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.06em",
                  lineHeight: 1,
                }}>EVENTS</span>
              </h1>
            </div>
            <div className="h-sub">
              <p className="font-montserrat text-white/50 text-sm leading-[2] mb-10 max-w-md tracking-wide">
                Dynamic schedule. Real-time updates. Maximum Impact. Keep track of all upcoming events, challenges and milestones.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/leaderboard" className="btn-primary">
                  <Calendar className="w-4 h-4" /> Live Standings
                </Link>
                <Link href="/rules" className="btn-secondary">
                  <Clock className="w-4 h-4" /> Scoring Rules
                </Link>
              </div>
            </div>
          </div>

          {/* Right: team pills — dark panel so they stay readable over the trophy bg */}
          <div className="hidden lg:flex justify-end items-center h-img">
            <div className="flex flex-col gap-2 p-4 backdrop-blur-xl rounded-sm" style={{ background: "rgba(5,9,22,0.75)", border: "1px solid rgba(255,194,0,0.12)" }}>
              {teams.map((t) => {
                const teamImgs: Record<string,string> = {
                  modi:"/images/team_modi.png", doval:"/images/team_doval.png",
                  "amit-shah":"/images/team_shah.png", jaishankar:"/images/team_jaishankar.png",
                };
                return (
                  <Link
                    key={t.id}
                    href={`/teams/${t.id}`}
                    className="flex items-center gap-3.5 px-4 py-3 border border-white/8 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[rgba(255,194,0,0.25)] transition-all duration-300 group rounded-sm"
                    style={{ minWidth: "220px" }}
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-white/10 relative">
                      <Image fill src={teamImgs[t.id]} alt={t.name} className="object-cover" sizes="36px" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-cinzel tracking-wider text-xs leading-tight text-white group-hover:text-[#D4AF37] transition-colors">
                        {t.name.toUpperCase()}
                      </div>
                      <div className="font-montserrat text-white/55 text-[7px] uppercase tracking-widest truncate mt-0.5">
                        {t.fullName.split(" ").slice(-1)[0]}
                      </div>
                    </div>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </PageHero>

      {/* ── THIS WEEK'S EVENT UPDATE ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#030712] border-y border-white/5 relative">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto mb-12 sr relative">
          <div className="section-label mb-4">Live Updates</div>
          <h2 className="font-cinzel font-bold text-white text-3xl sm:text-4xl">
            THIS WEEK&rsquo;S <span className="text-[#D4AF37]">SCHEDULE</span>
          </h2>
        </div>

        {/* 3-column layout */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 overflow-hidden border border-[rgba(212,175,55,0.12)] relative sr">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,194,0,0.60), transparent)" }} />

          {/* ── Left: Week Selector ── */}
          <div className="flex-shrink-0 lg:w-72 bg-[#030712] border-r border-white/6 p-7" style={{ minWidth: 250 }}>
            {/* Week buttons */}
            <div className="space-y-2 mb-8">
              {weeklyEvents.map((week, i) => (
                <button
                  key={week.week}
                  onClick={() => setActiveWeek(i)}
                  className={`w-full text-left px-5 py-4 transition-all duration-300 border relative overflow-hidden ${
                    i === activeWeek
                      ? "border-[rgba(212,175,55,0.3)] bg-[#D4AF37]/6 text-white"
                      : "border-white/5 hover:border-white/10 text-white/60 hover:text-white/70 hover:bg-white/[0.05]"
                  }`}
                >
                  {i === activeWeek && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#D4AF37]" />}
                  <div className={`font-cinzel tracking-widest text-sm ${i === activeWeek ? "text-[#D4AF37]" : ""}`}>
                    WEEK {week.week}
                  </div>
                  <div className={`font-montserrat text-[8px] uppercase tracking-[0.2em] mt-0.5 ${i === activeWeek ? "text-white/50" : "text-white/20"}`}>
                    {week.dates}
                  </div>
                </button>
              ))}
            </div>

            {/* Week details */}
            <div className="pt-6 border-t border-white/8">
              <div className="font-montserrat text-white/55 text-[8px] uppercase tracking-[0.3em] mb-2">
                Week {weeklyEvents[activeWeek].week} Theme
              </div>
              <h3 className="font-cinzel text-white text-sm leading-tight mb-3 tracking-wider">
                {weeklyEvents[activeWeek].theme}
              </h3>
              <p className="font-montserrat text-white/60 text-[10px] leading-relaxed tracking-wide">
                {weeklyEvents[activeWeek].description}
              </p>
            </div>
          </div>

          {/* ── Center: Events Table ── */}
          <div className="flex-1 p-8 min-w-0">
            {/* Table header — lg+ only, mobile rows are self-labeled cards */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 mb-4 border-b border-white/5">
              <div className="col-span-5 font-montserrat text-[9px] text-white/55 uppercase tracking-[0.2em]">EVENT NAME</div>
              <div className="col-span-3 font-montserrat text-[9px] text-white/55 uppercase tracking-[0.2em]">CATEGORY</div>
              <div className="col-span-2 text-right font-montserrat text-[9px] text-white/55 uppercase tracking-[0.2em]">PTS</div>
              <div className="col-span-2 text-right font-montserrat text-[9px] text-white/55 uppercase tracking-[0.2em]">STATUS</div>
            </div>

            {/* Event rows */}
            <div className="space-y-3">
              {weeklyEvents[activeWeek].events.map((event) => (
                <div
                  key={event.name}
                  className="grid grid-cols-12 gap-x-4 gap-y-2 px-4 py-4 lg:py-5 rounded-xl transition-all hover:bg-white/[0.05] items-center border border-white/5"
                >
                  <div className="col-span-8 lg:col-span-5 lg:col-start-1">
                    <div className="font-cinzel text-white text-sm tracking-wide">{event.name}</div>
                    {(event.date || event.time || event.organizer) && (
                      <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mt-1">
                        {[event.date, event.time, event.organizer && `by ${event.organizer}`].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 lg:col-span-2 lg:col-start-11 text-right">
                    <span
                      className={`inline-flex items-center gap-2 font-montserrat text-[9px] px-3 py-1 rounded-full border uppercase tracking-widest ${
                        statusColors[event.status]
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[event.status]}`} />
                      <span className="hidden sm:inline">
                        {event.status.replace("-", " ")}
                      </span>
                    </span>
                  </div>
                  <div className="col-span-8 lg:col-span-3 lg:col-start-6 font-montserrat text-white/60 text-[10px] uppercase tracking-widest">
                    {event.category}
                  </div>
                  <div className="col-span-4 lg:col-span-2 lg:col-start-9 text-right font-cinzel text-[#D4AF37] text-base">
                    {event.points}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Bonus Points Sidebar ── */}
          <div className="flex-shrink-0 lg:w-72 bg-white/[0.05] border-l border-white/10 p-8" style={{ minWidth: 260 }}>
            <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm mb-6 uppercase">
              Bonus Points — Week {weeklyEvents[activeWeek].week}
            </h3>

            <div className="space-y-4 mb-8">
              {[
                { name: "Early Bird Bonus", pts: "+25", desc: "Complete before the deadline" },
                { name: "Perfect Week Bonus", pts: "+100", desc: "Complete all weekly events" },
                { name: "Consistency Bonus", pts: "+75", desc: "Attend 3 consecutive weeks" },
                { name: "Mega Impact Bonus", pts: "+150", desc: "Achieve high business impact" },
                { name: "Full Team Bonus", pts: "+750", desc: "Whole team present at the offline team meeting" },
              ].map((b) => (
                <div key={b.name} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-montserrat text-white text-[10px] uppercase tracking-widest mb-1.5">
                        {b.name}
                      </div>
                      <div className="font-montserrat text-white/60 text-[9px] leading-snug">
                        {b.desc}
                      </div>
                    </div>
                    <span className="font-cinzel text-green-400 text-sm flex-shrink-0">
                      {b.pts}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Max bonus highlight */}
            <div className="p-6 bg-white/[0.05] border border-white/5 rounded-xl text-center mb-8">
              <div className="font-montserrat text-white/60 text-[9px] uppercase tracking-widest mb-2">
                MAX BONUS POINTS<br />PER WEEK
              </div>
              <div className="font-cinzel font-bold text-4xl text-[#D4AF37] mb-1">
                1,100
              </div>
              <div className="font-montserrat text-white/55 text-[9px] tracking-widest uppercase">
                PTS
              </div>
            </div>

            {/* Schedule at a Glance */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-cinzel tracking-widest text-white/60 text-xs mb-4 uppercase">At a Glance</h3>
              <div className="space-y-3">
                {[
                  { l: "Total Events", v: String(scheduleEvents.length) },
                  { l: "Completed", v: String(scheduleEvents.filter(e => e.status === "completed").length) },
                  { l: "In-Progress", v: String(scheduleEvents.filter(e => e.status === "in-progress").length) },
                  { l: "Upcoming", v: String(scheduleEvents.filter(e => e.status === "upcoming").length) },
                ].map((s) => (
                  <div key={s.l} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="font-montserrat text-white/60 text-[10px] uppercase tracking-widest">{s.l}</span>
                    <span className="font-cinzel text-white text-sm">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
                Behind The Scenes
              </div>
              <h2 className="font-cinzel font-bold text-white text-3xl sm:text-4xl">
                GALLERY
              </h2>
            </div>
            <Link
              href="/gallery"
              className="hidden sm:inline-flex items-center gap-2 font-montserrat text-[10px] font-bold text-white uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sr-stagger">
            {galleryPreviewImages.map((img) => (
              <div
                key={img.src}
                className="group relative overflow-hidden border border-white/5 hover:border-[rgba(212,175,55,0.25)] transition-all duration-500 aspect-square lg:aspect-[4/3]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: "brightness(0.9) saturate(1.0)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <div className="font-cinzel text-white text-xs tracking-wider">{img.label}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 sm:hidden">
            <Link href="/gallery" className="btn-secondary text-[10px]">VIEW FULL GALLERY</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
