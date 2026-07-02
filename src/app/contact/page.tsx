"use client";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
  Send,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ITEMS = [
  { icon: <MessageCircle className="w-4 h-4" />, label: "WhatsApp", value: "+91 97680 10720",             href: "https://wa.me/919768010720" },
  { icon: <Mail className="w-4 h-4" />,          label: "Email",    value: "info@aresbusinessleague.com", href: "mailto:info@aresbusinessleague.com" },
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
      tl.from(".c-title", { opacity: 0, y: 30, duration: 0.8 })
        .from(".c-desc", { opacity: 0, y: 15, duration: 0.6 }, "-=0.6")
        .from(".c-contact-item", { opacity: 0, x: -15, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".c-form", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const inputCls = "w-full px-4 py-3 font-montserrat text-white placeholder-white/30 text-[11px] tracking-wide focus:outline-none transition-all rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#00A859]/50 focus:bg-white/[0.06] shadow-inner";

  return (
    <div ref={containerRef} className="pt-28 pb-16 bg-[#050B0A] min-h-screen overflow-x-hidden font-montserrat flex items-center">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#00A859]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#00A859]/5 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
        
        {/* ── LEFT COLUMN: TITLE & CONTACT INFO ── */}
        <div className="lg:col-span-5 pt-4">
          <h1 className="c-title font-cinzel font-bold text-white mb-4 leading-[1.1]" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
            START A <br className="hidden lg:block" /><span className="text-[#00A859] drop-shadow-[0_0_15px_rgba(0,168,89,0.3)] whitespace-nowrap">PROJECT.</span>
          </h1>
          <p className="c-desc text-white/60 text-xs sm:text-sm leading-[1.8] mb-8 tracking-wide font-medium max-w-md">
            Whether you need a cutting-edge website, custom business software, or an enterprise mobile app — describe what you want to build and we'll engineer it.
          </p>

          <div className="space-y-3 mb-8">
            {CONTACT_ITEMS.map((c, i) => (
              <a 
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="c-contact-item group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#00A859]/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 group-hover:bg-[#00A859] group-hover:border-[#00A859] group-hover:text-[#050B0A] transition-all duration-300 shadow-md">
                  {c.icon}
                </div>
                <div>
                  <div className="text-white/50 text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5">{c.label}</div>
                  <div className="text-white font-cinzel text-xs sm:text-sm tracking-wide group-hover:text-[#00A859] transition-colors">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="c-contact-item p-6 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00A859] to-transparent" />
            <h3 className="text-white font-cinzel text-sm font-bold tracking-wide mb-3">Our Process</h3>
            <ul className="space-y-2">
              {[
                "1. Discover & Strategy",
                "2. Architecture & Design",
                "3. Development & Testing",
                "4. Launch & Scale"
              ].map((step, idx) => (
                <li key={idx} className="text-white/60 text-[10px] sm:text-xs tracking-wide font-medium flex items-center gap-2">
                  <span className="text-[#00A859]/80 text-[8px]">■</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT COLUMN: FORM ── */}
        <div className="lg:col-span-7 c-form">
          <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-[1.5rem] p-6 sm:p-8 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md">
            
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A859] to-transparent opacity-50" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00A859]/10 blur-[60px] rounded-full pointer-events-none" />
            
            {sent ? (
              <div className="py-12 text-center relative z-10">
                <div className="w-16 h-16 border border-[#00A859]/30 bg-[#00A859]/10 flex items-center justify-center mx-auto mb-4 rounded-full shadow-[0_0_20px_rgba(0,168,89,0.2)]">
                  <Send className="w-6 h-6 text-[#00A859]" />
                </div>
                <h3 className="font-cinzel font-bold text-white text-2xl mb-3 tracking-wider">Inquiry Sent</h3>
                <p className="text-white/60 text-xs leading-[1.8] mb-8 max-w-sm mx-auto tracking-wide">
                  Your project requirements have been forwarded via WhatsApp. Our team will review the details and get back to you shortly.
                </p>
                <button onClick={() => setSent(false)} className="text-[#00A859] hover:text-[#008F4C] font-bold text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center justify-center mx-auto gap-2">
                  Send Another <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 block">
                      Full Name <span className="text-[#00A859]">*</span>
                    </label>
                    <input type="text" required placeholder="John Doe"
                      value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 block">
                      Email Address <span className="text-[#00A859]">*</span>
                    </label>
                    <input type="email" required placeholder="john@example.com"
                      value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                      className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 block">Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210"
                      value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 block">Company Name</label>
                    <input type="text" placeholder="Acme Corp"
                      value={form.business} onChange={(e) => setForm(f => ({ ...f, business: e.target.value }))}
                      className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 block">
                    Service Required <span className="text-[#00A859]">*</span>
                  </label>
                  <div className="relative">
                    <select required value={form.service}
                      onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}
                      className={`${inputCls} appearance-none cursor-pointer pr-10`}>
                      <option value="" className="bg-[#050B0A]">Select a service...</option>
                      <option value="Website Design & Development" className="bg-[#050B0A]">Website Design & Development</option>
                      <option value="Business Software / ERP" className="bg-[#050B0A]">Business Software / ERP</option>
                      <option value="Mobile App (iOS & Android)" className="bg-[#050B0A]">Mobile App (iOS & Android)</option>
                      <option value="Custom Software Solution" className="bg-[#050B0A]">Custom Software Solution</option>
                      <option value="Not Sure — Need Consultation" className="bg-[#050B0A]">Not Sure — Need Consultation</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 block">
                    Project Details <span className="text-[#00A859]">*</span>
                  </label>
                  <textarea rows={4} required
                    placeholder="Describe your goals, requirements, and the problem you are trying to solve..."
                    value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`${inputCls} resize-none`} />
                </div>

                <button type="submit" className="w-full bg-[#00A859] hover:bg-[#008F4C] text-[#050B0A] font-bold text-[10px] uppercase tracking-[0.2em] py-3.5 mt-2 rounded-lg flex justify-center items-center gap-2.5 transition-colors duration-300 shadow-[0_0_20px_rgba(0,168,89,0.2)]">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
