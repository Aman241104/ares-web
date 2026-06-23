import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  MessageCircle,
  Hash,
  Send,
  ChevronDown,
} from "lucide-react";
import LegacyCTA from "@/components/LegacyCTA";

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
  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
  { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" },
  { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "#" },
];

const INTERESTS = [
  { title: "Register as a Player", desc: "Join one of the 4 elite teams for ABL 2026." },
  { title: "Become a Partner", desc: "Align your brand with India's premier business league." },
  { title: "Sponsorship Inquiry", desc: "Premium visibility across all tournament touchpoints." },
  { title: "Media Coverage", desc: "Exclusive access and press credentials for journalists." },
];

export default function ContactPage() {
  return (
    <div className="pt-16">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[55vh] flex items-center px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#060d14]">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

        {/* Large atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 80% at 50% 60%, rgba(218,165,55,0.09) 0%, rgba(218,165,55,0.03) 45%, transparent 70%)",
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(218,165,55,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(218,165,55,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative py-24 w-full">
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10 bg-[#DAA537]/70" />
            <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
              Get in Touch
            </span>
            <div className="h-px w-10 bg-[#DAA537]/70" />
          </div>

          <h1
            className="font-cinzel font-black text-white leading-[1.0] mb-5"
            style={{ fontSize: "clamp(48px,7vw,88px)" }}
          >
            CONTACT{" "}
            <span className="text-shadow-gold" style={{ color: "#DAA537" }}>
              US
            </span>
          </h1>

          <div
            className="w-28 mx-auto mb-6"
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, #DAA537, #F5D078, #DAA537, transparent)",
            }}
          />

          <p className="font-montserrat text-white/55 text-base max-w-xl mx-auto leading-relaxed">
            Have questions about ABL 2026? Our team is ready to help. Reach out through any of the
            channels below.
          </p>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── MAIN CONTENT: two-column ─── */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(218,165,55,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── LEFT: Contact info ── */}
          <div className="lg:col-span-2 space-y-5">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#DAA537]/70" />
                <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                  Reach Us
                </span>
              </div>
              <h2
                className="font-cinzel font-black text-white"
                style={{ fontSize: "clamp(22px,2.5vw,34px)" }}
              >
                CONTACT
                <br />
                <span className="text-gold-gradient">CHANNELS</span>
              </h2>
            </div>

            {/* Contact cards */}
            {CONTACT_CARDS.map((c) => (
              <div
                key={c.label}
                className="group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(6,13,20,0.8)",
                  border: "1px solid rgba(218,165,55,0.18)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "0 0 0 1px rgba(218,165,55,0.45), 0 8px 30px rgba(218,165,55,0.10)",
                  }}
                />

                <div className="flex items-start gap-4 relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[#DAA537] flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: "rgba(218,165,55,0.08)",
                      border: "1px solid rgba(218,165,55,0.22)",
                    }}
                  >
                    {c.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-montserrat text-[#DAA537]/70 text-[10px] uppercase tracking-widest mb-0.5">
                      {c.label}
                    </div>
                    <div className="font-montserrat font-semibold text-white text-sm mb-0.5 truncate">
                      {c.value}
                    </div>
                    <div className="font-montserrat text-white/35 text-xs">{c.sub}</div>

                    {c.href && c.cta && (
                      <a
                        href={c.href}
                        className="inline-flex items-center gap-1.5 mt-3 font-montserrat text-[#DAA537] text-[10px] font-bold uppercase tracking-widest hover:text-[#F5D078] transition-colors"
                      >
                        {c.cta} <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(6,13,20,0.8)",
                border: "1px solid rgba(218,165,55,0.18)",
              }}
            >
              <div className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest mb-4">
                Follow Us
              </div>
              <div className="flex gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-2 font-montserrat text-xs text-[#DAA537] rounded-lg px-3 py-2 transition-all hover:-translate-y-0.5 hover:bg-[#DAA537]/10"
                    style={{ border: "1px solid rgba(218,165,55,0.28)" }}
                  >
                    {s.icon}
                    <span className="hidden sm:block">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Hashtag card */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(218,165,55,0.04)",
                border: "1px solid rgba(218,165,55,0.22)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-[#DAA537]" />
                <span className="font-cinzel font-bold text-[#DAA537] text-sm">
                  ABLNATIONBUILDERS2026
                </span>
              </div>
              <div className="font-montserrat text-white/45 text-xs leading-relaxed">
                Use our official hashtag across social platforms and join the conversation.
              </div>
            </div>
          </div>

          {/* ── RIGHT: Contact form ── */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#DAA537]/70" />
                <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                  Send a Message
                </span>
              </div>
              <h2
                className="font-cinzel font-black text-white"
                style={{ fontSize: "clamp(22px,2.5vw,34px)" }}
              >
                LET&apos;S{" "}
                <span className="text-gold-gradient">CONNECT</span>
              </h2>
            </div>

            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: "rgba(6,13,20,0.7)",
                border: "1px solid rgba(218,165,55,0.2)",
              }}
            >
              {/* Top accent line */}
              <div
                className="h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #DAA537, #F5D078, #DAA537, transparent)",
                }}
              />

              <form className="p-8 space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest mb-2 block">
                      Full Name <span className="text-[#DAA537]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                      style={{
                        background: "rgba(13,27,42,0.8)",
                        border: "1px solid rgba(218,165,55,0.18)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.70)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow =
                          "0 0 0 3px rgba(218,165,55,0.08)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.18)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest mb-2 block">
                      Email Address <span className="text-[#DAA537]">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                      style={{
                        background: "rgba(13,27,42,0.8)",
                        border: "1px solid rgba(218,165,55,0.18)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.70)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow =
                          "0 0 0 3px rgba(218,165,55,0.08)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.18)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                      style={{
                        background: "rgba(13,27,42,0.8)",
                        border: "1px solid rgba(218,165,55,0.18)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.70)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow =
                          "0 0 0 3px rgba(218,165,55,0.08)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.18)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest mb-2 block">
                      Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                      style={{
                        background: "rgba(13,27,42,0.8)",
                        border: "1px solid rgba(218,165,55,0.18)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.70)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow =
                          "0 0 0 3px rgba(218,165,55,0.08)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.borderColor =
                          "rgba(218,165,55,0.18)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest mb-2 block">
                    Subject <span className="text-[#DAA537]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-xl px-4 py-3 font-montserrat text-white text-sm focus:outline-none transition-colors appearance-none pr-10 cursor-pointer"
                      style={{
                        background: "rgba(13,27,42,0.8)",
                        border: "1px solid rgba(218,165,55,0.18)",
                      }}
                    >
                      <option value="" className="bg-[#060d14]">Select a subject...</option>
                      <option value="register" className="bg-[#060d14]">Register as a Player</option>
                      <option value="partner" className="bg-[#060d14]">Become a Partner</option>
                      <option value="sponsor" className="bg-[#060d14]">Sponsorship Inquiry</option>
                      <option value="media" className="bg-[#060d14]">Media and Press</option>
                      <option value="general" className="bg-[#060d14]">General Inquiry</option>
                      <option value="website" className="bg-[#060d14]">Website for My Business</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#DAA537]/60 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest mb-2 block">
                    Message <span className="text-[#DAA537]">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-xl px-4 py-3 font-montserrat text-white placeholder-white/25 text-sm focus:outline-none transition-colors resize-none"
                    style={{
                      background: "rgba(13,27,42,0.8)",
                      border: "1px solid rgba(218,165,55,0.18)",
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full justify-center text-sm py-4"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>

                <p className="font-montserrat text-white/25 text-[10px] text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── REGISTER INTEREST ─── */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 bg-[#060d14] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(218,165,55,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-[#DAA537]/70" />
              <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
                Get Involved
              </span>
              <div className="h-px w-8 bg-[#DAA537]/70" />
            </div>
            <h2
              className="font-cinzel font-black text-white"
              style={{ fontSize: "clamp(26px,3.5vw,46px)" }}
            >
              REGISTER YOUR{" "}
              <span className="text-gold-gradient">INTEREST</span>
            </h2>
            <p className="font-montserrat text-white/45 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Whether you want to compete, partner, or amplify your brand — there is a place for
              you at ABL 2026. Choose your path below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INTERESTS.map((item) => (
              <div
                key={item.title}
                className="group cursor-default relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "rgba(13,27,42,0.7)",
                  border: "1px solid rgba(218,165,55,0.18)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(218,165,55,0.50), 0 12px 40px rgba(218,165,55,0.12)",
                  }}
                />

                {/* Gold top accent */}
                <div
                  className="w-8 h-0.5 mb-4 rounded-full"
                  style={{ background: "linear-gradient(to right, #F5D078, #B8860B)" }}
                />

                <h3 className="font-cinzel font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="font-montserrat text-white/45 text-xs leading-relaxed mb-4">
                  {item.desc}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-montserrat text-[#DAA537] text-[10px] font-bold uppercase tracking-widest hover:text-[#F5D078] transition-colors"
                >
                  Enquire <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-sep" />

      {/* ─── FAQ QUICK LINK ─── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-cinzel font-bold text-white text-xl mb-3">
            Looking for Answers?
          </h3>
          <p className="font-montserrat text-white/45 text-sm mb-7 max-w-md mx-auto">
            Check our Rules and FAQ page for common questions about the tournament format, scoring,
            and eligibility.
          </p>
          <Link href="/rules" className="btn-secondary">
            View Rules and FAQ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
