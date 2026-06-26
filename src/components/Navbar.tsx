"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export const navLinks = [
  { href: "/about", label: "About" },
  {
    label: "Teams",
    href: "/teams",
    dropdown: [
      { href: "/teams/modi", label: "Team Modi", color: "var(--team-modi)" },
      { href: "/teams/doval", label: "Team Doval", color: "var(--team-doval)" },
      { href: "/teams/amit-shah", label: "Team Shah", color: "var(--team-shah)" },
      { href: "/teams/jaishankar", label: "Team Jaishankar", color: "var(--team-jaishankar)" },
    ],
  },
  { href: "/schedule", label: "Events" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/wall-of-fame", label: "Wall of Fame" },
  { href: "/blog", label: "Blog" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={`absolute lg:fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none px-4 sm:px-10 lg:px-16 ${scrolled ? "pt-4" : "pt-0"}`}>
      <header
        className={`pointer-events-auto transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-full ${
          scrolled
            ? "bg-[#080600]/92 backdrop-blur-2xl border border-[rgba(212,175,55,0.15)] shadow-[0_8px_40px_rgba(0,0,0,0.9)] rounded-full px-2 max-w-[1300px]"
            : "bg-gradient-to-b from-[#080600]/85 via-[#080600]/40 to-transparent max-w-[90rem]"
        }`}
      >
        <div className={`mx-auto transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "px-6" : "px-0"}`}>
          <div className={`flex items-center justify-center lg:justify-between gap-6 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "h-[60px]" : "h-[80px]"}`}>

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <div className={`flex-shrink-0 opacity-90 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 ${scrolled ? "w-10 h-10" : "w-14 h-14 xl:w-16 xl:h-16"}`}>
              <Image
                src="/images/logo.png"
                alt="ARES Business League 2026"
                width={80}
                height={80}
                priority
                className="w-full h-full object-contain transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden xl:flex items-center gap-1.5 lg:gap-3 2xl:gap-5">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1.5 px-3 py-2 font-montserrat text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 whitespace-nowrap ${
                      pathname.startsWith("/teams") ? "text-[#D4AF37]" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3 h-3 opacity-40 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-[#0C0900]/98 backdrop-blur-2xl border border-[rgba(212,175,55,0.18)] rounded-sm py-3 min-w-[240px] opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 shadow-2xl z-50">
                    <div className="px-6 py-2 mb-2 border-b border-white/5">
                      <div className="font-montserrat text-white/30 text-[8px] uppercase tracking-[0.2em]">Select a Team</div>
                    </div>
                    {link.dropdown.map((item) => (
                      <Link
                         key={item.href}
                         href={item.href}
                         className="flex items-center gap-4 px-6 py-3 font-montserrat text-[11px] tracking-wider text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors whitespace-nowrap"
                      >
                         <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-70" style={{ backgroundColor: item.color }} />
                         {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`px-3 py-2 font-montserrat text-[10px] uppercase tracking-widest font-bold transition-all duration-300 whitespace-nowrap ${
                    pathname === link.href ? "text-[#D4AF37]" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── CTA Button ── */}
          <div className="hidden xl:flex items-center gap-3 ml-4 lg:ml-6 flex-shrink-0">
            <Link href="/contact" className="btn-secondary whitespace-nowrap" style={{ padding: "10px 20px", fontSize: "10px" }}>
              Contact
            </Link>
            <Link href="/web-partner" className="btn-primary whitespace-nowrap" style={{ padding: "10px 22px", fontSize: "10px" }}>
              Register Your Team
            </Link>
          </div>


        </div>
        </div>
      </header>


    </div>
  );
}
