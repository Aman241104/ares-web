import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PenLine, Tag } from "lucide-react";
import { blogPosts, teams } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const teamColors: Record<string, string> = {
  "Team Modi": "#E67E22",
  "Team Doval": "#1E3A8A",
  "Team Amit Shah": "#C0392B",
  "Team Jaishankar": "#27AE60",
};

const blogImages: Record<string, string> = {
  "power-of-strategic-collaboration": "/images/blog-strategy.jpg",
  "leadership-in-the-arena": "/images/blog-leadership.jpg",
  "building-connections": "/images/blog-networking.jpg",
  "execution-is-everything": "/images/blog-growth.jpg",
};

const categories = ["Strategy", "Leadership", "Networking", "Execution", "Business Growth", "Nation Building"];

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="pt-16 bg-[#060d14]">

      {/* ── HERO ── */}
      <section className="relative py-32 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#060d14]">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        {/* Radial gold bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(218,165,55,0.10) 0%, transparent 70%)" }}
        />
        {/* Corner vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 40%, #060d14 100%)" }} />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-[#DAA537]/60" />
            <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.45em] uppercase">
              Insights from the Arena
            </span>
            <div className="h-px w-8 bg-[#DAA537]/60" />
          </div>

          <h1 className="font-cinzel font-black leading-none mb-6" style={{ fontSize: "clamp(52px,8vw,96px)" }}>
            <span className="text-white">THE ARENA</span>
            <br />
            <span className="text-gold-gradient text-shadow-gold">BLOG</span>
          </h1>

          <div className="w-32 h-px mx-auto mb-6" style={{ background: "linear-gradient(90deg, transparent, #DAA537, transparent)" }} />

          <p className="font-montserrat text-white/55 text-lg leading-relaxed max-w-xl mx-auto">
            Stories, strategies, and unfiltered insights from the ARES Business League 2026 arena.
          </p>
        </div>
      </section>

      <div className="section-sep" />

      {/* ── FEATURED POST ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-6 rounded-full bg-[#DAA537]" />
            <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.4em] uppercase">
              Featured Article
            </span>
          </div>

          <Link
            href={`/blog/${featured.id}`}
            className="group block relative rounded-2xl overflow-hidden border border-[#DAA537]/25 hover:border-[#DAA537]/60 transition-all duration-500 hover:-translate-y-1"
            style={{ boxShadow: "0 0 0 rgba(218,165,55,0)" }}
          >
            {/* Full-bleed image */}
            <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden">
              {blogImages[featured.id] ? (
                <Image
                  src={blogImages[featured.id]}
                  alt={featured.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[#060d14] flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-[#DAA537]/20" />
                </div>
              )}
              {/* Dark gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #060d14 0%, rgba(6,13,20,0.75) 40%, rgba(6,13,20,0.15) 100%)" }} />
              {/* Gold glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(218,165,55,0.12) 0%, transparent 70%)" }} />
            </div>

            {/* Content overlaid on image */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="font-montserrat text-xs font-bold px-3 py-1 rounded-full border"
                  style={{
                    backgroundColor: (teamColors[featured.author] || "#DAA537") + "22",
                    color: teamColors[featured.author] || "#DAA537",
                    borderColor: (teamColors[featured.author] || "#DAA537") + "50",
                  }}
                >
                  {featured.author}
                </span>
                <span className="font-montserrat text-[#DAA537]/70 text-xs font-semibold px-3 py-1 rounded-full border border-[#DAA537]/30 bg-[#DAA537]/10">
                  {featured.category}
                </span>
                <span className="font-montserrat text-white/35 text-xs">{featured.date}</span>
                <span className="font-montserrat text-white/35 text-xs">·</span>
                <span className="font-montserrat text-white/35 text-xs">{featured.readTime}</span>
              </div>

              <h2 className="font-cinzel font-black text-white text-3xl sm:text-4xl mb-3 leading-tight group-hover:text-[#F5D078] transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="font-montserrat text-white/60 text-base leading-relaxed max-w-2xl mb-5">
                {featured.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 font-montserrat text-[#DAA537] text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
                Read Full Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <div className="section-sep" />

      {/* ── ALL POSTS + SIDEBAR ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Blog Cards ── */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-6 rounded-full bg-[#DAA537]" />
                <span className="font-montserrat text-[#DAA537] text-[11px] font-bold tracking-[0.4em] uppercase">
                  All Articles
                </span>
              </div>

              <div className="space-y-8">
                {rest.map((post) => (
                  <article
                    key={post.id}
                    className="group relative bg-[#0D1B2A] border border-[#DAA537]/20 rounded-2xl overflow-hidden hover:border-[#DAA537]/55 hover:-translate-y-1.5 transition-all duration-400"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
                  >
                    {/* Gold accent bar on left */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to bottom, transparent, #DAA537, transparent)" }}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                      {/* Image */}
                      <div className="sm:col-span-2 relative h-48 sm:h-full min-h-[180px] overflow-hidden">
                        {blogImages[post.id] ? (
                          <Image
                            src={blogImages[post.id]}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover transition-transform duration-600 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#DAA537]/10">
                            <BookOpen className="w-12 h-12 text-[#DAA537]/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0D1B2A] opacity-60 sm:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D1B2A] opacity-60 sm:hidden block" />
                        {/* Category badge on image */}
                        <div className="absolute top-3 left-3">
                          <span className="font-montserrat text-[10px] font-bold px-2 py-1 rounded bg-[#060d14]/80 text-[#DAA537] border border-[#DAA537]/30 backdrop-blur-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="sm:col-span-3 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span
                              className="font-montserrat text-[10px] font-bold px-2.5 py-0.5 rounded-full border"
                              style={{
                                backgroundColor: (teamColors[post.author] || "#DAA537") + "18",
                                color: teamColors[post.author] || "#DAA537",
                                borderColor: (teamColors[post.author] || "#DAA537") + "40",
                              }}
                            >
                              {post.author}
                            </span>
                            <span className="font-montserrat text-white/30 text-[11px]">{post.date}</span>
                            <span className="font-montserrat text-white/30 text-[11px]">·</span>
                            <span className="font-montserrat text-white/30 text-[11px]">{post.readTime}</span>
                          </div>

                          <h2 className="font-cinzel font-bold text-white text-xl mb-3 leading-snug group-hover:text-[#F5D078] transition-colors duration-300">
                            {post.title}
                          </h2>
                          <p className="font-montserrat text-white/50 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-[#DAA537]/10 flex items-center justify-between">
                          <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center gap-1.5 font-montserrat text-[#DAA537] text-xs font-bold uppercase tracking-wider hover:gap-2.5 transition-all duration-300"
                          >
                            Read More <ArrowRight className="w-3 h-3" />
                          </Link>
                          <div className="w-6 h-px bg-[#DAA537]/30 group-hover:w-12 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* Categories */}
              <div className="card-premium p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Tag className="w-4 h-4 text-[#DAA537]" />
                  <h3 className="font-cinzel font-bold text-[#DAA537] text-xs tracking-[0.3em] uppercase">
                    Categories
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="font-montserrat text-[11px] font-semibold border border-[#DAA537]/20 rounded-full px-3 py-1.5 text-white/55 hover:border-[#DAA537]/60 hover:text-[#DAA537] hover:bg-[#DAA537]/06 cursor-pointer transition-all duration-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Blogs */}
              <div className="card-premium p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-[#DAA537]" />
                  <h3 className="font-cinzel font-bold text-[#DAA537] text-xs tracking-[0.3em] uppercase">
                    Team Blogs
                  </h3>
                </div>
                <div className="space-y-2">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/05 border border-transparent hover:border-white/08 transition-all duration-200 cursor-pointer group"
                    >
                      <div
                        className="w-9 h-9 rounded-lg font-cinzel font-black text-xs text-white flex items-center justify-center flex-shrink-0 border"
                        style={{
                          background: team.color + "22",
                          borderColor: team.color + "50",
                          color: team.color,
                        }}
                      >
                        {team.name.replace("Team ", "").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-montserrat font-bold text-white text-xs group-hover:text-[#DAA537] transition-colors truncate">
                          {team.name}
                        </div>
                        <div className="font-montserrat text-white/35 text-[10px] mt-0.5">{team.tagline}</div>
                      </div>
                      <div
                        className="ml-auto text-[10px] font-bold font-montserrat rounded-full px-2 py-0.5 flex-shrink-0"
                        style={{ background: team.color + "20", color: team.color }}
                      >
                        1 post
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contribute CTA */}
              <div
                className="relative rounded-2xl p-6 text-center overflow-hidden border border-[#DAA537]/30"
                style={{ background: "linear-gradient(135deg, rgba(218,165,55,0.10) 0%, rgba(13,27,42,0.95) 100%)" }}
              >
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl border border-[#DAA537]/40 bg-[#DAA537]/10 flex items-center justify-center mx-auto mb-4">
                    <PenLine className="w-5 h-5 text-[#DAA537]" />
                  </div>
                  <h3 className="font-cinzel font-bold text-white text-sm mb-2 tracking-wide">
                    Want to Contribute?
                  </h3>
                  <p className="font-montserrat text-white/45 text-xs leading-relaxed mb-5">
                    Submit your thoughts on business, leadership, and nation building to the Arena Blog.
                  </p>
                  <Link href="/contact" className="btn-primary w-full justify-center text-[10px]">
                    Contact Us <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="section-sep" />

      <LegacyCTA />
    </div>
  );
}
