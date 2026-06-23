import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight, Users, Trophy, Star, TrendingUp } from "lucide-react";
import { teams } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const TEAM_IMAGES: Record<string, string> = {
  modi: "/images/mascot-lion.jpg",
  doval: "/images/mascot-eagle.jpg",
  "amit-shah": "/images/mascot-tiger.jpg",
  jaishankar: "/images/mascot-lotus.jpg",
};

export async function generateStaticParams() {
  return teams.map((t) => ({ team: t.id }));
}

export default async function TeamPage({ params }: { params: Promise<{ team: string }> }) {
  const { team: id } = await params;
  const team = teams.find((t) => t.id === id);
  if (!team) notFound();

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 overflow-hidden" style={{background:`linear-gradient(135deg, #030810 0%, ${team.color}12 40%, ${team.color}08 70%, #030810 100%)`}}>
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(ellipse 60% 70% at 70% 50%, ${team.color}22 0%, transparent 70%)`}} />

        <div className="max-w-7xl mx-auto relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 font-montserrat text-xs text-white/30 mb-8">
            <Link href="/" className="hover:text-[#DAA537] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/teams" className="hover:text-[#DAA537] transition-colors">Teams</Link>
            <ChevronRight className="w-3 h-3" />
            <span style={{color:team.color}}>{team.fullName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-start">
            {/* Left */}
            <div>
              <h1 className="font-cinzel font-black leading-none mb-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-montserrat text-white/50 text-sm font-bold tracking-[0.4em] uppercase">{team.name.toUpperCase()}</span>
                  <div className="flex-1 h-px" style={{background:`linear-gradient(to right, ${team.color}60, transparent)`}} />
                </div>
                <span className="block text-shadow-gold" style={{fontSize:"clamp(72px,8vw,104px)",color:team.color,lineHeight:0.9,marginTop:"4px",textShadow:`0 0 60px ${team.color}60, 0 0 120px ${team.color}30`}}>
                  {team.fullName.split(" ").at(-1)!.toUpperCase()}
                </span>
              </h1>
              <div className="font-montserrat text-white/50 text-xs tracking-[0.25em] uppercase mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-[#DAA537]/50" />
                {team.motto}
                <span className="w-4 h-px bg-[#DAA537]/50" />
              </div>
              <p className="font-montserrat text-white/55 text-sm leading-relaxed mb-6 max-w-md">{team.description}</p>

              {/* Quick stats — inline pill row */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {[
                  {icon:<Users className="w-3.5 h-3.5"/>,n:String(team.members),l:"Members"},
                  {icon:<Trophy className="w-3.5 h-3.5"/>,n:"1",l:"Championships"},
                  {icon:<Star className="w-3.5 h-3.5"/>,n:team.points.toLocaleString(),l:"Points"},
                  {icon:<TrendingUp className="w-3.5 h-3.5"/>,n:`Rank #${team.rank}`,l:""},
                ].map((s,idx)=>(
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full font-montserrat text-xs text-white/70">
                    <span style={{color:team.color}}>{s.icon}</span>
                    <span className="font-bold" style={{color:team.color}}>{s.n}</span>
                    {s.l && <span className="text-white/40">{s.l}</span>}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#members" className="btn-primary text-xs py-2.5 px-6">VIEW TEAM MEMBERS <ArrowRight className="w-3.5 h-3.5"/></a>
                <a href="#performance" className="btn-secondary text-xs py-2.5 px-5" style={{borderColor:team.color,color:team.color}}>VIEW TEAM STATS <ArrowRight className="w-3.5 h-3.5"/></a>
              </div>
            </div>

            {/* Right — Full-height dramatic mascot image, no border box */}
            <div className="relative hidden lg:block" style={{minHeight:"540px"}}>
              {TEAM_IMAGES[team.id] ? (
                <>
                  <img
                    src={TEAM_IMAGES[team.id]}
                    alt={team.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      maskImage:"linear-gradient(to right, transparent 0%, black 25%, black 80%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)",
                      WebkitMaskImage:"linear-gradient(to right, transparent 0%, black 25%, black 80%, transparent 100%), linear-gradient(to top, transparent 0%, black 15%)",
                      maskComposite:"intersect",
                      WebkitMaskComposite:"destination-in",
                      filter:`brightness(0.85) saturate(1.4) contrast(1.05)`,
                    }}
                  />
                  {/* Team color glow overlay */}
                  <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(ellipse 70% 80% at 60% 50%, ${team.color}20 0%, ${team.color}08 50%, transparent 80%)`}} />
                  {/* Top atmospheric edge */}
                  <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{background:`linear-gradient(to bottom, ${team.color}15 0%, transparent 100%)`}} />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{background:`linear-gradient(135deg, ${team.color}15, #060d14)`}}>
                  <div className="font-cinzel font-black text-[8rem] leading-none" style={{color:team.color,filter:`drop-shadow(0 0 40px ${team.color}80)`}}>{team.name.charAt(0)}</div>
                </div>
              )}
              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{background:"linear-gradient(to top, #060d14 0%, transparent 100%)"}} />
              {/* Team flag card — absolute top-right */}
              <div className="absolute top-4 right-4 z-20 bg-[#060d14]/90 border rounded-xl p-3 text-center w-32" style={{borderColor:team.color}}>
                <div className="h-1 rounded-sm mb-2" style={{background:team.color}} />
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-black text-xl mx-auto mb-1" style={{background:`linear-gradient(135deg, ${team.color}40, ${team.color}20)`,border:`1px solid ${team.color}50`,color:team.color}}>{team.name.charAt(0)}</div>
                <div className="font-cinzel font-bold text-[10px] tracking-wider" style={{color:team.color}}>{team.name.toUpperCase()}</div>
                <div className="font-montserrat text-white/40 text-[8px] mt-0.5">{team.motto}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM INFO BAR */}
      <section className="py-5 px-4 sm:px-8 lg:px-12 border-y" style={{background:`linear-gradient(90deg, #060d14 0%, ${team.color}0a 50%, #060d14 100%)`, borderColor:`${team.color}30`}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {l:"Team Color",v:team.colorName,dot:true},
              {l:"Team Icon",v:team.mascot},
              {l:"Team Motto",v:`"${team.motto}"`},
              {l:"Leadership Style",v:team.owner.leadershipStyle ?? team.tagline},
            ].map((item)=>(
              <div key={item.l} className="flex items-start gap-2.5">
                {item.dot && (
                  <span className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{backgroundColor:team.color}} />
                )}
                <div>
                  <div className="font-montserrat text-white/35 text-[10px] uppercase tracking-widest mb-0.5">{item.l}</div>
                  <div className="font-montserrat font-semibold text-white text-xs leading-snug">{item.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPTAIN + OVERVIEW */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Captain card */}
          <div className="bg-[#0D1B2A] border border-[#DAA537]/20 rounded-2xl p-6 text-center">
            <div className="font-cinzel text-[#DAA537] font-bold text-xs mb-4 tracking-widest uppercase">Team Captain</div>
            <div className="w-24 h-24 border-2 rounded-full overflow-hidden mx-auto mb-4" style={{borderColor:team.color}}>
              <img src={`/images/owner-portrait-${["modi","doval","amit-shah","jaishankar"].indexOf(team.id)+1}.jpg`} alt={team.owner.name} className="w-full h-full object-cover" />
            </div>
            <div className="font-cinzel font-black text-white text-xl mb-0.5">{team.owner.name}</div>
            <div className="font-montserrat text-sm mb-4" style={{color:team.color}}>{team.tagline}</div>
            <blockquote className="font-montserrat text-white/45 text-sm italic leading-relaxed border-l-4 pl-4 py-2 text-left mb-5" style={{borderColor:team.color}}>
              &ldquo;{team.owner.quote}&rdquo;
            </blockquote>
            <Link href={`/owners/${team.owner.id}`} className="btn-primary w-full justify-center text-xs py-2.5">
              View Owner Profile <ArrowRight className="w-3 h-3"/>
            </Link>
          </div>

          {/* Overview stats */}
          <div className="lg:col-span-2 bg-[#0D1B2A] border border-[#DAA537]/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base uppercase tracking-wider">Team Overview</h3>
              <div className="flex-1 h-px" style={{background:`linear-gradient(to right, ${team.color}40, transparent)`}} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                {l:"Rank",v:`${team.rank}`},
                {l:"Total Points",v:team.points.toLocaleString()},
                {l:"Win Rate",v:team.winRate},
                {l:"Points Trend",v:"W1 → W2 →"},
              ].map((s)=>(
                <div key={s.l} className="text-center p-4 bg-white/5 rounded-xl border border-white/5" style={s.l==="Rank" ? {borderColor:`${team.color}40`,background:`${team.color}08`} : {}}>
                  <div className={`font-cinzel font-bold text-white ${s.l==="Rank" ? "text-4xl" : "text-2xl"}`} style={s.l==="Rank" ? {color:team.color,textShadow:`0 0 20px ${team.color}60`} : {}}>{s.v}</div>
                  <div className="font-montserrat text-white/35 text-[10px] uppercase mt-1">{s.l}</div>
                  {s.l==="Rank" && <div className="font-montserrat text-white/25 text-[9px] uppercase tracking-widest mt-0.5">OUT OF 4 TEAMS</div>}
                </div>
              ))}
            </div>
            <p className="font-montserrat text-white/55 text-sm leading-relaxed">{team.description}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[{l:"Business",v:team.business,c:team.color},{l:"Referrals",v:String(team.referrals),c:team.color},{l:"Meetings",v:String(team.meetings),c:team.color}].map(s=>(
                <div key={s.l} className="text-center p-3 rounded-xl border" style={{borderColor:s.c+"30",backgroundColor:s.c+"08"}}>
                  <div className="font-cinzel font-bold text-xl" style={{color:s.c}}>{s.v}</div>
                  <div className="font-montserrat text-white/40 text-[10px] uppercase mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section id="members" className="py-14 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-7">
            <h2 className="font-cinzel font-bold text-white text-2xl">Team Members ({team.members})</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#DAA537]/30 to-transparent" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {team.weeklyMembers.map((m,i)=>(
              <div key={m.name} className="bg-[#060d14] border border-[#DAA537]/12 rounded-xl p-4 text-center hover:border-[#DAA537]/40 hover:-translate-y-0.5 transition-all">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-cinzel font-bold text-base mx-auto mb-2 flex-shrink-0" style={{background:`linear-gradient(135deg, ${team.color}50, ${team.color}25)`,border:`2px solid ${team.color}60`,color:team.color,boxShadow:`0 0 10px ${team.color}30`}}>{m.name.charAt(0)}</div>
                <div className="font-montserrat font-bold text-white text-[11px] leading-tight mb-0.5">{m.name}</div>
                <div className="font-montserrat text-white/35 text-[10px] mb-1.5">{m.industry}</div>
                <div className="font-cinzel font-bold text-sm" style={{color:team.color}}>{m.points} pts</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section id="performance" className="py-14 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-cinzel font-bold text-white text-2xl">Team Performance</h2>
            <span className="font-montserrat text-white/30 text-xs ml-auto">Updated Every Wednesday @ 8:00 PM</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Combined Radar + Progress Bars card */}
            <div className="bg-[#0D1B2A] border border-[#DAA537]/20 rounded-2xl p-6">
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base mb-4 uppercase tracking-wider">Team Performance</h3>
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Left sub-column: radar chart */}
                {(() => {
                  const perf = [team.performance.visitors, team.performance.referrals, team.performance.tyfcb, team.performance.oneToOnes, team.performance.attendance];
                  const labels = ["Visitors", "Referrals", "TYFCB", "One-to-Ones", "Attendance"];
                  const cx = 110, cy = 110, R = 80;
                  const angles = Array.from({length:5}, (_,i) => -Math.PI/2 + (2*Math.PI*i)/5);
                  const gridPcts = [25,50,75,100];
                  const gridPolygons = gridPcts.map(pct =>
                    angles.map(a => `${(cx + R*(pct/100)*Math.cos(a)).toFixed(1)},${(cy + R*(pct/100)*Math.sin(a)).toFixed(1)}`).join(" ")
                  );
                  const dataPoints = angles.map((a,i) =>
                    `${(cx + R*(perf[i]/100)*Math.cos(a)).toFixed(1)},${(cy + R*(perf[i]/100)*Math.sin(a)).toFixed(1)}`
                  ).join(" ");
                  const labelPos = angles.map((a,i) => ({
                    x: cx + (R+22)*Math.cos(a), y: cy + (R+22)*Math.sin(a), label: labels[i],
                  }));
                  return (
                    <div className="flex flex-col items-center flex-shrink-0">
                      <svg viewBox="0 0 220 220" className="w-full max-w-[200px]">
                        {gridPolygons.map((pts, gi) => (
                          <polygon key={gi} points={pts} fill="none" stroke="rgba(218,165,55,0.12)" strokeWidth="1" />
                        ))}
                        {angles.map((a,i) => (
                          <line key={i} x1={cx} y1={cy} x2={(cx+R*Math.cos(a)).toFixed(1)} y2={(cy+R*Math.sin(a)).toFixed(1)} stroke="rgba(218,165,55,0.15)" strokeWidth="1" />
                        ))}
                        <polygon points={dataPoints} fill={`${team.color}30`} stroke={team.color} strokeWidth="2" />
                        {angles.map((a,i) => (
                          <circle key={i} cx={(cx + R*(perf[i]/100)*Math.cos(a)).toFixed(1)} cy={(cy + R*(perf[i]/100)*Math.sin(a)).toFixed(1)} r="4" fill={team.color} />
                        ))}
                        {labelPos.map((lp,i) => (
                          <text key={i} x={lp.x.toFixed(1)} y={(lp.y+4).toFixed(1)} textAnchor="middle" fontSize="8" fontFamily="Montserrat" fill="rgba(255,255,255,0.5)">{lp.label}</text>
                        ))}
                      </svg>
                    </div>
                  );
                })()}

                {/* Right sub-column: progress bars */}
                <div className="flex-1 space-y-3 flex flex-col justify-center">
                  {[
                    {l:"Visitors",v:team.performance.visitors},
                    {l:"Referrals",v:team.performance.referrals},
                    {l:"TYFCB",v:team.performance.tyfcb},
                    {l:"One-to-Ones",v:team.performance.oneToOnes},
                    {l:"Attendance",v:team.performance.attendance},
                  ].map((p)=>(
                    <div key={p.l}>
                      <div className="flex justify-between mb-1">
                        <span className="font-montserrat text-white/55 text-xs">{p.l}</span>
                        <span className="font-montserrat font-bold text-xs" style={{color:team.color}}>{p.v}%</span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{width:`${p.v}%`,background:`linear-gradient(90deg, ${team.color}, ${team.color}80)`}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Points — full width below both columns */}
              <div className="mt-5 p-4 rounded-xl border" style={{borderColor:team.color+"30",backgroundColor:team.color+"08"}}>
                <div className="font-montserrat text-white/40 text-[11px] uppercase mb-1">Total Points</div>
                <div className="font-cinzel font-black text-4xl" style={{color:team.color}}>{team.points.toLocaleString()}</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#0D1B2A] border border-[#DAA537]/20 rounded-2xl p-6">
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base mb-4 uppercase tracking-wider">Team Achievements</h3>
              <div className="space-y-2.5">
                {team.achievements.map((a)=>(
                  <div key={a.title} className="flex gap-3 p-3.5 bg-white/5 border border-[#DAA537]/12 rounded-xl hover:border-[#DAA537]/35 transition-all">
                    <div className="w-7 h-7 rounded-full bg-[#DAA537]/20 border border-[#DAA537]/40 flex items-center justify-center flex-shrink-0"><Trophy className="w-3.5 h-3.5 text-[#DAA537]"/></div>
                    <div>
                      <div className="font-cinzel font-bold text-white text-sm">{a.title}</div>
                      <div className="font-montserrat text-white/45 text-xs mt-0.5">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM MOTTO CTA */}
      <section className="relative py-16 px-4 sm:px-8 lg:px-12 overflow-hidden" style={{background:`linear-gradient(135deg, #030810 0%, ${team.color}15 50%, #030810 100%)`}}>
        <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(ellipse 60% 50% at 50% 50%, ${team.color}10 0%, transparent 70%)`}} />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="w-32 h-0.5 mx-auto mb-8" style={{background:`linear-gradient(90deg, transparent, ${team.color}80, transparent)`}} />
          <h2 className="font-cinzel font-black text-white mb-3" style={{fontSize:"clamp(28px,4vw,52px)"}}>
            ONE TEAM. ONE VISION. <span style={{color:team.color}}>ONE LEGACY.</span>
          </h2>
          <p className="font-montserrat text-white/50 text-base mb-6">Compete. Collaborate. Create Impact.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/leaderboard" className="btn-primary">View Leaderboard <ArrowRight className="w-4 h-4"/></Link>
            <Link href="/wall-of-fame" className="btn-secondary">Wall of Fame <ArrowRight className="w-4 h-4"/></Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
