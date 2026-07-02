"use client";
import { usePathname } from "next/navigation";
import GlobalCTA from "./GlobalCTA";

export default function CTARenderer() {
  const pathname = usePathname();
  
  if (pathname === '/contact' || pathname === '/about') {
    return null;
  }
  
  return <GlobalCTA />;
}
