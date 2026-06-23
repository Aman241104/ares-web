"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
  Hash,
  Send,
  ChevronDown,
} from "lucide-react";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "@/components/Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_CARDS = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp",
    value: "+91 97680 10720",
    sub: "Available Mon – Sat, 9 AM – 7 PM",
    href: "https://wa.me/919768010720",
    cta: "Message Us",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "info@aresbusinessleague.com",
    sub: "We reply within 24 hours",
    href: "mailto:info@aresbusinessleague.com",
    cta: "Send Email",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    label: "Location",
    value: "India",
    sub: "Operating across PAN India",
    href: null,
    cta: null,
  },
];

const SOCIAL = [
  { icon: <LinkedInIcon className="w-5 h-5" />, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: <InstagramIcon className="w-5 h-5" />, label: "Instagram", href: "https://instagram.com" },
  { icon: <YouTubeIcon className="w-5 h-5" />, label: "YouTube", href: "https://youtube.com" },
];

const INTERESTS = [
  { title: "Register as a Player", desc: "Join one of the 4 elite teams for ABL 2026." },
  { title: "Become a Partner", desc: "Align your brand with India's premier business league." },
  { title: "Sponsorship Inquiry", desc: "Premium visibility across all tournament touchpoints." },
  { title: "Media Coverage", desc: "Exclusive access and press credentials for journalists." },
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      // Scroll reveals
      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: parent, start: "top 90%", once: true },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-4 mb-8 h-badge">
            <div className="h-px w-12 bg-white/10" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
              Get in Touch
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          <h1 className="h-title font-cinzel font-light text-white leading-[1.1] mb-8" style={{ fontSize: "clamp(36px,8vw,90px)" }}>
            CONTACT <span className="text-[#D4AF37] italic">US</span>
          </h1>

          <div className="w-24 h-px mx-auto mb-8 bg-white/20" />

          <p className="h-sub font-montserrat text-white/50 text-sm tracking-wide leading-relaxed max-w-2xl mx-auto">
            Have questions about ABL 2026? Our team is ready to help. Reach out through any of the channels below.
          </p>
        </div>
      </section>

      {/* ─── MAIN CONTENT: two-column ─── */}
      <section className="relative py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* ── LEFT: Contact info ── */}
          <div className="lg:col-span-2 space-y-12 sr">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                  Reach Us
                </span>
              </div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">
                CONTACT <span className="text-[#D4AF37]">CHANNELS</span>
              </h2>
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              {CONTACT_CARDS.map((c) => (
                <div
                  key={c.label}
                  className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 glass-card border-white/10 hover:border-white/20"
                >
                  <div className="flex items-start gap-5 relative">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform duration-500 bg-white/[0.02] border border-white/5">
                      {c.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-1.5">
                        {c.label}
                      </div>
                      <div className="font-cinzel text-white text-lg mb-1 truncate">
                        {c.value}
                      </div>
                      <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest leading-relaxed">{c.sub}</div>

                      {c.href && c.cta && (
                        <a
                          href={c.href}
                          className="inline-flex items-center gap-2 mt-4 font-montserrat text-white/60 text-[9px] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
                        >
                          {c.cta} <ArrowRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="glass-card p-6 border-white/10">
              <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-4">
                Follow Us
              </div>
              <div className="flex flex-wrap gap-4">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-2 font-montserrat text-[10px] uppercase tracking-widest text-[#D4AF37] rounded-lg px-4 py-2.5 transition-all hover:-translate-y-1 hover:bg-[#D4AF37]/10 border border-[#D4AF37]/20"
                  >
                    {s.icon}
                    <span className="hidden sm:block font-bold">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Hashtag card */}
            <div className="rounded-xl p-6 border border-[#D4AF37]/30 bg-[#D4AF37]/5 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 100% 100%, rgba(212,175,55,0.1) 0%, transparent 60%)" }} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <Hash className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-cinzel tracking-widest text-[#D4AF37] text-sm">
                    ABLNATIONBUILDERS2026
                  </span>
                </div>
                <div className="font-montserrat text-white/50 text-xs leading-relaxed">
                  Use our official hashtag across social platforms and join the conversation.
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Contact form ── */}
          <div className="lg:col-span-3 sr">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                  Send a Message
                </span>
              </div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">
                LET'S <span className="text-[#D4AF37]">CONNECT</span>
              </h2>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden relative border-white/10">
              {/* Top accent line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

              <form className="p-8 sm:p-10 space-y-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-3 block">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full rounded-xl px-5 py-4 font-montserrat text-white placeholder-white/20 text-sm focus:outline-none transition-all bg-white/[0.02] border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/[0.04]"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-3 block">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-xl px-5 py-4 font-montserrat text-white placeholder-white/20 text-sm focus:outline-none transition-all bg-white/[0.02] border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/[0.04]"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-3 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl px-5 py-4 font-montserrat text-white placeholder-white/20 text-sm focus:outline-none transition-all bg-white/[0.02] border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/[0.04]"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-3 block">
                      Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      className="w-full rounded-xl px-5 py-4 font-montserrat text-white placeholder-white/20 text-sm focus:outline-none transition-all bg-white/[0.02] border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/[0.04]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-3 block">
                    Subject <span className="text-[#D4AF37]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-xl px-5 py-4 font-montserrat text-white text-sm focus:outline-none transition-all appearance-none pr-12 cursor-pointer bg-white/[0.02] border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/[0.04]"
                    >
                      <option value="" className="bg-[#050505]">Select a subject...</option>
                      <option value="register" className="bg-[#050505]">Register as a Player</option>
                      <option value="partner" className="bg-[#050505]">Become a Partner</option>
                      <option value="sponsor" className="bg-[#050505]">Sponsorship Inquiry</option>
                      <option value="media" className="bg-[#050505]">Media and Press</option>
                      <option value="general" className="bg-[#050505]">General Inquiry</option>
                      <option value="website" className="bg-[#050505]">Website for My Business</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-3 block">
                    Message <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-xl px-5 py-4 font-montserrat text-white placeholder-white/20 text-sm focus:outline-none transition-all resize-none bg-white/[0.02] border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/[0.04]"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-4"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </button>

                <p className="font-montserrat text-white/30 text-[9px] uppercase tracking-widest text-center mt-6">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REGISTER INTEREST ─── */}
      <section className="relative py-32 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto relative sr">
          <div className="text-center mb-16">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                Get Involved
              </span>
              <div className="h-px w-8 bg-[#D4AF37]" />
            </div>
            <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl lg:text-5xl mb-6">
              REGISTER YOUR <span className="text-[#D4AF37] italic">INTEREST</span>
            </h2>
            <p className="font-montserrat text-white/50 text-sm max-w-2xl mx-auto leading-relaxed">
              Whether you want to compete, partner, or amplify your brand — there is a place for you at ABL 2026. Choose your path below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sr-stagger">
            {INTERESTS.map((item) => (
              <div
                key={item.title}
                className="group cursor-default relative overflow-hidden rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 glass-card border-white/10 hover:border-white/20"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Gold top accent */}
                <div className="w-8 h-px mb-6 bg-[#D4AF37]" />

                <h3 className="font-cinzel tracking-widest text-white text-sm mb-4 leading-tight">{item.title}</h3>
                <p className="font-montserrat text-white/40 text-[11px] leading-relaxed mb-8 min-h-[50px]">
                  {item.desc}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-montserrat text-white/60 text-[9px] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors"
                >
                  Enquire <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ QUICK LINK ─── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-t border-white/5 sr">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-cinzel font-light text-white text-2xl sm:text-3xl mb-6">
            Looking for Answers?
          </h3>
          <p className="font-montserrat text-white/50 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
            Check our Rules and FAQ page for common questions about the tournament format, scoring, and eligibility.
          </p>
          <Link href="/rules" className="btn-secondary">
            View Rules and FAQ <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
