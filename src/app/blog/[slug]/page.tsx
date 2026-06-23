import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/data";
import LegacyCTA from "@/components/LegacyCTA";

const blogImages: Record<string, string> = {
  "power-of-strategic-collaboration": "/images/blog-strategy.jpg",
  "leadership-in-the-arena": "/images/blog-leadership.jpg",
  "building-connections": "/images/blog-networking.jpg",
  "execution-is-everything": "/images/blog-growth.jpg",
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.id !== slug).slice(0, 3);

  return (
    <div className="pt-16">
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-[#060d14]">
        <div className="max-w-3xl mx-auto">
          <div className="text-sm font-montserrat text-white/40 mb-6">
            <Link href="/" className="hover:text-[#DAA537]">Home</Link> &gt; <Link href="/blog" className="hover:text-[#DAA537]">Blog</Link> &gt; <span className="text-[#DAA537]">{post.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="font-montserrat text-xs font-bold px-3 py-1 rounded-full bg-[#DAA537]/20 text-[#DAA537]">{post.category}</span>
            <span className="font-montserrat text-white/30 text-xs">{post.date}</span>
            <span className="font-montserrat text-white/30 text-xs">·</span>
            <span className="font-montserrat text-white/30 text-xs">{post.readTime}</span>
          </div>
          <h1 className="font-cinzel font-black text-3xl sm:text-4xl text-white mb-4">{post.title}</h1>
          <div className="font-montserrat text-[#DAA537] text-sm font-semibold mb-8">By {post.author}</div>

          <div className="h-48 bg-gradient-to-br from-[#0D1B2A] to-[#060d14] border border-[#DAA537]/20 rounded-2xl overflow-hidden mb-8 relative">
            {blogImages[post.id] ? (
              <img src={blogImages[post.id]} alt={post.title} className="w-full h-full object-cover opacity-80" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#DAA537]/10">
                <BookOpen className="w-12 h-12 text-[#DAA537]/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060d14]/50 to-transparent" />
          </div>

          <div className="prose prose-invert max-w-none font-montserrat text-white/70 leading-relaxed space-y-4">
            <p className="text-lg">{post.excerpt}</p>
            <p>The ARES Business League 2026 has brought together some of the most dynamic and driven business owners from across the chapter. Every week, participants are pushing their limits, building new relationships, and creating genuine economic impact through their businesses.</p>
            <h2 className="font-cinzel text-[#DAA537] text-xl mt-8">The Power of Collaboration</h2>
            <p>What sets ABL apart from traditional competitions is its emphasis on collaboration alongside competition. Teams are not just competing against each other — they're building together, sharing strategies, and creating value that extends far beyond the tournament itself.</p>
            <p>The numbers speak for themselves: over ₹3.5 crore in TYFCB business generated in just two weeks. 610 referrals passed. 1,078 meaningful business meetings conducted. This is what nation-building looks like in action.</p>
            <h2 className="font-cinzel text-[#DAA537] text-xl mt-8">Key Takeaways</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Consistency beats intensity: teams that show up every week are winning</li>
              <li>Referrals are the lifeblood of BNI — the more you give, the more you receive</li>
              <li>One-to-one meetings build the deep relationships that convert to business</li>
              <li>Leadership matters: great team owners inspire maximum participation</li>
            </ul>
            <p>As we enter Week 3, the stakes are higher than ever. Every point counts. Every connection matters. This is what the ARES Business League was designed for — to push business owners to their highest potential.</p>
          </div>

          <div className="mt-10 pt-6 border-t border-[#DAA537]/20">
            <Link href="/blog" className="btn-secondary inline-flex">← Back to Blog</Link>
          </div>
        </div>
      </section>

      {/* More Posts */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-cinzel font-bold text-white text-2xl mb-8">More from the Blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map((p) => (
              <article key={p.id} className="bg-[#060d14] border border-[#DAA537]/20 rounded-xl p-5 hover:border-[#DAA537]/50 transition-all">
                <div className="font-montserrat text-[#DAA537] text-xs mb-2">{p.date}</div>
                <h3 className="font-cinzel font-bold text-white text-sm mb-2">{p.title}</h3>
                <p className="font-montserrat text-white/50 text-xs line-clamp-2 mb-3">{p.excerpt}</p>
                <Link href={`/blog/${p.id}`} className="font-montserrat text-[#DAA537] text-xs font-bold hover:underline inline-flex items-center gap-1">
                  Read More <ArrowRight className="w-2.5 h-2.5" />
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
