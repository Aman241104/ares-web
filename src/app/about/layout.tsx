import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ABL 2026",
  description: "A high-stakes, one-month business tournament bringing together 30 elite business owners across 4 iconic factions. Strategy. Leadership. Execution.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
