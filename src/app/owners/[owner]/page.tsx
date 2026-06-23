import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2, Globe, Phone, Mail, ChevronRight, Code, Megaphone, BarChart2, Cpu, DollarSign, Factory, Zap, Newspaper, BookOpen, Users, Briefcase } from "lucide-react";
import { teams } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const OWNER_PORTRAITS: Record<string, string> = {
  "narendra-modi": "/images/owner-portrait-1.jpg",
  "ajit-doval": "/images/owner-portrait-2.jpg",
  "amit-shah": "/images/owner-portrait-3.jpg",
  "s-jaishankar": "/images/owner-portrait-4.jpg",
};

export async function generateStaticParams() {
  return teams.map((t) => ({ owner: t.owner.id }));
}

export default async function OwnerPage({ params }: { params: Promise<{ owner: string }> }) {
  const { owner: ownerId } = await params;
  const team = teams.find((t) => t.owner.id === ownerId);
  if (!team) notFound();
  const owner = team.owner;

  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="relative overflow-hidden" style={{background:`linear-gradient(135deg, #020609 0%, ${team.color}10 35%, #030810 100%)`, minHeight:"560px"}}>
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        {/* atmospheric color glow */}
        <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(ellipse 60% 80% at 20% 50%, ${team.color}08 0%, transparent 70%)`}} />

        <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row min-h-[560px]">
          {/* LEFT — Large owner photo (40-45% width) */}
          <div className="relative lg:w-[42%] flex-shrink-0 min-h-[360px] lg:min-h-[560px]">
            {OWNER_PORTRAITS[owner.id] ? (
              <img
                src={OWNER_PORTRAITS[owner.id]}
                alt={owner.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{maskImage:"linear-gradient(to right, rgba(0,0,0,1) 55%, transparent 100%)", WebkitMaskImage:"linear-gradient(to right, rgba(0,0,0,1) 55%, transparent 100%)"}}
              />
            ) : (
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center"><div className="w-32 h-32 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"><Users className="w-16 h-16 text-white/20"/></div></div>
            )}
            {/* bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{background:"linear-gradient(to top, #030810 0%, transparent 100%)"}} />
            {/* color accent bar */}
            <div className="absolute bottom-0 left-0 w-1 top-0" style={{background:`linear-gradient(to bottom, transparent, ${team.color}, transparent)`}} />
          </div>

          {/* RIGHT — Info */}
          <div className="lg:w-[58%] flex flex-col justify-center px-6 sm:px-10 lg:pl-12 lg:pr-12 py-14 lg:py-16 relative">
            {/* Team Flag Card — top right */}
            <div className="absolute top-6 right-6 hidden lg:block bg-[#060d14]/90 border rounded-xl p-3 text-center w-32" style={{borderColor:team.color}}>
              <div className="h-1 rounded-sm mb-2" style={{background:team.color}} />
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-black text-xl mx-auto mb-1" style={{background:`linear-gradient(135deg, ${team.color}40, ${team.color}20)`,border:`1px solid ${team.color}50`,color:team.color}}>{team.name.charAt(0)}</div>
              <div className="font-cinzel font-bold text-[10px] tracking-wider" style={{color:team.color}}>{team.name.toUpperCase()}</div>
              <div className="font-montserrat text-white/35 text-[9px] mt-0.5">{team.fullName.split(" ").at(-1)}</div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 font-montserrat text-xs text-white/30 mb-8">
              <Link href="/" className="hover:text-[#DAA537]">Home</Link>
              <ChevronRight className="w-3 h-3"/>
              <Link href="/teams" className="hover:text-[#DAA537]">Team Owners</Link>
              <ChevronRight className="w-3 h-3"/>
              <span style={{color:team.color}}>{owner.name}</span>
            </div>

            <div className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase mb-3">TEAM OWNER &amp; LEADER</div>
            <h1 className="font-cinzel font-black text-white leading-[0.9] mb-3" style={{fontSize:"clamp(36px,5vw,72px)", textShadow:"0 2px 40px rgba(0,0,0,0.8)"}}>{owner.name.toUpperCase()}</h1>
            <div className="w-16 h-0.5 mb-3" style={{background:`linear-gradient(90deg, ${team.color}, transparent)`}} />
            <div className="font-cinzel font-bold text-lg mb-5" style={{color:team.color}}>{team.fullName.toUpperCase()}</div>

            {/* Leadership tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {owner.leadershipStyle.split(" • ").map((tag)=>(
                <span key={tag} className="font-montserrat text-[11px] font-semibold border rounded-full px-3 py-1 text-white/70" style={{borderColor:team.color+"40",backgroundColor:team.color+"10"}}>{tag}</span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 pl-5 py-1 mb-7" style={{borderColor:team.color}}>
              <div className="font-montserrat text-white/60 text-sm italic leading-relaxed">&ldquo;{owner.quote}&rdquo;</div>
            </blockquote>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                {icon:<MapPin className="w-4 h-4"/>,l:"From",v:owner.from},
                {icon:<Clock className="w-4 h-4"/>,l:"Experience",v:owner.experience},
                {icon:<Globe className="w-4 h-4"/>,l:"Focus Areas",v:owner.focusAreas},
                {icon:<Building2 className="w-4 h-4"/>,l:"Company",v:owner.company.name},
              ].map((i)=>(
                <div key={i.l} className="flex items-start gap-3 bg-white/3 rounded-xl px-3 py-2.5">
                  <div className="text-[#DAA537] mt-0.5 flex-shrink-0">{i.icon}</div>
                  <div>
                    <div className="font-montserrat text-white/35 text-[10px] uppercase tracking-wide">{i.l}</div>
                    <div className="font-montserrat text-white/75 text-xs mt-0.5">{i.v}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team stats */}
            <div className="flex gap-4">
              {[{l:"Members",v:String(team.members)},{l:"Team Points",v:team.points.toLocaleString()},{l:"Current Rank",v:`#${team.rank}`}].map((s)=>(
                <div key={s.l} className="text-center px-4 py-3 rounded-xl border" style={{borderColor:team.color+"30",backgroundColor:team.color+"08"}}>
                  <div className="font-cinzel font-black text-xl" style={{color:team.color}}>{s.v}</div>
                  <div className="font-montserrat text-white/35 text-[10px] uppercase tracking-wide mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[#0D1B2A] border border-[#DAA537]/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full bg-[#DAA537]" />
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base uppercase tracking-wider">Company Details</h3>
            </div>
            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-[#DAA537]/10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#DAA537]/20 to-[#DAA537]/5 border border-[#DAA537]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-[#DAA537]"/>
              </div>
              <div>
                <div className="font-cinzel font-bold text-white text-base">{owner.company.name}</div>
                <div className="font-montserrat text-white/45 text-sm">{owner.company.industry}</div>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                {icon:<Building2 className="w-3.5 h-3.5"/>,l:"Industry",v:owner.company.industry},
                {icon:<Clock className="w-3.5 h-3.5"/>,l:"Founded",v:owner.company.founded},
                {icon:<MapPin className="w-3.5 h-3.5"/>,l:"Headquarters",v:owner.company.headquarters},
                {icon:<Globe className="w-3.5 h-3.5"/>,l:"Website",v:owner.company.website},
                {icon:<Building2 className="w-3.5 h-3.5"/>,l:"Company Size",v:owner.company.size},
              ].map((i)=>(
                <div key={i.l} className="flex items-center gap-2.5 py-1.5 border-b border-white/4 last:border-0">
                  <div className="text-[#DAA537] flex-shrink-0">{i.icon}</div>
                  <span className="font-montserrat text-white/35 text-xs w-24 flex-shrink-0">{i.l}:</span>
                  <span className="font-montserrat text-white/70 text-xs">{i.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0D1B2A] border border-[#DAA537]/20 rounded-2xl p-6">
            <h3 className="font-cinzel font-bold text-[#DAA537] text-base mb-4 uppercase tracking-wider">About Our Company</h3>
            <p className="font-montserrat text-white/55 text-sm leading-relaxed mb-5">{owner.company.about}</p>
            <div className="flex flex-wrap gap-2">
              {owner.company.values.map((v)=>(
                <span key={v} className="font-montserrat font-bold text-[11px] border rounded-full px-4 py-1.5 uppercase tracking-wide" style={{borderColor:team.color+"50",color:team.color,backgroundColor:team.color+"10"}}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTIONS + SERVICES */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-[#060d14] border border-[#DAA537]/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-5 rounded-full bg-[#DAA537]" />
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base uppercase tracking-wider">People We Want to Connect With</h3>
            </div>
            <p className="font-montserrat text-white/35 text-xs mb-4">We are looking to connect with:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                {label:"Business Owners & Entrepreneurs",icon:<Users className="w-4 h-4"/>},
                {label:"IT & Technology Leaders",icon:<Cpu className="w-4 h-4"/>},
                {label:"Marketing & Growth Strategists",icon:<Megaphone className="w-4 h-4"/>},
                {label:"Investors & Funding Partners",icon:<DollarSign className="w-4 h-4"/>},
                {label:"Manufacturers & Industrial Leaders",icon:<Factory className="w-4 h-4"/>},
                {label:"Startups & Scaleups",icon:<Zap className="w-4 h-4"/>},
                {label:"HR & Talent Partners",icon:<Newspaper className="w-4 h-4"/>},
                {label:"Sales & Business Development Heads",icon:<BookOpen className="w-4 h-4"/>},
              ].map((c)=>(
                <div key={c.label} className="flex items-start gap-2 p-2.5 bg-white/5 rounded-xl hover:bg-white/8 transition-colors">
                  <span className="text-[#DAA537] mt-0.5 flex-shrink-0">{c.icon}</span>
                  <span className="font-montserrat text-white/55 text-[11px] leading-tight">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#060d14] border border-[#DAA537]/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 rounded-full bg-[#DAA537]" />
              <h3 className="font-cinzel font-bold text-[#DAA537] text-base uppercase tracking-wider">Our Products & Services</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                {icon:<Code className="w-5 h-5"/>,n:"Custom Software Dev",d:"Tailored solutions to power your business."},
                {icon:<Globe className="w-5 h-5"/>,n:"Web & Mobile Apps",d:"Scalable, secure and high performance."},
                {icon:<Megaphone className="w-5 h-5"/>,n:"Digital Marketing",d:"Drive visibility and generate leads."},
                {icon:<Zap className="w-5 h-5"/>,n:"Cloud & DevOps",d:"Build, deploy and scale with confidence."},
                {icon:<Briefcase className="w-5 h-5"/>,n:"Business Consulting",d:"Strategic guidance for sustainable growth."},
                {icon:<BarChart2 className="w-5 h-5"/>,n:"Data Analytics",d:"Turn data into actionable insights."},
              ].map((s)=>(
                <div key={s.n} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-[#DAA537]/25 transition-all">
                  <div className="text-[#DAA537] mb-1">{s.icon}</div>
                  <div className="font-montserrat font-bold text-white text-[11px] mb-0.5">{s.n}</div>
                  <div className="font-montserrat text-white/35 text-[10px] leading-tight">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT CTA */}
      <section className="py-14 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto bg-[#0D1B2A] border border-[#DAA537]/30 rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(ellipse 40% 60% at 0% 50%, ${team.color}08 0%, transparent 70%)`}} />
          <div className="relative">
            <h3 className="font-cinzel font-black text-white text-2xl sm:text-3xl mb-3 leading-tight">
              LET&rsquo;S BUILD SOMETHING <span className="text-[#DAA537]">IMPACTFUL</span> TOGETHER
            </h3>
            <p className="font-montserrat text-white/55 text-sm mb-5">Open to collaborations, partnerships and opportunities that create long-term value.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Connect With Me <ArrowRight className="w-4 h-4"/></Link>
              <Link href="/contact" className="btn-secondary">Contact My Company <ArrowRight className="w-4 h-4"/></Link>
            </div>
          </div>
          <div className="relative space-y-2.5">
            {[
              {icon:<Phone className="w-4 h-4"/>,v:owner.phone},
              {icon:<Mail className="w-4 h-4"/>,v:owner.email},
              {icon:<Globe className="w-4 h-4"/>,v:owner.company.website},
              {icon:<MapPin className="w-4 h-4"/>,v:owner.company.headquarters},
            ].map((c)=>(
              <div key={c.v} className="flex items-center gap-3 font-montserrat text-white/55 text-sm">
                <div className="text-[#DAA537] flex-shrink-0">{c.icon}</div>{c.v}
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
