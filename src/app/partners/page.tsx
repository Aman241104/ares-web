"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, BarChart2, Trophy, Handshake, Megaphone, Target, Globe, Building2 } from "lucide-react";
import { partners } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

export default function PartnersPage() {
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
      
      {/* ─── HERO ─── */}
      <section className="relative py-24 px-6 sm:px-10 lg:px-16 overflow-hidden min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-4 mb-8 h-badge">
            <div className="h-px w-12 bg-white/10" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
              Building Together
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>
          
          <h1 className="h-title font-cinzel font-light text-white mb-8 leading-[1.1]" style={{ fontSize: "clamp(36px,8vw,90px)" }}>
            OUR <span className="text-[#D4AF37] italic">PARTNERS</span>
          </h1>
          
          <div className="w-24 h-px mx-auto mb-8 bg-white/20" />
          
          <p className="h-sub font-montserrat text-white/50 text-sm tracking-wide leading-relaxed max-w-2xl mx-auto">
            Proud partners who believe in our mission and power the ARES Business League 2026 — building businesses, building the nation.
          </p>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5 sr">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
          {[
            { icon: <Users className="w-6 h-6 text-[#D4AF37]" />, num: "18+", label: "Trusted Partners" },
            { icon: <Trophy className="w-6 h-6 text-[#D4AF37]" />, num: "4", label: "Team Owners" },
            { icon: <BarChart2 className="w-6 h-6 text-[#D4AF37]" />, num: "6", label: "Commissioners" },
            { icon: <Globe className="w-6 h-6 text-[#D4AF37]" />, num: "∞", label: "Endless Impact" },
          ].map((s) => (
            <div key={s.label} className="text-center p-8 glass-card border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <div className="font-cinzel font-light text-4xl text-[#D4AF37] mb-2">{s.num}</div>
              <div className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PARTNERS GRID ─── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
            <div>
              <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Network</div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">
                OUR <span className="text-[#D4AF37]">PARTNERS</span>
              </h2>
            </div>
            <Link href="/contact" className="hidden sm:inline-flex items-center gap-2 font-montserrat text-[10px] font-bold text-white uppercase tracking-widest hover:text-[#D4AF37] transition-colors">
              Become a Partner <ArrowRight className="w-4 h-4" />
            </Link>
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
          <div className="text-center sm:hidden">
            <Link href="/contact" className="btn-secondary text-[10px]">
              BECOME A PARTNER
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BECOME A PARTNER CTA ─── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-t border-white/5 sr">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card border-[#D4AF37]/30 rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 80%)" }} />
            
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-8">
                <Handshake className="w-8 h-8 text-[#D4AF37]" />
              </div>
              
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl lg:text-5xl mb-6">
                PROUD PARTNERS IN <br className="hidden sm:block"/>
                <span className="text-[#D4AF37] italic">BUILDING THE NATION</span>
              </h2>
              
              <p className="font-montserrat text-white/50 text-sm mb-12 max-w-2xl mx-auto leading-relaxed">
                Join us as a partner and get exclusive visibility, networking opportunities, and brand association with elite business owners and their networks.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: <Megaphone className="w-6 h-6 text-[#D4AF37]" />, title: "Strategic Partnership", desc: "Brand visibility throughout the tournament" },
                  { icon: <Target className="w-6 h-6 text-[#D4AF37]" />, title: "Leadership Development", desc: "Associate with top business leaders" },
                  { icon: <Globe className="w-6 h-6 text-[#D4AF37]" />, title: "Nation Building", desc: "Be part of something truly impactful" },
                ].map((b) => (
                  <div key={b.title} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                    <div className="flex justify-center mb-4">{b.icon}</div>
                    <div className="font-cinzel text-white tracking-wider text-sm mb-2">{b.title}</div>
                    <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">{b.desc}</div>
                  </div>
                ))}
              </div>
              
              <Link href="/contact" className="btn-primary inline-flex">
                Contact Us to Partner <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
