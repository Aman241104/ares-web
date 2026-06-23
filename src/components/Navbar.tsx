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
      { href: "/teams/modi", label: "Team Modi", color: "#E67E22" },
      { href: "/teams/doval", label: "Team Doval", color: "#1E3A8A" },
      { href: "/teams/amit-shah", label: "Team Amit Shah", color: "#C0392B" },
      { href: "/teams/jaishankar", label: "Team Jaishankar", color: "#27AE60" },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060d14]/96 backdrop-blur-xl border-b border-[#DAA537]/15 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            {/* Helmet icon */}
            <div className="w-9 h-9 flex-shrink-0">
              <Image 
                src="/images/logos/logo-3.png" 
                alt="ARES Logo" 
                width={80} 
                height={80} 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-cinzel text-[#DAA537] font-black text-base leading-none tracking-widest group-hover:text-[#F5D078] transition-colors" style={{textShadow:"0 0 18px rgba(218,165,55,0.55)"}}>ARES</div>
              <div className="font-montserrat text-white/60 text-[8px] leading-tight tracking-[0.25em] uppercase mt-0.5">Business League</div>
              <div className="font-montserrat text-[#DAA537]/70 text-[7px] leading-tight tracking-[0.2em] uppercase">2026 — Nation Builders</div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`nav-link flex items-center gap-0.5 px-3 py-2 rounded transition-colors ${
                      pathname.startsWith("/teams") ? "text-[#DAA537]" : "text-white/70 hover:text-[#DAA537]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 bg-[#060d14] border border-[#DAA537]/25 rounded-lg py-2 min-w-[190px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 font-montserrat text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`nav-link px-3 py-2 rounded transition-colors ${
                    pathname === link.href ? "text-[#DAA537]" : "text-white/70 hover:text-[#DAA537]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── CTA Button ── */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="font-montserrat font-bold text-[11px] uppercase tracking-wider bg-[#DAA537] text-[#060d14] border border-[#DAA537] px-5 py-2.5 rounded hover:bg-[#F5D078] hover:border-[#F5D078] transition-all duration-200 shadow-[0_0_16px_rgba(218,165,55,0.35)]"
            >
              Register Your Team
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className="lg:hidden text-white/80 hover:text-[#DAA537] transition-colors p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#060d14]/98 backdrop-blur-xl border-t border-[#DAA537]/15">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-0.5">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-3 font-montserrat font-bold text-xs uppercase tracking-wider text-white/70 hover:text-[#DAA537] transition-colors"
                    onClick={() => setTeamsOpen(!teamsOpen)}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${teamsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {teamsOpen && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2 px-3 py-2.5 font-montserrat text-sm text-white/60 hover:text-[#DAA537] transition-colors"
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
                  className={`block px-3 py-3 font-montserrat font-bold text-xs uppercase tracking-wider transition-colors ${
                    pathname === link.href ? "text-[#DAA537]" : "text-white/70 hover:text-[#DAA537]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-[#DAA537]/15 mt-2">
              <Link
                href="/contact"
                className="block w-full text-center btn-primary py-3"
                onClick={() => setMobileOpen(false)}
              >
                Register Your Team
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
