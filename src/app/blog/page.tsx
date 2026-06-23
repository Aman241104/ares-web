"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PenLine, Tag } from "lucide-react";
import { blogPosts, blogCategories, teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

const teamColors: Record<string, string> = {
  "Team Modi": "#E67E22",
  "Team Doval": "#1E3A8A",
  "Team Amit Shah": "#C0392B",
  "Team Jaishankar": "#27AE60",
};

// Data pulled from centralized store

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [featured, ...rest] = blogPosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge", { opacity: 0, y: -20, duration: 0.8 })
        .from(".h-title", { opacity: 0, y: 30, duration: 1 }, "-=0.4")
        .from(".h-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

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
    <div ref={containerRef} className="pt-24 bg-[#000000] min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative py-24 px-6 sm:px-10 lg:px-16 overflow-hidden min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-4 mb-8 h-badge">
            <div className="h-px w-12 bg-white/10" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
              Insights from the Arena
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          <h1 className="h-title font-cinzel font-light leading-[1.1] mb-8" style={{ fontSize: "clamp(36px,8vw,90px)" }}>
            <span className="text-white">THE ARENA</span>
            <br />
            <span className="text-[#D4AF37] italic">BLOG</span>
          </h1>

          <div className="w-24 h-px mx-auto mb-8 bg-white/20" />

          <p className="h-sub font-montserrat text-white/50 text-sm tracking-wide leading-relaxed max-w-2xl mx-auto">
            Stories, strategies, and unfiltered insights from the ARES Business League 2026 arena.
          </p>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto sr">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
              Featured Article
            </span>
          </div>

          <Link
            href={`/blog/${featured.id}`}
            className="group block relative rounded-2xl overflow-hidden glass-card border-white/10 hover:border-[#D4AF37]/50 transition-all duration-700 hover:-translate-y-1"
          >
            {/* Full-bleed image */}
            <div className="relative h-[480px] sm:h-[600px] w-full overflow-hidden">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[#000000] flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-[#D4AF37]/20" />
                </div>
              )}
              {/* Dark gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)" }} />
              {/* Gold glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.15) 0%, transparent 70%)" }} />
            </div>

            {/* Content overlaid on image */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span
                  className="font-montserrat text-[10px] font-bold px-4 py-1.5 rounded-full border uppercase tracking-widest"
                  style={{
                    backgroundColor: (teamColors[featured.author] || "#D4AF37") + "15",
                    color: teamColors[featured.author] || "#D4AF37",
                    borderColor: (teamColors[featured.author] || "#D4AF37") + "40",
                  }}
                >
                  {featured.author}
                </span>
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                  {featured.category}
                </span>
                <span className="font-montserrat text-white/40 text-[10px] tracking-widest uppercase">{featured.date}</span>
                <span className="font-montserrat text-white/40 text-[10px]">·</span>
                <span className="font-montserrat text-white/40 text-[10px] tracking-widest uppercase">{featured.readTime}</span>
              </div>

              <h2 className="font-cinzel font-light text-white text-4xl sm:text-5xl mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors duration-500">
                {featured.title}
              </h2>
              <p className="font-montserrat text-white/60 text-sm leading-relaxed max-w-3xl mb-8">
                {featured.excerpt}
              </p>

              <span className="inline-flex items-center gap-3 font-montserrat text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
                Read Full Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ALL POSTS + SIDEBAR ── */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Blog Cards ── */}
            <div className="lg:col-span-2 sr">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-8 h-px bg-[#D4AF37]" />
                <span className="font-montserrat text-[#D4AF37] text-[10px] font-bold tracking-[0.4em] uppercase">
                  All Articles
                </span>
              </div>

              <div className="space-y-10 sr-stagger">
                {rest.map((post) => (
                  <article
                    key={post.id}
                    className="group relative glass-card overflow-hidden border-white/5 hover:border-white/20 hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                      {/* Image */}
                      <div className="sm:col-span-2 relative h-56 sm:h-full min-h-[200px] overflow-hidden">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                            <BookOpen className="w-12 h-12 text-white/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#000000] opacity-80 sm:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000] opacity-80 sm:hidden block" />
                        {/* Category badge */}
                        <div className="absolute top-4 left-4">
                          <span className="font-montserrat text-[8px] font-bold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-widest">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="sm:col-span-3 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span
                              className="font-montserrat text-[8px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest"
                              style={{
                                backgroundColor: (teamColors[post.author] || "#D4AF37") + "15",
                                color: teamColors[post.author] || "#D4AF37",
                                borderColor: (teamColors[post.author] || "#D4AF37") + "40",
                              }}
                            >
                              {post.author}
                            </span>
                            <span className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{post.date}</span>
                            <span className="font-montserrat text-white/40 text-[9px]">·</span>
                            <span className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest">{post.readTime}</span>
                          </div>

                          <h2 className="font-cinzel text-white text-xl mb-3 leading-snug group-hover:text-[#D4AF37] transition-colors duration-300">
                            {post.title}
                          </h2>
                          <p className="font-montserrat text-white/50 text-[11px] leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                          <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center gap-2 font-montserrat text-white text-[10px] font-bold uppercase tracking-widest group-hover:text-[#D4AF37] transition-colors duration-300"
                          >
                            Read More <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-8 sr">

              {/* Categories */}
              <div className="glass-card p-8 border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-cinzel tracking-widest text-white text-xs uppercase">
                    Categories
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {blogCategories.map((cat, i) => (
                    <span
                      key={cat}
                      className="font-montserrat text-[9px] font-bold border border-white/10 rounded-full px-4 py-2 text-white/50 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 cursor-pointer transition-all duration-300 uppercase tracking-widest"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Blogs */}
              <div className="glass-card p-8 border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <h3 className="font-cinzel tracking-widest text-white text-xs uppercase">
                    Team Blogs
                  </h3>
                </div>
                <div className="space-y-3">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer group"
                    >
                      <div
                        className="w-10 h-10 rounded-full font-cinzel text-lg flex items-center justify-center flex-shrink-0 border"
                        style={{
                          background: team.color + "15",
                          borderColor: team.color + "40",
                          color: team.color,
                        }}
                      >
                        {team.name.replace("Team ", "").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-cinzel tracking-wider text-white text-xs group-hover:text-[#D4AF37] transition-colors truncate">
                          {team.name}
                        </div>
                        <div className="font-montserrat text-white/40 text-[9px] uppercase tracking-widest mt-1">{team.tagline}</div>
                      </div>
                      <div
                        className="ml-auto text-[9px] font-bold font-montserrat rounded-full px-3 py-1 flex-shrink-0"
                        style={{ background: team.color + "15", color: team.color }}
                      >
                        1 post
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contribute CTA */}
              <div className="relative rounded-2xl p-8 text-center overflow-hidden border border-[#D4AF37]/30 glass-card">
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 80%)" }} />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6">
                    <PenLine className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-cinzel font-light text-white text-xl mb-3">
                    Want to Contribute?
                  </h3>
                  <p className="font-montserrat text-white/50 text-xs leading-relaxed mb-8">
                    Submit your thoughts on business, leadership, and nation building to the Arena Blog.
                  </p>
                  <Link href="/contact" className="btn-primary w-full justify-center">
                    Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
