"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    // Some in-app browsers (WhatsApp/Instagram WebViews) throttle rAF or fire
    // scroll events inconsistently, so Lenis -> ScrollTrigger.update can miss
    // updates and leave scroll-reveal elements (.sr / .sr-stagger) stuck at
    // opacity 0 even though they're on screen. Refresh once things settle,
    // then sweep periodically and force-reveal anything already in view.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    const forceReveal = () => {
      document.querySelectorAll<HTMLElement>(".sr, .sr-stagger > *").forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 1 && el.getBoundingClientRect().top < window.innerHeight * 1.15) {
          gsap.set(el, { opacity: 1, y: 0, x: 0 });
        }
      });
    };
    const revealInterval = window.setInterval(forceReveal, 1200);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearInterval(revealInterval);
      gsap.ticker.remove(lenisRaf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
