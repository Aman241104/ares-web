"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Zap, Shield, BarChart2, Smartphone, Palette, CheckCircle, Star, MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: <Globe className="w-6 h-6 text-[#D4AF37]" />, title: "Custom Websites", desc: "Bespoke, brand-aligned websites that command attention and drive business." },
  { icon: <Zap className="w-6 h-6 text-[#D4AF37]" />, title: "High Performance", desc: "Blazing-fast load times and Core Web Vitals scores that rank you above competition." },
  { icon: <Smartphone className="w-6 h-6 text-[#D4AF37]" />, title: "Mobile Responsive", desc: "Flawless experience on every screen — phone, tablet, laptop, desktop." },
  { icon: <Shield className="w-6 h-6 text-[#D4AF37]" />, title: "Secure & Reliable", desc: "SSL, HTTPS, and enterprise-grade infrastructure to keep your business protected." },
  { icon: <BarChart2 className="w-6 h-6 text-[#D4AF37]" />, title: "SEO Optimised", desc: "Built from the ground up to rank, get found, and convert visitors to customers." },
  { icon: <Palette className="w-6 h-6 text-[#D4AF37]" />, title: "Premium Design", desc: "World-class visuals, typography and UX that build instant credibility." },
];

const WHY_POINTS = [
  "Official Web Partner of ARES Business League 2026",
  "Trusted by 30+ elite BNI business owners",
  "Delivered 100+ high-performance business websites",
  "Experts in conversion-driven design",
  "Fast turnaround — live in weeks, not months",
  "Dedicated post-launch support & maintenance",
];

export default function WebPartnerPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(".h-btns", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: parent, start: "top 90%", once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#080600] min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 65%)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-4 mb-8 h-badge">
            <div className="h-px w-12 bg-white/10" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Official Web Partner · ABL 2026</span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          <h1 className="h-title font-cinzel font-light text-white mb-6 leading-[1.1]" style={{ fontSize: "clamp(36px,8vw,90px)" }}>
            BUILD YOUR <span className="text-[#D4AF37] italic">WEBSITE</span>
          </h1>

          <div className="w-24 h-px mx-auto mb-8 bg-white/20" />

          <p className="h-sub font-montserrat text-white/50 text-sm tracking-wide leading-relaxed max-w-2xl mx-auto mb-10">
            As the Official Web Partner of ARES Business League 2026, WebHance delivers premium, high-performance websites that build your digital legacy and drive real business growth.
          </p>

          <div className="h-btns flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/919768010720?text=Hi%2C%20I%20saw%20your%20listing%20on%20ARES%20Business%20League%20website%20and%20I%27m%20interested%20in%20building%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Get Started on WhatsApp
            </a>
            <Link href="/contact" className="btn-secondary">
              Contact Us <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PARTNER BADGE ─── */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-y border-white/5 sr">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl px-8 py-5">
            <Star className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
            <div className="text-left">
              <div className="font-cinzel text-[#D4AF37] text-sm tracking-widest uppercase mb-1">WebHance</div>
              <div className="font-montserrat text-white/50 text-[10px] tracking-widest uppercase">Official Web Partner · ARES Business League 2026</div>
            </div>
            <Star className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#080600] sr">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">What We Build</div>
            <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl lg:text-5xl">
              EVERYTHING YOUR <span className="text-[#D4AF37]">WEBSITE NEEDS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sr-stagger">
            {SERVICES.map((s) => (
              <div key={s.title} className="glass-card p-8 hover:bg-white/[0.04] transition-all duration-500 group">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {s.icon}
                </div>
                <div className="font-cinzel text-white tracking-wider text-base mb-3 group-hover:text-[#D4AF37] transition-colors">{s.title}</div>
                <div className="font-montserrat text-white/40 text-xs leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY WEBHANCE ─── */}
      <section className="py-32 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-t border-white/5 sr">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Why Choose Us</div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl lg:text-5xl mb-8">
                TRUSTED BY <br />
                <span className="text-[#D4AF37] italic">ELITE BUILDERS</span>
              </h2>
              <p className="font-montserrat text-white/50 text-sm leading-relaxed mb-10">
                As the exclusive Web Partner of ARES Business League 2026, WebHance has earned the trust of India&apos;s top BNI business owners. When nation builders need a digital presence, they choose WebHance.
              </p>
              <a
                href="https://wa.me/919768010720?text=Hi%2C%20I%20saw%20your%20listing%20on%20ARES%20Business%20League%20website%20and%20I%27m%20interested%20in%20building%20a%20website%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                Start Your Project <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="space-y-4 sr-stagger">
              {WHY_POINTS.map((point) => (
                <div key={point} className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span className="font-montserrat text-white/70 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#080600] border-t border-white/5 sr">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card border-[#D4AF37]/20 rounded-3xl p-10 lg:p-16 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 80%)" }} />
            <div className="relative">
              <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-6">Ready to Build?</div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl lg:text-5xl mb-6">
                YOUR DIGITAL LEGACY <br className="hidden sm:block" />
                <span className="text-[#D4AF37] italic">STARTS TODAY</span>
              </h2>
              <p className="font-montserrat text-white/50 text-sm mb-10 max-w-xl mx-auto leading-relaxed">
                Every great business deserves a great website. Get in touch with WebHance and let&apos;s build something extraordinary together.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://wa.me/919768010720?text=Hi%2C%20I%20saw%20your%20listing%20on%20ARES%20Business%20League%20website%20and%20I%27m%20interested%20in%20building%20a%20website%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Us Now
                </a>
                <Link href="/contact" className="btn-secondary">
                  Send an Enquiry <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
