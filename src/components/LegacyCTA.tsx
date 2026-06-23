import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function LegacyCTA() {
  return (
    <section className="relative overflow-hidden" style={{background:"linear-gradient(180deg, #020609 0%, #060d14 30%, #0a1520 60%, #060d14 100%)"}}>
      {/* Atmospheric grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      {/* Gold radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(218,165,55,0.09) 0%, transparent 65%)"}} />
      {/* Top divider */}
      <div className="section-sep" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">

          {/* LEFT: trophy (2 cols) */}
          <div className="lg:col-span-2 flex items-center justify-center relative">
            <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse 90% 80% at 50% 50%, rgba(218,165,55,0.14) 0%, transparent 70%)"}} />
            <img
              src="/images/hero-trophy.jpg"
              alt="Championship Trophy"
              className="relative z-10 object-contain trophy-glow"
              style={{height:"280px",maxWidth:"220px",filter:"drop-shadow(0 0 60px rgba(218,165,55,1.0)) drop-shadow(0 0 120px rgba(218,165,55,0.5)) brightness(1.1)"}}
            />
          </div>

          {/* RIGHT: text (3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#DAA537]/60" />
              <span className="font-montserrat text-[#DAA537]/80 text-[10px] font-bold tracking-[0.5em] uppercase">Build Your Legacy</span>
            </div>
            <h2 className="font-cinzel font-black text-white leading-tight mb-4" style={{fontSize:"clamp(26px,3.5vw,48px)"}}>
              WANT A LEGENDARY WEBSITE{" "}
              <span className="text-shadow-gold" style={{color:"#DAA537"}}>FOR YOUR BUSINESS?</span>
            </h2>
            <p className="font-montserrat text-white/55 text-sm mb-6 leading-relaxed max-w-lg">
              Transform your digital presence with premium websites, powerful branding and
              performance-driven experiences that help your business dominate online.
            </p>
            <div className="flex flex-wrap gap-4 mb-7">
              <Link href="/contact" className="btn-primary text-xs">
                Contact Us Today <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/gallery" className="btn-secondary text-xs">
                View Our Work <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Custom Websites","SEO Optimized","Mobile Responsive","High Performance"].map((f) => (
                <span key={f} className="font-montserrat text-white/40 text-xs flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#DAA537] flex-shrink-0" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-sep" />
    </section>
  );
}
