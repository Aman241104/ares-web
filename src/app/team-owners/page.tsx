"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { teams } from "@/lib/data";
import { Quote, Briefcase, Building2, MapPin, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function TeamOwnersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const titleSplit = new SplitType(titleRef.current, { types: "words,chars" });
        gsap.from(titleSplit.chars, {
          opacity: 0, y: 50, rotateX: -90, stagger: 0.05, duration: 1.2, ease: "back.out(1.5)"
        });
      }

      gsap.from(".h-title-owners", { opacity: 0, y: 30, duration: 0.9, ease: "back.out(1.4)", delay: 0.3 });

      gsap.from(".owner-card", {
        scrollTrigger: { trigger: ".owners-grid", start: "top 80%" },
        opacity: 0,
        y: 100,
        rotationX: 10,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    if (window.innerWidth < 1024) return;
    const { left, top, width, height } = cardElement.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15;
    const y = -(e.clientY - top - height / 2) / 15;
    
    // Internal light spotlight
    const mouseX = ((e.clientX - left) / width) * 100;
    const mouseY = ((e.clientY - top) / height) * 100;
    cardElement.style.setProperty('--mouse-x', `${mouseX}%`);
    cardElement.style.setProperty('--mouse-y', `${mouseY}%`);

    gsap.to(cardElement, {
      rotateY: x,
      rotateX: y,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (cardElement: HTMLDivElement) => {
    gsap.to(cardElement, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#02050A] text-white pt-32 pb-20 relative overflow-hidden">
      
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("/images/noise.svg")', backgroundRepeat: 'repeat' }} />
      
      {/* Background Glows Removed for Cleaner Look */}

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-md">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
             <span className="font-montserrat text-[#D4AF37]/90 text-[9px] font-bold tracking-[0.4em] uppercase">League Visionaries</span>
          </div>
          <h1 className="font-cinzel font-bold text-white text-5xl md:text-7xl mb-6 tracking-wider uppercase leading-tight" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            <span ref={titleRef}>The Team</span><br/>
            <span className="h-title-owners text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#AA7C11]">
              Owners
            </span>
          </h1>
          <p className="font-montserrat text-white/60 text-sm max-w-2xl mx-auto leading-relaxed tracking-wide">
            Meet the architects of victory. These visionary leaders command the top factions in the ARES Business League, bringing decades of experience and strategic dominance.
          </p>
        </div>

        {/* Owners Grid */}
        <div className="owners-grid grid grid-cols-1 gap-16">
          {teams.map((team) => (
            <div 
              key={team.owner.id} 
              id={team.id}
              className="owner-card relative group w-full"
            >
              <div
                className="relative w-full rounded-2xl border border-white/10 bg-[#070B14]/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row"
              >
                {/* Left Side: Image Placeholder */}
                <div className="w-full lg:w-[40%] relative min-h-[400px] lg:min-h-full bg-black/60 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
                  {/* Color Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: team.color }} />
                  {/* Background Glow */}
                  <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${team.color}, transparent 60%)` }} />
                  {/* Owner Photo */}
                  {team.owner.image ? (
                    <Image src={team.owner.image} alt={team.owner.name} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover object-top relative z-10 group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-32 h-32 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm relative z-10">
                      <span className="font-cinzel text-4xl font-light text-white/30">{team.owner.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                  )}
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-[60%] p-10 lg:p-14 flex flex-col">
                  
                  {/* Breadcrumb-like */}
                  <div className="flex items-center gap-2 font-montserrat text-[9px] uppercase tracking-[0.2em] text-white/40 mb-8">
                    <span>HOME</span>
                    <span>&gt;</span>
                    <span>TEAM OWNERS</span>
                    <span>&gt;</span>
                    <span style={{ color: team.color }}>{team.owner.name.toUpperCase()}</span>
                  </div>

                  <div className="mb-8">
                    <div className="font-montserrat text-white/50 text-[10px] tracking-[0.3em] uppercase mb-4">
                      Team Owner & Leader
                    </div>
                    <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight break-words">
                      {team.owner.name.toUpperCase()}
                    </h2>
                    <div className="font-montserrat text-sm tracking-widest uppercase" style={{ color: team.color }}>
                      {team.fullName}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mb-10">
                    {team.owner.leadershipStyle.split('•').map((trait, i) => (
                      <span key={i} className="px-4 py-1.5 rounded-full border border-white/10 bg-black/40 font-montserrat text-[10px] tracking-widest uppercase" style={{ color: team.color }}>
                        {trait.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="pl-6 py-2 border-l-2 mb-12 relative" style={{ borderColor: team.color }}>
                    <p className="font-montserrat italic text-white/60 text-base leading-relaxed max-w-lg">
                      "{team.owner.quote}"
                    </p>
                  </div>

                  {/* Info Grid (4 blocks) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                      <MapPin className="w-4 h-4 mt-0.5 text-white/40" style={{ color: team.color }} />
                      <div>
                        <div className="font-montserrat text-white/40 text-[9px] tracking-widest uppercase mb-1">From</div>
                        <div className="font-montserrat text-white/90 text-xs tracking-wide">{team.owner.from}</div>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                      <Briefcase className="w-4 h-4 mt-0.5 text-white/40" style={{ color: team.color }} />
                      <div>
                        <div className="font-montserrat text-white/40 text-[9px] tracking-widest uppercase mb-1">Experience</div>
                        <div className="font-montserrat text-white/90 text-xs tracking-wide">{team.owner.experience}</div>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                      <Target className="w-4 h-4 mt-0.5 text-white/40" style={{ color: team.color }} />
                      <div>
                        <div className="font-montserrat text-white/40 text-[9px] tracking-widest uppercase mb-1">Focus Areas</div>
                        <div className="font-montserrat text-white/90 text-xs tracking-wide leading-relaxed">{team.owner.focusAreas}</div>
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                      <Building2 className="w-4 h-4 mt-0.5 text-white/40" style={{ color: team.color }} />
                      <div>
                        <div className="font-montserrat text-white/40 text-[9px] tracking-widest uppercase mb-1">Company</div>
                        <div className="font-montserrat text-white/90 text-xs tracking-wide mb-1">{team.owner.company.name}</div>
                        <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{team.owner.company.industry}</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Bottom Row */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-auto">
                    <div className="p-3 sm:p-5 rounded-xl bg-transparent border border-white/5 text-center transition-colors hover:border-white/20 min-w-0">
                      <div className="font-cinzel text-base sm:text-2xl font-bold mb-2 truncate" style={{ color: team.color }}>
                        {team.members}
                      </div>
                      <div className="font-montserrat text-white/40 text-[8px] tracking-[0.15em] sm:tracking-[0.2em] uppercase">Members</div>
                    </div>
                    <div className="p-3 sm:p-5 rounded-xl bg-transparent border border-white/5 text-center transition-colors hover:border-white/20 min-w-0">
                      <div className="font-cinzel text-base sm:text-2xl font-bold mb-2 truncate" style={{ color: team.color }}>
                        {team.totalPointsSpent?.toLocaleString() || "0"}
                      </div>
                      <div className="font-montserrat text-white/40 text-[8px] tracking-[0.15em] sm:tracking-[0.2em] uppercase">Coins Spent</div>
                    </div>
                    <div className="p-3 sm:p-5 rounded-xl bg-transparent border border-white/5 text-center transition-colors hover:border-white/20 min-w-0">
                      <div className="font-cinzel text-base sm:text-2xl font-bold mb-2 truncate" style={{ color: team.color }}>
                        #{team.rank}
                      </div>
                      <div className="font-montserrat text-white/40 text-[8px] tracking-[0.15em] sm:tracking-[0.2em] uppercase">Current Rank</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
