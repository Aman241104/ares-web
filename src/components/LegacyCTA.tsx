import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function LegacyCTA() {
  return (
    <section className="relative overflow-hidden bg-[#000000] border-t border-white/5 py-24 sm:py-32 sr">
      {/* Atmospheric grid */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      {/* Gold radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 65%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
        <div className="relative rounded-3xl p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl">
          
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />

          {/* LEFT: trophy (2 cols) */}
          <div className="lg:col-span-2 flex items-center justify-center relative group">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)" }} />
            <img
              src="/images/hero-trophy.jpg"
              alt="Championship Trophy"
              className="relative z-10 object-contain trophy-glow group-hover:scale-105 transition-transform duration-700"
              style={{ 
                height: "320px", 
                maxWidth: "260px", 
                mixBlendMode: "lighten",
                maskImage: "radial-gradient(circle 50% at 50% 50%, black 60%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle 50% at 50% 50%, black 60%, transparent 100%)"
              }}
            />
          </div>

          {/* RIGHT: text (3 cols) */}
          <div className="lg:col-span-3 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[#D4AF37]" />
              <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Build Your Legacy</span>
            </div>
            
            <h2 className="font-cinzel font-light text-white leading-tight mb-6" style={{ fontSize: "clamp(32px,3.5vw,48px)" }}>
              WANT A LEGENDARY WEBSITE <br className="hidden sm:block"/>
              <span className="text-[#D4AF37] italic">FOR YOUR BUSINESS?</span>
            </h2>
            
            <p className="font-montserrat text-white/50 text-sm mb-10 leading-relaxed max-w-xl">
              Transform your digital presence with premium websites, powerful branding, and performance-driven experiences that help your business dominate online.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/contact" className="btn-primary">
                Contact Us Today <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/gallery" className="btn-secondary">
                View Our Work <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {["Custom Websites", "SEO Optimized", "Mobile Responsive", "High Performance"].map((f) => (
                <span key={f} className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
