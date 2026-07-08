import type { Metadata } from "next";
import { teams } from "@/lib/data";
import { notFound } from "next/navigation";
import OwnerPageClient from "./OwnerPageClient";

export async function generateMetadata({ params }: { params: Promise<{ owner: string }> }): Promise<Metadata> {
  const { owner: id } = await params;
  const team = teams.find((t) => t.owner.id === id);
  if (!team) return {};
  const owner = team.owner;
  return {
    title: `${owner.name} — ${team.fullName}`,
    description: owner.quote,
    openGraph: {
      title: `${owner.name} | ARES Business League 2026`,
      description: owner.quote,
      images: [{ url: owner.image, width: 1200, height: 1500, alt: owner.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${owner.name} | ARES Business League 2026`,
      description: owner.quote,
      images: [owner.image],
    },
  };
}

export async function generateStaticParams() {
  return teams.map((t) => ({ owner: t.owner.id }));
}

export default async function OwnerPage({ params }: { params: Promise<{ owner: string }> }) {
  const { owner: id } = await params;
  const team = teams.find((t) => t.owner.id === id);
  if (!team) notFound();
  return <OwnerPageClient params={params} />;
}
