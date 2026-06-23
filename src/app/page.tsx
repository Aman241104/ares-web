"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Calendar, Target, Briefcase, Sword, BookOpen, Image, Phone, Building2 } from "lucide-react";
import { teams, blogPosts, partners } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TeamCrest = ({ teamId, color, size = "sm" }: { teamId: string; color: string; size?: "sm" | "md" | "lg" }) => {
  const initials: Record<string, string> = { modi: "V", doval: "S", "amit-shah": "W", jaishankar: "D" };
  const sz = size === "sm" ? "w-8 h-8 text-xs" : size === "md" ? "w-10 h-10 text-sm" : "w-14 h-14 text-base";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-cinzel font-black text-white flex-shrink-0`} style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
      {initials[teamId]}
    </div>
  );
};

function MiniSparkline({ values, color }: { values: number[]; color: string }) {
  const w = 56, h = 18;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const xs = values.map((_, i) => (i / (values.length - 1)) * w);
  const ys = values.map(v => h - 2 - ((v - min) / range) * (h - 4));
  const pts = xs.map((x, i) => `${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{display:"block"}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => <circle key={i} cx={x.toFixed(1)} cy={ys[i].toFixed(1)} r="2" fill={color} />)}
    </svg>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.6 })
        .from(".h-title-ares", { opacity: 0, y: 50, duration: 0.8 }, "-=0.2")
        .from(".h-title-bl", { opacity: 0, y: 40, duration: 0.7 }, "-=0.4")
        .from(".h-title-yr", { opacity: 0, y: 30, duration: 0.7 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(".h-btns", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(".h-stats", { opacity: 0, y: 15, duration: 0.5, stagger: 0.07 }, "-=0.3")
        .from(".h-visual", { opacity: 0, scale: 0.85, duration: 1.0, ease: "back.out(1.2)" }, "-=1.0");

      // Scroll reveals — use fromTo with immediateRender:false so elements stay
      // visible if they're already in the viewport when the page loads
      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 35 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power2.out",
            immediateRender: false,
            scrollTrigger: { trigger: parent, start: "top 95%", once: true },
          }
        );
      });

      // After setting up triggers, refresh so elements already in view fire immediately
      ScrollTrigger.refresh();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const sorted = [...teams].sort((a, b) => a.rank - b.rank);

  const weekData: Record<string, number[]> = {
    modi: [520, 765, 920, 1285],
    doval: [480, 660, 820, 1160],
    "amit-shah": [430, 600, 760, 1076],
    jaishankar: [380, 540, 700, 945],
  };

  return (
    <div ref={heroRef} className="overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #060d14 0%, #0a1828 40%, #0d1f2f 70%, #060d14 100%)" }}>
        {/* Atmospheric background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(218,165,55,0.06) 0%, transparent 70%)" }} />
          <div className="absolute top-0 left-0 w-full h-full" style={{ background: "radial-gradient(ellipse 40% 40% at 20% 30%, rgba(218,165,55,0.04) 0%, transparent 60%)" }} />
          {/* Background gold orbs */}
          {[
            {size:"300px",x:"15%",y:"40%",o:"0.035"},
            {size:"200px",x:"75%",y:"60%",o:"0.04"},
            {size:"150px",x:"50%",y:"20%",o:"0.025"},
          ].map((orb,i)=>(
            <div key={i} className="absolute rounded-full pointer-events-none" style={{width:orb.size,height:orb.size,left:orb.x,top:orb.y,transform:"translate(-50%,-50%)",background:`radial-gradient(circle, rgba(218,165,55,${orb.o}) 0%, transparent 70%)`}} />
          ))}
          {/* Sparkling particles */}
          {[...Array(40)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-[#DAA537]"
              style={{
                width: i % 4 === 0 ? "3px" : i % 3 === 0 ? "2px" : "1px",
                height: i % 4 === 0 ? "3px" : i % 3 === 0 ? "2px" : "1px",
                left: `${3 + (i * 2.35) % 94}%`,
                top: `${3 + (i * 6.71) % 90}%`,
                opacity: 0.08 + (i % 6) * 0.04,
                animation: `pulse-live ${1.5 + (i % 4) * 0.5}s ease-in-out ${(i * 0.25) % 2}s infinite`,
              }}
            />
          ))}
        </div>

        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none overflow-hidden">
          <div className="font-cinzel font-black text-[#DAA537] opacity-[0.025] select-none" style={{ fontSize: "clamp(120px, 18vw, 280px)", lineHeight: 1 }}>ARES</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center w-full">
          {/* LEFT */}
          <div className="max-w-xl">
            <div className="h-badge inline-flex items-center gap-2 bg-[#DAA537]/10 border border-[#DAA537]/30 rounded-sm px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DAA537] pulse-live block" />
              <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.4em] uppercase">Nation Builders Edition 2026</span>
            </div>

            <div>
              <h1 className="font-cinzel font-black leading-none">
                <span className="h-title-ares block text-shadow-gold" style={{ fontSize: "clamp(72px, 10vw, 120px)", color: "#DAA537", lineHeight: 0.95 }}>ARES</span>
                <span className="h-title-bl block text-white tracking-widest" style={{ fontSize: "clamp(20px, 3.5vw, 44px)", marginTop: "4px" }}>BUSINESS LEAGUE</span>
                <span className="h-title-yr block text-shadow-gold" style={{ fontSize: "clamp(56px, 8vw, 96px)", color: "#DAA537", marginTop: "2px" }}>2026</span>
              </h1>
            </div>

            <div className="h-sub mt-5 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-[#DAA537] to-transparent" />
                <p className="font-montserrat text-white/65 text-base sm:text-lg font-medium tracking-wide">
                  4 Teams. 4 Leaders. 1 Mission.
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-[#DAA537] to-transparent" />
              </div>
              <p className="font-montserrat text-[#DAA537]/70 text-sm font-medium tracking-wider ml-[60px]">
                June 24 – July 22, 2026
              </p>
            </div>

            <div className="h-btns flex flex-wrap gap-3 mb-10">
              <Link href="/teams" className="btn-primary">
                View Teams <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/leaderboard" className="btn-secondary">
                View Leaderboard
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-0 divide-x divide-[#DAA537]/20">
              {[
                { n: "30", l: "Business Owners" },
                { n: "4",  l: "Teams" },
                { n: "1",  l: "Month" },
                { n: "1",  l: "Winner" },
              ].map((s, i) => (
                <div key={s.l} className={`h-stats flex flex-col items-center px-5 py-2 ${i === 0 ? "pl-0" : ""}`}>
                  <div className="font-cinzel font-black text-3xl text-[#DAA537] leading-none">{s.n}</div>
                  <div className="font-montserrat text-white/45 text-[10px] uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Trophy + Banner Flags */}
          <div className="h-visual hidden lg:flex items-end justify-center relative" style={{minHeight:"560px"}}>
            {/* Spotlight from above */}
            <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 60% 70% at 50% 30%, rgba(218,165,55,0.18) 0%, rgba(218,165,55,0.06) 40%, transparent 70%)"}} />
            <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 40% 50% at 50% 55%, rgba(218,165,55,0.10) 0%, transparent 65%)"}} />

            {/* 4 Tall Banner Flags — 2 on each side */}
            {/* Left two banners */}
            <div className="absolute inset-0 flex items-end justify-between px-1">
              <div className="flex items-end gap-1.5">
                {[
                  { color:"#E67E22", name:"MODI", sub:"VISIONARIES", img:"/images/mascot-lion.jpg", h:"90%" },
                  { color:"#1E3A8A", name:"DOVAL", sub:"STRATEGISTS", img:"/images/mascot-eagle.jpg", h:"100%" },
                ].map((t) => (
                  <div key={t.name} style={{width:"76px", height:t.h}} className="flex flex-col">
                    <div className="w-full flex-1 rounded-t-lg relative overflow-hidden" style={{border:`1px solid ${t.color}90`,borderBottom:"none"}}>
                      <img src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover object-center" style={{opacity:0.55}} />
                      <div className="absolute inset-0" style={{background:`linear-gradient(180deg, ${t.color}cc 0%, ${t.color}80 25%, transparent 55%, ${t.color}40 100%)`}} />
                      <div className="absolute top-0 left-0 right-0 h-1.5" style={{background:t.color}} />
                      <div className="absolute top-3 left-0 right-0 px-1 text-center">
                        <div className="font-cinzel font-black text-[9px] tracking-[0.15em] text-white" style={{textShadow:`0 0 12px ${t.color}`}}>{t.name}</div>
                      </div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <div className="font-cinzel font-bold text-[8px] tracking-widest" style={{color:t.color,writingMode:"vertical-rl",transform:"rotate(180deg)"}}>{t.sub}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-end gap-1.5">
                {[
                  { color:"#C0392B", name:"SHAH", sub:"WARRIORS", img:"/images/mascot-tiger.jpg", h:"95%" },
                  { color:"#27AE60", name:"JAISHANKAR", sub:"DIPLOMATS", img:"/images/mascot-lotus.jpg", h:"85%" },
                ].map((t) => (
                  <div key={t.name} style={{width:"76px", height:t.h}} className="flex flex-col">
                    <div className="w-full flex-1 rounded-t-lg relative overflow-hidden" style={{border:`1px solid ${t.color}90`,borderBottom:"none"}}>
                      <img src={t.img} alt={t.name} className="absolute inset-0 w-full h-full object-cover object-center" style={{opacity:0.55}} />
                      <div className="absolute inset-0" style={{background:`linear-gradient(180deg, ${t.color}cc 0%, ${t.color}80 25%, transparent 55%, ${t.color}40 100%)`}} />
                      <div className="absolute top-0 left-0 right-0 h-1.5" style={{background:t.color}} />
                      <div className="absolute top-3 left-0 right-0 px-1 text-center">
                        <div className="font-cinzel font-black text-[9px] tracking-[0.15em] text-white" style={{textShadow:`0 0 12px ${t.color}`}}>{t.name}</div>
                      </div>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <div className="font-cinzel font-bold text-[8px] tracking-widest" style={{color:t.color,writingMode:"vertical-rl",transform:"rotate(180deg)"}}>{t.sub}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trophy overlapping banners — big and central */}
            <div className="relative z-20 flex flex-col items-center mb-4">
              <img src="/images/hero-trophy.jpg" alt="Trophy"
                className="object-contain"
                style={{width:"380px", height:"460px", filter:"drop-shadow(0 0 80px rgba(218,165,55,1.0)) drop-shadow(0 0 160px rgba(218,165,55,0.5)) drop-shadow(0 -30px 60px rgba(218,165,55,0.35)) brightness(1.1)"}}
              />
              <div className="font-cinzel font-black text-[#DAA537] text-xs tracking-[0.5em] uppercase mt-1">Champion Awaits</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060d14] to-transparent pointer-events-none" />

        {/* Mobile stats strip */}
        <div className="absolute bottom-0 left-0 right-0 flex lg:hidden justify-around py-5 bg-[#060d14]/90 backdrop-blur-sm border-t border-[#DAA537]/15">
          {[{n:"30",l:"Owners"},{n:"4",l:"Teams"},{n:"1",l:"Month"},{n:"1",l:"Winner"}].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-cinzel font-black text-xl text-[#DAA537]">{s.n}</div>
              <div className="font-montserrat text-white/40 text-[10px] uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LIVE LEADERBOARD + THIS WEEK'S HIGHLIGHT
      ═══════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-8 lg:px-12" style={{background:"linear-gradient(180deg, #060d14 0%, #081018 50%, #060d14 100%)"}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Leaderboard table */}
            <div className="lg:col-span-2 sr">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#DAA537]" />
                  <h2 className="font-cinzel text-white font-bold text-2xl tracking-wider">LIVE LEADERBOARD</h2>
                  <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full pulse-live block" />
                    <span className="font-montserrat text-green-400 text-[11px] font-bold uppercase tracking-wider">Live</span>
                  </span>
                </div>
                <span className="font-montserrat text-white/30 text-xs">Updated every Wednesday @ 8:00 PM</span>
              </div>

              <div className="bg-[#0a1520] border border-[#DAA537]/25 rounded-xl overflow-hidden" style={{boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>
                {/* Table head */}
                <div className="grid grid-cols-12 px-4 py-2.5 bg-[#DAA537]/8 border-b border-[#DAA537]/20">
                  <div className="col-span-1 font-montserrat text-[#DAA537] text-[11px] font-bold uppercase tracking-wider">Rank</div>
                  <div className="col-span-6 font-montserrat text-[#DAA537] text-[11px] font-bold uppercase tracking-wider">Team</div>
                  <div className="col-span-2 font-montserrat text-[#DAA537] text-[11px] font-bold uppercase tracking-wider text-right">Points</div>
                  <div className="col-span-2 font-montserrat text-[#DAA537] text-[11px] font-bold uppercase tracking-wider text-right">Week</div>
                  <div className="col-span-1 font-montserrat text-[#DAA537] text-[11px] font-bold uppercase tracking-wider text-center">Trend</div>
                </div>

                {sorted.map((team, i) => (
                  <div key={team.id} className="grid grid-cols-12 px-4 py-4 lb-row items-center relative" style={{borderLeft:`3px solid ${team.color}70`}}>
                    <div className="col-span-1">
                      <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"rgba(255,255,255,0.2)",
                          backgroundColor: i===0?"rgba(255,215,0,0.1)":i===1?"rgba(192,192,192,0.1)":i===2?"rgba(205,127,50,0.1)":"transparent"
                        }}>
                        <span className="font-cinzel font-black text-sm" style={{color: i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"rgba(255,255,255,0.3)"}}>{i+1}</span>
                      </div>
                    </div>
                    <div className="col-span-6 flex items-center gap-3">
                      <TeamCrest teamId={team.id} color={team.color} size="sm" />
                      <div>
                        <div className="font-cinzel font-bold text-sm leading-tight" style={{ color: team.color }}>
                          {team.name.toUpperCase()}
                        </div>
                        <div className="font-montserrat text-[11px] mt-0.5 font-semibold" style={{color:team.color+"99"}}>{team.fullName.split(" ").at(-1)}</div>
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-cinzel font-bold text-xl text-[#DAA537]">{team.points.toLocaleString()}</span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-cinzel font-bold text-sm text-white/60">{team.weekPoints}</span>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <MiniSparkline values={weekData[team.id] ?? [0,0,0,0]} color={team.color} />
                    </div>
                  </div>
                ))}

                <div className="px-4 py-3 text-center border-t border-[#DAA537]/10">
                  <Link href="/leaderboard" className="font-montserrat text-[#DAA537] text-sm font-semibold hover:underline inline-flex items-center gap-1.5">
                    View Full Leaderboard <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Race to Glory */}
            <div className="sr">
              <div className="bg-[#0D1B2A] border border-[#DAA537]/40 rounded-xl p-6 flex flex-col gap-5 h-full" style={{boxShadow:"0 0 40px rgba(218,165,55,0.08)"}}>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-[#DAA537]" />
                  <h3 className="font-cinzel text-[#DAA537] font-bold text-xl tracking-widest text-shadow-gold">THE RACE TO GLORY</h3>
                </div>
                <div className="w-full h-px bg-[#DAA537]/20" />
                <p className="font-montserrat text-white/45 text-xs uppercase tracking-widest">League Totals — All Teams</p>

                {/* 3 key metric boxes */}
                <div className="flex flex-col gap-3 flex-1">
                  {[
                    { label: "TYFCB", value: "₹3.4M", sub: "Total Business Generated", icon: <Briefcase className="w-6 h-6 text-[#DAA537]" /> },
                    { label: "REFERRALS", value: "610", sub: "Total Referrals Passed", icon: <Users className="w-6 h-6 text-[#DAA537]" /> },
                    { label: "1-2-1 MEETINGS", value: "1,078", sub: "Total Meetings Done", icon: <Calendar className="w-6 h-6 text-[#DAA537]" /> },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-4 bg-white/[0.03] border border-[#DAA537]/15 rounded-xl px-4 py-3 hover:border-[#DAA537]/35 transition-all">
                      <span className="flex-shrink-0">{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-wider">{m.label}</div>
                        <div className="font-cinzel font-black text-[#DAA537] text-3xl leading-tight">{m.value}</div>
                        <div className="font-montserrat text-white/30 text-[10px] mt-0.5">{m.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/leaderboard" className="btn-primary w-full justify-center text-xs mt-auto">
                  View Full Leaderboard <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THIS WEEK'S HIGHLIGHT
      ═══════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-8 lg:px-12" style={{ background: "linear-gradient(180deg, #060d14 0%, #0a1520 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="sr flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#DAA537]" />
            <h2 className="font-cinzel text-white font-bold text-2xl tracking-wider">THIS WEEK&apos;S HIGHLIGHT</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sr-stagger">
            {/* Theme card */}
            <div className="bg-[#0D1B2A] border border-[#DAA537]/20 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-montserrat font-bold text-[#DAA537] uppercase tracking-widest mb-2">Week 2 Theme</div>
                <h3 className="font-cinzel font-black text-white text-xl leading-tight mb-3">THE CONNECT CHALLENGE</h3>
                <p className="font-montserrat text-white/45 text-sm leading-relaxed">
                  Building connections. Creating opportunities. Driving the nation forward.
                </p>
              </div>
              <Link href="/schedule" className="mt-4 font-montserrat text-[#DAA537] text-xs font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1">
                View All Events <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Metrics */}
            {[
              { icon: <Briefcase className="w-10 h-10 text-[#DAA537]" />, label: "Highest Business", value: "₹24,85,000", team: "Team Doval", color: "#1E3A8A" },
              { icon: <Users className="w-10 h-10 text-[#DAA537]" />, label: "Most Referrals", value: "156", team: "Team Modi", color: "#E67E22" },
              { icon: <Calendar className="w-10 h-10 text-[#DAA537]" />, label: "Max Meetings", value: "312", team: "Team Amit Shah", color: "#C0392B" },
            ].map((m) => (
              <div key={m.label} className="bg-[#0D1B2A] border border-[#DAA537]/20 rounded-xl p-6 text-center flex flex-col items-center gap-2 hover:border-[#DAA537]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(218,165,55,0.12)] transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#DAA537]/10 border border-[#DAA537]/20 flex items-center justify-center">{m.icon}</div>
                <div className="font-montserrat text-white/45 text-[11px] uppercase tracking-wider">{m.label}</div>
                <div className="font-cinzel font-black text-[#DAA537] text-3xl sm:text-4xl leading-tight">{m.value}</div>
                <div className="text-[11px] font-montserrat font-bold px-3 py-0.5 rounded-full" style={{ color: m.color, backgroundColor: m.color + "15", border: `1px solid ${m.color}40` }}>{m.team}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TEAM SPOTLIGHT
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sr">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-7 rounded-full bg-gradient-to-b from-[#DAA537] to-[#C49428]" />
              <span className="font-montserrat text-[#DAA537] text-[11px] font-bold uppercase tracking-[0.4em]">Team Spotlight</span>
            </div>
            <h2 className="font-cinzel font-bold text-white text-2xl tracking-wider">MEET THE 4 TEAMS</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sr-stagger">
            {sorted.map((team) => {
              const portraits: Record<string, string> = {
                modi: "/images/mascot-lion.jpg",
                doval: "/images/mascot-eagle.jpg",
                "amit-shah": "/images/mascot-tiger.jpg",
                jaishankar: "/images/mascot-lotus.jpg",
              };
              const portrait = portraits[team.id];
              return (
                <Link key={team.id} href={`/teams/${team.id}`} className="rounded-2xl overflow-hidden border group hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(0,0,0,0.6)] transition-all duration-300 bg-[#0D1B2A] flex flex-col" style={{borderColor:team.color+"50", borderTop:`3px solid ${team.color}`}}>
                  {/* Mascot image with team-color tint overlay */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <img src={portrait} alt={team.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                    {/* Team-color gradient overlay */}
                    <div className="absolute inset-0" style={{background:`linear-gradient(160deg, ${team.color}bb 0%, ${team.color}77 25%, ${team.color}33 60%, transparent 90%)`}} />
                    {/* Bottom fade to card bg */}
                    <div className="absolute inset-0" style={{background:`linear-gradient(to top, #0D1B2A 0%, transparent 45%)`}} />
                    {/* Team name top-left */}
                    <div className="absolute top-3 left-3">
                      <div className="font-montserrat text-white/60 text-[9px] font-bold uppercase tracking-widest">Team</div>
                      <div className="font-cinzel font-black text-base text-white leading-tight" style={{textShadow:`0 0 12px ${team.color}, 0 0 24px ${team.color}88`}}>{team.name.toUpperCase()}</div>
                      <div className="font-cinzel font-bold text-[10px] mt-0.5 leading-none" style={{color:team.color}}>{team.fullName.split(" ").at(-1)!.toUpperCase()}</div>
                    </div>
                    {/* Rank badge top-right — filled circle */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:team.color, boxShadow:`0 0 10px ${team.color}99`}}>
                      <span className="font-cinzel font-black text-white text-sm leading-none">#{team.rank}</span>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="flex flex-col flex-1 px-4 pt-3 pb-4">
                    {/* Owner name */}
                    <div className="mb-3">
                      <div className="font-montserrat text-white/35 text-[9px] uppercase tracking-wider">Team Owner</div>
                      <div className="font-cinzel font-bold text-white text-sm leading-tight">{team.owner.name}</div>
                    </div>
                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-px bg-[#DAA537]/10 rounded-lg overflow-hidden mb-3">
                      {[{l:"Members",v:String(team.members)},{l:"Points",v:team.points.toLocaleString()},{l:"Referrals",v:String(team.referrals)}].map(s=>(
                        <div key={s.l} className="text-center bg-[#0D1B2A] py-2">
                          <div className="font-cinzel font-bold text-sm" style={{color:team.color}}>{s.v}</div>
                          <div className="font-montserrat text-white/30 text-[9px] uppercase">{s.l}</div>
                        </div>
                      ))}
                    </div>
                    {/* View button */}
                    <div className="mt-auto">
                      <div className="w-full flex items-center justify-center gap-1.5 font-montserrat text-xs font-bold py-3 rounded-lg uppercase tracking-widest transition-all group-hover:shadow-lg" style={{background:`linear-gradient(135deg, ${team.color}dd, ${team.color}aa)`,color:"white",boxShadow:`0 4px 15px ${team.color}40`}}>
                        View Team <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOURNAMENT AT A GLANCE
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060d14 0%, #0a1520 40%, #0D1B2A 60%, #060d14 100%)" }}>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 70% 50% at 50% 50%, rgba(218,165,55,0.06) 0%, transparent 70%)"}} />
        <div className="max-w-7xl mx-auto relative">
          <div className="sr flex items-center gap-3 mb-12">
            <span className="w-2 h-2 rounded-full bg-[#DAA537]" />
            <h2 className="font-cinzel font-bold text-white text-2xl tracking-wider">TOURNAMENT AT A GLANCE</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sr-stagger">
            {[
              { icon: <Users className="w-9 h-9" />, n: "30", l: "Business Owners", d: "Leaders driving growth and creating impact" },
              { icon: <Target className="w-9 h-9" />, n: "4", l: "Teams", d: "Competing with strategy, unity and passion" },
              { icon: <Calendar className="w-9 h-9" />, n: "1", l: "Month", d: "One month of intense competition" },
              { icon: <Trophy className="w-9 h-9" />, n: "₹5Cr", l: "Prize Pool", d: "Opportunity up for grabs this league season." },
            ].map((s) => (
              <div key={s.l} className="text-center p-7 rounded-xl bg-white/[0.025] hover:bg-white/[0.05] transition-all duration-300" style={{border:"1px solid rgba(218,165,55,0.15)",borderBottom:"3px solid rgba(218,165,55,0.5)"}}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#DAA537]/10 border border-[#DAA537]/25 flex items-center justify-center text-[#DAA537]">{s.icon}</div>
                </div>
                <div className="font-cinzel font-black text-6xl text-[#DAA537] mb-1">{s.n}</div>
                <div className="font-cinzel font-bold text-white text-base mb-2">{s.l}</div>
                <p className="font-montserrat text-white/40 text-xs leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          UPCOMING EVENTS
      ═══════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="sr flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#DAA537]" />
              <h2 className="font-cinzel font-bold text-white text-2xl tracking-wider">UPCOMING EVENTS</h2>
            </div>
            <Link href="/schedule" className="font-montserrat text-[#DAA537] text-sm font-semibold hover:underline inline-flex items-center gap-1">
              View Full Schedule <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3 sr-stagger">
            {[
              { date: "JUN 24", label: "Opening Ceremony", desc: "The league begins", time: "6:00 PM", status: "upcoming" },
              { date: "JUN 26", label: "Week 1 Challenge", desc: "Business Growth Sprint", time: "8:00 PM", status: "upcoming" },
              { date: "JUL 03", label: "Mid League Summit", desc: "Strategy. Connect. Grow.", time: "6:00 PM", status: "upcoming" },
            ].map((e) => (
              <div key={e.label} className="flex items-center gap-5 p-4 bg-[#0D1B2A] border border-[#DAA537]/15 rounded-xl hover:border-[#DAA537]/35 transition-all">
                <div className="w-14 text-center flex-shrink-0">
                  <div className="font-cinzel font-black text-[#DAA537] text-sm">{e.date}</div>
                </div>
                <div className="w-px h-10 bg-[#DAA537]/20 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-cinzel font-bold text-white text-sm">{e.label}</div>
                  <div className="font-montserrat text-white/45 text-xs mt-0.5">{e.desc}</div>
                </div>
                <div className="font-montserrat text-white/35 text-xs flex-shrink-0">{e.time}</div>
                <span className="font-montserrat text-[11px] font-bold px-3 py-1 rounded-full border status-upcoming uppercase">Upcoming</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BLOG + PARTNERS (side by side)
      ═══════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Blog */}
          <div>
            <div className="sr flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#DAA537]" />
                <h2 className="font-cinzel font-bold text-white text-xl tracking-wider">LATEST BLOG POSTS</h2>
              </div>
              <Link href="/blog" className="font-montserrat text-[#DAA537] text-xs font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1">
                View All Blogs <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3 sr-stagger">
              {blogPosts.slice(0, 3).map((post) => {
                const blogImageMap: Record<string,string> = {
                  "power-of-strategic-collaboration": "/images/blog-strategy.jpg",
                  "leadership-in-the-arena": "/images/blog-leadership.jpg",
                  "building-connections": "/images/blog-networking.jpg",
                  "execution-is-everything": "/images/blog-growth.jpg",
                };
                const blogImg = blogImageMap[post.id];
                return (
                  <article key={post.id} className="flex gap-4 p-4 bg-[#060d14] border border-[#DAA537]/12 rounded-xl hover:border-[#DAA537]/35 transition-all hover:-translate-y-0.5 group">
                    <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border border-[#DAA537]/15">
                      {blogImg ? (
                        <img src={blogImg} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#DAA537]/8 flex items-center justify-center border border-[#DAA537]/20">
                          <BookOpen className="w-6 h-6 text-[#DAA537]/40" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-montserrat text-[#DAA537] text-[11px] font-semibold mb-0.5">{post.date}</div>
                      <h3 className="font-cinzel font-bold text-white text-sm mb-1 line-clamp-1 group-hover:text-[#DAA537] transition-colors">{post.title}</h3>
                      <p className="font-montserrat text-white/40 text-xs line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <Link href={`/blog/${post.id}`} className="font-montserrat text-[#DAA537] text-[11px] font-bold mt-1.5 hover:underline inline-flex items-center gap-1">
                        Read More <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Partners */}
          <div>
            <div className="sr flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#DAA537]" />
                <h2 className="font-cinzel font-bold text-white text-xl tracking-wider">PROUD PARTNERS</h2>
              </div>
              <Link href="/partners" className="font-montserrat text-[#DAA537] text-xs font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
            </div>
            <p className="font-montserrat text-white/35 text-xs mb-4">Building the nation together.</p>
            <div className="grid grid-cols-3 gap-3 mb-4 sr-stagger">
              {partners.slice(0,6).map((p) => (
                <div key={p.name} className="bg-white/95 border border-white/20 rounded-xl px-3 py-4 flex flex-col items-center justify-center text-center hover:border-[#DAA537] hover:shadow-[0_0_16px_rgba(218,165,55,0.2)] transition-all min-h-[72px] group">
                  <div className="w-8 h-8 bg-[#DAA537]/15 rounded-full flex items-center justify-center mb-1.5"><Building2 className="w-4 h-4 text-[#DAA537]/80" /></div>
                  <div className="font-cinzel font-bold text-[#0D1B2A] text-[10px] leading-tight">{p.name}</div>
                  <div className="font-montserrat text-[#DAA537] text-[8px] mt-0.5 uppercase tracking-wider font-bold">{p.tier.replace(" Partner","")}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/partners" className="btn-primary text-xs py-2.5 px-6">
                View All Partners <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BE PART OF SOMETHING LEGENDARY CTA
      ═══════════════════════════════════════════ */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a1520 0%, #0f1e30 50%, #0a1520 100%)" }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(218,165,55,0.07) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 bg-grid opacity-20" />
        </div>
        <div className="relative max-w-6xl mx-auto sr">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <img src="/images/hero-trophy.jpg" alt="Trophy"
                className="object-contain"
                style={{width:"260px",height:"320px",filter:"drop-shadow(0 0 50px rgba(218,165,55,0.8)) drop-shadow(0 0 100px rgba(218,165,55,0.3))"}}
              />
            </div>
            <div>
              <div className="font-montserrat text-[#DAA537]/70 text-[11px] font-bold tracking-[0.4em] uppercase mb-4">Join The League</div>
              <h2 className="font-cinzel font-black text-white mb-4 text-left" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
                WANT TO JOIN SOMETHING <span className="text-[#DAA537] text-shadow-gold">LEGENDARY?</span>
              </h2>
              <p className="font-montserrat text-white/60 text-base mb-3 leading-relaxed text-left">
                Transform your digital presence with premium websites, powerful branding and performance-driven experiences that help your business stand out.
              </p>
              <div className="flex flex-wrap gap-3 text-left mb-8">
                {["Custom Websites","SEO Optimised","Mobile Responsive","High Performance"].map(f=>(
                  <span key={f} className="flex items-center gap-1.5 font-montserrat text-[11px] text-white/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DAA537] flex-shrink-0" />{f}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary text-sm px-8 py-3.5 inline-flex">
                  Contact Us Today <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/teams" className="btn-secondary text-sm px-8 py-3.5 inline-flex">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUICK LINKS
      ═══════════════════════════════════════════ */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#060d14] border-t border-[#DAA537]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sr-stagger">
            {[
              { href: "/teams", icon: <Sword className="w-9 h-9 text-[#DAA537]" />, title: "View Teams", desc: "Meet the champions" },
              { href: "/rules", icon: <BookOpen className="w-9 h-9 text-[#DAA537]" />, title: "Rules & FAQ", desc: "Understand the game" },
              { href: "/gallery", icon: <Image className="w-9 h-9 text-[#DAA537]" />, title: "Browse Gallery", desc: "Relive the moments" },
              { href: "/contact", icon: <Phone className="w-9 h-9 text-[#DAA537]" />, title: "Contact Us", desc: "We're here to help" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex flex-col items-center text-center py-8 px-4 bg-[#0D1B2A] border border-[#DAA537]/12 rounded-xl hover:border-[#DAA537]/50 hover:bg-[#DAA537]/5 transition-all group">
                <div className="mb-3 group-hover:scale-110 transition-transform duration-200">{l.icon}</div>
                <h3 className="font-cinzel font-bold text-white text-sm mb-1 group-hover:text-[#DAA537] transition-colors">{l.title}</h3>
                <p className="font-montserrat text-white/35 text-[11px]">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BUILD YOUR LEGACY CTA
      ═══════════════════════════════════════════ */}
      <section className="bg-[#0D1B2A] py-14 px-4 sm:px-8 lg:px-12 border-t border-[#DAA537]/15">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sr">
          <div className="flex items-start gap-5 max-w-2xl">
            <div>
              <div className="font-montserrat text-[#DAA537] text-[10px] font-bold tracking-[0.4em] uppercase mb-1.5">Build Your Legacy Beyond This League</div>
              <h3 className="font-cinzel font-black text-white text-xl sm:text-2xl mb-2 leading-tight">
                WANT A LEGENDARY WEBSITE <span className="text-[#DAA537]">FOR YOUR BUSINESS?</span>
              </h3>
              <p className="font-montserrat text-white/55 text-sm mb-3 leading-relaxed">
                Transform your digital presence with premium websites, powerful branding and performance-driven experiences that help your business stand out.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 font-montserrat text-white/35 text-[11px]">
                {["Custom Websites", "SEO Optimized", "Mobile Responsive", "High Performance"].map((f) => (
                  <span key={f} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DAA537] flex-shrink-0" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-primary whitespace-nowrap justify-center min-w-[200px]">
              Contact Us Today <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/gallery" className="btn-secondary whitespace-nowrap justify-center min-w-[200px]">
              View Our Work <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="font-montserrat text-white/30 text-[11px] text-center">
              Trusted by founders, manufacturers and growth-focused businesses.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

// Add spin animation via style
const SpinStyle = () => (
  <style>{`
    @keyframes spin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
  `}</style>
);
