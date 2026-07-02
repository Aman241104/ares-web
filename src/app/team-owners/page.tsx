"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { teams } from "@/lib/data";
import { Quote, Briefcase, Building2, MapPin } from "lucide-react";

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
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/10 blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-[#1A472A]/20 blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-md">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
             <span className="font-montserrat text-[#D4AF37]/90 text-[9px] font-bold tracking-[0.4em] uppercase">League Visionaries</span>
          </div>
          <h1 ref={titleRef} className="font-cinzel font-bold text-white text-5xl md:text-7xl mb-6 tracking-wider uppercase leading-tight" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            The Team<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#AA7C11]">
              Owners
            </span>
          </h1>
          <p className="font-montserrat text-white/60 text-sm max-w-2xl mx-auto leading-relaxed tracking-wide">
            Meet the architects of victory. These visionary leaders command the top factions in the ARES Business League, bringing decades of experience and strategic dominance.
          </p>
        </div>

        {/* Owners Grid */}
        <div className="owners-grid grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
          {teams.map((team) => (
            <div 
              key={team.owner.id} 
              className="owner-card relative group perspective-[1000px] w-full"
            >
              <div
                onMouseMove={(e) => handleCardMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleCardMouseLeave(e.currentTarget)}
                className="relative w-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)] p-10 flex flex-col justify-between overflow-hidden will-change-transform transform-gpu transition-shadow duration-500 hover:shadow-[0_40px_100px_rgba(212,175,55,0.15),inset_0_0_0_1px_rgba(212,175,55,0.2)]"
                style={{ 
                  transformStyle: "preserve-3d",
                  backgroundImage: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 50%)"
                }}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: team.color }} />

                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                  
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
                    <div>
                      <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white mb-2">{team.owner.name}</h2>
                      <div className="font-montserrat text-sm uppercase tracking-widest" style={{ color: team.color }}>
                        {team.name}
                      </div>
                    </div>
                    <div className="flex-shrink-0 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                      <span className="font-montserrat text-white/70 text-[9px] uppercase tracking-widest">{team.owner.title}</span>
                    </div>
                  </div>

                  {/* Core Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-white/40" />
                        <span className="font-montserrat text-white/80 text-xs tracking-wider">{team.owner.from}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-white/40" />
                        <span className="font-montserrat text-white/80 text-xs tracking-wider">{team.owner.experience} Experience</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Building2 className="w-4 h-4 text-white/40 mt-1" />
                        <div>
                          <div className="font-montserrat text-white/80 text-xs tracking-wider mb-1">{team.owner.company.name}</div>
                          <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{team.owner.company.industry}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 rounded-2xl bg-[#000000]/40 border border-white/5 relative group-hover:border-white/10 transition-colors">
                      <Quote className="absolute top-4 right-4 w-6 h-6 text-white/5" />
                      <p className="font-montserrat italic text-white/60 text-sm leading-relaxed relative z-10">
                        "{team.owner.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Bottom Strip */}
                  <div className="mt-auto pt-8 border-t border-white/10 flex flex-wrap gap-4 justify-between items-end">
                    <div className="max-w-sm">
                      <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2">Focus Areas</div>
                      <div className="font-montserrat text-white/70 text-xs tracking-wide leading-relaxed">
                        {team.owner.focusAreas}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2">Leadership Style</div>
                      <div className="font-cinzel text-white/90 text-sm tracking-widest">
                        {team.owner.leadershipStyle}
                      </div>
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
