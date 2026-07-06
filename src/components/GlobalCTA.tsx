"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ArrowRight, Sparkles, Smartphone, Rocket, LineChart, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Live demo of Gravity Media Marketing's own AI chat product - the "Website Widget" feature of
// the WhatsApp AI Agent platform (whatsapp-ai-agent-inky.vercel.app), embedded inline (not as a
// floating bubble) via widget.js's data-target mode, scoped to Gravity Media Marketing's own
// workspace/knowledge base so it can answer questions about services offered and about ABL itself.
const AI_WIDGET_SITE_ID = "f5cd9777-83a2-44f5-a880-088b0d6de332";
const AI_WIDGET_SCRIPT_SRC = "https://whatsapp-ai-agent-inky.vercel.app/widget.js";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);

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

      // Floating animation for the laptop in the card
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

      // Laptop lid "opens" into view as the section scrolls in
      if (laptopRef.current) {
        gsap.fromTo(laptopRef.current,
          { rotateX: 55, y: 60, opacity: 0 },
          {
            rotateX: 0, y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 85%", end: "top 40%", scrub: 1 }
          }
        );
      }

      // Floating info chips drift at their own scroll-linked pace
      gsap.to(".g-chip-1", {
        y: -30, x: -6,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(".g-chip-2", {
        y: 30, x: 6,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });

      // Inner "website" content parallax — simulates the page scrolling inside the screen
      gsap.to(".g-screen-layer", {
        y: -14,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(".g-screen-layer-2", {
        y: 10,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[#030712] relative overflow-hidden font-montserrat">

      {/* Top Smooth Blend Transition (into the dark hero above) */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none opacity-60" />

      {/* Super Large Background Arrow (Animated on Scroll) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130vw] h-[130vw] opacity-[0.05] blur-2xl pointer-events-none g-bg-scroll z-0 flex items-center justify-center">
        <Image
          src="/images/gravity-arrow.png"
          alt="Gravity Background"
          fill
          className="object-contain"
        />
      </div>

      {/* Main Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#00A859]/10 blur-[140px] rounded-full pointer-events-none z-0" />

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
          <h2 className="font-cinzel font-bold text-white leading-[1.05] tracking-wide mb-8" style={{ fontSize: "clamp(48px, 6vw, 76px)" }}>
            <div className="g-title">ELEVATE</div>
            <div className="g-title">YOUR</div>
            <div className="g-title">DIGITAL</div>
            <div className="g-title text-transparent bg-clip-text bg-gradient-to-r from-[#00A859] via-[#00D672] to-[#00A859] drop-shadow-[0_0_20px_rgba(0,168,89,0.4)] bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]">PRESENCE</div>
          </h2>

          {/* Description */}
          <p className="g-desc text-white/50 text-sm leading-[1.9] max-w-xl mb-12 font-medium tracking-wide">
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
                <span className="text-white/50 group-hover:text-white text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300">{f.text}</span>
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

            <div className="border-l border-white/10 pl-8">
              <div className="text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5">Gravity Media Marketing</div>
              <a href="mailto:gauravmehta.biz@gmail.com" className="block text-white/50 hover:text-[#00D672] transition-colors text-xs mb-0.5">gauravmehta.biz@gmail.com</a>
              <a href="tel:+918104933816" className="block text-white/50 hover:text-[#00D672] transition-colors text-xs">+91 8104933816</a>
            </div>
          </div>

          {/* Live AI Assistant demo - built and hosted by Gravity Media Marketing, answers
              questions about our services and about ABL itself using a real knowledge base. */}
          <div className="g-action mt-10 pt-8 border-t border-white/10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-pulse" />
              <span className="text-[#00D672] text-[9px] font-bold tracking-[0.25em] uppercase">Try It Live</span>
            </div>
            <p className="text-white/50 text-xs mb-4 max-w-md">
              This is our AI Assistant product, running live right now. Ask it about our services or about ABL 2026.
            </p>
            <div id="gravity-ai-widget" className="h-[460px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/[0.08] max-w-md" style={{ isolation: "isolate" }} />
            <Script src={AI_WIDGET_SCRIPT_SRC} data-site-id={AI_WIDGET_SITE_ID} data-target="#gravity-ai-widget" strategy="lazyOnload" />
          </div>
        </div>

        {/* ── RIGHT COLUMN: CARD ── */}
        <div className="g-card relative lg:ml-10">
          {/* Outer Shell — machined tray */}
          <div className="relative w-full max-w-md mx-auto p-2 rounded-[2.75rem] bg-gradient-to-b from-white/[0.05] to-transparent ring-1 ring-white/[0.08] shadow-[0_50px_100px_rgba(0,0,0,0.4)]">

            {/* Inner Core — glass card */}
            <div className="relative aspect-[4/5] rounded-[2.5rem] border border-[#00A859]/20 hover:border-[#00A859]/40 bg-gradient-to-br from-[#0B1120] to-[#050B0A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),inset_0_0_50px_rgba(0,168,89,0.08)] backdrop-blur-xl flex flex-col items-center p-8 sm:p-12 overflow-hidden transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group">

              {/* Corner Decorative Dots */}
              <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />
              <div className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />
              <div className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-[#00A859]/40 shadow-[0_0_10px_rgba(0,168,89,1)]" />

              {/* Inner Glow in Card */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00A859]/12 blur-[90px] rounded-full pointer-events-none" />
              </div>

              {/* Eyebrow */}
              <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00A859]/25 bg-[#00A859]/[0.06] mb-2">
                <span className="w-1 h-1 rounded-full bg-[#00A859]" />
                <span className="text-[#008F4C] text-[9px] font-bold tracking-[0.25em] uppercase">Case Study</span>
              </div>

              {/* Laptop Showcase — sites we ship */}
              <div className="relative z-10 g-float w-full flex-1 flex flex-col items-center justify-center" style={{ perspective: "1400px" }}>

                <div
                  ref={laptopRef}
                  className="relative w-full max-w-[260px] sm:max-w-[300px]"
                  style={{ transformStyle: "preserve-3d", transformOrigin: "bottom center" }}
                >
                  {/* Screen */}
                  <div className="relative rounded-t-xl rounded-b-[3px] border-[5px] border-[#111827] bg-[#0B1120] aspect-[16/10.5] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
                    {/* Browser chrome */}
                    <div className="h-6 flex items-center gap-1.5 px-3 bg-[#050B0A] border-b border-white/5 relative z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
                      <div className="ml-2 flex-1 h-3 rounded-full bg-white/5 flex items-center px-2">
                        <span className="text-[5.5px] text-white/35 tracking-wide font-montserrat truncate">aresbusinessleague.com</span>
                      </div>
                    </div>

                    {/* Screen content — mini site preview, mirrors ABL's own gold/navy identity */}
                    <div className="relative w-full h-[calc(100%-24px)] overflow-hidden bg-gradient-to-b from-[#0B1120] to-[#050B0A]">
                      {/* Scanning sweep */}
                      <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#D4AF37]/20 to-transparent screen-scan pointer-events-none" />

                      {/* Mini nav */}
                      <div className="g-screen-layer absolute inset-x-0 top-0 px-4 pt-3">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                            <div className="h-1 w-6 rounded-full bg-white/30" />
                          </div>
                          <div className="flex gap-1">
                            <div className="h-1 w-3 rounded-full bg-white/15" />
                            <div className="h-1 w-3 rounded-full bg-white/15" />
                            <div className="h-1 w-3 rounded-full bg-white/15" />
                          </div>
                        </div>
                        {/* Hero block */}
                        <div className="h-1.5 w-10 rounded-full bg-[#D4AF37]/70 mb-2.5" />
                        <div className="h-3 w-3/4 rounded-sm bg-white/85 mb-1.5" />
                        <div className="h-3 w-1/2 rounded-sm bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] mb-3" />
                        <div className="h-1 w-full rounded-full bg-white/10 mb-1" />
                        <div className="h-1 w-5/6 rounded-full bg-white/10 mb-3" />
                        <div className="flex gap-1.5">
                          <div className="h-4 w-12 rounded-sm bg-[#D4AF37]" />
                          <div className="h-4 w-12 rounded-sm border border-white/15" />
                        </div>
                      </div>

                      <div className="g-screen-layer-2 absolute bottom-2 inset-x-3 grid grid-cols-3 gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="h-8 rounded-sm bg-white/5 border border-white/10" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Keyboard deck */}
                  <div
                    className="relative h-3 bg-gradient-to-b from-[#1F2937] to-[#0B1120] mx-[-6px]"
                    style={{ clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0% 100%)" }}
                  />
                  <div className="mx-auto h-[3px] w-1/4 bg-[#0B1120] rounded-b-full" />
                </div>

                {/* Floating info chips — nested double-bezel */}
                <div className="g-chip-1 absolute top-2 left-2 sm:-left-6 hidden sm:flex items-center gap-1.5 bg-[#0B1120] p-1 pr-3 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.08]">
                  <span className="w-5 h-5 rounded-full bg-[#00A859]/15 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-pulse" />
                  </span>
                  <span className="text-[8px] font-bold text-white/70 tracking-[0.15em] uppercase">Site Live</span>
                </div>
                <div className="g-chip-2 absolute bottom-10 right-2 sm:-right-8 hidden sm:flex items-center gap-1.5 bg-[#0B1120] p-1 pr-2.5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.08]">
                  <span className="w-5 h-5 rounded-full bg-[#00A859]/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#00A859]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[8px] font-bold text-white/70 tracking-wide">Built &amp; Deployed</span>
                </div>
              </div>

              {/* Bottom Pill — nested double-bezel */}
              <div className="relative z-10 p-1 rounded-full bg-[#00A859]/[0.1] mt-8 shrink-0">
                <div className="border border-[#00A859]/30 bg-[#0B1120] px-6 py-2.5 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.3)] group-hover:border-[#00A859]/50 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                  <span className="text-[#00D672] text-[9px] font-bold tracking-[0.25em] uppercase">Official Digital Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
