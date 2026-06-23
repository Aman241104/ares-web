"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, Trophy, Calendar, Target, Briefcase, Sword, BookOpen, Image as ImageIcon, Phone, Building2 } from "lucide-react";
import { teams, blogPosts, partners } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

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
      const title = new SplitType(".h-title-ares", { types: "chars" });
      const bl = new SplitType(".h-title-bl", { types: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 50, rotateX: -90, stagger: 0.05, duration: 1, ease: "back.out(1.7)" }, "-=0.4")
        .from(bl.chars, { opacity: 0, x: -20, stagger: 0.02, duration: 0.8 }, "-=0.5")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-btns", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-stats", { opacity: 0, y: 15, duration: 0.8, stagger: 0.1 }, "-=0.5");

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;

    gsap.to(".parallax-bg", { x: xPos * 2, y: yPos * 2, duration: 1, ease: "power2.out" });
    gsap.to(".parallax-fg", { x: -xPos * 3, y: -yPos * 3, duration: 1, ease: "power2.out" });
  };

  return (
    <div ref={heroRef} className="overflow-x-hidden bg-[#000000]">

      {/* ═══════════════════════════════════════════
          HERO (CINEMATIC)
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove}>
        {/* Background Image */}
        <div className="absolute inset-[-5%] z-0 parallax-bg" style={{ width: "110%", height: "110%" }}>
          <Image 
            src="/images/hero_arena.png"
            alt="Hero Arena"
            fill
            sizes="100vw"
            className="object-cover object-center scale-105"
            priority
          />
          {/* Overlays for readable text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12 w-full parallax-fg">
          <div className="max-w-2xl">
            <div className="h-badge inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-live block" />
              <span className="font-montserrat text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase">Nation Builders Edition 2026</span>
            </div>

            <div className="mb-8">
              <h1 className="font-cinzel font-light leading-[1.1]">
                <span className="h-title-ares block text-white tracking-widest" style={{ fontSize: "clamp(32px, 8vw, 110px)" }}>ARES</span>
                <span className="h-title-bl block text-[#D4AF37] tracking-[0.2em]" style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}>BUSINESS LEAGUE</span>
              </h1>
            </div>

            <div className="h-sub mb-10">
              <p className="font-montserrat text-white/60 text-base sm:text-lg tracking-[0.1em] mb-4 max-w-xl leading-relaxed">
                4 Teams. 4 Leaders. 1 Mission. Experience the ultimate high-stakes corporate tournament.
              </p>
              <p className="font-montserrat text-[#D4AF37]/80 text-xs font-medium tracking-[0.2em] uppercase">
                June 24 – July 22, 2026
              </p>
            </div>

            <div className="h-btns flex flex-wrap gap-4 mb-14">
              <Link href="/teams" className="btn-primary">
                Explore Teams <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/leaderboard" className="btn-secondary">
                View Leaderboard
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 sm:gap-12 mt-4 sm:mt-0">
              {[
                { n: "30", l: "Business Owners" },
                { n: "4",  l: "Teams" },
                { n: "1",  l: "Month" },
                { n: "1",  l: "Winner" },
              ].map((s, i) => (
                <div key={s.l} className={`h-stats flex flex-col items-start w-[40%] sm:w-auto ${i > 1 ? "hidden sm:flex" : ""}`}>
                  <div className="font-cinzel font-light text-3xl sm:text-4xl text-white mb-1 sm:mb-2">{s.n}</div>
                  <div className="font-montserrat text-white/40 text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          LIVE LEADERBOARD + THIS WEEK'S HIGHLIGHT
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Leaderboard table */}
            <div className="lg:col-span-2 sr">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="font-montserrat text-white font-medium text-xs tracking-[0.3em] uppercase">Live Leaderboard</h2>
                  <span className="flex items-center gap-2 bg-green-500/5 border border-green-500/20 rounded-full px-3 py-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-live block" />
                    <span className="font-montserrat text-green-400/80 text-[9px] font-bold uppercase tracking-[0.2em]">Live</span>
                  </span>
                </div>
              </div>

              <div className="glass-card overflow-hidden">
                <div className="w-full overflow-x-auto custom-scrollbar">
                  <div className="min-w-[600px]">
                    <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                      <div className="col-span-1 font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em]">Rank</div>
                      <div className="col-span-6 font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em]">Team</div>
                      <div className="col-span-2 font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em] text-right">Points</div>
                      <div className="col-span-2 font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em] text-right">Week</div>
                      <div className="col-span-1 font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em] text-center">Trend</div>
                    </div>

                    {sorted.map((team, i) => (
                      <div key={team.id} className="grid grid-cols-12 px-6 py-5 items-center border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <div className="col-span-1">
                          <div className="font-cinzel text-lg" style={{color: i===0?"#D4AF37":i===1?"#C0C0C0":i===2?"#CD7F32":"rgba(255,255,255,0.3)"}}>0{i+1}</div>
                        </div>
                        <div className="col-span-6 flex items-center gap-4">
                          <TeamCrest teamId={team.id} color={team.color} size="md" />
                          <div>
                            <div className="font-cinzel text-white text-sm tracking-widest uppercase">
                              {team.name}
                            </div>
                            <div className="font-montserrat text-[10px] mt-1 tracking-widest uppercase" style={{color:team.color}}>{team.fullName.split(" ").at(-1)}</div>
                          </div>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="font-cinzel text-xl text-[#D4AF37]">{team.points.toLocaleString()}</span>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className="font-montserrat text-xs text-white/40 tracking-wider">{team.weekPoints}</span>
                        </div>
                        <div className="col-span-1 flex justify-center opacity-70">
                          <MiniSparkline values={weekData[team.id] ?? [0,0,0,0]} color={team.color} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-5 text-center">
                  <Link href="/leaderboard" className="font-montserrat text-white/50 hover:text-white transition-colors text-[10px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
                    View Full Standings <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Race to Glory */}
            <div className="sr">
              <div className="glass-card p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <Trophy className="w-5 h-5 text-[#D4AF37]/80" />
                  <h3 className="font-montserrat text-white font-medium text-xs tracking-[0.3em] uppercase">League Metrics</h3>
                </div>
                
                <div className="flex flex-col gap-4 flex-1">
                  {[
                    { label: "TYFCB Generated", value: "₹3.4M", icon: <Briefcase className="w-4 h-4 text-white/30" /> },
                    { label: "Referrals Passed", value: "610", icon: <Users className="w-4 h-4 text-white/30" /> },
                    { label: "1-2-1 Meetings", value: "1,078", icon: <Calendar className="w-4 h-4 text-white/30" /> },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/[0.02] border border-white/5 rounded-sm p-5 hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em]">{m.label}</div>
                        {m.icon}
                      </div>
                      <div className="font-cinzel text-white text-3xl">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TEAM SPOTLIGHT
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sr text-center">
            <h2 className="font-montserrat text-white font-medium text-xs tracking-[0.3em] uppercase mb-4">The Factions</h2>
            <div className="w-12 h-px bg-[#D4AF37]/50 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
            {sorted.map((team) => {
              const portraits: Record<string, string> = {
                modi: "/images/mascot_lion.png",
                doval: "/images/mascot_eagle.png",
                "amit-shah": "/images/mascot_tiger.png",
                jaishankar: "/images/mascot_lotus.png",
              };
              const portrait = portraits[team.id];
              return (
                <Link key={team.id} href={`/teams/${team.id}`} className="group block">
                  <div className="glass-card p-2 hover:bg-white/[0.05] transition-all duration-500">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                      <Image 
                        src={portrait} 
                        alt={team.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="font-cinzel text-white text-xl tracking-widest mb-1">{team.name}</div>
                        <div className="font-montserrat text-[9px] uppercase tracking-[0.2em]" style={{color:team.color}}>{team.fullName.split(" ").at(-1)}</div>
                      </div>
                    </div>
                    
                    <div className="px-3 pb-3">
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-montserrat text-white/30 text-[9px] uppercase tracking-widest">Rank 0{team.rank}</div>
                        <div className="font-montserrat text-white/30 text-[9px] uppercase tracking-widest">{team.points} Pts</div>
                      </div>
                      <div className="w-full flex items-center justify-center gap-2 font-montserrat text-[9px] text-white/50 uppercase tracking-[0.2em] py-3 border border-white/5 group-hover:border-white/20 group-hover:text-white transition-colors">
                        View Dossier <ArrowRight className="w-3 h-3" />
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
          BLOG & PARTNERS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Blog */}
          <div>
            <div className="sr flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <h2 className="font-montserrat text-white font-medium text-xs tracking-[0.3em] uppercase">Intelligence</h2>
              <Link href="/blog" className="font-montserrat text-white/40 hover:text-white transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
                All Entries <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-6 sr-stagger">
              {blogPosts.slice(0, 3).map((post, i) => {
                const blogImg = i === 0 ? "/images/luxury_boardroom.png" : undefined;
                return (
                  <article key={post.id} className="group flex gap-6 items-center">
                    <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden bg-white/5">
                      {blogImg ? (
                        <Image src={blogImg} alt={post.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-montserrat text-[#D4AF37]/80 text-[9px] tracking-[0.2em] uppercase mb-2">{post.date}</div>
                      <h3 className="font-cinzel text-white text-base mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">{post.title}</h3>
                      <Link href={`/blog/${post.id}`} className="font-montserrat text-white/40 text-[9px] uppercase tracking-[0.2em] group-hover:text-white transition-colors flex items-center gap-2 mt-3">
                        Read <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Partners */}
          <div>
            <div className="sr flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <h2 className="font-montserrat text-white font-medium text-xs tracking-[0.3em] uppercase">Partners</h2>
              <Link href="/partners" className="font-montserrat text-white/40 hover:text-white transition-colors text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-2">
                All Partners <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sr-stagger mb-8">
              {partners.slice(0,6).map((p) => (
                <div key={p.name} className="bg-white/[0.02] border border-white/5 p-6 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors aspect-square">
                  <Building2 className="w-5 h-5 text-white/20 mb-3" />
                  <div className="font-cinzel text-white/80 text-xs mb-1">{p.name}</div>
                  <div className="font-montserrat text-[#D4AF37]/60 text-[8px] uppercase tracking-widest">{p.tier.replace(" Partner","")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TOURNAMENT EVENTS & QUICK LINKS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000] border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Quick Links */}
          <div>
            <div className="sr mb-8 pb-4 border-b border-white/5">
              <h2 className="font-montserrat text-white font-medium text-xs tracking-[0.3em] uppercase">Quick Access</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sr-stagger">
              {[
                { href: "/gallery", icon: <ImageIcon className="w-5 h-5 text-[#D4AF37]" />, title: "Gallery", desc: "Event photos & media" },
                { href: "/rules", icon: <BookOpen className="w-5 h-5 text-[#D4AF37]" />, title: "Rules", desc: "Tournament guidelines" },
                { href: "/schedule", icon: <Calendar className="w-5 h-5 text-[#D4AF37]" />, title: "Schedule", desc: "Upcoming dates" },
                { href: "/contact", icon: <Phone className="w-5 h-5 text-[#D4AF37]" />, title: "Contact", desc: "Get in touch" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="group block">
                  <div className="glass-card p-6 flex flex-col hover:bg-white/[0.04] transition-colors h-full">
                    <div className="mb-4">{link.icon}</div>
                    <div className="font-cinzel text-white text-lg mb-1 group-hover:text-[#D4AF37] transition-colors">{link.title}</div>
                    <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest">{link.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
