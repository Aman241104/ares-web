import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { teams } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

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
  const sorted = [...teams].sort((a, b) => a.rank - b.rank);
  const weekData: Record<string, number[]> = {
    modi: [520, 765, 920, 1285],
    doval: [480, 660, 820, 1160],
    "amit-shah": [430, 600, 760, 1076],
    jaishankar: [380, 540, 700, 945],
  };
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{background:"linear-gradient(135deg, #060d14 0%, #0a1520 60%, #060d14 100%)", minHeight:"260px"}}>
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none hidden lg:block" style={{width:"45%",background:"radial-gradient(ellipse 60% 80% at 80% 50%, rgba(218,165,55,0.12) 0%, transparent 70%)"}} />
        <div className="absolute right-0 top-0 bottom-0 hidden lg:flex items-center pr-12" style={{width:"35%"}}>
          <img src="/images/hero-trophy.jpg" alt="Trophy" className="h-full w-full object-cover object-center opacity-90" style={{maskImage:"linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)", WebkitMaskImage:"linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)"}} />
        </div>
        <div className="max-w-7xl mx-auto relative px-4 sm:px-8 lg:px-12 py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full pulse-live block"/>
              <span className="font-montserrat text-green-400 text-[11px] font-bold tracking-[0.4em] uppercase">Live Rankings</span>
            </div>
            <h1 className="font-cinzel font-black text-shadow-gold mb-3" style={{fontSize:"clamp(56px,8vw,110px)",color:"#DAA537",lineHeight:0.9}}>LEADER<br/>BOARD</h1>
            <div className="w-24 h-0.5 mb-4" style={{background:"linear-gradient(90deg, #DAA537, transparent)"}} />
            <div className="font-montserrat text-white/70 text-sm font-bold tracking-[0.3em] uppercase mb-2">LIVE STANDINGS. REAL IMPACT.</div>
            <p className="font-montserrat text-white/40 text-sm">Updated every Wednesday @ 8:00 PM</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Table + Filters */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {["Week 2 (Current)","All Teams","All Categories","Reset Filters"].map((f,i) => (
                <button key={f} className={`font-montserrat text-[11px] font-bold px-4 py-2 rounded-lg border transition-all uppercase tracking-wider ${i===3?"border-red-500/30 text-red-400 hover:bg-red-500/10":"border-[#DAA537]/25 text-[#DAA537] hover:bg-[#DAA537]/8"}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-[#060d14] border border-[#DAA537]/20 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-1 px-5 py-3 bg-[#DAA537]/5 border-b border-[#DAA537]/15">
                {[["col-span-1","Rank"],["col-span-4","Team"],["col-span-2 text-right","Total Pts"],["col-span-2 text-right","Wk2 Pts"],["col-span-2 text-center","Trend"],["col-span-1 text-center","↕"]].map(([cls,h])=>(
                  <div key={h} className={`${cls} font-montserrat text-[#DAA537] text-[10px] font-bold uppercase tracking-wider`}>{h}</div>
                ))}
              </div>

              {sorted.map((team,i)=>(
                <div key={team.id} className={`grid grid-cols-12 gap-1 px-5 py-4 lb-row items-center relative`} style={{
                  background: i===0 ? `linear-gradient(90deg, ${team.color}12 0%, rgba(218,165,55,0.04) 40%, transparent 100%)` : undefined,
                  borderLeft: `3px solid ${i < 3 ? team.color : 'transparent'}`,
                }}>
                  <div className="col-span-1 flex flex-col items-center gap-0.5">
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center relative" style={{
                      borderColor:i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"rgba(255,255,255,0.15)",
                      background:i===0?"radial-gradient(circle, rgba(255,215,0,0.18), rgba(255,215,0,0.06))":i===1?"rgba(192,192,192,0.08)":i===2?"rgba(205,127,50,0.08)":"transparent",
                      boxShadow:i===0?"0 0 15px rgba(255,215,0,0.4)":i===1?"0 0 8px rgba(192,192,192,0.2)":undefined,
                    }}>
                      <span className="font-cinzel font-black text-base" style={{color:i===0?"#FFD700":i===1?"#C0C0C0":i===2?"#CD7F32":"rgba(255,255,255,0.3)"}}>{i+1}</span>
                    </div>
                  </div>
                  <div className="col-span-4 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel font-black text-sm flex-shrink-0" style={{background:`linear-gradient(135deg, ${team.color}55, ${team.color}30)`,border:`2px solid ${team.color}70`,color:team.color}}>{team.name.charAt(0)}</div>
                    <div>
                      <Link href={`/teams/${team.id}`} className="font-cinzel font-bold text-sm leading-tight hover:opacity-75 transition-opacity block" style={{color:team.color}}>{team.name.toUpperCase()}</Link>
                      <div className="font-montserrat text-white/35 text-[11px]">{team.fullName.split(" ").at(-1)}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-cinzel font-bold text-2xl text-[#DAA537]">{team.points.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-cinzel font-bold text-base text-white/60">{team.weekPoints}</span>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <MiniSparkline values={weekData[team.id] ?? [0,0,0,0]} color={team.color} />
                  </div>
                  <div className="col-span-1 text-center">
                    {i===1?<span className="font-montserrat text-green-400 text-xs font-bold">▲1</span>:i===2?<span className="font-montserrat text-red-400 text-xs font-bold">▼1</span>:<span className="font-montserrat text-white/25 text-xs">—</span>}
                  </div>
                </div>
              ))}

              <div className="px-5 py-4 text-center border-t border-[#DAA537]/10">
                <a href="#analytics" className="font-montserrat text-[#DAA537] text-sm font-semibold hover:underline inline-flex items-center gap-1">
                  View Detailed Analytics <ArrowRight className="w-3 h-3"/>
                </a>
              </div>
            </div>

            {/* Points Trend SVG Line Chart */}
            <div id="analytics" className="bg-[#060d14] border border-[#DAA537]/20 rounded-2xl p-6">
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base mb-5 uppercase tracking-wider">Points Trend (Last 4 Weeks)</h3>
              {(() => {
                const chartW = 500, chartH = 180, padL = 40, padR = 20, padT = 10, padB = 30;
                const w = chartW - padL - padR, h = chartH - padT - padB;
                const maxPts = 1500;
                const weeks = ["Week 1","Week 2","Week 3","Week 4"];
                const yTicks = [0, 400, 800, 1200];
                return (
                  <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full">
                    {/* Grid lines */}
                    {yTicks.map(v => {
                      const y = padT + h - (v/maxPts)*h;
                      return (
                        <g key={v}>
                          <line x1={padL} y1={y.toFixed(1)} x2={padL+w} y2={y.toFixed(1)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                          <text x={(padL-4).toFixed(1)} y={(y+4).toFixed(1)} textAnchor="end" fontSize="8" fontFamily="Cinzel" fill="rgba(255,255,255,0.3)">{v}</text>
                        </g>
                      );
                    })}
                    {/* Week labels */}
                    {weeks.map((wk,i) => (
                      <text key={wk} x={(padL + (i/(weeks.length-1))*w).toFixed(1)} y={(chartH-4).toFixed(1)} textAnchor="middle" fontSize="8" fontFamily="Montserrat" fill="rgba(255,255,255,0.3)">{wk}</text>
                    ))}
                    {/* Team lines */}
                    {sorted.map((team) => {
                      const pts = weekData[team.id] ?? [];
                      const points = pts.map((v,i) => `${(padL + (i/(pts.length-1))*w).toFixed(1)},${(padT + h - (v/maxPts)*h).toFixed(1)}`).join(" ");
                      return (
                        <g key={team.id}>
                          <polyline points={points} fill="none" stroke={team.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          {pts.map((v,i) => (
                            <circle key={i} cx={(padL + (i/(pts.length-1))*w).toFixed(1)} cy={(padT + h - (v/maxPts)*h).toFixed(1)} r="3" fill={team.color} />
                          ))}
                        </g>
                      );
                    })}
                  </svg>
                );
              })()}
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-white/5">
                {sorted.map(team=>(
                  <div key={team.id} className="flex items-center gap-1.5">
                    <div className="w-3 h-0.5 rounded-full" style={{backgroundColor:team.color}} />
                    <span className="font-montserrat text-white/40 text-[11px]">{team.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-[#060d14] border border-[#DAA537]/20 rounded-2xl p-6">
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base mb-5 uppercase tracking-wider">Key Insights</h3>
              <div className="space-y-3">
                {[
                  {text:"Visionaries lead with consistent performance across all categories",color:"#E67E22"},
                  {text:"Strategists show strong growth in Referrals & Meetings",color:"#1E3A8A"},
                  {text:"Warriors are ramping up in high-impact events",color:"#C0392B"},
                  {text:"Diplomats show high engagement in community activities",color:"#27AE60"},
                ].map((ins)=>(
                  <div key={ins.text} className="flex items-start gap-3 p-3.5 rounded-xl border transition-all hover:-translate-x-0.5" style={{background:"rgba(255,255,255,0.025)",borderColor:"rgba(255,255,255,0.06)"}}>
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style={{backgroundColor:ins.color}} />
                    <p className="font-montserrat text-white/55 text-xs leading-relaxed">{ins.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <Link href="#" className="font-montserrat text-[#DAA537] text-xs font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1">
                  View Full Analytics <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-[#060d14] border border-[#DAA537]/20 rounded-2xl p-6">
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base mb-5 uppercase tracking-wider">Top Performers — Week 2</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {label:"Top Points Earner",name:"Rahul Sharma",team:"Team Modi",teamColor:"#E67E22",value:"256 PTS",img:"/images/owner-portrait-1.jpg"},
                  {label:"Top Referrer",name:"Priya Mehta",team:"Team Doval",teamColor:"#1E3A8A",value:"18 Referrals",img:"/images/owner-portrait-2.jpg"},
                  {label:"Top Meetings",name:"Vikas Agarwal",team:"Team Modi",teamColor:"#E67E22",value:"21 Meetings",img:"/images/owner-portrait-3.jpg"},
                  {label:"Top Growth",name:"Anil Desai",team:"Team Amit Shah",teamColor:"#C0392B",value:"₹24.8L",img:"/images/owner-portrait-4.jpg"},
                ].map((p)=>(
                  <div key={p.label} className="bg-[#0D1B2A] border border-[#DAA537]/15 rounded-xl p-4 text-center hover:border-[#DAA537]/40 transition-all">
                    <div className="font-montserrat text-white/35 text-[10px] uppercase tracking-wider mb-3">{p.label}</div>
                    <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 border-2" style={{borderColor:p.teamColor}}>
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="font-cinzel font-bold text-white text-xs mb-0.5">{p.name}</div>
                    <div className="font-montserrat text-[10px] mb-2" style={{color:p.teamColor}}>{p.team}</div>
                    <div className="font-cinzel font-black text-lg" style={{color:p.teamColor}}>{p.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Points Details Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#060d14] border border-[#DAA537]/25 rounded-2xl p-5 sticky top-24" style={{boxShadow:"0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(218,165,55,0.1)"}}>
              <h3 className="font-cinzel font-bold text-[#DAA537] text-sm mb-1 uppercase tracking-wider">Points Details</h3>
              <p className="font-montserrat text-white/35 text-[11px] mb-4">Total Points = Performance + Engagement + Impact</p>

              <div className="mb-4">
                <div className="font-montserrat text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2.5">Core Categories (Max 1,000 pts)</div>
                <div className="space-y-1.5">
                  {[["Business Growth","300 PTS"],["Referrals Generated","250 PTS"],["Meetings Conducted","200 PTS"],["One-to-Ones","150 PTS"],["Event Participation","100 PTS"]].map(([l,p])=>(
                    <div key={l} className="flex justify-between items-center py-1.5 border-b border-white/4 last:border-0">
                      <span className="font-montserrat text-white/55 text-xs">{l}</span>
                      <span className="font-montserrat text-[#DAA537] text-xs font-bold">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="font-montserrat text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2.5">Bonus Points (Max 500 pts)</div>
                <div className="space-y-1.5">
                  {[["Early Bird Bonus","+100"],["Perfect Week Bonus","+150"],["Consistency Bonus","+100"],["Mega Impact Bonus","+150"]].map(([l,p])=>(
                    <div key={l} className="flex justify-between items-center py-1.5 border-b border-white/4 last:border-0">
                      <span className="font-montserrat text-white/55 text-xs">{l}</span>
                      <span className="font-montserrat text-green-400 text-xs font-bold">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <div className="font-montserrat text-white/50 text-[10px] font-bold uppercase tracking-wider mb-2.5">Deductions</div>
                <div className="space-y-1.5">
                  {[["No Show","-25"],["Late Submission","-15"],["Incomplete Activity","-10"]].map(([l,p])=>(
                    <div key={l} className="flex justify-between items-center py-1.5 border-b border-white/4 last:border-0">
                      <span className="font-montserrat text-white/55 text-xs">{l}</span>
                      <span className="font-montserrat text-red-400 text-xs font-bold">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#DAA537]/10 border-2 border-[#DAA537]/40 rounded-xl text-center py-5">
                <div className="font-montserrat text-white/40 text-[11px] mb-1">Max Possible Per Week</div>
                <div className="font-cinzel font-black text-5xl text-[#DAA537] leading-none">1,500</div>
                <div className="font-montserrat text-white/35 text-xs">PTS</div>
              </div>

              <div className="mt-4 p-4 border border-[#DAA537]/15 rounded-xl bg-[#DAA537]/4">
                <blockquote className="font-cinzel text-[#DAA537] text-xs italic leading-relaxed">
                  &ldquo;The leaderboard is not just about competition. It&rsquo;s about commitment, consistency and creating impact together.&rdquo;
                </blockquote>
                <div className="font-montserrat text-white/35 text-[10px] mt-2">— ARES Business League</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
