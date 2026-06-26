import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Code2, Calculator, Smartphone, CheckCircle } from "lucide-react";

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
    <section className="relative overflow-hidden bg-[#060400] border-t border-[rgba(212,175,55,0.12)]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 65%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 20%, rgba(240,208,96,0.8) 50%, rgba(212,175,55,0.5) 80%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT — Trophy visual */}
          <div className="hidden lg:flex lg:col-span-4 items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[360px]">
              {/* Glow behind trophy */}
              <div className="absolute inset-0 rounded-full blur-[80px] opacity-25" style={{ background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)" }} />
              {/* Ring decoration */}
              <div className="absolute inset-6 rounded-full border border-[rgba(212,175,55,0.08)]" />
              <div className="absolute inset-12 rounded-full border border-[rgba(212,175,55,0.05)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/images/hero-trophy.jpg"
                  alt="Championship Trophy"
                  width={340}
                  height={400}
                  className="relative z-10 object-contain mix-blend-screen float-slow"
                  style={{
                    opacity: 0.92,
                    maskImage: "radial-gradient(ellipse 60% 65% at 50% 50%, black 20%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(ellipse 60% 65% at 50% 50%, black 20%, transparent 80%)",
                    filter: "brightness(1.15) contrast(1.1) saturate(1.1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT — Copy */}
          <div className="lg:col-span-8">
            <div className="section-label mb-6">Exclusive for ABL Members</div>

            <h2 className="font-cinzel font-light text-white leading-tight mb-5" style={{ fontSize: "clamp(28px,3.2vw,46px)" }}>
              WANT TO BUILD SOMETHING<br className="hidden sm:block" />
              <span className="text-gold-gradient"> FOR YOUR BUSINESS?</span>
            </h2>

            <p className="font-montserrat text-white/45 text-sm mb-7 leading-[2] max-w-xl tracking-wide">
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
                <div key={o.title} className="group relative flex items-start gap-3.5 p-5 border border-white/6 hover:border-[rgba(212,175,55,0.22)] bg-[#100D04] hover:bg-[#130f03] transition-all duration-400 overflow-hidden">
                  {o.badge && (
                    <div className="absolute top-2.5 right-2.5 font-montserrat text-[6px] uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.5">
                      {o.badge}
                    </div>
                  )}
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-sm border border-[#D4AF37]/15 bg-[#D4AF37]/8 text-[#D4AF37]/60 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/12 group-hover:border-[#D4AF37]/28 transition-all duration-300 mt-0.5">
                    {o.icon}
                  </div>
                  <div>
                    <div className="font-cinzel text-white text-xs tracking-wider mb-1 group-hover:text-[#D4AF37] transition-colors">{o.title}</div>
                    <div className="font-montserrat text-white/30 text-[8px] leading-relaxed tracking-wide">{o.desc}</div>
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
