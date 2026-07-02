"use client";

import Image from "next/image";
import { ReactNode } from "react";

const PARTICLES = [
  { x: 6,  y: 72, delay: 0,   dur: 7.0, size: 1.5, op: 0.50 },
  { x: 14, y: 58, delay: 1.4, dur: 5.5, size: 1.0, op: 0.40 },
  { x: 22, y: 80, delay: 0.7, dur: 8.0, size: 2.0, op: 0.35 },
  { x: 30, y: 45, delay: 2.1, dur: 6.2, size: 1.5, op: 0.45 },
  { x: 38, y: 68, delay: 0.3, dur: 5.8, size: 1.2, op: 0.38 },
  { x: 11, y: 35, delay: 1.9, dur: 7.5, size: 2.0, op: 0.28 },
  { x: 26, y: 88, delay: 3.2, dur: 6.0, size: 1.0, op: 0.42 },
  { x: 18, y: 52, delay: 0.6, dur: 9.0, size: 1.8, op: 0.30 },
  { x: 8,  y: 25, delay: 4.0, dur: 5.2, size: 1.2, op: 0.32 },
  { x: 34, y: 75, delay: 1.5, dur: 6.8, size: 2.0, op: 0.25 },
  { x: 42, y: 40, delay: 2.5, dur: 4.5, size: 1.5, op: 0.30 },
  { x: 20, y: 62, delay: 0.2, dur: 5.8, size: 1.0, op: 0.28 },
];

interface PageHeroProps {
  /** Override default background. Defaults to hero_trophy_stadium.png */
  backgroundImage?: string;
  /** @deprecated — trophy is now in the background image, not a separate overlay */
  showTrophy?: boolean;
  layout?: "centered" | "left";
  children: ReactNode;
  className?: string;
  /** How bright the background image should be — adjust per page. Default 0.72 */
  imageBrightness?: number;
}

export default function PageHero({
  backgroundImage = "/images/hero_trophy_stadium.png",
  layout = "centered",
  children,
  className = "",
  imageBrightness = 0.72,
}: PageHeroProps) {
  return (
    <section className={`relative flex items-center overflow-hidden ${className}`}>

      {/* ── FULL-BLEED BACKGROUND — trophy stadium, large and cinematic ── z-0 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          style={{ filter: `brightness(${imageBrightness}) saturate(1.1)` }}
        />
      </div>

      {/* ── DIRECTIONAL OVERLAY — dark left (text), let right show image ── z-[1] */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Main left-to-right gradient — dark left for text, fades right to show trophy */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(95deg, rgba(7,12,28,0.97) 0%, rgba(7,12,28,0.94) 25%, rgba(7,12,28,0.72) 45%, rgba(7,12,28,0.25) 65%, transparent 80%)"
        }} />
        {/* Top fade for navbar */}
        <div className="absolute top-0 left-0 right-0" style={{
          height: "28%",
          background: "linear-gradient(180deg, rgba(7,12,28,0.80) 0%, transparent 100%)"
        }} />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent" />
        {/* Subtle right vignette — doesn't kill the image, just softens the hard edge */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(270deg, rgba(7,12,28,0.45) 0%, transparent 30%)"
        }} />
      </div>

      {/* ── SUBTLE GOLD RAYS from top-right ── z-[2] */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute inset-[-10%]" style={{
          background: `conic-gradient(
            from 0deg at 93% -4%,
            transparent   0deg,
            transparent 176deg,
            rgba(255,194,0,0.07) 186deg,
            rgba(255,220,0,0.10) 194deg,
            transparent         204deg,
            rgba(255,194,0,0.06) 214deg,
            transparent         226deg,
            transparent         360deg
          )`,
          filter: "blur(3px)",
        }} />
      </div>

      {/* ── FINE GRID TEXTURE ── z-[3] */}
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,194,0,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,194,0,0.022) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* ── STRUCTURAL GOLD LINES ── z-[4] */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,194,0,0.40) 20%, rgba(255,194,0,0.60) 45%, rgba(255,194,0,0.25) 70%, transparent)" }} />
        <div className="absolute top-[15%] bottom-[15%] left-0 w-[2px]" style={{ background: "linear-gradient(180deg, transparent, rgba(255,194,0,0.55) 30%, rgba(255,194,0,0.80) 50%, rgba(255,194,0,0.55) 70%, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(255,194,0,0.50) 0%, rgba(255,194,0,0.18) 45%, transparent 70%)" }} />
      </div>

      {/* ── FLOATING GOLD PARTICLES (left side only — text area) ── z-[5] */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full particle-float"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(255,194,0,${p.op})`,
              boxShadow: `0 0 ${p.size * 4}px rgba(255,194,0,${p.op * 0.5})`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      {/* ── GRAIN OVERLAY ── z-[6] */}
      <div className="absolute inset-0 z-[6] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url(/images/noise.svg)", backgroundSize: "180px 180px" }} />

      {/* ── PAGE CONTENT ── z-10+ */}
      {children}

    </section>
  );
}
