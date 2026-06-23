import type { Metadata } from "next";
import { teams } from "@/lib/data";
import { notFound } from "next/navigation";
import TeamPageClient from "./TeamPageClient";

export async function generateMetadata({ params }: { params: Promise<{ team: string }> }): Promise<Metadata> {
  const { team: id } = await params;
  const team = teams.find((t) => t.id === id);
  if (!team) return {};
  return {
    title: `${team.name} — ${team.tagline}`,
    description: team.description,
    openGraph: {
      title: `${team.name} | ARES Business League 2026`,
      description: team.description,
    },
  };
}

export async function generateStaticParams() {
  return teams.map((t) => ({ team: t.id }));
}

export default async function TeamPage({ params }: { params: Promise<{ team: string }> }) {
  const { team: id } = await params;
  const team = teams.find((t) => t.id === id);
  if (!team) notFound();
  return <TeamPageClient params={params} />;
}
