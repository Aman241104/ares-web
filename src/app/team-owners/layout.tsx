import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Owners",
  description: "Meet the architects of victory — the four visionary leaders commanding the top factions in ARES Business League 2026.",
};

export default function TeamOwnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
