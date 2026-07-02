"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Smartphone, Rocket, LineChart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that triggers when this CTA section enters the viewport
      const tl = gsap.timeline({ 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Start when top of CTA hits 80% down the viewport
        },
        defaults: { ease: "power3.out" } 
      });

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
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#FDFBF7] relative overflow-hidden font-montserrat">
      
      {/* Top Smooth Blend Transition (Dark to Light) */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-[#030712] to-transparent z-10 pointer-events-none opacity-60" />

      {/* Super Large Background Arrow (Animated on Scroll) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130vw] h-[130vw] opacity-[0.03] blur-2xl pointer-events-none g-bg-scroll z-0 flex items-center justify-center mix-blend-multiply">
        <Image 
          src="/images/gravity-arrow.png" 
          alt="Gravity Background" 
          fill 
          className="object-contain"
        />
      </div>

      {/* Main Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#00A859]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
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
          <h2 className="font-cinzel font-bold text-[#111827] leading-[1.05] tracking-wide mb-8" style={{ fontSize: "clamp(48px, 6vw, 76px)" }}>
            <div className="g-title">ELEVATE</div>
            <div className="g-title">YOUR</div>
            <div className="g-title">DIGITAL</div>
            <div className="g-title text-transparent bg-clip-text bg-gradient-to-r from-[#00A859] via-[#00D672] to-[#00A859] drop-shadow-[0_0_20px_rgba(0,168,89,0.4)] bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]">PRESENCE</div>
          </h2>

          {/* Description */}
          <p className="g-desc text-gray-600 text-sm leading-[1.9] max-w-xl mb-12 font-medium tracking-wide">
            Partner with Gravity Media Marketing to build high-performance, award-winning digital experiences. From mobile and web app development to digital dominance, we engineer growth.
          </p>

          {/* Feature List */}
          <div className="space-y-4 mb-14">
            {[
              { icon: <Sparkles className="w-4 h-4 text-[#00A859] group-hover:text-[#00D672] transition-colors" />, text: "AWWWARDS-WINNING DESIGN AESTHETICS" },
              { icon: <Smartphone className="w-4 h-4 text-[#00A859] group-hover:text-[#00D672] transition-colors" />, text: "MOBILE & WEB APP DEVELOPMENT" },
              { icon: <Rocket className="w-4 h-4 text-[#00A859] group-hover:text-[#00D672] transition-colors" />, text: "HIGH-PERFORMANCE ARCHITECTURE" },
              { icon: <LineChart className="w-4 h-4 text-[#00A859] group-hover:text-[#00D672] transition-colors" />, text: "DATA-DRIVEN MARKETING & MEDIA" },
            ].map((f, i) => (
              <div key={i} className="g-feature flex items-center gap-4 group cursor-default">
                <div className="w-7 h-7 rounded-full bg-[#00A859]/10 group-hover:bg-[#00A859]/20 flex items-center justify-center border border-[#00A859]/20 group-hover:border-[#00A859]/40 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,168,89,0.3)]">
                  {f.icon}
                </div>
                <span className="text-gray-600 group-hover:text-[#111827] text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="g-action flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-[#00A859] to-[#008F4C] hover:from-[#00C266] hover:to-[#00A859] text-[#050B0A] font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm flex items-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(0,168,89,0.4)] hover:shadow-[0_0_30px_rgba(0,168,89,0.6)] hover:-translate-y-1 whitespace-nowrap"
            >
              Start Project <ArrowRight className="w-4 h-4" />
            </Link>
            
            <div className="border-l border-black/10 pl-8">
              <div className="text-[#111827] text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5">Gravity Media Marketing</div>
              <a href="mailto:gauravmehta.biz@gmail.com" className="block text-gray-600 hover:text-[#00A859] transition-colors text-xs mb-0.5">gauravmehta.biz@gmail.com</a>
              <a href="tel:+918104933816" className="block text-gray-600 hover:text-[#00A859] transition-colors text-xs">+91 8104933816</a>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: CARD ── */}
        <div className="g-card relative lg:ml-10">
          <div className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-[2.5rem] border border-[#00A859]/20 hover:border-[#00A859]/40 bg-gradient-to-br from-white/90 to-[#00A859]/5 shadow-[0_40px_80px_rgba(0,0,0,0.08),inset_0_0_40px_rgba(0,168,89,0.05)] backdrop-blur-xl flex flex-col items-center p-8 sm:p-12 overflow-hidden transition-colors duration-500 group">
            
            {/* Corner Decorative Dots */}
            <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />
            <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />
            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />
            <div className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />

            {/* Inner Glow in Card */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00A859]/15 blur-[80px] rounded-full pointer-events-none" />
            </div>

            {/* Huge Logo Stack */}
            <div className="flex flex-col items-center justify-center relative z-10 g-float w-full h-full flex-1 pointer-events-none mt-6">
              {/* The Arrow */}
              <div className="relative w-[65%] sm:w-[70%] aspect-square drop-shadow-[0_0_40px_rgba(0,168,89,0.5)] translate-y-4">
                <Image 
                  src="/images/gravity-arrow.png" 
                  alt="Gravity Arrow" 
                  fill 
                  className="object-contain"
                />
              </div>
              {/* The Logo Text */}
              <div className="relative w-full h-24 sm:h-32 opacity-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] -translate-y-2 scale-125 sm:scale-150 origin-top">
                <Image 
                  src="/images/gravity-logo.png" 
                  alt="Gravity Logo Text" 
                  fill 
                  className="object-contain invert brightness-0"
                />
              </div>
            </div>

            {/* Bottom Pill */}
            <div className="relative z-10 border border-[#00A859]/30 bg-[#00A859]/10 backdrop-blur-md px-6 py-2.5 rounded-full mt-auto shrink-0 shadow-[0_10px_20px_rgba(0,0,0,0.05)] group-hover:bg-[#00A859]/20 transition-colors duration-500">
              <span className="text-[#008F4C] text-[9px] font-bold tracking-[0.25em] uppercase">Official Digital Partner</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
