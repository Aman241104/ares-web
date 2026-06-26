"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { weeklyEvents, specialEvents, scheduleEvents, teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

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

const specialEventImages = [
  "/images/blog_strategy.png",
  "/images/luxury_boardroom.png",
  "/images/blog_leadership.png",
  "/images/blog-networking.png",
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const targetTime = targetDate.getTime();
  useEffect(() => {
    const tick = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetTime]);
  return timeLeft;
}

export default function SchedulePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWeek, setActiveWeek] = useState(0);

  const weekEndDates = [
    new Date("2026-06-30T23:59:59"),
    new Date("2026-07-07T23:59:59"),
    new Date("2026-07-14T23:59:59"),
    new Date("2026-07-22T23:59:59"),
  ];
  const countdown = useCountdown(weekEndDates[activeWeek]);
  const pad = (n: number) => String(n).padStart(2, "0");

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
    <div ref={containerRef} className="pt-24 bg-[#080600] min-h-screen overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative py-24 px-6 sm:px-10 lg:px-16 overflow-hidden min-h-[55vh] flex items-center bg-[#080600]">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/luxury_boardroom.png" alt="" fill sizes="100vw" className="object-cover object-center" style={{ filter: "brightness(0.12) saturate(0.5)" }} priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080600] via-[#080600]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080600]/60 via-transparent to-[#080600]" />
        </div>
        <div className="absolute inset-0 bg-grid-fine opacity-50 pointer-events-none z-[1]" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="h-title">
              <div className="section-label mb-6">42 Challenges · 4 Weeks · 1 Champion</div>
              <h1 className="font-cinzel font-light text-white mb-6 leading-none">
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

          {/* Right: trophy + team pills */}
          <div className="hidden lg:flex justify-end items-center gap-7 h-img">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 pointer-events-none blur-[60px] opacity-20" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)" }} />
              <Image
                src="/images/hero-trophy.jpg"
                alt="Championship Trophy"
                width={260}
                height={320}
                className="relative z-10 object-contain mix-blend-screen"
                style={{
                  opacity: 0.9,
                  maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
                  filter: "brightness(1.15) contrast(1.1)",
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              {teams.map((t) => {
                const teamImgs: Record<string,string> = {
                  modi:"/images/team_modi.png", doval:"/images/team_doval.png",
                  "amit-shah":"/images/team_shah.png", jaishankar:"/images/team_jaishankar.png",
                };
                return (
                  <Link
                    key={t.id}
                    href={`/teams/${t.id}`}
                    className="flex items-center gap-3.5 px-4 py-3 border border-white/6 bg-white/[0.025] hover:bg-white/[0.05] hover:border-[rgba(212,175,55,0.2)] transition-all duration-300 group"
                    style={{ minWidth: "210px" }}
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-white/10 relative">
                      <Image fill src={teamImgs[t.id]} alt={t.name} className="object-cover" sizes="36px" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-cinzel tracking-wider text-xs leading-tight text-white group-hover:text-[#D4AF37] transition-colors">
                        {t.name.toUpperCase()}
                      </div>
                      <div className="font-montserrat text-white/30 text-[7px] uppercase tracking-widest truncate mt-0.5">
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
      </section>

      {/* ── THIS WEEK'S EVENT UPDATE ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-y border-white/5 relative">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto mb-12 sr relative">
          <div className="section-label mb-4">Live Updates</div>
          <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">
            THIS WEEK&rsquo;S <span className="text-[#D4AF37]">SCHEDULE</span>
          </h2>
        </div>

        {/* 3-column layout */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 overflow-hidden border border-[rgba(212,175,55,0.12)] relative sr">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)" }} />

          {/* ── Left: Week Selector ── */}
          <div className="flex-shrink-0 lg:w-72 bg-[#0C0900] border-r border-white/6 p-7" style={{ minWidth: 250 }}>
            {/* Week buttons */}
            <div className="space-y-2 mb-8">
              {weeklyEvents.map((week, i) => (
                <button
                  key={week.week}
                  onClick={() => setActiveWeek(i)}
                  className={`w-full text-left px-5 py-4 transition-all duration-300 border relative overflow-hidden ${
                    i === activeWeek
                      ? "border-[rgba(212,175,55,0.3)] bg-[#D4AF37]/6 text-white"
                      : "border-white/5 hover:border-white/10 text-white/35 hover:text-white/70 hover:bg-white/[0.02]"
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
              <div className="font-montserrat text-white/30 text-[8px] uppercase tracking-[0.3em] mb-2">
                Week {weeklyEvents[activeWeek].week} Theme
              </div>
              <h3 className="font-cinzel text-white text-sm leading-tight mb-3 tracking-wider">
                {weeklyEvents[activeWeek].theme}
              </h3>
              <p className="font-montserrat text-white/40 text-[10px] leading-relaxed mb-7 tracking-wide">
                {weeklyEvents[activeWeek].description}
              </p>

              {/* Live countdown */}
              <div className="border border-[rgba(212,175,55,0.15)] bg-[#D4AF37]/5 p-5">
                <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/30" />
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-live flex-shrink-0" />
                  <span className="font-montserrat text-green-400/80 text-[8px] font-bold tracking-[0.3em] uppercase">Live · Ends in</span>
                </div>
                <div className="font-cinzel font-light text-white text-2xl tracking-[0.15em]">
                  {countdown.d > 0 ? `${countdown.d}d ` : ""}{pad(countdown.h)}:{pad(countdown.m)}:{pad(countdown.s)}
                </div>
              </div>
            </div>
          </div>

          {/* ── Center: Events Table ── */}
          <div className="flex-1 p-8 min-w-0">
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="min-w-[600px]">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 mb-4 border-b border-white/5">
                  <div className="col-span-5 font-montserrat text-[9px] text-white/30 uppercase tracking-[0.2em]">EVENT NAME</div>
                  <div className="col-span-3 font-montserrat text-[9px] text-white/30 uppercase tracking-[0.2em]">CATEGORY</div>
                  <div className="col-span-2 text-right font-montserrat text-[9px] text-white/30 uppercase tracking-[0.2em]">PTS</div>
                  <div className="col-span-2 text-right font-montserrat text-[9px] text-white/30 uppercase tracking-[0.2em]">STATUS</div>
                </div>

                {/* Event rows */}
                <div className="space-y-3">
                  {scheduleEvents.map((event, i) => (
                    <div
                      key={event.name}
                      className="grid grid-cols-12 gap-4 px-4 py-5 rounded-xl transition-all hover:bg-white/[0.02] items-center border border-white/5"
                    >
                      <div className="col-span-5 font-cinzel text-white text-sm tracking-wide truncate">
                        {event.name}
                      </div>
                      <div className="col-span-3 font-montserrat text-white/40 text-[10px] uppercase tracking-widest">
                        {event.category}
                      </div>
                      <div className="col-span-2 text-right font-cinzel text-[#D4AF37] text-base">
                        {event.points}
                      </div>
                      <div className="col-span-2 text-right">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── Right: Bonus Points Sidebar ── */}
          <div className="flex-shrink-0 lg:w-72 bg-white/[0.02] border-l border-white/10 p-8" style={{ minWidth: 260 }}>
            <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm mb-6 uppercase">
              BONUS POINTS
            </h3>

            <div className="space-y-4 mb-8">
              {[
                { name: "Early Bird Bonus", pts: "+25", desc: "Complete before the deadline" },
                { name: "Perfect Week Bonus", pts: "+100", desc: "Complete all weekly events" },
                { name: "Consistency Bonus", pts: "+75", desc: "Attend 3 consecutive weeks" },
                { name: "Mega Impact Bonus", pts: "+150", desc: "Achieve high business impact" },
              ].map((b) => (
                <div key={b.name} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-montserrat text-white text-[10px] uppercase tracking-widest mb-1.5">
                        {b.name}
                      </div>
                      <div className="font-montserrat text-white/40 text-[9px] leading-snug">
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
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl text-center mb-8">
              <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2">
                MAX BONUS POINTS<br />PER WEEK
              </div>
              <div className="font-cinzel font-light text-4xl text-[#D4AF37] mb-1">
                350
              </div>
              <div className="font-montserrat text-white/30 text-[9px] tracking-widest uppercase">
                PTS
              </div>
            </div>

            {/* Schedule at a Glance */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-cinzel tracking-widest text-white/60 text-xs mb-4 uppercase">At a Glance</h3>
              <div className="space-y-3">
                {[
                  { l: "Total Events", v: "42" },
                  { l: "Completed", v: "6" },
                  { l: "In-Progress", v: "2" },
                  { l: "Upcoming", v: "34" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest">{s.l}</span>
                    <span className="font-cinzel text-white text-sm">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIAL EVENTS ── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#080600]">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
                Premium Competitions
              </div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">
                SPECIAL <span className="text-[#D4AF37]">EVENTS</span>
              </h2>
            </div>
            <Link
              href="/schedule"
              className="hidden sm:inline-flex items-center gap-2 font-montserrat text-[10px] font-bold text-white uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
            {specialEvents.map((event, i) => (
              <div
                key={event.name}
                className="glass-card group relative overflow-hidden border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Card image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={specialEventImages[i % specialEventImages.length]}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Strong dark overlay for drama */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, #000000 100%)" }} />
                  
                  {/* Special Event label */}
                  <div className="absolute top-4 left-4">
                    <span className="font-montserrat text-[8px] font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full uppercase tracking-widest">Special</span>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`font-montserrat text-[8px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${statusColors[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                  
                  {/* Event name overlaid at bottom of image */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h4 className="font-cinzel tracking-wider text-white text-lg leading-tight">{event.name}</h4>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="font-montserrat text-white/50 text-[11px] mb-6 leading-relaxed min-h-[40px]">{event.desc}</p>
                  <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                    <span className="flex items-center gap-2 font-montserrat text-white/40 text-[10px] uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2 font-montserrat text-white/40 text-[10px] uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 sm:hidden">
            <Link href="/schedule" className="btn-secondary text-[10px]">VIEW ALL EVENTS</Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
