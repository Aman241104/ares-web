import Link from "next/link";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

const footerTeams = [
  { href: "/teams/modi", label: "Team Modi Visionaries", color: "#E67E22" },
  { href: "/teams/doval", label: "Team Doval Strategists", color: "#1E3A8A" },
  { href: "/teams/amit-shah", label: "Team Amit Shah Warriors", color: "#C0392B" },
  { href: "/teams/jaishankar", label: "Team Jaishankar Diplomats", color: "#27AE60" },
];

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

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
                <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
                  <ellipse cx="12" cy="50" rx="5" ry="3" fill="#DAA537" opacity="0.7" transform="rotate(-30 12 50)" />
                  <ellipse cx="16" cy="44" rx="5" ry="3" fill="#DAA537" opacity="0.7" transform="rotate(-20 16 44)" />
                  <ellipse cx="20" cy="38" rx="5" ry="3" fill="#DAA537" opacity="0.7" transform="rotate(-10 20 38)" />
                  <ellipse cx="24" cy="33" rx="5" ry="3" fill="#DAA537" opacity="0.7" />
                  <ellipse cx="68" cy="50" rx="5" ry="3" fill="#DAA537" opacity="0.7" transform="rotate(30 68 50)" />
                  <ellipse cx="64" cy="44" rx="5" ry="3" fill="#DAA537" opacity="0.7" transform="rotate(20 64 44)" />
                  <ellipse cx="60" cy="38" rx="5" ry="3" fill="#DAA537" opacity="0.7" transform="rotate(10 60 38)" />
                  <ellipse cx="56" cy="33" rx="5" ry="3" fill="#DAA537" opacity="0.7" />
                  <path d="M40 8 L58 28 L58 52 L40 58 L22 52 L22 28 Z" fill="#DAA537" />
                  <path d="M32 38 L28 58 L40 62 L52 58 L48 38 Z" fill="#B8862A" />
                  <path d="M35 36 L45 36 L48 52 L32 52 Z" fill="#DAA537" />
                  <path d="M40 6 L43 18 L40 16 L37 18 Z" fill="#F5D078" />
                </svg>
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
