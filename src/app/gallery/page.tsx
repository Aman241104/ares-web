"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const placeholders = Array.from({ length: 12 }, (_, i) => i + 1);

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
              Relive the Moments
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>
          
          <h1 className="h-title font-cinzel font-light text-white mb-8 leading-[1.1]" style={{ fontSize: "clamp(36px,8vw,90px)" }}>
            <span className="text-[#D4AF37] italic">GALLERY</span>
          </h1>
          
          <div className="w-24 h-px mx-auto mb-8 bg-white/20" />
          
          <p className="h-sub font-montserrat text-white/50 text-sm tracking-wide leading-relaxed max-w-2xl mx-auto">
            Capturing every milestone, every victory, every connection from ARES Business League 2026.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Coming Soon Banner */}
          <div className="glass-card border-[#D4AF37]/30 rounded-2xl p-12 text-center mb-16 relative overflow-hidden sr">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 80%)" }} />
            <div className="relative">
              <div className="w-20 h-20 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
                </svg>
              </div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl mb-4">
                GALLERY COMING <span className="text-[#D4AF37]">SOON</span>
              </h2>
              <p className="font-montserrat text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
                Photos and videos from events will be published here during the tournament. Check back after June 24, 2026!
              </p>
            </div>
          </div>

          {/* Placeholder grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sr-stagger">
            {placeholders.map((i) => (
              <div key={i} className="aspect-square glass-card border-white/10 flex items-center justify-center hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 border border-white/10 rounded-xl mx-auto mb-3 opacity-20" />
                  <div className="font-montserrat text-white/30 text-[10px] uppercase tracking-widest">Photo {i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
