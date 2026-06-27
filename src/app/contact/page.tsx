"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
  Send,
  ChevronDown,
  Globe,
  Code2,
  Calculator,
  Smartphone,
  LayoutDashboard,
  Wrench,
  CheckCircle2,
  Search,
  Palette,
  Rocket,
} from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "@/components/Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: <Globe className="w-5 h-5" />,          title: "Website Design",          desc: "Stunning, fast, SEO-ready websites that convert visitors into clients.", num: "01" },
  { icon: <Code2 className="w-5 h-5" />,           title: "Business Software / ERP", desc: "Custom enterprise tools — portals, workflows, dashboards built for scale.", num: "02" },
  { icon: <Calculator className="w-5 h-5" />,      title: "Accounting Software",     desc: "Tailored invoicing, GST billing, and financial management systems.", num: "03" },
  { icon: <Smartphone className="w-5 h-5" />,      title: "Mobile App",              desc: "Cross-platform apps that put your business in your customers' pockets.", num: "04" },
  { icon: <LayoutDashboard className="w-5 h-5" />, title: "CRM & Client Mgmt",       desc: "Manage leads, clients, and pipelines — purpose-built for your business.", num: "05" },
  { icon: <Wrench className="w-5 h-5" />,          title: "Custom Solutions",        desc: "Any unique digital problem you have — we design and build the solution.", num: "06" },
];

const PROCESS = [
  { icon: <Search className="w-5 h-5" />,  step: "01", title: "Discover", desc: "We understand your business, goals, and the exact problem you need solved." },
  { icon: <Palette className="w-5 h-5" />, step: "02", title: "Design",   desc: "We design architecture, UI, and user flow — you approve before we build." },
  { icon: <Rocket className="w-5 h-5" />,  step: "03", title: "Deliver",  desc: "We develop, test, and hand over a product that works on day one." },
];

