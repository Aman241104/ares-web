import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  YouTubeIcon,
} from "./Icons";

const footerTeams = [
  { href: "/teams/modi",       label: "Team Modi Visionaries",      color: "var(--team-modi)" },
  { href: "/teams/doval",      label: "Team Doval Strategists",     color: "var(--team-doval)" },
  { href: "/teams/amit-shah",  label: "Team Shah Warriors",         color: "var(--team-shah)" },
  { href: "/teams/jaishankar", label: "Team Jaishankar Diplomats",  color: "var(--team-jaishankar)" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060400] overflow-hidden">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 20%, rgba(240,208,96,0.8) 50%, rgba(212,175,55,0.5) 80%, transparent 100%)" }} />

      {/* Background textures */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-10 blur-[100px]" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10 relative">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 mb-7 group">
              <div className="w-16 h-16 flex-shrink-0 opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="ARES Business League 2026"
                  width={64}
                  height={64}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-cinzel text-white text-base tracking-[0.25em] leading-none">ARES</div>
                <div className="font-montserrat text-[#D4AF37]/50 text-[8px] tracking-[0.4em] uppercase mt-1">Business League</div>
                <div className="font-montserrat text-white/20 text-[7px] tracking-[0.3em] uppercase mt-0.5">2026 Edition</div>
              </div>
            </Link>

            <p className="font-montserrat text-white/35 text-[10px] sm:text-xs leading-[1.9] mb-8 max-w-xs tracking-wide">
              A high-stakes, one-month business tournament featuring 30 elite BNI business owners competing in 4 iconic teams for one ultimate goal: Nation Building.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { href: "https://linkedin.com",  icon: <LinkedInIcon />,  label: "LinkedIn" },
                { href: "https://instagram.com", icon: <InstagramIcon />, label: "Instagram" },
                { href: "https://facebook.com",  icon: <FacebookIcon />,  label: "Facebook" },
                { href: "https://youtube.com",   icon: <YouTubeIcon />,   label: "YouTube" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-white/30 bg-white/[0.025] border border-white/6 transition-all duration-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/6 rounded-lg hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(212,175,55,0.15)]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-white text-xs tracking-[0.25em] uppercase mb-7 pb-3 border-b border-white/6">
              Explore
            </h4>
            <ul className="space-y-3.5">
              {[
                { href: "/",             label: "Home" },
                { href: "/about",        label: "About" },
                { href: "/teams",        label: "Teams" },
                { href: "/schedule",     label: "Schedule" },
                { href: "/leaderboard",  label: "Leaderboard" },
                { href: "/wall-of-fame", label: "Hall of Fame" },
                { href: "/blog",         label: "Blog" },
                { href: "/partners",     label: "Partners" },
                { href: "/web-partner",  label: "Build Your Site" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-montserrat text-white/35 text-[10px] sm:text-xs hover:text-[#D4AF37] transition-colors tracking-wide flex items-center gap-2 group">
                    <span className="w-0 h-px bg-[#D4AF37] transition-all duration-300 group-hover:w-4 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams */}
          <div className="lg:col-span-3">
            <h4 className="font-cinzel text-white text-xs tracking-[0.25em] uppercase mb-7 pb-3 border-b border-white/6">
              The Factions
            </h4>
            <ul className="space-y-4">
              {footerTeams.map((team) => (
                <li key={team.href}>
                  <Link href={team.href} className="flex items-center gap-3 group">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125" style={{ backgroundColor: team.color, opacity: 0.5, boxShadow: `0 0 6px ${team.color}` }} />
                    <span className="font-montserrat text-[10px] sm:text-xs text-white/35 group-hover:text-white transition-colors tracking-wide">
                      {team.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Tournament dates */}
            <div className="mt-8 p-4 border border-[rgba(212,175,55,0.12)] bg-[#D4AF37]/4 rounded-sm">
              <div className="font-montserrat text-[7px] uppercase tracking-[0.3em] text-[#D4AF37]/60 mb-2">Tournament Window</div>
              <div className="font-cinzel text-white text-sm tracking-wider">June 24 – July 22</div>
              <div className="font-montserrat text-white/30 text-[8px] tracking-wider mt-0.5">2026</div>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-cinzel text-white text-xs tracking-[0.25em] uppercase mb-7 pb-3 border-b border-white/6">
              Connect
            </h4>
            <ul className="space-y-4 mb-8">
              {[
                { icon: <Phone className="w-3.5 h-3.5" />, text: "+91 97680 10720" },
                { icon: <Mail  className="w-3.5 h-3.5" />, text: "info@aresbusinessleague.com" },
                { icon: <MapPin className="w-3.5 h-3.5" />, text: "India" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/[0.025] border border-white/6 flex items-center justify-center text-white/30 group-hover:border-[#D4AF37]/25 group-hover:text-[#D4AF37]/70 transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="font-montserrat text-white/35 text-[10px] sm:text-xs group-hover:text-white/70 transition-colors tracking-wide">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <div className="font-montserrat text-white/40 text-[8px] uppercase tracking-[0.3em] mb-3">Stay Updated</div>
              <div className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/[0.03] border border-white/8 rounded-l-sm px-4 py-3 text-[10px] font-montserrat text-white placeholder-white/15 focus:outline-none focus:border-[#D4AF37]/40 focus:bg-white/[0.05] transition-all tracking-wider"
                />
                <button className="bg-[#D4AF37] hover:bg-[#E8C840] text-black font-montserrat text-[8px] font-bold uppercase tracking-[0.2em] px-5 rounded-r-sm transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <p className="font-montserrat text-white/25 text-[9px] tracking-[0.25em] uppercase">
              © 2026 ARES Business League
            </p>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <p className="font-montserrat text-white/20 text-[8px] tracking-[0.2em] uppercase">
              All rights reserved
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/rules"   className="font-montserrat text-white/30 text-[8px] font-semibold uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Rules & FAQ</Link>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <Link href="/contact" className="font-montserrat text-white/30 text-[8px] font-semibold uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">Contact</Link>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <Link href="/about"   className="font-montserrat text-white/30 text-[8px] font-semibold uppercase tracking-[0.2em] hover:text-[#D4AF37] transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
