import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Leaderboard",
  description: "Real-time standings for all 4 teams competing in ARES Business League 2026. Updated every Wednesday.",
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
