import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { weeklyEvents, specialEvents, teams } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const statusColors: Record<string, string> = {
  completed: "bg-green-500/20 text-green-400 border-green-500/40",
  "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/40",
};

const statusDot: Record<string, string> = {
  completed: "bg-green-400",
  "in-progress": "bg-yellow-400",
  upcoming: "bg-blue-400",
};

const specialEventImages = [
  "/images/blog-strategy.jpg",
  "/images/blog-leadership.jpg",
  "/images/blog-networking.jpg",
  "/images/blog-growth.jpg",
];

// Week 2 events as shown in the reference design
const week2Events = [
  { name: "Opening Ceremony", category: "Networking", points: 80, status: "completed" },
  { name: "Business Growth Sprint", category: "Networking", points: 150, status: "completed" },
  { name: "Refer & Earn Challenge", category: "Referrals", points: 200, status: "completed" },
  { name: "TYFCB Challenge", category: "TYFCB", points: 300, status: "in-progress" },
  { name: "One-on-One BNI", category: "Meetings", points: 200, status: "upcoming" },
  { name: "Attendance Booster", category: "Attendance", points: 75, status: "upcoming" },
];

export default function SchedulePage() {
  return (
    <div className="pt-16">
      {/* ── HERO ── */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 bg-[#060d14] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, rgba(218,165,55,0.07) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <h1 className="font-cinzel font-black text-[#DAA537] mb-2 leading-none" style={{fontSize:"clamp(40px,6vw,80px)",textShadow:"0 0 40px rgba(218,165,55,0.4)"}}>
              SCHEDULE<br/><span style={{fontSize:"0.65em"}}>&amp; EVENTS</span>
            </h1>
            <div className="font-montserrat text-[#DAA537]/80 text-xs font-bold tracking-[0.35em] uppercase mb-3">42 CHALLENGES · 4 WEEKS · 1 CHAMPION</div>
            <div className="gold-divider w-24 mb-4" />
            <p className="font-montserrat text-white/60 text-base mb-6 max-w-md">
              Dynamic schedule. Real-time updates. Maximum Impact.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary text-sm">
                <Calendar className="w-4 h-4" /> Calendar View
              </button>
              <button className="btn-secondary text-sm">
                <Clock className="w-4 h-4" /> Timeline View
              </button>
            </div>
          </div>

          {/* Right: trophy + team badge pills */}
          <div className="hidden lg:flex justify-end items-center gap-6">
            <div className="relative w-36 h-36 flex-shrink-0">
              <img
                src="/images/hero-trophy.jpg"
                alt="Trophy"
                className="w-full h-full object-cover rounded-2xl opacity-85"
                style={{ filter: "drop-shadow(0 0 30px rgba(218,165,55,0.6))" }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(218,165,55,0.25), transparent)",
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              {teams.map((t) => {
                const teamImgs: Record<string,string> = {
                  modi:"/images/team-modi.jpg", doval:"/images/team-doval.jpg",
                  "amit-shah":"/images/team-amit-shah.jpg", jaishankar:"/images/team-jaishankar.jpg",
                };
                return (
                  <Link
                    key={t.id}
                    href={`/teams/${t.id}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl border hover:opacity-80 transition-opacity"
                    style={{ borderColor: t.color + "60", backgroundColor: t.color + "12", minWidth: "200px" }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border-2"
                      style={{ borderColor: t.color + "70" }}
                    >
                      <img src={teamImgs[t.id]} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-cinzel font-black text-xs leading-tight" style={{ color: t.color }}>
                        {t.name.toUpperCase()}
                      </div>
                      <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-wider truncate">
                        {t.fullName.toUpperCase()}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── THIS WEEK'S EVENT UPDATE ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="font-montserrat text-[#DAA537]/60 text-[10px] font-bold tracking-[0.4em] uppercase mb-1">
            Live Updates
          </div>
          <h2 className="font-cinzel font-black text-white text-2xl sm:text-3xl">
            THIS WEEK&apos;S{" "}
            <span className="text-[#DAA537]">EVENT UPDATE</span>
          </h2>
        </div>

        {/* 3-column layout: week selector | events table | bonus sidebar */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-[#DAA537]/20">
          {/* ── Left: Week Selector ── */}
          <div
            className="flex-shrink-0 lg:w-64 bg-[#060d14] border-r border-[#DAA537]/20 p-5"
            style={{ minWidth: 220 }}
          >
            {/* Week buttons */}
            <div className="space-y-1 mb-6">
              {weeklyEvents.map((week, i) => (
                <div
                  key={week.week}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-default ${
                    i === 1
                      ? "bg-[#DAA537] text-[#0D1B2A]"
                      : "hover:bg-white/5 text-white/40"
                  }`}
                >
                  <div
                    className={`font-cinzel font-bold text-sm ${
                      i === 1 ? "text-[#0D1B2A]" : "text-white/60"
                    }`}
                  >
                    WEEK {week.week}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected week details */}
            <div className="pt-4 border-t border-[#DAA537]/20">
              <div className="font-montserrat text-[#DAA537]/60 text-[9px] font-bold tracking-[0.3em] uppercase mb-1">
                WEEK 2 THEME
              </div>
              <h3 className="font-cinzel font-bold text-white text-sm leading-tight mb-3">
                STRONGER IMPACT.
              </h3>
              <p className="font-montserrat text-white/40 text-xs leading-relaxed mb-5">
                Maintaining the league with focus, energy and meaningful connections
              </p>

              {/* LIVE + countdown */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="font-montserrat text-green-400 text-xs font-bold tracking-wider">
                    LIVE
                  </span>
                </div>
                <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-wider">
                  END IN:
                </div>
                <div className="font-cinzel font-bold text-[#DAA537] text-base tracking-widest">
                  04:12:36:58
                </div>
              </div>
            </div>
          </div>

          {/* ── Center: Events Table ── */}
          <div className="flex-1 bg-[#060d14] p-6 min-w-0">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 mb-2">
              <div className="col-span-5 font-montserrat text-[10px] font-bold text-white/30 uppercase tracking-widest">
                EVENT NAME
              </div>
              <div className="col-span-3 font-montserrat text-[10px] font-bold text-white/30 uppercase tracking-widest">
                CATEGORY
              </div>
              <div className="col-span-2 text-right font-montserrat text-[10px] font-bold text-white/30 uppercase tracking-widest">
                POINTS
              </div>
              <div className="col-span-2 text-right font-montserrat text-[10px] font-bold text-white/30 uppercase tracking-widest">
                STATUS
              </div>
            </div>

            {/* Event rows */}
            <div className="space-y-2">
              {week2Events.map((event) => (
                <div
                  key={event.name}
                  className="grid grid-cols-12 gap-2 px-3 py-3.5 rounded-xl transition-all hover:-translate-x-0.5 items-center" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(218,165,55,0.06)"}}
                >
                  <div className="col-span-5 font-montserrat font-semibold text-white text-sm truncate">
                    {event.name}
                  </div>
                  <div className="col-span-3 font-montserrat text-white/50 text-xs">
                    {event.category}
                  </div>
                  <div className="col-span-2 text-right font-cinzel font-bold text-[#DAA537] text-sm">
                    {event.points}
                  </div>
                  <div className="col-span-2 text-right">
                    <span
                      className={`inline-flex items-center gap-1 font-montserrat text-[10px] px-2 py-0.5 rounded-full border capitalize ${
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

            {/* View full schedule button */}
            <div className="mt-6">
              <Link
                href="#"
                className="inline-flex items-center gap-2 font-montserrat font-bold text-sm text-[#DAA537] hover:text-[#DAA537]/80 border border-[#DAA537]/40 hover:border-[#DAA537]/70 px-5 py-2.5 rounded-lg transition-all"
              >
                VIEW FULL SCHEDULE <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Right: Bonus Points Sidebar ── */}
          <div
            className="flex-shrink-0 lg:w-56 bg-[#060d14] border-l border-[#DAA537]/20 p-5"
            style={{ minWidth: 200 }}
          >
            <h3 className="font-cinzel font-bold text-[#DAA537] text-xs mb-1 tracking-widest uppercase">
              BONUS POINTS
            </h3>
            <p className="font-cinzel font-bold text-[#DAA537] text-xs mb-4 tracking-wider uppercase">
              DETAILS
            </p>

            <div className="space-y-2.5 mb-5">
              {[
                { name: "Early Bird Bonus", pts: "+25", desc: "Complete before the deadline" },
                { name: "Perfect Week Bonus", pts: "+100", desc: "Complete all weekly events" },
                { name: "Consistency Bonus", pts: "+75", desc: "Attend 3 consecutive weeks" },
                { name: "Mega Impact Bonus", pts: "+150", desc: "Achieve high business impact" },
              ].map((b) => (
                <div
                  key={b.name}
                  className="p-3 rounded-lg border transition-all hover:border-[#DAA537]/35" style={{background:"rgba(218,165,55,0.04)",border:"1px solid rgba(218,165,55,0.12)"}}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-montserrat font-semibold text-white/80 text-[11px] leading-tight">
                        {b.name}
                      </div>
                      <div className="font-montserrat text-white/35 text-[9px] mt-0.5 leading-snug">
                        {b.desc}
                      </div>
                    </div>
                    <span className="font-cinzel font-bold text-green-400 text-sm flex-shrink-0">
                      {b.pts}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Max bonus highlight */}
            <div className="p-3 bg-[#DAA537]/10 border border-[#DAA537]/40 rounded-xl text-center mb-5">
              <div className="font-montserrat text-white/50 text-[9px] uppercase tracking-wider mb-1 leading-tight">
                MAX BONUS POINTS<br />PER WEEK:
              </div>
              <div className="font-cinzel font-black text-3xl text-[#DAA537] leading-none">
                350
              </div>
              <div className="font-montserrat text-[#DAA537]/60 text-[10px] font-bold tracking-widest mt-0.5">
                PTS
              </div>
            </div>

            {/* Schedule at a Glance */}
            <div className="pt-4 border-t border-[#DAA537]/20">
              <h3 className="font-cinzel font-bold text-[#DAA537] text-xs mb-3 tracking-widest uppercase">Schedule At a Glance</h3>
              <div className="space-y-2">
                {[
                  {l:"Total Events",v:"42"},
                  {l:"Events Completed",v:"6"},
                  {l:"Events In-Progress",v:"2"},
                  {l:"Upcoming Events",v:"34"},
                  {l:"Weeks",v:"4"},
                ].map((s)=>(
                  <div key={s.l} className="flex items-center justify-between py-1.5 border-b border-white/4 last:border-0">
                    <span className="font-montserrat text-white/45 text-[11px]">{s.l}</span>
                    <span className="font-cinzel font-bold text-[#DAA537] text-sm">{s.v}</span>
                  </div>
                ))}
              </div>
              <Link href="#" className="mt-4 w-full flex items-center justify-center gap-1.5 font-montserrat text-[10px] font-bold py-2 rounded-lg border border-[#DAA537]/40 text-[#DAA537] hover:border-[#DAA537] uppercase tracking-wider transition-all">
                Book Full Schedule <ArrowRight className="w-3 h-3"/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIAL EVENTS ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-montserrat text-[#DAA537]/60 text-[10px] font-bold tracking-[0.4em] uppercase mb-1">
                Premium Competitions
              </div>
              <h2 className="font-cinzel font-bold text-white text-2xl sm:text-3xl">
                SPECIAL <span className="text-[#DAA537]">EVENTS</span>
              </h2>
            </div>
            <Link
              href="#"
              className="font-montserrat text-[#DAA537] text-sm font-semibold hover:underline inline-flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {specialEvents.map((event, i) => (
              <div
                key={event.name}
                className="bg-[#0D1B2A] border border-[#DAA537]/25 rounded-2xl overflow-hidden hover:border-[#DAA537]/60 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(218,165,55,0.15)] transition-all duration-300 group cursor-default"
              >
                {/* Card image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={specialEventImages[i % specialEventImages.length]}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Strong dark overlay for drama */}
                  <div className="absolute inset-0" style={{background:"linear-gradient(to bottom, rgba(6,13,20,0.15) 0%, rgba(6,13,20,0.55) 60%, rgba(6,13,20,0.95) 100%)"}} />
                  {/* Gold top accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#DAA537]" />
                  {/* Special Event label */}
                  <div className="absolute top-3 left-3">
                    <span className="font-montserrat text-[9px] font-bold text-[#DAA537] bg-[#DAA537]/15 border border-[#DAA537]/40 px-2 py-0.5 rounded-full uppercase tracking-widest">Special Event</span>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`font-montserrat text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${statusColors[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                  {/* Event name overlaid at bottom of image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h4 className="font-cinzel font-black text-white text-base leading-tight" style={{textShadow:"0 2px 12px rgba(0,0,0,0.8)"}}>{event.name}</h4>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <p className="font-montserrat text-white/50 text-xs mb-3 leading-relaxed">{event.desc}</p>
                  <div className="flex items-center gap-3 font-montserrat text-[#DAA537] text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="#" className="btn-primary text-sm px-8">VIEW ALL SPECIAL EVENTS <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
