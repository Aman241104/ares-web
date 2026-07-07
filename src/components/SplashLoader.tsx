"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const SESSION_KEY = "abl_splash_shown";

export default function SplashLoader() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const alreadyShown = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (alreadyShown || reduceMotion) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !rootRef.current) return;
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = "";
      setShow(false);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

      tl.to(".sp-particle", { opacity: 1, duration: 0.6, stagger: 0.02 })
        .fromTo(".sp-jukebox", { opacity: 0, y: 16, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, "-=0.3")
        .to({}, { duration: 0.35 })
        .to(".sp-jukebox", { opacity: 0, y: -12, duration: 0.45, ease: "power2.in" })
        .fromTo(".sp-presents", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
        .to({}, { duration: 0.3 })
        .to(".sp-presents", { opacity: 0, duration: 0.35, ease: "power2.in" })
        .fromTo(".sp-helmet", { opacity: 0, scale: 0.7, rotateY: -25 }, { opacity: 1, scale: 1, rotateY: 0, duration: 0.8, ease: "back.out(1.4)" }, "-=0.1")
        .fromTo(".sp-helmet-glow", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1.3, duration: 0.9 }, "-=0.8")
        .to({}, { duration: 0.35 })
        .to(rootRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.1");
    }, rootRef);

    return () => ctx.revert();
  }, [show]);

  const handleSkip = () => {
    gsap.killTweensOf(rootRef.current);
    document.body.style.overflow = "";
    setShow(false);
  };

  if (!mounted || !show) return null;

  return (
    <div
      ref={rootRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer overflow-hidden"
    >
      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => {
          const x = (i * 37) % 100;
          const y = (i * 53) % 100;
          const size = 1 + (i % 3);
          return (
            <span
              key={i}
              className="sp-particle absolute rounded-full opacity-0"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                background: "#D4AF37",
                boxShadow: "0 0 8px rgba(212,175,55,0.8)",
              }}
            />
          );
        })}
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Jukebox Media */}
      <div className="sp-jukebox absolute opacity-0 flex flex-col items-center gap-4">
        <span className="inline-flex items-center bg-white rounded-full px-6 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <Image src="/images/jukebox-media-logo.png" alt="Jukebox Media" width={872} height={342} className="h-12 sm:h-16 w-auto object-contain" priority />
        </span>
      </div>

      {/* Presents */}
      <div className="sp-presents absolute opacity-0">
        <span className="font-cinzel text-[#D4AF37] text-sm sm:text-base tracking-[0.5em] uppercase">Presents</span>
      </div>

      {/* Ares helmet reveal */}
      <div className="relative flex items-center justify-center" style={{ perspective: "1000px" }}>
        <div className="sp-helmet-glow absolute w-40 h-40 sm:w-56 sm:h-56 bg-[#D4AF37]/25 blur-[60px] rounded-full opacity-0 pointer-events-none" />
        <div className="sp-helmet opacity-0 flex flex-col items-center gap-4">
          <Image src="/images/logo_icon.png" alt="ARES Business League" width={554} height={486} className="w-24 sm:w-32 h-auto object-contain" priority />
          <span className="font-cinzel text-white text-lg sm:text-2xl tracking-[0.3em]">ARES</span>
        </div>
      </div>

      <span className="absolute bottom-8 font-montserrat text-white/20 text-[8px] tracking-[0.3em] uppercase">Tap to skip</span>
    </div>
  );
}
