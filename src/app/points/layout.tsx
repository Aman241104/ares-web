import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scoring System",
  description: "Every action you take earns points. Learn how the ARES Business League 2026 scoring system works.",
};

export default function PointsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
