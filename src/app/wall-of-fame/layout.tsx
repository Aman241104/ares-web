import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall of Fame",
  description: "Every year the ARES Business League is played, this page grows by one edition — commissioners, team owners, and partners permanently etched here.",
};

export default function WallOfFameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
