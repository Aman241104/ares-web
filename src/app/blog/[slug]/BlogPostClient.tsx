"use client";
import { useEffect, useRef, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LegacyCTA from "@/components/LegacyCTA";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.id !== slug).slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <div ref={containerRef} className="pt-24 bg-[#080600] min-h-screen overflow-x-hidden">
      <section className="py-20 px-6 sm:px-10 lg:px-16 sr">
        <div className="max-w-4xl mx-auto">
          <div className="font-montserrat text-[9px] uppercase tracking-widest text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link> &gt; <Link href="/blog" className="hover:text-white transition-colors">Blog</Link> &gt; <span className="text-[#D4AF37]">{post.title}</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="font-montserrat text-[9px] font-bold px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-widest">{post.category}</span>
            <span className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest">{post.date}</span>
            <span className="font-montserrat text-white/40 text-[10px]">·</span>
            <span className="font-montserrat text-white/40 text-[10px] uppercase tracking-widest">{post.readTime}</span>
          </div>
          
          <h1 className="font-cinzel font-light text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">{post.title}</h1>
          <div className="font-montserrat text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mb-12">By {post.author}</div>

          <div className="h-64 sm:h-96 glass-card border-white/10 overflow-hidden mb-16 relative">
            {post.image ? (
              <Image fill src={post.image} alt={post.title} className="object-cover" sizes="(max-width:768px) 100vw, 800px" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                <BookOpen className="w-12 h-12 text-[#D4AF37]/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent" />
          </div>

          <div className="prose prose-invert max-w-none font-montserrat text-white/60 leading-relaxed space-y-6">
            <p className="text-lg text-white/80">{post.excerpt}</p>
            <p>The ARES Business League 2026 has brought together some of the most dynamic and driven business owners from across the chapter. Every week, participants are pushing their limits, building new relationships, and creating genuine economic impact through their businesses.</p>
            
            <h2 className="font-cinzel text-white text-2xl mt-12 mb-6 tracking-wide">The Power of Collaboration</h2>
            <p>What sets ABL apart from traditional competitions is its emphasis on collaboration alongside competition. Teams are not just competing against each other — they're building together, sharing strategies, and creating value that extends far beyond the tournament itself.</p>
            <p>The numbers speak for themselves: over ₹3.5 crore in TYFCB business generated in just two weeks. 610 referrals passed. 1,078 meaningful business meetings conducted. This is what nation-building looks like in action.</p>
            
            <h2 className="font-cinzel text-white text-2xl mt-12 mb-6 tracking-wide">Key Takeaways</h2>
            <ul className="space-y-4 list-disc list-inside">
              <li>Consistency beats intensity: teams that show up every week are winning.</li>
              <li>Referrals are the lifeblood of BNI — the more you give, the more you receive.</li>
              <li>One-to-one meetings build the deep relationships that convert to business.</li>
              <li>Leadership matters: great team owners inspire maximum participation.</li>
            </ul>
            <p className="mt-8">As we enter Week 3, the stakes are higher than ever. Every point counts. Every connection matters. This is what the ARES Business League was designed for — to push business owners to their highest potential.</p>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <Link href="/blog" className="btn-secondary inline-flex">← Back to Articles</Link>
          </div>
        </div>
      </section>

      {/* More Posts */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#0C0900] border-t border-white/5 sr">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel font-light text-white text-3xl mb-12">More from the <span className="text-[#D4AF37]">Arena</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sr-stagger">
            {others.map((p) => (
              <article key={p.id} className="glass-card p-8 border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="font-montserrat text-[#D4AF37] text-[9px] uppercase tracking-widest mb-3">{p.date}</div>
                <h3 className="font-cinzel text-white text-lg mb-3 leading-snug">{p.title}</h3>
                <p className="font-montserrat text-white/40 text-[11px] line-clamp-3 mb-6 leading-relaxed">{p.excerpt}</p>
                <Link href={`/blog/${p.id}`} className="font-montserrat text-white text-[9px] font-bold uppercase tracking-widest hover:text-[#D4AF37] inline-flex items-center gap-2 transition-colors">
                  Read Article <ArrowRight className="w-3 h-3" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LegacyCTA />
    </div>
  );
}
