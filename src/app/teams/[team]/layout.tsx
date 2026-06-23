import type { Metadata } from "next";
import { teams } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ team: string }> }): Promise<Metadata> {
  const { team: id } = await params;
  const team = teams.find((t) => t.id === id);
  if (!team) return { title: "Not Found" };
  return {
    title: `${team.fullName} | ARES Business League`,
    description: team.description,
  };
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
