"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Smartphone, Rocket, LineChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WebPartnerClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".g-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".g-title", { opacity: 0, y: 30, duration: 1, stagger: 0.2 }, "-=0.4")
        .from(".g-desc", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".g-feature", { opacity: 0, x: -20, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".g-action", { opacity: 0, y: 20, duration: 0.8 }, "-=0.4")
        .from(".g-card", { opacity: 0, scale: 0.95, duration: 1.2 }, "-=1");

      // Floating animation for the arrow in the card
      gsap.to(".g-float", {
        y: -15,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
      // Animated background arrow on scroll
      gsap.to(".g-bg-scroll", {
        y: "15%",
        rotation: 25,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#050B0A] min-h-screen overflow-hidden relative font-montserrat">
      
      {/* Super Large Background Arrow (Animated on Scroll) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130vw] h-[130vw] opacity-10 pointer-events-none g-bg-scroll z-0 flex items-center justify-center mix-blend-screen">
        <Image 
          src="/images/gravity-arrow.png" 
          alt="Gravity Background" 
          fill 
          className="object-contain"
        />
      </div>

      {/* Main Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#00A859]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* ── LEFT COLUMN: COPY & CTA ── */}
        <div className="relative z-10">
          {/* Badge */}
          <div className="g-badge inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#00A859]/30 bg-[#00A859]/10 mb-8 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-pulse" />
            <span className="text-[#00A859] text-[10px] font-bold tracking-[0.25em] uppercase">
              Official Web & Media Partner
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-cinzel font-bold text-white leading-[1.05] tracking-wide mb-8" style={{ fontSize: "clamp(48px, 6vw, 76px)" }}>
            <div className="g-title">ELEVATE</div>
            <div className="g-title">YOUR</div>
            <div className="g-title">DIGITAL</div>
            <div className="g-title text-[#00A859] drop-shadow-[0_0_15px_rgba(0,168,89,0.3)]">PRESENCE</div>
          </h1>

          {/* Description */}
          <p className="g-desc text-white/60 text-sm leading-[1.9] max-w-xl mb-12 font-medium tracking-wide">
            Partner with Gravity Media Marketing to build high-performance, award-winning digital experiences. From mobile and web app development to digital dominance, we engineer growth.
          </p>

          {/* Feature List */}
          <div className="space-y-4 mb-14">
            {[
              { icon: <Sparkles className="w-4 h-4 text-[#00A859]" />, text: "AWWWARDS-WINNING DESIGN AESTHETICS" },
              { icon: <Smartphone className="w-4 h-4 text-[#00A859]" />, text: "MOBILE & WEB APP DEVELOPMENT" },
              { icon: <Rocket className="w-4 h-4 text-[#00A859]" />, text: "HIGH-PERFORMANCE ARCHITECTURE" },
              { icon: <LineChart className="w-4 h-4 text-[#00A859]" />, text: "DATA-DRIVEN MARKETING & MEDIA" },
            ].map((f, i) => (
              <div key={i} className="g-feature flex items-center gap-4">
                <div className="w-7 h-7 rounded-full bg-[#00A859]/10 flex items-center justify-center border border-[#00A859]/20 flex-shrink-0">
                  {f.icon}
                </div>
                <span className="text-white/80 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="g-action flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <a 
              href="https://wa.me/918104933816?text=Hi%2C%20I%20want%20to%20elevate%20my%20digital%20presence." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#00A859] hover:bg-[#008F4C] text-[#050B0A] font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm flex items-center gap-3 transition-colors duration-300 shadow-[0_0_20px_rgba(0,168,89,0.3)]"
            >
              Start Project <ArrowRight className="w-4 h-4" />
            </a>
            
            <div className="border-l border-white/10 pl-8">
              <div className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5">Gravity Media Marketing</div>
              <a href="mailto:gauravmehta.biz@gmail.com" className="block text-white/50 hover:text-[#00A859] transition-colors text-xs mb-0.5">gauravmehta.biz@gmail.com</a>
              <a href="tel:+918104933816" className="block text-white/50 hover:text-[#00A859] transition-colors text-xs">+91 8104933816</a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: CARD ── */}
        <div className="g-card relative lg:ml-10">
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-md flex flex-col items-center justify-between p-12">
            
            {/* Inner Glow in Card (contained within rounded corners) */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00A859]/20 blur-[60px] rounded-full pointer-events-none" />
            </div>

            {/* Spacer for layout */}
            <div className="relative z-10" />

            {/* Huge Logo Stack */}
            <div className="flex flex-col items-center justify-center relative z-20 g-float w-full mt-10 mb-8 pointer-events-none">
              <div className="relative w-[300px] h-[300px] sm:w-[550px] sm:h-[550px] max-w-none max-h-none mb-2 drop-shadow-[0_0_30px_rgba(0,168,89,0.4)]">
                <Image 
                  src="/images/gravity-arrow.png" 
                  alt="Gravity Arrow" 
                  fill 
                  className="object-contain"
                />
              </div>
              <div className="relative w-[250px] h-[60px] sm:w-[350px] sm:h-[80px] max-w-none max-h-none opacity-90 mt-2">
                <Image 
                  src="/images/gravity-logo.png" 
                  alt="Gravity Logo Text" 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Pill */}
            <div className="relative z-10 border border-white/20 bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full mt-10">
              <span className="text-white/60 text-[9px] font-bold tracking-[0.25em] uppercase">Official Digital Partner</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
