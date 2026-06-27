"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import LegacyCTA from "@/components/LegacyCTA";
import PageHero from "@/components/PageHero";
import LiveTicker from "@/components/LiveTicker";

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
    modi: [520, 765, 920, 1285],
    doval: [480, 660, 820, 1160],
    "amit-shah": [430, 600, 760, 1076],
    jaishankar: [380, 540, 700, 945],
  };

  return (
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">
      
      {/* ─── HERO ─── */}
      <PageHero layout="left" className="min-h-[380px]">

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
          </div>
        </div>
      </PageHero>

      {/* ─── MAIN CONTENT ─── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0B132B]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* TABLE + FILTERS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 sr">
              {["Week 2 (Current)", "All Teams", "All Categories", "Reset Filters"].map((f, i) => (
                <button key={f} className={`font-montserrat text-[10px] font-bold px-4 py-2 rounded-full border transition-all uppercase tracking-wider ${i === 3 ? "border-white/10 text-white/60 hover:bg-white/5" : "border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden sr border-white/10">
              <div className="w-full overflow-x-auto custom-scrollbar">
                <div className="min-w-[800px]">
                  <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 bg-white/[0.05]">
                    {[["col-span-1", "Rk"], ["col-span-4", "Team"], ["col-span-2 text-right", "Total Pts"], ["col-span-2 text-right", "Wk2 Pts"], ["col-span-2 text-center", "Trend"], ["col-span-1 text-center", "↕"]].map(([cls, h]) => (
                      <div key={h} className={`${cls} font-montserrat text-white/60 text-[9px] uppercase tracking-[0.2em]`}>{h}</div>
                    ))}
                  </div>

                  <div className="sr-stagger">
                    {sorted.map((team, i) => (
                      <div key={team.id} className="grid grid-cols-12 px-6 py-5 items-center border-b border-white/5 hover:bg-white/[0.05] transition-all duration-300 relative group" style={{ background: i === 0 ? `linear-gradient(90deg, ${team.color}08 0%, transparent 60%)` : undefined, borderLeft: `2px solid ${i < 3 ? team.color + "80" : 'transparent'}` }}>
                        {/* Gold shimmer on hover for rank 1 */}
                        {i === 0 && <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(90deg, ${team.color}05, transparent)` }} />}
                        <div className="col-span-1">
                          <div
                            className="font-cinzel text-xl font-light"
                            style={{
                              color: i===0?"#D4AF37":i===1?"#b0bec5":i===2?"#CD7F32":"rgba(255,255,255,0.25)",
                              textShadow: i===0?"0 0 20px rgba(212,175,55,0.5)":i===1?"0 0 15px rgba(176,190,197,0.3)":i===2?"0 0 15px rgba(205,127,50,0.3)":"none",
                            }}
                          >
                            {String(i+1).padStart(2,"0")}
                          </div>
                        </div>
                        
                        <div className="col-span-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-black text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}cc)`, color: "#fff" }}>
                            {team.name.charAt(0)}
                          </div>
                          <div>
                            <Link href={`/teams/${team.id}`} className="font-cinzel tracking-widest text-white text-sm hover:text-[#D4AF37] transition-colors uppercase block">
                              {team.name}
                            </Link>
                            <div className="font-montserrat text-white/60 text-[9px] mt-1 tracking-widest uppercase">{team.fullName.split(" ").at(-1)}</div>
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <span className="font-cinzel font-bold text-2xl" style={{ color: team.color }}>{team.points.toLocaleString()}</span>
                        </div>
                        
                        <div className="col-span-2 text-right">
                          <span className="font-cinzel text-base text-white/50">{team.weekPoints}</span>
                        </div>
                        
                        <div className="col-span-2 flex justify-center">
                          <MiniSparkline values={weekData[team.id] ?? [0,0,0,0]} color={team.color} />
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
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm mb-6 uppercase">Top Performers — Week 2</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sr-stagger">
                {[
                  {label:"Top Points Earner",name:"Rahul Sharma",team:"Team Modi",teamColor:"#E67E22",value:"256 PTS",img:"/images/owner_modi.png"},
                  {label:"Top Referrer",name:"Priya Mehta",team:"Team Doval",teamColor:"#1E3A8A",value:"18 Referrals",img:"/images/owner_doval.png"},
                  {label:"Top Meetings",name:"Vikas Agarwal",team:"Team Modi",teamColor:"#E67E22",value:"21 Meetings",img:"/images/owner_shah.png"},
                  {label:"Top Growth",name:"Anil Desai",team:"Team Amit Shah",teamColor:"#C0392B",value:"₹24.8L",img:"/images/owner-portrait-4.jpg"},
                ].map((p)=>(
                  <div key={p.label} className="bg-white/[0.01] border border-white/5 rounded-xl p-5 text-center hover:bg-white/[0.03] transition-all">
                    <div className="font-montserrat text-white/55 text-[8px] uppercase tracking-widest mb-4">{p.label}</div>
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border border-white/20 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image fill src={p.img} alt={p.name} className="object-cover object-top" sizes="64px" />
                      </div>
                    </div>
                    <div className="font-cinzel tracking-wider text-white text-[11px] mb-1">{p.name}</div>
                    <div className="font-montserrat text-[8px] uppercase tracking-widest mb-3 text-white/60">{p.team}</div>
                    <div className="font-cinzel font-bold text-lg" style={{color:p.teamColor}}>{p.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="glass-card p-8 sticky top-24 border-white/10 sr bg-[#0D1424]">
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm mb-2 uppercase">Points Details</h3>
              <p className="font-montserrat text-white/55 text-[9px] uppercase tracking-widest mb-6 leading-relaxed">Total Points = Performance + Engagement + Impact</p>

              <div className="mb-6">
                <div className="font-montserrat text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-widest mb-3">Core Categories (Max 1,000 pts)</div>
                <div className="space-y-2">
                  {[["Business Growth","300 PTS"],["Referrals Generated","250 PTS"],["Meetings Conducted","200 PTS"],["One-to-Ones","150 PTS"],["Event Participation","100 PTS"]].map(([l,p])=>(
                    <div key={l} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="font-montserrat text-white/50 text-[10px] uppercase tracking-wider">{l}</span>
                      <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="font-montserrat text-[#D4AF37]/70 text-[9px] font-bold uppercase tracking-widest mb-3">Bonus Points (Max 500 pts)</div>
                <div className="space-y-2">
                  {[["Early Bird Bonus","+100"],["Perfect Week Bonus","+150"],["Consistency Bonus","+100"],["Mega Impact Bonus","+150"]].map(([l,p])=>(
                    <div key={l} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="font-montserrat text-white/50 text-[10px] uppercase tracking-wider">{l}</span>
                      <span className="font-montserrat text-green-400 text-[10px] font-bold">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="font-montserrat text-red-400/70 text-[9px] font-bold uppercase tracking-widest mb-3">Deductions</div>
                <div className="space-y-2">
                  {[["No Show","-25"],["Late Submission","-15"],["Incomplete Activity","-10"]].map(([l,p])=>(
                    <div key={l} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="font-montserrat text-white/50 text-[10px] uppercase tracking-wider">{l}</span>
                      <span className="font-montserrat text-red-400 text-[10px] font-bold">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white/[0.05] border border-white/5 rounded-xl text-center">
                <div className="font-montserrat text-white/60 text-[9px] uppercase tracking-widest mb-2">Max Possible Per Week</div>
                <div className="font-cinzel font-bold text-5xl text-[#D4AF37] mb-1">1,500</div>
                <div className="font-montserrat text-white/55 text-[9px] uppercase tracking-widest">PTS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LegacyCTA />
      <LiveTicker />
    </div>
  );
}
