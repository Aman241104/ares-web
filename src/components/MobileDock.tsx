"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Trophy, Calendar, Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import { navLinks } from "./Navbar";

export default function MobileDock() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const dockItems = [
    { href: "/",            label: "Home",   icon: <Home     className="w-5 h-5" /> },
    { href: "/teams",       label: "Teams",  icon: <Users    className="w-5 h-5" /> },
    { href: "/leaderboard", label: "Rank",   icon: <Trophy   className="w-5 h-5" /> },
    { href: "/schedule",    label: "Events", icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] transition-all duration-400 xl:hidden ${
          menuOpen ? "bg-black/70 backdrop-blur-sm pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[95] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#030712] border-t border-[rgba(212,175,55,0.15)] rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.9)] pb-28 pt-5 px-5">
          {/* Handle bar */}
          <div className="w-10 h-1 bg-white/15 rounded-full mx-auto mb-6" />

          {/* Header */}
          <div className="flex justify-between items-center mb-5 px-1">
            <div>
              <div className="font-cinzel text-[#D4AF37] text-base tracking-widest">Navigation</div>
              <div className="font-montserrat text-white/45 text-[8px] uppercase tracking-[0.3em] mt-0.5">ARES Business League</div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/8 rounded-full text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav links */}
          <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
            {navLinks.map((link) => {
              const isActive = link.href ? pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) : pathname.startsWith("/teams");
              return (
                <Link
                  key={link.label}
                  href={link.href || "/teams"}
                  className={`flex items-center justify-between px-5 py-4 border transition-all duration-300 ${
                    isActive
                      ? "border-[rgba(212,175,55,0.3)] bg-[#D4AF37]/6 text-[#D4AF37]"
                      : "border-white/5 bg-white/[0.05] text-white/60 hover:bg-white/[0.04] hover:text-white hover:border-white/10"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="font-montserrat text-[11px] uppercase tracking-[0.18em] font-semibold">{link.label}</span>
                  <ChevronRight className={`w-4 h-4 transition-colors ${isActive ? "text-[#D4AF37]/60" : "text-white/20"}`} />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-5 pt-5 border-t border-white/8">
            <Link
              href="/contact"
              className="btn-primary w-full justify-center gap-3"
              onClick={() => setMenuOpen(false)}
            >
              Build Your Website <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] xl:hidden w-[calc(100%-2.5rem)] max-w-[340px]">
        <div className="relative bg-[#000000]/92 backdrop-blur-2xl border border-[rgba(212,175,55,0.15)] rounded-2xl shadow-[0_12px_50px_rgba(0,0,0,0.9),0_0_0_0.5px_rgba(212,175,55,0.06)] px-3 py-2.5 flex items-center gap-1">
          {/* Top gold line */}
          <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />

          {dockItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-300 relative ${
                  isActive ? "text-[#D4AF37]" : "text-white/60 hover:text-white/70"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/14 border border-[#D4AF37]/15" />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-[9px] font-montserrat uppercase tracking-[0.12em] mt-1 font-semibold">{item.label}</span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-300 relative ${
              menuOpen ? "text-[#D4AF37]" : "text-white/60 hover:text-white/70"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen && <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/14 border border-[#D4AF37]/15" />}
            <span className="relative z-10">{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</span>
            <span className="relative z-10 text-[9px] font-montserrat uppercase tracking-[0.12em] mt-1 font-semibold">More</span>
          </button>
        </div>
      </div>
    </>
  );
}
