import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Code2, Calculator, Smartphone, CheckCircle, Circle } from "lucide-react";

const OFFERINGS = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Website",
    desc: "Stunning, SEO-ready websites that convert visitors into clients.",
    badge: "Most Popular",
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Business Software",
    desc: "Custom CRMs, portals, and workflow tools built for your operations.",
    badge: null,
  },
  {
    icon: <Calculator className="w-5 h-5" />,
    title: "Accounting Software",
    desc: "Tailored billing, invoicing, and finance management systems.",
    badge: null,
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile App",
    desc: "iOS & Android apps that put your business in your customers' pockets.",
    badge: null,
  },
];

const PERKS = [
  "Exclusive ABL member pricing",
  "Launch-ready in 2–4 weeks",
  "Free strategy consultation",
];

export default function LegacyCTA() {
  return (
    <section className="relative overflow-hidden bg-[#07101F] border-t border-[rgba(212,175,55,0.15)]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 65%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 20%, rgba(240,208,96,0.8) 50%, rgba(212,175,55,0.5) 80%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-32 pb-36 sm:pb-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT — Device mockup visual */}
          <div className="hidden lg:flex lg:col-span-4 items-center justify-center relative">
            <div className="relative w-full max-w-[340px]">
              {/* Ambient glow */}
              <div className="absolute inset-0 blur-[90px] opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.7) 0%, transparent 70%)" }} />

              {/* ── BROWSER WINDOW ── */}
              <div className="relative z-10 rounded-lg overflow-hidden border border-[rgba(212,175,55,0.25)] shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_0_0.5px_rgba(212,175,55,0.12)] float-slow">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0D1424] border-b border-white/8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-white/5 border border-white/8 rounded-sm px-3 py-1 flex items-center gap-2">
                      <Globe className="w-2.5 h-2.5 text-[#D4AF37]/50 flex-shrink-0" />
                      <span className="font-montserrat text-[7px] text-white/40 tracking-widest truncate">yourbusiness.com</span>
                    </div>
                  </div>
                </div>

                {/* Website body */}
                <div className="bg-[#07101F] p-4 space-y-3">
                  {/* Navbar mock */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="w-16 h-2 rounded-full bg-[#D4AF37]/40" />
                    <div className="flex gap-2">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-1.5 rounded-full bg-white/10" />)}
                    </div>
                    <div className="w-14 h-5 rounded-sm" style={{ background: "linear-gradient(90deg,#D4AF37,#C9921A)" }} />
                  </div>

                  {/* Hero mock */}
                  <div className="relative rounded-sm overflow-hidden" style={{ aspectRatio: "16/6" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B] to-[#1a2a4a]" />
                    <div className="absolute inset-0 flex flex-col justify-center px-4">
                      <div className="w-3/4 h-2.5 rounded-full mb-2" style={{ background: "linear-gradient(90deg,#F3E5AB,#D4AF37)" }} />
                      <div className="w-1/2 h-1.5 rounded-full bg-white/20 mb-3" />
                      <div className="w-16 h-4 rounded-sm" style={{ background: "linear-gradient(90deg,#D4AF37,#C9921A)" }} />
                    </div>
                  </div>

                  {/* Cards mock */}
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="rounded-sm bg-[#111827] border border-white/6 p-2 space-y-1.5">
                        <div className="w-5 h-5 rounded-sm bg-[#D4AF37]/20" />
                        <div className="w-full h-1 rounded-full bg-white/15" />
                        <div className="w-3/4 h-1 rounded-full bg-white/8" />
                      </div>
                    ))}
                  </div>

                  {/* Stats row mock */}
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-[#D4AF37]/6 border border-[#D4AF37]/12 p-2 text-center">
                        <div className="w-8 h-2.5 rounded-full mx-auto mb-1" style={{ background: "rgba(212,175,55,0.5)" }} />
                        <div className="w-10 h-1 rounded-full mx-auto bg-white/15" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── MOBILE PHONE ── */}
              <div className="absolute -bottom-6 -right-4 z-20 w-[88px] rounded-xl overflow-hidden border border-[rgba(212,175,55,0.3)] shadow-[0_12px_40px_rgba(0,0,0,0.8)] float-slow" style={{ animationDelay: "1.5s" }}>
                {/* Phone notch bar */}
                <div className="bg-[#0D1424] border-b border-white/8 py-1.5 flex justify-center">
                  <div className="w-8 h-1 rounded-full bg-white/20" />
                </div>
                {/* Phone screen */}
                <div className="bg-[#07101F] p-2 space-y-1.5">
                  <div className="w-full h-10 rounded-sm bg-gradient-to-br from-[#0B132B] to-[#1a2a4a] border border-white/5 flex items-center justify-center">
                    <div className="w-10 h-2 rounded-full" style={{ background: "linear-gradient(90deg,#D4AF37,#C9921A)" }} />
                  </div>
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-1 items-center">
                      <div className="w-4 h-4 rounded-sm flex-shrink-0 bg-[#D4AF37]/15" />
                      <div className="flex-1 space-y-0.5">
                        <div className="w-full h-1 rounded-full bg-white/15" />
                        <div className="w-2/3 h-1 rounded-full bg-white/8" />
                      </div>
                    </div>
                  ))}
                  <div className="w-full h-4 rounded-sm" style={{ background: "linear-gradient(90deg,#D4AF37,#C9921A)", opacity: 0.8 }} />
                </div>
                {/* Home bar */}
                <div className="bg-[#0D1424] border-t border-white/8 py-1.5 flex justify-center">
                  <div className="w-6 h-1 rounded-full bg-white/25" />
                </div>
              </div>

              {/* ── LAPTOP CHIP ── */}
              <div className="absolute -top-5 -left-4 z-20 bg-[#0D1424] border border-[rgba(212,175,55,0.25)] rounded-sm px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.7)] flex items-center gap-2">
                <Code2 className="w-3 h-3 text-[#D4AF37]" />
                <span className="font-montserrat text-[7px] uppercase tracking-[0.25em] text-white/70">Built for You</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Copy */}
          <div className="lg:col-span-8">
            <div className="section-label mb-6">Exclusive for ABL Members</div>

            <h2 className="font-cinzel font-bold text-white leading-tight mb-5" style={{ fontSize: "clamp(28px,3.2vw,46px)" }}>
              WANT TO BUILD SOMETHING<br className="hidden sm:block" />
              <span className="text-gold-gradient"> FOR YOUR BUSINESS?</span>
            </h2>

            <p className="font-montserrat text-white/70 text-sm mb-7 leading-[2] max-w-xl tracking-wide">
              From a high-performance website to custom business software and accounting systems — we build digital products that work as hard as you do.
            </p>

            {/* Perks */}
            <div className="flex flex-wrap gap-5 mb-9">
              {PERKS.map((p) => (
                <div key={p} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]/70 flex-shrink-0" />
                  <span className="font-montserrat text-white/50 text-[9px] uppercase tracking-[0.2em]">{p}</span>
                </div>
              ))}
            </div>

            {/* Offerings grid */}
            <div className="grid grid-cols-2 gap-3 mb-9">
              {OFFERINGS.map((o) => (
                <div key={o.title} className={`group relative flex items-start gap-3.5 border border-white/6 hover:border-[rgba(212,175,55,0.28)] bg-[#0D1424] hover:bg-[#111827] transition-all duration-400 overflow-hidden ${o.badge ? "p-5 pt-8" : "p-5"}`}>
                  {o.badge && (
                    <div className="absolute top-2.5 left-0 right-0 flex justify-center pointer-events-none">
                      <span className="font-montserrat text-[6px] uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/30 bg-[#0D1424] px-2 py-0.5">
                        {o.badge}
                      </span>
                    </div>
                  )}
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-sm border border-[#D4AF37]/15 bg-[#D4AF37]/14 text-[#D4AF37]/60 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/12 group-hover:border-[#D4AF37]/28 transition-all duration-300 mt-0.5">
                    {o.icon}
                  </div>
                  <div>
                    <div className="font-cinzel text-white text-xs tracking-wider mb-1 group-hover:text-[#D4AF37] transition-colors">{o.title}</div>
                    <div className="font-montserrat text-white/55 text-[8px] leading-relaxed tracking-wide">{o.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Get Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/web-partner" className="btn-secondary">
                See Our Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
