"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export const navLinks = [
  { href: "/about", label: "About" },
  {
    label: "Teams",
    href: "/teams",
    dropdown: [
      { href: "/teams/modi",       label: "Team Modi",       sub: "Visionaries",  color: "var(--team-modi)" },
      { href: "/teams/doval",      label: "Team Doval",      sub: "Strategists",  color: "var(--team-doval)" },
      { href: "/teams/amit-shah",  label: "Team Shah",       sub: "Warriors",     color: "var(--team-shah)" },
      { href: "/teams/jaishankar", label: "Team Jaishankar", sub: "Diplomats",    color: "var(--team-jaishankar)" },
    ],
  },
  { href: "/schedule",    label: "Events" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/wall-of-fame", label: "Hall of Fame" },
  { href: "/blog",        label: "Blog" },
  { href: "/partners",    label: "Partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`absolute lg:fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "px-4 sm:px-6 pt-3" : "px-0 pt-0"
      }`}
    >
      <header
        className={`pointer-events-auto w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "bg-[#080600]/94 backdrop-blur-2xl border border-[rgba(212,175,55,0.14)] shadow-[0_8px_50px_rgba(0,0,0,0.95),0_0_0_0.5px_rgba(212,175,55,0.08)] rounded-2xl max-w-[1280px]"
            : "bg-gradient-to-b from-[#080600]/75 via-[#080600]/35 to-transparent max-w-full"
        }`}
      >
        {/* Top gold line when scrolled */}
        {scrolled && (
          <div className="absolute top-0 left-8 right-8 h-px rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35) 30%, rgba(212,175,55,0.35) 70%, transparent)" }} />
        )}

        <div className={`transition-all duration-700 ${scrolled ? "px-5 sm:px-6" : "px-4 sm:px-10 lg:px-16"}`}>
          <div className={`flex items-center justify-between gap-6 transition-all duration-700 ${scrolled ? "h-[58px]" : "h-[76px]"}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <div className={`flex-shrink-0 transition-all duration-700 group-hover:scale-105 ${scrolled ? "w-9 h-9" : "w-13 h-13 sm:w-14 sm:h-14"}`}>
                <Image
                  src="/images/logo.png"
                  alt="ARES Business League 2026"
                  width={72}
                  height={72}
                  priority
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              {!scrolled && (
                <div className="ml-3 hidden sm:block">
                  <div className="font-cinzel text-white text-[11px] tracking-[0.25em] leading-none">ARES</div>
                  <div className="font-montserrat text-[#D4AF37]/60 text-[7px] tracking-[0.35em] uppercase mt-0.5">Business League</div>
                </div>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="relative group">
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 font-montserrat text-[9.5px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 rounded-sm whitespace-nowrap ${
                        pathname.startsWith("/teams")
                          ? "text-[#D4AF37] bg-[#D4AF37]/6"
                          : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-3 h-3 opacity-40 group-hover:rotate-180 transition-transform duration-300" />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2.5 opacity-0 translate-y-3 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-[#0C0900]/97 backdrop-blur-2xl border border-[rgba(212,175,55,0.15)] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_0_0.5px_rgba(212,175,55,0.08)] min-w-[230px] overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                        <div className="px-5 py-3 border-b border-white/5">
                          <div className="font-montserrat text-white/25 text-[7px] uppercase tracking-[0.3em]">Select a Team</div>
                        </div>
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3.5 px-5 py-3.5 font-montserrat text-[10px] tracking-[0.12em] text-white/45 hover:text-white hover:bg-white/[0.04] transition-all duration-200 whitespace-nowrap group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover/item:scale-125" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                            <span className="flex-1">{item.label}</span>
                            <span className="font-montserrat text-[7px] uppercase tracking-[0.2em] opacity-40" style={{ color: item.color }}>{item.sub}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`px-3.5 py-2.5 font-montserrat text-[9.5px] uppercase tracking-[0.18em] font-semibold transition-all duration-300 rounded-sm whitespace-nowrap ${
                      pathname === link.href
                        ? "text-[#D4AF37] bg-[#D4AF37]/6"
                        : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden xl:flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/contact"
                className="btn-secondary whitespace-nowrap"
                style={{ padding: "9px 18px", fontSize: "9.5px", letterSpacing: "0.18em" }}
              >
                Contact
              </Link>
              <Link
                href="/web-partner"
                className="btn-primary whitespace-nowrap"
                style={{ padding: "9px 20px", fontSize: "9.5px", letterSpacing: "0.18em" }}
              >
                Build Your Site
              </Link>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
