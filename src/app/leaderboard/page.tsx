"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import { teams, topPerformers } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import PageHero from "@/components/PageHero";
import LiveTicker from "@/components/LiveTicker";
import AnimatedCounter from "@/components/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

function MiniSparkline({ values, color }: { values: number[]; color: string }) {
  const w = 60, h = 20;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const xs = values.map((_, i) => (i / (values.length - 1)) * w);
  const ys = values.map(v => h - 2 - ((v - min) / range) * (h - 4));
  const pts = xs.map((x, i) => `${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={60} height={20} style={{display:"block"}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => <circle key={i} cx={x.toFixed(1)} cy={ys[i].toFixed(1)} r="2.5" fill={color} />)}
    </svg>
  );
}

export default function LeaderboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount flag so Recharts' ResponsiveContainer never measures during SSR
    setMounted(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      // Scroll reveals
      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: parent, start: "top 90%", once: true },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const sorted = [...teams].sort((a, b) => a.rank - b.rank);
  const weekData: Record<string, number[]> = {
    modi: [22272, 0, 0, 0],
    doval: [16040, 0, 0, 0],
    "amit-shah": [12195, 0, 0, 0],
    jaishankar: [7665, 0, 0, 0],
  };

  return (
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">
      
      {/* ─── HERO ─── */}
      <PageHero backgroundImage="/images/hero_trophy_leaderboard.png" layout="left" className="min-h-[380px]" objectPosition="object-[78%_center] md:object-center">

        <div className="max-w-7xl mx-auto relative px-6 sm:px-10 lg:px-16 py-24 z-10">
          <div className="max-w-2xl">
            <div className="h-badge inline-flex items-center gap-3 mb-7">
              <div className="absolute inset-0 rounded-full border border-white/10 bg-white/4 backdrop-blur-md" />
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-live block relative z-10" />
              <span className="font-montserrat text-green-400/80 text-[9px] font-bold tracking-[0.4em] uppercase relative z-10">Live Rankings</span>
            </div>

            <h1 className="h-title font-cinzel font-bold text-white mb-6 leading-none">
              <span style={{ fontSize: "clamp(40px, 8vw, 100px)", display: "block" }}>LEADER</span>
              <span
                style={{
                  fontSize: "clamp(40px, 8vw, 100px)",
                  display: "block",
                  background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.08em",
                }}
              >
                BOARD
              </span>
            </h1>

            <div className="h-sub flex items-center gap-4">
              <div className="h-px w-8 bg-[#FFC200]/65" />
              <div>
                <div className="font-montserrat text-white/55 text-[10px] font-bold tracking-[0.35em] uppercase mb-1">Live Standings · Real Impact</div>
                <p className="font-montserrat text-white/65 text-[9px] uppercase tracking-[0.25em]">Updated every Wednesday @ 8:00 PM</p>
              </div>
            </div>

            <a href="https://jukeboxmedia.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 mt-6 opacity-85 hover:opacity-100 transition-opacity duration-300">
              <span className="font-montserrat text-white/40 text-[7px] tracking-[0.25em] uppercase">Presented by</span>
              <span className="inline-flex items-center bg-white rounded-full pl-2.5 pr-3.5 py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
                <Image src="/images/jukebox-media-logo.png" alt="Jukebox Media" width={872} height={342} className="h-5 sm:h-6 w-auto object-contain" />
              </span>
            </a>
          </div>
        </div>
      </PageHero>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto">

          {/* TABLE + FILTERS */}
          <div className="space-y-6">

            {/* Filters */}
            <div className="flex flex-wrap gap-2 sr">
              {["Week 2 (Current)", "All Teams", "All Categories", "Reset Filters"].map((f, i) => (
                <button key={f} className={`font-montserrat text-[10px] font-bold px-4 py-2 rounded-full border transition-all uppercase tracking-wider ${i === 3 ? "border-white/10 text-white/60 hover:bg-white/5" : "border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* Table — desktop */}
            <div className="glass-card overflow-hidden sr border-white/10 hidden sm:block">
              <div className="w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[600px]">
                  <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 bg-white/[0.05]">
                    {[["col-span-1", "Rk"], ["col-span-5", "Team"], ["col-span-3 text-right", "Total Pts"], ["col-span-2 text-right", "This Wk"], ["col-span-1 text-center", "↕"]].map(([cls, h]) => (
                      <div key={h} className={`${cls} font-montserrat text-white/60 text-[9px] uppercase tracking-[0.2em]`}>{h}</div>
                    ))}
                  </div>
                  <div className="sr-stagger">
                    {sorted.map((team, i) => (
                      <div key={team.id} className="grid grid-cols-12 px-6 py-5 items-center border-b border-white/5 hover:bg-white/[0.05] transition-all duration-300 relative group" style={{ background: i === 0 ? `linear-gradient(90deg, ${team.color}08 0%, transparent 60%)` : undefined, borderLeft: `2px solid ${i < 3 ? team.color + "80" : 'transparent'}` }}>
                        {i === 0 && <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(90deg, ${team.color}05, transparent)` }} />}
                        <div className="col-span-1">
                          <div className="font-cinzel text-xl font-bold" style={{ color: i===0?"#D4AF37":i===1?"#b0bec5":i===2?"#CD7F32":"rgba(255,255,255,0.25)", textShadow: i===0?"0 0 20px rgba(212,175,55,0.5)":"none" }}>
                            {String(i+1).padStart(2,"0")}
                          </div>
                        </div>
                        <div className="col-span-5 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-black text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}cc)`, color: "#fff" }}>
                            {team.name.charAt(0)}
                          </div>
                          <div>
                            <Link href={`/teams/${team.id}`} className="font-cinzel tracking-widest text-white text-sm hover:text-[#D4AF37] transition-colors uppercase block">{team.name}</Link>
                            <div className="font-montserrat text-white/60 text-[9px] mt-1 tracking-widest uppercase">{team.fullName.split(" ").at(-1)}</div>
                          </div>
                        </div>
                        <div className="col-span-3 text-right">
                          <span className="font-cinzel font-bold text-2xl" style={{ color: team.color }}><AnimatedCounter value={team.points.toLocaleString()} /></span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="font-cinzel text-base text-white/50"><AnimatedCounter value={String(team.weekPoints)} /></span>
                        </div>
                        <div className="col-span-1 text-center">
                          {i === 1 ? <span className="font-montserrat text-green-400 text-[10px] font-bold">▲1</span> : i === 2 ? <span className="font-montserrat text-red-400 text-[10px] font-bold">▼1</span> : <span className="font-montserrat text-white/20 text-xs">—</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 text-center border-t border-white/5">
                <a href="#analytics" className="font-montserrat text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest hover:underline inline-flex items-center gap-2">
                  View Detailed Analytics <ArrowRight className="w-3 h-3"/>
                </a>
              </div>
            </div>

            {/* Table — mobile cards */}
            <div className="sm:hidden space-y-3 sr-stagger">
              {sorted.map((team, i) => (
                <Link key={team.id} href={`/teams/${team.id}`}
                  className="flex items-center gap-4 px-4 py-4 border border-white/8 hover:border-[rgba(255,194,0,0.25)] transition-all duration-300 rounded-sm"
                  style={{ background: i === 0 ? `linear-gradient(90deg, ${team.color}10, rgba(11,19,43,0.9))` : "rgba(11,19,43,0.7)", borderLeft: `3px solid ${i < 3 ? team.color : 'transparent'}` }}
                >
                  <div className="font-cinzel font-bold text-lg w-8 flex-shrink-0 text-center" style={{ color: i===0?"#D4AF37":i===1?"#b0bec5":i===2?"#CD7F32":"rgba(255,255,255,0.3)" }}>
                    {String(i+1).padStart(2,"0")}
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-black text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}cc)`, color: "#fff" }}>
                    {team.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-cinzel text-white text-sm tracking-widest uppercase truncate">{team.name}</div>
                    <div className="font-montserrat text-white/55 text-[8px] tracking-widest uppercase mt-0.5">{team.fullName.split(" ").at(-1)}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-cinzel font-bold text-xl" style={{ color: team.color }}>{team.points.toLocaleString()}</div>
                    <div className="font-montserrat text-white/45 text-[8px] uppercase tracking-widest">pts</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* SVG Chart */}
            <div id="analytics" className="glass-card p-8 sr border-white/10">
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm mb-6 uppercase">Points Trend (Last 4 Weeks)</h3>
              {(() => {
                const chartData = [
                  { name: "Week 1", modi: weekData.modi[0], doval: weekData.doval[0], shah: weekData["amit-shah"][0], jaishankar: weekData.jaishankar[0] },
                  { name: "Week 2", modi: weekData.modi[1], doval: weekData.doval[1], shah: weekData["amit-shah"][1], jaishankar: weekData.jaishankar[1] },
                  { name: "Week 3", modi: weekData.modi[2], doval: weekData.doval[2], shah: weekData["amit-shah"][2], jaishankar: weekData.jaishankar[2] },
                  { name: "Week 4", modi: weekData.modi[3], doval: weekData.doval[3], shah: weekData["amit-shah"][3], jaishankar: weekData.jaishankar[3] },
                ];
                return (
                  <div className="h-[250px] w-full">
                    {mounted ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "#050505", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                            itemStyle={{ fontSize: "12px", fontFamily: "var(--font-montserrat)" }}
                            labelStyle={{ color: "#D4AF37", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px", fontFamily: "var(--font-montserrat)" }}
                          />
                          {sorted.map(team => (
                            <Line
                              key={team.id}
                              type="monotone"
                              dataKey={team.id === "amit-shah" ? "shah" : team.id}
                              name={team.name}
                              stroke={team.color}
                              strokeWidth={3}
                              dot={{ r: 4, fill: team.color, strokeWidth: 0 }}
                              activeDot={{ r: 6, fill: "#fff", stroke: team.color, strokeWidth: 2 }}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    ) : null}
                  </div>
                );
              })()}
              <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/5 justify-center">
                {sorted.map(team=>(
                  <div key={team.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor:team.color}} />
                    <span className="font-montserrat text-white/50 text-[9px] uppercase tracking-widest">{team.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="glass-card p-8 sr border-white/10">
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm mb-6 uppercase">Top Performers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sr-stagger">
                {topPerformers.map((p) => (
                  <div key={p.label} className="bg-white/[0.01] border border-white/5 rounded-xl p-5 text-center hover:bg-white/[0.03] transition-all">
                    <div className="font-montserrat text-white/55 text-[8px] uppercase tracking-widest mb-4">{p.label}</div>
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border border-white/10 bg-white/[0.03] flex items-center justify-center">
                      {p.image ? (
                        <Image src={p.image} alt={p.name!} width={64} height={64} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6 text-white/20" />
                      )}
                    </div>
                    <div className={`font-cinzel tracking-wider text-[11px] mb-1 ${p.name ? "text-white" : "text-white/40"}`}>{p.name ?? "TBA"}</div>
                    <div className={`font-montserrat text-[8px] uppercase tracking-widest mb-3 ${p.name ? "text-white/50" : "text-white/30"}`}>{p.team ?? "Awaiting Results"}</div>
                    <div className={`font-cinzel font-bold text-lg ${p.value ? "text-[#D4AF37]" : "text-white/25"}`}>{p.value ?? "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <LiveTicker />
    </div>
  );
}
