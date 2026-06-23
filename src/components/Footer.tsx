import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
} from "./Icons";

const footerTeams = [
  { href: "/teams/modi", label: "Team Modi Visionaries", color: "var(--team-modi)" },
  { href: "/teams/doval", label: "Team Doval Strategists", color: "var(--team-doval)" },
  { href: "/teams/amit-shah", label: "Team Amit Shah Warriors", color: "var(--team-shah)" },
  { href: "/teams/jaishankar", label: "Team Jaishankar Diplomats", color: "var(--team-jaishankar)" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#000000] overflow-hidden border-t border-white/5">
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-5 mb-8 group">
              <div className="w-14 h-14 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105">
                <Image 
                  src="/images/logos/logo-1.png" 
                  alt="ARES Logo" 
                  width={80} 
                  height={80} 
                  className="w-full h-full object-contain transition-all duration-500" 
                />
              </div>
              <div>
                <div className="font-cinzel text-white font-light text-2xl tracking-[0.2em] transition-colors">ARES</div>
                <div className="font-montserrat text-white/40 text-[9px] leading-tight tracking-[0.4em] uppercase mt-1">Business League</div>
                <div className="font-montserrat text-[#D4AF37]/60 text-[8px] leading-tight tracking-[0.3em] uppercase mt-2">2026 — Nation Builders</div>
              </div>
            </Link>
            <p className="font-montserrat text-white/40 text-xs leading-relaxed mb-10 max-w-sm">
              A high-stakes, one-month business tournament featuring 30 elite business owners competing in 4 iconic teams for one ultimate goal: Nation Building.
            </p>
            <div className="flex items-center gap-4">
              {[
                { href: "https://linkedin.com", icon: <LinkedInIcon />, label: "LinkedIn" },
                { href: "https://instagram.com", icon: <InstagramIcon />, label: "Instagram" },
                { href: "https://facebook.com", icon: <FacebookIcon />, label: "Facebook" },
                { href: "https://youtube.com", icon: <YouTubeIcon />, label: "YouTube" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-12 h-12 flex items-center justify-center text-white/40 bg-white/[0.02] border border-white/5 transition-all duration-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 rounded-xl hover:-translate-y-1"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat text-white font-semibold text-[10px] mb-8 tracking-[0.2em] uppercase">
              Quick Links
            </h4>
            <ul className="space-y-5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/teams", label: "Teams" },
                { href: "/schedule", label: "Schedule" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/wall-of-fame", label: "Wall of Fame" },
                { href: "/blog", label: "Blog" },
                { href: "/partners", label: "Partners" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-montserrat text-white/40 text-xs hover:text-[#D4AF37] transition-colors tracking-wide flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams */}
          <div>
            <h4 className="font-montserrat text-white font-semibold text-[10px] mb-8 tracking-[0.2em] uppercase">
              Teams
            </h4>
            <ul className="space-y-5">
              {footerTeams.map((team) => (
                <li key={team.href}>
                  <Link href={team.href} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: team.color }} />
                    <span className="font-montserrat text-xs text-white/40 group-hover:text-white transition-colors tracking-wide">
                      {team.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-montserrat text-white font-semibold text-[10px] mb-8 tracking-[0.2em] uppercase">
              Contact
            </h4>
            <ul className="space-y-5 mb-10">
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white/40 group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <span className="font-montserrat text-white/40 text-xs group-hover:text-white transition-colors">+91 97680 10720</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <span className="font-montserrat text-white/40 text-xs group-hover:text-white transition-colors">info@aresbusinessleague.com</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-[#D4AF37]/30 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-white/40 group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <span className="font-montserrat text-white/40 text-xs group-hover:text-white transition-colors">India</span>
              </li>
            </ul>
            
            <div className="mb-4">
              <div className="font-montserrat text-white font-semibold text-[10px] tracking-[0.2em] uppercase mb-3">Stay Updated</div>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white/[0.02] border border-white/10 rounded-l-xl px-4 py-3 text-xs font-montserrat text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.04] transition-all"
              />
              <button className="bg-[#D4AF37] text-black font-montserrat text-[10px] font-bold uppercase tracking-widest px-6 rounded-r-xl hover:bg-[#F5D078] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-montserrat text-white/30 text-[10px] tracking-[0.2em] text-center sm:text-left uppercase">
            © 2026 ARES Business League.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/rules" className="font-montserrat text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Rules & FAQ</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/contact" className="font-montserrat text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
