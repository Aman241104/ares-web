"use client";
import { useEffect, useRef, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { icon: <Globe className="w-5 h-5" />,          title: "Website Design & Development", desc: "Stunning, fast, SEO-ready websites that convert visitors into clients." },
  { icon: <Code2 className="w-5 h-5" />,           title: "Business Software / ERP",       desc: "Custom enterprise tools — portals, workflows, dashboards built for scale." },
  { icon: <Calculator className="w-5 h-5" />,      title: "Accounting & Billing Software", desc: "Tailored invoicing, GST billing, and financial management systems." },
  { icon: <Smartphone className="w-5 h-5" />,      title: "Mobile App (iOS & Android)",    desc: "Cross-platform apps that put your business in your customers' pockets." },
  { icon: <LayoutDashboard className="w-5 h-5" />, title: "CRM & Client Management",       desc: "Manage leads, clients, and pipelines — purpose-built for your business." },
  { icon: <Wrench className="w-5 h-5" />,          title: "Custom Software Solutions",     desc: "Any unique digital problem you have — we design and build the solution." },
];

const PROCESS = [
  { icon: <Search className="w-5 h-5 text-[#D4AF37]" />,   step: "01", title: "Discover",  desc: "We understand your business, goals, and the exact problem you need solved." },
  { icon: <Palette className="w-5 h-5 text-[#D4AF37]" />,  step: "02", title: "Design",    desc: "We design the architecture, UI, and user flow — you approve before we build." },
  { icon: <Rocket className="w-5 h-5 text-[#D4AF37]" />,   step: "03", title: "Deliver",   desc: "We develop, test, and hand over a product that works on day one." },
];

