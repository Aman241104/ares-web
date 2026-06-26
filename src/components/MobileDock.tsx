"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Trophy, Calendar, Menu, X, ChevronRight } from "lucide-react";
import { navLinks } from "./Navbar";

export default function MobileDock() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const dockItems = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/teams", label: "Teams", icon: <Users className="w-5 h-5" /> },
    { href: "/leaderboard", label: "Rank", icon: <Trophy className="w-5 h-5" /> },
    { href: "/schedule", label: "Events", icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Bottom Sheet Menu */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-[#0C0900] border-t border-white/10 rounded-t-3xl pt-6 pb-24 px-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-cinzel text-[#D4AF37] text-xl tracking-widest">Menu</h3>
            <button onClick={() => setMenuOpen(false)} className="p-2 bg-white/5 rounded-full text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href || "#"}
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <span className="font-montserrat text-xs uppercase tracking-widest text-white/80 font-bold">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-white/30" />
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <Link href="/web-partner" className="btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
              Build Your Website
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] xl:hidden w-[calc(100%-2rem)] max-w-sm">
        <div className="bg-[#0C0900]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.8)] px-2 py-2 flex justify-between items-center">
          {dockItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center justify-center w-14 h-12 rounded-full transition-all ${
                  isActive ? "text-[#D4AF37] bg-white/5" : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.icon}
                <span className="text-[8px] font-montserrat uppercase tracking-wider mt-1">{item.label}</span>
              </Link>
            );
          })}
          
          <button 
            className={`flex flex-col items-center justify-center w-14 h-12 rounded-full transition-all ${
              menuOpen ? "text-[#D4AF37] bg-white/5" : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[8px] font-montserrat uppercase tracking-wider mt-1">More</span>
          </button>
        </div>
      </div>
    </>
  );
}
