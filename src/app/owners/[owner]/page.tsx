"use client";
import { useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2, Globe, Phone, Mail, ChevronRight, Code, Megaphone, BarChart2, Cpu, DollarSign, Factory, Zap, Newspaper, BookOpen, Users, Briefcase } from "lucide-react";
import { teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OWNER_PORTRAITS: Record<string, string> = {
  "narendra-modi": "/images/owner_modi.png",
  "ajit-doval": "/images/owner_doval.png",
  "amit-shah": "/images/owner_shah.png",
  "s-jaishankar": "/images/owner_jaishankar.png",
};

export default function OwnerPage({ params }: { params: Promise<{ owner: string }> }) {
  const resolvedParams = use(params);
  const { owner: ownerId } = resolvedParams;
  const team = teams.find((t) => t.owner.id === ownerId);
  if (!team) notFound();
  const owner = team.owner;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-img", { opacity: 0, x: -30, duration: 1 })
        .from(".h-info", { opacity: 0, x: 30, duration: 1 }, "-=0.8");

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
    <div ref={containerRef} className="pt-28 bg-[#000000] min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "640px" }}>
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 80% at 20% 50%, ${team.color}08 0%, transparent 70%)` }} />

        <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row min-h-[640px]">
          {/* LEFT — Large owner photo (40-45% width) */}
          <div className="relative lg:w-[42%] flex-shrink-0 min-h-[400px] lg:min-h-[640px] h-img">
            {OWNER_PORTRAITS[owner.id] ? (
              <img
                src={OWNER_PORTRAITS[owner.id]}
                alt={owner.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ maskImage: "linear-gradient(to right, rgba(0,0,0,1) 55%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 55%, transparent 100%)" }}
              />
            ) : (
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                 <div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"><Users className="w-16 h-16 text-white/20"/></div>
              </div>
            )}
            {/* bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, #000000 0%, transparent 100%)" }} />
            {/* color accent bar */}
            <div className="absolute bottom-0 left-0 w-[2px] top-0" style={{ background: `linear-gradient(to bottom, transparent, ${team.color}, transparent)` }} />
          </div>

          {/* RIGHT — Info */}
          <div className="lg:w-[58%] flex flex-col justify-center px-6 sm:px-10 lg:pl-12 lg:pr-12 py-16 relative h-info">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 font-montserrat text-[10px] uppercase tracking-widest text-white/40 mb-10">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3"/>
              <Link href="/teams" className="hover:text-white transition-colors">Team Owners</Link>
              <ChevronRight className="w-3 h-3"/>
              <span style={{ color: team.color }}>{owner.name}</span>
            </div>

            <div className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.4em] uppercase mb-4">TEAM OWNER &amp; LEADER</div>
            <h1 className="font-cinzel font-light text-white leading-[1.1] mb-2 uppercase" style={{ fontSize: "clamp(32px, 5vw, 72px)" }}>{owner.name}</h1>
            <div className="w-24 h-px mb-4 bg-white/20" />
            <div className="font-cinzel tracking-widest text-lg mb-8" style={{ color: team.color }}>{team.fullName.toUpperCase()}</div>

            {/* Leadership tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {owner.leadershipStyle.split(" • ").map((tag)=>(
                <span key={tag} className="font-montserrat text-[9px] font-bold border rounded-full px-4 py-1.5 uppercase tracking-widest" style={{ borderColor: team.color + "40", color: team.color, backgroundColor: team.color + "10" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 pl-6 py-2 mb-10" style={{ borderColor: team.color }}>
              <div className="font-montserrat text-white/60 text-sm italic leading-relaxed">"{owner.quote}"</div>
            </blockquote>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: <MapPin className="w-4 h-4"/>, l: "From", v: owner.from },
                { icon: <Clock className="w-4 h-4"/>, l: "Experience", v: owner.experience },
                { icon: <Globe className="w-4 h-4"/>, l: "Focus Areas", v: owner.focusAreas },
                { icon: <Building2 className="w-4 h-4"/>, l: "Company", v: owner.company.name },
              ].map((i)=>(
                <div key={i.l} className="flex items-start gap-4 glass-card p-4 border-white/5 bg-white/[0.01]">
                  <div className="text-[#D4AF37] mt-0.5 flex-shrink-0">{i.icon}</div>
                  <div>
                    <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mb-1">{i.l}</div>
                    <div className="font-cinzel text-white text-sm">{i.v}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team stats */}
            <div className="flex gap-4">
              {[{ l: "Members", v: String(team.members) }, { l: "Team Points", v: team.points.toLocaleString() }, { l: "Current Rank", v: `#${team.rank}` }].map((s)=>(
                <div key={s.l} className="text-center px-6 py-4 rounded-xl border flex-1" style={{ borderColor: team.color + "30", backgroundColor: team.color + "08" }}>
                  <div className="font-cinzel font-light text-2xl mb-1" style={{ color: team.color }}>{s.v}</div>
                  <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#030712] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sr">
          
          <div className="glass-card p-10 border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm uppercase">Company Details</h3>
            </div>
            
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="w-20 h-20 bg-white/[0.05] border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-[#D4AF37]"/>
              </div>
              <div>
                <div className="font-cinzel text-white text-2xl mb-1">{owner.company.name}</div>
                <div className="font-montserrat text-white/50 text-[10px] uppercase tracking-widest">{owner.company.industry}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: <Building2 className="w-4 h-4"/>, l: "Industry", v: owner.company.industry },
                { icon: <Clock className="w-4 h-4"/>, l: "Founded", v: owner.company.founded },
                { icon: <MapPin className="w-4 h-4"/>, l: "Headquarters", v: owner.company.headquarters },
                { icon: <Globe className="w-4 h-4"/>, l: "Website", v: owner.company.website },
                { icon: <Building2 className="w-4 h-4"/>, l: "Company Size", v: owner.company.size },
              ].map((i)=>(
                <div key={i.l} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                  <div className="text-[#D4AF37] flex-shrink-0">{i.icon}</div>
                  <span className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest w-32 flex-shrink-0">{i.l}</span>
                  <span className="font-cinzel text-white text-sm tracking-wider break-all">{i.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10 border-white/10 flex flex-col justify-center">
            <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm mb-6 uppercase">About Our Company</h3>
            <p className="font-montserrat text-white/60 text-sm leading-relaxed mb-8">{owner.company.about}</p>
            <div className="flex flex-wrap gap-3 mt-auto">
              {owner.company.values.map((v)=>(
                <span key={v} className="font-montserrat font-bold text-[9px] border rounded-full px-4 py-2 uppercase tracking-widest" style={{ borderColor: team.color + "40", color: team.color, backgroundColor: team.color + "10" }}>
                  {v}
                </span>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* CONNECTIONS + SERVICES */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sr-stagger">
          
          <div className="glass-card p-10 border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm uppercase">Who We Want to Connect With</h3>
            </div>
            <p className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest mb-8">We are looking to connect with:</p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Business Owners & Entrepreneurs", icon: <Users className="w-5 h-5"/> },
                { label: "IT & Technology Leaders", icon: <Cpu className="w-5 h-5"/> },
                { label: "Marketing & Growth Strategists", icon: <Megaphone className="w-5 h-5"/> },
                { label: "Investors & Funding Partners", icon: <DollarSign className="w-5 h-5"/> },
                { label: "Manufacturers & Industrial Leaders", icon: <Factory className="w-5 h-5"/> },
                { label: "Startups & Scaleups", icon: <Zap className="w-5 h-5"/> },
                { label: "HR & Talent Partners", icon: <Newspaper className="w-5 h-5"/> },
                { label: "Sales & Business Development", icon: <BookOpen className="w-5 h-5"/> },
              ].map((c)=>(
                <div key={c.label} className="flex items-start gap-4 p-4 bg-white/[0.05] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                  <span className="text-[#D4AF37] flex-shrink-0">{c.icon}</span>
                  <span className="font-montserrat text-white/60 text-[10px] uppercase tracking-wider leading-relaxed">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10 border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm uppercase">Our Products & Services</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Code className="w-6 h-6"/>, n: "Custom Software Dev", d: "Tailored solutions to power your business." },
                { icon: <Globe className="w-6 h-6"/>, n: "Web & Mobile Apps", d: "Scalable, secure and high performance." },
                { icon: <Megaphone className="w-6 h-6"/>, n: "Digital Marketing", d: "Drive visibility and generate leads." },
                { icon: <Zap className="w-6 h-6"/>, n: "Cloud & DevOps", d: "Build, deploy and scale with confidence." },
                { icon: <Briefcase className="w-6 h-6"/>, n: "Business Consulting", d: "Strategic guidance for sustainable growth." },
                { icon: <BarChart2 className="w-6 h-6"/>, n: "Data Analytics", d: "Turn data into actionable insights." },
              ].map((s)=>(
                <div key={s.n} className="p-5 bg-white/[0.05] border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                  <div className="text-[#D4AF37] mb-3">{s.icon}</div>
                  <div className="font-cinzel text-white text-sm tracking-wider mb-2">{s.n}</div>
                  <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest leading-relaxed">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* CONNECT CTA */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#030712] border-t border-white/5 sr">
        <div className="max-w-7xl mx-auto glass-card border-[#D4AF37]/30 rounded-2xl p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 40% 60% at 0% 50%, ${team.color}15 0%, transparent 70%)` }} />
          
          <div className="relative">
            <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Connect</div>
            <h3 className="font-cinzel font-light text-white text-3xl sm:text-4xl mb-6 leading-tight">
              LET'S BUILD SOMETHING <span className="text-[#D4AF37] italic">IMPACTFUL</span> TOGETHER
            </h3>
            <p className="font-montserrat text-white/50 text-sm mb-10 leading-relaxed max-w-md">Open to collaborations, partnerships and opportunities that create long-term value.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Connect With Me <ArrowRight className="w-4 h-4 ml-2" /></Link>
              <Link href="/contact" className="btn-secondary">Contact My Company</Link>
            </div>
          </div>
          
          <div className="relative space-y-6 lg:pl-12 lg:border-l border-white/10">
            {[
              { icon: <Phone className="w-5 h-5"/>, v: owner.phone },
              { icon: <Mail className="w-5 h-5"/>, v: owner.email },
              { icon: <Globe className="w-5 h-5"/>, v: owner.company.website },
              { icon: <MapPin className="w-5 h-5"/>, v: owner.company.headquarters },
            ].map((c)=>(
              <div key={c.v} className="flex items-center gap-4 font-cinzel tracking-wider text-white text-lg">
                <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">{c.icon}</div>
                {c.v}
              </div>
            ))}
          </div>
          
        </div>
      </section>

    </div>
  );
}
