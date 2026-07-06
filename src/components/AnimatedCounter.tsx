"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedCounter({
  value,
  duration = 1.6,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d,]*\d)(.*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }
    const hasCommas = match[1].includes(",");
    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2] || "";
    const counter = { val: 0 };

    const tween = gsap.to(counter, {
      val: target,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.round(counter.val);
        el.textContent = (hasCommas ? rounded.toLocaleString() : String(rounded)) + suffix;
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    return () => {
      tween.kill();
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
