import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) return {};
  const image = post.image ?? "/images/hero_trophy_stadium.png";
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ARES Business League`,
      description: post.excerpt,
      type: "article",
      images: [{ url: image, width: 1600, height: 854, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) notFound();
  return <BlogPostClient params={params} />;
}
