import Link from "next/link";
import { ArrowRight, Users, BarChart2, Trophy, Handshake, Megaphone, Target, Globe, Building2 } from "lucide-react";
import { partners } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const tierColors: Record<string, string> = {
  "Platinum Partner": "#E5E4E2",
  "Strategic Partner": "#DAA537",
  "Gold Partner": "#DAA537",
  "Silver Partner": "#C0C0C0",
  "Print Partner": "#DAA537",
  "Branding Partner": "#DAA537",
  "Digital Partner": "#DAA537",
  "Marketing Partner": "#DAA537",
  "Gifting Partner": "#DAA537",
};

export default function PartnersPage() {
  return (
    <div className="pt-16">
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#060d14] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(circle at 50% 50%, rgba(218,165,55,0.06) 0%, transparent 70%)"}} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="font-montserrat text-[#DAA537] text-xs font-bold tracking-[0.4em] uppercase mb-4">Building Together</div>
          <h1 className="font-cinzel font-black text-5xl sm:text-6xl text-white mb-4">
            OUR <span className="text-[#DAA537]">PARTNERS</span>
          </h1>
          <div className="w-24 h-0.5 bg-[#DAA537] mx-auto mb-6" />
          <p className="font-montserrat text-white/60 text-base max-w-2xl mx-auto">
            Proud partners who believe in our mission and power the ARES Business League 2026 — building businesses, building the nation.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {icon:<Users className="w-6 h-6 text-[#DAA537]"/>,num:"18+",label:"Trusted Partners"},
            {icon:<Trophy className="w-6 h-6 text-[#DAA537]"/>,num:"4",label:"Team Owners"},
            {icon:<BarChart2 className="w-6 h-6 text-[#DAA537]"/>,num:"6",label:"Commissioners"},
            {icon:<Globe className="w-6 h-6 text-[#DAA537]"/>,num:"∞",label:"Endless Impact"},
          ].map((s) => (
            <div key={s.label} className="text-center p-5 bg-[#060d14] border border-[#DAA537]/20 rounded-xl">
              <div className="flex justify-center mb-2">{s.icon}</div>
              <div className="font-cinzel font-black text-3xl text-[#DAA537]">{s.num}</div>
              <div className="font-montserrat text-white/50 text-xs uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-cinzel font-bold text-white text-2xl">Our Partners</h2>
            <Link href="/contact" className="btn-primary text-sm">Become a Partner <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <p className="font-montserrat text-white/50 text-sm mb-8">Heartfelt thanks to our amazing partners who believe in our mission and power this league.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
            {partners.map((p) => (
              <div key={p.name} className="bg-white rounded-xl p-5 flex flex-col items-center justify-center text-center hover:shadow-[0_0_24px_rgba(218,165,55,0.35)] hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[120px] group border border-white/80"
                style={{borderTop: (p.tier.toLowerCase().includes("platinum") || p.tier.toLowerCase().includes("strategic")) ? "3px solid #DAA537" : p.tier.toLowerCase().includes("gold") ? "2px solid #C49428" : "1px solid #e5e7eb"}}>
                <div className="w-12 h-12 rounded-xl bg-[#DAA537]/12 border border-[#DAA537]/25 flex items-center justify-center mx-auto mb-3"><Building2 className="w-6 h-6 text-[#DAA537]"/></div>
                <div className="font-cinzel font-bold text-[#0D1B2A] text-xs leading-tight mb-1">{p.name}</div>
                <div className="font-montserrat text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                  style={{color:(p.tier.toLowerCase().includes("platinum")||p.tier.toLowerCase().includes("strategic"))?"#B8860B":"#C49428", background:"rgba(218,165,55,0.1)", border:"1px solid rgba(218,165,55,0.3)"}}>
                  {p.tier}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="btn-primary">
              Become a Partner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#060d14] border border-[#DAA537]/30 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4"><Handshake className="w-12 h-12 text-[#DAA537]"/></div>
            <h2 className="font-cinzel font-black text-white text-3xl mb-4">
              PROUD PARTNERS IN <span className="text-[#DAA537]">BUILDING THE NATION</span>
            </h2>
            <p className="font-montserrat text-white/60 text-base mb-6 max-w-xl mx-auto">
              Join us as a partner and get exclusive visibility, networking opportunities, and brand association with 30 elite business owners and their networks.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                {icon:<Megaphone className="w-6 h-6 text-[#DAA537]"/>,title:"Strategic Partnership",desc:"Brand visibility throughout the tournament"},
                {icon:<Target className="w-6 h-6 text-[#DAA537]"/>,title:"Leadership Development",desc:"Associate with top business leaders"},
                {icon:<Globe className="w-6 h-6 text-[#DAA537]"/>,title:"Nation Building",desc:"Be part of something truly impactful"},
              ].map((b) => (
                <div key={b.title} className="p-4 bg-white/5 border border-[#DAA537]/15 rounded-xl text-center">
                  <div className="flex justify-center mb-2">{b.icon}</div>
                  <div className="font-cinzel font-bold text-[#DAA537] text-sm mb-1">{b.title}</div>
                  <div className="font-montserrat text-white/50 text-xs">{b.desc}</div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary text-base px-10 py-4 inline-flex">
              Contact Us to Partner <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
