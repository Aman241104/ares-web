"use client";
import { useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Building2, Globe, Phone, Mail, ChevronRight, Code, Megaphone, BarChart2, Cpu, DollarSign, Factory, Zap, Newspaper, BookOpen, Users, Briefcase, Gavel, Key, HeartCrack, Map, Landmark, Banknote, Receipt, FileText, ShieldCheck, FileCheck, Gem, Sparkles, UtensilsCrossed, Frame, Pin, Gift, Wind, Wrench, RefreshCw } from "lucide-react";
import { teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OWNER_PORTRAITS: Record<string, string> = {
  "jay-patel": "/images/owner_modi.png",
  "vishnu-soni": "/images/owner_doval.png",
  "harsh-brambhatt": "/images/owner_shah.png",
  "mayursinh-chavda": "/images/owner_jaishankar.png",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  gavel: <Gavel className="w-6 h-6" />,
  key: <Key className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  "heart-crack": <HeartCrack className="w-6 h-6" />,
  map: <Map className="w-6 h-6" />,
  landmark: <Landmark className="w-6 h-6" />,
  banknote: <Banknote className="w-6 h-6" />,
  receipt: <Receipt className="w-6 h-6" />,
  "book-open": <BookOpen className="w-6 h-6" />,
  "file-text": <FileText className="w-6 h-6" />,
  "shield-check": <ShieldCheck className="w-6 h-6" />,
  building: <Building2 className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  "file-check": <FileCheck className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  megaphone: <Megaphone className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  "bar-chart": <BarChart2 className="w-6 h-6" />,
  gem: <Gem className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  utensils: <UtensilsCrossed className="w-6 h-6" />,
  frame: <Frame className="w-6 h-6" />,
  pin: <Pin className="w-6 h-6" />,
  gift: <Gift className="w-6 h-6" />,
  wind: <Wind className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
  "refresh-cw": <RefreshCw className="w-6 h-6" />,
};

const DEFAULT_SERVICES = [
  { icon: "code", name: "Custom Software Dev", desc: "Tailored solutions to power your business." },
  { icon: "globe", name: "Web & Mobile Apps", desc: "Scalable, secure and high performance." },
  { icon: "megaphone", name: "Digital Marketing", desc: "Drive visibility and generate leads." },
  { icon: "zap", name: "Cloud & DevOps", desc: "Build, deploy and scale with confidence." },
  { icon: "briefcase", name: "Business Consulting", desc: "Strategic guidance for sustainable growth." },
  { icon: "bar-chart", name: "Data Analytics", desc: "Turn data into actionable insights." },
];

const DEFAULT_CONNECT_WITH = [
  "Business Owners & Entrepreneurs",
  "IT & Technology Leaders",
  "Marketing & Growth Strategists",
  "Investors & Funding Partners",
  "Manufacturers & Industrial Leaders",
  "Startups & Scaleups",
  "HR & Talent Partners",
  "Sales & Business Development",
];
const CONNECT_ICON_CYCLE = [Users, Cpu, Megaphone, DollarSign, Factory, Zap, Newspaper, BookOpen];

export default function OwnerPageClient({ params }: { params: Promise<{ owner: string }> }) {
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
              <Image
                src={OWNER_PORTRAITS[owner.id]}
                alt={owner.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
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
      <section className="py-12 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#030712] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sr">
          
          <div className="glass-card p-10 border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm uppercase">Company Details</h3>
            </div>
            
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden ${owner.company.logo ? "bg-white p-2" : "bg-white/[0.05] border border-white/10"}`}>
                {owner.company.logo ? (
                  <Image src={owner.company.logo} alt={`${owner.company.name} logo`} width={80} height={80} className="w-full h-full object-contain" />
                ) : (
                  <Building2 className="w-8 h-8 text-[#D4AF37]"/>
                )}
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
              ].filter((i) => i.v).map((i)=>(
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
      <section className="py-12 sm:py-24 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sr-stagger">
          
          <div className="glass-card p-10 border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm uppercase">Who We Want to Connect With</h3>
            </div>
            <p className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest mb-8">We are looking to connect with:</p>
            
            <div className="grid grid-cols-2 gap-4">
              {(owner.company.connectWith ?? DEFAULT_CONNECT_WITH).map((label, i)=>{
                const Icon = CONNECT_ICON_CYCLE[i % CONNECT_ICON_CYCLE.length];
                return (
                  <div key={label} className="flex items-start gap-4 p-4 bg-white/[0.05] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <span className="text-[#D4AF37] flex-shrink-0"><Icon className="w-5 h-5" /></span>
                    <span className="font-montserrat text-white/60 text-[10px] uppercase tracking-wider leading-relaxed">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-card p-10 border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <h3 className="font-cinzel tracking-widest text-[#D4AF37] text-sm uppercase">Our Products & Services</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(owner.company.services ?? DEFAULT_SERVICES).map((s)=>(
                <div key={s.name} className="p-5 bg-white/[0.05] border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                  <div className="text-[#D4AF37] mb-3">{SERVICE_ICONS[s.icon] ?? <Briefcase className="w-6 h-6" />}</div>
                  <div className="font-cinzel text-white text-sm tracking-wider mb-2">{s.name}</div>
                  <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="py-10 px-6 sm:px-10 lg:px-16 bg-[#030712] border-t border-white/5 sr">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border border-white/8 rounded-full px-8 py-5">
          {[
            { icon: <Phone className="w-3.5 h-3.5"/>, v: owner.phone },
            { icon: <Mail className="w-3.5 h-3.5"/>, v: owner.email },
            { icon: <Globe className="w-3.5 h-3.5"/>, v: owner.company.website },
            { icon: <MapPin className="w-3.5 h-3.5"/>, v: owner.company.headquarters },
          ].filter((c) => c.v).map((c)=>(
            <div key={c.v} className="flex items-center gap-2.5 font-montserrat text-white/60 text-xs tracking-wide">
              <span className="text-[#D4AF37]">{c.icon}</span>
              {c.v}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
