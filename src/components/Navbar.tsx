"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
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
  { href: "/schedule", label: "Schedule" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/wall-of-fame", label: "Wall of Fame" },
  { href: "/blog", label: "Blog" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#020202]/70 backdrop-blur-2xl border-b border-white/5 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-[60px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-4 flex-shrink-0 group">
            <div className="w-10 h-10 flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
              <Image 
                src="/images/logos/logo-3.png" 
                alt="ARES Logo" 
                width={80} 
                height={80} 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-cinzel text-white font-light text-xl tracking-[0.2em] group-hover:text-white transition-colors">ARES</div>
              <div className="font-montserrat text-white/40 text-[8px] leading-tight tracking-[0.4em] uppercase mt-1">Business League</div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`nav-link flex items-center gap-1.5 px-4 py-2 ${
                      pathname.startsWith("/teams") ? "text-white" : ""
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3 h-3 opacity-40 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full left-0 mt-4 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-sm py-2 min-w-[220px] opacity-0 translate-y-4 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 shadow-2xl z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-6 py-3 font-montserrat text-xs tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition-colors"
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
                  className={`nav-link px-4 py-2 ${
                    pathname === link.href ? "text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── CTA Button ── */}
          <div className="hidden lg:block ml-4">
            <Link
              href="/contact"
              className="btn-primary"
            >
              Register Team
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="lg:hidden text-white/70 hover:text-white transition-colors p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#050505]/98 backdrop-blur-2xl border-t border-white/5 mt-4">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between px-4 py-4 font-montserrat text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                    onClick={() => setTeamsOpen(!teamsOpen)}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${teamsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {teamsOpen && (
                    <div className="pl-6 pb-4 space-y-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 font-montserrat text-[11px] tracking-wider text-white/40 hover:text-white transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`block px-4 py-4 font-montserrat text-xs uppercase tracking-[0.2em] transition-colors ${
                    pathname === link.href ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-6 border-t border-white/5 mt-4">
              <Link
                href="/contact"
                className="block w-full text-center btn-primary"
                onClick={() => setMobileOpen(false)}
              >
                Register Team
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
