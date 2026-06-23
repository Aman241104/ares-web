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
    <footer className="relative bg-[#020202] overflow-hidden border-t border-white/5">
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(circle at 50% 100%, rgba(212,175,55,0.03) 0%, transparent 50%)"}} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <div className="w-12 h-12 flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
                <Image 
                  src="/images/logos/logo-3.png" 
                  alt="ARES Logo" 
                  width={80} 
                  height={80} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <div className="font-cinzel text-white font-light text-xl tracking-[0.2em] transition-colors">ARES</div>
                <div className="font-montserrat text-white/40 text-[8px] leading-tight tracking-[0.4em] uppercase mt-1">Business League</div>
                <div className="font-montserrat text-[#D4AF37]/50 text-[7px] leading-tight tracking-[0.25em] uppercase mt-1">2026 — Nation Builders</div>
              </div>
            </Link>
            <p className="font-montserrat text-white/40 text-xs leading-loose mb-8 max-w-sm">
              A high-stakes, one-month business tournament featuring 30 elite business owners competing in 4 iconic teams for one ultimate goal: Nation Building.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: "#", icon: <LinkedInIcon />, label: "LinkedIn" },
                { href: "#", icon: <InstagramIcon />, label: "Instagram" },
                { href: "#", icon: <FacebookIcon />, label: "Facebook" },
                { href: "#", icon: <YouTubeIcon />, label: "YouTube" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center text-white/40 transition-all duration-300 hover:text-white hover:bg-white/5 rounded-full"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat text-white font-semibold text-[10px] mb-6 tracking-[0.2em] uppercase">
              Quick Links
            </h4>
            <ul className="space-y-4">
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
                  <Link href={link.href} className="font-montserrat text-white/40 text-xs hover:text-white transition-colors tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams */}
          <div>
            <h4 className="font-montserrat text-white font-semibold text-[10px] mb-6 tracking-[0.2em] uppercase">
              Teams
            </h4>
            <ul className="space-y-4">
              {footerTeams.map((team) => (
                <li key={team.href}>
                  <Link href={team.href} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: team.color }} />
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
            <h4 className="font-montserrat text-white font-semibold text-[10px] mb-6 tracking-[0.2em] uppercase">
              Contact
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-white/30" />
                <span className="font-montserrat text-white/40 text-xs">+91 97680 10720</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-white/30" />
                <span className="font-montserrat text-white/40 text-xs">info@aresbusinessleague.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-3.5 h-3.5 text-white/30" />
                <span className="font-montserrat text-white/40 text-xs">India</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-3.5 h-3.5 text-white/30" />
                <span className="font-montserrat text-white/40 text-xs">aresbusinessleague.com</span>
              </li>
            </ul>
            <div className="mb-4">
              <div className="font-montserrat text-white font-semibold text-[10px] tracking-[0.2em] uppercase mb-2">Stay Updated</div>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent border-b border-white/10 px-0 py-2 text-xs font-montserrat text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button className="text-[#D4AF37] font-montserrat text-[10px] uppercase tracking-widest px-4 border-b border-white/10 hover:border-[#D4AF37] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-montserrat text-white/20 text-[10px] tracking-widest text-center sm:text-left uppercase">
            © 2026 ARES Business League.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/rules" className="font-montserrat text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Rules & FAQ</Link>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <Link href="/contact" className="font-montserrat text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
