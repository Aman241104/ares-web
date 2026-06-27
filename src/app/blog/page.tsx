"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, PenLine, Tag } from "lucide-react";
import { blogPosts, blogCategories, teams } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import LegacyCTA from "@/components/LegacyCTA";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const teamColors: Record<string, string> = {
  "Team Modi":       "#E07820",
  "Team Doval":      "#1F3A93",
  "Team Amit Shah":  "#C0392B",
  "Team Jaishankar": "#1E824C",
};

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [featured, ...rest] = blogPosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = new SplitType(".h-title-split", { types: "chars" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".h-badge",   { opacity: 0, y: -20, duration: 0.8 })
        .from(title.chars,  { opacity: 0, y: 50, stagger: 0.05, duration: 0.8, ease: "back.out(1.4)" }, "-=0.4")
        .from(".h-sub",     { opacity: 0, y: 20, duration: 0.8 }, "-=0.6");

      gsap.utils.toArray<Element>(".sr").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });

      gsap.utils.toArray<Element>(".sr-stagger").forEach((parent) => {
        gsap.fromTo(Array.from((parent as HTMLElement).children),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: parent, start: "top 90%", once: true } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-24 bg-[#0B132B] min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <PageHero backgroundImage="/images/luxury_boardroom.png" layout="centered" className="min-h-[65vh] justify-center px-6 sm:px-10 lg:px-16 py-28">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="h-badge inline-flex items-center gap-3 mb-8 relative px-5 py-2.5">
            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/6 backdrop-blur-xl" />
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] relative z-10" />
            <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.5em] uppercase relative z-10">Insights from the Arena</span>
          </div>

          <h1 className="font-cinzel font-light text-white mb-8 leading-none">
            <span className="block font-montserrat text-white/30 text-xs sm:text-sm tracking-[0.5em] uppercase mb-2">The Arena</span>
            <span
              className="h-title-split block"
              style={{
                fontSize: "clamp(64px, 16vw, 160px)",
                background: "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #C9921A 70%, #F0D060 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              BLOG
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mb-7 h-sub">
            <div className="h-px w-12 bg-[#D4AF37]/30" />
            <p className="font-montserrat text-white/40 text-[10px] sm:text-xs tracking-[0.35em] uppercase">
              Stories · Strategies · Unfiltered Insights
            </p>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>

          <p className="font-montserrat text-white/35 text-xs sm:text-sm leading-[2] max-w-lg mx-auto tracking-wide">
            From the arena floor to the boardroom — every perspective, every victory, every lesson from ABL 2026.
          </p>
        </div>
      </PageHero>

      {/* ── FEATURED POST ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0D1424] border-t border-white/5">
        <div className="max-w-7xl mx-auto sr">
          <div className="section-label mb-10">Featured Article</div>

          <Link
            href={`/blog/${featured.id}`}
            className="group block relative overflow-hidden border border-white/8 hover:border-[rgba(212,175,55,0.3)] transition-all duration-700"
          >
            {/* Full-bleed image */}
            <div className="relative h-[440px] sm:h-[580px] w-full overflow-hidden">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  style={{ filter: "brightness(0.75) saturate(0.9)" }}
                />
              ) : (
                <div className="w-full h-full bg-[#0B132B] flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-[#D4AF37]/20" />
                </div>
              )}
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0D1424 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.1) 100%)" }} />
              {/* Gold hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(212,175,55,0.12) 0%, transparent 70%)" }} />
              {/* Top gold line */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />
            </div>

            {/* Content overlaid */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-14">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="font-montserrat text-[9px] font-bold px-3 py-1.5 border uppercase tracking-widest"
                  style={{
                    backgroundColor: (teamColors[featured.author] || "#D4AF37") + "18",
                    color: teamColors[featured.author] || "#D4AF37",
                    borderColor: (teamColors[featured.author] || "#D4AF37") + "40",
                  }}
                >
                  {featured.author}
                </span>
                <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                  {featured.category}
                </span>
                <span className="font-montserrat text-white/40 text-[9px] tracking-widest uppercase">{featured.date}</span>
                <span className="font-montserrat text-white/25 text-[9px]">·</span>
                <span className="font-montserrat text-white/40 text-[9px] tracking-widest uppercase">{featured.readTime}</span>
              </div>

              <h2
                className="font-cinzel font-light text-white mb-5 leading-tight group-hover:text-[#D4AF37] transition-colors duration-500"
                style={{ fontSize: "clamp(22px, 4vw, 52px)" }}
              >
                {featured.title}
              </h2>

              <div className="gold-divider max-w-xs mb-5" />

              <p className="font-montserrat text-white/50 text-xs sm:text-sm leading-[2] max-w-2xl mb-8 tracking-wide">
                {featured.excerpt}
              </p>

              <span className="inline-flex items-center gap-3 font-montserrat text-[#D4AF37] text-[9px] font-bold uppercase tracking-[0.25em] group-hover:gap-5 transition-all duration-300">
                Read Full Article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ALL POSTS + SIDEBAR ── */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#0B132B] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Blog Cards ── */}
            <div className="lg:col-span-2 sr">
              <div className="section-label mb-10 text-left" style={{ textAlign: "left" }}>
                <span className="font-montserrat text-[#D4AF37] text-[9px] font-bold tracking-[0.4em] uppercase">All Articles</span>
              </div>

              <div className="space-y-6 sr-stagger">
                {rest.map((post) => {
                  const tc = teamColors[post.author] || "#D4AF37";
                  return (
                    <article
                      key={post.id}
                      className="group relative overflow-hidden border border-white/6 hover:border-[rgba(212,175,55,0.2)] bg-[#0A0800] hover:bg-[#0D0A01] transition-all duration-500"
                      style={{ borderLeft: `2px solid ${tc}30` }}
                    >
                      {/* Team color left accent on hover */}
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: tc }} />

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                        {/* Image */}
                        <div className="sm:col-span-2 relative h-52 sm:h-full min-h-[200px] overflow-hidden">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width:768px) 100vw, 40vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              style={{ filter: "brightness(0.7) saturate(0.85)" }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                              <BookOpen className="w-12 h-12 text-white/20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0800] opacity-80 sm:block hidden" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0800] opacity-80 sm:hidden block" />
                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span className="font-montserrat text-[7px] font-bold px-2.5 py-1 bg-black/70 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-[0.2em]">
                              {post.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="sm:col-span-3 p-7 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2.5 mb-4">
                              <span
                                className="font-montserrat text-[8px] font-bold px-2.5 py-1 border uppercase tracking-widest"
                                style={{
                                  backgroundColor: tc + "15",
                                  color: tc,
                                  borderColor: tc + "40",
                                }}
                              >
                                {post.author}
                              </span>
                              <span className="font-montserrat text-white/35 text-[8px] uppercase tracking-widest">{post.date}</span>
                              <span className="font-montserrat text-white/25 text-[8px]">·</span>
                              <span className="font-montserrat text-white/35 text-[8px] uppercase tracking-widest">{post.readTime}</span>
                            </div>

                            <h2 className="font-cinzel text-white text-lg leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 tracking-wide">
                              {post.title}
                            </h2>
                            <p className="font-montserrat text-white/40 text-[10px] leading-[1.9] line-clamp-3 tracking-wide">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                            <Link
                              href={`/blog/${post.id}`}
                              className="inline-flex items-center gap-2 font-montserrat text-white/50 text-[9px] font-bold uppercase tracking-[0.2em] group-hover:text-[#D4AF37] transition-colors duration-300"
                            >
                              Read Article <ArrowRight className="w-3 h-3" />
                            </Link>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: tc, opacity: 0.6 }} />
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6 sr">

              {/* Categories */}
              <div className="relative border border-white/8 bg-[#0D1424] p-7 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <h3 className="font-cinzel tracking-widest text-white text-[10px] uppercase">Categories</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((cat) => (
                    <span
                      key={cat}
                      className="font-montserrat text-[8px] font-bold border border-white/8 px-3 py-1.5 text-white/40 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/8 cursor-pointer transition-all duration-300 uppercase tracking-[0.2em]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Blogs */}
              <div className="relative border border-white/8 bg-[#0D1424] p-7 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)" }} />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <h3 className="font-cinzel tracking-widest text-white text-[10px] uppercase">Team Blogs</h3>
                </div>
                <div className="space-y-2">
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="flex items-center gap-3 p-3.5 border border-transparent hover:border-white/8 hover:bg-white/[0.025] transition-all duration-300 cursor-pointer group"
                    >
                      <div
                        className="w-8 h-8 font-cinzel text-sm flex items-center justify-center flex-shrink-0 border"
                        style={{ background: team.color + "15", borderColor: team.color + "35", color: team.color }}
                      >
                        {team.name.replace("Team ", "").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-cinzel tracking-wider text-white text-[10px] group-hover:text-[#D4AF37] transition-colors truncate">
                          {team.name}
                        </div>
                        <div className="font-montserrat text-white/30 text-[8px] uppercase tracking-[0.15em] mt-0.5">{team.tagline}</div>
                      </div>
                      <div
                        className="font-montserrat text-[7px] font-bold px-2 py-0.5 flex-shrink-0"
                        style={{ background: team.color + "18", color: team.color }}
                      >
                        1 post
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contribute CTA */}
              <div className="relative border border-[rgba(212,175,55,0.2)] bg-[#111827] p-8 text-center overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 70% at 50% 100%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />
                <div className="relative">
                  <div className="w-12 h-12 border border-[#D4AF37]/30 bg-[#D4AF37]/8 flex items-center justify-center mx-auto mb-5">
                    <PenLine className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-cinzel font-light text-white text-base tracking-wider mb-3">Want to Contribute?</h3>
                  <p className="font-montserrat text-white/35 text-[9px] leading-[1.9] mb-7 tracking-wide">
                    Share your thoughts on business, leadership, and nation-building with the Arena community.
                  </p>
                  <Link href="/contact" className="btn-primary w-full justify-center text-[9px]">
                    Submit Article <ArrowRight className="w-3.5 h-3.5" />
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