const CONTACT_ITEMS = [
  { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp", value: "+91 97680 10720",             sub: "Mon – Sat, 9 AM – 7 PM",   href: "https://wa.me/919768010720" },
  { icon: <Mail className="w-5 h-5" />,          label: "Email",    value: "info@aresbusinessleague.com", sub: "We reply within 24 hours",  href: "mailto:info@aresbusinessleague.com" },
  { icon: <MapPin className="w-5 h-5" />,        label: "Location", value: "India",                       sub: "Serving clients PAN India", href: null },
];

const WHY = [
  "Built for Indian businesses & compliance",
  "GST-ready accounting & billing systems",
  "Dedicated post-launch support included",
  "Fixed-price, milestone-based delivery",
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.message) return;
    const text = encodeURIComponent(
      `*New Software Inquiry*\n\n*Name:* ${form.name}\n*Email:* ${form.email}${form.phone ? `\n*Phone:* ${form.phone}` : ""}${form.business ? `\n*Business:* ${form.business}` : ""}\n*Service Needed:* ${form.service}${form.budget ? `\n*Budget:* ${form.budget}` : ""}\n\n*Project Details:*\n${form.message}`
    );
    window.open(`https://wa.me/919768010720?text=${text}`, "_blank");
    setSent(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-split", { types: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge",  { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars, { opacity: 0, y: 50, stagger: 0.03, duration: 0.7, ease: "back.out(1.4)" }, "-=0.4")
        .from(".h-sub",    { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: parent, start: "top 88%", once: true },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const inputCls = "w-full px-5 py-4 font-montserrat text-white placeholder-white/20 text-[11px] tracking-wide focus:outline-none transition-all bg-white/[0.025] border border-white/8 focus:border-[#D4AF37]/40 focus:bg-white/[0.04]";

  return (
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <PageHero backgroundImage="/images/blog_strategy.png" layout="centered" className="min-h-[60vh] justify-center px-6 sm:px-10 lg:px-16 py-28">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-badge inline-flex items-center gap-3 mb-8 relative px-5 py-2.5">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 backdrop-blur-xl" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Software & Digital Solutions</span>
          </div>

          <h1 className="font-cinzel font-light text-white mb-8 leading-none">
            <span className="block text-white/30 font-montserrat text-xs sm:text-sm tracking-[0.5em] uppercase mb-2">Let's Build</span>
            <span
              className="h-title-split block"
              style={{
                fontSize: "clamp(48px, 12vw, 120px)",
                background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              SOMETHING
            </span>
            <span
              className="block font-cinzel font-light text-white"
              style={{ fontSize: "clamp(28px, 6vw, 72px)" }}
            >
              GREAT
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-7 h-sub">
            <div className="h-px w-12 bg-[#D4AF37]/30" />
            <p className="font-montserrat text-white/40 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              Website · Software · Mobile · ERP
            </p>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>

          <p className="font-montserrat text-white/35 text-xs sm:text-sm leading-[2] max-w-xl mx-auto tracking-wide">
            Whether you need a website, custom business software, or a mobile app — tell us what you want to build.
          </p>
        </div>
      </PageHero>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr mb-12 text-center">
            <div className="section-label mx-auto mb-2">What We Build</div>
            <h2 className="font-cinzel font-light text-white" style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}>
              Our <span className="text-[#D4AF37]">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sr-stagger">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group relative border border-white/6 hover:border-[rgba(212,175,55,0.25)] bg-[#111827] hover:bg-[#130f03] transition-all duration-400 p-5 text-center overflow-hidden cursor-default"
              >
                {/* Ghost number */}
                <div className="absolute -top-2 -right-1 font-cinzel text-white/4 text-4xl font-light leading-none select-none pointer-events-none">
                  {s.num}
                </div>
                {/* Top shimmer on hover */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />

                <div className="w-9 h-9 flex items-center justify-center border border-[#D4AF37]/15 bg-[#D4AF37]/8 mx-auto mb-4 text-[#D4AF37]/60 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/12 group-hover:border-[#D4AF37]/28 transition-all duration-300">
                  {s.icon}
                </div>
                <div className="font-cinzel text-white text-[10px] tracking-wider leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors">{s.title}</div>
                <div className="font-montserrat text-white/25 text-[8px] leading-relaxed hidden sm:block">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FORM + CONTACT ══════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0B132B] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* LEFT: contact info + why us */}
          <div className="lg:col-span-2 space-y-5 sr">

            <div className="mb-8">
              <div className="section-label mb-4 text-left" style={{ textAlign: "left" }}>
                <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.4em] uppercase">Reach Us</span>
              </div>
              <h2 className="font-cinzel font-light text-white mb-3" style={{ fontSize: "clamp(22px, 3vw, 38px)" }}>
                Contact <span className="text-[#D4AF37]">Channels</span>
              </h2>
              <p className="font-montserrat text-white/35 text-[10px] leading-[1.9] tracking-wide">
                Talk to us directly — describe what you need and we'll get back with a clear plan and estimate.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-2.5">
              {CONTACT_ITEMS.map((c) => (
                <div key={c.label} className="group relative border border-white/6 bg-[#0D1424] p-5 hover:border-[rgba(212,175,55,0.2)] transition-all duration-300 overflow-hidden">
                  {/* Gold left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-[#D4AF37]/18 bg-[#D4AF37]/8 text-[#D4AF37]/60 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/12 transition-all duration-300">
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-montserrat text-white/30 text-[8px] uppercase tracking-[0.25em] mb-1">{c.label}</div>
                      <div className="font-cinzel text-white text-xs tracking-wide truncate mb-0.5 group-hover:text-[#F0D060] transition-colors">{c.value}</div>
                      <div className="font-montserrat text-white/25 text-[8px] tracking-wider">{c.sub}</div>
                      {c.href && (
                        <a href={c.href} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 font-montserrat text-[8px] uppercase tracking-[0.2em] text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors">
                          Open <ArrowRight className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why us */}
            <div className="relative border border-[rgba(212,175,55,0.15)] bg-[#111827] p-6 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.45), transparent)" }} />
              <div className="font-montserrat text-[#D4AF37] text-[8px] uppercase tracking-[0.35em] font-bold mb-5">Why Work With Us</div>
              <div className="space-y-3">
                {WHY.map((w) => (
                  <div key={w} className="flex items-start gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]/70 flex-shrink-0 mt-0.5" />
                    <span className="font-montserrat text-white/50 text-[10px] leading-[1.8] tracking-wide">{w}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <LinkedInIcon className="w-4 h-4" />, label: "LinkedIn",  href: "https://linkedin.com" },
                { icon: <InstagramIcon className="w-4 h-4" />, label: "Instagram", href: "https://instagram.com" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/8 hover:border-[#D4AF37]/25 hover:text-[#D4AF37] text-white/35 font-montserrat text-[8px] uppercase tracking-[0.2em] transition-all duration-300">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="lg:col-span-3 sr">
            <div className="mb-8">
              <div className="section-label mb-4 text-left" style={{ textAlign: "left" }}>
                <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.4em] uppercase">Start Your Project</span>
              </div>
              <h2 className="font-cinzel font-light text-white" style={{ fontSize: "clamp(22px, 3vw, 38px)" }}>
                Tell Us What You <span className="text-[#D4AF37]">Need</span>
              </h2>
            </div>

            <div className="relative border border-white/8 bg-[#0D1424] overflow-hidden">
              {/* Top gold line */}
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />

              {sent ? (
                <div className="p-10 sm:p-14 text-center">
                  <div className="w-14 h-14 border border-[#D4AF37]/30 bg-[#D4AF37]/8 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-cinzel text-white text-2xl mb-3 tracking-wider">Inquiry Sent!</h3>
                  <p className="font-montserrat text-white/40 text-[10px] leading-[1.9] mb-8 max-w-sm mx-auto tracking-wide">
                    Your message has been opened in WhatsApp. We'll review your project requirements and get back to you shortly.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-secondary text-[9px]">
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em] mb-2.5 block">
                        Full Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input type="text" required placeholder="Your full name"
                        value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em] mb-2.5 block">
                        Email Address <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input type="email" required placeholder="your@email.com"
                        value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em] mb-2.5 block">Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210"
                        value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em] mb-2.5 block">Business / Company</label>
                      <input type="text" placeholder="Your company name"
                        value={form.business} onChange={(e) => setForm(f => ({ ...f, business: e.target.value }))}
                        className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em] mb-2.5 block">
                      What Do You Want to Build? <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <select required value={form.service}
                        onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}
                        className={`${inputCls} appearance-none cursor-pointer pr-12`}>
                        <option value="" className="bg-[#0D1424]">Select a service...</option>
                        <option value="Website Design & Development" className="bg-[#0D1424]">Website Design & Development</option>
                        <option value="Business Software / ERP" className="bg-[#0D1424]">Business Software / ERP</option>
                        <option value="Accounting & Billing Software" className="bg-[#0D1424]">Accounting & Billing Software</option>
                        <option value="Mobile App (iOS & Android)" className="bg-[#0D1424]">Mobile App (iOS & Android)</option>
                        <option value="CRM & Client Management" className="bg-[#0D1424]">CRM & Client Management</option>
                        <option value="Custom Software Solution" className="bg-[#0D1424]">Custom Software Solution</option>
                        <option value="Not Sure — Need Consultation" className="bg-[#0D1424]">Not Sure — Need Consultation</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em] mb-2.5 block">Approximate Budget</label>
                    <div className="relative">
                      <select value={form.budget}
                        onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))}
                        className={`${inputCls} appearance-none cursor-pointer pr-12`}>
                        <option value="" className="bg-[#0D1424]">Select a range (optional)</option>
                        <option value="Under ₹50,000" className="bg-[#0D1424]">Under ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000" className="bg-[#0D1424]">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000 – ₹3,00,000" className="bg-[#0D1424]">₹1,00,000 – ₹3,00,000</option>
                        <option value="₹3,00,000 – ₹10,00,000" className="bg-[#0D1424]">₹3,00,000 – ₹10,00,000</option>
                        <option value="Above ₹10,00,000" className="bg-[#0D1424]">Above ₹10,00,000</option>
                        <option value="Let's Discuss" className="bg-[#0D1424]">Let's Discuss</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="font-montserrat text-white/35 text-[8px] uppercase tracking-[0.25em] mb-2.5 block">
                      Project Details <span className="text-[#D4AF37]">*</span>
                    </label>
                    <textarea rows={5} required
                      placeholder="Describe what you want to build, what problems it should solve, and any specific features you need..."
                      value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${inputCls} resize-none`} />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send via WhatsApp
                  </button>

                  <p className="font-montserrat text-white/20 text-[8px] uppercase tracking-[0.2em] text-center">
                    Your details are kept private and never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ HOW WE WORK ══════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr text-center mb-14">
            <div className="section-label mx-auto mb-3">Our Process</div>
            <h2 className="font-cinzel font-light text-white" style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}>
              How We <span className="text-[#D4AF37]">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 sr-stagger">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="group relative bg-[#0D1424] p-10 hover:bg-[#111827] transition-all duration-400 overflow-hidden">
                {/* Top gold line on hover */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />
                {/* Ghost step number */}
                <div className="absolute -bottom-4 -right-2 font-cinzel text-white/4 text-8xl font-light leading-none select-none pointer-events-none">
                  {p.step}
                </div>

                <div className="flex items-center gap-4 mb-7">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#D4AF37]/25 bg-[#D4AF37]/8 text-[#D4AF37]/70 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/14 group-hover:border-[#D4AF37]/35 transition-all duration-300">
                    {p.icon}
                  </div>
                  {i < PROCESS.length - 1 && (
                    <div className="hidden md:flex flex-1 items-center gap-1 ml-2">
                      <div className="flex-1 h-px bg-white/8" />
                      <ArrowRight className="w-3.5 h-3.5 text-white/15 flex-shrink-0" />
                    </div>
                  )}
                </div>

                <div className="font-montserrat text-[#D4AF37]/50 text-[8px] uppercase tracking-[0.35em] mb-2">Step {p.step}</div>
                <h3 className="font-cinzel text-white text-xl tracking-widest mb-4 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                <p className="font-montserrat text-white/40 text-[10px] leading-[1.9] tracking-wide">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
