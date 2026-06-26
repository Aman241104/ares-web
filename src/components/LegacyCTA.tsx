import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Code2, Calculator, Smartphone } from "lucide-react";

const OFFERINGS = [
  {
    icon: <Globe className="w-4 h-4" />,
    title: "Website",
    desc: "Stunning, SEO-ready websites that convert visitors into clients.",
  },
  {
    icon: <Code2 className="w-4 h-4" />,
    title: "Business Software",
    desc: "Custom CRMs, portals, and workflow tools built for your operations.",
  },
  {
    icon: <Calculator className="w-4 h-4" />,
    title: "Accounting Software",
    desc: "Tailored billing, invoicing, and finance management systems.",
  },
  {
    icon: <Smartphone className="w-4 h-4" />,
    title: "Mobile App",
    desc: "iOS & Android apps that put your business in your customers' pockets.",
  },
];

export default function LegacyCTA() {
  return (
    <section className="relative overflow-hidden bg-[#080600] border-t border-white/5 py-24 sm:py-32 sr">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
        <div className="relative p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />

          {/* LEFT: trophy */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative group">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)" }} />
            <Image
              src="/images/hero-trophy.jpg"
              alt="Championship Trophy"
              width={260}
              height={320}
              className="relative z-10 object-contain group-hover:scale-105 transition-transform duration-700"
              style={{
                mixBlendMode: "lighten",
                maskImage: "radial-gradient(circle 50% at 50% 50%, black 60%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle 50% at 50% 50%, black 60%, transparent 100%)",
              }}
            />
          </div>

          {/* RIGHT: text */}
          <div className="lg:col-span-3 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#D4AF37]" />
              <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Exclusive for ABL Members</span>
            </div>

            <h2 className="font-cinzel font-light text-white leading-tight mb-4" style={{ fontSize: "clamp(28px,3.2vw,44px)" }}>
              WANT TO BUILD SOMETHING <br className="hidden sm:block" />
              <span className="text-[#D4AF37]">FOR YOUR BUSINESS?</span>
            </h2>

            <p className="font-montserrat text-white/50 text-sm mb-8 leading-relaxed max-w-xl">
              From a high-performance website to custom business software and accounting systems — we build digital products that work as hard as you do.
            </p>

            {/* Offerings grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {OFFERINGS.map((o) => (
                <div key={o.title} className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <span className="mt-0.5 text-[#D4AF37] flex-shrink-0">{o.icon}</span>
                  <div>
                    <div className="font-cinzel text-white text-sm tracking-wider mb-1">{o.title}</div>
                    <div className="font-montserrat text-white/40 text-[9px] leading-relaxed">{o.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Get a Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/web-partner" className="btn-secondary">
                See Our Work <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
