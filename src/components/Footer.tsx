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
  { href: "/teams/modi", label: "Team Modi Visionaries", color: "#E67E22" },
  { href: "/teams/doval", label: "Team Doval Strategists", color: "#1E3A8A" },
  { href: "/teams/amit-shah", label: "Team Amit Shah Warriors", color: "#C0392B" },
  { href: "/teams/jaishankar", label: "Team Jaishankar Diplomats", color: "#27AE60" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{background:"linear-gradient(180deg, #060d14 0%, #030810 100%)"}}>
      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg, transparent, rgba(218,165,55,0.4) 30%, rgba(218,165,55,0.6) 50%, rgba(218,165,55,0.4) 70%, transparent)"}} />
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(218,165,55,0.05) 0%, transparent 65%)"}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-14 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 flex-shrink-0">
                <Image 
                  src="/images/logos/logo-3.png" 
                  alt="ARES Logo" 
                  width={80} 
                  height={80} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <div className="font-cinzel text-[#DAA537] font-black text-lg leading-none tracking-widest group-hover:text-[#F5D078] transition-colors" style={{textShadow:"0 0 18px rgba(218,165,55,0.4)"}}>ARES</div>
                <div className="font-montserrat text-white/60 text-[8px] leading-tight tracking-[0.3em] uppercase mt-0.5">Business League</div>
                <div className="font-montserrat text-[#DAA537]/60 text-[7px] leading-tight tracking-[0.25em] uppercase">2026 — Nation Builders</div>
              </div>
            </Link>
            <p className="font-montserrat text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              A high-stakes, one-month business tournament featuring 30 elite business owners competing in 4 iconic teams for one ultimate goal: Nation Building.
            </p>
            <div className="flex items-center gap-2">
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
                  className="w-9 h-9 rounded border flex items-center justify-center text-[#DAA537] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#DAA537] hover:text-[#060d14] hover:border-[#DAA537]"
                  style={{background:"rgba(218,165,55,0.07)", borderColor:"rgba(218,165,55,0.25)"}}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-[#DAA537] font-bold text-xs mb-5 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-[#DAA537]/60" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/teams", label: "Teams" },
                { href: "/schedule", label: "Schedule" },
                { href: "/leaderboard", label: "Leaderboard" },
                { href: "/wall-of-fame", label: "Wall of Fame" },
                { href: "/blog", label: "Blog" },
                { href: "/gallery", label: "Gallery" },
                { href: "/partners", label: "Partners" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link font-montserrat text-xs flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#DAA537]/30 group-hover:bg-[#DAA537] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams */}
          <div>
            <h4 className="font-cinzel text-[#DAA537] font-bold text-xs mb-5 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-[#DAA537]/60" />
              Teams
            </h4>
            <ul className="space-y-3.5">
              {footerTeams.map((team) => (
                <li key={team.href}>
                  <Link href={team.href} className="flex items-center gap-2.5 group">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-125" style={{ backgroundColor: team.color }} />
                    <span className="font-montserrat text-xs text-white/50 group-hover:text-white/90 transition-colors leading-tight">
                      {team.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-cinzel text-[#DAA537] font-bold text-xs mb-5 tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="w-4 h-px bg-[#DAA537]/60" />
              Contact
            </h4>
            <ul className="space-y-3 mb-7">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#DAA537] flex-shrink-0" />
                <span className="font-montserrat text-white/50 text-xs">+91 97680 10720</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#DAA537] flex-shrink-0" />
                <span className="font-montserrat text-white/50 text-xs">info@aresbusinessleague.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#DAA537] flex-shrink-0" />
                <span className="font-montserrat text-white/50 text-xs">India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-3.5 h-3.5 text-[#DAA537] flex-shrink-0" />
                <span className="font-montserrat text-white/50 text-xs">aresbusinessleague.com</span>
              </li>
            </ul>
            <div className="mb-2">
              <div className="font-cinzel text-[#DAA537] font-bold text-xs mb-2 tracking-[0.2em] uppercase">Stay Updated</div>
              <p className="font-montserrat text-white/40 text-xs mb-3 leading-relaxed">
                Get tournament updates, insights and news.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#0a1520] border border-[#DAA537]/20 rounded px-3 py-2.5 text-xs font-montserrat text-white placeholder-white/30 focus:outline-none focus:border-[#DAA537]/60 transition-colors min-w-0"
              />
              <button className="btn-primary text-[10px] py-2.5 px-3.5 whitespace-nowrap">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{background:"linear-gradient(90deg, transparent, rgba(218,165,55,0.2) 30%, rgba(218,165,55,0.3) 50%, rgba(218,165,55,0.2) 70%, transparent)"}} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-montserrat text-white/30 text-[11px] text-center sm:text-left">
            © 2026 ARES Business League. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/rules" className="font-montserrat text-white/30 text-[11px] hover:text-[#DAA537] transition-colors">Rules & FAQ</Link>
            <span className="w-px h-3 bg-white/20" />
            <Link href="/contact" className="font-montserrat text-white/30 text-[11px] hover:text-[#DAA537] transition-colors">Contact</Link>
            <span className="w-px h-3 bg-white/20" />
            <span className="font-cinzel text-[#DAA537]/40 text-[10px] tracking-[0.3em] uppercase">One League. Endless Possibilities.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
