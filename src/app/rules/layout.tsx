import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tournament Rules",
  description: "Everything you need to know to compete, score, and win in the ARES Business League 2026 arena.",
};

export default function RulesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
