"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, Star, Award, Trophy, Building2, Shield } from "lucide-react";
import { teams, partners, commissioners } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

const mascotImages: Record<string, string> = {
  "modi": "/images/mascot_lion.png",
  "doval": "/images/mascot_eagle.png",
  "amit-shah": "/images/mascot_tiger.png",
  "jaishankar": "/images/mascot_lotus.png",
};

export default function WallOfFamePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-img", { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 1.2 }, "-=1");

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

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(212,175,55,0.08) 0%, transparent 65%)" }}/>
        
        {/* Trophy image right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block overflow-hidden h-img">
          <img
            src="/images/hero-trophy.jpg"
            alt="Championship Trophy"
            className="h-full w-full object-cover object-left"
            style={{
              maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, transparent 100%)",
              opacity: 0.8,
            }}
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 70% 50%, rgba(212,175,55,0.1) 0%, transparent 60%)" }} />
        </div>

        <div className="max-w-7xl mx-auto relative px-6 sm:px-10 lg:px-16 w-full z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8 h-badge">
              <div className="w-12 h-px bg-white/10" />
              <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Honoring Excellence</span>
            </div>
            
            <h1 className="h-title font-cinzel font-light text-white mb-8 leading-[1.1]" style={{ fontSize: "clamp(38px,8vw,100px)" }}>
              WALL OF<br/>
              <span className="text-[#D4AF37] italic">FAME</span>
            </h1>
            
            <div className="w-24 h-px mb-8 bg-white/20" />
            
            <p className="h-sub font-montserrat text-white/50 text-sm tracking-wide leading-relaxed max-w-xl mb-12">
              The ARES Business League stands strong because of the incredible vision, support and commitment of our partners, team owners and commissioners. Your belief is building a lasting legacy.
            </p>
            
            <Link href="/contact" className="btn-primary">
              Join the Legacy <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5 sr">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
          {[
            { num: "18+", label: "Trusted Partners", icon: <Users className="w-6 h-6 text-[#D4AF37]" /> },
            { num: "4", label: "Visionary Leaders", icon: <Star className="w-6 h-6 text-[#D4AF37]" /> },
            { num: "6", label: "League Guardians", icon: <Shield className="w-6 h-6 text-[#D4AF37]" /> },
            { num: "One", label: "Unified Mission", icon: <Trophy className="w-6 h-6 text-[#D4AF37]" /> },
          ].map((s) => (
            <div key={s.label} className="p-8 glass-card border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#D4AF37]/5 border border-[#D4AF37]/20">
                  {s.icon}
                </div>
              </div>
              <div className="font-cinzel font-light text-4xl text-white mb-2">{s.num}</div>
              <div className="font-montserrat text-[#D4AF37] text-[10px] uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000] sr">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">Our <span className="text-[#D4AF37] italic">Partners</span></h2>
              </div>
              <p className="font-montserrat text-white/50 text-sm pl-12 max-w-lg leading-relaxed">Heartfelt thanks to our partners who believe in our mission and power this league.</p>
            </div>
            <Link href="/contact" className="btn-secondary hidden sm:inline-flex">Become a Partner <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 sr-stagger">
            {partners.map((p) => {
              const isPremium = p.tier.toLowerCase().includes("platinum") || p.tier.toLowerCase().includes("strategic");
              const isGold = p.tier.toLowerCase().includes("gold");
              
              let tierColor = "white";
              let tierAccent = "rgba(255,255,255,0.1)";
              
              if (isPremium) {
                tierColor = "#D4AF37";
                tierAccent = "rgba(212,175,55,0.15)";
              } else if (isGold) {
                tierColor = "#C49428";
                tierAccent = "rgba(196,148,40,0.1)";
              } else {
                tierColor = "rgba(255,255,255,0.6)";
              }

              return (
                <div 
                  key={p.name} 
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 min-h-[160px] group relative overflow-hidden"
                >
                  {isPremium && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
                  )}
                  
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-500">
                    <Building2 className={`w-5 h-5 ${isPremium ? 'text-[#D4AF37]' : 'text-white/40'}`}/>
                  </div>
                  
                  <div className="font-cinzel text-white text-sm tracking-wider leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors">{p.name}</div>
                  
                  <div className="font-montserrat text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ color: tierColor, background: tierAccent, border: `1px solid ${isPremium ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.1)'}` }}>
                    {p.tier}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Link href="/partners" className="font-montserrat text-white text-[10px] uppercase tracking-widest font-bold hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2">
              View All Partners <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Owners */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5 sr">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">Team <span className="text-[#D4AF37] italic">Owners</span></h2>
              </div>
              <p className="font-montserrat text-white/50 text-sm pl-12 max-w-lg leading-relaxed">Leading with vision, passion and purpose — the forces behind the league.</p>
            </div>
            <Link href="/teams" className="btn-secondary hidden sm:inline-flex">View All Teams <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
            {teams.map((team) => {
              const portraitSrc = mascotImages[team.id];
              return (
                <Link
                  key={team.id}
                  href={`/owners/${team.owner.id}`}
                  className="block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 group glass-card border-white/10"
                  style={{ borderTop: `2px solid ${team.color}` }}
                >
                  <div className="relative overflow-hidden h-[240px]">
                    <img
                      src={portraitSrc}
                      alt={team.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${team.color}40 0%, ${team.color}10 40%, transparent 70%)` }} />
                    <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to top, rgba(5,5,5,1), transparent)" }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${team.color}20 0%, transparent 70%)` }} />
                    
                    <div className="absolute top-4 left-5">
                      <div className="font-cinzel font-light text-2xl tracking-widest text-white mb-1 drop-shadow-md">
                        {team.name.replace(/^Team\s+/i,"").toUpperCase()}
                      </div>
                      <div className="font-montserrat font-bold text-[8px] uppercase tracking-[0.3em]" style={{ color: team.color }}>
                        {team.fullName.split(" ").at(-1)!.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20">
                        <Award className="w-4 h-4" style={{ color: team.color }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-2 bg-[#050505]">
                    <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-1.5">Team Owner</div>
                    <div className="font-cinzel text-white text-lg mb-3 tracking-wider">{team.owner.name}</div>
                    <div className="font-montserrat text-white/50 text-[11px] leading-relaxed line-clamp-2">{team.owner.leadershipStyle}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <Link href="/teams" className="btn-secondary text-[10px]">VIEW ALL TEAMS</Link>
          </div>
        </div>
      </section>

      {/* Commissioners */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000] sr">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">League <span className="text-[#D4AF37] italic">Commissioners</span></h2>
            </div>
            <p className="font-montserrat text-white/50 text-sm pl-12 max-w-lg leading-relaxed">Ensuring fairness, discipline and excellence throughout every match.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sr-stagger">
            {commissioners.map((c) => (
              <div key={c.name}
                className="rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 group glass-card border-white/10"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  <Shield className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div className="font-cinzel text-white text-sm mb-1 leading-snug tracking-wider">{c.name}</div>
                <div className="font-montserrat text-[9px] uppercase tracking-widest font-bold mb-3" style={{ color: "#D4AF37" }}>{c.role}</div>
                <div className="font-montserrat text-white/40 text-[10px] leading-relaxed line-clamp-2">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