const CONTACT_ITEMS = [
  { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp", value: "+91 97680 10720",              sub: "Mon – Sat, 9 AM – 7 PM", href: "https://wa.me/919768010720" },
  { icon: <Mail className="w-5 h-5" />,          label: "Email",    value: "info@aresbusinessleague.com",  sub: "We reply within 24 hours",  href: "mailto:info@aresbusinessleague.com" },
  { icon: <MapPin className="w-5 h-5" />,        label: "Location", value: "India",                        sub: "Serving clients PAN India",  href: null },
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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub",   { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: parent, start: "top 88%", once: true },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const inputCls = "w-full px-5 py-4 font-montserrat text-white placeholder-white/20 text-sm focus:outline-none transition-all bg-white/[0.02] border border-white/10 focus:border-[#D4AF37]/50 focus:bg-white/[0.04]";

  return (
    <div ref={containerRef} className="pt-24 bg-[#080600] min-h-screen overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-[55vh] flex items-center justify-center px-6 sm:px-10 lg:px-16 overflow-hidden py-20">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-[#D4AF37]/8 border border-[#D4AF37]/25 px-5 py-2.5 mb-8 h-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] block" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Software & Digital Solutions</span>
          </div>

          <h1 className="h-title font-cinzel font-light text-white leading-[1.05] mb-6" style={{ fontSize: "clamp(36px,8vw,96px)" }}>
            LET'S BUILD<br />
            <span className="text-gold-gradient">SOMETHING GREAT</span>
          </h1>

          <div className="w-20 h-px mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

          <p className="h-sub font-montserrat text-white/50 text-sm sm:text-base tracking-wide leading-relaxed max-w-2xl mx-auto">
            Whether you need a website, custom business software, an accounting system, or a mobile app — tell us what you want to build and we'll make it happen.
          </p>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr mb-12 text-center">
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">What We Build</span>
            <h2 className="font-cinzel font-light text-white" style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
              Our <span className="text-[#D4AF37]">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sr-stagger">
            {SERVICES.map((s) => (
              <div key={s.title} className="glass-card p-6 text-center hover:border-[#D4AF37]/20 hover:bg-white/[0.03] transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 flex items-center justify-center border border-[#D4AF37]/20 bg-[#D4AF37]/8 mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37]/15 transition-colors">
                  {s.icon}
                </div>
                <div className="font-cinzel text-white text-xs tracking-wider leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors">{s.title}</div>
                <div className="font-montserrat text-white/30 text-[9px] leading-relaxed hidden sm:block">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FORM + CONTACT ══════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#080600] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* LEFT: contact info + why us */}
          <div className="lg:col-span-2 space-y-8 sr">

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Reach Us</span>
              </div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl mb-2">
                Contact <span className="text-[#D4AF37]">Channels</span>
              </h2>
              <p className="font-montserrat text-white/40 text-xs leading-relaxed mt-3">
                Talk to us directly — describe what you need and we'll get back to you with a clear plan and estimate.
              </p>
            </div>

            {/* Contact cards */}
            <div className="space-y-3">
              {CONTACT_ITEMS.map((c) => (
                <div key={c.label} className="glass-card p-5 hover:border-white/15 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#D4AF37]/20 bg-[#D4AF37]/8 text-[#D4AF37]">
                      {c.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-montserrat text-white/35 text-[9px] uppercase tracking-widest mb-1">{c.label}</div>
                      <div className="font-cinzel text-white text-sm truncate mb-0.5">{c.value}</div>
                      <div className="font-montserrat text-white/30 text-[9px] tracking-wider">{c.sub}</div>
                      {c.href && (
                        <a href={c.href} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-2 font-montserrat text-[9px] uppercase tracking-widest text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors">
                          Open <ArrowRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why us */}
            <div className="glass-card p-6 border-[#D4AF37]/10">
              <div className="font-montserrat text-[#D4AF37] text-[9px] uppercase tracking-[0.3em] font-bold mb-5">Why Work With Us</div>
              <div className="space-y-3">
                {WHY.map((w) => (
                  <div key={w} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="font-montserrat text-white/55 text-xs leading-relaxed">{w}</span>
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
                  className="flex items-center gap-2 px-4 py-2.5 border border-white/10 hover:border-[#D4AF37]/30 hover:text-[#D4AF37] text-white/40 font-montserrat text-[9px] uppercase tracking-widest transition-colors">
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="lg:col-span-3 sr">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">Start Your Project</span>
              </div>
              <h2 className="font-cinzel font-light text-white text-3xl sm:text-4xl">
                Tell Us What You <span className="text-[#D4AF37]">Need</span>
              </h2>
            </div>

            <div className="glass-card overflow-hidden border-white/8">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

              {sent ? (
                <div className="p-10 sm:p-14 text-center">
                  <div className="w-16 h-16 border border-[#D4AF37]/30 bg-[#D4AF37]/8 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-cinzel text-white text-2xl mb-3">Inquiry Sent!</h3>
                  <p className="font-montserrat text-white/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                    Your message has been opened in WhatsApp. We'll review your project requirements and get back to you shortly.
                  </p>
                  <button onClick={() => setSent(false)} className="btn-secondary text-[10px]">
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2.5 block">
                        Full Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input type="text" required placeholder="Your full name"
                        value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2.5 block">
                        Email Address <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input type="email" required placeholder="your@email.com"
                        value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2.5 block">Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210"
                        value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                        className={inputCls} />
                    </div>
                    <div>
                      <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2.5 block">Business / Company Name</label>
                      <input type="text" placeholder="Your company name"
                        value={form.business} onChange={(e) => setForm(f => ({ ...f, business: e.target.value }))}
                        className={inputCls} />
                    </div>
                  </div>

                  {/* Service needed */}
                  <div>
                    <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2.5 block">
                      What Do You Want to Build? <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <select required value={form.service}
                        onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}
                        className={`${inputCls} appearance-none cursor-pointer pr-12`}>
                        <option value="" className="bg-[#0C0900]">Select a service...</option>
                        <option value="Website Design & Development" className="bg-[#0C0900]">Website Design & Development</option>
                        <option value="Business Software / ERP" className="bg-[#0C0900]">Business Software / ERP</option>
                        <option value="Accounting & Billing Software" className="bg-[#0C0900]">Accounting & Billing Software</option>
                        <option value="Mobile App (iOS & Android)" className="bg-[#0C0900]">Mobile App (iOS & Android)</option>
                        <option value="CRM & Client Management" className="bg-[#0C0900]">CRM & Client Management</option>
                        <option value="Custom Software Solution" className="bg-[#0C0900]">Custom Software Solution</option>
                        <option value="Not Sure — Need Consultation" className="bg-[#0C0900]">Not Sure — Need Consultation</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2.5 block">Approximate Budget</label>
                    <div className="relative">
                      <select value={form.budget}
                        onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))}
                        className={`${inputCls} appearance-none cursor-pointer pr-12`}>
                        <option value="" className="bg-[#0C0900]">Select a range (optional)</option>
                        <option value="Under ₹50,000" className="bg-[#0C0900]">Under ₹50,000</option>
                        <option value="₹50,000 – ₹1,00,000" className="bg-[#0C0900]">₹50,000 – ₹1,00,000</option>
                        <option value="₹1,00,000 – ₹3,00,000" className="bg-[#0C0900]">₹1,00,000 – ₹3,00,000</option>
                        <option value="₹3,00,000 – ₹10,00,000" className="bg-[#0C0900]">₹3,00,000 – ₹10,00,000</option>
                        <option value="Above ₹10,00,000" className="bg-[#0C0900]">Above ₹10,00,000</option>
                        <option value="Let's Discuss" className="bg-[#0C0900]">Let's Discuss</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-2.5 block">
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

                  <p className="font-montserrat text-white/25 text-[9px] uppercase tracking-widest text-center">
                    Your details are kept private and never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ HOW WE WORK ══════════════ */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sr text-center mb-14">
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Our Process</span>
            <h2 className="font-cinzel font-light text-white" style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
              How We <span className="text-[#D4AF37]">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sr-stagger">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="glass-card p-8 relative hover:border-[#D4AF37]/15 transition-colors group">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-[#D4AF37]/25 bg-[#D4AF37]/8">
                    {p.icon}
                  </div>
                  <span className="font-cinzel text-white/10 text-5xl font-light leading-none">{p.step}</span>
                </div>
                <h3 className="font-cinzel text-white text-xl tracking-wider mb-3 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                <p className="font-montserrat text-white/45 text-sm leading-relaxed">{p.desc}</p>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-white/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
