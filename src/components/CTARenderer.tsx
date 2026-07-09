"use client";
import { usePathname } from "next/navigation";
import GlobalCTA from "./GlobalCTA";

export default function CTARenderer() {
  const pathname = usePathname();
  
  if (pathname === '/contact') {
    return null;
  }

  // Force a full remount on every route change — GlobalCTA lives in the
  // persistent root layout, so without a key React just re-renders the same
  // instance in place across navigations. Its gsap.context()/ScrollTrigger
  // setup only ever ran once, against whichever page mounted it first, so it
  // could misfire (or never fire) on later pages with different layouts.
  return <GlobalCTA key={pathname} />;
}
