"use client";

import Image from "next/image";
import { ReactNode } from "react";

/* Fixed particle coords — stable across renders */
const PARTICLES = [
  { x: 42, delay: 0,   dur: 5.5, size: 1.5, op: 0.35 },
  { x: 55, delay: 1.2, dur: 6.2, size: 1.0, op: 0.28 },
  { x: 63, delay: 0.7, dur: 4.8, size: 2.0, op: 0.32 },
  { x: 71, delay: 2.1, dur: 7.0, size: 1.5, op: 0.22 },
  { x: 48, delay: 0.4, dur: 5.0, size: 2.5, op: 0.40 },
  { x: 59, delay: 1.8, dur: 6.5, size: 1.0, op: 0.30 },
  { x: 68, delay: 0.9, dur: 8.0, size: 1.8, op: 0.24 },
  { x: 75, delay: 3.0, dur: 5.2, size: 1.2, op: 0.35 },
  { x: 82, delay: 1.5, dur: 6.8, size: 2.0, op: 0.20 },
  { x: 38, delay: 2.5, dur: 4.5, size: 1.5, op: 0.40 },
  { x: 52, delay: 4.0, dur: 7.5, size: 1.0, op: 0.30 },
  { x: 65, delay: 0.2, dur: 5.8, size: 2.2, op: 0.26 },
  { x: 79, delay: 1.1, dur: 6.3, size: 1.0, op: 0.22 },
  { x: 86, delay: 3.5, dur: 4.2, size: 1.8, op: 0.30 },
  { x: 44, delay: 2.8, dur: 7.2, size: 2.0, op: 0.24 },
  { x: 57, delay: 0.6, dur: 5.4, size: 1.5, op: 0.32 },
  { x: 73, delay: 1.9, dur: 6.0, size: 1.0, op: 0.28 },
  { x: 88, delay: 4.5, dur: 8.5, size: 2.5, op: 0.18 },
];

interface PageHeroProps {
  /** Background image for the hero. Defaults to hero_arena.png. */
  backgroundImage?: string;
  /** Show the championship trophy on the right side. */
  showTrophy?: boolean;
  /** Shifts the central ambient glow: "centered" = 50%, "left" = 38% */
  layout?: "centered" | "left";
  /** Page hero content — rendered above all visual layers. */
  children: ReactNode;
  /** Extra Tailwind classes on the <section> (height, padding, etc.) */
  className?: string;
}

/**
 * Cinematic hero container shared by all inner pages.
 * Provides: background image, dramatic conic-gradient light rays from top-right,
 * floating gold particles, subtle grain, and an optional trophy.
 * Pages pass their own badge/title/cta JSX as children (keeps existing GSAP hooks intact).
 */
export default function PageHero({
  backgroundImage = "/images/hero_arena.png",
  showTrophy = false,
  layout = "centered",
  children,
  className = "",
}: PageHeroProps) {
  const glowX = layout === "centered" ? "50%" : "38%";

  return (
    <section className={`relative flex items-center overflow-hidden ${className}`}>

      {/* ── BACKGROUND IMAGE ─────────────────── z-0 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          style={{ filter: "blur(0.5px) brightness(0.38) saturate(1.3)" }}
        />
      </div>

      {/* ── GRADIENT OVERLAYS ────────────────── z-[1] */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B]/40 via-transparent to-[#0B132B]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/55 via-transparent to-[#0B132B]/30" />
      </div>

      {/* ── DRAMATIC LIGHT RAYS (top-right origin) ── z-[2] */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">

        {/* Primary fan — main golden rays fanning toward bottom-left */}
        <div
          className="absolute inset-[-8%] rays-breathe"
          style={{
            background: `conic-gradient(
              from 0deg at 94% 0%,
              transparent   0deg,
              transparent 183deg,
              rgba(255,194,0,0.28) 196deg,
              rgba(255,210,0,0.18) 206deg,
              transparent         216deg,
              rgba(255,194,0,0.22) 226deg,
              rgba(255,210,0,0.14) 234deg,
              transparent         244deg,
              rgba(255,194,0,0.16) 254deg,
              rgba(255,194,0,0.08) 264deg,
              transparent         274deg,
              rgba(255,194,0,0.12) 284deg,
              transparent         298deg,
              transparent         360deg
            )`,
            filter: "blur(4px)",
          }}
        />

        {/* Secondary, softer rays — slightly offset origin for depth */}
        <div
          className="absolute inset-[-8%]"
          style={{
            background: `conic-gradient(
              from 0deg at 88% 0%,
              transparent   0deg,
              transparent 198deg,
              rgba(255,194,0,0.14) 212deg,
              transparent         228deg,
              rgba(255,194,0,0.10) 244deg,
              transparent         262deg,
              rgba(255,194,0,0.07) 278deg,
              transparent         296deg,
              transparent         360deg
            )`,
            filter: "blur(14px)",
          }}
        />

        {/* Bloom hotspot — stadium floodlight glow at top-right */}
        <div
          className="absolute top-[-8%] right-[-5%]"
          style={{
            width: "48%",
            height: "60%",
            background:
              "radial-gradient(ellipse 76% 76% at 88% 8%, rgba(255,194,0,0.38) 0%, rgba(255,194,0,0.12) 38%, transparent 68%)",
            filter: "blur(28px)",
          }}
        />

        {/* Central ambient gold glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 74% 64% at ${glowX} 56%, rgba(255,194,0,0.10) 0%, transparent 72%)`,
          }}
        />
      </div>

      {/* ── FLOATING GOLD PARTICLES ──────────── z-[3] */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full particle-float"
            style={{
              left: `${p.x}%`,
              bottom: "4%",
              width:  `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(255,194,0,${p.op})`,
              boxShadow: `0 0 ${p.size * 3}px rgba(255,194,0,${p.op * 0.6})`,
              animationDelay:    `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      {/* ── GRAIN OVERLAY ────────────────────── z-[4] */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url(/images/noise.svg)", backgroundSize: "180px 180px" }}
      />

      {/* ── OPTIONAL TROPHY (right side) ─────── z-[5] */}
      {showTrophy && (
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none hidden lg:flex items-center justify-center z-[5]"
          style={{ width: "44%" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 62% 50%, rgba(255,194,0,0.22) 0%, transparent 65%)",
            }}
          />
          <Image
            src="/images/hero-trophy.jpg"
            alt="Championship Trophy"
            width={360}
            height={440}
            className="relative object-contain mix-blend-screen"
            style={{
              opacity: 0.90,
              maskImage:
                "radial-gradient(ellipse 62% 72% at 50% 50%, black 20%, rgba(0,0,0,0.55) 55%, transparent 82%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 62% 72% at 50% 50%, black 20%, rgba(0,0,0,0.55) 55%, transparent 82%)",
              filter: "brightness(1.22) contrast(1.18) saturate(1.15)",
            }}
          />
        </div>
      )}

      {/* ── PAGE CONTENT (children must use z-10+) ── */}
      {children}

    </section>
  );
}
