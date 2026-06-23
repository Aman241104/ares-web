import LegacyCTA from "@/components/LegacyCTA";

export default function GalleryPage() {
  const placeholders = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="pt-16">
      <section className="relative py-24 px-4 sm:px-8 lg:px-12 bg-[#060d14] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"radial-gradient(circle at 50% 50%, rgba(218,165,55,0.06) 0%, transparent 70%)"}} />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="font-montserrat text-[#DAA537] text-xs font-bold tracking-[0.4em] uppercase mb-4">Relive the Moments</div>
          <h1 className="font-cinzel font-black text-5xl sm:text-6xl text-white mb-4">
            GALLERY
          </h1>
          <div className="w-24 h-0.5 bg-[#DAA537] mx-auto mb-6" />
          <p className="font-montserrat text-white/60 text-base">Capturing every milestone, every victory, every connection from ARES Business League 2026</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          {/* Coming Soon Banner */}
          <div className="bg-[#060d14] border border-[#DAA537]/30 rounded-2xl p-12 text-center mb-12">
            <div className="w-16 h-16 bg-[#DAA537]/10 border border-[#DAA537]/30 rounded-2xl flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-[#DAA537]/50" fill="currentColor" viewBox="0 0 24 24"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/></svg></div>
            <h2 className="font-cinzel font-black text-white text-3xl mb-3">
              GALLERY COMING <span className="text-[#DAA537]">SOON</span>
            </h2>
            <p className="font-montserrat text-white/60 text-base">
              Photos and videos from events will be published here during the tournament. Check back after June 24, 2026!
            </p>
          </div>

          {/* Placeholder grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {placeholders.map((i) => (
              <div key={i} className="aspect-square bg-[#060d14] border border-[#DAA537]/10 rounded-xl flex items-center justify-center hover:border-[#DAA537]/30 transition-all">
                <div className="text-center">
                  <div className="w-8 h-8 border border-[#DAA537]/20 rounded-lg mx-auto mb-1 opacity-30" />
                  <div className="font-montserrat text-white/20 text-xs">Photo {i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
