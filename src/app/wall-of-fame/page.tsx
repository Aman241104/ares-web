import Link from "next/link";
import { ArrowRight, Users, Star, Award, Trophy, Building2, Shield } from "lucide-react";
import { teams, partners, commissioners } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const ownerPortraits: Record<string, string> = {
  "modi": "/images/owner-portrait-1.jpg",
  "doval": "/images/owner-portrait-2.jpg",
  "amit-shah": "/images/owner-portrait-3.jpg",
  "jaishankar": "/images/owner-portrait-4.jpg",
};

const mascotImages: Record<string, string> = {
  "modi": "/images/mascot-lion.jpg",
  "doval": "/images/mascot-eagle.jpg",
  "amit-shah": "/images/mascot-tiger.jpg",
  "jaishankar": "/images/mascot-lotus.jpg",
};

export default function WallOfFamePage() {
  return (
    <div className="pt-16">

      {/* Hero */}
      <section className="relative overflow-hidden" style={{minHeight:"440px", background:"linear-gradient(135deg, #020609 0%, #060d14 40%, #0a1520 70%, #060d14 100%)"}}>
        <div className="absolute inset-0 bg-grid opacity-[0.12] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(ellipse 70% 80% at 20% 50%, rgba(218,165,55,0.1) 0%, transparent 65%)"}}/>
        {/* Trophy image right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] hidden lg:block overflow-hidden">
          <img
            src="/images/hero-trophy.jpg"
            alt="Championship Trophy"
            className="h-full w-full object-cover object-center"
            style={{
              maskImage:"linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
              WebkitMaskImage:"linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
              opacity: 0.65,
              filter:"brightness(0.9) contrast(1.1)",
            }}
          />
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 80% 70% at 70% 50%, rgba(218,165,55,0.12) 0%, transparent 60%)"}} />
        </div>

        <div className="max-w-7xl mx-auto relative px-4 sm:px-8 lg:px-12 py-24 flex items-center" style={{minHeight:"440px"}}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#DAA537]/70" />
              <span className="font-montserrat text-[#DAA537]/80 text-[10px] font-bold tracking-[0.5em] uppercase">Honoring Excellence</span>
            </div>
            <h1 className="font-cinzel font-black text-white mb-5 leading-[0.9]" style={{fontSize:"clamp(52px,8vw,100px)"}}>
              WALL OF<br/>
              <span className="text-shadow-gold" style={{color:"#DAA537"}}>FAME</span>
            </h1>
            <div className="w-20 h-0.5 mb-5" style={{background:"linear-gradient(90deg, #DAA537, transparent)"}} />
            <p className="font-montserrat text-white/55 text-sm leading-relaxed max-w-xl mb-8">
              The ARES Business League stands strong because of the incredible vision, support and commitment of our partners, team owners and commissioners. Your belief is building a lasting legacy.
            </p>
            <Link href="/contact" className="btn-primary text-xs">
              Join the Legacy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="section-sep" />
      </section>

      {/* Stats */}
      <section className="py-10 px-4 sm:px-8 lg:px-12" style={{background:"#0D1B2A"}}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {num:"18+", label:"Trusted Partners", icon:<Users className="w-5 h-5 text-[#DAA537]" />},
            {num:"4", label:"Visionary Leaders", icon:<Star className="w-5 h-5 text-[#DAA537]" />},
            {num:"6", label:"League Guardians", icon:<Shield className="w-5 h-5 text-[#DAA537]" />},
            {num:"One", label:"Unified Mission", icon:<Trophy className="w-5 h-5 text-[#DAA537]" />},
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-xl text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DAA537]/50"
              style={{background:"#060d14", border:"1px solid rgba(218,165,55,0.18)", borderBottom:"3px solid rgba(218,165,55,0.4)"}}>
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background:"rgba(218,165,55,0.1)", border:"1px solid rgba(218,165,55,0.2)"}}>
                  {s.icon}
                </div>
              </div>
              <div className="font-cinzel font-black text-3xl text-[#DAA537] mb-1">{s.num}</div>
              <div className="font-montserrat text-white/45 text-[11px] uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-sep" />

      {/* Partners */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full bg-[#DAA537]" />
                <h2 className="font-cinzel font-black text-white text-2xl sm:text-3xl">Our <span style={{color:"#DAA537"}}>Partners</span></h2>
              </div>
              <p className="font-montserrat text-white/45 text-sm pl-4">Heartfelt thanks to our partners who believe in our mission and power this league.</p>
            </div>
            <Link href="/contact" className="btn-secondary text-xs self-start sm:self-auto">Become a Partner <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {partners.map((p) => (
              <div key={p.name}
                className="bg-white rounded-xl p-5 flex flex-col items-center justify-center text-center hover:shadow-[0_0_24px_rgba(218,165,55,0.4)] hover:-translate-y-1 transition-all duration-300 min-h-[110px] group cursor-pointer"
                style={{
                  border:"1px solid #f0f0f0",
                  borderTop: (p.tier.toLowerCase().includes("platinum") || p.tier.toLowerCase().includes("strategic"))
                    ? "3px solid #DAA537"
                    : p.tier.toLowerCase().includes("gold")
                    ? "2px solid #C49428"
                    : "1px solid #e5e7eb"
                }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2.5" style={{background:"rgba(218,165,55,0.1)"}}>
                  <Building2 className="w-5 h-5 text-[#DAA537]" />
                </div>
                <div className="font-cinzel font-bold text-[#0D1B2A] text-[12px] leading-tight mb-1.5">{p.name}</div>
                <div className="font-montserrat text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full"
                  style={{
                    color: (p.tier.toLowerCase().includes("platinum") || p.tier.toLowerCase().includes("strategic")) ? "#B8860B" : "#C49428",
                    background: "rgba(218,165,55,0.1)",
                    border: "1px solid rgba(218,165,55,0.3)"
                  }}>
                  {p.tier}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/partners" className="font-montserrat text-[#DAA537] text-sm font-semibold hover:text-[#F5D078] transition-colors inline-flex items-center gap-1.5">
              View All Partners <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* Team Owners */}
      <section className="py-16 px-4 sm:px-8 lg:px-12" style={{background:"#0D1B2A"}}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full bg-[#DAA537]" />
                <h2 className="font-cinzel font-black text-white text-2xl sm:text-3xl">Team <span style={{color:"#DAA537"}}>Owners</span></h2>
              </div>
              <p className="font-montserrat text-white/45 text-sm pl-4">Leading with vision, passion and purpose — the forces behind the league.</p>
            </div>
            <Link href="/teams" className="btn-secondary text-xs self-start sm:self-auto">View All Teams <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {teams.map((team) => {
              const portraitSrc = mascotImages[team.id];
              return (
                <Link
                  key={team.id}
                  href={`/owners/${team.owner.id}`}
                  className="block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group"
                  style={{background:"#060d14", border:`1px solid ${team.color}35`, borderTop:`3px solid ${team.color}`, boxShadow:`0 4px 20px ${team.color}10`}}
                >
                  <div className="relative overflow-hidden" style={{height:"200px"}}>
                    <img
                      src={portraitSrc}
                      alt={team.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0" style={{background:`linear-gradient(to bottom, ${team.color}80 0%, ${team.color}20 40%, transparent 70%)`}} />
                    <div className="absolute bottom-0 left-0 right-0 h-16" style={{background:"linear-gradient(to top, #060d14, transparent)"}} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background:`radial-gradient(ellipse 80% 60% at 50% 100%, ${team.color}20 0%, transparent 70%)`}} />
                    <div className="absolute top-3 left-4">
                      <div className="font-cinzel font-black text-sm tracking-[0.15em]" style={{color:team.color, textShadow:`0 0 16px ${team.color}`}}>
                        {team.name.replace(/^Team\s+/i,"").toUpperCase()}
                      </div>
                      <div className="font-cinzel font-bold text-[9px] tracking-widest mt-0.5" style={{color:`${team.color}bb`}}>
                        {team.fullName.split(" ").at(-1)!.toUpperCase()}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{background:`${team.color}30`, border:`1px solid ${team.color}60`}}>
                        <Award className="w-3 h-3" style={{color:team.color}} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-montserrat text-white/35 text-[10px] uppercase tracking-wider mb-0.5">Team Owner</div>
                    <div className="font-cinzel font-bold text-white text-sm mb-1.5">{team.owner.name}</div>
                    <div className="font-montserrat text-white/40 text-[11px] leading-snug line-clamp-2">{team.owner.leadershipStyle}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* Commissioners */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 rounded-full bg-[#DAA537]" />
              <h2 className="font-cinzel font-black text-white text-2xl sm:text-3xl">League <span style={{color:"#DAA537"}}>Commissioners</span></h2>
            </div>
            <p className="font-montserrat text-white/45 text-sm pl-4">Ensuring fairness, discipline and excellence throughout every match.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {commissioners.map((c) => (
              <div key={c.name}
                className="rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#DAA537]/50 group"
                style={{background:"#0D1B2A", border:"1px solid rgba(218,165,55,0.15)", borderTop:"2px solid rgba(218,165,55,0.45)"}}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-105"
                  style={{background:"rgba(218,165,55,0.08)", border:"2px solid rgba(218,165,55,0.25)"}}>
                  <svg className="w-7 h-7" style={{color:"rgba(218,165,55,0.8)"}} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                  </svg>
                </div>
                <div className="font-cinzel font-bold text-white text-[11px] mb-0.5 leading-tight">{c.name}</div>
                <div className="font-montserrat text-xs font-semibold mb-2" style={{color:"#DAA537"}}>{c.role}</div>
                <div className="font-montserrat text-white/35 text-[10px] leading-tight">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
